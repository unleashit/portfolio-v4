import fetchCache from "@unleashit/fetch-cache";
import { cache } from "react";

const directusEndpoint =
  process.env.NEXT_PUBLIC_CONTENT_API || "http://localhost:3000";

const clientInstance =
  typeof window !== "undefined" &&
  new fetchCache({
    baseurl: directusEndpoint,
    defaultCacheTime: 60 * 5,
    debug: true,
  });

export const directus =
  typeof window === "undefined"
    ? cache(() => new fetchCache({ baseurl: directusEndpoint, debug: true }))
    : () => clientInstance as fetchCache;
