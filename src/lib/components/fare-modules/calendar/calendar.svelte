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

	const { calendarMonths } = $modules;

	const labels = getContext<Record<string, string>>('moduleLabels');

	$: innerWidth = undefined;

	$: selectedStayOfSection = $selectedStay[section];
</script>

<svelte:window bind:innerWidth />

{#if innerWidth === undefined}
	<SkeliView></SkeliView>
{:else if innerWidth < 1180}
	<!-- Accordion para mobile -->
	{#if $selectedDestination && selectedStayOfSection && !isEmpty($modules) && calendarMonths && calendarMonths[$selectedDestination.iata_code][parseInt(selectedStayOfSection)]}
		<CalendarAccordionModule />
	{:else}
		<div class="relative">
			<CalendarMonthsSkeleton pulse={isEmpty($modules)} />
			<div class="absolute bg-grey-100/60 blur h-full top-0 w-full"></div>
			<div class="absolute grid justify-center px-16 py-8 top-0 w-full">
				<StatusWrapper
					name={section}
					{labels}
					theme={'light'}
					fares={isEmpty($modules)}
					destination={!$selectedDestination}
					days={!$selectedStay[section]}
					noFares={!!$selectedDestination &&
						!!selectedStayOfSection &&
						!(
							!!calendarMonths &&
							calendarMonths[$selectedDestination.iata_code][parseInt(selectedStayOfSection)]
						)}
				></StatusWrapper>
			</div>
		</div>
	{/if}
{:else}
	<!-- Tabs para desktop -->
	{#if $selectedDestination && selectedStayOfSection && !isEmpty($modules) && calendarMonths && calendarMonths[$selectedDestination.iata_code][parseInt(selectedStayOfSection)]}
		<CalendarTabModule />
	{:else}
		<div class="relative">
			<CalendarMonthsSkeleton pulse={isEmpty($modules)} />
			<div class="absolute bg-grey-100/60 blur h-full top-0 w-full"></div>
			<div class="absolute grid h-full md:place-content-center px-16 py-8 top-0 w-full">
				<StatusWrapper
					name={section}
					{labels}
					theme={'light'}
					fares={isEmpty($modules)}
					destination={!$selectedDestination}
					days={!$selectedStay[section]}
					noFares={!!$selectedDestination &&
						!!selectedStayOfSection &&
						!(
							!!calendarMonths &&
							calendarMonths[$selectedDestination.iata_code][parseInt(selectedStayOfSection)]
						)}
				></StatusWrapper>
			</div>
		</div>
	{/if}
	{#if !($selectedDestination && selectedStayOfSection && !isEmpty($modules) && calendarMonths && calendarMonths[$selectedDestination.iata_code][parseInt(selectedStayOfSection)])}
		<div class="relative">
			<CalendarGridSkeleton pulse={isEmpty($modules)}></CalendarGridSkeleton>
			<div class="absolute bg-grey-100/60 blur h-full top-0 w-full"></div>
			<div class="absolute grid h-full md:place-content-center px-16 py-8 top-0 w-full">
				<StatusWrapper
					name={section}
					{labels}
					theme={'light'}
					fares={isEmpty($modules)}
					destination={!$selectedDestination}
					days={!$selectedStay[section]}
					noFares={!!$selectedDestination &&
						!!selectedStayOfSection &&
						!(
							!!calendarMonths &&
							calendarMonths[$selectedDestination.iata_code][parseInt(selectedStayOfSection)]
						)}
				></StatusWrapper>
			</div>
		</div>
	{/if}
{/if}
