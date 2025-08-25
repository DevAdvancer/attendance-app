"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Icon } from "@iconify/react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { supabase, type Student } from "@/lib/supabase";

const studentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  reg_number: z.string().min(2, "Registration number is required"),
  roll_number: z.string().min(1, "Roll number is required"),
  course: z.string().min(2, "Course is required"),
});

type StudentFormData = z.infer<typeof studentSchema>;

interface EditStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student;
  onStudentUpdated: () => void;
}

export function EditStudentDialog({
  open,
  onOpenChange,
  student,
  onStudentUpdated,
}: EditStudentDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: student.name,
      reg_number: student.reg_number,
      roll_number: student.roll_number,
      course: student.course,
    },
  });

  const onSubmit = async (data: StudentFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("students")
        .update({
          name: data.name,
          reg_number: data.reg_number.toUpperCase(),
          roll_number: data.roll_number.toUpperCase(),
          course: data.course,
        })
        .eq("id", student.id);

      if (error) {
        if (error.code === "23505") {
          if (error.message.includes("reg_number")) {
            form.setError("reg_number", {
              message: "Registration number already exists for this subject",
            });
          } else if (error.message.includes("roll_number")) {
            form.setError("roll_number", {
              message: "Roll number already exists for this subject",
            });
          }
          return;
        }
        throw error;
      }

      onStudentUpdated();
    } catch (error) {
      console.error("Error updating student:", error);
      form.setError("root", {
        message: "Failed to update student. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogDescription>Update the student information.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="reg_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Number</FormLabel>
                    <FormControl>
                      <Input placeholder="REG001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roll_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roll Number</FormLabel>
                    <FormControl>
                      <Input placeholder="ROLL001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <FormControl>
                    <Input placeholder="Computer Science" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.errors.root && (
              <div className="text-sm text-destructive">
                {form.formState.errors.root.message}
              </div>
            )}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Icon
                      icon="lucide:loader-2"
                      className="mr-2 h-4 w-4 animate-spin"
                    />
                    Updating...
                  </>
                ) : (
                  <>
                    <Icon icon="lucide:save" className="mr-2 h-4 w-4" />
                    Update Student
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
