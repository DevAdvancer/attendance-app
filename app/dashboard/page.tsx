"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase, type Subject } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";
import { CreateSubjectDialog } from "@/components/subjects/create-subject-dialog";
import { SubjectCard } from "@/components/subjects/subject-card";

export default function Dashboard() {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  useEffect(() => {
    if (user) {
      fetchSubjects();
    }
  }, [user]);

  const fetchSubjects = async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("subjects")
        .select(
          "id, teacher_id, name, code, description, academic_year, semester, created_at, updated_at"
        )
        .eq("teacher_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20); // Limit for better performance

      if (error) throw error;
      setSubjects(data || []);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectCreated = () => {
    fetchSubjects();
    setShowCreateDialog(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Icon icon="lucide:loader-2" className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your subjects and track attendance
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Icon icon="lucide:plus" className="h-4 w-4 mr-2" />
          Create Subject
        </Button>
      </div>

      {/* Subjects Grid */}
      {subjects.length === 0 ? (
        <Card className="col-span-full">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 mb-4 opacity-50">
              <Icon icon="lucide:book-open" className="h-full w-full" />
            </div>
            <CardTitle className="mb-2">No subjects yet</CardTitle>
            <CardDescription className="text-center mb-4">
              Create your first subject to start tracking attendance
            </CardDescription>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Icon icon="lucide:plus" className="h-4 w-4 mr-2" />
              Create Subject
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onUpdate={fetchSubjects}
            />
          ))}
        </div>
      )}

      {/* Create Subject Dialog */}
      <CreateSubjectDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onSubjectCreated={handleSubjectCreated}
      />
    </div>
  );
}
