<script lang="ts">
	import { selectedDaysStore } from '$lib/public/store';
	import { fly } from 'svelte/transition';
	import Heading from '../../copa/typography/heading.svelte';
	import PlainFare from '../plain-fare.svelte';
	import { quintOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';
	import Skeleton from '../status-text.svelte';
	import SkeletonWrapper from '../status-wrapper.svelte';

	export let fares: App.PopularFares;
	export let module: Directus.FareModule;

	$: top10Fares = $selectedDaysStore
		? Object.values(fares[$selectedDaysStore])
				.sort((a, b) => b.score - a.score)
				.slice(0, 12)
		: [];

	const labels: Record<string, string> = module?.translations[0]
		? module?.translations[0]?.labels.reduce((acc, lbl) => ({ ...acc, [lbl.name]: lbl.value }), {})
		: {};
</script>

<SkeletonWrapper
	name={module.name}
	{labels}
	translations={!!module?.translations[0]}
	fares={!!fares}
	days={!!$selectedDaysStore}
>
	{#each top10Fares as fare (fare.id)}
		<li
			animate:flip={{ duration: 500 }}
			in:fly={{ duration: 350, x: '100%' }}
			out:fly={{ duration: 350, x: '-100%', easing: quintOut }}
		>
			<PlainFare {fare} {labels} skeleton></PlainFare>
		</li>
	{:else}
		<Skeleton>
			<Heading type="display-tiny" style="text-common-white text-center my-normal">
				{labels['noFares']}
			</Heading>
		</Skeleton>
	{/each}
</SkeletonWrapper>
