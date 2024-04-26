<script lang="ts">
	import { itemIsNewNavigation } from '$lib/components/directus/utils';
	import MainNav from './main-nav.svelte';
	import BentoBox from './title.svelte';
	import Header from '../header/header.svelte';
	import SectionCard from './section-card.svelte';
	import { isTextContent, textContentReturnSchema } from '$lib/public/utils/text-content';
	import { onMount } from 'svelte';

	export let content: SectionContent[];
	onMount(() => {
		console.log(content[0]);
		textContentReturnSchema.parse(content[1].item);
	});
</script>

<div class="bg-backgound-lightblue container-grid grid hero-grid min-h-svh">
	<Header class="col-start-1 col-full h-min row-start-1"></Header>
	{#each content as part, index (index)}
		{@const { component_name, item } = part}
		{#if component_name === 'main-title' && isTextContent(item)}
			<BentoBox content={item} class="col-start-1 col-full row-start-2 row-span-full"></BentoBox>
		{:else if component_name === 'fechas' && isTextContent(item)}
			<SectionCard content={item} class="col-start-2 group row-start-3 justify-end"></SectionCard>
		{:else if component_name === 'presupuesto' && isTextContent(item)}
			<SectionCard content={item} class="col-start-2 group row-start-4 justify-end"></SectionCard>
		{:else if component_name === 'histograma' && isTextContent(item)}
			<SectionCard content={item} class="col-start-2 group row-start-5 justify-end"></SectionCard>
		{:else if component_name === 'interes' && isTextContent(item)}
			<SectionCard content={item} class="col-start-2 group row-start-6 justify-end"></SectionCard>
		{:else if component_name === 'consejos' && isTextContent(item)}
			<SectionCard content={item} class="col-start-2 group row-start-7 justify-end"></SectionCard>
		{:else if component_name === 'main-nav' && itemIsNewNavigation(item)}
			<div class="fixed group top-16 right-16 md:right-24 z-10 justify-end">
				<MainNav nav={item}></MainNav>
			</div>
		{:else}
			<div>
				⚠️ Unsupported hero component: {component_name}, item: {item instanceof Object
					? item.name
					: item}
			</div>
		{/if}
	{/each}
</div>

<style lang="postcss">
	.hero-grid {
		grid-template-rows: min-content minmax(50vh, 1fr) repeat(5, minmax(0, max-content)) 16px;
	}
</style>
