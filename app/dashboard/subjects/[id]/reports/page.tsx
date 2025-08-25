"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { format, startOfMonth, endOfMonth, subMonths } from "date-fns";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase, type Subject } from "@/lib/supabase";
import { AttendanceChart } from "@/components/reports/attendance-chart";
import { exportToExcel } from "@/lib/excel-export";

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

interface GroupedData {
  [key: string]: AttendanceReport[];
}

interface ColumnStats {
  totalStudents: number;
  avgAttendance: number;
  highAttendance: number;
  lowAttendance: number;
}

export default function ReportsPage() {
  const params = useParams();
  const router = useRouter();
  const subjectId = params.id as string;

  const [subject, setSubject] = useState<Subject | null>(null);
  const [reportData, setReportData] = useState<AttendanceReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [dateRange, setDateRange] = useState("current_month");
  const [groupBy, setGroupBy] = useState<"roll" | "course">("roll");

  useEffect(() => {
    fetchData();
  }, [subjectId, dateRange]);

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
      // Fetch subject details
      const { data: subjectData, error: subjectError } = await supabase
        .from("subjects")
        .select("*")
        .eq("id", subjectId)
        .single();

      if (subjectError) throw subjectError;
      setSubject(subjectData);

      // Get date range
      const { start, end } = getDateRange();

      // Fetch attendance summary using the database function
      const { data: reportData, error: reportError } = await supabase.rpc(
        "get_attendance_summary",
        {
          p_subject_id: subjectId,
          p_start_date: start ? format(start, "yyyy-MM-dd") : null,
          p_end_date: end ? format(end, "yyyy-MM-dd") : null,
        }
      );

      if (reportError) throw reportError;
      setReportData(reportData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = async () => {
    if (!subject || reportData.length === 0) return;

    setExporting(true);
    try {
      const { start, end } = getDateRange();
      const filename = `${subject.code}_Attendance_Report_${format(
        new Date(),
        "yyyy-MM-dd"
      )}.xlsx`;

      await exportToExcel(reportData, subject, { start, end }, filename);
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    } finally {
      setExporting(false);
    }
  };

  const groupData = (data: AttendanceReport[]): GroupedData => {
    if (groupBy === "roll") {
      // Extract numeric part from roll number for sorting
      const sortedData = [...data].sort((a, b) => {
        const rollA = parseInt(a.roll_number.replace(/\D/g, "")) || 0;
        const rollB = parseInt(b.roll_number.replace(/\D/g, "")) || 0;
        return rollA - rollB;
      });
      return { "All Students": sortedData };
    } else {
      // Group by course
      const grouped = data.reduce((acc: GroupedData, student) => {
        const course = student.course;
        if (!acc[course]) {
          acc[course] = [];
        }
        acc[course].push(student);
        return acc;
      }, {});

      // Sort students within each course by roll number
      Object.keys(grouped).forEach((course) => {
        grouped[course].sort((a, b) => {
          const rollA = parseInt(a.roll_number.replace(/\D/g, "")) || 0;
          const rollB = parseInt(b.roll_number.replace(/\D/g, "")) || 0;
          return rollA - rollB;
        });
      });

      return grouped;
    }
  };

  const getColumnStats = (data: AttendanceReport[]): ColumnStats => {
    if (data.length === 0) {
      return {
        avgAttendance: 0,
        totalStudents: 0,
        highAttendance: 0,
        lowAttendance: 0,
      };
    }

    const totalStudents = data.length;
    const avgAttendance =
      data.reduce((sum, student) => {
        const percentage = student.attendance_percentage || 0;
        return sum + percentage;
      }, 0) / totalStudents;
    const highAttendance = data.filter(
      (student) => (student.attendance_percentage || 0) >= 80
    ).length;
    const lowAttendance = data.filter(
      (student) => (student.attendance_percentage || 0) < 60
    ).length;

    return { avgAttendance, totalStudents, highAttendance, lowAttendance };
  };

  const getAttendanceBadgeColor = (percentage: number | null | undefined) => {
    const value = percentage || 0;
    if (value >= 80) return "bg-green-100 text-green-800";
    if (value >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Icon icon="lucide:loader-2" className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold mb-4">Subject not found</h1>
        <Button onClick={() => router.push("/dashboard")}>
          <Icon icon="lucide:arrow-left" className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/dashboard")}>
              <Icon icon="lucide:arrow-left" className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
          <h1 className="text-3xl font-bold">Attendance Reports</h1>
          <p className="text-muted-foreground">
            {subject.name} • {subject.code} • {subject.academic_year}
          </p>
        </div>
        <div className="flex gap-3">
          <Select
            value={groupBy}
            onValueChange={(value: "roll" | "course") => setGroupBy(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="roll">By Roll No.</SelectItem>
              <SelectItem value="course">By Course</SelectItem>
            </SelectContent>
          </Select>
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
          <Button
            onClick={handleExportExcel}
            disabled={exporting || reportData.length === 0}>
            {exporting ? (
              <>
                <Icon
                  icon="lucide:loader-2"
                  className="mr-2 h-4 w-4 animate-spin"
                />
                Exporting...
              </>
            ) : (
              <>
                <Icon icon="lucide:download" className="mr-2 h-4 w-4" />
                Export Excel
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Attendance Data */}
      {reportData.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 mb-4 opacity-50">
              <Icon icon="lucide:bar-chart" className="h-full w-full" />
            </div>
            <CardTitle className="mb-2">No attendance data</CardTitle>
            <CardDescription className="text-center mb-4">
              Start marking attendance to generate reports
            </CardDescription>
            <Button
              onClick={() =>
                router.push(`/dashboard/subjects/${subjectId}/attendance`)
              }>
              <Icon icon="lucide:clipboard-check" className="h-4 w-4 mr-2" />
              Mark Attendance
            </Button>
          </CardContent>
        </Card>
      ) : (
        (() => {
          const groupedData = groupData(reportData);
          const groups = Object.keys(groupedData).sort();

          return (
            <div className="space-y-8">
              {/* Overall Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Distribution</CardTitle>
                  <CardDescription>
                    Visual representation of student attendance percentages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AttendanceChart data={reportData} />
                </CardContent>
              </Card>

              {/* Columnar Layout */}
              <div
                className={`${
                  groupBy === "course"
                    ? "space-y-8"
                    : `grid ${
                        groups.length === 1
                          ? "grid-cols-1"
                          : "grid-cols-1 lg:grid-cols-2"
                      } gap-8`
                }`}>
                {groups.map((groupName) => {
                  const groupStudentsData = groupedData[groupName];
                  const stats = getColumnStats(groupStudentsData);

                  return (
                    <Card
                      key={groupName}
                      className={`h-fit ${
                        groupBy === "course" ? "w-full" : ""
                      }`}>
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg font-semibold">
                            {groupBy === "course"
                              ? groupName
                              : "Students by Roll Number"}
                          </CardTitle>
                          <Badge variant="outline">
                            {stats.totalStudents} student
                            {stats.totalStudents !== 1 ? "s" : ""}
                          </Badge>
                        </div>

                        {/* Column Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-2">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                              {(stats.avgAttendance || 0).toFixed(1)}%
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Avg Attendance
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                              {stats.highAttendance}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              High (≥80%)
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-600">
                              {stats.lowAttendance}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Low (&lt;60%)
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-12">Roll</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead className="w-20">Classes</TableHead>
                              <TableHead className="w-20">Present</TableHead>
                              <TableHead className="w-20">Attendance</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {groupStudentsData.map((student) => (
                              <TableRow key={student.student_id}>
                                <TableCell className="font-mono text-sm">
                                  {student.roll_number}
                                </TableCell>
                                <TableCell>
                                  <div>
                                    <div className="font-medium">
                                      {student.student_name}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {student.reg_number}
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="text-center">
                                  {student.total_classes}
                                </TableCell>
                                <TableCell className="text-center">
                                  {student.present_count}
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    className={getAttendanceBadgeColor(
                                      student.attendance_percentage
                                    )}
                                    variant="secondary">
                                    {(
                                      student.attendance_percentage || 0
                                    ).toFixed(1)}
                                    %
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })()
      )}
    </div>
  );
}
