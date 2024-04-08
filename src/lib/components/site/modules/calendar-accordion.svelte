<script lang="ts">
	import { createAccordion, melt } from '@melt-ui/svelte';
	import FareCardMonth from '../fare-card-month.svelte';
	import { minFare } from '$lib/public/utils';

	export let months: App.MonthCardData[];
	export let calendar: App.FaresByDateOfDestination;
	export let labels: Record<string, string>;
	export let skeleton: boolean;

	const {
		elements: { item, trigger, root },
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
					class="w-full border-b border-b-common-white group focus:bg-secondary focus:border-secondary hover:bg-secondary hover:border-secondary outline-none transition-colors"
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
					<div></div>
				{/if}
			</div>
		{/each}
	</div>
{/if}
