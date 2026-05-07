# Omux Website Bootstrap

Date: 2026-04-29

Issue context: Linear `TIN-734` (Publish oauth-mux website and launch narrative), child of `TIN-491` (Done). GitHub `tinyland-inc/site.scaffold`. Source tool: `Jesssullivan/oauth-mux` (public).

## Baseline

`site.scaffold` is a fresh repo (`tinyland-inc/site.scaffold`, currently a single
14-byte `README.md` and an `Initial commit`). It will be the public marketing
and devtool surface for the `oauth-mux` FOSS project. The canonical product URL
is `https://site.scaffold`; the canonical source repo is `Jesssullivan/oauth-mux`
(now public, decided in `oauth-mux/docs/spec/repository-ownership-and-url-2026-04-28.md`).

Prior planning lives in
`oauth-mux/docs/spec/product-adoption-sprint-2026-04-28.md` — that doc covers
the launch narrative, content sections, outreach loop, and provider-status
posture. This spec is the engineering bootstrap layer: stack, repo conventions,
deploy lane, milestone breakdown, and the M0 file scaffold.

`oauth-mux` itself is in a public, post-publication state. This original
bootstrap snapshot predated the May 2026 Codex broker-owned session ladder and
paid cohort truthing. Current site copy must use the latest `oauth-mux` docs:
the Codex Max cohort is four routes, evidence is capability-scoped, and public
claims must not imply provider-originated in-session quota fallback,
unmanaged TUI hot-swap, same-thread quota recovery, or per-request muxing. The
product gap is adoption: first-run clarity, website narrative, contributor
surface, and launch-channel choreography. `site.scaffold` is the first
deliverable in that gap and the execution vehicle for `TIN-734`.

## Founding Prompt Alignment

The founding prompt is stricter than the first draft of this plan. Repairs:

- Build the site from the beginning as a real Bazel module-catalog consumer,
  not merely a repo with placeholder Bazel files.
- Instantiate the repo with `justfile`, Nix flake, direnv, CI, linting, test,
  Vite, and dotfile structures lifted from MassageIthaca and
  `jesssullivan.github.io` family repos.
- Use Skeleton UI **4.15.2** as the house UI baseline. Skeleton v5 remains a
  watch item or post-launch upgrade experiment, not the M0 stack.
- Use Svelte 5 runes and Effect.ts where they clarify static-first content,
  schema, and build-time ingestion. Do not wrap ordinary Svelte component state
  in Effect.
- Examine and consume the Tinyland Bazel module catalog deliberately. M0 must
  include at least one low-risk catalog module if a public registry/npm pair is
  available; otherwise M0 records the blocker explicitly and keeps the registry
  smoke green.
- Establish Linear project/milestones/issues and a GitHub Project/issue surface
  before broad implementation. Use Linear as the execution source of truth and
  GitHub as the public contributor/visibility surface.

## Stack Decision

The choice is "production-aligned from the get-go", but the baseline should
match working house production patterns before reaching for prerelease UI
surfaces.

- **Framework**: SvelteKit `^2.58.0` with Svelte `^5.55.5` (runes-only,
  `compilerOptions.runes: true`). Floor: `svelte ^5.46.4` per
  `@sveltejs/vite-plugin-svelte ^7` peer requirement.
- **Bundler**: Vite `^8.0.10` native. The scaffold must verify whether native
  Rolldown is active by default in our selected Vite mode and document any
  opt-in flag if needed. Do not use the `npm:rolldown-vite@^7.3.1` alias
  unless native Vite 8 cannot satisfy the build.
- **Vite plugin**: `@sveltejs/vite-plugin-svelte ^7.0.0`.
- **Adapter**: `@sveltejs/adapter-static ^3.0.10` with `pages: 'build'`,
  `assets: 'build'`, `fallback: '404.html'`, `precompress: true`,
  `strict: false`. `paths.base` empty (custom-domain serves at root).
  `prerender: { handleHttpError: 'warn', handleMissingId: 'warn' }`.
- **UI library**: Skeleton `4.15.2` exact pin for both
  `@skeletonlabs/skeleton` and `@skeletonlabs/skeleton-svelte`. This matches the
  founding prompt and current Tinyland production baseline. Skeleton v5
  `5.0.0-next.5` is a prerelease watch item only.
- **CSS**: Tailwind `^4.2.4` via `@tailwindcss/vite ^4.2.4`. Follow the working
  Skeleton-v4 + Tailwind-4 compatibility pattern from
  `jesssullivan.github.io-vite8`: `skeletonTailwindV4Compat()`,
  `@tummycrypt/vite-plugin-skeleton-colors`, and the house a11y plugin as
  appropriate.
