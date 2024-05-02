<script lang="ts">
	import { selectedBudgetStore, selectedDaysStore } from '$lib/public/store';
	import Heading from '../../copa/typography/heading.svelte';
	import FareCard from '$lib/components/site/fare-card-destination-image.svelte';
	import StatusWrapper from '../../skeleton/status-wrapper.svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { getFlyingOption } from '$lib/public/utils';
	import { expoOut } from 'svelte/easing';
	import { getNDummyFares } from '$lib/components/directus/utils';

	export let section: string;
	export let fares: App.BudgetFares;
	export let module: Directus.FareModule;

	$: sectionDays = $selectedDaysStore[section];

	$: filteredFares = sectionDays
		? Object.values(fares[sectionDays])
				.filter((fare) => parseInt(fare.price) <= $selectedBudgetStore)
				.sort((a, b) => parseInt(a.price) - parseInt(b.price))
		: [...getNDummyFares(12)];

	$: skeleton = !module.translations[0] || !fares || !sectionDays;

	const labels: Record<string, string> = module?.translations[0]
		? module?.translations[0]?.labels.reduce((acc, lbl) => ({ ...acc, [lbl.name]: lbl.value }), {})
		: {};
</script>

{#if skeleton}
	<StatusWrapper
		name={module.name}
		{labels}
		translations={!module.translations[0]}
		fares={!fares}
		days={!sectionDays}
		theme="light"
	></StatusWrapper>
{/if}

{#if !skeleton}
	<div>
		{filteredFares.length}
		{labels['destinations']}
	</div>
{/if}
<ul
	class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-3 gap-16 md:gap-24 my-tiny"
>
	{#each filteredFares as fare (fare.id)}
		{@const seed = Math.random() * 1000}
		<li
			animate:flip
			in:fly={getFlyingOption(seed)}
			out:fly={{ ...getFlyingOption(seed), easing: expoOut }}
		>
			<FareCard {fare} {labels} {skeleton} pulse={!fares}></FareCard>
		</li>
	{:else}
		<li>
			<Heading type="display-tiny" style="text-grey-600 text-center my-normal">
				{labels['selectDays']}
			</Heading>
		</li>
	{/each}
</ul>
