<script lang="ts">
	import { itemIsNewNavigation } from '$lib/components/directus/utils';
	import MainNav from './main-nav.svelte';
	import BentoBox from './title.svelte';
	import Header from '../header/header.svelte';
	import SectionCard from './section-card.svelte';
	import { isTextContent } from '$lib/public/utils/text-content';
	import { prop } from 'ramda';

	export let content: SectionContent[];

	let cards = content
		.filter((c) => c.component_name === 'hero-card' && isTextContent(c.item))
		.map(prop('item'));

	let hero = content.filter((c) => c.component_name === 'main-title' && isTextContent(c.item))[0]
		.item;

	let nav = content.filter((c) => c.component_name === 'main-nav' && itemIsNewNavigation(c.item))[0]
		.item;

	let mainNavTitle = content.filter(
		(c) => c.component_name === 'main-menu-title' && isTextContent(c.item)
	)[0].item;
</script>

<div
	class="bg-backgound-lightblue container-grid grid hero-grid md:h-svh md:overflow-hidden"
	id="top"
>
	<Header class="col-start-1 col-full row-start-1 row-span-1"></Header>
	<BentoBox content={hero} class="col-start-1 col-full row-start-2 row-span-full"></BentoBox>
	{#if isTextContent(mainNavTitle)}
		<h3
			class="col-start-2 row-start-3 my-8 text-common-white text-h3 lg:text-h3-lg font-heading font-heading-medium"
		>
			{mainNavTitle.translations[0].title}
		</h3>
	{/if}
	<ul
		class="col-start-2 grid grid-cols-1 grid-rows-5 gap-minimal md:grid-cols-[repeat(4,_minmax(0,1fr))] md:grid-rows-1 md:gap-16 row-start-4"
	>
		{#each cards as card}
			<SectionCard content={card}></SectionCard>
		{/each}
	</ul>
	<div class="fixed group bottom-16 right-16 md:right-24 size-64 z-10 justify-end">
		<MainNav {nav}></MainNav>
	</div>
</div>

<style lang="postcss">
	.hero-grid {
		grid-template-rows: auto 1fr auto auto 32px;
	}
</style>
