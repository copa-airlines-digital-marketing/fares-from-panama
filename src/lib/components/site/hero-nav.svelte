<script lang="ts">
	import { createMenubar, melt } from '@melt-ui/svelte';
	import Icon from './icon.svelte';
	import { onMount } from 'svelte';

	export let nav: Directus.Navigation;

	const { translations } = nav;

	const linksElements: Record<string, HTMLElement> = {};

	const getLinkId = (index: number) => `hero-nav-link-${index}`;

	const {
		elements: { menubar }
	} = createMenubar();

	onMount(() => {
		setTimeout(() => {
			Object.values(linksElements).forEach((element) => {
				element.classList.add('animate-bounce');
			});
		}, 5000);
		setTimeout(() => {
			Object.values(linksElements).forEach((element) => {
				element.classList.remove('animate-bounce');
			});
		}, 8000);
	});
</script>

{#if Array.isArray(translations) && translations.length === 1}
	{@const { links } = translations[0]}
	{@const navTitle = translations[0].title}
	<p
		class="font-heading font-heading-medium mb-8 mt-normal text-14/20 text-common-white text-center"
	>
		{navTitle}
	</p>
	<div class="flex gap-16 justify-center md:gap-24 mb-normal" use:melt={$menubar}>
		{#each links as linkItem, index (index)}
			{@const {
				icon_override: { code },
				links_url: { url },
				title
			} = linkItem}
			<a
				class="flex flex-col focus:text-secondary gap-4 hover:text-secondary items-center outline-none text-common-white transition-colors"
				href={url}
				{title}
			>
				<span bind:this={linksElements[getLinkId(index + 1)]}>
					<Icon data={code} class="size-32 fill-current"></Icon>
				</span>
				<span class="text-12/16 text-common-white">{title}</span>
			</a>
		{/each}
	</div>
{:else}
	<div>⚠️ Navigation translatios are incorrect</div>
{/if}
