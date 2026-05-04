import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "warning" | "success";
}

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  const styles = {
    default: "bg-[var(--surface-muted)] text-[var(--text)] border border-[var(--line)]",
    outline: "border border-[var(--accent)] text-[var(--accent)] bg-transparent",
    warning: "border border-amber-300 bg-amber-50 text-amber-900 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-200",
    success: "border border-emerald-300 bg-emerald-50 text-emerald-900 dark:bg-emerald-900/25 dark:border-emerald-700 dark:text-emerald-200",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[variant]} ${className}`}
      {...props}
    />
  );
}
