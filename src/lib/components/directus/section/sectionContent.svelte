<script lang="ts">
	import Copyright from '../copyright/copyright.svelte';
	import FollowButtons from '../follow/follow-buttons.svelte';
	import TermsAndConditions from '../terms-and-conditions/terms-and-conditions.svelte';

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
	{@const { collection, item, display, vertical_alignment, horizontal_alignment } = content}
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
		{:else if collectionIsValidItem('terms_and_conditions', collection, item)}
			<TermsAndConditions terms={item}></TermsAndConditions>
		{:else}
			<div>Unsupported collection: {collection}</div>
		{/if}
	</div>
{/each}
