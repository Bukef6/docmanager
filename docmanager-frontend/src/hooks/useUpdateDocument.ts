import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api";
import toast from "react-hot-toast";

interface UpdateDocumentData {
  id: number;
  title: string;
  tag: string;
}

export const useUpdateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateDocumentData) => {
      const res = await api.put(`/documents/${data.id}`, {
        title: data.title,
        tag: data.tag,
      });

      return res.data;
    },

    onSuccess: () => {
      toast.success("Document uploaded");
      queryClient.invalidateQueries({
        queryKey: ["/documents"],
        //exact: true,
      });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update document"
      );
    },
  });
};
