<script lang="ts">
	import StatusWrapper from '../../skeleton/status-wrapper.svelte';
	import { selectedDaysStore, selectedDestination } from '$lib/public/store';
	import { parseDate } from '$lib/public/utils';
	import { getNDummyFares, getRandomUUID } from '$lib/components/directus/utils';
	import CalendarAccordion from './calendar-accordion.svelte';
	import CalendarTabs from './calendar-tabs.svelte';

	export let section: string;
	export let months: App.LowestFareByMonthAndDestination;
	export let calendar: App.FaresByDateOfDestination;
	export let module: Directus.FareModule;

	const labels: Record<string, string> = module?.translations[0]
		? module?.translations[0]?.labels.reduce((acc, lbl) => ({ ...acc, [lbl.name]: lbl.value }), {})
		: {};

	const mapMonths =
		(destination: string, days: number) =>
		(name: string): App.MonthCardData => ({
			monthYear: name,
			fare: months[destination][days][name],
			count: Object.keys(calendar[destination][days][name]).length
		});

	const mapSkeletonMonths = (fare: Directus.Fare): App.MonthCardData => ({
		monthYear: getRandomUUID(),
		fare: fare,
		count: 0
	});

	let selectedMonth: string | undefined;

	$: innerWidth = 0;

	$: accordionThreshold = innerWidth < 1180;

	$: destination = $selectedDestination?.iata_code;

	$: days = $selectedDaysStore[section];

	$: monthsSkeleton = !module.translations[0] || !months || !destination || !days;

	$: calendarSkeleton =
		!module.translations[0] || !calendar || !destination || !days || !selectedMonth;

	$: filteredMonths =
		destination && days
			? Object.keys(months[destination][days])
					.map(mapMonths(destination, days))
					.sort(
						(a, b) =>
							parseDate(a.fare.departure).getMilliseconds() -
							parseDate(b.fare.departure).getMilliseconds()
					)
			: getNDummyFares(6).map(mapSkeletonMonths);
</script>

<svelte:window bind:innerWidth />

{#if monthsSkeleton}
	<StatusWrapper
		name={module.name}
		{labels}
		translations={!module.translations[0]}
		fares={!months}
		destination={!destination}
		days={!days}
		theme="dark"
	></StatusWrapper>
{/if}

{#if accordionThreshold}
	<CalendarAccordion
		{calendar}
		months={filteredMonths}
		{labels}
		skeleton={monthsSkeleton}
		selectedDestination={destination}
		selectedDays={days}
	></CalendarAccordion>
{:else}
	<CalendarTabs
		{calendar}
		months={filteredMonths}
		{labels}
		skeleton={monthsSkeleton}
		{calendarSkeleton}
		selectedDestination={destination}
		selectedDays={days}
		bind:selectedMonth
	></CalendarTabs>
{/if}

{#if calendarSkeleton}
	<StatusWrapper
		name={module.name}
		{labels}
		translations={!module.translations[0]}
		fares={!months}
		destination={!destination}
		days={!days}
		month={!selectedMonth}
		theme="dark"
	></StatusWrapper>
{/if}
