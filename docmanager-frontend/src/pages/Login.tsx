import { useState } from "react";
import { useLocation } from "wouter";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import FormGroup from "../components/ui/FormGroup";
import api from "../lib/api";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post("/auth/login", { username, password });
      await queryClient.invalidateQueries();
      setLocation("/documents"); // redirect if success
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error during login");
      //console.log(err.response?.data?.message || "Chyba pri prihlasovaní");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      description="Welcome back! Sign in to continue managing your documents."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <FormGroup htmlFor="username">
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormGroup>
        </div>

        <div className="space-y-2">
          <FormGroup htmlFor="password">
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        <div className="text-center text-sm">
          <span className="mb-4  pb-2 text-gray-600">
            Don't have an account?
          </span>
          <button
            type="button"
            onClick={() => setLocation("/register")}
            className="hover:underline text-blue-600 ms-1"
          >
            Register
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
