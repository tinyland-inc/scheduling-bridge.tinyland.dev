#!/usr/bin/env -S node --import tsx
// Regenerate `src/lib/content/providers.json` from the oauth-mux source
// Provider Probe Admission Matrix.
//
// Source of truth (verbatim citations are preserved):
//   ~/git/oauth-mux/docs/spec/provider-probe-admission-matrix-2026-04-26.md:26-39
//
// The matrix table is parsed and merged with a small amount of curated
// metadata (status tier, OAuth flow, docsUrl, notes) that lives in this
// script — the table itself does not encode tier/flow.
//
// Validates with the `ProviderMatrix` Effect Schema (M0.6) so a malformed
// or stale matrix halts regeneration before it reaches the build.
//
// Usage: pnpm exec tsx scripts/regen-providers.mts

import { readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { decodeOrThrow } from '../src/lib/effect/schema.ts';
import { ProviderMatrix, type Provider } from '../src/lib/content/providers.schema.ts';

const HERE = fileURLToPath(new URL('.', import.meta.url));
const REPO_ROOT = resolve(HERE, '..');
const MATRIX_PATH = join(homedir(), 'git/oauth-mux/docs/spec/provider-probe-admission-matrix-2026-04-26.md');
const OUT_PATH = join(REPO_ROOT, 'src/lib/content/providers.json');

type Curated = Pick<Provider, 'slug' | 'status' | 'flow' | 'docsUrl' | 'notes'>;

// Curated companion data per provider — tier + OAuth flow + canonical docs URL
// + notes. The table parser fills in `name`, `admission`, and `probeShape`.
const CURATED: Record<string, Curated> = {
	'Codex / OpenAI subscription': {
		slug: 'codex',
		status: 'live-proven',
		flow: 'oauth2',
		docsUrl: 'https://developers.openai.com/codex/auth',
		notes:
			'Codex is the live-proven provider. Current codex-max cohort: max-1 selected, max-4 spare fallback, max-2/max-3 quota-exhausted; Spark/mini availability is not generalized to Max.',
	},
	'Claude Code subscription': {
		slug: 'claude',
		status: 'schema-modeled',
		flow: 'oauth2',
		docsUrl: 'https://docs.anthropic.com/en/docs/claude-code/getting-started',
		notes: 'Built-in `claude auth status --json` probe; tier/rate/quota await live route probes.',
	},
	'Anthropic API key': {
		slug: 'anthropic-api-key',
		status: 'schema-modeled',
		flow: 'oauth2',
		docsUrl: 'https://docs.anthropic.com/en/api/getting-started',
		notes: 'API key, not subscription equivalent — `GET /v1/models` identity probe only.',
	},
	'MCP HTTP server': {
		slug: 'mcp-http',
		status: 'schema-modeled',
		flow: 'oauth2',
		docsUrl: 'https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization',
		notes: 'Resource-bound bearer tokens; per-server RFC 9728 metadata discovery.',
	},
	'MCP stdio server': {
		slug: 'mcp-stdio',
		status: 'schema-modeled',
		flow: 'oauth2',
		docsUrl: 'https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization',
		notes: 'Env/config injection; OAuth HTTP authorization profile does not apply.',
	},
	GitHub: {
		slug: 'github',
		status: 'schema-modeled',
		flow: 'oauth2',
		docsUrl: 'https://docs.github.com/v3/auth',
		notes: 'Built-in `identity` probe via `GET /user` with bearer token.',
	},
	Linear: {
		slug: 'linear',
		status: 'schema-modeled',
		flow: 'oauth2',
		docsUrl: 'https://linear.app/developers/oauth-2-0-authentication',
		notes: 'GraphQL `viewer` identity probe; semantic success requires checking `errors`.',
	},
	'Figma REST': {
		slug: 'figma-rest',
		status: 'schema-modeled',
		flow: 'oauth2',
		docsUrl: 'https://developers.figma.com/docs/rest-api/authentication/',
		notes: 'OAuth `identity`, PAT `identity-pat`, and plan-token `file-metadata-plan` probes.',
	},
	'Figma Remote MCP': {
		slug: 'figma-remote-mcp',
		status: 'schema-modeled',
		flow: 'oauth2',
		docsUrl: 'https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization',
		notes: 'Treat as MCP HTTP resource, not as Figma REST.',
	},
	Vercel: {
		slug: 'vercel',
		status: 'schema-modeled',
		flow: 'oauth2',
		docsUrl: 'https://vercel.com/docs/sign-in-with-vercel/tokens',
		notes: 'Built-in `identity` probe via `GET /v2/user`.',
	},
	'FlakeHub / Determinate': {
		slug: 'flakehub',
		status: 'schema-modeled',
		flow: 'oauth2',
		docsUrl: 'https://docs.determinate.systems/flakehub/concepts/authentication/',
		notes: '`determinate-nixd status` command-first probe; direct HTTP unadmitted.',
	},
};

interface MatrixRow {
	provider: string;
	admission: string;
	probeShape: string;
}

function parseMatrix(md: string): MatrixRow[] {
	const lines = md.split('\n');
	const rows: MatrixRow[] = [];
	let inTable = false;
	for (const line of lines) {
		if (!inTable && line.startsWith('| Provider |')) {
			inTable = true;
			continue;
		}
		if (!inTable) continue;
		if (line.startsWith('| ---')) continue;
		if (!line.startsWith('|')) {
			if (rows.length > 0) break;
			continue;
		}
		const cells = line
			.split('|')
			.slice(1, -1)
			.map((c) => c.trim());
		if (cells.length < 4) continue;
		rows.push({ provider: cells[0], admission: cells[1], probeShape: cells[2] });
	}
	return rows;
}

const md = readFileSync(MATRIX_PATH, 'utf8');
const matrixRows = parseMatrix(md);
if (matrixRows.length === 0) {
	throw new Error(`No provider rows parsed from ${MATRIX_PATH}`);
}

const providers: Provider[] = matrixRows.map((row) => {
	const curated = CURATED[row.provider];
	if (!curated) {
		throw new Error(`No curated metadata for provider: ${row.provider}`);
	}
	return {
		slug: curated.slug,
		name: row.provider,
		status: curated.status,
		flow: curated.flow,
		docsUrl: curated.docsUrl,
		notes: curated.notes,
		admission: row.admission,
		probeShape: row.probeShape,
		citation: 'oauth-mux/docs/spec/provider-probe-admission-matrix-2026-04-26.md:26-39',
	};
});

const matrix = decodeOrThrow(ProviderMatrix)({
	generatedAt: new Date().toISOString(),
	providers,
});

writeFileSync(OUT_PATH, JSON.stringify(matrix, null, 2) + '\n', 'utf8');
console.log(`wrote ${matrix.providers.length} providers → ${OUT_PATH}`);
