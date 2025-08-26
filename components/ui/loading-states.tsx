import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({
  message = "Loading...",
  size = "md",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Icon
          icon="lucide:loader-2"
          className={`${sizeClasses[size]} animate-spin mx-auto mb-2`}
        />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export function ErrorState({
  message = "Something went wrong",
  onRetry,
  showRetry = true,
}: ErrorStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Icon
          icon="lucide:alert-circle"
          className="h-8 w-8 text-destructive mx-auto mb-2"
        />
        <p className="text-sm text-muted-foreground mb-4">{message}</p>
        {showRetry && onRetry && (
          <Button onClick={onRetry} variant="outline" size="sm">
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon = "lucide:inbox",
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-16 h-16 mb-4 opacity-50">
        <Icon icon={icon} className="h-full w-full" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
          {description}
        </p>
      )}
      {action}
    </div>
  );
}

// Inline loading component for smaller UI elements
export function InlineLoading({ message }: { message?: string }) {
  return (
    <div className="flex items-center gap-2 py-2">
      <Icon icon="lucide:loader-2" className="h-4 w-4 animate-spin" />
      {message && (
        <span className="text-sm text-muted-foreground">{message}</span>
      )}
    </div>
  );
}

// Skeleton loading components
export function CardSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="space-y-3">
        <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
        <div className="h-3 bg-muted animate-pulse rounded w-1/2"></div>
        <div className="h-3 bg-muted animate-pulse rounded w-2/3"></div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex space-x-4">
          <div className="h-4 bg-muted animate-pulse rounded w-1/4"></div>
          <div className="h-4 bg-muted animate-pulse rounded w-1/3"></div>
          <div className="h-4 bg-muted animate-pulse rounded w-1/4"></div>
          <div className="h-4 bg-muted animate-pulse rounded w-1/6"></div>
        </div>
      ))}
    </div>
  );
}
