<script lang="ts">
	import { Tabs } from 'bits-ui';
	import { getContext } from 'svelte';
	import { getDaysContext } from '$lib/components/days';
	import { getFareModulesContext } from '../context';
	import { isEmpty } from 'ramda';
	import HistogramMonthCard from './histogram-month-card.svelte';
	import HistogramDatesTabs from './histogram-dates-tabs.svelte';
	import { isAfter6Months, parseDeparture } from '$lib/public/utils';

	const section = getContext<string>('section');
	const { selected: selectedStay } = getDaysContext();
	const modules = getFareModulesContext();

	const labels = getContext<Record<string, string>>('moduleLabels');

	$: histogramMonths = $modules.histogramMonths;

	let current: string;

	$: selectedStayOfSection = $selectedStay[section];

	const handleClick = (fare: unknown, month: string) => () => {
		if (window.dataLayer)
			window.dataLayer.push({ event: 'fare_click', module: 'Histogram Month', month, fare });
	};
</script>

{#if selectedStayOfSection}
	{@const stay = parseInt(selectedStayOfSection)}
	{@const months = histogramMonths[stay]}
	<Tabs.Root bind:value={current}>
		<Tabs.List class="auto-cols-fr gap-8 grid grid-rows-1 grid-flow-col">
			{#if !isEmpty(months) && months != null}
				{#each Object.keys(months) as key (key)}
					{@const fare = months[key]}
					{#if !isAfter6Months(parseDeparture(fare))}
						<Tabs.Trigger
							value={key}
							class="border-2 border-primary-ultradark group rounded-lg hover:bg-secondary hover:border-secondary transition-colors data-[state='active']:bg-red data-[state='active']:border-red shadow-tiny"
							on:click={handleClick(fare, key)}
						>
							<HistogramMonthCard {fare} selected={current === key} />
						</Tabs.Trigger>
					{/if}
				{/each}
			{:else}
				<div class="text-center text-common-white">
					{labels['noFares']}
				</div>
			{/if}
		</Tabs.List>
		{#if !isEmpty(months) && months != null}
			{#each Object.keys(months) as key (key)}
				<Tabs.Content value={key}>
					<HistogramDatesTabs month={key}></HistogramDatesTabs>
				</Tabs.Content>
			{/each}
		{:else}
			<div class="text-center text-common-white">
				{labels['noFares']}
			</div>
		{/if}
	</Tabs.Root>
{/if}
