<script lang="ts">
	import { itemIsNewNavigation, itemIsNewTextContent } from '$lib/components/directus/utils';
	import MainNav from './main-nav.svelte';
	import BentoBox from './bento-box.svelte';

	export let section: string;
	export let content: SectionContent[];
</script>

<div
	id={section}
	class="bg-backgound-lightblue gap-4 grid grid-cols-4 grid-rows-[88px_repeat(4,_minmax(0,_1fr))] lg:grid-rows-[104px_repeat(4,_minmax(0,_1fr))] h-svh hero-grid min-h-max p-4 relative"
>
	{#each content as part, index (index)}
		{@const { component_name, item, theme } = part}
		{#if component_name === 'main-title' && itemIsNewTextContent(item)}
			<BentoBox
				content={item}
				headingType="h1"
				class="col-start-1 col-span-4 row-start-2 row-span-2 justify-center"
			></BentoBox>
		{:else if component_name === 'fechas' && itemIsNewTextContent(item)}
			<BentoBox
				content={item}
				headingType="h3"
				class="col-start-1 group row-start-4 row-span-2 justify-end"
			></BentoBox>
		{:else if component_name === 'presupuesto' && itemIsNewTextContent(item)}
			<BentoBox
				content={item}
				headingType="h3"
				class="col-start-2 group col-span-2 row-start-4 justify-end"
			></BentoBox>
		{:else if component_name === 'histograma' && itemIsNewTextContent(item)}
			<BentoBox content={item} headingType="h3" class="col-start-2 group row-start-5 justify-end"
			></BentoBox>
		{:else if component_name === 'interes' && itemIsNewTextContent(item)}
			<BentoBox
				content={item}
				headingType="h3"
				class="col-start-4 group row-start-4 row-span-2 justify-end"
			></BentoBox>
		{:else if component_name === 'consejos' && itemIsNewTextContent(item)}
			<BentoBox content={item} headingType="h3" class="col-start-3 group row-start-5 justify-end"
			></BentoBox>
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
</style>
