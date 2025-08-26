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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export default function DocumentationPage() {
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
            <h1 className="text-4xl font-bold mb-4">Documentation</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive guides and tutorials to help you get the most out of
              AttendanceTracker.
            </p>
          </div>

          {/* Quick Start Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Quick Start Guide</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon
                      icon="lucide:user-plus"
                      className="h-6 w-6 text-primary"
                    />
                  </div>
                  <CardTitle>1. Create Account</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Sign up for a free account and verify your email address to
                    get started.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon
                      icon="lucide:book-open"
                      className="h-6 w-6 text-primary"
                    />
                  </div>
                  <CardTitle>2. Create Subject</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Add your first subject with course details, academic year,
                    and semester information.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon
                      icon="lucide:users"
                      className="h-6 w-6 text-primary"
                    />
                  </div>
                  <CardTitle>3. Add Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Import student lists using Excel/CSV or add them
                    individually to your subject.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  How do I import students from Excel?
                </AccordionTrigger>
                <AccordionContent>
                  Navigate to your subject, click "Import Students", and upload
                  your Excel file. Make sure it contains columns for name,
                  regNumber, rollNumber, and course. You can download our
                  template for the correct format.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Can I export attendance reports?
                </AccordionTrigger>
                <AccordionContent>
                  Yes! You can export detailed attendance reports in Excel
                  format. Go to the Reports section of any subject and use the
                  export functionality to download data for analysis.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How do I mark attendance?</AccordionTrigger>
                <AccordionContent>
                  In the Attendance section, you'll see a list of all students.
                  Simply click the Present or Absent button next to each
                  student's name to mark their attendance for the current date.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Can I group students by course?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutely! In both the Attendance and Reports sections, you
                  can choose to group students by roll number or by course for
                  better organization and analysis.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Is my data secure?</AccordionTrigger>
                <AccordionContent>
                  Yes, we use industry-standard security measures including
                  encryption, secure authentication, and regular backups to
                  ensure your data is always safe and accessible.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Video Tutorials */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Video Tutorials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon
                      icon="lucide:play-circle"
                      className="h-6 w-6 text-primary"
                    />
                  </div>
                  <CardTitle>Getting Started</CardTitle>
                  <CardDescription>
                    Learn the basics of setting up your account and creating
                    your first subject.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <Icon icon="lucide:play" className="h-4 w-4 mr-2" />
                    Watch Tutorial
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon
                      icon="lucide:play-circle"
                      className="h-6 w-6 text-primary"
                    />
                  </div>
                  <CardTitle>Student Management</CardTitle>
                  <CardDescription>
                    Master the art of importing and managing student lists
                    efficiently.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    <Icon icon="lucide:play" className="h-4 w-4 mr-2" />
                    Watch Tutorial
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-card border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to
              help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/support/help-center">
                <Button size="lg" className="flex items-center gap-2">
                  <Icon icon="lucide:help-circle" className="h-4 w-4" />
                  Visit Help Center
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
