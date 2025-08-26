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

export default function AttendanceReportsPage() {
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
            <h1 className="text-4xl font-bold mb-4">Attendance Reports</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Generate comprehensive attendance reports and analytics to track
              student performance and identify trends.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon
                    icon="lucide:bar-chart-3"
                    className="h-6 w-6 text-primary"
                  />
                </div>
                <CardTitle>Comprehensive Analytics</CardTitle>
                <CardDescription>
                  Get detailed insights into attendance patterns, student
                  performance, and class statistics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Attendance percentages
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Performance trends
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Comparative analysis
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon
                    icon="lucide:file-spreadsheet"
                    className="h-6 w-6 text-primary"
                  />
                </div>
                <CardTitle>Excel Export</CardTitle>
                <CardDescription>
                  Export detailed attendance reports in Excel format for further
                  analysis and record keeping.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Multiple format options
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Customizable columns
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Date range selection
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon
                    icon="lucide:calendar"
                    className="h-6 w-6 text-primary"
                  />
                </div>
                <CardTitle>Date Range Reports</CardTitle>
                <CardDescription>
                  Generate reports for specific date ranges, semesters, or
                  academic periods as needed.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Custom date ranges
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Semester-wise reports
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Academic year summary
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon icon="lucide:users" className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Group-wise Analysis</CardTitle>
                <CardDescription>
                  Analyze attendance data by different groupings such as roll
                  numbers, courses, or performance levels.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Roll number grouping
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Course-wise analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Performance categories
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-card border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">
              Ready for Detailed Insights?
            </h2>
            <p className="text-muted-foreground mb-6">
              Start generating comprehensive attendance reports to better
              understand your classroom dynamics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button size="lg" className="flex items-center gap-2">
                  <Icon icon="lucide:log-in" className="h-4 w-4" />
                  Get Started Free
                </Button>
              </Link>
              <Link href="/features/excel-export">
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
