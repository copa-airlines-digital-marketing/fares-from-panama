<script lang="ts">
	import { Accordion } from 'bits-ui';
	import { getContext } from 'svelte';
	import { getDaysContext } from '$lib/components/days';
	import { getFareModulesContext } from '../context';
	import { isEmpty } from 'ramda';
	import HistogramMonthCard from './histogram-month-card.svelte';
	import HistogramDatesTabs from './histogram-dates-tabs.svelte';
	import { slide } from 'svelte/transition';

	const section = getContext<string>('section');
	const { selected: selectedStay } = getDaysContext();
	const modules = getFareModulesContext();

	const labels = getContext<Record<string, string>>('moduleLabels');

	$: histogramMonths = $modules.histogramMonths;

	let current: string;

	$: selectedStayOfSection = $selectedStay[section];
</script>

{#if selectedStayOfSection}
	{@const stay = parseInt(selectedStayOfSection)}
	{@const months = histogramMonths[stay]}
	<Accordion.Root bind:value={current}>
		{#if !isEmpty(months) && months != null}
			{#each Object.keys(months) as key (key)}
				{@const fare = months[key]}
				<Accordion.Item value={key}>
					<Accordion.Header>
						<Accordion.Trigger
							value={key}
							class="w-full border-b border-b-primary-ultradark group focus:bg-secondary focus:border-secondary hover:bg-secondary hover:border-secondary outline-none transition-colors"
						>
							<HistogramMonthCard {fare} selected={current === key} />
						</Accordion.Trigger>
					</Accordion.Header>
					<Accordion.Content transition={slide}>
						<HistogramDatesTabs month={key}></HistogramDatesTabs>
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
