<script lang="ts">
	import { Accordion } from 'bits-ui';
	import { getContext } from 'svelte';
	import { getDaysContext } from '$lib/components/days';
	import { getDestinationsContext } from '$lib/components/destination/context';
	import { getFareModulesContext } from '../context';
	import { fly, slide } from 'svelte/transition';
	import { isEmpty, isNotNil } from 'ramda';
	import InterestNameCard from './interest-name-card.svelte';
	import IntersetFareCard from './interest-fare-card.svelte';

	const { all: destinations } = getDestinationsContext();
	const { selected: selectedStay } = getDaysContext();
	const section = getContext<string>('section');
	const modules = getFareModulesContext();
	const labels = getContext<Record<string, string>>('moduleLabels');

	let name: string[] = [];

	$: interestNames = $modules.interestNames;

	$: interestFares = $modules.interests;

	$: selectedStayOfSection = $selectedStay[section];

	$: name = [];

	$: maxShow = name ? 12 : 12;

	const addShowMax = () => (maxShow += 12);

	const sortInterest = (fares: Record<string, ViajaPanamaFare>) => (a: string, b: string) =>
		fares[a].price - fares[b].price || a.localeCompare(b);
</script>

{#if isNotNil(selectedStayOfSection)}
	{@const stay = parseInt(selectedStayOfSection)}
	{@const interests = interestNames[stay]}
	<Accordion.Root class="my-16" multiple bind:value={name}>
		{#if !isEmpty(interests) && interests != null}
			{#each Object.keys(interests).sort(sortInterest(interests)) as key (key)}
				{@const interest = interests[key]}
				{@const fares = interestFares[stay][key]}
				{@const category = $destinations[interest.destination].categories.filter((value) => {
					const translation = value.destination_category_id.translations;
					if (translation) return translation[0].name === key;
					return false;
				})[0].destination_category_id}
				<Accordion.Item value={key}>
					<Accordion.Header>
						<Accordion.Trigger
							class="w-full border-b border-b-common-white group focus:bg-red focus:border-secondary hover:bg-secondary hover:border-secondary outline-none transition-colors data-[state='open']:bg-red"
						>
							<InterestNameCard
								count={Object.keys(fares).length}
								fare={interest}
								interest={key}
								selected={name.includes(key)}
								image={category.image}
							></InterestNameCard>
						</Accordion.Trigger>
					</Accordion.Header>
					<Accordion.Content transition={slide}>
						<ul
							class="auto-rows-fr bg-backgound-paper gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-8"
						>
							{#each Object.keys(fares).sort((a, b) => fares[a].price - fares[b].price) as fareKey, i}
								{@const fare = fares[fareKey]}
								{#if i < maxShow}
									<li
										in:fly={{ duration: 350, y: '-100%' }}
										out:fly={{ duration: 350, y: '-100%' }}
									>
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
