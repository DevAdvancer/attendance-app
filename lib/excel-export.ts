import * as XLSX from "xlsx";
import { format } from "date-fns";
import { type Subject } from "./supabase";

interface AttendanceReport {
  student_id: string;
  student_name: string;
  reg_number: string;
  roll_number: string;
  course: string;
  total_classes: number;
  present_count: number;
  absent_count: number;
  attendance_percentage: number;
}

interface DailyAttendance {
  date: string;
  student_id: string;
  student_name: string;
  reg_number: string;
  roll_number: string;
  course: string;
  status: "present" | "absent" | "unmarked";
}

interface DateRange {
  start: Date | null;
  end: Date | null;
}

export async function exportToExcel(
  data: AttendanceReport[],
  dailyAttendance: DailyAttendance[],
  subject: Subject,
  dateRange: DateRange,
  filename: string
): Promise<void> {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Prepare the data for export
  const exportData = data.map((student, index) => ({
    "S.No": index + 1,
    "Student Name": student.student_name,
    "Registration Number": student.reg_number,
    "Roll Number": student.roll_number,
    "Course": student.course,
    "Total Classes": student.total_classes,
    "Present": student.present_count,
    "Absent": student.absent_count,
    "Attendance %": `${student.attendance_percentage.toFixed(2)}%`,
    "Status": getAttendanceStatus(student.attendance_percentage),
  }));

  // Create the main worksheet
  const worksheet = XLSX.utils.json_to_sheet(exportData);

  // Set column widths
  const columnWidths = [
    { wch: 6 }, // S.No
    { wch: 25 }, // Student Name
    { wch: 18 }, // Registration Number
    { wch: 15 }, // Roll Number
    { wch: 20 }, // Course
    { wch: 12 }, // Total Classes
    { wch: 10 }, // Present
    { wch: 10 }, // Absent
    { wch: 12 }, // Attendance %
    { wch: 15 }, // Status
  ];
  worksheet["!cols"] = columnWidths;

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");

  // Create a daily attendance sheet only if data is provided
  if (dailyAttendance && dailyAttendance.length > 0) {
    const dailyAttendanceSheet = createDailyAttendanceSheet(dailyAttendance, subject);
    const dailyWorksheet = XLSX.utils.json_to_sheet(dailyAttendanceSheet);
    // Dynamic column widths for pivot table
    const columnWidths = [
      { wch: 12 }, // Roll No.
      { wch: 25 }, // Name
      { wch: 18 }, // Registration No.
      { wch: 20 }, // Course
    ];

    // Add date column widths (compact for dates)
    const uniqueDates = [...new Set(dailyAttendance.map(d => d.date))].sort();
    uniqueDates.forEach(() => {
      columnWidths.push({ wch: 8 }); // Compact width for date columns
    });

    dailyWorksheet["!cols"] = columnWidths;
    XLSX.utils.book_append_sheet(workbook, dailyWorksheet, "Daily Attendance");
  }

  // Create a summary sheet
  const summary = createSummarySheet(data, subject, dateRange);
  const summaryWorksheet = XLSX.utils.json_to_sheet(summary);
  summaryWorksheet["!cols"] = [{ wch: 25 }, { wch: 15 }];
  XLSX.utils.book_append_sheet(workbook, summaryWorksheet, "Summary");

  // Write the file
  XLSX.writeFile(workbook, filename);
}

function getAttendanceStatus(percentage: number): string {
  if (percentage >= 80) return "Excellent";
  if (percentage >= 70) return "Good";
  if (percentage >= 60) return "Average";
  return "Poor";
}

