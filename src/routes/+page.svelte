<script lang="ts">
	import Section from '$lib/components/directus/section.svelte';
	import { setDestinationState } from '$lib/components/destination/context.js';
	import { processFares } from '$lib/public/process-fares.js';
	import { modulesStore } from '$lib/public/store.js';
	import {
		getMetaDescriptionFromPage,
		getSectionsFromPage,
		getTitleTagFromPage
	} from '$lib/public/utils';
	import { onMount } from 'svelte';
	import { setDaysContext } from '$lib/components/days';
	import {
		getFareModulesContext,
		setFareModulesContext
	} from '$lib/components/fare-modules/context.js';
	import { reject } from 'ramda';

	export let data;

	const site = data.content;
	const titleTag = getTitleTagFromPage(site);
	const description = getMetaDescriptionFromPage(site);
	const storefrontSection = getSectionsFromPage(site);

	const { all: destinationStore } = setDestinationState({});
	const { days } = setDaysContext({ days: [], selectedDays: {} });
	const fareModules = setFareModulesContext();

	onMount(async () => {
		const destinationRequest = await fetch('/api/destinations', { method: 'GET' });
		const destinations = await destinationRequest.json();
		destinationStore.set(destinations.reduce((a, c) => ({ ...a, [c.iata_code]: c }), {}));

		fetch('/api/days', { method: 'GET' }).then(async (data) => {
			days.set(await data.json());
		});

		fetch('/api/fares', { method: 'GET' }).then(async (data) => {
			const fares = await data.json();
			const processPromise = new Promise<App.Modules>((resolve) => {
				const processedFares = processFares($destinationStore, fares);
				resolve(processedFares);
			});
			processPromise
				.then((result) => {
					fareModules.set(result);
				})
				.catch((err) => {});
		});
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
