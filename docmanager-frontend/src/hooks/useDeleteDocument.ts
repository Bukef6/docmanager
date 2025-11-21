import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api";
import toast from "react-hot-toast";

interface DeleteDocumentData {
  id: number;
}

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: DeleteDocumentData) => {
      const res = await api.delete(`/documents/${id}`);
      return res.data;
    },

    onSuccess: () => {
      toast.success("Document deleted");
      queryClient.invalidateQueries({
        queryKey: ["/documents"],
      });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete document"
      );
    },
  });
};
