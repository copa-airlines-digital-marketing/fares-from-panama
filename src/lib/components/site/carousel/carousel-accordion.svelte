<script lang="ts">
	import { Accordion } from 'bits-ui';
	import Icon from '../icon.svelte';
	import Caret from '$lib/assets/icon-carret-down.svg?raw';
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Heading from '$lib/components/copa/typography/heading.svelte';

	export let description: string;
	export let slides: Directus.CarrouselSlide[];
	export let name: string;

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

<div class="bg-backgound-paper container-grid pb-petit pt-huge text-center">
	<Heading type="h2" style="col-start-2 text-primary">{name}</Heading>
	<p class="col-start-2 max-w-prose mx-auto my-minimal text-grey-600">{description}</p>
</div>
<Accordion.Root class="auto-rows-auto container-grid relative">
	{#each slides as { title, description, imageID }}
		<Accordion.Item class="col-full grid grid-cols-subgrid grid-rows-[auto_auto_8px]" value={title}>
			<Accordion.Header
				class="col-full grid grid-cols-subgrid grid-rows-subgrid row-start-1 row-span-full"
				level={3}
			>
				<Accordion.Trigger
					class="border-b border-b-grey-200 col-full focus:border-b-red font-heading font-heading-bold grid grid-cols-subgrid grid-rows-subgrid group hover:border-b-red lg:text-h3 outline-none row-start-1 row-span-full text-h3 transition-colors w-full"
				>
					<span
						class="bg-center bg-cover block col-start-1 col-full h-full row-start-1 row-span-full relative"
						style="background-image: url('https://cm-marketing.directus.app/assets/{imageID}?width=20&access_token=4_9wJcm9uVEPXkV_3JKynLk0B4aZZ4PU');"
					>
						<img
							alt=""
							bind:this={images[title]}
							class="absolute data-[loaded]:opacity-100 duration-300 ease-in-out h-full object-cover opacity-0 transition-opacity w-full"
							loading="lazy"
							src="https://cm-marketing.directus.app/assets/{imageID}?width=960&access_token=4_9wJcm9uVEPXkV_3JKynLk0B4aZZ4PU"
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
							class="block group-[&[data-state='open']]:rotate-180 group-focus:text-red group-hover:text-red transition-transform duration-300 ease-in-out"
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