- **Effect**: Effect `^3.21.2` (same major/minor as MassageIthaca's `^3.21.0`).
  Use it for build-time content/schema ingestion, provider-matrix validation,
  and structured launch data. Do not wrap ordinary Svelte runes state in
  Effect.
- **TypeScript**: `5.9.3` exact house pin. TypeScript 6 exists in the registry,
  but this repo should not jump ahead of the house Svelte/Bazel toolchain
  without a dedicated proof.
- **Package manager**: pnpm `10.13.1` exact house pin via `packageManager`,
  `MODULE.bazel`, and CI. Do not silently follow pnpm registry latest.
- **Node**: `22` via `.nvmrc`. Floor enforced by `flake.nix` (`nodejs_22`),
  `package.json` engines (`>=22 <25`), and the CI workflow.
- **Bazel**: `8.2.1` via `.bazelversion`, with `MODULE.bazel` declaring the
  consumer chain to `tinyland-inc/bazel-registry`. Bazel is a real dependency
  graph and registry-consumer proof from M0; the SvelteKit production build
  remains `pnpm run build` unless/until Bazel owns a hermetic build target.
- **Nix**: `flake.nix` shape modeled on MassageIthaca: two inputs (`nixpkgs`
  unstable, `flake-utils`), single `devShells.default`, `shellHook` echoes
  versions. Adds `just`, `gh`, `git`, `bazelisk` or Bazel 8.2.1, and gitleaks
  to the dev shell.

What we explicitly do NOT use:

- Vercel for the public static site. The target is GitHub Pages unless the
  Pages lane blocks launch.
- `npm:rolldown-vite@^7.3.1` alias unless native Vite 8 proof fails.
- Skeleton v5 in M0-M4. Track it as an upgrade path after launch or after the
  separate Tinyland v5 QA work proves the theme/component surface.
- mdsvex / blog tooling. omux is a single-page devtool site at launch.
- A monorepo/workspace layout. omux starts as a single-package repo; revisit
  only if M5 introduces shared packages.

## Repository Strategy

- **Owner**: `tinyland-inc`. Decided per `oauth-mux/docs/spec/repository-ownership-and-url-2026-04-28.md`:
  the source repo (`Jesssullivan/oauth-mux`) is personal-FOSS for trust and
  authorship clarity; the website lives in `tinyland-inc` so the launch /
  release infrastructure side stays org-backed.
- **Name**: `site.scaffold` (matches the deployed hostname; ergonomic for
  search and bookmark).
- **Visibility**: currently GitHub `INTERNAL`. Stay internal through M0
  bootstrap. Flip public at the same time as `site.scaffold` DNS goes live
  (start of M4).
- **Branch protection**: enable on `main` after the first green CI run.
  Required checks: the CI workflow's lint/typecheck/build/test jobs. Linear
  history. No force pushes. No deletions. Verify through GitHub branch
  protection API/readback, not by attempting a direct push to `main`.
- **Remote layout**: single repo. No worktrees / Conductor split at M0; if
  needed for parallel feature branches later, add per the
  `jesssullivan.github.io-*` family pattern.

## DNS And Deploy Lane

- **Deploy target**: GitHub Pages. Pages source: `actions` (workflow). Build
  artifact: `build/` (SvelteKit adapter-static output). Workflow shape: clone
  `Jesssullivan/jesssullivan.github.io/.github/workflows/deploy-pages.yml`,
  drop the `refresh-profile` job. PR builds verify without deploying.
- **Custom domain**: `site.scaffold`. Configure the repo Pages custom domain via
  GitHub API after DNS is ready. Keep `static/CNAME` as a single-line
  portability artifact if it survives adapter-static output, but do not treat
  it as the source of truth for Actions-based Pages.
- **DNS**: `xoxd.ai` zone is on Cloudflare (NOT DreamHost — verified via
  `dig +short NS xoxd.ai` returning `izabella.ns.cloudflare.com.` and
  `sullivan.ns.cloudflare.com.`). Add a single CNAME record:
  - **Type**: `CNAME`
  - **Name**: `omux`
  - **Target**: `tinyland-inc.github.io`
  - **Proxy status**: **DNS only (gray cloud)** — orange cloud breaks Let's
    Encrypt HTTP-01 validation
  - **TTL**: 300 (matches `pixelwise/k8s/dns.yaml:12` precedent)
- **TLS**: Let's Encrypt provisioned automatically by GitHub Pages once DNS
  resolves. Realistic timing: green within 30 min, escalate at 1h, hard
  ticket at 24h. CAA on `xoxd.ai` is empty (verified) — no blocker. Reference
  cert at `transscendsurvival.org` is Let's Encrypt R13 with 90-day rotation.
- **Redirects**:
  - `oauth-mux.xoxd.ai` → `site.scaffold` via Cloudflare Redirect Rule after the
    canonical domain is healthy. Do not plan a multi-domain GitHub Pages CNAME
    file for this repo unless the GitHub API and docs confirm the exact shape.
  - `omux.tinyland.dev` deferred until Tinyland surfaces a project page
    structure.
  - `omux.lmux.ai` deferred per `oauth-mux/docs/spec/repository-ownership-and-url-2026-04-28.md:47`.
- **HSTS / preload**: enable HTTPS enforce after cert provisions. Skip
  HSTS-preload registration until M5 (irreversible commitment).

## Bazel Consumer Pattern

omux should be the first static-first FOSS site that intentionally consumes the
Tinyland Bazel module catalog from the start. `elders.tinyland.dev` is the
closest current web consumer reference, but the founding prompt asks for a
broader scan across `lab`, `GloriousFlywheel`, `tinyland.dev`, `ci-templates`,
and the local `MODULE.bazel` population before freezing the module list. The
initial pattern:

- `MODULE.bazel`: declare the bazel-skylib/platforms/aspect_bazel_lib core,
  rules_nodejs/aspect_rules_js/rules_ts/rules_swc toolchains, Node 22.13.1,
  pnpm 10.13.1, TS 5.9.3, SWC v1.10.12. Add selected `bazel_dep` lines only
  for catalog modules that omux actually consumes and that have confirmed
  public registry + npm package availability.
- `.bazelrc`: two-registry chain, tinyland-inc first, BCR fallback:
  ```
  common --enable_bzlmod
  common --registry=https://raw.githubusercontent.com/tinyland-inc/bazel-registry/main/
  common --registry=https://bcr.bazel.build
  ```
- `BUILD.bazel`: 3 lines, just `npm_link_all_packages(name = "node_modules")`.
- `.bazelversion`: `8.2.1`.
- `.bazelignore`: standard SvelteKit excludes.

**Bazel role**: the site production build remains `pnpm run build` at M0
(vite build → adapter-static → `build/`), but Bazel is not decorative. It
exists to:
1. Register omux as a registry-aware consumer for the package-graph integrity
   proof story (`tinyland-inc/bazel-registry` proves modules can be consumed
   externally).
2. Allow future hermetic library targets (e.g., if omux grows shared TS libs
   that other sites should consume).
3. Add a `bazel mod graph` smoke step to CI as the registry-resolution proof.
4. Prove three low-risk catalog modules selected by
   `docs/spec/bazel-catalog-audit-2026-04-29.md`.

**M0 `tummycrypt_*` module picks**: leaf-tier only (no auth/db/backend modules
— omux is pure-static). The M-1.5 audit locks the first consumer set:

```python
bazel_dep(name = "tummycrypt_tinyland_color_utils",        version = "0.2.3")
bazel_dep(name = "tummycrypt_vite_plugin_a11y",            version = "0.2.2")
bazel_dep(name = "tummycrypt_vite_plugin_skeleton_colors", version = "0.2.2")
```

- `tummycrypt_tinyland_color_utils@0.2.3`: pure OKLCH/WCAG utility surface,
  zero runtime deps, consumed from `src/` as a real runtime proof.
- `tummycrypt_vite_plugin_a11y@0.2.2`: build-time Svelte accessibility scan,
  Vite 8 and Svelte 5 peer-compatible.
- `tummycrypt_vite_plugin_skeleton_colors@0.2.2`: Skeleton-v4 color-pair
  utility generation, directly aligned with the Skeleton `4.15.2` baseline.

Defer `tinyland_composables`, `tinyland_stores`, `tinyland_a11y_engine`,
`tinyland_a11y_logger`, and `tinyland_schemas` until a concrete M5/dynamic
surface needs them. `_schemas` is specifically blocked for public Bazel
consumers while its upstream repo remains private.

**Cross-listing**: every `bazel_dep` MUST also appear in `package.json`
`dependencies` so pnpm/Vite can resolve via npm tarballs. Imports in `src/`
use the npm path (`import { foo } from '@tummycrypt/tinyland-color-utils'`),
never a Bazel label. This mirrors `elders/src/lib/server/auth.ts:6`.

**`@npm` repo name**: literal `npm`. Each tummycrypt module uses its own
`tummycrypt_<name>_npm` to avoid collision with the consumer's `@npm`.

## Skeleton Baseline And v5 Watch

The M0-M4 baseline is Skeleton UI `4.15.2`, exact-pinned. This follows the
founding prompt and the current working Tinyland pattern. The v4 + Tailwind 4
integration should be copied from `jesssullivan.github.io-vite8` and adjusted
for omux:

- `@skeletonlabs/skeleton` and `@skeletonlabs/skeleton-svelte` exact `4.15.2`;
- `@tailwindcss/vite ^4.2.4`;
- `@tummycrypt/vite-plugin-skeleton-colors` for house color-pair utility
  generation;
- local `skeletonTailwindV4Compat()` Vite plugin if Skeleton's distributed CSS
  still emits syntax Tailwind 4 cannot consume directly;
- `@tummycrypt/vite-plugin-a11y` advisory at M0, blocking no later than M3.

Skeleton v5 `5.0.0-next.5` remains a watch item because it may eventually
reduce theme/plugin surface area. It is not the launch stack while the npm
`latest` tag remains v4.15.2 and the house QA track has not accepted v5. Create
a separate upgrade ticket after M4 or when Tinyland's v5 QA work lands.

## Effect.ts Pattern

Pin **Effect `^3.21.2`** (same major/minor line as MassageIthaca). v4-beta has API
churn (`ServiceMap.Service`, `Effect.service(Tag)` are v4-only) and isn't
worth the cost for the small Effect surface omux needs at M0.

Where Effect pays off in a static-first SvelteKit site:
- Build-time data loading: `+page.server.ts` / `+page.ts` `load` functions
  reading the provider matrix from `oauth-mux` source repo or local content.
- Schema-validating site config and content via `Schema.Struct`.
- Build scripts that ingest external data (provider docs, OG image
  generation).

Where it does NOT pay off:
- Browser runtime (the site is `prerender = true`, no server-side anything).
- `.svelte` component state (use Svelte 5 runes: `$state`, `$derived`,
  `$effect`).
- Form validation (use Zod via `sveltekit-superforms` if forms appear).
- Wrapping every Svelte interaction.

M0 seed files (~30 lines total):
- `src/lib/effect/runtime.ts` — `runOrThrow`, `runExit`, empty `AppLayer`.
- `src/lib/effect/schema.ts` — `decodeOrThrow`, `decode`, `formatExit`.
- `src/lib/content/providers.schema.ts` — `Provider`, `ProviderStatus`,
  `ProviderMatrix` schemas tied to the oauth-mux provider live-proven /
  schema-modeled / planned tier list.

## Theme And Brand

- **Palette**: Warm/Pragmatic (user choice). Anchors:
  - Primary 500: `oklch(0.63 0.16 38)` — burnt orange
  - Secondary 500: `oklch(0.46 0.10 195)` — desaturated teal
  - Tertiary 500: `oklch(0.50 0.13 295)` — muted plum
  - Surface 500: `oklch(0.56 0.018 60)` — warm gray
- **Theme file**: `src/lib/styles/themes/omux.css` — single
  `[data-theme='omux']` block in the Skeleton 4 house theme format. Full
  11-shade ramps for primary, secondary, tertiary, success, warning, error, and
  surface, with color-pair variables generated/verified through the
  `@tummycrypt/vite-plugin-skeleton-colors` path.
- **Dark-mode strategy**: `data-mode` attribute on `<html>` (matches v4
  Tinyland convention via `@custom-variant dark
  (&:where([data-mode='dark'], [data-mode='dark'] *))`). Inline FOUC-prevention
  script in `app.html` reads `localStorage` synchronously before Svelte mounts.
  Theme store at `src/lib/theme.svelte.ts` manages user toggle (lifted from
  `pkgs.tinyland.dev/src/lib/theme.svelte.ts` pattern).
- **Typography**: Inter (300/400/500/600/700) + JetBrains Mono (400/500/600)
  via `@fontsource-variable/*` and `@fontsource/*`. Loose family kinship with
  apex `xoxd.ai-site` (which uses the same fonts). Drop the apex's animated
  gradient line + dot-grid — those are apex-signature flourishes.
- **Logo / icon**: NONE exists in `oauth-mux/` (verified). To be commissioned
  separately. M0 ships with a wordmark only.
- **Tone**: typed, audited, redacted-by-default. The site is operator-facing
  devtool, not marketing splash. Hero shows real `oauth-mux` CLI output, not
  stock illustrations. Footer reads "A Jess Sullivan FOSS project built with
  Tinyland release infrastructure."

## Information Architecture

Per `oauth-mux/docs/spec/product-adoption-sprint-2026-04-28.md:74-148`. Single
page at `/`, with anchor sections:

1. **Hero** (`/`): headline `oauth-mux`, subhead "Typed OAuth fallback for AI
   harness accounts", primary install snippet (`npm install -g oauth-mux` +
   `oauth-mux codex onboard` + `oauth-mux codex probe-all --capability
   codex-max --json`), redacted JSON excerpt showing `live.available` /
   `live.quota_exhausted` from real live-QA artifacts. If `v0.1.3` is still
   unpublished at content freeze, present `doctor`, `report`, and
   `providers list` as staged next-release diagnostics rather than as
   installed commands.
