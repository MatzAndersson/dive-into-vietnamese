// src/lib/api.ts
const API_BASE = import.meta.env.VITE_API_BASE ?? "";

/**
 * Generic request helper.
 * parseJson=false is used for endpoints that do not return a body, e.g. DELETE 204.
 */
async function request<T>(
  path: string,
  init: RequestInit = {},
  parseJson: boolean = true
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  if (res.status === 401) {
    throw new Error("You must be logged in to do this.");
  }

  if (res.status === 403) {
    throw new Error("You do not have permission to do this.");
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }

  if (!parseJson) {
    return undefined as T;
  }

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
  get: <T>(path: string) => request<T>(path),

  post: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  del: (path: string) =>
    request<void>(
      path,
      {
        method: "DELETE",
      },
      false
    ),
};