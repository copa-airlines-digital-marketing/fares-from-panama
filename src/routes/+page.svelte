<script lang="ts">
	import Section from '$lib/components/directus/section.svelte';
	import { processFares } from '$lib/public/process-fares.js';
	import { destinationsStore, modulesStore } from '$lib/public/store.js';
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
		const destinationsRequest = await fetch('/api/destinations', { method: 'GET' });
		const destinations = await destinationsRequest.json();
		console.log(destinations);
		destinationsStore.set(destinations.reduce((a, c) => ({ ...a, [c.iata_code]: c }), {}));

		var fares = await fetch('api/fares', { method: 'GET' });
		var fjson = await fares.json();
		console.log(fjson);
		modulesStore.set(processFares(destinations, fjson));
		console.log($modulesStore);
	});
</script>

<svelte:head>
	<title>{titleTag}</title>
	<meta name="description" content={description} />
</svelte:head>

{#each storefrontSection as sectioM2M}
	{@const section = sectioM2M.sections_id}
	<Section {section}></Section>
{/each}
