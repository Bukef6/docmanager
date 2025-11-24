import React from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "outline"
    | "ghost"
    | "ghostNarrow";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "rounded-lg font-medium transition-all duration-200 flex items-center gap-2";

  const padding = {
    default: "px-4 py-2",
    narrow: "px-2 py-1",
  };

  const variants = {
    primary: "bg-cyan-600 text-white hover:bg-cyan-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-400 text-gray-700 hover:bg-gray-100",
    ghost: "border border-transparent",
    ghostNarrow: "border border-transparent",
  };

  const selectedPadding =
    variant === "ghostNarrow" ? padding.narrow : padding.default;

  return (
    <button
      className={cn(
        base,
        className,
        selectedPadding,
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
