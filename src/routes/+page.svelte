<script lang="ts">
	import Section from '$lib/components/directus/section.svelte';
	import Header from '$lib/components/site/header.svelte';
	import { destinations } from '$lib/public/store.js';
	import {
		getMetaDescriptionFromPage,
		getSectionsFromPage,
		getTitleTagFromPage
	} from '$lib/public/utils';

	export let data;

	const site = data.content;
	const titleTag = getTitleTagFromPage(site);
	const description = getMetaDescriptionFromPage(site);
	const storefrontSection = getSectionsFromPage(site);

	destinations.set(data.destinations);
</script>

<svelte:head>
	<title>{titleTag}</title>
	<meta name="description" content={description} />
</svelte:head>

<Header additionalClass="absolute z-10"></Header>
{#each storefrontSection as sectioM2M}
	{@const section = sectioM2M.sections_id}
	<Section {section}></Section>
{/each}
