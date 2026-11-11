/**
 * Isomorphic fetch wrapper with promise deduplication.
 *
 * Replaces `next-promise-cache`, which predated Next.js' own request
 * memoization. Native `fetch` in the App Router now memoizes identical GETs
 * (same URL *and* options) for a single server render pass, but that is an
 * implementation detail we would be relying on: the memo key also covers
 * headers, so two logically identical calls that build their options
 * separately are not guaranteed to collapse into one request.
 *
 * This wrapper keeps the guarantees the old library gave us explicitly:
 *
 * - GET promises (not values) are deduped, so awaiting the same endpoint from
 *   many components in one render results in exactly one network request and
 *   no race between concurrent callers.
 * - On the server the cache lives for one request/render pass (React `cache`),
 *   so nothing goes stale between requests.
 * - On the client GETs are cached for `defaultCacheTime` seconds.
 * - Non-GET verbs pass straight through — never cached, never deduped.
 * - Failed responses reject with `ApiError`, which carries `status` and the
 *   original `Response` so callers can read an error body.
 */
import { cache } from 'react';

export type ResponseTypes = 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData';

export type FetchOpts = RequestInit & {
  responseType?: ResponseTypes;
};

export interface ApiClientOptions {
  /** Requests are resolved against this URL */
  baseurl: string;
  /** Seconds a GET stays cached in the browser. 0 disables client caching. */
  defaultCacheTime?: number;
  /** Max entries kept in the client cache (FIFO eviction). 0 = unlimited. */
  maxCacheSize?: number;
  debug?: boolean;
}

/** Thrown for non-2xx responses. Keeps the response so the body can be read. */
export class ApiError extends Error {
  readonly status: number;
  readonly response: Response;

  constructor(response: Response) {
    super(`Server responded with status ${response.status}`);
    this.name = 'ApiError';
    this.status = response.status;
    this.response = response;
  }
}

type CacheEntry = {
  promise: Promise<unknown>;
  timestamp: number;
};

const isServer = () => typeof window === 'undefined';

/**
 * One cache per server request: React `cache` is backed by async local storage,
 * so the Map is created on first use in a render pass and thrown away after.
 */
const perRequestCache = cache(() => new Map<string, CacheEntry>());

async function parseResponse<T>(
  response: Response,
  responseType: ResponseTypes,
): Promise<T> {
  if (!response.ok) throw new ApiError(response);

  if (responseType === 'json') {
    // Read once as text so a malformed or empty body can fall back to text
    // instead of rejecting with an opaque JSON parse error.
    const body = await response.text();
    if (!body) return null as T;
    try {
      return JSON.parse(body) as T;
    } catch {
      return body as unknown as T;
    }
  }

  return (await response[responseType]()) as T;
}

export class ApiClient {
  private readonly baseurl: string;
  private readonly defaultCacheTime: number;
  private readonly maxCacheSize: number;
  private readonly debug: boolean;
  private readonly clientCache = new Map<string, CacheEntry>();

  constructor({
    baseurl,
    defaultCacheTime = 0,
    maxCacheSize = 200,
    debug = false,
  }: ApiClientOptions) {
    this.baseurl = baseurl;
    this.defaultCacheTime = defaultCacheTime;
    this.maxCacheSize = maxCacheSize;
    this.debug = debug;
  }

  get<T>(path: string, opts?: FetchOpts): Promise<T> {
    return this.request<T>('GET', path, opts);
  }

  post<T>(path: string, opts?: FetchOpts): Promise<T> {
    return this.request<T>('POST', path, opts);
  }

  put<T>(path: string, opts?: FetchOpts): Promise<T> {
    return this.request<T>('PUT', path, opts);
  }

  patch<T>(path: string, opts?: FetchOpts): Promise<T> {
    return this.request<T>('PATCH', path, opts);
  }

  delete<T>(path: string, opts?: FetchOpts): Promise<T> {
    return this.request<T>('DELETE', path, opts);
  }

  head<T>(path: string, opts?: FetchOpts): Promise<T> {
    return this.request<T>('HEAD', path, opts);
  }

  options<T>(path: string, opts?: FetchOpts): Promise<T> {
    return this.request<T>('OPTIONS', path, opts);
  }

  /**
   * Drop every cached entry for a path (any method), or the whole cache with
   * '*'. Paths are resolved against the base url, so they read like requests.
   */
  invalidate(path: string): void {
    const store = this.cacheStore();

    if (path === '*') {
      store.clear();
      return;
    }

    const url = new URL(path, this.baseurl).href;
    for (const key of [...store.keys()]) {
      if (key.endsWith(` ${url}`)) store.delete(key);
    }
  }

  private cacheable(method: string) {
    return method === 'GET' && (isServer() || this.defaultCacheTime > 0);
  }

  private entryAge(entry: CacheEntry) {
    return Date.now() - entry.timestamp;
  }

  private cacheStore() {
    return isServer() ? perRequestCache() : this.clientCache;
  }

  private store(key: string, promise: Promise<unknown>) {
    const store = this.cacheStore();
    // a stale entry for the same key is never worth keeping
    store.delete(key);

    if (this.maxCacheSize > 0 && store.size >= this.maxCacheSize) {
      store.delete(store.keys().next().value as string);
    }

    store.set(key, { promise, timestamp: Date.now() });
  }

  private async request<T>(
    method: string,
    path: string,
    opts: FetchOpts = {},
  ): Promise<T> {
    const { responseType = 'json', ...init } = opts;
    const url = new URL(path, this.baseurl).href;
    const key = `${method} ${url}`;

    const send = async (): Promise<T> => {
      if (this.debug) console.log(`[api] ${method} ${url}`);
      const headers = new Headers(init.headers);
      if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }
      const response = await fetch(url, { ...init, method, headers });
      return parseResponse<T>(response, responseType);
    };

    if (!this.cacheable(method)) return send();

    const entry = this.cacheStore().get(key);
    // server entries live in a per-request cache, so they never go stale
    if (entry && (isServer() || this.entryAge(entry) < this.defaultCacheTime * 1000)) {
      if (this.debug) console.log(`[api] cache hit ${method} ${url}`);
      return entry.promise as Promise<T>;
    }

    const promise = send();
    this.store(key, promise);
    return promise;
  }
}

export default ApiClient;
