import { QueryClient, type QueryFunction } from "@tanstack/react-query";
import api from "./api";

type UnauthorizedBehavior = "returnNull" | "throw";

//Special query function that handles 401 errors
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    try {
      const url = queryKey.join("/");
      const res = await api.get(url);
      return res.data;
    } catch (err: any) {
      if (
        unauthorizedBehavior === "returnNull" &&
        err.response?.status === 401
      ) {
        return null;
      }
      throw err;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false, //don't refetch on window focus
      staleTime: Infinity, //keep cached data forever
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