function createSummarySheet(
  data: AttendanceReport[],
  subject: Subject,
  dateRange: DateRange
): Array<{ [key: string]: string | number }> {
  const totalStudents = data.length;
  const avgAttendance =
    totalStudents > 0
      ? data.reduce((sum, student) => sum + student.attendance_percentage, 0) /
        totalStudents
      : 0;

  const excellentCount = data.filter((s) => s.attendance_percentage >= 80).length;
  const goodCount = data.filter(
    (s) => s.attendance_percentage >= 70 && s.attendance_percentage < 80
  ).length;
  const averageCount = data.filter(
    (s) => s.attendance_percentage >= 60 && s.attendance_percentage < 70
  ).length;
  const poorCount = data.filter((s) => s.attendance_percentage < 60).length;

  const dateRangeText = dateRange.start && dateRange.end
    ? `${format(dateRange.start, "MMM d, yyyy")} - ${format(dateRange.end, "MMM d, yyyy")}`
    : "All Time";

  return [
    { "Report Details": "Subject Name", "Value": subject.name },
    { "Report Details": "Subject Code", "Value": subject.code },
    { "Report Details": "Academic Year", "Value": subject.academic_year },
    { "Report Details": "Semester", "Value": subject.semester },
    { "Report Details": "Date Range", "Value": dateRangeText },
    { "Report Details": "Generated On", "Value": format(new Date(), "MMM d, yyyy 'at' h:mm a") },
    { "Report Details": "", "Value": "" },
    { "Report Details": "Summary Statistics", "Value": "" },
    { "Report Details": "Total Students", "Value": totalStudents },
    { "Report Details": "Average Attendance", "Value": `${avgAttendance.toFixed(2)}%` },
    { "Report Details": "", "Value": "" },
    { "Report Details": "Attendance Distribution", "Value": "" },
    { "Report Details": "Excellent (≥80%)", "Value": excellentCount },
    { "Report Details": "Good (70-79%)", "Value": goodCount },
    { "Report Details": "Average (60-69%)", "Value": averageCount },
    { "Report Details": "Poor (<60%)", "Value": poorCount },
  ];
}

function createDailyAttendanceSheet(
  dailyAttendance: DailyAttendance[],
  subject: Subject
): Array<{ [key: string]: string | number }> {
  if (!dailyAttendance || dailyAttendance.length === 0) {
    return [];
  }

  // Get unique dates and students
  const uniqueDates = [...new Set(dailyAttendance.map(d => d.date))].sort();
  const uniqueStudents = [...new Set(dailyAttendance.map(d => d.student_id))];

  // Create a map for quick lookup
  const attendanceMap = new Map();
  dailyAttendance.forEach(record => {
    const key = `${record.student_id}-${record.date}`;
    attendanceMap.set(key, record.status);
  });

  // Get student details for the first record (they should all have same details)
  const studentDetails = dailyAttendance.reduce((acc, record) => {
    if (!acc[record.student_id]) {
      acc[record.student_id] = {
        name: record.student_name,
        reg_number: record.reg_number,
        roll_number: record.roll_number,
        course: record.course
      };
    }
    return acc;
  }, {} as Record<string, { name: string; reg_number: string; roll_number: string; course: string }>);

  // Create pivot table structure
  const exportData: Array<{ [key: string]: string | number }> = [];

  // Header row with dates as columns
  const headerRow: { [key: string]: string | number } = {
    "Roll No.": "Roll No.",
    "Name": "Name",
    "Registration No.": "Registration No.",
    "Course": "Course"
  };

  // Add date columns
  uniqueDates.forEach(date => {
    headerRow[format(new Date(date), "MMM dd")] = format(new Date(date), "MMM dd");
  });

  exportData.push(headerRow);

  // Data rows - one per student
  uniqueStudents.forEach(studentId => {
    const student = studentDetails[studentId];
    const row: { [key: string]: string | number } = {
      "Roll No.": student.roll_number,
      "Name": student.name,
      "Registration No.": student.reg_number,
      "Course": student.course
    };

    // Add attendance status for each date
    uniqueDates.forEach(date => {
      const key = `${studentId}-${date}`;
      const status = attendanceMap.get(key);

      if (status === "present") {
        row[format(new Date(date), "MMM dd")] = "P";
      } else if (status === "absent") {
        row[format(new Date(date), "MMM dd")] = "A";
      } else {
        row[format(new Date(date), "MMM dd")] = "-";
      }
    });

    exportData.push(row);
  });

  // Add legend row
  const legendRow: { [key: string]: string | number } = {
    "Roll No.": "Legend:",
    "Name": "P = Present",
    "Registration No.": "A = Absent",
    "Course": "- = Not Marked"
  };

  // Add empty row for spacing
  const emptyRow: { [key: string]: string | number } = {};
  uniqueDates.forEach(date => {
    emptyRow[format(new Date(date), "MMM dd")] = "";
  });

  exportData.push(emptyRow);
  exportData.push(legendRow);

  return exportData;
}
