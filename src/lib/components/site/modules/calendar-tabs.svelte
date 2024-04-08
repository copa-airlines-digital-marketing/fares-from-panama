<script lang="ts">
	import { createTabs, melt } from '@melt-ui/svelte';
	import FareCardMonth from '../fare-card-month.svelte';
	import { minFare, parseMonthYear } from '$lib/public/utils';
	import CalendarFareModule from './calendar-fare-module.svelte';

	export let calendar: App.FaresByDateOfDestination;
	export let months: App.MonthCardData[];
	export let labels: Record<string, string>;
	export let skeleton: boolean;
	export let calendarSkeleton: boolean;
	export let selectedMonth: string | undefined = undefined;
	export let selectedDestination: string | undefined;
	export let selectedDays: number;

	const {
		elements: { root, list, content, trigger },
		states: { value }
	} = createTabs();

	$: selectedMonth = $value;

	$: lowest = months.map((month) => month.fare).reduce(minFare, 1000);
</script>

{#if skeleton}
	<div class="auto-cols-fr gap-24 grid grid-flow-col">
		{#each months as { monthYear, fare }}
			<div
				class="block border border-common-white rounded-2xl w-full"
				use:melt={$trigger(monthYear)}
			>
				<FareCardMonth {fare} {labels} {skeleton} isLowest={false} isSelected={false}
				></FareCardMonth>
			</div>
		{/each}
	</div>
{:else}
	<div use:melt={$root}>
		<div
			aria-label={labels['monthSelectAria']}
			class="auto-cols-fr gap-24 grid grid-flow-col"
			use:melt={$list}
		>
			{#each months as { monthYear, fare }}
				{@const selected = $value === monthYear}
				<button
					class="block border group focus:bg-red focus:border-red hover:bg-red hover:border-red outline-none rounded-2xl transition-colors w-full"
					use:melt={$trigger(monthYear)}
					class:bg-red={selected}
					class:border-red={selected}
					class:border-common-white={!selected}
				>
					<FareCardMonth
						{fare}
						{labels}
						{skeleton}
						isLowest={lowest === parseInt(fare.price)}
						isSelected={selected}
					></FareCardMonth>
				</button>
			{/each}
		</div>
		{#if calendarSkeleton}
			<div>skeleton</div>
		{:else}
			{@const destination = selectedDestination ? selectedDestination : ''}
			{#each months as { monthYear }}
				<div class="my-petit" use:melt={$content(monthYear)}>
					<CalendarFareModule
						calendar={calendar[destination][selectedDays][monthYear]}
						monthOfFare={parseMonthYear(monthYear)}
						{labels}
						skeleton={calendarSkeleton}
						isTab={true}
						{lowest}
					></CalendarFareModule>
				</div>
			{/each}
		{/if}
	</div>
{/if}
