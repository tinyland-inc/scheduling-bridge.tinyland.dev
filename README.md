# scheduling-bridge.tinyland.dev

> **Monadic booking middleware for hostile calendar stacks**

Brute-force your way to scheduling freedom. Acuity, cal.com, Vagaro, GlossGenius backend interop. Companion surface to the @tummycrypt/scheduling-bridge npm package.

## Status

- **Tier:** Tier 2 — strategic
- **GTM bucket:** FOSS + paired enterprise integration
- **Stage:** brand surface seeded from `tinyland-inc/site.scaffold` (scheduling-bridge placeholder copy)
- **Owner:** Tinyland, Inc.

## Stack

Static SvelteKit, Skeleton 4.15.2 (pinned), Tailwind v4, Bazel + Nix + Just per the
Tinyland house scaffold. No runtime database, no auth at the edge. Federated content
flows in from `tinyland.dev` via signed `PublicPulseSnapshot` JSON (planned).

## Quick start

```bash
direnv allow
just setup
just dev
```

## Federation

This site is a **passive ingestor** of `tinyland.dev` snapshots:

- Posts (mdx) — sync from operator's permaspace
- Products / offers — Schema.org Offer JSON
- Events / scheduling — scheduling-kit-derived JSON
- Pulse — `PublicPulseSnapshot` static JSON

Wire-up happens once the federation contract is finalized at the
authority monolith.

## See also

- House scaffold: [`tinyland-inc/site.scaffold`](https://github.com/tinyland-inc/site.scaffold)
- Authority monolith: [`tinyland-inc/tinyland.dev`](https://github.com/tinyland-inc/tinyland.dev)
- Internal map of all sister sites: [`tinyland-inc/tinyland.internal`](https://github.com/tinyland-inc/tinyland.internal)
