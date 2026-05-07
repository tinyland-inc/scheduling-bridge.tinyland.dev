# site.scaffold

Canonical Tinyland house scaffold for **static SvelteKit brand sites**.

Every brand / project / sub-business site under `tinyland-inc` should be created
from this template (`gh repo create --template tinyland-inc/site.scaffold`) so
DX, AX, CI, theming, federation, and Bazel integration stay homogenous across
the enterprise.

## Stack

- **Just** — sole authoritative DX/AX entrypoint (`Justfile`)
- **Nix flake + direnv** — reproducible dev shell (`flake.nix`, `.envrc`)
- **Bazel 8 + Bzlmod** — RBE-first via `tinyland-inc/bazel-registry`, GloriousFlywheel cache
- **SvelteKit + adapter-static** — static-only, prerendered
- **Skeleton 4.15.2** — pinned exact, Tailwind v4 with v4-compat shim
- **Tummycrypt vite plugins** — `vite-plugin-a11y`, `vite-plugin-skeleton-colors`, `tinyvectors`, `tinyland-color-utils`
- **CI** — gitleaks secrets-scan, build-and-test, bazel-graph (all run inside `nix develop`)

## After creating from template

```bash
cd <new-repo>
direnv allow
scripts/rebrand.sh <site.example.com>   # rewrites name strings
just setup
just check
just build
```

## Federation (planned)

Sister sites consume the `tinyland.dev` ActivityPub `PublicPulseSnapshot`
contract (see `Jesssullivan.github.io/packages/pulse-core`). The `pulse-ingest`
workflow (TODO) will pull signed snapshots into `static/pulse/` for static
rendering — no runtime database, no auth tokens at the edge.

## Conventions

- Repo name = domain with dots preserved (e.g. `tinyland-inc/phasi.space`)
- Default branch: `main`
- Visibility: public unless explicitly internal
- Issues / projects: tracked in Linear team `Tinyland`, GH issues mirror
- Operator/agent contract: `AGENTS.md`
