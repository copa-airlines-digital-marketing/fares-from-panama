<script lang="ts">
	import { selectedDaysStore } from '$lib/public/store';
	import Heading from '../../copa/typography/heading.svelte';
	import PlainFare from '../plain-fare.svelte';

	export let fares: App.PopularFares;
	export let module: Directus.FareModule;

	console.log(module);

	$: top10Fares = $selectedDaysStore
		? Object.values(fares[$selectedDaysStore])
				.sort((a, b) => b.score - a.score)
				.slice(0, 10)
		: [];

	const labels: Record<string, string> = module?.translations[0]
		? module?.translations[0]?.labels.reduce((acc, lbl) => ({ ...acc, [lbl.name]: lbl.value }), {})
		: {};
</script>

{#if fares}
	{#if module?.translations[0]}
		<ul>
			{#each top10Fares as fare}
				<li>
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
