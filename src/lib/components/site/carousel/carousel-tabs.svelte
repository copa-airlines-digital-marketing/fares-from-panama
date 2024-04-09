<script lang="ts">
	import Heading from '$lib/components/copa/typography/heading.svelte';
	import Icon from '../icon.svelte';
	import Caret from '$lib/assets/icon-carret-down.svg?raw';
	import { Tabs } from 'bits-ui';
	import { onMount } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	export let description: string;
	export let slides: Directus.CarrouselSlide[];
	export let name: string;

	const [send, receive] = crossfade({
		duration: 350,
		easing: cubicInOut
	});

	let images: Record<string, HTMLImageElement> = {};
	let imageHolders: Record<string, HTMLSpanElement> = {};

	const removeLoading = (id: string) => {
		if (!!images[id]) images[id].setAttribute('data-loaded', 'true');
		if (!!imageHolders[id]) imageHolders[id].setAttribute('data-loaded', 'true');
	};

	const setLoadedImage = (id: string) => () => {
		removeLoading(id);
	};

	$: value = '';

	onMount(() => {
		Object.keys(images).forEach((id) => {
			const img = images[id];

			if (img.complete) {
				removeLoading(id);
				return;
			}

			img.addEventListener('load', setLoadedImage(id), false);
		});
	});
</script>

<div
	class="grid grid-cols-[72px_2fr_4fr_72px] lg:grid-cols-[1fr_calc(1024px_*_0.30)_calc(1024px_*_0.70)_1fr] grid-rows-[auto_auto_1fr_auto] relative"
>
	<div class="col-start-2 col-span-2 my-petit row-start-2 text-center text-common-white">
		<Heading type="h2" style="text-current">{name}</Heading>
		<p class="max-w-prose mx-auto my-minimal">{description}</p>
	</div>
	<Tabs.Root
		bind:value
		class="col-full grid grid-cols-subgrid grid-rows-subgrid row-span-full"
		orientation="vertical"
	>
		<Tabs.List class="col-start-2 flex flex-col mr-24 row-start-3">
			{#each slides as { title }}
				<Tabs.Trigger
					class="caret-transparent font-heading font-heading-bold group focus:bg-primary/30 hover:bg-primary/30 outline-none text-h3 lg:text-h3 justify-self-center relative text-common-white text-left transition-colors z-0"
					value={title}
				>
					<span
						class="border-b border-b-grey-200 flex items-center place-content-between p-16 w-full"
					>
						<span>{title}</span>
						<span
							class="-rotate-90 duration-300 group-[[data-state='active']]:rotate-90 transition-transform"
						>
							<Icon data={Caret} class="size-24"></Icon>
						</span>
					</span>
					{#if value === title}
						<span
							class="absolute bg-red h-4/5 left-4 rounded-full top-[10%] w-4"
							in:send={{ key: 'trigger' }}
							out:receive={{ key: 'trigger' }}
						></span>
					{/if}
				</Tabs.Trigger>
			{/each}
		</Tabs.List>
		{#each slides as { title, description, imageID }}
			<Tabs.Content
				class="col-start-1 col-full grid-cols-subgrid grid-rows-subgrid group [&:not([hidden])]:grid outline-none row-start-1 row-span-full"
				value={title}
			>
				<div class="col-start-1 h-huge row-start-1"></div>
				<div
					class="bg-cover col-start-1 col-full relative row-start-1 row-span-full -z-10"
					style="background-image: url('https://cm-marketing.directus.app/assets/{imageID}?width=50');"
				>
					<img
						alt=""
						bind:this={images[title]}
						class="absolute data-[loaded]:opacity-100 duration-300 ease-in-out h-full object-cover opacity-0 w-full"
						loading="lazy"
						src="https://cm-marketing.directus.app/assets/{imageID}?width=1920"
					/>
					<div
						bind:this={imageHolders[title]}
						class="absolute animate-pulse bg-common-black/60 data-[loaded]:animate-none h-full w-full"
					></div>
				</div>
				<div
					class="border-b border-b-transparent col-start-3 group-focus:bg-primary/30 group-focus:border-b-primary/30 p-24 row-start-3 text-common-white z-0"
				>
					<div class="caret-transparent max-w-prose wysiwyg">
						{@html description}
					</div>
				</div>
				<div class="col-start-1 h-huge row-start-4"></div>
			</Tabs.Content>
		{/each}
	</Tabs.Root>
</div>
