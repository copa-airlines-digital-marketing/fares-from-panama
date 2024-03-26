<script lang="ts">
	import { Slider } from 'bits-ui';

	export let form: Directus.Form;
	export let theme: Directus.Theme;

	const ipt = form.inputs[0];

	$: range = [850];
</script>

<form action="" class="my-24 grid max-w-[320px] mx-auto">
	{#each form.inputs as input}
		{@const { label, max, min, name, options, step, type } = input}
		{@const defaultValue = input.value}
		{#if type === 'range'}
			<div class="w-full max-w-[320px]">
				<label for={name} class="block text-grey-600 my-8 text-14/20 text-center caret-transparent"
					>{label}</label
				>
				<Slider.Root
					{min}
					{max}
					{step}
					bind:value={range}
					let:thumbs
					id={name}
					class="flex items-center mb-24 h-24 w-full relative caret-transparent touch-none select-none"
				>
					<span class="block w-full bg-grey-200 h-4 rounded-full relative overflow-hidden">
						<Slider.Range class="absolute h-full bg-red transition-all" />
					</span>
					{#each thumbs as thumb}
						<Slider.Thumb
							{thumb}
							asChild
							let:builder
							class="block square-24 border-8 border-red bg-red rounded-full shadow-medium cursor-pointer outline-none transition-all hover:bg-system-error focus:border-grey-75 active:scale-95"
						>
							<span
								{...builder}
								class="block square-24 border-8 border-red bg-red rounded-full shadow-medium cursor-pointer outline-none transition-all hover:bg-system-error focus:border-grey-75 active:scale-95 top-1/2 -translate-y-1/2 -translate-x-1/2"
							>
								<span
									class="absolute transition-all top-[calc(100%_+_16px)] block left-1/2 -translate-x-1/2 text-12/16 text-center bg-grey-800 py-4 px-8 rounded text-common-white"
									>{range}&nbsp;USD</span
								>
							</span>
						</Slider.Thumb>
					{/each}
				</Slider.Root>
			</div>
		{/if}
	{/each}
</form>
