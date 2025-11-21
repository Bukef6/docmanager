import React from "react";
import { cn } from "../../lib/utils";

interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({
  title,
  description,
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-gray-100 shadow-md rounded-xl p-6 border border-gray-200",
        { className }
      )}
    >
      {title && (
        <h2 className="text-2xl font-semibold mb-1 text-gray-800">{title}</h2>
      )}
      {description && (
        <h2 className="text-md  mb-4  pb-2 text-gray-600">{description}</h2>
      )}
      {children}
    </div>
  );
}