2. **Problem** (`/#problem`): 3 sentences from the planning doc lines 98-104.
3. **Fallback algebra** (`/#fallback`): typed `CredentialLiveness` and
   `Availability` enums copied verbatim from `oauth-mux/src/types.zig:152-215`.
   Includes `MuxDecision` table from `:245-261` and routing semantics from the
   provider checklist `:223-231`.
4. **Install** (`/#install`): npm command (current). GitHub Release tarballs
   (current — six platforms). Homebrew public tap (`jesssullivan/omux`,
   current as of v0.1.6; do not describe as Homebrew core). deb/rpm (staged,
   no public repo yet). Curl installer with `REPO=Jesssullivan/oauth-mux`
   override note until next release regenerates default.
5. **First-run** (`/#first-run`): three flows — Codex paid cohort path,
   generic provider author path, agent discovery path with
   `agent_safe_commands` list.
6. **Privacy & security** (`/#security`): four verbatim claims from planning
   doc lines 127-131. Secret backends list. Redaction posture. Daemon
   boundary (no background daemon as production dependency).
7. **Provider matrix** (`/#providers`): Codex live-proven; Claude/GitHub/
   Linear/Vercel/Figma/FlakeHub/MCP HTTP schema-modeled. Per-provider
   admission status table from `oauth-mux/docs/spec/provider-probe-admission-matrix-2026-04-26.md`.
