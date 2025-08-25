"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase, type Subject, type Student } from "@/lib/supabase";
import { CreateStudentDialog } from "@/components/students/create-student-dialog";
import { StudentsTable } from "@/components/students/students-table";
import { ImportStudentsDialog } from "@/components/students/import-students-dialog";

export default function StudentsPage() {
  const params = useParams();
  const router = useRouter();
  const subjectId = params.id as string;

  const [subject, setSubject] = useState<Subject | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);

  useEffect(() => {
    fetchSubjectAndStudents();
  }, [subjectId]);

  const fetchSubjectAndStudents = async () => {
    try {
      // Fetch subject details
      const { data: subjectData, error: subjectError } = await supabase
        .from("subjects")
        .select("*")
        .eq("id", subjectId)
        .single();

      if (subjectError) throw subjectError;
      setSubject(subjectData);

      // Fetch students
      const { data: studentsData, error: studentsError } = await supabase
        .from("students")
        .select("*")
        .eq("subject_id", subjectId);

      if (studentsError) throw studentsError;
      setStudents(studentsData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentCreated = () => {
    fetchSubjectAndStudents();
    setShowCreateDialog(false);
  };

  const handleStudentsImported = () => {
    fetchSubjectAndStudents();
    setShowImportDialog(false);
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
          <h1 className="text-3xl font-bold">{subject.name} Students</h1>
          <p className="text-muted-foreground">
            {subject.code} • {subject.academic_year} • Semester{" "}
            {subject.semester}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowImportDialog(true)}>
            <Icon icon="lucide:upload" className="h-4 w-4 mr-2" />
            Import Students
          </Button>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Icon icon="lucide:user-plus" className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Students Count */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Subject Code</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subject.code}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Academic Year</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subject.academic_year}</div>
          </CardContent>
        </Card>
      </div>

      {/* Students Table */}
      {students.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 mb-4 opacity-50">
              <Icon icon="lucide:users" className="h-full w-full" />
            </div>
            <CardTitle className="mb-2">No students yet</CardTitle>
            <CardDescription className="text-center mb-4">
              Add students to this subject to start tracking attendance
            </CardDescription>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowImportDialog(true)}>
                <Icon icon="lucide:upload" className="h-4 w-4 mr-2" />
                Import Students
              </Button>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Icon icon="lucide:user-plus" className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <StudentsTable
          students={students}
          subjectId={subjectId}
          onUpdate={fetchSubjectAndStudents}
        />
      )}

      {/* Dialogs */}
      <CreateStudentDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        subjectId={subjectId}
        onStudentCreated={handleStudentCreated}
      />
      <ImportStudentsDialog
        open={showImportDialog}
        onOpenChange={setShowImportDialog}
        subjectId={subjectId}
        onStudentsImported={handleStudentsImported}
      />
    </div>
  );
}
