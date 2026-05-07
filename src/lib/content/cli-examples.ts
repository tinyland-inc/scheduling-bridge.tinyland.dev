// M3.1 + M3.2 — verbatim content lifted from oauth-mux source.
// Citations:
// - INSTALL_AND_PROBE: oauth-mux/docs/adoption.md:31-49 + docs/onboarding.md:214-270
// - ZIG_LIVENESS_BLOCK: oauth-mux/src/types.zig:152-215
// - ZIG_DEAD_DEGRADED: oauth-mux/src/types.zig:224-240
// - ZIG_MUX_DECISION: oauth-mux/src/types.zig:245-261
// - INSTALL_NPM, INSTALL_TARBALLS, INSTALL_BREW, INSTALL_DEB_RPM,
//   INSTALL_CURL, INSTALL_CURL_OVERRIDE: oauth-mux/docs/adoption.md:9-15 +
//   product-adoption-sprint-2026-04-28.md:111-114
// - STAY_AFLOAT_PROOF, ENROLLMENT_HANDOFF, REAUTH_HANDOFF, VIDEO_DEMO_SCRIPT:
//   oauth-mux/docs/onboarding.md:51-69, 214-270, 373-458
// - CODEX_HAPPY_PATH: oauth-mux/docs/onboarding.md + docs/live-provider-qa.md
// - GENERIC_AUTHOR_VALIDATE: oauth-mux/docs/onboarding.md:158-163
// - AGENT_DISCOVERY: oauth-mux/docs/onboarding.md:107-114

export const INSTALL_AND_PROBE = `npm install -g oauth-mux
oauth-mux init --codex-max
oauth-mux accounts list --provider codex --json
oauth-mux stay-afloat --once --profile codex-max --capability codex-max --json`;

export const STAY_AFLOAT_PROOF = `oauth-mux doctor runtime --profile codex-max --capability codex-max --json
oauth-mux route explain --profile codex-max --capability codex-max --json
oauth-mux route select --profile codex-max --capability codex-max --json
oauth-mux codex broker-session-plan --profile codex-max --capability codex-max --json
oauth-mux stay-afloat --once --profile codex-max --capability codex-max --json`;

export const ENROLLMENT_HANDOFF = `oauth-mux accounts list --provider codex --json
oauth-mux enroll plan codex --account max-4 --json
oauth-mux enroll codex --account max-4 --confirm-enroll --json
oauth-mux codex login-device max-4
oauth-mux stay-afloat refresh --profile codex-max --capability codex-max --json`;

export const REAUTH_HANDOFF = `oauth-mux stay-afloat --once --execute --profile codex-max --capability codex-max --json
oauth-mux stay-afloat handoffs --json
# run the redacted upstream login command shown in the handoff
oauth-mux codex login-device max-1
oauth-mux stay-afloat refresh --profile codex-max --capability codex-max --json`;

export const VIDEO_DEMO_SCRIPT = `# record this after demo accounts are enrolled
oauth-mux accounts list --provider codex --json
oauth-mux route explain --profile codex-max --capability codex-max --json
oauth-mux codex broker-session-plan --profile codex-max --capability codex-max --json
oauth-mux codex broker-run --profile codex-max --capability codex-max \\
  --prompt "Reply exactly: SCAFFOLD_STAY_AFLOAT" --confirm-spend --json`;

export const ZIG_LIVENESS_BLOCK = `// ── Credential Liveness ──
//
// Three distinct layers that the mux pipeline must reason about:
//
// 1. Authentication: Can the token prove identity to the provider?
//    (not expired, not revoked, parseable)
//
// 2. Operability: Is the account in a state where it can serve requests?
//    (not suspended, subscription active, tier sufficient)
//
// 3. Availability: Does the account have capacity right now?
//    (not rate-limited, quota not exhausted, not in cooldown)
//
// The mux response differs for each:
//   Auth failed    → mark dead, never retry automatically
//   Inoperable     → mark degraded, retry after long interval (hours)
//   Rate limited   → cooldown timer, retry same account after seconds
//   Quota exhausted → switch account, retry after window reset (hours/days)
//   Provider down  → switch provider entirely, not just account

pub const CredentialLiveness = union(enum) {
    live: LiveCredential,
    degraded: DegradedCredential,
    dead: DeadCredential,

    pub const LiveCredential = struct {
        availability: Availability,
    };

    pub const DegradedCredential = struct {
        reason: DegradedReason,
        since: i64,
        retry_at: ?i64 = null,
    };

    pub const DeadCredential = struct {
        reason: DeadReason,
        since: i64,
    };
};

pub const Availability = union(enum) {
    available,
    rate_limited: RateLimitInfo,
    quota_exhausted: QuotaInfo,
    cooldown: CooldownInfo,

    pub const RateLimitInfo = struct {
        retry_after_s: u32,
        limited_at: i64,
        window: RateLimitWindow,
    };

    pub const QuotaInfo = struct {
        window_resets_at: ?i64 = null,
        usage_pct: ?u8 = null,
        exhausted_at: i64,
    };

    pub const CooldownInfo = struct {
        until: i64,
        reason: []const u8,
    };
};`;

