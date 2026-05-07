<script lang="ts">
	// M3.2 + TIN-801 phase 4 Install surface.
	// Refactored from a 5-up vertical stack to a Skeleton 4 Tabs surface so
	// readers see one channel at a time and can pivot without scrolling. The
	// channel list, statuses, descriptions, and citations are unchanged.
	//
	// Sources (verbatim where stated):
	// - install channel list: oauth-mux/docs/adoption.md:9-15 (verbatim)
	// - public availability per channel: oauth-mux/docs/spec/product-adoption-sprint-2026-04-28.md:111-114
	// - npm v0.1.6 baseline: oauth-mux/build.zig.zon:3
	// - REPO override note: oauth-mux/docs/adoption.md:100-102 (canonical source repo)
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
	import CodeBlock from './CodeBlock.svelte';
	import { INSTALL_CHANNELS, type InstallChannelRow } from '$lib/content/cli-examples';

	let {
		npmHtml,
		tarballsHtml,
		brewHtml,
		debRpmHtml,
		curlHtml,
		curlOverrideHtml,
	}: {
		npmHtml: string;
		tarballsHtml: string;
		brewHtml: string;
		debRpmHtml: string;
		curlHtml: string;
		curlOverrideHtml: string;
	} = $props();

	const channelHtml: Record<InstallChannelRow['channel'], string> = $derived({
		npm: npmHtml,
		'GitHub Release tarballs': tarballsHtml,
		Homebrew: brewHtml,
		'deb / rpm': debRpmHtml,
		'curl installer': curlHtml,
	});

	function chipClass(status: InstallChannelRow['status']): string {
		switch (status) {
			case 'live':
				return 'chip preset-filled-success-500';
			case 'staged':
				return 'chip preset-filled-warning-500';
			case 'pending':
				return 'chip preset-tonal-surface';
		}
	}

	// Land on the first channel (npm) at first paint.
	let active = $state<string>(INSTALL_CHANNELS[0].channel);
</script>

<section id="install" class="container mx-auto px-6 py-16 lg:py-20">
	<div class="mx-auto max-w-4xl">
		<h2 class="h2 mb-4">Install</h2>
		<p class="mb-8 text-lg text-surface-700-300">
			Each release artifact is derived from the same CI release tree. npm publishes are CI-only; workstation
			<code class="font-mono">npm publish</code>
			is not supported.
		</p>

		<Tabs
			value={active}
			onValueChange={(d) => {
				active = d.value;
			}}
			class="space-y-6"
		>
			<Tabs.List class="flex flex-wrap gap-2 border-b border-surface-300-700">
				{#each INSTALL_CHANNELS as row (row.channel)}
					<Tabs.Trigger
						value={row.channel}
						class="data-[state=active]:border-primary-500 data-[state=active]:text-primary-500 -mb-px border-b-2 border-transparent px-4 py-2 text-sm font-medium text-surface-700-300 hover:text-primary-500"
					>
						{row.channel}
					</Tabs.Trigger>
				{/each}
			</Tabs.List>
			{#each INSTALL_CHANNELS as row (row.channel)}
				<Tabs.Content value={row.channel}>
					<header class="mb-3 flex flex-wrap items-center gap-3">
						<h3 class="h3">{row.channel}</h3>
						<span class={chipClass(row.status)}>{row.statusLabel}</span>
					</header>
					<p class="mb-3 text-surface-700-300">{row.description}</p>
					<CodeBlock html={channelHtml[row.channel]} lang="bash" caption={row.citation} />
				</Tabs.Content>
			{/each}
		</Tabs>

		<div class="mt-12">
			<h4 class="h4 mb-2">curl installer — repo override</h4>
			<p class="mb-2 text-sm text-surface-600-400">
				The canonical public source repo is <code class="font-mono">Jesssullivan/oauth-mux</code>; override the upstream
				by setting <code class="font-mono">REPO=</code> before the curl pipeline.
			</p>
			<CodeBlock html={curlOverrideHtml} lang="bash" />
		</div>
	</div>
</section>
