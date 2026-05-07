# Growth Path: Static-First → Dynamic SaaS Shape

Date: 2026-06-05

Linear: TIN-788 (M5.2). Parent: TIN-734 umbrella. Pure docs; no code shipped
with this spec.

This is the runbook for *future you*. M0–M4 ship a static-first SvelteKit site
to GitHub Pages (`adapter-static`, `prerender = true`, no server). M5.1 adds
build-time JSON endpoints. None of the dynamic shapes below are promised at
launch — this doc records *if/when* they become useful, the smallest possible
diff that gets you there, and the decision criteria that should gate the move.

## Static → Dynamic Adapter Swap

The single load-bearing change is in `svelte.config.js`. Today:

```js
// svelte.config.js — M0/M1/M2/M3/M4 baseline
import adapter from '@sveltejs/adapter-static';
// …
kit: {
  adapter: adapter({
    pages: 'build',
    assets: 'build',
    fallback: '404.html',
    precompress: true,
    strict: false,
  }),
}
```

Swap to a Node host:

```js
// svelte.config.js — adapter-node lane
import adapter from '@sveltejs/adapter-node';
// …
kit: { adapter: adapter({ out: 'build' }) }
```

Or to Vercel (still zero-cost on Hobby for low-traffic sites):

```js
// svelte.config.js — Vercel lane
import adapter from '@sveltejs/adapter-vercel';
// …
kit: { adapter: adapter({ runtime: 'nodejs22.x' }) }
```

That is the entire mechanical change. The harder work is content: every
`+page.svelte` that relied on `prerender = true` must now decide whether it
stays prerendered (default for marketing routes) or opts into SSR.

## Adding `+page.server.ts` Loaders

A static-first site can grow server loaders without abandoning the static
build by gating per-route. SvelteKit honors `export const prerender = true`
at module scope; routes without it become SSR-only on a dynamic adapter.

Skeleton for a dynamic route under an `adapter-node` deployment:

```ts
// src/routes/providers/+page.server.ts
import type { PageServerLoad } from './$types';
import { decodeOrThrow } from '$lib/effect/schema';
import { ProviderMatrix } from '$lib/content/providers.schema';

export const prerender = false;

export const load: PageServerLoad = async ({ fetch }) => {
  const res = await fetch('/api/providers');
  const json = await res.json();
  return { matrix: decodeOrThrow(ProviderMatrix)(json) };
};
```

If you must keep `adapter-static` and still ship a server-flavored route, the
escape hatch is to split routes by adapter: keep `/` and marketing pages
prerendered, and host the dynamic surface (e.g. `status.scheduling-bridge.tinyland.dev`) as a
separate deployment with its own adapter. Do not introduce ambient
`+page.server.ts` files into the static build — `adapter-static` will fail
the prerender pass.

## Form Actions

Form actions are the natural surface for things like provider-request
submissions or "notify me when daemon ships" signups. They live in
`+page.server.ts`:

```ts
// src/routes/providers/request/+page.server.ts
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const prerender = false;

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const provider = String(data.get('provider') ?? '').trim();
    if (!provider) return fail(400, { provider, missing: true });
    // forward to GitHub Issues API or queue
    return { success: true };
  },
};
```

Gate the route file behind a dynamic adapter. The launch site does not ship
this — it ships a `mailto:` / GitHub-issue link instead.

## Daemon-Status Surfaces

A `/status` route that polls a real `oauth-mux` daemon is *not promised*. The
spec § Security Posture is explicit: there is no production daemon at launch.
If the daemon RFC (TIN-738) ever lands, the surface would look like:

- `src/routes/status/+page.svelte` — client component polling
  `/api/daemon/health` every 30s with exponential backoff.
- `src/routes/api/daemon/health/+server.ts` — proxies to the daemon's IPC
  socket or HTTPS health endpoint with a 2s timeout.
- Hard requirement: never expose raw provider credentials, redaction posture
  matches the CLI `report` command.

Until the daemon is research-grade no longer, this section stays a
placeholder.

## API Surface Expansion

M5.1 ships `/api/providers` as a build-time JSON endpoint. Future surfaces
that *could* land on the same pattern, in rough priority order:

- `/api/probe/:provider` — once probe-as-a-service exists upstream in
  `oauth-mux`. Today probes are CLI-only.
- `/api/agent-snippet` — programmatic version of the M5 copy-paste snippet,
  with content-negotiation (`text/markdown`, `application/json`).
- `/api/changelog` — proxies the `oauth-mux` GitHub Releases feed at request
  time instead of build time, for fresher data.

None of these are committed. Each would need its own ticket and a rate-limit
story before shipping.

## Hosting Decision Tree

| Tier | When |
|---|---|
| GitHub Pages (now) | Static site, custom domain, $0 forever, no server. |
| Cloudflare Pages | Need edge functions or higher build-minute headroom; still $0 with limits. |
| Vercel Hobby | Need SvelteKit-native SSR, ISR, or form actions; $0 with limits, beware the personal/commercial-use line. |
| Bring-your-own Node | Need long-lived connections, daemon proxying, or compliance control; $5–20/mo on Fly.io/Render/Hetzner. |

Move down the tree only when the current tier *blocks a real feature*, not
speculatively.

## Cost Model

- GitHub Pages: $0. Public repo only.
- Cloudflare Pages: $0 with build-minute and request limits.
- Vercel Hobby: $0 with limits; commercial-use restriction applies.
- Node host: $5–20/mo for a single small instance.

Do not promise specific dynamic features at any tier. The site's value
proposition does not depend on dynamic surfaces — it depends on the CLI being
honest about what works.
