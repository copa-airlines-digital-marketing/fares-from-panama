<script lang="ts">
	import { selectedDaysStore } from '$lib/public/store';
	import { fly, slide } from 'svelte/transition';
	import Heading from '../../copa/typography/heading.svelte';
	import PlainFare from '../plain-fare.svelte';
	import { quintIn, quintOut } from 'svelte/easing';
	import { flip } from 'svelte/animate';

	export let fares: App.PopularFares;
	export let module: Directus.FareModule;

	console.log(fares);

	$: top10Fares = $selectedDaysStore
		? Object.values(fares[$selectedDaysStore])
				.sort((a, b) => b.score - a.score)
				.slice(0, 12)
		: [];

	const labels: Record<string, string> = module?.translations[0]
		? module?.translations[0]?.labels.reduce((acc, lbl) => ({ ...acc, [lbl.name]: lbl.value }), {})
		: {};
</script>

{#if fares}
	{#if module?.translations[0]}
		<ul
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 grid-rows-3 gap-16 md:gap-24 my-petit"
		>
			{#each top10Fares as fare (fare.id)}
				<li
					animate:flip={{ duration: 500 }}
					in:fly={{ duration: 350, x: '100%' }}
					out:fly={{ duration: 350, x: '-100%', easing: quintOut }}
				>
					<PlainFare {fare} {labels}></PlainFare>
				</li>
			{:else}
				<li>
					<Heading type="display-tiny" style="text-common-white text-center my-normal">
						{labels['selectDays']}
					</Heading>
				</li>
			{/each}
		</ul>
	{:else}
		<div>⚠️ No translations for {module.name}</div>
	{/if}
{:else}
	<div>Cargando tarifas...</div>
{/if}
