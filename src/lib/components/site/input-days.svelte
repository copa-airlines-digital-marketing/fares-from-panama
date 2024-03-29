<script lang="ts">
	import { selectedDays } from '$lib/public/store';
	import { createRadioGroup, melt } from '@melt-ui/svelte';

	export let input: Directus.FormInput;

	export let theme: Directus.Theme;

	const { label, options } = input;

	const defaultValue = input.value;

	const {
		elements: { root, item, hiddenInput },
		states: { value }
	} = createRadioGroup({
		defaultValue: defaultValue,
		orientation: 'horizontal'
	});

	const toRadioOptions = options.map((opiton) => opiton.value);

	const themeColor = theme === 'dark' ? 'text-primary' : 'text-common-white';

	const setSelectedDays = (value: string) => () => selectedDays.set(value);

	$: {
		$value = $selectedDays;
	}
</script>

<div class="my-32" use:melt={$root}>
	<div
		class="text-common-white text-14/20 text-center mb-16 {theme === 'dark'
			? 'text-grey-600'
			: 'text-common-white'}"
	>
		{label}
	</div>
	<div class="grid auto-cols-auto grid-flow-col gap-16 justify-center">
		{#each toRadioOptions as option}
			<button
				use:melt={$item(option)}
				class="cursor-pointer text-20/24 border-2 {themeColor} border-current size-48 grid place-content-center rounded-full hover:border-secondary hover:bg-secondary hover:text-common-white transition-colors outline-none focus:bg-secondary focus:border-secondary focus:text-common-white data-[state=checked]:bg-red data-[state=checked]:border-red data-[state=checked]:text-common-white"
			>
				<span class="cursor-pointer font-heading font-heading-bold">
					{option}
				</span>
			</button>
		{/each}
	</div>
	<input type="hidden" use:melt={$hiddenInput} on:change={setSelectedDays($value)} />
</div>
