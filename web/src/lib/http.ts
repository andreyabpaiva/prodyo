export class HttpError extends Error {
  status: number;
  body: unknown;
  constructor(status: number, body: unknown, message?: string) {
    super(message ?? `HTTP ${status}`);
    this.name = 'HttpError';
    this.status = status;
    this.body = body;
  }
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface HttpOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  query?: Record<string, string | number | boolean | undefined | null>;
}

const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? '';
if (!API_URL) throw new Error('VITE_API_URL is not set');

function buildUrl(path: string, query?: HttpOptions['query']): string {
  const base = API_URL.replace(/\/$/, '');
  const url = new URL(base + (path.startsWith('/') ? path : `/${path}`));
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    }
  }
  return url.toString();
}

export async function http<TResponse>(path: string, options: HttpOptions = {}): Promise<TResponse> {
  const { method = 'GET', body, headers = {}, signal, query } = options;

  const init: RequestInit = {
    method,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    signal,
  };
  if (body !== undefined) {
    init.body = JSON.stringify(body);
  }

  const res = await fetch(buildUrl(path, query), init);

  const contentType = res.headers.get('Content-Type') ?? '';
  const parsed = contentType.includes('application/json') ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    throw new HttpError(res.status, parsed);
  }
  return parsed as TResponse;
}
