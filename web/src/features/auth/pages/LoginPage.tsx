import { FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, login } from "../api";

export function LoginPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: currentUser } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: getCurrentUser,
    retry: false,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (currentUser?.isAuthenticated) {
    return <Navigate to="/admin/lessons" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);
    setIsSubmitting(true);

    try {
      await login({ email, password });
      await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      navigate("/admin/lessons");
    } catch {
      setError("Could not log in. Check your email and password.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-2xl bg-white p-6 shadow"
      >
        <h1 className="mb-6 text-2xl font-bold text-brand-blue">Sign in</h1>

        <label className="mb-4 block">
          <span className="mb-1 block font-medium text-brand-dark">Email</span>
          <input
            className="w-full rounded-lg border px-3 py-2"
            type="email"
            value={email}
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label className="mb-4 block">
          <span className="mb-1 block font-medium text-brand-dark">
            Password
          </span>
          <input
            className="w-full rounded-lg border px-3 py-2"
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer rounded-lg bg-brand-orange px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Logging in..." : "Log in"}
        </button>
      </form>
    </main>
  );
}