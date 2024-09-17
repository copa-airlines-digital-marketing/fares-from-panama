<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	let heroMenuVisible = false;

	let isMenuVisible: IntersectionObserverCallback = (entries) => {
		entries.forEach((entry) => {
			if (entry.target.id === 'top' && entry.isIntersecting) {
				return (heroMenuVisible = false);
			}

			return (heroMenuVisible = true);
		});
	};

	onMount(() => {
		let observer = new IntersectionObserver(isMenuVisible, {
			root: null,
			rootMargin: '0px',
			threshold: 1.0
		});
		const target = document.getElementById('top');
		target ? observer.observe(target) : {};
	});
</script>

<a
	aria-label="Ir al inicio"
	class="bg-secondary cursor-pointer p-16 block size-64 rounded-full opacity-50 text-common-white hover:bg-red hover:opacity-100 focus:opacity-100 focus:bg-red transition z-50"
	type="button"
	href="#top"
	transition:fade
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="size-32"
		width="1em"
		height="1em"
		viewBox="0 0 24 24"
		><path
			fill="currentColor"
			fill-rule="evenodd"
			d="M6.47 10.03a.75.75 0 0 1 0-1.06l5-5a.75.75 0 0 1 1.06 0l5 5a.75.75 0 1 1-1.06 1.06l-3.72-3.72v8.19c0 .713.22 1.8.859 2.687c.61.848 1.635 1.563 3.391 1.563a.75.75 0 0 1 0 1.5c-2.244 0-3.72-.952-4.609-2.187c-.861-1.196-1.141-2.61-1.141-3.563V6.31l-3.72 3.72a.75.75 0 0 1-1.06 0"
			clip-rule="evenodd"
		/></svg
	>
</a>
