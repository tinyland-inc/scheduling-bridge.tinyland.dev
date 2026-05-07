# oauth-mux

Typed OAuth fallback for AI harness accounts.

Project site: **https://scheduling-bridge.tinyland.dev** — the canonical reference for the
fallback algebra, provider matrix, security posture, and first-run
flows.

Source: https://github.com/Jesssullivan/oauth-mux

## What it is

Developers increasingly carry multiple personal, work, team,
subscription, and on-prem AI identities. Current CLIs often expose one
active account path. Losing focus to manual login/logout, profile
copying, and ambiguous 401/429 failures is the product pain.

oauth-mux models credential health as a typed three-layer union —
authentication, operability, and availability — so the pipeline can
pick the right next move instead of guessing. The four routing
decisions (`use_this`, `try_next_account`, `try_next_provider`,
`user_action_required`) come from a single `MuxDecision.fromHttpStatus`
mapping, not from per-call heuristics.

## Install

```sh
npm install -g oauth-mux
```

GitHub release tarballs (six platforms) and a curl installer are also
published per release; see the project site for the current options.

## One-command first run

```sh
oauth-mux codex onboard && oauth-mux codex probe-all
```

`codex onboard` walks the OAuth flow under a selected `CODEX_HOME`.
`codex probe-all` runs the live probes for the configured accounts and
returns the typed decision per route. Add `--capability codex-max
--json` to scope a specific route and emit machine-readable output.

## Provider availability

- **Live-proven: Codex.** Current `codex-max` cohort evidence is
  capability-scoped: `max-1` selected, `max-4` spare fallback, and
  `max-2`/`max-3` quota-exhausted. Spark/mini availability is not
  generalized to Max. Decision rows cover `live.available`,
  `live.quota_exhausted`, and the dead/degraded shapes.
- **Schema-modeled: GPT5, Anthropic (Claude Code subscription,
  Anthropic API key), MCP servers (HTTP and stdio), GitHub, Linear,
  Vercel, Figma (REST + Remote MCP), FlakeHub / Determinate.** Each has
  a typed admission status (`admitted_command`, `admitted_http`,
  `mcp_profile`, or `unadmitted`) and a probe shape. Live route proofs
  are pending.
- **Planned: Bedrock, Azure.**

The full table (with admission status, probe shape, and per-provider
citations) lives on https://scheduling-bridge.tinyland.dev.

## Security posture

Four hard guarantees:

- no `.env` token dumping;
- no committed credential stores;
- no raw token output in discovery/health;
- explicit live probes only when they may spend calls.

**File permission enforcement.** Config and state files are validated at
load time; loose permissions are rejected.

**Redacted discovery.** `oauth-mux discover --json` reports config path,
state path, providers, account names, secret backend names, tags,
profiles, and safe command templates. It does not include token
material.

**No daemon dependency.** A daemon exists, but it is not a production
dependency. The default path is explicit selection, explicit probe, env
injection, and exec handoff. Background polling, automatic
subscription-spending checks, silent token refresh for upstream-CLI-owned
refresh semantics, and any release gate that depends on a long-running
daemon are explicitly not allowed yet.

**Seven secret backends.** The backend stores or returns raw secret
material; it does not define provider logic. Allowed:

- `env` — read from a process environment variable.
- `file` — read from a file path on disk.
- `keychain` — read from the OS keychain / secret service.
- `sops` — read decrypted through a sops-managed file.
- `age` — read decrypted through an age-managed file.
- `command` — read from the stdout of an explicit command.
- `stdin` — read from stdin at the moment of use.

Anything else is rejected at config validation time.

## Status

oauth-mux is FOSS (MIT). Codex is the live-proven provider, with
capability-scoped route evidence and explicit proof boundaries. Other
providers are schema-modeled — admitted, typed, and runnable, but not yet
exercised against live subscriptions on every route. Filing an issue with
a probe artifact is the fastest way to promote a provider out of
`schema-modeled`.

## Links

- Site: https://scheduling-bridge.tinyland.dev
- Source: https://github.com/Jesssullivan/oauth-mux
- Issues / discussions: GitHub
- License: MIT
