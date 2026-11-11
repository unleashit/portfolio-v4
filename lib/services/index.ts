import { cache } from 'react';
import { ApiClient } from './api';

const directusEndpoint =
  process.env.NEXT_PUBLIC_CONTENT_API || 'http://localhost:3000';

/**
 * NEXT_PUBLIC_API_DEBUG replaces the NEXT_PUBLIC_PROMISE_CACHE_DEBUG flag that
 * came from next-promise-cache. Both are read so existing env files and CI
 * secrets keep working.
 */
const debugFlag =
  process.env.NEXT_PUBLIC_API_DEBUG ??
  process.env.NEXT_PUBLIC_PROMISE_CACHE_DEBUG;
const debug = debugFlag === 'true' || debugFlag === 'verbose';

/** Browser-side lifetime of a GET in seconds. Server GETs are deduped per request. */
const CLIENT_CACHE_TIME = 60 * 5;

/** One instance per server request, so its dedup cache is request scoped. */
const getServerClient = cache(() => new ApiClient({ baseurl: directusEndpoint, debug }));

/** A single long-lived instance on the client, with a time based cache. */
const clientInstance =
  typeof window !== 'undefined'
    ? new ApiClient({
        baseurl: directusEndpoint,
        defaultCacheTime: CLIENT_CACHE_TIME,
        debug,
      })
    : null;

/**
 * Isomorphic access to the CMS API. Exported as a function so call sites read
 * the same (`directus().get(...)`) on both sides of the boundary.
 */
export const directus = () =>
  typeof window === 'undefined' ? getServerClient() : clientInstance!;

export { ApiClient, ApiError } from './api';
export type { FetchOpts, ResponseTypes } from './api';
