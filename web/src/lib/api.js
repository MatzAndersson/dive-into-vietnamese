// src/lib/api.ts
const API_BASE = import.meta.env.VITE_API_BASE ?? "";
/**
 * Generic request helper.
 * parseJson=false is used for endpoints that do not return a body, e.g. DELETE 204.
 */
async function request(path, init = {}, parseJson = true) {
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
        return undefined;
    }
    const text = await res.text().catch(() => "");
    if (!text || !text.trim()) {
        return undefined;
    }
    try {
        return JSON.parse(text);
    }
    catch {
        throw new Error("Invalid JSON returned by server");
    }
}
export const api = {
    get: (path) => request(path),
    post: (path, body) => request(path, {
        method: "POST",
        body: JSON.stringify(body),
    }),
    put: (path, body) => request(path, {
        method: "PUT",
        body: JSON.stringify(body),
    }),
    del: (path) => request(path, {
        method: "DELETE",
    }, false),
};