8. **Contribute** (`/#contribute`): link to provider authoring checklist.
   Acceptance gate. "Ask" copy.
9. **Contact** (`/#contact`): GitHub issues, discussions. Security: "Use a
   private GitHub issue or wait for the public security policy" (NO email —
   no public security policy exists yet).

Optional later: `/changelog` (mirrors GitHub releases), `/docs/*`
(mirrors `oauth-mux/docs/`), `/agent-snippet` (a copy-paste-able snippet for
AI assistants describing how to safely inspect the mux).

## Content Sources

All copy must be backed by `file_path:line_number` from `oauth-mux/`.
Single-source-of-truth per the round 2 content brief:

- Hero text → `oauth-mux/docs/spec/product-adoption-sprint-2026-04-28.md:84-96`
- Problem statement → same doc `:98-104`
- Liveness algebra → `oauth-mux/src/types.zig:152-215, 224-240, 245-261`
- Provider matrix → `oauth-mux/docs/spec/provider-probe-admission-matrix-2026-04-26.md:26-39`
- Codex live-proven evidence and four-route cohort truth →
  `oauth-mux/docs/live-provider-qa.md` plus
  `oauth-mux/docs/spec/paid-cohort-soak-claim-policy-2026-05-03.md`
- "What not to claim" guardrails → planning doc `:69-74` (verbatim)

