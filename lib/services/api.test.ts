import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// React's client build (the one jsdom loads) implements `cache` as a pass
// through, so server-side dedup could not be exercised otherwise. This stands
// in for the react-server implementation: one store per request.
const { stores } = vi.hoisted(() => ({
  stores: new Map<() => unknown, unknown>(),
}));

vi.mock('react', () => ({
  cache: (fn: () => unknown) => () => {
    if (!stores.has(fn)) stores.set(fn, fn());
    return stores.get(fn);
  },
}));

// vi.mock is hoisted above imports, so the react stub is already in place here.
import { ApiClient, ApiError } from './api';

const BASE = 'https://cms.example';

const json = (body: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });

// A Response body can only be read once, so hand out a fresh one per call.
const respond = (body: unknown, init?: ResponseInit) =>
  vi.fn(async () => json(body, init));

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  fetchMock = vi.fn();
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
  stores.clear();
});

const asServer = () => vi.stubGlobal('window', undefined);
const asClient = () => vi.stubGlobal('window', globalThis.window);

describe('ApiClient.get on the server', () => {
  it('resolves a path against the base url', async () => {
    asServer();
    fetchMock.mockImplementation(respond({ data: [1] }));

    await new ApiClient({ baseurl: BASE }).get('/items/project?fields=id');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe(`${BASE}/items/project?fields=id`);
  });

  it('dedupes concurrent identical GETs into a single request', async () => {
    asServer();
    fetchMock.mockImplementation(respond({ data: ['project'] }));
    const api = new ApiClient({ baseurl: BASE });

    const [a, b] = await Promise.all([
      api.get<{ data: string[] }>('/items/project'),
      api.get<{ data: string[] }>('/items/project'),
    ]);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(a).toEqual(b);
    expect(a.data).toEqual(['project']);
  });

  it('serves a later GET in the same request from the cache', async () => {
    asServer();
    fetchMock.mockImplementation(respond({ data: ['blocks'] }));
    const api = new ApiClient({ baseurl: BASE });

    await api.get('/items/blocks');
    const second = await api.get<{ data: string[] }>('/items/blocks');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(second.data).toEqual(['blocks']);
  });

  it('keeps a rejected promise cached instead of refetching', async () => {
    asServer();
    fetchMock.mockRejectedValue(new Error('network down'));
    const api = new ApiClient({ baseurl: BASE });

    await expect(api.get('/items/blocks')).rejects.toThrow('network down');
    await expect(api.get('/items/blocks')).rejects.toThrow('network down');

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('does not mix up different paths', async () => {
    asServer();
    fetchMock
      .mockResolvedValueOnce(json({ data: ['a'] }))
      .mockResolvedValueOnce(json({ data: ['b'] }));
    const api = new ApiClient({ baseurl: BASE });

    const [one, two] = await Promise.all([
      api.get<{ data: string[] }>('/items/skills'),
      api.get<{ data: string[] }>('/items/navigation'),
    ]);

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(one.data).toEqual(['a']);
    expect(two.data).toEqual(['b']);
  });

  it('sends a json content type and keeps caller headers', async () => {
    asServer();
    fetchMock.mockImplementation(respond({ ok: true }));
    const api = new ApiClient({ baseurl: BASE });

    await api.get('/items/skills', { headers: { 'X-Trace': '1' } });

    const headers = new Headers((fetchMock.mock.calls[0][1] as RequestInit).headers);
    expect(headers.get('Content-Type')).toBe('application/json');
    expect(headers.get('X-Trace')).toBe('1');
  });

  it('falls back to text when the body is not json', async () => {
    asServer();
    fetchMock
      .mockResolvedValueOnce(new Response('not json at all', { status: 201 }))
      .mockResolvedValueOnce(new Response('', { status: 200 }));
    const api = new ApiClient({ baseurl: BASE });

    await expect(api.get('/items/blocks')).resolves.toBe('not json at all');
    await expect(api.get('/items/empty')).resolves.toBeNull();
  });
});

describe('ApiClient cache on the client', () => {
  it('serves GETs from the cache until they expire', async () => {
    asClient();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
    fetchMock.mockImplementation(respond({ data: ['cached'] }));
    const api = new ApiClient({ baseurl: BASE, defaultCacheTime: 300 });

    await api.get('/items/blocks');
    await api.get('/items/blocks');
    expect(fetchMock).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(301_000);
    await api.get('/items/blocks');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('does not cache on the client without a cache time', async () => {
    asClient();
    fetchMock.mockImplementation(respond({ data: [] }));
    const api = new ApiClient({ baseurl: BASE });

    await api.get('/items/blocks');
    await api.get('/items/blocks');

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('invalidate() drops entries for a path', async () => {
    asClient();
    fetchMock.mockImplementation(respond({ data: [] }));
    const api = new ApiClient({ baseurl: BASE, defaultCacheTime: 300 });

    await api.get('/items/blocks');
    api.invalidate('/items/blocks');
    await api.get('/items/blocks');

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('invalidate("*") drops everything', async () => {
    asClient();
    fetchMock.mockImplementation(respond({ data: [] }));
    const api = new ApiClient({ baseurl: BASE, defaultCacheTime: 300 });

    await api.get('/items/a');
    await api.get('/items/b');
    api.invalidate('*');
    await Promise.all([api.get('/items/a'), api.get('/items/b')]);

    expect(fetchMock).toHaveBeenCalledTimes(4);
  });

  it('evicts the oldest entry once maxCacheSize is reached', async () => {
    asClient();
    fetchMock.mockImplementation(respond({ data: [] }));
    const api = new ApiClient({
      baseurl: BASE,
      defaultCacheTime: 300,
      maxCacheSize: 2,
    });

    await api.get('/items/a');
    await api.get('/items/b');
    await api.get('/items/c'); // at capacity, so /items/a is dropped

    await api.get('/items/b'); // still cached
    await api.get('/items/c'); // still cached
    await api.get('/items/a'); // fetched again

    expect(fetchMock).toHaveBeenCalledTimes(4);
  });
});

describe('ApiClient.post', () => {
  it('never caches and passes the body through', async () => {
    asServer();
    fetchMock.mockImplementation(respond({ data: { id: 1 } }, { status: 201 }));
    const api = new ApiClient({ baseurl: BASE });
    const payload = { name: 'test', email: 'test@example.com' };

    const first = await api.post('/items/contacts', {
      body: JSON.stringify(payload),
    });
    const second = await api.post('/items/contacts', {
      body: JSON.stringify(payload),
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(first).toEqual(second);
    for (const call of fetchMock.mock.calls) {
      const init = call[1] as RequestInit;
      expect(init.method).toBe('POST');
      expect(init.body).toBe(JSON.stringify(payload));
    }
  });

  it('rejects with ApiError carrying status and response', async () => {
    asServer();
    const body = {
      errors: [
        { message: 'email is invalid', extensions: { field: 'email' } },
      ],
    };
    fetchMock.mockResolvedValue(json(body, { status: 400 }));
    const api = new ApiClient({ baseurl: BASE });

    let err: unknown;
    try {
      await api.post('/items/contacts', { body: '{}' });
    } catch (e) {
      err = e;
    }

    expect(err).toBeInstanceOf(ApiError);
    if (!(err instanceof ApiError)) throw err;

    expect(err.name).toBe('ApiError');
    expect(err.status).toBe(400);
    await expect(err.response.json()).resolves.toEqual(body);
  });
});
