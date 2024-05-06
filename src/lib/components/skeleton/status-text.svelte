<script>
	import { slide } from 'svelte/transition';

	export let pulse = false;
</script>

<div
	class="flex flex-col items-center text-center justify-center gap-4"
	class:animate-pulse={pulse}
	transition:slide={{ duration: 350, axis: 'y' }}
>
	<slot />
</div>