The first launch artifacts were superseded by current Codex Max cohort evidence:
`max-1#codex-max` selected, `max-4#codex-max` spare fallback, and
`max-2#codex-max` / `max-3#codex-max` quota-exhausted. Do not generalize
Spark, mini, or dashboard credit availability to `codex-max`.

Build-time content load:
- `src/lib/content/providers.json` — generated at build time from oauth-mux
  source repo via `scripts/regen-providers.mts`. Validated against
  `ProviderMatrix` schema in `+page.server.ts` `load` (returns 500 if
  malformed). Regen on demand via `just regen-providers`.

## Milestone Plan (M0 → M5)

Each implementation milestone is ~1 week of work; total target ~5 weeks after
project management setup is approved → start `2026-04-29`, target ship
`2026-06-05`. Milestones are Linear `Milestone` entries on the project.

### M-1 — Project Management Bootstrap (target immediate)

Goal: establish the exhaustive tracking surfaces before implementation churn.
No DNS, Pages, dependency, or application scaffold mutation happens until this
is in place.

Deliverables:
- Linear project `oauth-mux Website Launch (site.scaffold)` attached to
  `Presence And Narrative`
- M0-M5 Linear milestones with target dates
- TIN-734 linked to the new project as the umbrella issue
- 18-24 Linear issues using hybrid granularity: fine M0/M2/M4, coarse M1/M3/M5
- GitHub Project v2 board for public-facing work, with fields for Linear ID,
  milestone, SLA band, status, and launch lane
- GitHub labels and issue templates aligned with Linear labels
- Bazel module catalog audit issue, explicitly covering `tinyland.dev`,
  `lab`, `GloriousFlywheel`, `elders.tinyland.dev`, `ci-templates`, and local
  standalone package/module repos before choosing M0 catalog deps
- Repo `AGENTS.md` and `CLAUDE.md` created before implementation so later
  agents inherit the contract

Acceptance:
- Linear project and milestones are visible and linked from TIN-734
- GitHub Project board exists and links back to Linear/TIN-734
- No implementation issue lacks an SLA band and milestone
- Catalog-consumer decision is recorded before `MODULE.bazel` is committed
- Spec document is committed before the first scaffold PR

### M0 — Repo & Toolchain Bootstrap (target +3 days)

Goal: `just check` passes, the empty repo is now a working SvelteKit + Bazel
+ Nix shell. No content yet, no public surface.

Deliverables:
- `flake.nix`, `.envrc`, `Justfile` trio
- `package.json` with all version pins (Skeleton 4.15.2, Vite 8 native, Effect
  3.21.x, pnpm 10.13.1, Node 22, TS 5.9.3)
- `pnpm-workspace.yaml`, `pnpm-lock.yaml`
- `MODULE.bazel`, `.bazelrc`, `.bazelversion`, `.bazelignore`, `BUILD.bazel`
- All dotfiles: `.npmrc`, `.nvmrc`, `.gitignore`, `.editorconfig`,
  `.prettierrc`, `.prettierignore`, `eslint.config.ts`, `.gitleaks.toml`,
  `cliff.toml`
- `tsconfig.json`, `vitest.config.ts`, `playwright.config.ts`, `vite.config.ts`,
  `svelte.config.js`
- `src/app.html`, `src/app.css`, `src/app.d.ts`
- Empty `src/lib/`, empty `src/routes/+page.svelte`, `src/routes/+layout.svelte`,
  `src/routes/+layout.ts`
- `static/.nojekyll`
- `AGENTS.md`, `CLAUDE.md` (pointer)
- This spec doc (already)

Acceptance:
- `just check` green
- `just build` produces `build/` with `index.html`
- `nix develop` enters shell with node 22, pnpm 10.13.1, just, gh
- `bazel mod graph` succeeds (registry chain verified, and at least one
  low-risk catalog module consumed if version/import mapping is confirmed)
- `git diff --check` clean
- No secrets committed (gitleaks scan green)

### M1 — Toolchain Hardening & CI (target +1 week)

Goal: CI green on every push, lint/typecheck/build/test all enforced.
Branch protection on `main` configured.

Deliverables:
- `.github/workflows/ci.yml` (lint + check + unit + build + e2e via
  Playwright)
- `.github/workflows/deploy-pages.yml` (build job uploads, deploy job gated
  to push-to-main)
- CI template review note: use `tinyland-inc/ci-templates` actions for
  `nix-setup`, secrets scanning, and future cache-aware work where applicable.
  Do not use package-publish reusable workflows for the website itself; this is
  a static Pages deploy, not an npm package.
