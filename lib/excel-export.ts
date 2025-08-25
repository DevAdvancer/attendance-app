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

interface DateRange {
  start: Date | null;
  end: Date | null;
}

export async function exportToExcel(
  data: AttendanceReport[],
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
