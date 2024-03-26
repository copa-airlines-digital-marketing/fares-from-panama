<script lang="ts">
	import Copyright from '../site/copyright.svelte';
	import FollowButtons from '../site/follow-buttons.svelte';
	import TermsAndConditions from '../site/terms-and-conditions.svelte';
	import Form from './form.svelte';
	import TextContent from './text-content.svelte';

	export let contents: Directus.PageSectionContent[];

	const collectionIsValidItem = <T extends Directus.MFAItem>(
		collectionValue: Directus.ContentCollectionNames,
		collection: Directus.ContentCollectionNames,
		item: Directus.MFAItem
	): item is T => collection === collectionValue && item != null;

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
</script>

{#each contents as content}
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
	<div class={className}>
		{#if collectionIsValidItem('copyrights', collection, item)}
			<Copyright copyrights={item}></Copyright>
		{:else if collectionIsValidItem('follow_buttons', collection, item)}
			<FollowButtons followButtons={item}></FollowButtons>
		{:else if collectionIsValidItem('form', collection, item)}
			<Form form={item} {component_name} {theme}></Form>
		{:else if collectionIsValidItem('terms_and_conditions', collection, item)}
			<TermsAndConditions terms={item}></TermsAndConditions>
		{:else if collectionIsValidItem('Text_Content', collection, item)}
			<TextContent content={item} {theme} {component_name}></TextContent>
		{:else}
			<div>Unsupported collection: {collection}</div>
		{/if}
	</div>
{/each}
