<script lang="ts">
	import InputDestination from '../site/input-destination.svelte';
	import InputSlider from '../site/input-slider.svelte';

	export let form: Directus.Form;
	export let component_name: string;
</script>

<form class="my-24 grid max-w-[320px] mx-auto">
	{#each form.inputs as input}
		{@const { value, label } = input}
		{#if component_name === 'budget'}
			<InputSlider {input}></InputSlider>
		{:else if component_name === 'destination'}
			<InputDestination {input}></InputDestination>
		{:else}
			<div>⚠️ Unsupported input: {component_name}</div>
		{/if}
	{/each}
</form>
