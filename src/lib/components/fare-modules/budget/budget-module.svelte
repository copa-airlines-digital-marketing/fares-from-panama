<script lang="ts">
	import { getDaysContext } from '$lib/components/days';
	import { getDestinationsContext } from '$lib/components/destination/context';
	import { getContext } from 'svelte';
	import { isEmpty, isNotNil } from 'ramda';
	import StatusWrapper from '$lib/components/skeleton/status-wrapper.svelte';
	import BudgetSkeleton from './budget-skeleton.svelte';
	import { getBudgetContext } from '$lib/components/budget/context';
	import { fly } from 'svelte/transition';
	import { quintIn } from 'svelte/easing';
	import type { DestinationReturnSchema } from '$lib/public/utils/destinations';
	import { getLowestFaresContext } from '$lib/public/modules/context';
	import InterestFareCard from '../interest/interest-fare-card.svelte';

	const { selected: selectedDestination } = getDestinationsContext();
	const { selected: selectedStay } = getDaysContext();
	const selectedBudget = getBudgetContext();
	const lowestsFares = getLowestFaresContext();

	const section: string = getContext('section');

	const labels = getContext<Record<string, string>>('moduleLabels');

	$: budget = $lowestsFares;

	$: selectedStayOfSection = $selectedStay[section];

	$: maxShow = $selectedBudget ? 12 : 12;

	const addShowMax = () => (maxShow += 12);

	const handleCardClick = (destination: DestinationReturnSchema, fare: unknown) => () => {
		$selectedDestination = destination;
		if (window.dataLayer) window.dataLayer.push({ event: 'fare_click', module: 'Budget', fare });
	};
</script>

{#if isNotNil($selectedBudget) && !!selectedStayOfSection && isNotNil(budget) && !isEmpty(budget)}
	{@const fares = Object.values(budget[parseInt(selectedStayOfSection)])
		.sort((a, b) => b.price - a.price)
		.filter((fare) => fare.price <= $selectedBudget)}
	{#key $selectedBudget}
		<div
			in:fly={{ easing: quintIn, x: 5 }}
			class="flex font-heading font-heading-medium justify-end px-8 text-grey-600"
		>
			{fares.length}
			{labels['destinations']}
		</div>
	{/key}
	<ul
		class="auto-rows-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-tiny"
	>
		{#each fares as fare, i (i)}
			{#if i < maxShow}
				<li in:fly={{ duration: 350, y: '-100%' }} out:fly={{ duration: 350, y: '-100%' }}>
					<InterestFareCard {fare}></InterestFareCard>
				</li>
			{/if}
		{/each}
	</ul>
	{#if fares.length > 12 && maxShow < fares.length}
		<div class="flex justify-center my-tiny" transition:fly>
			<button class="button text-common-white" on:click={addShowMax} type="button">
				{labels['showMoreDestinations']}
			</button>
		</div>
	{/if}
{:else}
	<div class="relative">
		<BudgetSkeleton pulse={isEmpty(budget)}></BudgetSkeleton>
		<StatusWrapper
			name={section}
			{labels}
			theme={'light'}
			fares={isEmpty($lowestsFares)}
			days={!$selectedStay[section]}
			budget={!$selectedBudget}
			noFares={!!selectedStayOfSection && !!budget && !budget[parseInt(selectedStayOfSection)]}
		></StatusWrapper>
	</div>
{/if}
