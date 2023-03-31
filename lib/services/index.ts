import promiseCache from "next-promise-cache";
import { cache } from "react";

const directusEndpoint =
  process.env.NEXT_PUBLIC_CONTENT_API || "http://localhost:3000";

const DEBUG = process.env.NEXT_PUBLIC_PROMISE_CACHE_DEBUG || "false";
const debug = DEBUG === "true" ? true : DEBUG === "verbose" ? "verbose" : false;

const clientInstance =
  typeof window !== "undefined" &&
  new promiseCache({
    baseurl: directusEndpoint,
    defaultCacheTime: 60 * 5,
    debug,
  });

export const directus =
  typeof window === "undefined"
    ? cache(() => new promiseCache({ baseurl: directusEndpoint, debug }))
    : () => clientInstance as promiseCache;
