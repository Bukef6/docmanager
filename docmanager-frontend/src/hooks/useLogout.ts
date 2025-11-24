import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import api from "../lib/api";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      // clear cache
      queryClient.clear();
      // clear all sessionStorage
      sessionStorage.clear();
      setLocation("/login");
    }
  };

  return { logout };
};
