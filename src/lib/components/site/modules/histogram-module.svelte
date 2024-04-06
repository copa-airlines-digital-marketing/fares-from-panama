<script lang="ts">
	import HistogramDatesModule from './histogram-dates-module.svelte';
	import HistogramFaresModule from './histogram-fares-module.svelte';
	import HistogramMonthModule from './histogram-month-module.svelte';

	export let section: string;
	export let months: App.LowestFareByMonth;
	export let dates: App.LowestFareByDate;
	export let fares: App.FaresByDate;
	export let module: Directus.FareModule;
</script>

{#if months && dates && fares}
	{#if module?.translations[0]}
		<div>
			<HistogramMonthModule {months} {dates} {module} {section}></HistogramMonthModule>
		</div>
		<div>
			<HistogramDatesModule {dates} {fares} {module} {section}></HistogramDatesModule>
		</div>
		<div>
			<HistogramFaresModule {fares} {module} {section}></HistogramFaresModule>
		</div>
	{:else}
		<div>⚠️ No translations for {module.name}</div>
	{/if}
{:else}
	<div>Cargando tarifas...</div>
	|
{/if}
