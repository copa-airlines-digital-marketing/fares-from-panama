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

	const { all: destinations } = getDestinationsContext();
	const { selected: selectedStay } = getDaysContext();
	const modules = getFareModulesContext();

	const section: string = getContext('section');

	const labels = getContext<Record<string, string>>('moduleLabels');

	$: interestNames = $modules.interestNames;

	$: interestFares = $modules.interests;

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
{:else if innerWidth < 960}
	{#if showModule}
		<InterestAccordion />
	{:else}
		<div class="relative">
			<InterestAccordionSkeleton />
			<div class="absolute bg-grey-100/60 blur h-full top-0 w-full"></div>
			<div class="absolute grid h-full px-16 py-roomy top-0 w-full">
				<StatusWrapper
					name={section}
					{labels}
					theme={'light'}
					fares={isNil($modules) || isEmpty($modules)}
					days={!$selectedStay[section]}
					noFares={isNotNil(selectedStayOfSection) &&
						isNotNil(interestNames) &&
						isNil(interestNames[parseInt(selectedStayOfSection)])}
				></StatusWrapper>
			</div>
		</div>
	{/if}
{:else if showModule}
	<InterestTabs />
{:else}
	<div class="relative">
		<InterestTabsSkeleton />
		<div class="absolute bg-grey-100/60 blur h-full top-0 w-full"></div>
		<div class="absolute grid h-full px-16 py-roomy top-0 w-full">
			<StatusWrapper
				name={section}
				{labels}
				theme={'light'}
				fares={isNil($modules) || isEmpty($modules)}
				days={!$selectedStay[section]}
				noFares={!(
					isNotNil(selectedStayOfSection) &&
					isNotNil(interestNames) &&
					isNil(interestNames[parseInt(selectedStayOfSection)])
				)}
			></StatusWrapper>
		</div>
	</div>
{/if}
