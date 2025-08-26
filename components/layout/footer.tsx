"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

export function Footer() {
  const [currentYear, setCurrentYear] = useState(2024); // Default fallback
  
  useEffect(() => {
    // Only set the current year on the client side
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg p-1.5 shadow-sm border">
                <img
                  src="/logo.png"
                  alt="AttendanceTracker Logo"
                  className="w-full h-full"
                />
              </div>
              <h3 className="text-lg font-bold">AttendanceTracker</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              Streamline your attendance management with our smart, efficient
              tracking system. Perfect for teachers and educational
              institutions.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="GitHub">
                <Icon icon="lucide:github" className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Twitter">
                <Icon icon="lucide:twitter" className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="LinkedIn">
                <Icon icon="lucide:linkedin" className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-3">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/features/subject-management"
                  className="hover:text-foreground transition-colors cursor-pointer">
                  Subject Management
                </Link>
              </li>
              <li>
                <Link
                  href="/features/student-tracking"
                  className="hover:text-foreground transition-colors cursor-pointer">
                  Student Tracking
                </Link>
              </li>
              <li>
                <Link
                  href="/features/attendance-reports"
                  className="hover:text-foreground transition-colors cursor-pointer">
                  Attendance Reports
                </Link>
              </li>
              <li>
                <Link
                  href="/features/excel-export"
                  className="hover:text-foreground transition-colors cursor-pointer">
                  Excel Export
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/support/documentation"
                  className="hover:text-foreground transition-colors cursor-pointer">
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/support/help-center"
                  className="hover:text-foreground transition-colors cursor-pointer">
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/support/contact-us"
                  className="hover:text-foreground transition-colors cursor-pointer">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/support/privacy-policy"
                  className="hover:text-foreground transition-colors cursor-pointer">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} AttendanceTracker. All rights reserved.
          </p>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Icon icon="lucide:heart" className="h-4 w-4 text-red-500" />
            <span className="text-sm text-muted-foreground">
              Made with care for educators
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