export const ZIG_DEAD_DEGRADED = `pub const DegradedReason = enum {
    tier_insufficient,
    subscription_paused,
    provider_degraded,
    scope_insufficient,
    schema_invalid,
    terms_required,
    step_up_required,
    pending_verification,
    unknown_4xx,
};

pub const DeadReason = enum {
    token_revoked,
    account_deleted,
    auth_permanently_failed,
};`;

// Verbatim from upstream Jesssullivan/oauth-mux src/types.zig (the
// MuxDecision enum + its fromHttpStatus switch + isRecoverable helper).
// The switch IS the routing-semantics table — no separate HTML table needed.
export const ZIG_MUX_DECISION = `// ── Mux Decision ──
// What the pipeline should do after probing a credential.

pub const MuxDecision = enum {
    use_this,
    try_next_account,
    try_next_provider,
    wait_and_retry,
    give_up,

    pub fn fromHttpStatus(status: u16) MuxDecision {
        return switch (status) {
            200...299 => .use_this,
            401 => .try_next_account,
            403 => .try_next_account,
            429 => .wait_and_retry,
            500...599 => .try_next_provider,
            else => .try_next_account,
        };
    }

    pub fn isRecoverable(self: MuxDecision) bool {
        return self != .give_up;
    }
};`;

// ─── M3.2 install channel snippets ──────────────────────────────────────────

export const INSTALL_NPM = `npm install -g oauth-mux`;

export const INSTALL_TARBALLS = `# six platform tarballs per release
oauth-mux-x86_64-linux.tar.gz
oauth-mux-aarch64-linux.tar.gz
oauth-mux-x86_64-macos.tar.gz
oauth-mux-aarch64-macos.tar.gz
oauth-mux-x86_64-windows.tar.gz
oauth-mux-aarch64-windows.tar.gz`;

export const INSTALL_BREW = `brew tap jesssullivan/omux https://github.com/Jesssullivan/homebrew-omux.git
brew install jesssullivan/omux/oauth-mux`;

export const INSTALL_DEB_RPM = `# deb/rpm packages for Linux hosts
# release-staged via CI; no public apt/yum repository yet`;

export const INSTALL_CURL = `curl -fsSL https://site.scaffold/install.sh | sh`;

export const INSTALL_CURL_OVERRIDE = `# override the source repository (defaults to Jesssullivan/oauth-mux)
REPO=Jesssullivan/oauth-mux curl -fsSL https://site.scaffold/install.sh | sh`;

// ─── M3.2 Codex paid cohort path ────────────────────────────────────────────
// Sources: oauth-mux/docs/onboarding.md + docs/live-provider-qa.md

export const CODEX_HAPPY_PATH = `oauth-mux init --codex-max
oauth-mux doctor
oauth-mux setup codex
oauth-mux codex canary
oauth-mux codex broker-session-plan --profile codex-max --capability codex-max --json`;

// ─── M3.2 Generic provider author path ──────────────────────────────────────
// Verbatim: oauth-mux/docs/onboarding.md:155-163

export const GENERIC_AUTHOR_VALIDATE = `oauth-mux config validate
oauth-mux doctor --json
oauth-mux report --redacted --json
oauth-mux discover --json`;

// ─── M3.2 Agent discovery path ─────────────────────────────────────────────
// Verbatim: oauth-mux/docs/onboarding.md:107-114

export const AGENT_DISCOVERY = `oauth-mux doctor --json
oauth-mux report --redacted --json
oauth-mux providers list --json
oauth-mux discover --json
oauth-mux status --json
oauth-mux health --json`;

