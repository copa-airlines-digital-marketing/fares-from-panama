<script lang="ts">
	import { createCollapsible, createMenubar, melt } from '@melt-ui/svelte';
	import Icon from './icon.svelte';
	import { slide, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { containsDiscounts } from '$lib/public/store';

	export let nav: Directus.Navigation;

	const { translations, icon } = nav;

	const linksElements: Record<string, HTMLElement> = {};

	const getLinkId = (index: number) => `hero-nav-link-${index}`;

	const {
		elements: { root, content, trigger },
		states: { open }
	} = createCollapsible({
		forceVisible: true
	});

	const {
		elements: { menubar }
	} = createMenubar();

	let heroMenuVisible = false;

	let isMenuVisible: IntersectionObserverCallback = (entries) => {
		entries.forEach((entry) => {
			if (entry.target.id === 'hero-nav' && entry.isIntersecting) {
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
		const target = document.getElementById('hero-nav');
		target ? observer.observe(target) : {};
	});
</script>

{#if Array.isArray(translations) && translations.length === 1}
	{@const { links } = translations[0]}

	<div class="relative" use:melt={$root}>
		{#if heroMenuVisible}
			<button
				aria-label="Ver menú principal"
				class="bg-secondary cursor-pointer p-16 rounded-full opacity-50 text-common-white hover:bg-red hover:opacity-100 focus:opacity-100 focus:bg-red transition"
				type="button"
				use:melt={$trigger}
				transition:fade
			>
				<Icon data={icon.code} class="size-32"></Icon>
			</button>
		{/if}
		<div
			class="absolute bg-secondary top-[calc(100%+8px)] flex flex-col justify-center left-1/2 rounded-xl -translate-x-1/2"
			use:melt={$menubar}
		>
			{#each links as linkItem, index (index)}
				{@const {
					icon_override: { code },
					links_url: { url },
					title
				} = linkItem}
				{#if $open && heroMenuVisible && ((title === 'Descuentos' && $containsDiscounts) || title !== 'Descuentos')}
					<a
						class="flex flex-col focus:text-primary gap-4 hover:text-primary items-center mx-4 my-8 outline-none text-common-white transition-colors"
						href={url}
						{title}
						use:melt={$content}
						transition:slide={{ duration: 500, easing: quintOut }}
					>
						<span bind:this={linksElements[getLinkId(index + 1)]}>
							<Icon data={code} class="size-24 fill-current"></Icon>
						</span>
						<span class="text-12/16 text-common-white">{title}</span>
					</a>
				{/if}
			{/each}
		</div>
	</div>
{:else}
	<div>⚠️ Navigation translatios are incorrect</div>
{/if}
