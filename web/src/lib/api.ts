// src/lib/api.ts
const API_BASE = import.meta.env.VITE_API_BASE ?? "";
const API_KEY  = import.meta.env.VITE_API_KEY ?? "";

/**
 * Generic request helper.
 * parseJson=false is used for endpoints that do not return a body (e.g., DELETE 204/200).
 */
async function request<T>(
  path: string,
  init: RequestInit = {},
  parseJson: boolean = true
): Promise<T> {
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
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }

  if (!parseJson) {
    // e.g., DELETE 204/200 (no body)
    return undefined as T;
  }

  // For GET/POST/PUT: only parse when there IS a body.
  const text = await res.text().catch(() => "");
  if (!text || !text.trim()) {
    return undefined as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error("Invalid JSON returned by server");
  }
}

export const api = {
  get:  <T>(p: string) => request<T>(p),
  post: <T>(p: string, body: unknown) =>
    request<T>(p, { method: "POST", body: JSON.stringify(body) }),
  put:  <T>(p: string, body: unknown) =>
    request<T>(p, { method: "PUT", body: JSON.stringify(body) }),
  //  DELETE never parses JSON
  del:  (p: string)    => request<void>(p, { method: "DELETE" }, /*parseJson*/ false),
};
