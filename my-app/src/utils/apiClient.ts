const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

type FetchOptions = RequestInit & { next?: { revalidate?: number; tags?: string[] } };

async function request<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(error.error ?? `API Error: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// GET (Server Component용 캐싱 지원)
export function get<T>(path: string, revalidate = 60): Promise<T> {
  return request<T>(path, { next: { revalidate } });
}

// POST (Client Component용)
export function post<T>(path: string, body?: unknown): Promise<T> {
  return request<T>(path, { method: "POST", body: JSON.stringify(body) });
}
