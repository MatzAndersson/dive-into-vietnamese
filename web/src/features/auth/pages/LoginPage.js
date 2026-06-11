import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";
export function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("admin@test.local");
    const [password, setPassword] = useState("Password1");
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);
        setIsSubmitting(true);
        try {
            await login({ email, password });
            navigate("/admin/lessons");
        }
        catch {
            setError("Could not log in. Check your email and password.");
        }
        finally {
            setIsSubmitting(false);
        }
    }
    return (_jsx("main", { className: "mx-auto flex min-h-screen max-w-md items-center px-4", children: _jsxs("form", { onSubmit: handleSubmit, className: "w-full rounded-2xl bg-white p-6 shadow", children: [_jsx("h1", { className: "mb-6 text-2xl font-bold text-brand-blue", children: "Admin login" }), _jsxs("label", { className: "mb-4 block", children: [_jsx("span", { className: "mb-1 block font-medium text-brand-dark", children: "Email" }), _jsx("input", { className: "w-full rounded-lg border px-3 py-2", type: "email", value: email, autoComplete: "email", onChange: (event) => setEmail(event.target.value), required: true })] }), _jsxs("label", { className: "mb-4 block", children: [_jsx("span", { className: "mb-1 block font-medium text-brand-dark", children: "Password" }), _jsx("input", { className: "w-full rounded-lg border px-3 py-2", type: "password", value: password, autoComplete: "current-password", onChange: (event) => setPassword(event.target.value), required: true })] }), error && (_jsx("p", { className: "mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700", children: error })), _jsx("button", { type: "submit", disabled: isSubmitting, className: "w-full cursor-pointer rounded-lg bg-brand-orange px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60", children: isSubmitting ? "Logging in..." : "Log in" })] }) }));
}
