# oauth-mux: typed OAuth fallback for AI harness accounts

Most developers I know now carry multiple AI identities — a personal
ChatGPT/Codex, a work seat on someone's enterprise plan, a Claude
subscription, an Anthropic API key for prototypes, plus whatever MCP
servers their team has stood up. The CLIs that ship with these tools
mostly assume one active account at a time. Switching is manual:
log out, log in, copy a profile, hope nothing has cached the old token.

When something fails, you get an opaque 401 or 429 and have to guess
whether the credential is dead, the subscription is rate-limited, the
quota window has rolled over, or the provider itself is degraded. The
guess is almost always wrong on the first try.

**oauth-mux** is a small CLI that tries to fix this. It is FOSS, MIT,
and the project site is at [site.scaffold](https://site.scaffold).

## Typed fallback, in one paragraph

oauth-mux models credential health as a typed three-layer union:
authentication (is the credential good?), operability (can it actually
run a request?), and availability (is the route currently usable?). HTTP
statuses map through a single `MuxDecision.fromHttpStatus` function to
one of four decisions: `use_this`, `try_next_account`,
`try_next_provider`, or `user_action_required`. There is no
per-provider heuristic guessing; the routing is a typed function of the
liveness state. The full algebra — `CredentialLiveness`,
`Availability`, `DegradedReason`, `DeadReason`, and the decision table
— is on the site, copied verbatim from the source.

## What's actually proven

Being honest about scope matters here, because the AI tools space is
saturated with "supports everything" claims that fall apart under load.

- **Live-proven: Codex.** Current `codex-max` cohort evidence is
  capability-scoped: `max-1` selected, `max-4` spare fallback, and
  `max-2`/`max-3` quota-exhausted. Spark/mini availability is not
  generalized to Max. The site keeps provider-originated in-session quota
  fallback as an explicit unproven lane.
- **Schema-modeled: GPT5, Anthropic, MCP servers, GitHub, Linear,
  Vercel, Figma, FlakeHub.** Typed admission status and probe shapes
  are in the source; live route proofs are pending.
- **Planned: Bedrock, Azure.**

Discovery is redacted by default. `oauth-mux discover --json` returns
config path, providers, account names, backend names, tags, and safe
command templates — no token material. Seven secret backends are
allowed (env, file, keychain, sops, age, command, stdin);
anything else is rejected at config validation.

## Where it goes next

The schema-modeled tier is the contributor surface. If you have a live
subscription for one of the modeled providers and can capture a probe
artifact, the path from `schema-modeled` → `live-proven` is short and
documented. The provider authoring checklist on the site walks through
it.

If the multi-account harness pain is something you live with, the site
is the best place to start: **[site.scaffold](https://site.scaffold)**.
