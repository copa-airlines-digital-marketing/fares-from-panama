<script lang="ts">
	import { ping, selectedDaysStore, selectedDestination } from '$lib/public/store';
	import ButtonLink from '../copa/buttons/Button-Link.svelte';

	export let input: Directus.FormInput;
	export let action: string;

	const { label } = input;

	const handleClick = (event: Event) => {
		if ($selectedDestination && $selectedDaysStore) return;

		event.preventDefault();

		ping.set(true);

		setTimeout(() => {
			ping.set(false);
		}, 3000);
	};
</script>

<a href={action} on:click={handleClick} class="button text-common-white">
	{label}
</a>
