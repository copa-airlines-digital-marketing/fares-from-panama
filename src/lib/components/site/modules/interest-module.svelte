<script lang="ts">
	import InterestFareModule from './interest-fare-module.svelte';
	import InterestLowestModule from './interest-lowest-module.svelte';

	export let interestLowest: App.LowestFareByInterest;
	export let module: Directus.FareModule;
	export let interestFares: App.InterestFares;
</script>

{#if interestLowest && interestFares}
	{#if module?.translations[0]}
		<div>
			<InterestLowestModule {interestLowest} {module} {interestFares}></InterestLowestModule>
		</div>
		<div>
			<InterestFareModule {module} {interestFares}></InterestFareModule>
		</div>
	{:else}
		<div>⚠️ No translations for {module.name}</div>
	{/if}
{:else}
	<div>Cargando tarifas...</div>
{/if}
