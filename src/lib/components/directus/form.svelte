<script lang="ts">
	import FormBudget from '../site/form-budget.svelte';
	import FormStay from '../site/form-stay.svelte';
	import FormDestination from '../site/form-destination.svelte';

	export let form: Directus.Form;
	export let component_name: string;
	export let theme: Directus.Theme;

	console.log('form', form);
</script>

{#if component_name === 'budget'}
	<FormBudget {form} {theme}></FormBudget>
{:else if component_name === 'stay'}
	<FormStay></FormStay>
{:else if component_name === 'destination'}
	<FormDestination></FormDestination>
{:else}
	<div>⚠️ unsupported Form: {component_name}</div>
{/if}
