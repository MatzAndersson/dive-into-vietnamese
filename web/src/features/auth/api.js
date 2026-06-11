const API_BASE_URL = import.meta.env.VITE_API_BASE ?? "https://localhost:7075";
export async function login(request) {
    const response = await fetch(`${API_BASE_URL}/identity/login?useCookies=true&useSessionCookies=true`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(request),
    });
    if (!response.ok) {
        throw new Error("Invalid email or password.");
    }
}
