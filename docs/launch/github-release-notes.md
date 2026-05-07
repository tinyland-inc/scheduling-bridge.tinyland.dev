# oauth-mux release notes (soft-launch draft)

> Draft for the next upstream `Jesssullivan/oauth-mux` release. Uses the
> website launch as the primary CTA. Content is intentionally narrow and
> matches the voice on https://site.scaffold.

## What's new

This release pairs with the launch of the project site at
**https://site.scaffold** — the canonical place to read the typed fallback
algebra, the provider matrix, the security posture, and the first-run
flows in one continuous page.

oauth-mux models credential health as a typed three-layer union —
authentication, operability, and availability — so the harness can pick
the right next move (`use_this`, `try_next_account`, `try_next_provider`,
or hand back to the user) instead of guessing at an opaque 401 or 429.
That algebra is the differentiator, and the site walks through it with
the real `CredentialLiveness`, `Availability`, and `MuxDecision` types
copied directly from the source.

Discovery (`oauth-mux discover --json`) is redacted by default: it
reports config path, providers, account names, secret backend names,
tags, profiles, and safe command templates. It does not include token
material.

## Provider scope (read this before filing issues)

- **Live-proven: Codex.** Current `codex-max` cohort evidence is
  capability-scoped: `max-1` selected, `max-4` spare fallback, and
  `max-2`/`max-3` quota-exhausted. Spark/mini availability is not
  generalized to Max.
- **Schema-modeled: GPT5, Anthropic (Claude Code subscription, Anthropic
  API key), MCP servers (HTTP and stdio), GitHub, Linear, Vercel, Figma,
  FlakeHub.** Probe shapes and admission status are typed; live route
  proofs are pending.
- **Planned: Bedrock, Azure.**

Background-daemon refresh is not a production dependency in this
release. The default path remains explicit selection, explicit probe,
env injection, and exec handoff.

## Try it

```sh
npm install -g oauth-mux
oauth-mux codex onboard
oauth-mux codex probe-all --capability codex-max --json
```

Read the site for the full first-run walkthrough, the provider matrix,
and the security posture: **https://site.scaffold**.
