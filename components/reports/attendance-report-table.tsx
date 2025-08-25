"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

interface AttendanceReportTableProps {
  data: AttendanceReport[];
}

export function AttendanceReportTable({ data }: AttendanceReportTableProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter(
    (student) =>
      student.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.reg_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.roll_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getAttendanceBadge = (percentage: number) => {
    if (percentage >= 80) return "bg-green-100 text-green-700";
    if (percentage >= 60) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Detailed Attendance Report</h3>
          <div className="relative w-64">
            <Icon
              icon="lucide:search"
              className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"
            />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Registration</TableHead>
              <TableHead>Roll Number</TableHead>
              <TableHead>Course</TableHead>
              <TableHead className="text-center">Total Classes</TableHead>
              <TableHead className="text-center">Present</TableHead>
              <TableHead className="text-center">Absent</TableHead>
              <TableHead className="text-center">Attendance %</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((student) => (
              <TableRow key={student.student_id}>
                <TableCell className="font-medium">
                  {student.student_name}
                </TableCell>
                <TableCell>{student.reg_number}</TableCell>
                <TableCell>{student.roll_number}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell className="text-center">
                  {student.total_classes}
                </TableCell>
                <TableCell className="text-center text-green-600">
                  {student.present_count}
                </TableCell>
                <TableCell className="text-center text-red-600">
                  {student.absent_count}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAttendanceBadge(
                      student.attendance_percentage
                    )}`}>
                    {student.attendance_percentage.toFixed(1)}%
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      router.push(
                        `/dashboard/students/${student.student_id}/history`
                      )
                    }>
                    <Icon icon="lucide:eye" className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filteredData.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No students found matching your search.
          </div>
        )}
      </div>
    </Card>
  );
}
