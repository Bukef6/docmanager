import { useQuery } from "@tanstack/react-query";
import MainLayout from "../components/layout/MainLayout";
import api from "../lib/api";
import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import DataTable from "../components/ui/DataTable";
import Paginator from "../components/ui/Paginator";
import { EditDocumentDialog } from "../components/EditDocumentDialog";
import { useUpdateDocument } from "../hooks/useUpdateDocument";
import { DocumentFilters } from "../components/ui/DocumentFilters";
import {
  STORAGE_KEY_CURRENT_PAGE,
  STORAGE_KEY_ITEMS_PER_PAGE,
  STORAGE_KEY_TAG_FILTER,
  STORAGE_KEY_SEARCH,
} from "../constants/storageKeys";
import type { DocumentApi, DocumentItem } from "../types";
import { PAGE_SIZES } from "../constants/pageSizes";
import { useDeleteDocument } from "../hooks/useDeleteDocument";
import ConfirmModal from "../components/ui/ConfirmModal";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import type { RootState } from "../lib/store";
import { useSelector } from "react-redux";

export default function Documents() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/documents/:id/edit");
  const { user } = useAuth();
  const [docForDelete, setDocForDelete] = useState<DocumentItem | null>(null);

  const { mutate: updateDocument } = useUpdateDocument();
  const deleteMutation = useDeleteDocument();

  const [selectedTag, setSelectedTag] = useState(() => {
    return sessionStorage.getItem(STORAGE_KEY_TAG_FILTER) || "All";
  });
  const [searched, setSearched] = useState(() => {
    return sessionStorage.getItem(STORAGE_KEY_SEARCH) || "";
  });

  const [page, setPage] = useState(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY_CURRENT_PAGE);
    return saved ? parseInt(saved) : 1;
  });

  const [pageSize, setPageSize] = useState(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY_ITEMS_PER_PAGE);
    return saved ? parseInt(saved, 10) : PAGE_SIZES[0];
  });

  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY_ITEMS_PER_PAGE);
    return saved ? parseInt(saved) : 10;
  });

  const editing = match;
  const documentId = params?.id;

  const { orderBy, asc } = useSelector((state: RootState) => state.sorting);

  const {
    data: ApiDocuments,
    isLoading,
    error,
  } = useQuery<DocumentApi>({
    queryKey: [
      "/documents",
      user?.id,
      selectedTag,
      searched,
      page,
      itemsPerPage,
      orderBy,
      asc,
    ],
    queryFn: async () => {
      const res = await api.get<DocumentApi>("/documents", {
        params: {
          page: page,
          pageSize: itemsPerPage,
          tag: selectedTag,
          search: searched,
          orderBy: orderBy,
          asc: asc,
        },
      });
      return res.data;
    },
    placeholderData: (prev) => prev,
    enabled: !!user, // after user is loaded
  });

  const selectedDocument = ApiDocuments?.documents.find(
    (d) => d.id === Number(documentId)
  );

  if (!ApiDocuments && isLoading) return <div>Loading...</div>;
  if (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message || error.message
      : "Unknown error";
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <span className="text-lg text-gray-600">
          Error while loading.. Try to login again.
        </span>
        <span>({errorMessage})</span>
        <Button variant="primary" onClick={() => setLocation("/login")}>
          Log in
        </Button>
      </div>
    );
  }

  const handleSubmit = (data: { title: string; tag: string }) => {
    if (!selectedDocument) return;
    updateDocument({ id: selectedDocument.id, ...data });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate({ id });
    setDocForDelete(null);
  };

  const resetPageIfNeeded = () => {
    if (page !== 1) {
      setPage(1);
      sessionStorage.setItem(STORAGE_KEY_CURRENT_PAGE, "1");
    }
  };

  return (
    <MainLayout>
      <h2 className="text-3xl font-semibold mb-1 text-gray-800">
        My documents
      </h2>
      <p className="text-lg text-gray-500">
        Manage and organize your documents
      </p>
      <DocumentFilters
        onChangeTag={(t) => {
          setSelectedTag(t);
          resetPageIfNeeded();
        }}
        onSearchChange={(s) => {
          setSearched(s);
          resetPageIfNeeded();
        }}
      />
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
      <Paginator
        totalItems={ApiDocuments?.total ?? 0}
        currentPage={page}
        pageSize={pageSize}
        onPageChange={(page, size) => {
          setItemsPerPage(size);
          setPage(page);
          setPageSize(size);
        }}
      />
    </MainLayout>
  );
}
