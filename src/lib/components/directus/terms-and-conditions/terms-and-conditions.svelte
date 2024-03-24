<script lang="ts">
	import Heading from '$lib/components/copa/typography/heading.svelte';

	export let terms: Directus.TermsAndConditions;

	const translation = terms.translations[0];
</script>

<Heading type="h2" style="text-primary">
	{translation?.title}
</Heading>
<p class="text-grey-600 mt-16">
	{@html translation?.termAndConditions}
</p>
