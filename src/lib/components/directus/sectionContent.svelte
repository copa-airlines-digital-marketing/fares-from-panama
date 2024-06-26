<script lang="ts">
	import Carousel from '$lib/components/site/carousel/carousel.svelte';
	import Copyright from '$lib/components/site/copyright.svelte';
	import FollowButtons from '$lib/components/site/follow-buttons.svelte';
	import TermsAndConditions from '$lib/components/site/terms-and-conditions.svelte';
	import Form from '$lib/components/directus/form.svelte';
	import TextContent from '$lib/components/directus/text-content.svelte';
	import {
		itemIsCarrousel,
		itemIsCopyrights,
		itemIsFareModule,
		itemIsFollowButtons,
		itemIsForm,
		itemIsTermsAndConditions,
		itemIsTextContent
	} from '$lib/components/directus/utils';
	import { addToast } from '../site/toast.svelte';
	import { FareModule } from '../fare-modules';
	import { setContext } from 'svelte';
	import { setBudgetContext } from '../budget/context';
	import { writable } from 'svelte/store';
	import { symbol } from 'zod';

	export let section: string;
	export let contents: Directus.PageSectionContent[];

	const displayMap: Record<Directus.ContentDisplay, string> = {
		'100': 'col-span-1 sm:col-span-2 md:col-span-4',
		'75': 'col-span-1 sm:col-span-2 md:col-span-3',
		'50': 'col-span-1 md:col-span-2',
		'25': 'col-span-1'
	};

	const alignSelf: Record<Directus.VerticalAlignment, string> = {
		top: 'self-start',
		center: 'self-center',
		bottom: 'self-end',
		stretch: 'self-stretch',
		baseline: 'self-baseline'
	};

	const justifySelf: Record<Directus.HorizontalAlignment, string> = {
		left: 'justify-self-start',
		center: 'justify-self-center',
		right: 'justify-self-end',
		stretch: 'self-stretch'
	};

	const cleanedContents = contents.filter((content) => content.component_name !== 'toast');

	const toasts = contents.filter((content) => content.component_name === 'toast');

	setContext('section', section);

	setBudgetContext(0);

	setContext('sectionSteps', writable([]));

	const showToast = () => {
		const { item, collection } = toasts[0];

		if (!itemIsTextContent(item))
			return addToast({
				data: {
					name: '',
					icon: { code: '', image: '', name: '' },
					translations: [
						{
							title: '⚠️ Unsupported Collection for a Toast',
							description: `Collection: ${collection}`
						}
					]
				}
			});

		return addToast({ data: item });
	};

	setContext('showToast', showToast);
</script>

{#each cleanedContents as content}
	{@const {
		collection,
		item,
		display,
		vertical_alignment,
		horizontal_alignment,
		theme,
		component_name
	} = content}
	{@const className = [
		displayMap[display],
		alignSelf[vertical_alignment],
		justifySelf[horizontal_alignment]
	].join(' ')}
	<div class={className} data-mode={theme}>
		{#if itemIsCopyrights(item)}
			<Copyright copyrights={item}></Copyright>
		{:else if itemIsFareModule(item)}
			<FareModule {component_name} content={item}></FareModule>
		{:else if itemIsFollowButtons(item)}
			<FollowButtons followButtons={item}></FollowButtons>
		{:else if itemIsForm(item)}
			<Form form={item} {component_name} {section}></Form>
		{:else if itemIsTermsAndConditions(item)}
			<TermsAndConditions terms={item}></TermsAndConditions>
		{:else if itemIsCarrousel(item)}
			<Carousel carousel={item}></Carousel>
		{:else if itemIsTextContent(item)}
			<TextContent content={item} {theme} {component_name}></TextContent>
		{:else}
			<div>⚠️ Unsupported collection: {collection}</div>
		{/if}
	</div>
{/each}
