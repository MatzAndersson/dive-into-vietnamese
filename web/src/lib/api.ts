const API_BASE = import.meta.env.VITE_API_BASE ?? ""; // keep empty to use Vite proxy
const API_KEY = import.meta.env.VITE_API_KEY ?? "";


async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
const res = await fetch(`${API_BASE}${path}`, {
...init,
headers: {
"Content-Type": "application/json",
"X-API-KEY": API_KEY,
...(init.headers || {}),
},
});


if (res.status === 401 || res.status === 403) {
throw new Error("Not authorized. Check X-API-KEY in .env.local");
}
if (!res.ok) {
const text = await res.text();
throw new Error(text || `Request failed: ${res.status}`);
}
return res.json() as Promise<T>;
}


export const api = {
get: <T>(p: string) => request<T>(p),
del: (p: string) => request<void>(p, { method: "DELETE" }),
post: <T>(p: string, body: unknown) => request<T>(p, { method: "POST", body: JSON.stringify(body) }),
put: <T>(p: string, body: unknown) => request<T>(p, { method: "PUT", body: JSON.stringify(body) }),
};