/**
 * Verbatim from oauth-mux/dist/live-qa/20260427T204722Z/discover.json:1
 * (`agent_safe_commands` array).
 */
export const AGENT_SAFE_COMMANDS: readonly string[] = [
	'oauth-mux config validate',
	'oauth-mux status --json',
	'oauth-mux health --json',
	'oauth-mux route explain --profile <profile> --capability <capability> --json',
	'oauth-mux stay-afloat next --profile <profile> --capability <capability> --json',
	'oauth-mux stay-afloat launch --profile <profile> --capability <capability> -- <command>',
	'oauth-mux codex broker-session-plan --profile codex-max --capability codex-max --json',
	'oauth-mux probe --profile <profile> --capability <capability> --json',
	'oauth-mux env --profile <profile> --capability <capability> --shell <shell>',
	'oauth-mux exec --profile <profile> --capability <capability> -- <command>',
];

/**
 * Verbatim from oauth-mux/docs/onboarding.md:132-137 — agent must-not list.
 */
export const AGENT_MUST_NOT: readonly string[] = [
	'read files referenced by `secret.path`;',
	'print token-shaped values;',
	'copy OAuth stores between accounts;',
	'run live probes unless the user explicitly authorized spend.',
];

/**
 * Install channel rows for the InstallSurface component.
 * Status reflects current oauth-mux state per `oauth-mux/docs/adoption.md`
 * and `oauth-mux/docs/spec/homebrew-public-lane-decision-2026-05-01.md`.
 */
export interface InstallChannelRow {
	channel: string;
	status: 'live' | 'staged' | 'pending';
	statusLabel: string;
	description: string;
	citation: string;
}

export const INSTALL_CHANNELS: InstallChannelRow[] = [
	{
		channel: 'npm',
		status: 'live',
		statusLabel: 'live (v0.1.6)',
		description: 'Published from CI release tarballs with npm provenance.',
		citation: 'oauth-mux/build.zig.zon:3 + docs/adoption.md:9-15',
	},
	{
		channel: 'GitHub Release tarballs',
		status: 'live',
		statusLabel: 'live',
		description: 'Six platform tarballs per release; suitable for air-gapped or policy-managed systems.',
		citation: 'oauth-mux/docs/adoption.md:14-15',
	},
	{
		channel: 'Homebrew',
		status: 'live',
		statusLabel: 'live (v0.1.6)',
		description: 'Public Jess-owned tap with strict local install QA and hosted registry dry-run proof.',
		citation: 'oauth-mux/docs/adoption.md:12-20 + docs/spec/homebrew-public-lane-decision-2026-05-01.md:119-123',
	},
	{
		channel: 'deb / rpm',
		status: 'staged',
		statusLabel: 'release-staged',
		description: 'deb/rpm metadata exercised in dry-run; no public apt/yum repository yet.',
		citation: 'oauth-mux/docs/spec/product-adoption-sprint-2026-04-28.md:111-114',
	},
	{
		channel: 'curl installer',
		status: 'staged',
		statusLabel: 'release-staged',
		description:
			'Installer smoke is run from CI; override the source repo with `REPO=Jesssullivan/oauth-mux`. Public hosting pending.',
		citation: 'oauth-mux/docs/adoption.md:13 + product-adoption-sprint-2026-04-28.md:111-114',
	},
];

export interface MuxDecisionRow {
	decision: string;
	httpStatus: string;
	semantics: string;
}

// Source: oauth-mux/src/types.zig:245-261 (MuxDecision enum + fromHttpStatus)
export const MUX_DECISION_ROWS: MuxDecisionRow[] = [
	{
		decision: 'use_this',
		httpStatus: '200–299',
		semantics: 'Probe succeeded; route to this credential.',
	},
	{
		decision: 'try_next_account',
		httpStatus: '401, 403 (and other 4xx fallthrough)',
		semantics: 'This account cannot serve the request; advance to the next account on the route.',
	},
	{
		decision: 'try_next_provider',
		httpStatus: '500–599',
		semantics: 'Upstream provider is degraded; advance to the next provider, not just account.',
	},
	{
		decision: 'wait_and_retry',
		httpStatus: '429',
		semantics: 'Rate-limited; wait the cooldown window and retry the same account.',
	},
	{
		decision: 'give_up',
		httpStatus: '—',
		semantics: 'Terminal: no recoverable path remains (`isRecoverable` returns false).',
	},
];
