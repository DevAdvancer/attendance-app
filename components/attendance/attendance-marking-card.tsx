"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Student } from "@/lib/supabase";

interface AttendanceMarkingCardProps {
  student: Student;
  status?: "present" | "absent";
  onStatusChange: (status: "present" | "absent") => void;
  disabled?: boolean;
}

export function AttendanceMarkingCard({
  student,
  status,
  onStatusChange,
  disabled = false,
}: AttendanceMarkingCardProps) {
  return (
    <Card
      className={`transition-colors ${
        status === "present"
          ? "border-green-200 bg-green-50/50"
          : status === "absent"
          ? "border-red-200 bg-red-50/50"
          : "hover:shadow-md"
      }`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{student.name}</CardTitle>
        <CardDescription>
          {student.reg_number} • {student.roll_number}
        </CardDescription>
        <CardDescription className="text-sm">{student.course}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={status === "present" ? "default" : "outline"}
            size="sm"
            onClick={() => onStatusChange("present")}
            disabled={disabled}
            className={
              status === "present"
                ? "bg-green-600 hover:bg-green-700 border-green-600"
                : "hover:bg-green-50 hover:border-green-300 hover:text-green-700"
            }>
            <Icon icon="lucide:check" className="h-4 w-4 mr-2" />
            Present
          </Button>
          <Button
            variant={status === "absent" ? "default" : "outline"}
            size="sm"
            onClick={() => onStatusChange("absent")}
            disabled={disabled}
            className={
              status === "absent"
                ? "bg-red-600 hover:bg-red-700 border-red-600"
                : "hover:bg-red-50 hover:border-red-300 hover:text-red-700"
            }>
            <Icon icon="lucide:x" className="h-4 w-4 mr-2" />
            Absent
          </Button>
        </div>
        {status && (
          <div className="mt-3 text-center">
            <span
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                status === "present"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}>
              <Icon
                icon={status === "present" ? "lucide:check" : "lucide:x"}
                className="h-3 w-3 mr-1"
              />
              {status === "present" ? "Present" : "Absent"}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
