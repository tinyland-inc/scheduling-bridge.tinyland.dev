// M3.1 + M3.2 prerender load — pre-highlights all code blocks at build time.
// See docs/spec/omux-website-bootstrap-2026-04-29.md § Information Architecture
// for the constraint that no Shiki runtime ships to the client.
import type { PageServerLoad } from './$types';
import { highlight } from '$lib/content/highlight';
import {
	INSTALL_AND_PROBE,
	ZIG_LIVENESS_BLOCK,
	ZIG_DEAD_DEGRADED,
	ZIG_MUX_DECISION,
	INSTALL_NPM,
	INSTALL_TARBALLS,
	INSTALL_BREW,
	INSTALL_DEB_RPM,
	INSTALL_CURL,
	INSTALL_CURL_OVERRIDE,
	STAY_AFLOAT_PROOF,
	ENROLLMENT_HANDOFF,
	REAUTH_HANDOFF,
	VIDEO_DEMO_SCRIPT,
	CODEX_HAPPY_PATH,
	GENERIC_AUTHOR_VALIDATE,
	AGENT_DISCOVERY,
} from '$lib/content/cli-examples';

export const prerender = true;

// ProviderMatrix removed from the home page in 7C — see /api/providers for the
// canonical machine-readable matrix (still validated at that route).

export const load: PageServerLoad = async () => {
	const [
		installHtml,
		livenessHtml,
		deadDegradedHtml,
		muxDecisionHtml,
		npmHtml,
		tarballsHtml,
		brewHtml,
		debRpmHtml,
		curlHtml,
		curlOverrideHtml,
		stayAfloatProofHtml,
		enrollmentHandoffHtml,
		reauthHandoffHtml,
		videoDemoHtml,
		codexHappyHtml,
		genericValidateHtml,
		agentDiscoveryHtml,
	] = await Promise.all([
		highlight(INSTALL_AND_PROBE, 'bash'),
		highlight(ZIG_LIVENESS_BLOCK, 'zig'),
		highlight(ZIG_DEAD_DEGRADED, 'zig'),
		highlight(ZIG_MUX_DECISION, 'zig'),
		highlight(INSTALL_NPM, 'bash'),
		highlight(INSTALL_TARBALLS, 'bash'),
		highlight(INSTALL_BREW, 'bash'),
		highlight(INSTALL_DEB_RPM, 'bash'),
		highlight(INSTALL_CURL, 'bash'),
		highlight(INSTALL_CURL_OVERRIDE, 'bash'),
		highlight(STAY_AFLOAT_PROOF, 'bash'),
		highlight(ENROLLMENT_HANDOFF, 'bash'),
		highlight(REAUTH_HANDOFF, 'bash'),
		highlight(VIDEO_DEMO_SCRIPT, 'bash'),
		highlight(CODEX_HAPPY_PATH, 'bash'),
		highlight(GENERIC_AUTHOR_VALIDATE, 'bash'),
		highlight(AGENT_DISCOVERY, 'bash'),
	]);
	return {
		installHtml,
		livenessHtml,
		deadDegradedHtml,
		muxDecisionHtml,
		npmHtml,
		tarballsHtml,
		brewHtml,
		debRpmHtml,
		curlHtml,
		curlOverrideHtml,
		stayAfloatProofHtml,
		enrollmentHandoffHtml,
		reauthHandoffHtml,
		videoDemoHtml,
		codexHappyHtml,
		genericValidateHtml,
		agentDiscoveryHtml,
	};
};
