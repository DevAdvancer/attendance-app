"use client";

import { useState, memo } from "react";
import { useRouter } from "next/navigation";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase, type Subject } from "@/lib/supabase";

interface SubjectCardProps {
  subject: Subject;
  onUpdate: () => void;
}

export const SubjectCard = memo(function SubjectCard({
  subject,
  onUpdate,
}: SubjectCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this subject?")) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("subjects")
        .delete()
        .eq("id", subject.id);

      if (error) throw error;
      onUpdate();
    } catch (error) {
      console.error("Error deleting subject:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleViewStudents = () => {
    router.push(`/dashboard/subjects/${subject.id}/students`);
  };

  const handleMarkAttendance = () => {
    router.push(`/dashboard/subjects/${subject.id}/attendance`);
  };

  const handleViewReports = () => {
    router.push(`/dashboard/subjects/${subject.id}/reports`);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{subject.name}</CardTitle>
            <CardDescription>
              {subject.code} • {subject.academic_year} • Semester{" "}
              {subject.semester}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Icon icon="lucide:more-horizontal" className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleViewStudents}>
                <Icon icon="lucide:users" className="h-4 w-4 mr-2" />
                Manage Students
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleViewReports}>
                <Icon icon="lucide:bar-chart" className="h-4 w-4 mr-2" />
                View Reports
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-destructive">
                <Icon icon="lucide:trash-2" className="h-4 w-4 mr-2" />
                {isDeleting ? "Deleting..." : "Delete"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {subject.description && (
          <p className="text-sm text-muted-foreground">{subject.description}</p>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewStudents}
            className="w-full">
            <Icon icon="lucide:users" className="h-4 w-4 mr-2" />
            Students
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleMarkAttendance}
            className="w-full">
            <Icon icon="lucide:clipboard-check" className="h-4 w-4 mr-2" />
            Attendance
          </Button>
        </div>
      </CardContent>
    </Card>
  );
});
