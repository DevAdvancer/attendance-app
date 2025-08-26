"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export default function SubjectManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 bg-white rounded-lg p-1.5 shadow-sm border">
              <img
                src="/logo.png"
                alt="AttendanceTracker Logo"
                className="w-full h-full"
              />
            </div>
            <h1 className="text-xl font-bold">AttendanceTracker</h1>
          </Link>

          <Button
            variant="outline"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.history.back();
              }
            }}
            className="flex items-center gap-2">
            <Icon icon="lucide:arrow-left" className="h-4 w-4" />
            Back
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Subject Management</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Efficiently organize and manage your academic subjects with our
              comprehensive subject management system.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon
                    icon="lucide:book-open"
                    className="h-6 w-6 text-primary"
                  />
                </div>
                <CardTitle>Create Subjects</CardTitle>
                <CardDescription>
                  Easily create new subjects with detailed information including
                  course codes, descriptions, and academic periods.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Course code generation
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Academic year tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Semester organization
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon icon="lucide:users" className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>
                  Add and manage student lists for each subject with
                  comprehensive student information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Bulk student import
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Excel/CSV support
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Student profiles
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon
                    icon="lucide:settings"
                    className="h-6 w-6 text-primary"
                  />
                </div>
                <CardTitle>Subject Settings</CardTitle>
                <CardDescription>
                  Customize subject settings, manage permissions, and configure
                  attendance requirements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Attendance policies
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Grading schemes
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Notification settings
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon
                    icon="lucide:bar-chart-3"
                    className="h-6 w-6 text-primary"
                  />
                </div>
                <CardTitle>Subject Analytics</CardTitle>
                <CardDescription>
                  Track subject performance, student engagement, and attendance
                  trends over time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Performance metrics
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Attendance patterns
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Progress tracking
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-card border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of educators who are already using
              AttendanceTracker to streamline their classroom management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button size="lg" className="flex items-center gap-2">
                  <Icon icon="lucide:log-in" className="h-4 w-4" />
                  Get Started Free
                </Button>
              </Link>
              <Link href="/features/student-tracking">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2">
                  <Icon icon="lucide:arrow-right" className="h-4 w-4" />
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <ScrollToTop />
    </div>
  );
}
