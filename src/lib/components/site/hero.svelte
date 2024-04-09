<script lang="ts">
	import MainTitle from '$lib/components/site/main-title.svelte';
	import {
		itemIsCarrousel,
		itemIsForm,
		itemIsNavigation,
		itemIsTextContent
	} from '$lib/components/directus/utils';
	import Form from '$lib/components/directus/form.svelte';
	import HeroCarousel from './hero-carousel.svelte';
	import HeroNav from './hero-nav.svelte';
	import MainNav from './main-nav.svelte';

	export let section: string;
	export let content: Directus.PageSectionContent[];
</script>

<div
	class="container-grid bg-gradient-to-br from-primary-ultradark from-20% grid-rows-[minmax(300px,50svh)_auto_auto_auto_1fr] h-svh min-h-max to-primary relative"
>
	{#each content as part, index (index)}
		{@const { component_name, item, theme } = part}
		{#if component_name === 'main-title' && itemIsTextContent(item)}
			<div class="col-start-2 row-start-1 self-center relative" id="hero-nav">
				<MainTitle content={item}></MainTitle>
			</div>
		{:else if component_name === 'main-nav' && itemIsNavigation(item)}
			<div class="fixed top-16 right-16 md:right-24 z-10">
				<MainNav nav={item}></MainNav>
			</div>
		{:else if component_name === 'hero-nav' && itemIsNavigation(item)}
			<div class="col-start-2 row-start-5 relative self-end">
				<HeroNav nav={item}></HeroNav>
			</div>
		{:else if component_name === 'destination' && itemIsForm(item)}
			<div class="col-start-2 row-start-2 relative">
				<Form form={item} {component_name} {theme} {section}></Form>
			</div>
		{:else if component_name === 'days' && itemIsForm(item)}
			<div class="col-start-2 row-start-3 relative">
				<Form form={item} {component_name} {theme} {section}></Form>
			</div>
		{:else if component_name === 'buscar' && itemIsForm(item)}
			<div class="col-start-2 row-start-4 justify-self-center relative">
				<Form form={item} {component_name} {theme} {section}></Form>
			</div>
		{:else if component_name === 'hero-carousel' && itemIsCarrousel(item)}
			<div class="col-start-1 col-span-3 row-start-1 row-span-full">
				<HeroCarousel carousel={item}></HeroCarousel>
			</div>
			<div
				class="col-start-1 col-span-3 bg-common-black/45 row-start-1 relative row-span-full w-full"
			></div>
		{:else}
			<div>
				⚠️ Unsupported hero component: {component_name}, item: {item.name}
			</div>
		{/if}
	{/each}
</div>
