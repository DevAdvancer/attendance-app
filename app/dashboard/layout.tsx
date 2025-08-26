"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useAuth } from "@/contexts/auth-context";
import { UserDropdown } from "@/components/user/user-dropdown";
import { Footer } from "@/components/layout/footer";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, teacher, loading, signOut } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/auth");
    }
  }, [user, loading, router]);

  // Show loading only for initial auth check
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Icon
            icon="lucide:loader-2"
            className="h-8 w-8 animate-spin mx-auto mb-2"
          />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If no user and not loading, don't render anything (redirect will happen)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-4 cursor-pointer">
              <div className="w-8 h-8 bg-white rounded-lg p-1.5 shadow-sm border">
                <img
                  src="/logo.png"
                  alt="AttendanceTracker Logo"
                  className="w-full h-full"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold">AttendanceTracker</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {teacher?.name}
                </p>
              </div>
            </Link>
          </div>
          <UserDropdown />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)]">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