- `.github/dependabot.yml` (npm + github-actions weekly)
- `.github/CODEOWNERS` (Jess as default owner)
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/ISSUE_TEMPLATE/` (bug + feature + provider request)
- `SECURITY.md` (private-issue contact for now; full policy deferred)
- `LICENSE` (MIT, matches oauth-mux)
- Branch protection on `main` (required CI checks, linear history, no force
  pushes, no deletions)
- Optional reusable Nix workflow stub (calls
  `tinyland-inc/GloriousFlywheel/.github/workflows/reusable-nix-check.yml@main`
  if a flake-check job becomes useful)

Acceptance:
- All workflows pass on a no-op PR
- Branch protection enforced (verified through GitHub branch-protection API
  readback)
- Dependabot creates first PRs (non-action, just confirm config parses)

### M2 — Design System & Theme (target +1 week)

Goal: omux brand surface lands. Skeleton 4.15.2 wired. Custom theme rendering.
Design system primitives (typography scale, color, spacing) documented and
visually verified.

Deliverables:
- `src/lib/styles/themes/omux.css` (full Skeleton 4 house theme, Warm/Pragmatic
  palette, all 7 scales × 11 shades + color-pair/contrast vars)
- `src/lib/theme.svelte.ts` (theme store, lifted from pkgs.tinyland.dev
  pattern, adapted for the omux mode toggle)
- `src/lib/components/ThemeSwitcher.svelte` (Skeleton 4 component-based, lifted
  from `jesssullivan.github.io-vite8/src/lib/components/ThemeSwitcher.svelte`
  pattern, with omux-specific theme list)
- `src/routes/+layout.svelte` (AppBar with brand wordmark, nav, footer,
  ThemeSwitcher, mobile Dialog drawer wrapping Navigation
  `layout='sidebar'`)
- Inline FOUC-prevention script in `src/app.html`
- Visual smoke test: render at `/style-guide` (gated behind a query param,
  not in prod nav) showing all 7 scales × 11 shades plus typography
  hierarchy
- Skeleton 4 component smoke: AppBar, Avatar, Tabs, Tooltip, Switch, Toast,
  Popover, Dialog all instantiated in the style guide

Acceptance:
- Theme renders at `/` with brand colors visible
- Light/dark toggle works without flash
- Style guide page accessible via `?guide=1`
- Build size under 200KB JS, under 50KB CSS gzipped
- Lighthouse a11y score >= 95

### M3 — Content & IA (target +1 week)

Goal: every section from `oauth-mux/docs/spec/product-adoption-sprint-2026-04-28.md`
authored. All content backed by file_path:line citations. Real CLI/JSON
embedded.

Deliverables:
- `src/routes/+page.svelte` rendering all 9 sections
- `src/lib/content/providers.json` (generated from oauth-mux)
- `src/lib/content/providers.schema.ts` (Effect Schema validation)
- `src/lib/content/cli-examples.ts` (the verbatim install / first-run
  snippets)
- `src/lib/content/probe-json/` (3-4 redacted JSON files for hero examples)
- `src/lib/components/Hero.svelte`, `ProblemStatement.svelte`,
  `FallbackAlgebra.svelte`, `InstallSurface.svelte`, `FirstRunFlows.svelte`,
  `SecurityPosture.svelte`, `ProviderMatrix.svelte`, `Contribute.svelte`,
  `Contact.svelte`
- `src/lib/components/CodeBlock.svelte` wrapper around build-time Shiki
  output (single Tailwind shell, accepts `{@html}` content)
- `scripts/regen-providers.mts` to refresh `providers.json` from
  `../oauth-mux/`
- Sitemap + robots: `src/routes/sitemap.xml/+server.ts`, `static/robots.txt`
- SEO: JSON-LD in `<svelte:head>` per route; OpenGraph meta; Twitter Card

Acceptance:
- Content lighthouse score >= 95 for performance, accessibility, best
  practices, SEO
- All claims fact-checkable against oauth-mux file_path:line citations
- "What not to claim" guardrails honored (verified by content review)
- Provider matrix accurately reflects current oauth-mux state

### M4 — First-Viewport Launch (target +3 days)

Goal: `https://site.scaffold` is live. Repo is public. README links to it.
Soft-launch posts ready (not yet distributed).

Deliverables:
- DNS CNAME record in Cloudflare
- Pages custom domain configured for `site.scaffold`; `static/CNAME` may be
  present as a single-line artifact but is not the source of truth
- Pages source set to `actions` via `gh api`
- Custom domain set to `site.scaffold` via `gh api`
- HTTPS enforce after TLS provisions
- Repo flipped to public visibility
- `README.md` rewritten (replace 14-byte placeholder with real project
  description, link to live site)
- `oauth-mux/README.md` updated with link to `https://site.scaffold` (PR
  against `Jesssullivan/oauth-mux`)
- Soft-launch post drafts in `docs/launch/` (GitHub release notes, npm
  package README, Tinyland blog post, MCP/agent-tooling community posts)
- Live QA pass: every link works, no 404s, mobile renders, dark mode toggles

Acceptance:
- `curl -sI https://site.scaffold/` returns 200 with `server: GitHub.com`
- TLS cert state is `approved`, `https_enforced: true`
- Lighthouse all green on the live URL
- No browser console errors
- Build pipeline triggers on push to main and deploys within 5 min

