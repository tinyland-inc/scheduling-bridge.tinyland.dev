<script lang="ts">
	// M3.3 Contact.
	// Sources (verbatim where stated):
	// - three channels: oauth-mux/docs/spec/product-adoption-sprint-2026-04-28.md:145-148
	// - hedge ("once public security policy exists"):
	//   oauth-mux/docs/spec/product-adoption-sprint-2026-04-28.md:148

	const repoUrl = 'https://github.com/Jesssullivan/oauth-mux';
	const issuesUrl = 'https://github.com/Jesssullivan/oauth-mux/issues';
	const discussionsUrl = 'https://github.com/Jesssullivan/oauth-mux/discussions';
	const newIssueUrl = 'https://github.com/Jesssullivan/oauth-mux/issues/new';
</script>

<section id="contact" class="container mx-auto px-6 py-16 lg:py-20">
	<div class="mx-auto max-w-4xl space-y-8">
		<header>
			<h2 class="h2 mb-4">Contact</h2>
			<p class="text-lg text-surface-700-300">
				Three channels cover the public surface today. There is no public security email yet.
			</p>
		</header>

		<ul class="divide-y divide-surface-200-800 border-y border-surface-200-800">
			<li class="py-4">
				<div class="font-medium">GitHub issues for bugs</div>
				<a class="anchor text-sm" href={issuesUrl} rel="noreferrer noopener" target="_blank">
					{issuesUrl}
				</a>
			</li>
			<li class="py-4">
				<div class="font-medium">GitHub discussions or issue templates for provider requests</div>
				<a class="anchor text-sm" href={discussionsUrl} rel="noreferrer noopener" target="_blank">
					{discussionsUrl}
				</a>
			</li>
			<li class="py-4">
				<div class="font-medium">security contact once public security policy exists</div>
				<p class="mt-1 text-sm text-surface-700-300">
					No public security@ address is published yet. For sensitive reports today, use a
					<a class="anchor" href={newIssueUrl} rel="noreferrer noopener" target="_blank">private GitHub issue</a>
					or wait for the public security policy.
				</p>
			</li>
		</ul>

		<footer class="border-t border-surface-300-700 pt-6 text-sm text-surface-600-400">
			A Jess Sullivan FOSS project built with Tinyland release infrastructure. Source:
			<a class="anchor" href={repoUrl} rel="noreferrer noopener" target="_blank">{repoUrl}</a>.
		</footer>
	</div>
</section>
