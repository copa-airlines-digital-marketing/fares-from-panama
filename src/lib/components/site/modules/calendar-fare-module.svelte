<script lang="ts">
	import FareCard from '$lib/components/site/fare-card-calendar.svelte';
	import { getWeekDays, parseDate } from '$lib/public/utils';

	export let calendar: Record<App.DateString, Directus.Fare>;
	export let monthOfFare: Date;
	export let labels: Record<string, string>;
	export let skeleton: boolean;
	export let isTab: boolean;
	export let lowest: number;

	$: dates = Object.keys(calendar).map((date) => ({
		date: parseDate(date),
		fare: calendar[date]
	}));

	const daysOfWeek = getWeekDays();
</script>

<div
	class="bg-backgound-paper calendar:gap-x-8 calendar:grid-cols-[repeat(7,_minmax(0,_1fr))] grid grid-cols-1 my-8 px-8 py-8 rounded-lg shadow-medium"
>
	{#if isTab}
		{#each daysOfWeek as day}
			<div
				class="caret-transparent font-heading font-heading-medium my-8 text-center text-primary uppercase"
			>
				{day}
			</div>
		{/each}
	{/if}
	<ul class="auto-rows-fr col-full gap-8 grid grid-cols-subgrid mt-16">
		{#each dates as { date, fare }}
			<li>
				<FareCard
					{date}
					{fare}
					{labels}
					{skeleton}
					{monthOfFare}
					{isTab}
					isLowest={lowest === parseInt(fare.price)}
				></FareCard>
			</li>
		{/each}
	</ul>
</div>
