"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase, type Student } from "@/lib/supabase";
import { EditStudentDialog } from "./edit-student-dialog";

interface StudentsTableProps {
  students: Student[];
  subjectId: string;
  onUpdate: () => void;
}

export function StudentsTable({
  students,
  subjectId,
  onUpdate,
}: StudentsTableProps) {
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudentId, setDeletingStudentId] = useState<string | null>(
    null
  );

  const handleDelete = async (studentId: string) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    setDeletingStudentId(studentId);
    try {
      const { error } = await supabase
        .from("students")
        .delete()
        .eq("id", studentId);

      if (error) throw error;
      onUpdate();
    } catch (error) {
      console.error("Error deleting student:", error);
    } finally {
      setDeletingStudentId(null);
    }
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
  };

  const handleStudentUpdated = () => {
    setEditingStudent(null);
    onUpdate();
  };

  return (
    <>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Registration Number</TableHead>
              <TableHead>Roll Number</TableHead>
              <TableHead>Course</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.reg_number}</TableCell>
                <TableCell>{student.roll_number}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Icon
                          icon="lucide:more-horizontal"
                          className="h-4 w-4"
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(student)}>
                        <Icon icon="lucide:edit" className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(student.id)}
                        disabled={deletingStudentId === student.id}
                        className="text-destructive">
                        <Icon icon="lucide:trash-2" className="h-4 w-4 mr-2" />
                        {deletingStudentId === student.id
                          ? "Deleting..."
                          : "Delete"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {editingStudent && (
        <EditStudentDialog
          open={!!editingStudent}
          onOpenChange={(open) => !open && setEditingStudent(null)}
          student={editingStudent}
          onStudentUpdated={handleStudentUpdated}
        />
      )}
    </>
  );
}
