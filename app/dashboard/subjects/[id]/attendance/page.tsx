"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { supabase, type Attendance, type Student } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";
import {
  useSubjectWithStudents,
  useAttendance,
  cacheManagement,
} from "@/lib/hooks/use-optimized-data";
import { LoadingSpinner, ErrorState } from "@/components/ui/loading-states";
import { AttendanceMarkingCard } from "@/components/attendance/attendance-marking-card";

interface GroupedStudents {
  [key: string]: any[];
}

export default function AttendancePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const subjectId = params.id as string;

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [saving, setSaving] = useState(false);
  const [groupBy, setGroupBy] = useState<"roll" | "course">("roll");
  const [pendingChanges, setPendingChanges] = useState<
    Record<string, "present" | "absent">
  >({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const dateStr = format(selectedDate, "yyyy-MM-dd");

  // Reset pending changes when date changes
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      // If there are unsaved changes, ask user to confirm
      if (hasUnsavedChanges) {
        if (
          confirm(
            "You have unsaved changes. Are you sure you want to change the date? All changes will be lost."
          )
        ) {
          setSelectedDate(date);
          setPendingChanges({});
          setHasUnsavedChanges(false);
        }
      } else {
        setSelectedDate(date);
      }
    }
  };

  // Use optimized hooks
  const {
    data: subjectData,
    loading: subjectLoading,
    error: subjectError,
    refetch: refetchSubject,
  } = useSubjectWithStudents(subjectId);

  const {
    data: attendanceData,
    loading: attendanceLoading,
    error: attendanceError,
    refetch: refetchAttendance,
  } = useAttendance(subjectId, dateStr);

  const subject = subjectData?.subject || null;
  const students = subjectData?.students || [];
  const attendance = attendanceData || [];

  const loading = subjectLoading || attendanceLoading;
  const error = subjectError || attendanceError;

  // Reset pending changes when date changes or component unmounts
  useEffect(() => {
    return () => {
      // Cleanup: reset pending changes on unmount
      setPendingChanges({});
      setHasUnsavedChanges(false);
    };
  }, []);

  const handleAttendanceChange = (
    studentId: string,
    status: "present" | "absent"
  ) => {
    if (!user) return;

    // Update local state instead of database
    setPendingChanges((prev) => {
      const newChanges = { ...prev, [studentId]: status };
      return newChanges;
    });

    // Mark that we have unsaved changes
    setHasUnsavedChanges(true);
  };

  const handleSubmitAttendance = async () => {
    if (!user || Object.keys(pendingChanges).length === 0) return;

    setSaving(true);
    try {
      // Process all pending changes
      const promises = Object.entries(pendingChanges).map(
        async ([studentId, status]) => {
          const existingRecord = attendance.find(
            (a) => a.student_id === studentId
          );

          if (existingRecord) {
            // Update existing record
            const { error } = await supabase
              .from("attendance")
              .update({ status })
              .eq("id", existingRecord.id);
            return { error, studentId, status };
          } else {
            // Create new record
            const { error } = await supabase.from("attendance").insert({
              student_id: studentId,
              subject_id: subjectId,
              date: dateStr,
              status,
              marked_by: user.id,
            });
            return { error, studentId, status };
          }
        }
      );

      const results = await Promise.all(promises);

      // Check for any errors
      const errors = results.filter((result) => result.error);
      if (errors.length > 0) {
        console.error("Some attendance updates failed:", errors);
        throw new Error("Some attendance updates failed");
      }

      // Clear pending changes and refresh data
      setPendingChanges({});
      setHasUnsavedChanges(false);

      // Invalidate cache and refetch
      cacheManagement.invalidateAttendance(subjectId, dateStr);
      await refetchAttendance();
    } catch (error) {
      console.error("Error submitting attendance:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDiscardChanges = () => {
    setPendingChanges({});
    setHasUnsavedChanges(false);
  };

  const getAttendanceStatus = (studentId: string) => {
    // Check pending changes first, then database state
    if (pendingChanges[studentId]) {
      return pendingChanges[studentId];
    }
    const record = attendance.find((a) => a.student_id === studentId);
    return record?.status;
  };

  // Memoize expensive calculations
  const attendanceStats = useMemo(() => {
    const present = attendance.filter((a) => a.status === "present").length;
    const absent = attendance.filter((a) => a.status === "absent").length;
    const total = students.length;
    const unmarked = total - present - absent;

    return { present, absent, total, unmarked };
  }, [attendance, students.length]);

  const groupedStudents = useMemo((): GroupedStudents => {
    if (groupBy === "roll") {
      // Sort by roll number
      const sortedStudents = [...students].sort((a: any, b: any) => {
        const rollA = parseInt(a.roll_number.replace(/\D/g, "")) || 0;
        const rollB = parseInt(b.roll_number.replace(/\D/g, "")) || 0;
        return rollA - rollB;
      });
      return { "All Students": sortedStudents };
    } else {
      // Group by course
      const grouped = students.reduce((acc: GroupedStudents, student: any) => {
        const course = student.course;
        if (!acc[course]) {
          acc[course] = [];
        }
        acc[course].push(student);
        return acc;
      }, {});

      // Sort students within each course by roll number
      Object.keys(grouped).forEach((course) => {
        grouped[course].sort((a: any, b: any) => {
          const rollA = parseInt(a.roll_number.replace(/\D/g, "")) || 0;
          const rollB = parseInt(b.roll_number.replace(/\D/g, "")) || 0;
          return rollA - rollB;
        });
      });

      return grouped;
    }
  }, [students, groupBy]);

  const getGroupStats = (groupStudents: any[]) => {
    const groupAttendance = attendance.filter((att) =>
      groupStudents.some((student) => student.id === att.student_id)
    );
    const present = groupAttendance.filter(
      (a) => a.status === "present"
    ).length;
    const absent = groupAttendance.filter((a) => a.status === "absent").length;
    const total = groupStudents.length;
    const unmarked = total - present - absent;

    return { present, absent, total, unmarked };
  };

  if (loading) {
    return <LoadingSpinner message="Loading attendance data..." />;
  }

  if (error) {
    return (
      <ErrorState
        message="Failed to load attendance data"
        onRetry={() => {
          refetchSubject();
          refetchAttendance();
        }}
      />
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

  const stats = attendanceStats;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (hasUnsavedChanges) {
                  if (
                    confirm(
                      "You have unsaved changes. Are you sure you want to leave? All changes will be lost."
                    )
                  ) {
                    router.push("/dashboard");
                  }
                } else {
                  router.push("/dashboard");
                }
              }}>
              <Icon icon="lucide:arrow-left" className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>
          <h1 className="text-3xl font-bold">Mark Attendance</h1>
          <p className="text-muted-foreground">
            {subject.name} • {subject.code} •{" "}
            {format(selectedDate, "MMMM d, yyyy")}
          </p>
        </div>
        <div className="flex gap-3">
          {/* Submit/Discard buttons - only show when there are unsaved changes */}
          {hasUnsavedChanges && (
            <>
              <Button
                onClick={handleDiscardChanges}
                variant="outline"
                disabled={saving}
                className="text-orange-600 border-orange-600 hover:bg-orange-50">
                <Icon icon="lucide:x" className="h-4 w-4 mr-2" />
                Discard Changes
              </Button>
              <Button
                onClick={handleSubmitAttendance}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700">
                <Icon icon="lucide:save" className="h-4 w-4 mr-2" />
                {saving
                  ? "Saving..."
                  : `Save Changes (${Object.keys(pendingChanges).length})`}
              </Button>
            </>
          )}

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
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Icon icon="lucide:calendar" className="h-4 w-4 mr-2" />
                {format(selectedDate, "MMM d, yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
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
              {stats.present}
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
              {stats.absent}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-orange-600">
              Unmarked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {stats.unmarked}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Marking */}
      {students.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 mb-4 opacity-50">
              <Icon icon="lucide:users" className="h-full w-full" />
            </div>
            <CardTitle className="mb-2">No students found</CardTitle>
            <CardDescription className="text-center mb-4">
              Add students to this subject before marking attendance
            </CardDescription>
            <Button
              onClick={() =>
                router.push(`/dashboard/subjects/${subjectId}/students`)
              }>
              <Icon icon="lucide:user-plus" className="h-4 w-4 mr-2" />
              Add Students
            </Button>
          </CardContent>
        </Card>
      ) : (
        (() => {
          // Use memoized grouped students
          const groups = Object.keys(groupedStudents).sort();

          return (
            <div
              className={`${
                groupBy === "course"
                  ? "space-y-8"
                  : `grid ${
                      groups.length === 1
                        ? "grid-cols-1"
                        : "grid-cols-1 xl:grid-cols-2"
                    } gap-8`
              }`}>
              {groups.map((groupName) => {
                const groupStudentsList = groupedStudents[groupName];
                const groupStats = getGroupStats(groupStudentsList);

                return (
                  <Card
                    key={groupName}
                    className={`h-fit ${groupBy === "course" ? "w-full" : ""}`}>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold">
                          {groupBy === "course"
                            ? groupName
                            : "Students by Roll Number"}
                        </CardTitle>
                        <Badge variant="outline">
                          {groupStats.total} student
                          {groupStats.total !== 1 ? "s" : ""}
                        </Badge>
                      </div>

                      {/* Group Stats */}
                      <div className="grid grid-cols-4 gap-2 pt-2">
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">
                            {groupStats.present}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Present
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-red-600">
                            {groupStats.absent}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Absent
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-orange-600">
                            {groupStats.unmarked}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Unmarked
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">
                            {groupStats.total > 0
                              ? Math.round(
                                  (groupStats.present / groupStats.total) * 100
                                )
                              : 0}
                            %
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Attendance
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-16">Roll</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="w-24 text-center">
                              Present
                            </TableHead>
                            <TableHead className="w-24 text-center">
                              Absent
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {groupStudentsList.map((student) => {
                            const status = getAttendanceStatus(student.id);
                            return (
                              <TableRow key={student.id}>
                                <TableCell className="font-mono text-sm">
                                  {student.roll_number}
                                </TableCell>
                                <TableCell>
                                  <div>
                                    <div className="font-medium">
                                      {student.name}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {student.reg_number}
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="text-center">
                                  <div className="relative">
                                    <Button
                                      variant={
                                        status === "present"
                                          ? "default"
                                          : "outline"
                                      }
                                      size="sm"
                                      onClick={() =>
                                        handleAttendanceChange(
                                          student.id,
                                          "present"
                                        )
                                      }
                                      disabled={saving}
                                      className={`w-16 ${
                                        status === "present"
                                          ? "bg-green-600 hover:bg-green-700"
                                          : "hover:bg-green-50"
                                      }`}>
                                      <Icon
                                        icon="lucide:check"
                                        className="h-4 w-4"
                                      />
                                    </Button>
                                    {/* Pending change indicator */}
                                    {pendingChanges[student.id] ===
                                      "present" && (
                                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></div>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell className="text-center">
                                  <div className="relative">
                                    <Button
                                      variant={
                                        status === "absent"
                                          ? "default"
                                          : "outline"
                                      }
                                      size="sm"
                                      onClick={() =>
                                        handleAttendanceChange(
                                          student.id,
                                          "absent"
                                        )
                                      }
                                      disabled={saving}
                                      className={`w-16 ${
                                        status === "absent"
                                          ? "bg-red-600 hover:bg-red-700"
                                          : "hover:bg-red-50"
                                      }`}>
                                      <Icon
                                        icon="lucide:x"
                                        className="h-4 w-4"
                                      />
                                    </Button>
                                    {/* Pending change indicator */}
                                    {pendingChanges[student.id] ===
                                      "absent" && (
                                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full border-2 border-white"></div>
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          );
        })()
      )}
    </div>
  );
}
