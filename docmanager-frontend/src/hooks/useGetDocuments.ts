import { useQuery } from "@tanstack/react-query";
import api from "../lib/api";
import type { DocumentApi } from "../types";

interface UseDocumentsParams {
  userId?: number;
  tag: string | null;
  search: string | null;
  page: number;
  pageSize: number;
  orderBy: string;
  asc: boolean;
}

export function useGetDocuments(params: UseDocumentsParams) {
  const { userId, tag, search, page, pageSize, orderBy, asc } = params;

  return useQuery<DocumentApi>({
    queryKey: ["/documents", userId, tag, search, page, pageSize, orderBy, asc],
    queryFn: async () => {
      const res = await api.get<DocumentApi>("/documents", {
        params: {
          page,
          pageSize,
          tag,
          search,
          orderBy,
          asc,
        },
      });
      return res.data;
    },
    enabled: !!userId,
    placeholderData: (prev) => prev,
  });
}
