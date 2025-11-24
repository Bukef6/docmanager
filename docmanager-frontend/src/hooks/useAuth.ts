import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useEffect } from "react";
import api from "../lib/api";

interface User {
  id: number;
  username: string;
}

export const useAuth = () => {
  const [, setLocation] = useLocation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["/auth/me"],
    queryFn: async () => {
      const res = await api.get("/auth/me");
      return res.data.user as User;
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // Cache for 5 min
  });

  useEffect(() => {
    if (!isLoading && !data) {
      setLocation("/login");
    }
  }, [data, isLoading, setLocation]);

  return {
    user: data,
    isLoading,
    error,
  };
};
