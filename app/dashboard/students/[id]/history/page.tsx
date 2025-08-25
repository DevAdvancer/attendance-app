"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  format,
  startOfMonth,
  endOfMonth,
  subMonths,
  eachDayOfInterval,
} from "date-fns";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  supabase,
  type Student,
  type Subject,
  type Attendance,
} from "@/lib/supabase";
import { AttendanceCalendarView } from "@/components/students/attendance-calendar-view";
import { AttendanceHistoryTable } from "@/components/students/attendance-history-table";

export default function StudentHistoryPage() {
  const params = useParams();
  const router = useRouter();
  const studentId = params.id as string;

  const [student, setStudent] = useState<Student | null>(null);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("current_month");

  useEffect(() => {
    fetchData();
  }, [studentId, dateRange]);

  const getDateRange = () => {
    const now = new Date();
    switch (dateRange) {
      case "current_month":
        return {
          start: startOfMonth(now),
          end: endOfMonth(now),
        };
      case "last_month":
        return {
          start: startOfMonth(subMonths(now, 1)),
          end: endOfMonth(subMonths(now, 1)),
        };
      case "last_3_months":
        return {
          start: startOfMonth(subMonths(now, 2)),
          end: endOfMonth(now),
        };
      case "all_time":
        return {
          start: null,
          end: null,
        };
      default:
        return {
          start: startOfMonth(now),
          end: endOfMonth(now),
        };
    }
  };

  const fetchData = async () => {
    try {
      // Fetch student details
      const { data: studentData, error: studentError } = await supabase
        .from("students")
        .select("*")
        .eq("id", studentId)
        .single();

      if (studentError) throw studentError;
      setStudent(studentData);

      // Fetch subject details
      const { data: subjectData, error: subjectError } = await supabase
        .from("subjects")
        .select("*")
        .eq("id", studentData.subject_id)
        .single();

      if (subjectError) throw subjectError;
      setSubject(subjectData);

      // Fetch attendance records
      const { start, end } = getDateRange();
      let query = supabase
        .from("attendance")
        .select("*")
        .eq("student_id", studentId)
        .order("date", { ascending: false });

      if (start && end) {
        query = query
          .gte("date", format(start, "yyyy-MM-dd"))
          .lte("date", format(end, "yyyy-MM-dd"));
      }

      const { data: attendanceData, error: attendanceError } = await query;

      if (attendanceError) throw attendanceError;
      setAttendance(attendanceData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAttendanceStats = () => {
    const totalClasses = attendance.length;
    const presentCount = attendance.filter(
      (a) => a.status === "present"
    ).length;
    const absentCount = attendance.filter((a) => a.status === "absent").length;
    const attendancePercentage =
      totalClasses > 0 ? (presentCount / totalClasses) * 100 : 0;

    return { totalClasses, presentCount, absentCount, attendancePercentage };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Icon icon="lucide:loader-2" className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!student || !subject) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Student not found</h1>
        <Button onClick={() => router.push("/dashboard")}>
          <Icon icon="lucide:arrow-left" className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const stats = getAttendanceStats();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                router.push(`/dashboard/subjects/${subject.id}/reports`)
              }>
              <Icon icon="lucide:arrow-left" className="h-4 w-4 mr-2" />
              Back to Reports
            </Button>
          </div>
          <h1 className="text-3xl font-bold">{student.name}</h1>
          <p className="text-muted-foreground">
            {student.reg_number} • {student.roll_number} • {subject.name}
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current_month">Current Month</SelectItem>
              <SelectItem value="last_month">Last Month</SelectItem>
              <SelectItem value="last_3_months">Last 3 Months</SelectItem>
              <SelectItem value="all_time">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Student Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Registration Number
              </h4>
              <p className="font-semibold">{student.reg_number}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Roll Number
              </h4>
              <p className="font-semibold">{student.roll_number}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Course
              </h4>
              <p className="font-semibold">{student.course}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Subject
              </h4>
              <p className="font-semibold">
                {subject.name} ({subject.code})
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClasses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-green-600">
              Present
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.presentCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-red-600">
              Absent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats.absentCount}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Attendance %</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                stats.attendancePercentage >= 80
                  ? "text-green-600"
                  : stats.attendancePercentage >= 60
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}>
              {stats.attendancePercentage.toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar View */}
      {dateRange !== "all_time" && (
        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
            <CardDescription>
              Visual representation of attendance for the selected period
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AttendanceCalendarView
              attendance={attendance}
              dateRange={getDateRange()}
            />
          </CardContent>
        </Card>
      )}

      {/* Attendance History Table */}
      {attendance.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 mb-4 opacity-50">
              <Icon icon="lucide:calendar" className="h-full w-full" />
            </div>
            <CardTitle className="mb-2">No attendance records</CardTitle>
            <CardDescription className="text-center mb-4">
              No attendance has been marked for this student in the selected
              period
            </CardDescription>
          </CardContent>
        </Card>
      ) : (
        <AttendanceHistoryTable attendance={attendance} />
      )}
    </div>
  );
}
