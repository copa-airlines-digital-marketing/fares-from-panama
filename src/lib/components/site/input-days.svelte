<script lang="ts">
	import { ping, selectedDays } from '$lib/public/store';
	import { createRadioGroup, createTooltip, melt } from '@melt-ui/svelte';
	import Icon from './icon.svelte';
	import IconHelpFilled from '$lib/assets/icon-help-filled.svg?raw';
	import { fly } from 'svelte/transition';

	export let input: Directus.FormInput;

	export let theme: Directus.Theme;

	const { label, options, placeholder } = input;

	const defaultValue = input.value;

	const {
		elements: { root, item, hiddenInput },
		states: { value }
	} = createRadioGroup({
		defaultValue: defaultValue,
		orientation: 'horizontal'
	});

	const {
		elements: { trigger, content, arrow },
		states: { open }
	} = createTooltip({
		positioning: { placement: 'top' },
		openDelay: 0,
		closeDelay: 0,
		closeOnPointerDown: false,
		forceVisible: true
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
		class="mb-16 text-common-white text-14/20 text-center {theme === 'dark'
			? 'text-grey-600'
			: 'text-common-white'}"
	>
		<span class="relative">
			{label}
			{#if $ping && !$selectedDays}
				<div class="absolute animate-ping bg-red -left-8 rounded-full size-16 -top-8"></div>
			{/if}
			<button
				class="absolute -right-20 -top-8 {theme === 'light' ? 'text-common-white' : 'text-primary'}"
				type="button"
				use:melt={$trigger}
				aria-label="¿Qué es esto?"
			>
				<Icon data={IconHelpFilled} class="size-16 fill-current"></Icon>
			</button>
			{#if $open}
				<div
					class="bg-backgound-lightblue max-w-prose p-8 rounded-lg shadow-medium z-10"
					transition:fly
					use:melt={$content}
				>
					<div use:melt={$arrow}></div>
					<p class="text-12/16 text-grey-600">{placeholder}</p>
				</div>
			{/if}
		</span>
	</div>
	<div class="grid auto-cols-auto grid-flow-col gap-16 justify-center">
		{#each toRadioOptions as option}
			<button
				use:melt={$item(option)}
				class="cursor-pointer text-20/24 border-2 {themeColor} border-current size-48 grid place-content-center rounded-full hover:border-secondary hover:bg-secondary hover:text-common-white transition-colors outline-2 outline-offset-4 focus:bg-secondary focus:border-secondary focus:outline focus:outline-secondary focus:text-common-white data-[state=checked]:bg-red data-[state=checked]:border-red data-[state=checked]:text-common-white data-[state=checked]:focus:outline-red"
			>
				<span class="cursor-pointer font-heading font-heading-bold">
					{option}
				</span>
			</button>
		{/each}
	</div>
	<input type="hidden" use:melt={$hiddenInput} on:change={setSelectedDays($value)} />
</div>
