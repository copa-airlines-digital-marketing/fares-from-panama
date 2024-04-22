<script lang="ts">
	import ButtonLink from '$lib/components/copa/buttons/Button-Link.svelte';
	import Heading from '$lib/components/copa/typography/heading.svelte';
	import { joinClasses } from '$lib/public/utils';

	export let title: string;
	export let description: string;
	export let call_to_actions: Directus.TextContentCallToAction[];
	export let theme: Directus.Theme;

	const titleTheme: Record<Directus.Theme, string> = {
		light: 'text-primary',
		dark: 'text-common-white'
	};

	const descriptionTheme: Record<Directus.Theme, string> = {
		light: 'text-grey-600',
		dark: 'text-common-white'
	};
</script>

{#if title}
	<Heading
		type="h2"
		style={joinClasses(titleTheme[theme], 'text-center max-w-prose mx-auto caret-transparent')}
	>
		{title}
	</Heading>
{/if}
{#if description}
	<div
		class={joinClasses(
			descriptionTheme[theme],
			'wysiwyg my-8 text-center max-w-prose mx-auto caret-transparent'
		)}
	>
		{@html description}
	</div>
{/if}
{#if call_to_actions}
	<ul class="grid justify-center gap-16 md:gap-24 caret-transparent">
		{#each call_to_actions as cta}
			<li>
				<ButtonLink link={cta.link} style="rounded-solid-primary" target={cta.open_in}>
					{cta.text}
				</ButtonLink>
			</li>
		{/each}
	</ul>
{/if}
