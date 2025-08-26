"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export function Navigation() {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 cursor-pointer">
          <div className="w-12 h-12 bg-white rounded-xl p-2 shadow-md border-2 border-gray-100 hover:shadow-lg transition-shadow">
            <img
              src="/logo.png"
              alt="AttendanceTracker Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-xl font-bold">AttendanceTracker</h1>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/auth">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/auth">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
