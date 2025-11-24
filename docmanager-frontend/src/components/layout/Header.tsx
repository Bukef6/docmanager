import { Plus } from "lucide-react";
import Button from "../ui/Button";
import UserMenu from "../ui/UserMenu";
import NewLogo from "../ui/NewLogo";

interface HeaderProps {
  username: string | null;
  logout: () => void;
  onAddDocument: () => void;
}

export default function Header({
  username,
  logout,
  onAddDocument,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-1050 w-full border-b border-gray-300 bg-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <NewLogo className="sm:w-75 w-70" />

        <div className="flex items-center gap-1">
          {/* Desktop */}
          <Button onClick={onAddDocument} className="gap-2 hidden sm:flex">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Document</span>
          </Button>

          {/* mobile */}
          <Button
            onClick={onAddDocument}
            className="gap-1 inline sm:hidden "
            variant="ghostNarrow"
          >
            <Plus className="text-white bg-blue-500 p-2 rounded-md" size={35} />
          </Button>
          <UserMenu name={username ?? ""} onLogout={logout} />
        </div>
      </div>
    </header>
  );
}
