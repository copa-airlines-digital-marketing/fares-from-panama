<script lang="ts">
	import { formatDateForDisplay, getShoppingEngingeURL, parseDate } from '$lib/public/utils';

	export let fare: Directus.Fare;
	export let labels: Record<string, string>;

	const { price, taxes } = fare;
</script>

<a href={getShoppingEngingeURL(fare)}>
	<span>{labels['return']}</span>
	<span>{labels['currency']}{price}</span>
	<span>{labels['taxes']}{taxes}</span>
</a>
