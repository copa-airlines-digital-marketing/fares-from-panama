<script lang="ts">
	import Icon from './icon.svelte';
	import IconError from '$lib/assets/icon-error.svg?raw';
	import Logo from '$lib/assets/tarifas-viaja-panama-logo-white.svg?raw';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	export let text: string;
	export let error: boolean = false;
	export let loading: boolean = true;

	const classes = ['animate-pulse'];
</script>

<div
	class="h-svh w-full grid place-content-center bg-gradient-to-r from-primary to-secondary via-primary-light via-75% relative"
	out:fly={{ duration: 350, easing: quintOut, y: -100 }}
>
	<div class="flex flex-col gap-16 text-common-white">
		{#if error}
			<Icon data={IconError} class="size-32 fill-system-error"></Icon>
		{/if}
		{#if loading}
			<Icon data={Logo} class="w-full max-w-240 fill-system-error"></Icon>
		{/if}
		<p
			class="font-heading text-display-normal sm:text-display-normal-sm md:text-display-normal-md lg:text-display-normal-lg font-heading-bold max-w-prose"
			class:animate-pulse={loading}
		>
			{text}
		</p>
	</div>
</div>
