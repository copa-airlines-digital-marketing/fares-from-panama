<script>
	import { slide } from 'svelte/transition';

	export let pulse = false;
</script>

<div
	class="flex col-start-1 col-full gap-x-8 items-center justify-center row-start-1 row-span-full"
	class:animate-pulse={pulse}
	transition:slide={{ duration: 350 }}
>
	<slot />
</div>
