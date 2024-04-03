<script lang="ts">
	import CalendarFareModule from './calendar-fare-module.svelte';
	import CalendarMonthModule from './calendar-month-module.svelte';
	import InterestLowestModule from './interest-lowest-module.svelte';

	export let months: App.LowestFareByMonthAndDestination;
	export let calendar: App.FaresByDateOfDestination;
	export let module: Directus.FareModule;
</script>

{#if months && calendar}
	{#if module?.translations[0]}
		<div><CalendarMonthModule {months} {calendar} {module}></CalendarMonthModule></div>
		<div><CalendarFareModule {calendar} {module}></CalendarFareModule></div>
	{:else}
		<div>⚠️ No translations for {module.name}</div>
	{/if}
{:else}
	<div>Cargando tarifas...</div>
{/if}
