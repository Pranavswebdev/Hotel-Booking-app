import {
  normalizeSpace,
  type ApiSpace,
  type Space,
} from "./data";

const BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://localhost:4000";

const TOKEN_KEY = "jiva_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  status: number;
  fields?: Array<{ field: string; message: string }>;
  constructor(
    status: number,
    message: string,
    fields?: Array<{ field: string; message: string }>,
  ) {
    super(message);
    this.status = status;
    this.fields = fields;
  }
}

type RequestOptions = {
  method?: string;
  body?: unknown;
  auth?: boolean;
};

async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (opts.auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, {
      method: opts.method ?? "GET",
      headers,
      body: opts.body ? JSON.stringify(opts.body) : undefined,
    });
  } catch {
    throw new ApiError(0, "Cannot reach the server. Please try again.");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(
      res.status,
      data.message || "Something went wrong",
      data.errors,
    );
  }
  return data as T;
}

type AuthResponse = {
  token: string;
  user: Record<string, unknown>;
};

export const api = {
  // --- auth ---
  register: (email: string, password: string) =>
    request<{ user: Record<string, unknown>; devVerificationCode?: string }>(
      "/api/auth/register",
      { method: "POST", body: { email, password } },
    ),
  login: (email: string, password: string) =>
    request<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: { email, password },
    }),
  verify: (email: string, code: string) =>
    request<AuthResponse>("/api/auth/verify", {
      method: "POST",
      body: { email, code },
    }),
  forgotPassword: (email: string) =>
    request<{ message: string; devResetToken?: string }>(
      "/api/auth/forgot-password",
      { method: "POST", body: { email } },
    ),
  resetPassword: (token: string, password: string) =>
    request<{ message: string }>("/api/auth/reset-password", {
      method: "POST",
      body: { token, password },
    }),

  // --- spaces ---
  async getSpaces(params: { q?: string; category?: string } = {}): Promise<
    Space[]
  > {
    const qs = new URLSearchParams();
    if (params.q) qs.set("q", params.q);
    if (params.category) qs.set("category", params.category);
    const query = qs.toString();
    const data = await request<{ spaces: ApiSpace[] }>(
      `/api/spaces${query ? `?${query}` : ""}`,
    );
    return data.spaces.map(normalizeSpace);
  },
  async getSpace(slug: string): Promise<Space> {
    const data = await request<{ space: ApiSpace }>(`/api/spaces/${slug}`);
    return normalizeSpace(data.space);
  },

  // --- bookings ---
  createBooking: (payload: {
    spaceId: string;
    checkIn: string;
    checkOut: string;
    members: number;
    guestName: string;
    phone: string;
    idCardNumber: string;
  }) =>
    request<{ message: string; booking: Record<string, unknown> }>(
      "/api/bookings",
      { method: "POST", body: payload, auth: true },
    ),

  // --- profile ---
  getMe: () =>
    request<{ user: Record<string, unknown> }>("/api/users/me", {
      auth: true,
    }),
  updateMe: (payload: Record<string, string>) =>
    request<{ user: Record<string, unknown> }>("/api/users/me", {
      method: "PUT",
      body: payload,
      auth: true,
    }),
};
