## jasongallagher.org v4

My personal site and portfolio in NextJS 13 using the app directory and React Server Components. Static site built off from a headless CMS and deployed to Cloudflare Pages. Significantly slimmer payload and better performance over V3, with a Page Speed Insights score of 98 on mobile (versus ~78 for v3).

> Note: this code is NOT an open source. You have a right to view, or install a local copy for personal viewing only. You are not granted the right to use this in any other way, either for commercial or non-commercial reasons. You may not distribute this code. Please see the LICENSE file for more details.

### Prerequisites

Node 16.8+

### Secrets

Copy `sample.env` to `.env` and modify as needed.

### Install

`npm i`

### Run in dev mode

`npm run dev` To view in the browser, go to `http://localhost:3000`

Keep in mind the site depends on a CMS backend for most of its content. So running it by itself will mainly show a skeleton with lots of errors in the network tab!
