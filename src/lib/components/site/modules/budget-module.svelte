<script lang="ts">
	import { selectedBudgetStore, selectedDaysStore } from '$lib/public/store';
	import Heading from '../../copa/typography/heading.svelte';
	import FareCard from '$lib/components/site/portrait-dest-background-fare.svelte';

	export let fares: App.BudgetFares;
	export let module: Directus.FareModule;

	console.log(module);

	$: top10Fares = $selectedDaysStore
		? Object.values(fares[$selectedDaysStore])
				.filter((fare) => parseInt(fare.price) <= $selectedBudgetStore)
				.sort((a, b) => parseInt(a.price) - parseInt(b.price))
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
					<FareCard {fare} {labels}></FareCard>
				</li>
			{:else}
				<li>
					<Heading type="display-tiny" style="text-grey-600 text-center my-normal">
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
