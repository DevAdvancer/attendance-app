"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { useSubjects, cacheManagement } from "@/lib/hooks/use-optimized-data";
import { CreateSubjectDialog } from "@/components/subjects/create-subject-dialog";
import { SubjectCard } from "@/components/subjects/subject-card";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Use optimized hook with caching
  const {
    data: subjects,
    loading,
    error,
    refetch,
  } = useSubjects(user?.id, {
    enabled: isAuthenticated,
  });

  const handleSubjectCreated = () => {
    // Invalidate cache and refetch
    if (user?.id) {
      cacheManagement.invalidateSubjects(user.id);
    }
    refetch();
    setShowCreateDialog(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Icon
            icon="lucide:loader-2"
            className="h-8 w-8 animate-spin mx-auto mb-2"
          />
          <p className="text-sm text-muted-foreground">
            Loading your subjects...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Icon
            icon="lucide:alert-circle"
            className="h-8 w-8 text-destructive mx-auto mb-2"
          />
          <p className="text-sm text-muted-foreground">
            Failed to load subjects
          </p>
          <Button
            onClick={refetch}
            variant="outline"
            size="sm"
            className="mt-2">
            Try Again
          </Button>
        </div>
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
      {!subjects || subjects.length === 0 ? (
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
              onUpdate={refetch}
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
