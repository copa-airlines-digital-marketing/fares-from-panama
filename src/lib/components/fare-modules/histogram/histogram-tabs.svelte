<script lang="ts">
	import { Tabs } from 'bits-ui';
	import { getContext } from 'svelte';
	import { getDaysContext } from '$lib/components/days';
	import { getDestinationsContext } from '$lib/components/destination/context';
	import { getFareModulesContext } from '../context';
	import { isEmpty } from 'ramda';
	import HistogramMonthCard from './histogram-month-card.svelte';
	import HistogramDatesTabs from './histogram-dates-tabs.svelte';

	const section = getContext<string>('section');
	const { all: destinations } = getDestinationsContext();
	const { days: allDays, selected: selectedStay } = getDaysContext();
	const modules = getFareModulesContext();

	const labels = getContext<Record<string, string>>('moduleLabels');

	$: histogramMonths = $modules.histogramMonths;

	let current: string;

	$: selectedStayOfSection = $selectedStay[section];
</script>

{#if selectedStayOfSection}
	{@const stay = parseInt(selectedStayOfSection)}
	{@const months = histogramMonths[stay]}
	<Tabs.Root bind:value={current}>
		<Tabs.List class="auto-cols-fr gap-8 grid grid-rows-1 grid-flow-col">
			{#if !isEmpty(months) && months != null}
				{#each Object.keys(months) as key (key)}
					{@const fare = months[key]}
					<Tabs.Trigger
						value={key}
						class="border-2 border-primary-ultradark group rounded-lg hover:bg-secondary transition-colors data-[state='active']:bg-red shadow-tiny"
					>
						<HistogramMonthCard {fare} selected={current === key} />
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
