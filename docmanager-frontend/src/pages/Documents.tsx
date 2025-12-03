import MainLayout from "../components/layout/MainLayout";
import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import DataTable from "../components/ui/DataTable";
import Paginator from "../components/ui/Paginator";
import { EditDocumentDialog } from "../components/EditDocumentDialog";
import { useUpdateDocument } from "../hooks/useUpdateDocument";
import { DocumentFilters } from "../components/ui/DocumentFilters";
import type { DocumentItem } from "../types";
import { useDeleteDocument } from "../hooks/useDeleteDocument";
import ConfirmModal from "../components/ui/ConfirmModal";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { useSelector } from "react-redux";
import type { RootState } from "../lib/store";
import { useGetDocuments } from "../hooks/useGetDocuments";

export default function Documents() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/documents/:id/edit");
  const { user } = useAuth();
  const [docForDelete, setDocForDelete] = useState<DocumentItem | null>(null);

  const { mutate: updateDocument } = useUpdateDocument();
  const deleteMutation = useDeleteDocument();

  const editing = match;
  const documentId = params?.id;

  const { orderBy, asc } = useSelector((state: RootState) => state.sorting);
  const { tag, search } = useSelector((state: RootState) => state.filters);
  const { page, pageSize } = useSelector((state: RootState) => state.paging);

  const {
    data: ApiDocuments,
    isLoading,
    error,
  } = useGetDocuments({
    userId: user?.id,
    tag,
    search,
    page,
    pageSize,
    orderBy,
    asc,
  });

  const selectedDocument = ApiDocuments?.documents.find(
    (d) => d.id === Number(documentId)
  );

  if (!ApiDocuments && isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <span className="text-lg text-gray-600">
          Error while loading.. Try to login again.
        </span>
        <Button variant="primary" onClick={() => setLocation("/login")}>
          Log in
        </Button>
      </div>
    );

  const handleSubmit = (data: { title: string; tag: string }) => {
    if (!selectedDocument) return;
    updateDocument({ id: selectedDocument.id, ...data });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate({ id });
    setDocForDelete(null);
  };

  return (
    <MainLayout>
      <h2 className="text-3xl font-semibold mb-1 text-gray-800">
        My documents
      </h2>
      <p className="text-lg text-gray-500">
        Manage and organize your documents
      </p>
      <DocumentFilters />
      <DataTable
        data={ApiDocuments?.documents ?? ([] as DocumentItem[])}
        onEdit={(doc) => setLocation(`/documents/${doc.id}/edit`)}
        onDelete={(doc) => setDocForDelete(doc)}
        onDownload={(doc) =>
          window.open(
            `${import.meta.env.VITE_API_BASE_URL}/documents/${doc.id}/download`,
            "_blank"
          )
        }
      />
      <EditDocumentDialog
        open={editing}
        onClose={() => setLocation("/documents")}
        onSubmit={handleSubmit}
        document={selectedDocument || null}
      />
      <ConfirmModal
        isOpen={docForDelete !== null}
        onConfirm={() => handleDelete(docForDelete!.id)}
        onCancel={() => setDocForDelete(null)}
        message={`Do you really want to delete file ${docForDelete?.title}?`}
      />
      <Paginator totalItems={ApiDocuments?.total ?? 0} />
    </MainLayout>
  );
}
