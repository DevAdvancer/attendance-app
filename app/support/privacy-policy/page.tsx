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
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export default function PrivacyPolicyPage() {
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
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and
              protect your information.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Privacy Policy Content */}
          <div className="space-y-8">
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle>Introduction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  AttendanceTracker ("we," "our," or "us") is committed to
                  protecting your privacy. This Privacy Policy explains how we
                  collect, use, disclose, and safeguard your information when
                  you use our attendance management service.
                </p>
                <p className="text-sm text-muted-foreground">
                  By using our service, you agree to the collection and use of
                  information in accordance with this policy.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Personal Information</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Name and contact information (email address)</li>
                    <li>• Account credentials and authentication data</li>
                    <li>• Profile information and preferences</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Educational Data</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Subject and course information</li>
                    <li>• Student lists and attendance records</li>
                    <li>• Academic performance data</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Usage Information</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Log data and device information</li>
                    <li>• Usage patterns and preferences</li>
                    <li>• Error reports and performance data</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card>
              <CardHeader>
                <CardTitle>How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  We use the collected information for the following purposes:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>
                    • Provide and maintain our attendance management service
                  </li>
                  <li>• Process and manage your account and subscriptions</li>
                  <li>• Generate attendance reports and analytics</li>
                  <li>• Improve our service and develop new features</li>
                  <li>• Communicate with you about updates and support</li>
                  <li>• Ensure security and prevent fraud</li>
                  <li>• Comply with legal obligations</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Sharing */}
            <Card>
              <CardHeader>
                <CardTitle>Data Sharing and Disclosure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  We do not sell, trade, or rent your personal information to
                  third parties. We may share your information in the following
                  circumstances:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• With your explicit consent</li>
                  <li>• To comply with legal requirements</li>
                  <li>• To protect our rights and safety</li>
                  <li>• With service providers who assist in our operations</li>
                  <li>• In connection with business transfers or mergers</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card>
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  We implement appropriate security measures to protect your
                  information:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Encryption of data in transit and at rest</li>
                  <li>• Secure authentication and access controls</li>
                  <li>• Regular security audits and monitoring</li>
                  <li>• Employee training on data protection</li>
                  <li>
                    • Incident response and breach notification procedures
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card>
              <CardHeader>
                <CardTitle>Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  We retain your information for as long as necessary to provide
                  our services and comply with legal obligations:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Account data: Until account deletion or closure</li>
                  <li>
                    • Attendance records: As specified by educational
                    requirements
                  </li>
                  <li>• Usage data: For service improvement and analytics</li>
                  <li>• Legal compliance: As required by applicable laws</li>
                </ul>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card>
              <CardHeader>
                <CardTitle>Your Rights and Choices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  You have the following rights regarding your personal
                  information:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Access and review your data</li>
                  <li>• Update or correct inaccurate information</li>
                  <li>• Request deletion of your data</li>
                  <li>• Opt-out of marketing communications</li>
                  <li>• Export your data in a portable format</li>
                  <li>• Lodge a complaint with supervisory authorities</li>
                </ul>
              </CardContent>
            </Card>

            {/* Cookies and Tracking */}
            <Card>
              <CardHeader>
                <CardTitle>Cookies and Tracking Technologies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  We use cookies and similar technologies to enhance your
                  experience:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Essential cookies for service functionality</li>
                  <li>• Analytics cookies to improve our service</li>
                  <li>• Preference cookies to remember your settings</li>
                  <li>• Security cookies to protect against fraud</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  You can control cookie preferences through your browser
                  settings.
                </p>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card>
              <CardHeader>
                <CardTitle>Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Our service is designed for educational institutions and
                  teachers. We do not knowingly collect personal information
                  from children under 13 without parental consent. If you
                  believe we have collected such information, please contact us
                  immediately.
                </p>
              </CardContent>
            </Card>

            {/* International Transfers */}
            <Card>
              <CardHeader>
                <CardTitle>International Data Transfers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Your information may be transferred to and processed in
                  countries other than your own. We ensure appropriate
                  safeguards are in place to protect your data in accordance
                  with this Privacy Policy and applicable laws.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Policy */}
            <Card>
              <CardHeader>
                <CardTitle>Changes to This Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new policy on this
                  page and updating the "Last updated" date. We encourage you to
                  review this policy periodically.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  If you have any questions about this Privacy Policy or our
                  data practices, please contact us:
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Email: privacy@attendancetracker.com</p>
                  <p>Address: [Your Company Address]</p>
                  <p>Phone: +1 (555) 123-4567</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-card border rounded-lg p-8 mt-12">
            <h2 className="text-2xl font-bold mb-4">
              Questions About Privacy?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our privacy team is here to help clarify any concerns you may
              have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/support/contact-us">
                <Button size="lg" className="flex items-center gap-2">
                  <Icon icon="lucide:mail" className="h-4 w-4" />
                  Contact Privacy Team
                </Button>
              </Link>
              <Link href="/support/help-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2">
                  <Icon icon="lucide:help-circle" className="h-4 w-4" />
                  Visit Help Center
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
