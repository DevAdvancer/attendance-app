"use client";

import {
  format,
  eachDayOfInterval,
  isSameDay,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { type Attendance } from "@/lib/supabase";

interface AttendanceCalendarViewProps {
  attendance: Attendance[];
  dateRange: { start: Date | null; end: Date | null };
}

export function AttendanceCalendarView({
  attendance,
  dateRange,
}: AttendanceCalendarViewProps) {
  if (!dateRange.start || !dateRange.end) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Calendar view is not available for "All Time" range.
      </div>
    );
  }

  // Generate all days in the range
  const allDays = eachDayOfInterval({
    start: startOfWeek(dateRange.start),
    end: endOfWeek(dateRange.end),
  });

  // Group days by weeks
  const weeks: Date[][] = [];
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }

  const getAttendanceForDate = (date: Date) => {
    return attendance.find((a) => isSameDay(new Date(a.date), date));
  };

  const getDayClass = (date: Date) => {
    const attendanceRecord = getAttendanceForDate(date);
    const isInRange = date >= dateRange.start! && date <= dateRange.end!;

    if (!isInRange) {
      return "text-muted-foreground bg-muted/30";
    }

    if (attendanceRecord) {
      if (attendanceRecord.status === "present") {
        return "bg-green-100 text-green-700 border-green-200";
      } else {
        return "bg-red-100 text-red-700 border-red-200";
      }
    }

    return "bg-background hover:bg-muted/50";
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
          <span>Present</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
          <span>Absent</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-background border rounded"></div>
          <span>No class</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-7 bg-muted/50">
          {weekDays.map((day) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Weeks */}
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 border-t">
            {week.map((date, dayIndex) => {
              const attendanceRecord = getAttendanceForDate(date);
              return (
                <div
                  key={dayIndex}
                  className={`p-3 text-center text-sm border-r last:border-r-0 min-h-[3rem] flex flex-col items-center justify-center transition-colors ${getDayClass(
                    date
                  )}`}>
                  <div className="font-medium">{format(date, "d")}</div>
                  {attendanceRecord && (
                    <div className="text-xs mt-1">
                      {attendanceRecord.status === "present" ? "P" : "A"}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Month Header */}
      <div className="text-center text-lg font-semibold">
        {format(dateRange.start, "MMMM yyyy")}
        {format(dateRange.start, "MMMM yyyy") !==
          format(dateRange.end, "MMMM yyyy") &&
          ` - ${format(dateRange.end, "MMMM yyyy")}`}
      </div>
    </div>
  );
}
