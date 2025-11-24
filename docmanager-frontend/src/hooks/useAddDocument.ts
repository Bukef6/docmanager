import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api";
import toast from "react-hot-toast";

interface AddDocumentData {
  title: string;
  tag: string;
  file: File;
}

export const useAddDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddDocumentData) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("tag", data.tag);
      formData.append("file", data.file);

      const res = await api.post("/documents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Document added");
      // Refresh docs
      queryClient.invalidateQueries({
        queryKey: ["/documents"],
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to add document");
    },
  });
};
