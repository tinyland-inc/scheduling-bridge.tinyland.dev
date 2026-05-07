# Soft-launch social blurbs

Short copy variants for each channel. No emoji unless natural to the
channel. Provider claims must stay inside the spec: live-proven Codex;
schema-modeled GPT5/Anthropic/MCP/etc.; planned Bedrock and Azure.

Distribution happens after M4.4. These are drafts only.

---

## Hacker News

**Variant A — Show HN, problem-led**

> Show HN: oauth-mux — typed OAuth fallback for AI harness accounts
>
> If you carry multiple AI identities (personal Codex, work seat,
> Claude sub, Anthropic API key, MCP servers), switching between them
> is manual and 401/429 failures are opaque. oauth-mux models
> credential health as a typed three-layer union (auth, operability,
> availability) and routes via a single `MuxDecision.fromHttpStatus`
> function. Codex is live-proven; GPT5, Anthropic, MCP, GitHub, Linear,
> Vercel, Figma, FlakeHub are schema-modeled. Bedrock and Azure are
> planned. MIT, Zig core, npm CLI. https://scheduling-bridge.tinyland.dev

**Variant B — Show HN, mechanism-led**

> Show HN: oauth-mux — a typed fallback algebra for OAuth/API-key
> credentials across AI providers
>
> Discovery is redacted by default (no token material in JSON output).
> Seven secret backends; no daemon dependency. Live-proven scope is
> Codex; everything else is schema-modeled or planned, and the site is
> explicit about which is which. https://scheduling-bridge.tinyland.dev

**Variant C — minimal**

> oauth-mux: typed OAuth fallback for AI harness accounts. Live-proven
> on Codex; GPT5, Anthropic, and MCP are schema-modeled.
> https://scheduling-bridge.tinyland.dev

---

## Lobsters

**Variant A**

> oauth-mux is a small CLI for the multi-account AI harness problem.
> Typed three-layer liveness (auth/operability/availability), single
> decision function for routing, redacted discovery output, no daemon
> dependency. Live-proven on Codex; GPT5, Anthropic, and MCP servers
> are schema-modeled; Bedrock and Azure planned. MIT.
> https://scheduling-bridge.tinyland.dev
>
> Tags: cli, oauth, openai, devtools, release

**Variant B**

> Project site for oauth-mux is up. The fallback algebra and provider
> matrix are the parts most worth reading — typed, cited, and honest
> about which providers are live-proven (Codex) vs schema-modeled (the
> rest). https://scheduling-bridge.tinyland.dev

---

## X / Twitter (≤ 280 chars)

**Variant A**

> oauth-mux: typed OAuth fallback for AI harness accounts. Models
> credential health as a typed union, routes via one decision
> function. Live-proven on Codex; GPT5/Anthropic/MCP schema-modeled;
> Bedrock/Azure planned. MIT. https://scheduling-bridge.tinyland.dev

**Variant B**

> If you juggle multiple AI accounts, oauth-mux gives you typed
> fallback (use_this / try_next_account / try_next_provider) instead of
> guessing at 401s and 429s. Live-proven on Codex.
> https://scheduling-bridge.tinyland.dev

**Variant C**

> Released the project site for oauth-mux. Typed fallback algebra,
> redacted discovery, seven secret backends, no daemon dependency.
> Codex live-proven; the rest schema-modeled or planned.
> https://scheduling-bridge.tinyland.dev

**Variant D**

> oauth-mux v0.1 is on npm. The site at https://scheduling-bridge.tinyland.dev walks
> through the fallback algebra and the provider matrix. Honest scope:
> Codex is live-proven; everything else is typed but pending live
> proofs.

---

## Mastodon (≤ 500 chars)

**Variant A**

> oauth-mux is a small FOSS CLI for the multi-account AI harness
> problem. Typed three-layer credential liveness
> (auth/operability/availability), single decision function for
> routing, redacted discovery (no token material), seven secret
> backends, no daemon dependency. Live-proven on Codex; GPT5,
> Anthropic, and MCP servers are schema-modeled; Bedrock and Azure
> planned. Site walks through the fallback algebra and provider matrix
> with citations to source. https://scheduling-bridge.tinyland.dev

**Variant B**

> Launched the project site for oauth-mux today.
>
> If you carry multiple AI subscriptions/keys, the CLI handles
> fallback as a typed function of credential liveness rather than
> per-provider heuristics. Codex is live-proven; the rest of the
> matrix is schema-modeled or planned, and the site is explicit about
> which.
>
> https://scheduling-bridge.tinyland.dev

**Variant C**

> oauth-mux: typed OAuth fallback for AI harness accounts. MIT,
> redacted-by-default discovery, seven secret backends. Live-proven
> scope is Codex; everything else is honest about being typed but not
> yet live-proven. https://scheduling-bridge.tinyland.dev

---

## BlueSky (≤ 300 chars)

**Variant A**

> oauth-mux: typed OAuth fallback for AI harness accounts. Models
> credential health as a typed union, routes via one decision
> function. Live-proven on Codex; GPT5, Anthropic, and MCP are
> schema-modeled. https://scheduling-bridge.tinyland.dev

**Variant B**

> If you juggle multiple AI accounts and have suffered ambiguous 401s
> and 429s, oauth-mux gives you a typed fallback algebra and redacted
> discovery. Codex live-proven; rest schema-modeled or planned.
> https://scheduling-bridge.tinyland.dev

**Variant C**

> Project site for oauth-mux is live. Typed fallback algebra,
> redacted-by-default discovery, seven secret backends, no daemon
> dependency. https://scheduling-bridge.tinyland.dev

**Variant D**

> Launched scheduling-bridge.tinyland.dev — the canonical reference for the oauth-mux
> fallback algebra and provider matrix. Honest about what's
> live-proven (Codex) vs schema-modeled vs planned.
