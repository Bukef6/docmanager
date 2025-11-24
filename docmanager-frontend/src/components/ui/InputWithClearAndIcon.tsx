import React from "react";
import { Search, X } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClear?: () => void;
}

export default function InputWithClearAndIcon({
  error,
  className = "",
  value,
  onClear,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          className={`
            w-full pl-10 pr-10 py-2 border rounded-lg outline-none bg-white text-gray-900 
            focus:ring-2 focus:ring-blue-500 focus:outline-none
            ${error ? "border-red-500" : "border-gray-300"}
            ${className}
          `}
          value={value}
          {...props}
        />
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
