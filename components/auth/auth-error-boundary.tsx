"use client";

import { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class AuthErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Auth Error Boundary caught an error:", error, errorInfo);
    }

    // Check if it's an auth-related error
    if (error.message?.includes("auth") || error.message?.includes("token")) {
      this.setState({ hasError: true, error });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  handleSignOut = async () => {
    try {
      // Clear any stored auth data
      if (typeof window !== "undefined") {
        localStorage.removeItem("attendance-tracker-auth");
        sessionStorage.removeItem("attendance-tracker-auth");
      }

      // Redirect to auth page
      window.location.href = "/auth";
    } catch (err) {
      console.error("Error during sign out:", err);
      // Force reload as fallback
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon
                icon="lucide:shield-alert"
                className="h-8 w-8 text-destructive"
              />
            </div>

            <h1 className="text-xl font-semibold mb-2">Authentication Error</h1>
            <p className="text-muted-foreground mb-6">
              We encountered an issue with your authentication. This usually
              happens when your session has expired or there's a token issue.
            </p>

            <div className="space-y-3">
              <Button onClick={this.handleRetry} className="w-full">
                <Icon icon="lucide:refresh-cw" className="h-4 w-4 mr-2" />
                Try Again
              </Button>

              <Button
                onClick={this.handleSignOut}
                variant="outline"
                className="w-full">
                <Icon icon="lucide:log-out" className="h-4 w-4 mr-2" />
                Sign In Again
              </Button>
            </div>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-muted-foreground">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto">
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
