import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import FormGroup from "../components/ui/FormGroup";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout";

export default function Register() {
  const [_, setLocation] = useLocation();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirm: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      alert("Heslá sa nezhodujú");
      return;
    }

    // SEM pôjde API register
    setLocation("/login");
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

        <Button type="submit" variant="primary">
          Register
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
