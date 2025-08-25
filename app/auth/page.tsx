"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";
import Link from "next/link";

export default function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const toggleMode = () => setIsLoginMode(!isLoginMode);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
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

          <Link href="/">
            <Button variant="ghost" size="sm" className="cursor-pointer">
              <Icon icon="lucide:arrow-left" className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Auth Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {isLoginMode ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-muted-foreground">
              {isLoginMode
                ? "Sign in to access your dashboard"
                : "Join thousands of educators using AttendanceTracker"}
            </p>
          </div>

          {isLoginMode ? (
            <LoginForm onToggleMode={toggleMode} />
          ) : (
            <SignupForm onToggleMode={toggleMode} />
          )}

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:shield-check" className="h-4 w-4" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="lucide:clock" className="h-4 w-4" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="lucide:users" className="h-4 w-4" />
                <span>Trusted by 1000+ Teachers</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
