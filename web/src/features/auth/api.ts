export type LoginRequest = {
  email: string;
  password: string;
};

export type CurrentUser = {
  isAuthenticated: boolean;
  email: string | null;
  roles: string[];
  canManageLessons: boolean;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE ?? "https://localhost:7075";

export async function login(request: LoginRequest): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/identity/login?useCookies=true&useSessionCookies=true`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(request),
    }
  );

  if (!response.ok) {
    throw new Error("Invalid email or password.");
  }
}

export async function getCurrentUser(): Promise<CurrentUser> {
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Could not check login status.");
  }

  return response.json();
}

export async function logout(): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Logout failed.");
  }
}