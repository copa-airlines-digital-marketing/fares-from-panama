<script lang="ts">
	import { onMount } from 'svelte';

	export let carousel: Directus.Carrousel;

	const { autoSlide, autoSlideDelayMS, slides } = carousel;

	const shufledSlides = slides
		.map((slide) => ({ slide, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ slide }) => slide);

	const slidesElements: Record<string, HTMLElement> = {};

	const getSlideId = (index: number) => `hero-slide-${index}`;

	const moveToNext = (currentIndex: number) => {
		const nextIndex = currentIndex === Object.keys(slidesElements).length ? 1 : currentIndex + 1;
		const prevIndex = currentIndex;
		slidesElements[getSlideId(prevIndex)].setAttribute('style', 'opacity: 0');
		slidesElements[getSlideId(nextIndex)].setAttribute('style', 'opacity: 1');
		return nextIndex;
	};

	let currentIndex = 1;

	onMount(() => {
		slidesElements[getSlideId(currentIndex)].setAttribute('style', 'opacity: 1');
		if (autoSlide)
			setInterval(() => {
				currentIndex = moveToNext(currentIndex);
			}, autoSlideDelayMS);
	});
</script>

<div class="h-full overflow-hidden relative">
	{#each shufledSlides as slide, index (index)}
		{@const { title, imageID } = slide}
		<div
			bind:this={slidesElements[getSlideId(index + 1)]}
			class="absolute duration-[1500ms] ease-in-out left-0 opacity-0 top-0 transition-opacity w-full h-full"
		>
			<div
				class="bg-center bg-cover h-full landscape:hidden w-full"
				style="background-image:url('https://cm-marketing.directus.app/assets/{imageID}?width=1080&height=1920&quality=80')"
			></div>
			<div
				class="bg-center bg-cover h-full portrait:hidden w-full"
				style="background-image:url('https://cm-marketing.directus.app/assets/{imageID}?width=1920&quality=80')"
			></div>
		</div>
	{/each}
</div>
