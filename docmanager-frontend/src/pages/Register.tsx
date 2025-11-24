import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import FormGroup from "../components/ui/FormGroup";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import AuthLayout from "../components/AuthLayout";
import toast from "react-hot-toast";
import api from "../lib/api";
import { validatePassword } from "../lib/passwordRules";

export default function Register() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirm: "",
  });

  useEffect(() => {
    const err = validatePassword(form.password);
    setError(err);
  }, [form.password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const pwdError = validatePassword(form.password);
    if (pwdError) {
      setError(pwdError);
      return;
    }

    if (form.password.length < 5) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      await api.post("/auth/register", {
        username: form.username,
        password: form.password,
      });
      setLocation("/login"); // redirect if success
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error during registration");
      //console.log(err.response?.data?.message || "Chyba pri registrácii");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Registration"
      description="Sign up and take control of your documents with ease."
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <FormGroup label="Username" htmlFor="username">
          <Input
            id="username"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </FormGroup>

        <FormGroup label="Password" htmlFor="password">
          <Input
            id="password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
        </FormGroup>

        <FormGroup label="Repeat password" htmlFor="confirm">
          <Input
            id="confirm"
            type="password"
            placeholder="Repeat password"
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          />
        </FormGroup>

        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </Button>

        <div className="text-center text-sm text-gray-600">
          Already registred?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
