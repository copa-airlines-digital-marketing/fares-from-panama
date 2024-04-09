<script lang="ts">
	import { Accordion } from 'bits-ui';
	import Icon from '../icon.svelte';
	import Caret from '$lib/assets/icon-carret-down.svg?raw';
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';

	export let slides: Directus.CarrouselSlide[];

	let images: Record<string, HTMLImageElement> = {};
	let imageHolders: Record<string, HTMLSpanElement> = {};

	const removeLoading = (id: string) => {
		if (!!images[id]) images[id].setAttribute('data-loaded', 'true');
		if (!!imageHolders[id]) imageHolders[id].setAttribute('data-loaded', 'true');
	};

	const setLoadedImage = (id: string) => () => {
		removeLoading(id);
	};

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

<Accordion.Root class="auto-rows-auto container-grid relative">
	{#each slides as { title, description, imageID }}
		<Accordion.Item class="col-full grid grid-cols-subgrid grid-rows-[auto_auto_8px]" value={title}>
			<Accordion.Header
				class="col-full grid grid-cols-subgrid grid-rows-subgrid row-start-1 row-span-full"
				level={3}
			>
				<Accordion.Trigger
					class="border-b border-b-grey-200 col-full grid grid-cols-subgrid grid-rows-subgrid font-heading font-heading-bold group lg:text-h3 row-start-1 row-span-full text-h3 w-full"
				>
					<span
						class="bg-center bg-cover block col-start-1 col-full h-full row-start-1 row-span-full relative"
						style="background-image: url('https://cm-marketing.directus.app/assets/{imageID}?width=20');"
					>
						<img
							alt=""
							bind:this={images[title]}
							class="absolute data-[loaded]:opacity-100 duration-300 ease-in-out h-full object-cover opacity-0 transition-opacity w-full"
							loading="lazy"
							src="https://cm-marketing.directus.app/assets/{imageID}?width=960"
						/>
						<span
							bind:this={imageHolders[title]}
							class="absolute bg-common-black/35 block group-[&[data-state='open']]:bg-common-black/50 data-[loaded]:animate-none h-full animate-pulse transition-colors w-full"
						></span>
					</span>
					<span
						class="col-start-2 flex p-petit place-content-between row-start-1 text-common-white z-0"
					>
						<span class="block">{title}</span>
						<span
							class="block group-[&[data-state='open']]:rotate-180 transition-transform duration-300 ease-in-out"
						>
							<Icon data={Caret} class="size-24 fill-current"></Icon>
						</span>
					</span>
				</Accordion.Trigger>
			</Accordion.Header>
			<Accordion.Content
				class="col-start-2 p-petit row-start-2 z-0"
				transition={slide}
				transitionConfig={{ duration: 350 }}
			>
				<span class="wysiwyg text-common-white">
					{@html description}
				</span>
			</Accordion.Content>
		</Accordion.Item>
	{/each}
</Accordion.Root>
