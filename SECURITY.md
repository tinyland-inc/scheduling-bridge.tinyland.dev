# Security policy

This repository is the source for the static marketing/devtool site at
<https://site.scaffold>. The site itself is purely static — no server
runtime, no user accounts, no inbound data, no analytics.

## Reporting a vulnerability

Until a public security email is published, please report security
issues against this site via a **private GitHub security advisory** on
this repository:

<https://github.com/tinyland-inc/site.scaffold/security/advisories/new>

For vulnerabilities in the **`oauth-mux` tool itself** (the upstream
Zig project that this site is about), report against the canonical
source repo instead:

<https://github.com/Jesssullivan/oauth-mux/security/advisories/new>

## Scope

In scope for this repository:

- Build / CI supply-chain issues
- Static site content that misrepresents the security posture of
  oauth-mux
- Secrets accidentally committed to history
- Third-party dep vulnerabilities affecting the build pipeline

Out of scope:

- Cosmetic / SEO / accessibility issues — please open a normal issue
- Vulnerabilities in `oauth-mux` itself — see upstream link above
- DDoS / availability — site is on GitHub Pages with no privileged
  routes; standard Pages SLO applies

## What we won't do

- Bug bounties (no programme yet)
- Public discussion of unfixed issues until a coordinated disclosure
  date is agreed
