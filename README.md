## jasongallagher.org v4

![jasongallagher.org](https://content.jasongallagher.org/assets/39ce3e85-dd47-4b00-8e52-1552de9654c9)

My personal site and portfolio. This is a rewrite from a custom SSR rendered React site to NextJS 13 and React Server Components. It is is statically exported with data from a headless CMS and deployed to Cloudflare Pages. The result is a significantly slimmer payload and noticeably better performance over V3. Page Speed Insights score is now ~95 on mobile versus ~78 for v3 (Next 13 sends a lot of not always needed RSC output to the client which is most of what is keeping it from being even higher).

> Note: this code is NOT open source. You have a right to view, or install a local copy for personal viewing only. You are not granted the right to use this in any other way, either for commercial or non-commercial reasons. You may not distribute this code. Please see the LICENSE file for more details.

### Demo

https://jasongallagher.org

### Prerequisites

Node 16.8+

### Secrets

Copy `sample.env` to `.env` and modify as needed.

### Install

`npm i`

### Run in dev mode

`npm run dev` To view in the browser, go to `http://localhost:3000`

Keep in mind the site depends on a CMS backend for most of its content. So running it by itself will mainly show a skeleton with lots of errors in the network tab!
