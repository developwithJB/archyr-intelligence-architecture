import * as React from "react";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      {...props}
      className={`rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-0 shadow-sm transition duration-200 hover:border-[var(--accent)]/60 hover:shadow-md ${className}`}
    />
  );
}

export function CardHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`px-5 pt-5 ${className}`} {...props} />;
}

export function CardTitle({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={`text-lg font-semibold text-[var(--text)] ${className}`} {...props} />;
}

export function CardDescription({ className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`mt-1 text-sm text-[var(--muted)] ${className}`} {...props} />;
}

export function CardContent({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`px-5 pb-5 pt-4 leading-7 ${className}`} {...props} />;
}

export function CardFooter({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`border-t border-[var(--line)] px-5 py-4 ${className}`} {...props} />;
}
