<script lang="ts">
	import { Slider } from 'bits-ui';

	export let form: Directus.Form;
	export let theme: Directus.Theme;

	const ipt = form.inputs[0];

	let input: any;
</script>

<form action="" class="w-full my-24 bg-primary grid justify-center">
	{#each form.inputs as input}
		{@const { label, max, min, name, options, step, type, value } = input}
		{#if type === 'range'}
			<Slider.Root
				{min}
				{max}
				{step}
				value={[parseInt(value)]}
				let:thumbs
				class="block bg-red relative"
			>
				<span class="block w-152">
					<Slider.Range class="block h-1 " />
				</span>
				{#each thumbs as thumb}
					<Slider.Thumb
						{thumb}
						class="block square-24 border-2 border-grey-75 bg-red rounded-full relative"
					></Slider.Thumb>
				{/each}
			</Slider.Root>
		{/if}
	{/each}
</form>
