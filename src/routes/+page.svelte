<script lang="ts">
	import Section from '$lib/components/directus/section.svelte';
	import Header from '$lib/components/site/header.svelte';
	import { destinationsStore } from '$lib/public/store.js';
	import {
		getMetaDescriptionFromPage,
		getSectionsFromPage,
		getTitleTagFromPage
	} from '$lib/public/utils';
	import { onMount } from 'svelte';

	export let data;

	const site = data.content;
	const titleTag = getTitleTagFromPage(site);
	const description = getMetaDescriptionFromPage(site);
	const storefrontSection = getSectionsFromPage(site);

	onMount(async () => {
		var temp = await fetch('/api/destinations', { method: 'GET' });

		destinationsStore.set(await temp.json());
	});
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
