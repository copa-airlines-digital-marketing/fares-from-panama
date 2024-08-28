<script lang="ts">
	import { getDaysContext } from '$lib/components/days';
	import { getDestinationsContext } from '$lib/components/destination/context';
	import { getFareModulesContext } from '../context';
	import { getContext, setContext } from 'svelte';
	import { SkeliView } from '$lib/components/skeleton';
	import { isNotNil } from 'ramda';
	import HistogramTabs from './histogram-tabs.svelte';
	import HistogramTabsSkeleton from './histogram-tabs-skeleton.svelte';
	import HistogramAccordion from './histogram-accordion.svelte';
	import HistogramAccordionSkeleton from './histogram-accordion-skeleton.svelte';
	import { writable } from 'svelte/store';

	const { all: destinations } = getDestinationsContext();
	const { selected: selectedStay } = getDaysContext();
	const modules = getFareModulesContext();

	const section: string = getContext('section');

	const labels = getContext<Record<string, string>>('moduleLabels');

	$: histogramMonths = $modules.histogramMonths;

	$: innerWidth = undefined;

	$: selectedStayOfSection = $selectedStay[section];

	$: showModule =
		isNotNil($destinations) &&
		isNotNil(selectedStayOfSection) &&
		isNotNil(labels) &&
		isNotNil(histogramMonths);

	setContext('scrollIndicator', writable(0));
</script>

<svelte:window bind:innerWidth />

{#if innerWidth === undefined}
	<SkeliView></SkeliView>
{:else if innerWidth < 1180}
	{#if showModule}
		<HistogramAccordion />
	{:else}
		<HistogramAccordionSkeleton pulse={!showModule} />
	{/if}
{:else if showModule}
	<HistogramTabs></HistogramTabs>
{:else}
	<HistogramTabsSkeleton pulse={!showModule} />
{/if}
