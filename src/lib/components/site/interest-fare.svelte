<script lang="ts">
	export let fare: Directus.Fare;
	export let labels: Record<string, string>;
	export let count: number;
	export let interest: string;

	const { price } = fare;
</script>

<button>
	<span>{interest}, </span>
	<span>{count} {labels['destinations']}</span>
	<span>{labels['from']}</span>
	<span>{labels['currency']}{price}</span>
</button>
