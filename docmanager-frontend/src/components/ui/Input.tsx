import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function Input({ error, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <input
        className={`
          w-full px-3 py-2 border rounded-lg outline-none bg-white text-gray-900 
          focus:ring-2 focus:ring-blue-500 focus:outline-none
          ${error ? "border-red-500" : "border-gray-300"}
          ${className}
        `}
        {...props}
      />

      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
