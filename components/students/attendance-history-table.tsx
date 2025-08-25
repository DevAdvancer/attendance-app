"use client";

import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Attendance } from "@/lib/supabase";

interface AttendanceHistoryTableProps {
  attendance: Attendance[];
}

export function AttendanceHistoryTable({
  attendance,
}: AttendanceHistoryTableProps) {
  const getStatusIcon = (status: string) => {
    if (status === "present") {
      return <Icon icon="lucide:check" className="h-4 w-4 text-green-600" />;
    } else {
      return <Icon icon="lucide:x" className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "present") {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          <Icon icon="lucide:check" className="h-3 w-3 mr-1" />
          Present
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
          <Icon icon="lucide:x" className="h-3 w-3 mr-1" />
          Absent
        </span>
      );
    }
  };

  return (
    <Card>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Attendance History</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Day</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Marked At</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendance.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">
                  {format(new Date(record.date), "MMM d, yyyy")}
                </TableCell>
                <TableCell>{format(new Date(record.date), "EEEE")}</TableCell>
                <TableCell>{getStatusBadge(record.status)}</TableCell>
                <TableCell className="text-muted-foreground">
                  {format(
                    new Date(record.marked_at),
                    "MMM d, yyyy 'at' h:mm a"
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {record.notes || "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
