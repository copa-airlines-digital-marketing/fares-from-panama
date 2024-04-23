<script lang="ts">
	import InputBuscar from '../site/input-buscar.svelte';
	import InputDays from '../site/input-days.svelte';
	import InputDestination from '../form/input-destination.svelte';
	import InputSlider from '../site/input-slider.svelte';

	export let section: string;
	export let form: Directus.Form;
	export let component_name: string;
	export let theme: Directus.Theme;

	const { action } = form;
</script>

<form class="max-w-[480px] mx-auto">
	{#each form.inputs as input}
		{@const { value, label } = input}
		{#if component_name === 'budget'}
			<InputSlider {input}></InputSlider>
		{:else if component_name === 'days'}
			<InputDays {theme} {input} {section}></InputDays>
		{:else if component_name === 'destination'}
			<InputDestination item={input}></InputDestination>
		{:else if component_name === 'buscar'}
			<InputBuscar {action} {input} {section}></InputBuscar>
		{:else}
			<div>⚠️ Unsupported input: {component_name}</div>
		{/if}
	{/each}
</form>
