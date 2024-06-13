<script lang="ts">
	import { fade } from 'svelte/transition';
	import Icon from '../site/icon.svelte';
	import { onMount } from 'svelte';

	export let nav: Navigation;

	const { translations, icon } = nav;

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

{#if Array.isArray(translations) && translations.length === 1}
	{#if heroMenuVisible}
		<a
			aria-label="Ir al inicio"
			class="bg-secondary cursor-pointer p-16 rounded-full opacity-50 text-common-white hover:bg-red hover:opacity-100 focus:opacity-100 focus:bg-red transition z-50"
			type="button"
			href="#top"
			transition:fade
		>
			<Icon data={icon.code} class="size-32"></Icon>
		</a>
	{/if}
{:else}
	<div>⚠️ Navigation translatios are incorrect</div>
{/if}
