<script lang="ts">
	import { Accordion } from 'bits-ui';
	import { getContext } from 'svelte';
	import { getDaysContext } from '$lib/components/days';
	import { getDestinationsContext } from '$lib/components/destination/context';
	import { getFareModulesContext } from '../context';
	import CalendarMonthCard from './calendar-month-card.svelte';
	import { slide } from 'svelte/transition';
	import { isEmpty, prop } from 'ramda';
	import CalendarDayCard from './calendar-day-card.svelte';
	import { dateIsInMonth, isAfter6Months, parseDate, parseDeparture } from '$lib/public/utils';
	import { checkAttractiveFaresExistanceForItinerary, getLowestFareOfMonths } from '.';
	import type { Writable } from 'svelte/store';

	const section = getContext<string>('section');
	const { selected: selectedDestination } = getDestinationsContext();
	const { days: allDays, selected: selectedStay } = getDaysContext();
	const modules = getFareModulesContext();

	const labels = getContext<Record<string, string>>('moduleLabels');

	$: calendarMonths = $modules.calendarMonths;
	$: calendar = $modules.calendar;
	$: selectedStayOfSection = $selectedStay[section];

	const toastFN = getContext<(index?: number) => void>('showToast');
	const monthsAlternatives = getContext<Writable<null | string[]>>('itineraryAlternatives');

	$: {
		const alternatives = checkAttractiveFaresExistanceForItinerary(
			$selectedDestination,
			$selectedStay[section],
			calendarMonths
		);
		$monthsAlternatives = alternatives;
		if (alternatives) toastFN(1);
	}
</script>

{#if $selectedDestination && selectedStayOfSection}
	{@const { iata_code } = $selectedDestination}
	{@const stay = parseInt(selectedStayOfSection)}
	{@const months = calendarMonths[iata_code][stay]}
	{@const lowest = getLowestFareOfMonths(months)}
	<Accordion.Root class="my-16" multiple>
		{#if !isEmpty(months) && months != null}
			{#each Object.keys(months) as key (key)}
				{@const fare = months[key]}
				{@const days = calendar[iata_code][stay][key]}
				{#if !isAfter6Months(parseDeparture(fare))}
					<Accordion.Item value="${key}">
						<Accordion.Header>
							<Accordion.Trigger
								class="w-full border-b border-b-common-white group focus:bg-secondary focus:border-secondary hover:bg-secondary hover:border-secondary outline-none transition-colors"
							>
								<CalendarMonthCard {fare} lowest={lowest === fare.price} selected={false} />
							</Accordion.Trigger>
						</Accordion.Header>
						<Accordion.Content transition={slide}>
							<ul class="auto-rows-fr bg-backgound-paper gap-8 grid grid-cols-1 p-8">
								{#each Object.keys(days) as day}
									{@const date = parseDate(day)}
									{@const dayFare = days[day]}
									{@const alternatives = $allDays
										.map((dt) => calendar[iata_code][dt]?.[key]?.[day] ?? {})
										.filter((value) => !isEmpty(value))
										.map(prop('days'))
										.join(', ')}
									{#if dateIsInMonth(date, parseDeparture(fare))}
										<li>
											<CalendarDayCard
												{alternatives}
												{date}
												fare={dayFare}
												isInMonth={false}
												lowest={lowest === dayFare.price}
											></CalendarDayCard>
										</li>
									{/if}
								{/each}
							</ul>
						</Accordion.Content>
					</Accordion.Item>
				{/if}
			{/each}
		{:else}
			<div class="text-center text-common-white">
				{labels['noFares']}
			</div>
		{/if}
	</Accordion.Root>
{/if}
