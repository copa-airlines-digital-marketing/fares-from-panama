<script lang="ts">
	import { getDaysContext } from '$lib/components/days';
	import { getDestinationsContext } from '$lib/components/destination/context';
	import { getFareModulesContext } from '../context';
	import { getContext } from 'svelte';
	import { SkeliView } from '$lib/components/skeleton';
	import CalendarMonthsSkeleton from './calendar-months-skeleton.svelte';
	import CalendarGridSkeleton from './calendar-grid-skeleton.svelte';
	import CalendarAccordionModule from './calendar-accordion-module.svelte';
	import { isEmpty } from 'ramda';
	import StatusWrapper from '$lib/components/skeleton/status-wrapper.svelte';
	import CalendarTabModule from './calendar-tab-module.svelte';

	const { selected: selectedDestination } = getDestinationsContext();
	const { selected: selectedStay } = getDaysContext();
	const modules = getFareModulesContext();

	const section: string = getContext('section');

	const labels = getContext<Record<string, string>>('moduleLabels');

	$: calendarMonths = $modules.calendarMonths;

	$: innerWidth = undefined;

	$: selectedStayOfSection = $selectedStay[section];

	$: showModule =
		$selectedDestination &&
		selectedStayOfSection &&
		!isEmpty($modules) &&
		calendarMonths &&
		calendarMonths[$selectedDestination.iata_code] &&
		calendarMonths[$selectedDestination.iata_code][parseInt(selectedStayOfSection)];
</script>

<svelte:window bind:innerWidth />

{#if innerWidth === undefined}
	<SkeliView></SkeliView>
{:else if innerWidth < 1180}
	<!-- Accordion para mobile -->
	{#if showModule}
		<CalendarAccordionModule />
	{:else}
		<div class="relative">
			<CalendarMonthsSkeleton pulse={!showModule} />
		</div>
	{/if}
{:else}
	<!-- Tabs para desktop -->
	{#if showModule}
		<CalendarTabModule />
	{:else}
		<div class="relative">
			<CalendarMonthsSkeleton pulse={!showModule} />
		</div>
	{/if}
	{#if !showModule}
		<div class="relative">
			<CalendarGridSkeleton pulse={!showModule}></CalendarGridSkeleton>
		</div>
	{/if}
{/if}
