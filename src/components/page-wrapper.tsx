"use client";

import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <div className={cn("mx-auto max-w-7xl p-6", className)}>{children}</div>
  );
}
