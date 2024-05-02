<script lang="ts">
	import InputSlider from '../budget/input-slider.svelte';
	import { DaysInput } from '../days';
	import InputDestination from '../destination/input-destination.svelte';

	export let section: string;
	export let form: Directus.Form;
	export let component_name: string;
</script>

<form class="max-w-[400px] mx-auto">
	{#each form.inputs as input}
		{#if component_name === 'budget'}
			<InputSlider {input}></InputSlider>
		{:else if component_name === 'days'}
			<DaysInput sectionId={section} {input}></DaysInput>
		{:else if component_name === 'destination'}
			<InputDestination item={input}></InputDestination>
		{:else}
			<div>⚠️ Unsupported input: {component_name}</div>
		{/if}
	{/each}
</form>
