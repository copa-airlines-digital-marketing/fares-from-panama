<script lang="ts">
	import Section from '$lib/components/directus/section.svelte';
	import { setDestinationState } from '$lib/components/destination/context.js';
	import {
		getMetaDescriptionFromPage,
		getSectionsFromPage,
		getTitleTagFromPage
	} from '$lib/public/utils';
	import { onMount } from 'svelte';
	import { setDaysContext } from '$lib/components/days';
	import { setFareModulesContext } from '$lib/components/fare-modules/context.js';
	import { Survey } from '$lib/components/survey';
	import { requestData } from '$lib/public/utils/request-data.js';
	import { setLowestFaresContext } from '$lib/public/modules/context.js';
	import { isEmpty } from 'ramda';

	export let data;

	const site = data.content;
	const titleTag = getTitleTagFromPage(site);
	const description = getMetaDescriptionFromPage(site);
	const storefrontSection = getSectionsFromPage(site);

	const { all: destinationStore } = setDestinationState({});
	const { days } = setDaysContext({ days: [], selectedDays: {} });
	const lowestsFare = setLowestFaresContext();
	const fareModules = setFareModulesContext();

	const keyToStoreMap = {
		destinations: destinationStore,
		lowests: lowestsFare
	};

	const setDestinations = (key: keyof typeof keyToStoreMap) => (value: unknown) => {
		if (Array.isArray(value) && value.length !== 4) {
			keyToStoreMap[key].set(value[0]);
			return requestData('low', {});
		}

		const [lowests, destinations] = value;
		destinationStore.set(destinations);
		lowestsFare.set(lowests);
	};

	onMount(async () => {
		requestData('days', {}).then((value) => (!isEmpty(value) ? days.set(value[0]) : {}));

		requestData('destinations', {}).then((value) => {
			if (isEmpty(value)) return {};

			const data = value[0];

			console.log(data);

			destinationStore.set(data.destinations);
			lowestsFare.set(data.lowests);
		});

		/* const destinationRequest = await fetch('/api/destinations', { method: 'GET' });
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
				.catch((err) => {
					console.log(err);
				});
		}); */
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

<Survey></Survey>
