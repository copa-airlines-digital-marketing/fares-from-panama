<script>
	import { Accordion } from 'bits-ui';
	import { getContext } from 'svelte';
	import { getDaysContext } from '$lib/components/days';
	import { getDestinationsContext } from '$lib/components/destination/context';
	import { getFareModulesContext } from '../context';
	import CalendarMonthCard from './calendar-month-card.svelte';
	import { slide } from 'svelte/transition';
	import { isEmpty, minBy, prop, reduce } from 'ramda';
	import CalendarDayCard from './calendar-day-card.svelte';
	import { dateIsInMonth, parseDate, parseDeparture } from '$lib/public/utils';

	const section = getContext('section');
	const { selected: selectedDestination } = getDestinationsContext();
	const { days: allDays, selected: selectedStay } = getDaysContext();
	const modules = getFareModulesContext();
	const { calendarMonths, calendar } = $modules;

	const labels = getContext('moduleLabels');

	$: selectedStayOfSection = $selectedStay[section];
</script>

{#if $selectedDestination && selectedStayOfSection}
	{@const { iata_code } = $selectedDestination}
	{@const stay = parseInt(selectedStayOfSection)}
	{@const months = calendarMonths[iata_code][stay]}
	{@const lowest =
		!isEmpty(months) && months != null
			? reduce(minBy(prop('price')), Infinity, Object.values(months))
			: Infinity}
	<Accordion.Root class="my-16" multiple>
		{#if !isEmpty(months) && months != null}
			{#each Object.keys(months) as key (key)}
				{@const fare = months[key]}
				{@const days = calendar[iata_code][stay][key]}
				<Accordion.Item value="${key}">
					<Accordion.Header>
						<Accordion.Trigger
							class="w-full border-b border-b-common-white group focus:bg-secondary focus:border-secondary hover:bg-secondary hover:border-secondary outline-none transition-colors"
						>
							<CalendarMonthCard {fare} lowest={lowest.price === fare.price} selected={false} />
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
											lowest={lowest.price === dayFare.price}
										></CalendarDayCard>
									</li>
								{/if}
							{/each}
						</ul>
					</Accordion.Content>
				</Accordion.Item>
			{/each}
		{:else}
			<div class="text-center text-common-white">
				{labels['noFares']}
			</div>
		{/if}
	</Accordion.Root>
{/if}
