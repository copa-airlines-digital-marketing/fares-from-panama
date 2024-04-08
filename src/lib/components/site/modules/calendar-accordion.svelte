<script lang="ts">
	import { createAccordion, melt } from '@melt-ui/svelte';
	import FareCardMonth from '../fare-card-month.svelte';
	import { minFare, parseMonthYear } from '$lib/public/utils';
	import { slide } from 'svelte/transition';
	import CalendarFareModule from './calendar-fare-module.svelte';
	import { de } from 'date-fns/locale';

	export let months: App.MonthCardData[];
	export let calendar: App.FaresByDateOfDestination;
	export let labels: Record<string, string>;
	export let skeleton: boolean;
	export let selectedDestination: string | undefined;
	export let selectedDays: number;

	const {
		elements: { content, item, trigger, root },
		helpers: { isSelected }
	} = createAccordion({
		multiple: true
	});

	$: lowest = months.map((month) => month.fare).reduce(minFare, 1000);
</script>

{#if skeleton}
	<div>
		{#each months as { fare }}
			<div class="my-tiny">
				<div class="w-full border-b border-b-common-white">
					<FareCardMonth {fare} {labels} {skeleton} isLowest={false} isSelected={false}
					></FareCardMonth>
				</div>
			</div>
		{/each}
	</div>
{:else}
	<div {...$root}>
		{#each months as { monthYear, fare }}
			<div class="my-tiny" use:melt={$item(monthYear)}>
				<button
					class="w-full border-b border-b-common-white group focus:bg-red focus:border-red hover:bg-red hover:border-red outline-none transition-colors"
					class:bg-red={$isSelected(monthYear)}
					use:melt={$trigger(monthYear)}
				>
					<FareCardMonth
						{fare}
						{labels}
						{skeleton}
						isLowest={lowest === parseInt(fare.price)}
						isSelected={$isSelected(monthYear)}
					></FareCardMonth>
				</button>
				{#if $isSelected(monthYear)}
					{@const destination = selectedDestination ? selectedDestination : ''}
					<div transition:slide use:melt={$content(monthYear)}>
						<CalendarFareModule
							calendar={calendar[destination][selectedDays][monthYear]}
							monthOfFare={parseMonthYear(monthYear)}
							{labels}
							skeleton={false}
							isTab={false}
							{lowest}
						></CalendarFareModule>
					</div>
				{/if}
			</div>
		{/each}
	</div>
{/if}
