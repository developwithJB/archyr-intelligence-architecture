import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline" | "accent";
}

export function Button({ className = "", variant = "default", ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] disabled:opacity-60";
  const variants = {
    default:
      "bg-[var(--accent)] text-white hover:bg-blue-700 dark:hover:bg-cyan-400",
    ghost: "bg-transparent text-[var(--text)] hover:bg-[var(--accent-soft)]",
    outline: "border border-[var(--line)] text-[var(--text)] hover:bg-[var(--surface-muted)]",
    accent: "bg-[var(--success)] text-white hover:brightness-95",
  };

  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
