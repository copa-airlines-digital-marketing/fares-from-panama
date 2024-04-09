<script lang="ts">
	import CarouselAccordion from './carousel-accordion.svelte';
	import CarouselTabs from './carousel-tabs.svelte';

	export let carousel: Directus.Carrousel;

	const { description, name, slides } = carousel;

	$: innerWidth = 0;

	$: hasMinWidth = innerWidth >= 960;
</script>

<!-- adaptive binding -->
<svelte:window bind:innerWidth />

{#if hasMinWidth}
	<!-- tab version -->
	<CarouselTabs {slides} {name} {description}></CarouselTabs>
{:else}
	<!-- accordion version -->
	<CarouselAccordion {slides} {name} {description}></CarouselAccordion>
{/if}
