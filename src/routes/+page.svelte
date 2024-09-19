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
	import {
		setLowestFaresContext,
		setInterestLowestContext,
		setInterestsFaresContext
	} from '$lib/public/modules/context.js';
	import { isEmpty } from 'ramda';

	export let data;

	const site = data.content;
	const titleTag = getTitleTagFromPage(site);
	const description = getMetaDescriptionFromPage(site);
	const storefrontSection = getSectionsFromPage(site);

	const { all: destinationStore } = setDestinationState({}, undefined);
	const { days } = setDaysContext({ days: [], selectedDays: {} });
	const lowestsFare = setLowestFaresContext();
	const interestLowest = setInterestLowestContext();
	const interestFares = setInterestsFaresContext();
	const fareModules = setFareModulesContext();

	onMount(async () => {
		requestData('days', {}).then((value) => (!isEmpty(value) ? days.set(value[0]) : {}));

		requestData('destinations', {}).then((value) => {
			if (isEmpty(value)) return {};

			const data = value[0];

			destinationStore.set(data.destinations);
			lowestsFare.set(data.lowests);
			interestFares.set(data.lowestByDayCategoryAndDestination);
			interestLowest.set(data.lowestByDayAndCategory);
		});

		requestData('histogramMonth', {}).then((value) => {
			if (!value || !Array.isArray(value) || isEmpty(value)) return;

			fareModules.set({ ...$fareModules, ...value[0] });
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
