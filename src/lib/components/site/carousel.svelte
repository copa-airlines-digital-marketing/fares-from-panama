<script lang="ts">
	import { createTabs, melt } from '@melt-ui/svelte';
	import Heading from '../copa/typography/heading.svelte';
	import { crossfade } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	export let carousel: Directus.Carrousel;

	const { name, slides } = carousel;

	const {
		elements: { root, list, content, trigger },
		states: { value }
	} = createTabs({
		defaultValue: 'slide-1'
	});

	const [send, receive] = crossfade({
		duration: 350,
		easing: cubicInOut
	});

	const getID = (index: number) => `slide-${index + 1}`;

	const scrollItem = ({ target }: Event) => {
		if (target instanceof Element)
			target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
	};
</script>

<div
	aria-label="Consejos para conseguir pasajes baratos"
	aria-roledescription="carousel"
	class="container-grid [grid-template-areas:'top_top_top''._title_.''._content_.''._buttons_.''bottom_bottom_bottom'] grid-rows-[auto_auto_1fr_auto_auto] portrait:h-[clamp(600px,177.78vw,100svh)] landscape:h-[clamp(500px,42.86vw,100vh)] overflow-hidden relative w-full"
	use:melt={$root}
>
	<div class="[grid-area:top] h-roomy"></div>
	<Heading type="h2" style="[grid-area:title] text-common-white mb-16">
		{name}
	</Heading>
	<div
		class="col-start-2 flex font-heading gap-8 overflow-x-auto hide-scroll py-16 row-start-4 text-12/16 text-common-white snap-x snap-mandatory"
		use:melt={$list}
	>
		<div class="w-[calc(30%-16px-60px)] md:w-[calc(50%-16px-60px)] shrink-0"></div>
		{#each slides as slide, index (index)}
			{@const id = getID(index)}
			{@const { title, imageID } = slide}
			<button
				class="focus:outline-2 focus:outline-red grid-rows-[1fr_auto] grid-cols-1 h-[160px] grid outline-offset-4 overflow-hidden relative rounded-xl snap-always snap-center shrink-0 w-120"
				on:m-focus={scrollItem}
				use:melt={$trigger(id)}
			>
				<img
					alt=""
					class="col-start-1 row-start-1 row-span-2 w-full h-full object-cover"
					loading="lazy"
					src="https://cm-marketing.directus.app/assets/{imageID}?width=120&height=160&fit=cover"
				/>
				<span
					class="bg-gradient-to-t block col-start-1 h-[160px] row-start-1 row-span-2 from-common-black"
				></span>
				{#if $value === id}
					<span
						class="bg-red block col-start-1 row-start-1 row-span-2 h-[160px] rounded-xl"
						in:send={{ key: 'trigger' }}
						out:receive={{ key: 'trigger' }}
					></span>
				{/if}
				<span class="block col-start-1 p-8 row-start-2 row-span-1 text-right">{title}</span>
			</button>
		{/each}
		<div class="w-[calc(30%-16px-60px)] md:w-[calc(50%-16px-60px)] shrink-0"></div>
	</div>
	<div
		aria-live="polite"
		class="col-start-1 col-end-3 grid grid-cols-subgrid grid-rows-subgrid row-start-1 row-span-full"
	>
		{#each slides as slide, index (index)}
			{@const id = getID(index)}
			{@const { description, imageID, title } = slide}
			{#key $value}
				<div
					aria-roledescription="slide"
					class="col-start-2 row-start-3 mb-normal"
					use:melt={$content(id)}
				>
					<Heading type="h3" style="text-common-white">
						{title}
					</Heading>
					<div class="text-common-white wysiwyg max-w-prose">
						{@html description}
					</div>
					<picture>
						<source
							media="(orientation: portrait)"
							srcset="https://cm-marketing.directus.app/assets/{imageID}?width=1080&height=1920&fit=cover&quality=80"
						/>
						<img
							alt=""
							class="absolute h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full -z-10"
							loading="lazy"
							src="https://cm-marketing.directus.app/assets/{imageID}?width=1920&height=1080&fit=cover&quality=80"
						/>
					</picture>
					<div
						class="absolute bg-gradient-to-br bottom-0 from-common-black left-0 top-0 w-full -z-10"
					></div>
				</div>
			{/key}
		{/each}
	</div>
	<div class="[grid-area:bottom] h-roomy"></div>
</div>
