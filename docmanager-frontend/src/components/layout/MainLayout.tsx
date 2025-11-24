import Header from "./Header";
import Content from "./Content";
import { useLocation } from "wouter";
import AddDocumentDialog from "../AddDocumentDialog";
import { TAGS } from "../../constants/tags";
import { useAddDocument } from "../../hooks/useAddDocument";
import { useLogout } from "../../hooks/useLogout";
import { useAuth } from "../../hooks/useAuth";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { logout } = useLogout();
  const { user, isLoading } = useAuth();
  const [location, setLocation] = useLocation();
  const isDialogAddDocuOpen = location === "/documents/new";

  const { mutate: addDocument } = useAddDocument();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    );
  }

  const handleAddDocument = (data: {
    title: string;
    tag: string;
    file: File;
  }) => {
    addDocument(data);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 w-full flex-col">
      <div className="flex-1 flex flex-col">
        <Header
          username={user?.username ?? ""}
          logout={logout}
          onAddDocument={() => setLocation("/documents/new")}
        />
        <Content>{children}</Content>

        {/* Dialog */}
        <AddDocumentDialog
          isOpen={isDialogAddDocuOpen}
          onClose={() => setLocation("/documents")}
          onSubmit={handleAddDocument}
          tags={TAGS}
        />
      </div>
    </div>
  );
}
