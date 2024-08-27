<script lang="ts">
	import { getDaysContext } from '$lib/components/days';
	import { getDestinationsContext } from '$lib/components/destination/context';
	import { getFareModulesContext } from '../context';
	import { getContext } from 'svelte';
	import { SkeliView } from '$lib/components/skeleton';
	import { isEmpty, isNil, isNotNil } from 'ramda';
	import StatusWrapper from '$lib/components/skeleton/status-wrapper.svelte';
	import InterestTabs from './interest-tabs.svelte';
	import InterestTabsSkeleton from './interest-tabs-skeleton.svelte';
	import InterestAccordionSkeleton from './interest-accordion-skeleton.svelte';
	import InterestAccordion from './interest-accordion.svelte';
	import { getInterestLowestContext, getInterestsFaresContext } from '$lib/public/modules/context';

	const { all: destinations } = getDestinationsContext();
	const { selected: selectedStay } = getDaysContext();
	const lowest = getInterestLowestContext();
	const interestFaresContext = getInterestsFaresContext();
	const section: string = getContext('section');

	const labels = getContext<Record<string, string>>('moduleLabels');

	$: interestNames = $lowest;

	$: interestFares = $interestFaresContext;

	$: innerWidth = undefined;

	$: selectedStayOfSection = $selectedStay[section];

	$: showModule =
		isNotNil($destinations) &&
		isNotNil(selectedStayOfSection) &&
		isNotNil(labels) &&
		isNotNil(interestNames) &&
		isNotNil(interestFares);
</script>

<svelte:window bind:innerWidth />

{#if innerWidth === undefined}
	<SkeliView></SkeliView>
{:else if innerWidth < 1180}
	{#if showModule}
		<InterestAccordion />
	{:else}
		<div class="relative">
			<InterestAccordionSkeleton />
			<StatusWrapper
				name={section}
				{labels}
				theme={'light'}
				fares={isNil(interestFares) || isEmpty(interestFares)}
				days={!$selectedStay[section]}
				noFares={isNotNil(selectedStayOfSection) &&
					isNotNil(interestNames) &&
					isNil(interestNames[parseInt(selectedStayOfSection)])}
			></StatusWrapper>
		</div>
	{/if}
{:else if showModule}
	<InterestTabs />
{:else}
	<div class="relative">
		<InterestTabsSkeleton />
		<StatusWrapper
			name={section}
			{labels}
			theme={'light'}
			fares={isNil(interestFares) || isEmpty(interestFares)}
			days={!$selectedStay[section]}
			noFares={!(
				isNotNil(selectedStayOfSection) &&
				isNotNil(interestNames) &&
				isNil(interestNames[parseInt(selectedStayOfSection)])
			)}
		></StatusWrapper>
	</div>
{/if}
