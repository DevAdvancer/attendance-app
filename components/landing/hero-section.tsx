"use client";

import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Smart Attendance
                <span className="text-primary block">Management</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Streamline your classroom attendance tracking with our
                intuitive, efficient system designed for modern educators.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth">
                <Button size="lg" className="cursor-pointer group">
                  Get Started
                  <Icon
                    icon="lucide:arrow-right"
                    className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="cursor-pointer"
                onClick={() => {
                  document.getElementById("features")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}>
                <Icon icon="lucide:play" className="mr-2 h-4 w-4" />
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">99%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5min</div>
                <div className="text-sm text-muted-foreground">Setup Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative">
            <div className="relative bg-card rounded-2xl shadow-2xl p-8 border">
              {/* Mock Dashboard */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg p-1.5 shadow-sm border">
                    <img
                      src="/logo.png"
                      alt="AttendanceTracker Logo"
                      className="w-full h-full"
                    />
                  </div>
                  <h3 className="font-semibold">AttendanceTracker</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">95%</div>
                    <div className="text-sm text-muted-foreground">Present</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">142</div>
                    <div className="text-sm text-muted-foreground">
                      Students
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Icon
                          icon="lucide:check"
                          className="h-4 w-4 text-green-600"
                        />
                      </div>
                      <span className="text-sm">Arjun Sharma</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Present
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Icon
                          icon="lucide:check"
                          className="h-4 w-4 text-green-600"
                        />
                      </div>
                      <span className="text-sm">Priya Patel</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Present
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <Icon
                          icon="lucide:x"
                          className="h-4 w-4 text-red-600"
                        />
                      </div>
                      <span className="text-sm">Bob Johnson</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Absent
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white rounded-full p-3">
                <Icon icon="lucide:trending-up" className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white rounded-full p-3">
                <Icon icon="lucide:users" className="h-6 w-6" />
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -z-10 -top-8 -right-8 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 -bottom-8 -left-8 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
