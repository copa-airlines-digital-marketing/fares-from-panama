<script lang="ts">
	import FareCard from '$lib/components/site/fare-card--calendar.svelte';
	import { getWeekDays, parseDate } from '$lib/public/utils';

	export let calendar: Record<App.DateString, Directus.Fare>;
	export let monthOfFare: Date;
	export let labels: Record<string, string>;
	export let skeleton: boolean;

	const dates = Object.keys(calendar).map((date) => ({
		date: parseDate(date),
		fare: calendar[date]
	}));

	const daysOfWeek = getWeekDays();
</script>

<div
	class="backdrop-blur-sm bg-backgound-paper/30 border border-backgound-paper/20 bg-blend gap-x-8 grid grid-cols-[repeat(7,_minmax(0,_1fr))] p-16 rounded-lg shadow-medium"
>
	{#each daysOfWeek as day}
		<div class="font-heading font-heading-medium text-center text-common-white uppercase">
			{day}
		</div>
	{/each}
	<ul class="auto-rows-auto col-full gap-8 grid grid-cols-subgrid mt-16">
		{#each dates as { date, fare }}
			{#if skeleton}
				<div></div>
			{:else}
				<li>
					<FareCard {date} {fare} {labels} {skeleton} {monthOfFare}></FareCard>
				</li>
			{/if}
		{/each}
	</ul>
</div>