### M5 — Dynamic-Ready Scaffolding (target +2 weeks)

Goal: omux is ready to grow into dynamic SaaS surfaces without rewriting the
M0-M4 foundation. Daemon-status surface stub gated behind TIN-738 RFC. Agent
discovery snippet API. Provider matrix data API.

Deliverables:
- `src/routes/api/providers/+server.ts` (returns provider matrix as JSON;
  same data as `providers.json`)
- `src/routes/agent-snippet/+page.svelte` (the "copy this into your AI
  assistant" snippet from planning doc `:153-154`)
- `src/lib/content/launch-snippets.ts` (programmatic versions of M4's
  `docs/launch/` posts for embedding in pages)
- Optional: `src/routes/changelog/+page.svelte` (pulls from oauth-mux GitHub
  releases at build time)
- Documented escape hatch: if SSR / form-actions / endpoints become
  necessary, swap `adapter-static` → `adapter-vercel` (or `adapter-node`) in
  `svelte.config.js` is a one-line change
- Observability shape: schema for analytics events (omux is privacy-respecting
  so default to none-shipped at M0; document the schema only)

Acceptance:
- All M0-M4 acceptance still passes
- New API endpoints return valid JSON
- Documentation of "how to grow this site" lives in `AGENTS.md`

## SLA And Cadence

Linear-driven, no cycles (Tinyland convention). SLA bands per priority:

- P1 (Urgent): SLA breaches in 2 days. Reserve for production-blocking
  copy errors after launch.
- **P2 (High): SLA breaches in 7 days. Default for M0-M4 execution issues.**
- P3 (Medium): No SLA, set explicit `dueDate` aligned to milestone target.
  Use for M5 scaffolding and provider-matrix expansion.
- P4 (Low): No SLA, no dueDate. Backlog/RFC items only.

`dueDate` set on each milestone-anchor issue. Milestone `targetDate` per
milestone.

Weekly cadence: ship one milestone per week. Friday is the sync/review day;
Monday-Thursday is execution. M0 is exception (3 days).

## Linear And GitHub Project Structure

- **Project name**: `oauth-mux Website Launch (site.scaffold)`
- **Team**: `Tinyland`
- **Initiative**: attach to `Presence And Narrative` (id
  `251d60af-fa62-454f-9b7c-9bf0da733b70`, status `Planned`). This is
  closest-fit umbrella per round 1 (summary "Unify profile, blog, and public
  narrative surfaces"). omux's launch becomes the first concrete project
  under this initiative.
- **Lead**: Jess Sullivan
- **Status**: In Progress (start 2026-04-29)
- **`startDate`**: 2026-04-29 (month resolution)
- **`targetDate`**: 2026-06-05 (month resolution)
- **Description**: trailing line `Planning doc: docs/spec/omux-website-bootstrap-2026-04-29.md`

Milestones (in order):
- M0 — Repo & Toolchain Bootstrap (target 2026-05-02)
- M1 — Toolchain Hardening & CI (target 2026-05-09)
- M2 — Design System & Theme (target 2026-05-16)
- M3 — Content & IA (target 2026-05-23)
- M4 — First-Viewport Launch (target 2026-05-26)
- M5 — Dynamic-Ready Scaffolding (target 2026-06-05)

Default labels per ticket: `foss`, `docs`. Per-milestone additions:
- M0/M1: + `release`
- M2: (no extra)
- M3: + `content`, `blog`
- M4: + `release`, `content`
- M5: + `agent` on agent-discovery tickets, `security` on daemon-stub tickets

TIN-734 ("Publish oauth-mux website and launch narrative") is in flight and
currently In Progress — keep it as the umbrella issue, link to the new
project, and add it as the milestone-anchor issue for M4 (content lands at M3,
go-live lands at M4).

GitHub Project v2:

- **Name**: `site.scaffold Launch`
- **Owner**: `tinyland-inc`
- **Purpose**: public-facing contributor/project board after the repo is public.
  Linear remains the authoritative execution tracker.
- **Fields**:
  - Linear ID
  - Milestone (`M-1`, `M0`, `M1`, `M2`, `M3`, `M4`, `M5`)
  - SLA band (`P1`, `P2`, `P3`, `P4`)
  - Launch lane (`toolchain`, `design`, `content`, `deploy`, `outreach`,
    `governance`)
  - Provider surface (`codex`, `schema`, `site`, `none`)
- **Initial columns/statuses**: Backlog, Ready, In Progress, Review, Blocked,
  Done.

GitHub issues should mirror public/contributor-visible work only. Internal
SOPS, DNS credentials, runner outages, and private release infrastructure stay
in Linear.

Estimated ticket count: ~18-24 tickets across M0-M5. Use fine-grained tickets
for M0, M2, and M4 because they carry the highest integration risk; use coarser
milestone tickets for M1, M3, and M5. Create both the Linear project structure
and a GitHub Project/issue surface before implementation, but keep Linear as the
execution source of truth.

## CI And Quality Gates

`just check` (the local-pre-commit gate) chain:
- `pnpm exec svelte-kit sync && pnpm exec svelte-check --tsconfig
  ./tsconfig.json` (typecheck)
- `pnpm exec eslint .` (lint)
- `pnpm exec prettier --check .` (format)
- `pnpm exec vitest run` (unit tests)

`just ci` (full local CI parity):
- `just check`
- `pnpm run build`
- `pnpm exec playwright test`

GitHub Actions CI gates (must pass before merge to `main`):
- All `just check` steps
- `pnpm run build`
- Playwright e2e (Chromium only at M0; add Firefox + WebKit at M1)
- gitleaks secrets scan
- `bazel mod graph` registry-resolution proof
- ci-template compatibility note: if self-hosted runners are used later, prefer
  explicit runner/workspace policy from `ci-templates` rather than inheriting
  incidental runner state

Optional gates (advisory at M0, blocking at M3+):
- Lighthouse CI (perf, a11y, best-practices, SEO all >= 0.9)
- Bundle size budget (JS <= 200KB gzipped, CSS <= 50KB gzipped)

## Open Questions

1. **`tummycrypt_tinyland_color_utils` registry version**: pin once latest
   published version and npm import path are confirmed. If not confirmed before
   M0, choose another low-risk catalog module or explicitly record the registry
   blocker.
2. **Custom logo / icon**: not in `oauth-mux/`. Commission separately or
   ship M4 with wordmark only? Default: wordmark only at M4, commission
   later.
3. **Multiple themes (light/dark/system)** vs single Warm/Pragmatic theme
   only: round 3 explorer 5 asked. Default: single `omux` theme with
   light/dark mode toggle (handled by data-mode attribute, not separate
   theme), no theme-picker UI.
4. **`oauth-mux.xoxd.ai` redirect**: default is a Cloudflare Redirect Rule to
   `https://site.scaffold` after the canonical Pages domain is healthy.
5. **Skeleton v5 → GA upgrade path**: post-launch watch ticket only. Do not
   spend launch-path complexity on v5 until the house QA project proves it.
6. **Provider matrix regen cadence**: manual via `just regen-providers`?
   Daily via `rebuild-on-release.yml`-style workflow? Default: manual at M0,
   evaluate cron at M5.
7. **Agent-snippet structure**: a single Markdown block users paste into
   their AI assistant, vs an OpenAPI spec, vs an MCP server? Default:
   Markdown at M5, evaluate MCP server at M5+.

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Skeleton 4 + Tailwind 4 compatibility shim drifts from upstream | Medium | Medium | Copy working `jesssullivan.github.io-vite8` shim, keep it small, add style-guide smoke |
| TLS cert provisioning stuck >24h | Low | High | Pre-flight DNS verification, escalate via GH support, fall back to remove+re-add via `gh api` |
| Cloudflare proxy accidentally enabled | Medium | High | Document gray-cloud requirement, add CI check, post-launch monitor |
| `tummycrypt_*` registry source archives become private | Low | Medium | Public-readable assumption today; add credential helper if any go private |
| Vite 8 native build regression on next minor | Medium | Low | Caret pin allows patch fixes; smoke-test on next minor before bumping |
| Effect 3 → 4 migration when v4 GAs | Low (deferred) | Low | Stay on 3.21 until MassageIthaca migrates, ride the wave |
| Bazel registry chain unreachable from CI | Low | Low | `bazel mod graph` is the smoke; add fallback message |
| oauth-mux source repo schema changes break `regen-providers` | Medium | Low | Validate against schema in `+page.server.ts` `load`, fail loud |
| pnpm 10 → 11 mid-flight | Low | Low | Pin exact `packageManager`, evaluate before bumping |
| GitHub Pages outage during launch | Low | High | Status page monitoring, fallback to Cloudflare Pages if extended |

## Sources To Keep Current

- This spec: `docs/spec/omux-website-bootstrap-2026-04-29.md` (revise in
  place; new dated spec only when the topic changes)
- Linear: `TIN-734` umbrella + new project `oauth-mux Website Launch
  (site.scaffold)` + M0-M5 milestones
- GitHub: `tinyland-inc/site.scaffold` (this repo) + `Jesssullivan/oauth-mux`
  (canonical source)
- Skeleton release feed: https://github.com/skeletonlabs/skeleton/releases
- Skeleton v5 watch only: https://github.com/skeletonlabs/skeleton/milestone/7
- Vite migration: https://vite.dev/guide/migration.html
- Vite-plugin-svelte v7: https://github.com/sveltejs/vite-plugin-svelte/releases
- GitHub Pages docs: https://docs.github.com/en/pages
- Tinyland Bazel registry: https://github.com/tinyland-inc/bazel-registry
- CI templates: /Users/jess/git/ci-templates
- elders.tinyland.dev (canonical Bazel consumer reference): /Users/jess/git/elders.tinyland.dev
- pkgs.tinyland.dev (canonical Pages-deploy reference, in-flight):
  /Users/jess/git/pkgs.tinyland.dev
- jesssullivan.github.io (canonical FOSS-Pages reference): /Users/jess/git/jesssullivan.github.io
- jesssullivan.github.io-vite8 (Vite 8 + Skeleton 4 compatibility reference):
  /Users/jess/git/jesssullivan.github.io-vite8
- MassageIthaca (Nix/just/Effect/Svelte production reference):
  /Users/jess/git/MassageIthaca
- oauth-mux planning docs: `oauth-mux/docs/spec/*.md`
