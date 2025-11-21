import { useEffect, useState } from "react";

import Header from "./Header";
import Content from "./Content";
import { useLocation } from "wouter";
import api from "../../lib/api";
import AddDocumentDialog from "../AddDocumentDialog";
import { TAGS } from "../../constants/tags";
import { useAddDocument } from "../../hooks/useAddDocument";

interface User {
  id: number;
  username: string;
}

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isDialogAddDocuOpen, setDialogAddDocuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [_, setLocation] = useLocation();

  const { mutate: addDocument } = useAddDocument();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        setLocation("/login");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      setLocation("/login");
    }
  };

  if (loading) {
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
          onAddDocument={() => setDialogAddDocuOpen(true)}
        />
        <Content>{children}</Content>

        {/* Dialog */}
        <AddDocumentDialog
          isOpen={isDialogAddDocuOpen}
          onClose={() => setDialogAddDocuOpen(false)}
          onSubmit={handleAddDocument}
          tags={TAGS}
        />
      </div>
    </div>
  );
}
