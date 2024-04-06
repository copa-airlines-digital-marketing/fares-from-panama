<script lang="ts">
	import { ping, selectedDaysStore, selectedDestination } from '$lib/public/store';

	export let section: string;
	export let input: Directus.FormInput;
	export let action: string;

	const { label } = input;

	const handleClick = (event: Event) => {
		if ($selectedDestination && $selectedDaysStore[section]) return;

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
