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
import { Input } from "@/components/ui/input";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export default function HelpCenterPage() {
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
            <h1 className="text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions and get the support you need to
              use AttendanceTracker effectively.
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-12">
            <div className="relative max-w-2xl mx-auto">
              <Input
                type="text"
                placeholder="Search for help articles, tutorials, or common questions..."
                className="pl-12 pr-4 py-3 text-lg"
              />
              <Icon
                icon="lucide:search"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground"
              />
            </div>
          </div>

          {/* Help Categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Help Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon
                      icon="lucide:user-plus"
                      className="h-6 w-6 text-primary"
                    />
                  </div>
                  <CardTitle>Account & Setup</CardTitle>
                  <CardDescription>
                    Learn how to create an account, set up your profile, and get
                    started.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon
                      icon="lucide:book-open"
                      className="h-6 w-6 text-primary"
                    />
                  </div>
                  <CardTitle>Subject Management</CardTitle>
                  <CardDescription>
                    Create and manage subjects, courses, and academic periods.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon
                      icon="lucide:users"
                      className="h-6 w-6 text-primary"
                    />
                  </div>
                  <CardTitle>Student Management</CardTitle>
                  <CardDescription>
                    Add, import, and manage student lists for your subjects.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon
                      icon="lucide:clipboard-list"
                      className="h-6 w-6 text-primary"
                    />
                  </div>
                  <CardTitle>Attendance Marking</CardTitle>
                  <CardDescription>
                    Mark daily attendance and manage attendance records.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon
                      icon="lucide:bar-chart-3"
                      className="h-6 w-6 text-primary"
                    />
                  </div>
                  <CardTitle>Reports & Analytics</CardTitle>
                  <CardDescription>
                    Generate reports, view analytics, and export data.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon
                      icon="lucide:settings"
                      className="h-6 w-6 text-primary"
                    />
                  </div>
                  <CardTitle>Settings & Preferences</CardTitle>
                  <CardDescription>
                    Customize your account settings and preferences.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          {/* Popular Articles */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Popular Help Articles</h2>
            <div className="space-y-4">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold mb-2">
                        How to Import Students from Excel
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Step-by-step guide to importing student lists using
                        Excel files.
                      </p>
                    </div>
                    <Icon
                      icon="lucide:chevron-right"
                      className="h-5 w-5 text-muted-foreground"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold mb-2">
                        Understanding Attendance Reports
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Learn how to read and interpret attendance reports and
                        analytics.
                      </p>
                    </div>
                    <Icon
                      icon="lucide:chevron-right"
                      className="h-5 w-5 text-muted-foreground"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold mb-2">
                        Troubleshooting Common Issues
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Solutions to frequently encountered problems and errors.
                      </p>
                    </div>
                    <Icon
                      icon="lucide:chevron-right"
                      className="h-5 w-5 text-muted-foreground"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Options */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Still Need Help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon icon="lucide:mail" className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Email Support</CardTitle>
                  <CardDescription>
                    Send us a detailed message and we'll get back to you within
                    24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Send Email
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon
                      icon="lucide:message-circle"
                      className="h-6 w-6 text-primary"
                    />
                  </div>
                  <CardTitle>Live Chat</CardTitle>
                  <CardDescription>
                    Chat with our support team in real-time during business
                    hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon
                      icon="lucide:phone"
                      className="h-6 w-6 text-primary"
                    />
                  </div>
                  <CardTitle>Phone Support</CardTitle>
                  <CardDescription>
                    Call us directly for urgent issues or complex problems.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-card border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of educators who are already using
              AttendanceTracker successfully.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button size="lg" className="flex items-center gap-2">
                  <Icon icon="lucide:log-in" className="h-4 w-4" />
                  Get Started Free
                </Button>
              </Link>
              <Link href="/support/contact-us">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2">
                  <Icon icon="lucide:mail" className="h-4 w-4" />
                  Contact Support
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
