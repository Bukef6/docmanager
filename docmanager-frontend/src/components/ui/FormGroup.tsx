import React from "react";

interface FormGroupProps {
  label?: string;
  htmlFor?: string;
  children: React.ReactNode;
}

export default function FormGroup({ label, htmlFor, children }: FormGroupProps) {
  return (
    <div className="flex flex-col gap-1 mb-3">
      {label && (
        <label htmlFor={htmlFor} className="text-gray-700 font-medium">
          {label}
        </label>
      )}
      {children}
    </div>
  );
}