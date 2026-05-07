import { Schema } from 'effect';

/**
 * Tier list for the oauth-mux provider matrix.
 *
 * - `live-proven` — exercised end-to-end against a real account (today: Codex only).
 * - `schema-modeled` — typed and modeled in oauth-mux but not yet live-QA'd.
 * - `planned` — declared in the admission matrix, not yet modeled.
 */
export const ProviderStatus = Schema.Literal('live-proven', 'schema-modeled', 'planned');

export const ProviderFlow = Schema.Literal('oauth2', 'oidc', 'device-code', 'pkce');

export const Provider = Schema.Struct({
	slug: Schema.String,
	name: Schema.String,
	status: ProviderStatus,
	flow: ProviderFlow,
	scopes: Schema.optional(Schema.Array(Schema.String)),
	docsUrl: Schema.optional(Schema.String),
	notes: Schema.optional(Schema.String),
	/**
	 * Admission classification per
	 * `oauth-mux/docs/spec/provider-probe-admission-matrix-2026-04-26.md:14-22`
	 * (`admitted_http`, `admitted_command`, `mcp_profile`, `unadmitted`).
	 */
	admission: Schema.optional(Schema.String),
	/**
	 * Concrete probe shape (CLI or HTTP) suitable for rendering in the
	 * provider matrix table. Lifted verbatim from the admission matrix.
	 */
	probeShape: Schema.optional(Schema.String),
	/**
	 * Citation for fact-checkability — typically `oauth-mux/<path>:<line>`.
	 */
	citation: Schema.optional(Schema.String),
});

export const ProviderMatrix = Schema.Struct({
	generatedAt: Schema.String,
	providers: Schema.Array(Provider),
});

export type ProviderStatus = typeof ProviderStatus.Type;
export type ProviderFlow = typeof ProviderFlow.Type;
export type Provider = typeof Provider.Type;
export type ProviderMatrix = typeof ProviderMatrix.Type;
