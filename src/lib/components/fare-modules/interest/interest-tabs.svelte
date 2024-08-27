<script lang="ts">
	import { Tabs } from 'bits-ui';
	import { getContext } from 'svelte';
	import { getDaysContext } from '$lib/components/days';
	import { getDestinationsContext } from '$lib/components/destination/context';
	import { getFareModulesContext } from '../context';
	import { fly } from 'svelte/transition';
	import { isEmpty, isNotNil } from 'ramda';
	import InterestNameCard from './interest-name-card.svelte';
	import IntersetFareCard from './interest-fare-card.svelte';
	import { getInterestLowestContext, getInterestsFaresContext } from '$lib/public/modules/context';

	const { all: destinations } = getDestinationsContext();
	const { selected: selectedStay } = getDaysContext();
	const section = getContext<string>('section');
	const lowest = getInterestLowestContext();
	const interestFaresContext = getInterestsFaresContext();
	const labels = getContext<Record<string, string>>('moduleLabels');

	$: interestNames = $lowest;

	$: interestFares = $interestFaresContext;

	$: selectedStayOfSection = $selectedStay[section];

	$: name = undefined;

	$: maxShow = name ? 12 : 12;

	const addShowMax = () => (maxShow += 12);

	const sortInterest = (fares: Record<string, ViajaPanamaFare>) => (a: string, b: string) =>
		fares[a].price - fares[b].price || a.localeCompare(b);

	const handleClick = (fare: unknown, interest: string) => () => {
		if (window.dataLayer)
			window.dataLayer.push({ event: 'fare_click', module: 'Interest', interest, fare });
	};
</script>

{#if isNotNil(selectedStayOfSection)}
	{@const stay = parseInt(selectedStayOfSection)}
	{@const interests = interestNames[stay]}
	<Tabs.Root bind:value={name} class="grid grid-cols-4 grid-rows-1 gap-16" orientation="vertical">
		<Tabs.List class="auto-rows-min col-start-1 col-span-1 gap-8 grid grid-cols-1 min-w-max">
			{#if !isEmpty(interests) && interests != null}
				{#each Object.keys(interests).sort(sortInterest(interests)) as key (key)}
					{@const interest = interests[key]}
					{@const fares = interestFares[stay][key]}
					{@const category = $destinations[interest.destination].categories.filter((value) => {
						const translation = value.destination_category_id.translations;
						if (translation) return translation[0].name === key;
						return false;
					})[0].destination_category_id}
					<Tabs.Trigger
						value={key}
						class="border-2 border-primary-ultradark group rounded-lg hover:bg-secondary transition-colors data-[state='active']:bg-red overflow-hidden shadow-tiny"
						on:click={handleClick(interest, key)}
					>
						<InterestNameCard
							count={Object.keys(fares).filter((key) => fares[key].price !== 9999999).length}
							selected={name === key}
							fare={interest}
							interest={key}
							image={category.image}
						></InterestNameCard>
					</Tabs.Trigger>
				{/each}
			{:else}
				<div class="text-center text-common-white">
					{labels['noFares']}
				</div>
			{/if}
		</Tabs.List>
		{#if !isEmpty(interests) && interests != null}
			{#each Object.keys(interests).sort((a, b) => interests[a].price - interests[b].price) as key (key)}
				{@const fares = interestFares[stay][key]}
				<Tabs.Content value={key} class="col-start-2 col-span-3 self-start">
					<ul
						class="auto-rows-fr bg-backgound-paper gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-8 rounded-lg shadow-medium"
					>
						{#each Object.keys(fares).sort((a, b) => fares[a].price - fares[b].price) as fareKey, i}
							{@const fare = fares[fareKey]}
							{#if i < maxShow && fares[fareKey].price !== 9999999}
								<li in:fly={{ duration: 350, y: '-100%' }} out:fly={{ duration: 350, y: '-100%' }}>
									<IntersetFareCard {fare} />
								</li>
							{/if}
						{/each}
					</ul>
					{#if Object.keys(fares).length > 12 && maxShow < Object.keys(fares).length}
						<div class="flex justify-center my-tiny" transition:fly>
							<button
								class="button button-solid-light text-common-white"
								on:click={addShowMax}
								type="button"
							>
								{labels['showMoreDestinations']}
							</button>
						</div>
					{/if}
				</Tabs.Content>
			{/each}
		{:else}
			<div class="text-center text-common-white">
				{labels['noFares']}
			</div>
		{/if}
	</Tabs.Root>
{/if}
