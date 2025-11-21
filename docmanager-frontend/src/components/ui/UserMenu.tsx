import { LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface UserMenuProps {
  name: string;
  onLogout: () => void;
}

export default function UserMenu({ name, onLogout }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Zatvorenie pri kliknutí mimo
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={ref}>
      {/* Invisible button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100 transition"
      >
        <div className="w-9 h-9 rounded-full bg-gray-300 text-black flex items-center justify-center  select-none">
          {initial}
        </div>

        <span className="font-medium text-gray-800 hidden sm:inline">
          {name}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-200 shadow-lg rounded-lg  py-2 z-50">
          <div className="px-4 py-1 border-b border-gray-300">
            <span className="w-full text-left px-4 py-2  text-gray-800 font-semibold ">
              My Account
            </span>
          </div>
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 mt-2 hover:bg-gray-300 text-gray-600"
          >
            <div className="flex items-center gap-2">
              <LogOut className="text-gray-600 p-2 rounded-md" size={32} />
              <span>Logout</span>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
