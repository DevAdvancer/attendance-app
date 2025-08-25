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

export default function StudentTrackingPage() {
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
            onClick={() => window.history.back()}
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
            <h1 className="text-4xl font-bold mb-4">Student Tracking</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive student tracking and management system for efficient
              classroom organization and monitoring.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon
                    icon="lucide:user-plus"
                    className="h-6 w-6 text-primary"
                  />
                </div>
                <CardTitle>Student Registration</CardTitle>
                <CardDescription>
                  Add students individually or import them in bulk using Excel
                  or CSV files with comprehensive information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Individual student addition
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Bulk import from Excel/CSV
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Auto-generated roll numbers
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon
                    icon="lucide:clipboard-list"
                    className="h-6 w-6 text-primary"
                  />
                </div>
                <CardTitle>Attendance Marking</CardTitle>
                <CardDescription>
                  Mark attendance quickly and efficiently with our intuitive
                  interface designed for speed and accuracy.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    One-click attendance marking
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Bulk attendance operations
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Real-time updates
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon icon="lucide:search" className="h-6 w-4 text-primary" />
                </div>
                <CardTitle>Student Search & Filter</CardTitle>
                <CardDescription>
                  Find students quickly using advanced search and filtering
                  options based on various criteria.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Name-based search
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Roll number lookup
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Course-wise filtering
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon
                    icon="lucide:history"
                    className="h-6 w-6 text-primary"
                  />
                </div>
                <CardTitle>Attendance History</CardTitle>
                <CardDescription>
                  Track individual student attendance patterns and view detailed
                  attendance history for any date range.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Individual attendance records
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Date range filtering
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Attendance trends
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-card border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Track Your Students?
            </h2>
            <p className="text-muted-foreground mb-6">
              Start managing your classroom attendance efficiently with our
              comprehensive student tracking system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button size="lg" className="flex items-center gap-2">
                  <Icon icon="lucide:log-in" className="h-4 w-4" />
                  Get Started Free
                </Button>
              </Link>
              <Link href="/features/attendance-reports">
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
