<script lang="ts">
	// Page composition. Provider matrix removed in 7C — it was a constraining
	// snapshot that fights against a growing surface; canonical machine-readable
	// list lives at /api/providers, agent-friendly summary at /agent-snippet.
	import Hero from '$lib/components/Hero.svelte';
	import StayAfloatUsage from '$lib/components/StayAfloatUsage.svelte';
	import ProblemStatement from '$lib/components/ProblemStatement.svelte';
	import FallbackAlgebra from '$lib/components/FallbackAlgebra.svelte';
	import InstallSurface from '$lib/components/InstallSurface.svelte';
	import FirstRunFlows from '$lib/components/FirstRunFlows.svelte';
	import SecurityPosture from '$lib/components/SecurityPosture.svelte';
	import Contribute from '$lib/components/Contribute.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>oauth-mux</title>
	<meta name="description" content="Typed OAuth fallback and foreground stay-afloat checks for AI harness accounts." />
</svelte:head>

<main>
	<Hero installHtml={data.installHtml} />
	<StayAfloatUsage
		stayAfloatProofHtml={data.stayAfloatProofHtml}
		enrollmentHandoffHtml={data.enrollmentHandoffHtml}
		reauthHandoffHtml={data.reauthHandoffHtml}
		videoDemoHtml={data.videoDemoHtml}
	/>
	<ProblemStatement />
	<FallbackAlgebra
		livenessHtml={data.livenessHtml}
		deadDegradedHtml={data.deadDegradedHtml}
		muxDecisionHtml={data.muxDecisionHtml}
	/>
	<InstallSurface
		npmHtml={data.npmHtml}
		tarballsHtml={data.tarballsHtml}
		brewHtml={data.brewHtml}
		debRpmHtml={data.debRpmHtml}
		curlHtml={data.curlHtml}
		curlOverrideHtml={data.curlOverrideHtml}
	/>
	<FirstRunFlows
		codexHappyHtml={data.codexHappyHtml}
		genericValidateHtml={data.genericValidateHtml}
		agentDiscoveryHtml={data.agentDiscoveryHtml}
	/>
	<SecurityPosture />
	<Contribute />
	<Contact />
</main>
