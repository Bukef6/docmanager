import React from "react";
import { cn } from "../../lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "blue" | "green" | "red" | "yellow" | "cyan";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variants = {
    default: "bg-gray-200 text-gray-800",
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
    yellow: "bg-yellow-100 text-yellow-800",
    cyan: "bg-cyan-100 text-cyan-800",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-4 py-1 text-xs font-large rounded-full whitespace-nowrap",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
