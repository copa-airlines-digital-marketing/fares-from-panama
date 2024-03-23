<script lang="ts">
	export let contents: Directus.PageSectionContent[];

	const collectionIsValidItem = <T extends Directus.MFAItem>(
		collectionValue: Directus.ContentCollectionNames,
		collection: Directus.ContentCollectionNames,
		item: Directus.MFAItem
	): item is T => collection === collectionValue && item != null;
</script>

{#each contents as content}
	<div>{content.collection}</div>
	{@const { collection, item } = content}
	{#if collectionIsValidItem('navigation', collection, item)}
		navigation
	{:else if collectionIsValidItem('terms_and_conditions', collection, item)}
		terms and conditions
	{:else}
		<div>Unsupported collection: {collection}</div>
	{/if}
{/each}
