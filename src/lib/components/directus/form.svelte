<script lang="ts">
	import InputDays from '../site/input-days.svelte';
	import InputDestination from '../site/input-destination.svelte';
	import InputSlider from '../site/input-slider.svelte';

	export let form: Directus.Form;
	export let component_name: string;
	export let theme: Directus.Theme;
</script>

<form class="my-24 max-w-[320px] mx-auto">
	{#each form.inputs as input}
		{@const { value, label } = input}
		{#if component_name === 'budget'}
			<InputSlider {input}></InputSlider>
		{:else if component_name === 'days'}
			<InputDays {theme} {input}></InputDays>
		{:else if component_name === 'destination'}
			<InputDestination item={input}></InputDestination>
		{:else}
			<div>⚠️ Unsupported input: {component_name}</div>
		{/if}
	{/each}
</form>
