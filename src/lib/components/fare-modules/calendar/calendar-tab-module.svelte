<script lang="ts">
	import { Tabs } from 'bits-ui';
	import { getContext, onMount } from 'svelte';
	import { getDaysContext } from '$lib/components/days';
	import { getDestinationsContext } from '$lib/components/destination/context';
	import { getFareModulesContext } from '../context';
	import CalendarMonthCard from './calendar-month-card.svelte';
	import { isEmpty, min, prop } from 'ramda';
	import CalendarDayCard from './calendar-day-card.svelte';
	import {
		dateIsInMonth,
		getWeekDays,
		isBeforeSweetSpot,
		parseDate,
		parseDeparture
	} from '$lib/public/utils';
	import { fly } from 'svelte/transition';
	import type { Writable } from 'svelte/store';

	const section = getContext<string>('section');
	const { selected: selectedDestination } = getDestinationsContext();
	const { days: allDays, selected: selectedStay } = getDaysContext();
	const modules = getFareModulesContext();

	const labels = getContext<Record<string, string>>('moduleLabels');

	let current: string;

	$: calendarMonths = $modules.calendarMonths;
	$: calendar = $modules.calendar;
	$: selectedStayOfSection = $selectedStay[section];

	const toastFN = getContext<(index?: number) => void>('showToast');
	const maxAlerts = getContext<number>('maxAlerts');
	const alertsShown = getContext<Writable<number>>('alertsShown');

	const addToast = (date: Date, fare: unknown, month: string) => () => {
		if (window.dataLayer)
			window.dataLayer.push({ event: 'fare_click', module: 'Calendar Month', month, fare });
		if (!!toastFN && isBeforeSweetSpot(date) && $alertsShown <= maxAlerts) {
			toastFN();
			$alertsShown += 1;
		}
	};

	const checkDates = (values: unknown) => {
		if (!$selectedDestination || !selectedStayOfSection) return;

		const { iata_code } = $selectedDestination;

		const stay = parseInt(selectedStayOfSection);

		const months = calendarMonths[iata_code][stay];

		const lowest =
			!isEmpty(months) && months !== null
				? Object.values(months)
						.map((f) => f.price)
						.reduce(min, Infinity)
				: Infinity;

		//return if is normal
		if (![Infinity, 9999999].includes(lowest)) return;

		if (!!toastFN) toastFN(1);
	};

	$: {
		checkDates($selectedStay[section]);
	}
</script>

{#if $selectedDestination && selectedStayOfSection}
	{@const { iata_code } = $selectedDestination}
	{@const stay = parseInt(selectedStayOfSection)}
	{@const months = calendarMonths[iata_code][stay]}
	{@const lowest =
		!isEmpty(months) && months != null
			? Object.values(months)
					.map((f) => f.price)
					.reduce(min, Infinity)
			: Infinity}
	<Tabs.Root bind:value={current}>
		<Tabs.List class="auto-cols-fr gap-8 grid grid-rows-1 grid-flow-col">
			{#if !isEmpty(months) && months != null}
				{#each Object.keys(months) as key (key)}
					{@const fare = months[key]}
					<Tabs.Trigger
						value={key}
						class="border-2 border-primary-ultradark group rounded-lg hover:bg-secondary transition-colors data-[state='active']:bg-red shadow-tiny"
						on:click={addToast(parseDate(fare.departure), fare, key)}
					>
						<CalendarMonthCard {fare} lowest={lowest === fare.price} selected={current === key} />
					</Tabs.Trigger>
				{/each}
			{:else}
				<div class="text-center text-common-white">
					{labels['noFares']}
				</div>
			{/if}
		</Tabs.List>
		{#if !isEmpty(months) && months != null}
			{#each Object.keys(months) as key (key)}
				{@const fare = months[key]}
				{@const days = calendar[iata_code][stay][key]}
				<Tabs.Content
					value={key}
					class="bg-backgound-paper border-2 border-primary-ultradark my-16 p-8 rounded-lg shadow-medium"
				>
					<ul
						transition:fly={{ y: -5 }}
						class="auto-rows-auto gap-8 grid calendar:grid-cols-[repeat(7,_minmax(0,_1fr))] p-8"
					>
						{#each getWeekDays() as weekday}
							<li
								class="caret-transparent font-heading font-heading-medium my-8 text-center text-primary-dark uppercase"
							>
								{weekday}
							</li>
						{/each}
						{#each Object.keys(days) as day}
							{@const date = parseDate(day)}
							{@const dayFare = days[day]}
							{@const alternatives = $allDays
								.map((dt) => calendar[iata_code][dt]?.[key]?.[day] ?? {})
								.filter((value) => !isEmpty(value))
								.map(prop('days'))
								.join(', ')}
							<li>
								<CalendarDayCard
									{alternatives}
									{date}
									fare={dayFare}
									isTab={true}
									isInMonth={!dateIsInMonth(date, parseDeparture(fare))}
									lowest={lowest === dayFare.price}
								></CalendarDayCard>
							</li>
						{/each}
					</ul>
				</Tabs.Content>
			{/each}
		{:else}
			<div class="text-center text-common-white">
				{labels['noFares']}
			</div>
		{/if}
	</Tabs.Root>
{/if}
