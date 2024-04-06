<script lang="ts">
	import { selectedDaysStore } from '$lib/public/store';
	import Heading from '../../copa/typography/heading.svelte';
	import PlainFare from '../fare-card-plain.svelte';
	import { getNDummyFares } from '$lib/components/directus/utils';
	import StatusWrapper from '../status-wrapper.svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { getFlyingOption } from '$lib/public/utils';
	import { expoOut } from 'svelte/easing';

	export let section: string;
	export let fares: App.PopularFares;
	export let module: Directus.FareModule;

	$: sectionDays = $selectedDaysStore[section];

	$: filteredFares = sectionDays
		? Object.values(fares[sectionDays])
				.sort((a, b) => b.score - a.score)
				.slice(0, 12)
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
		theme="dark"
	></StatusWrapper>
{/if}

<ul
	class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-3 gap-16 md:gap-24 my-petit"
>
	{#each filteredFares as fare (fare.id)}
		{@const seed = Math.random() * 100}
		<li
			animate:flip
			in:fly={getFlyingOption(seed)}
			out:fly={{ ...getFlyingOption(seed), easing: expoOut }}
		>
			<PlainFare {fare} {labels} {skeleton} pulse={!fares}></PlainFare>
		</li>
	{:else}
		<li>
			<Heading type="display-tiny" style="text-common-white text-center my-normal">
				{labels['noFares']}
			</Heading>
		</li>
	{/each}
</ul>
