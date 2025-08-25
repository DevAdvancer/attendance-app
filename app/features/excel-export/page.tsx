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

export default function ExcelExportPage() {
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
            <h1 className="text-4xl font-bold mb-4">Excel Export</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Export comprehensive attendance data in Excel format for detailed
              analysis, reporting, and record keeping.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon
                    icon="lucide:file-spreadsheet"
                    className="h-6 w-6 text-primary"
                  />
                </div>
                <CardTitle>Multiple Export Formats</CardTitle>
                <CardDescription>
                  Export data in various Excel formats including .xlsx and .xls
                  for maximum compatibility.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Excel 2007+ (.xlsx)
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Legacy Excel (.xls)
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    CSV format support
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon
                    icon="lucide:columns"
                    className="h-6 w-6 text-primary"
                  />
                </div>
                <CardTitle>Customizable Columns</CardTitle>
                <CardDescription>
                  Choose which data columns to include in your export for
                  focused and relevant reports.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Student information
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Attendance dates
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Performance metrics
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon
                    icon="lucide:calendar-range"
                    className="h-6 w-6 text-primary"
                  />
                </div>
                <CardTitle>Date Range Selection</CardTitle>
                <CardDescription>
                  Export attendance data for specific time periods, semesters,
                  or custom date ranges.
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
                    Semester periods
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Academic year data
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon
                    icon="lucide:pie-chart"
                    className="h-6 w-6 text-primary"
                  />
                </div>
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>
                  Include calculated fields, summaries, and statistical data for
                  comprehensive analysis.
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
                    Performance summaries
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="lucide:check"
                      className="h-4 w-4 text-green-500"
                    />
                    Trend analysis
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-card border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Export Your Data?
            </h2>
            <p className="text-muted-foreground mb-6">
              Start exporting comprehensive attendance reports in Excel format
              for better analysis and record keeping.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button size="lg" className="flex items-center gap-2">
                  <Icon icon="lucide:log-in" className="h-4 w-4" />
                  Get Started Free
                </Button>
              </Link>
              <Link href="/support/documentation">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2">
                  <Icon icon="lucide:book-open" className="h-4 w-4" />
                  View Documentation
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
