"use client";

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

interface AttendanceChartProps {
  data: AttendanceReport[];
}

export function AttendanceChart({ data }: AttendanceChartProps) {
  // Group students by attendance percentage ranges
  const ranges = [
    { label: "90-100%", min: 90, max: 100, color: "bg-green-500" },
    { label: "80-89%", min: 80, max: 89, color: "bg-green-400" },
    { label: "70-79%", min: 70, max: 79, color: "bg-yellow-500" },
    { label: "60-69%", min: 60, max: 69, color: "bg-orange-500" },
    { label: "Below 60%", min: 0, max: 59, color: "bg-red-500" },
  ];

  const chartData = ranges.map((range) => {
    const count = data.filter(
      (student) =>
        student.attendance_percentage >= range.min &&
        student.attendance_percentage <= range.max
    ).length;
    return { ...range, count };
  });

  const maxCount = Math.max(...chartData.map((item) => item.count), 1);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-20 text-sm font-medium">{item.label}</div>
            <div className="flex-1 bg-muted rounded-full h-8 relative overflow-hidden">
              <div
                className={`${item.color} h-full rounded-full transition-all duration-500`}
                style={{
                  width: `${(item.count / maxCount) * 100}%`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-foreground">
                {item.count} student{item.count !== 1 ? "s" : ""}
              </div>
            </div>
            <div className="w-12 text-sm text-muted-foreground text-right">
              {((item.count / data.length) * 100).toFixed(0)}%
            </div>
          </div>
        ))}
      </div>
      <div className="text-sm text-muted-foreground">
        Total: {data.length} students
      </div>
    </div>
  );
}
