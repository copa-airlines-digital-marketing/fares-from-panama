<script lang="ts">
	import { getContext } from 'svelte';
	import Icon from '$lib/components/site/icon.svelte';
	import Carret from '$lib/assets/icon-carret-down.svg?raw';

	export let fare: ViajaPanamaFare;
	export let selected = false;
	export let interest: string;
	export let image: string;
	export let count: number;

	const labels = getContext<Record<string, string>>('moduleLabels');
</script>

<span
	class="calendar:p-12 fare-card--interest font-heading grid group-focus:*:!text-common-white group-hover:*:!text-common-white h-full px-8 py-8 text-12/16 text-common-white text-right transition-colors w-full"
>
	<span class="[grid-area:img] block rounded-full square-72 md:square-96 overflow-hidden mr-8">
		<img
			loading="lazy"
			class="object-cover h-full w-full"
			src="https://cm-marketing.directus.app/assets/{image}?width=200&height=200&fit=cover"
			alt=""
		/>
	</span>
	<span class="font-heading-medium [grid-area:interest] self-end text-20/24 text-left">
		{interest}
	</span>
	<span class="[grid-area:count] text-left">
		{count}
		{labels['destinations']}
	</span>
	<span class="[grid-area:froms] self-end">{labels['from']}</span>
	<span class="[grid-area:crncy] mb-4">{labels['currency']}</span>
	<span class="[grid-area:price] font-heading-bold ml-4 text-common-white self-center text-32/40">
		${fare.price}
	</span>
	<span
		class="[grid-area:icons] self-center calendar:hidden ml-4 sm:ml-8 transition-transform"
		class:rotate-180={selected}
	>
		<Icon data={Carret} class="size-24 fill-grey-200"></Icon>
	</span>
</span>

<style lang="postcss">
	.fare-card--interest {
		grid-template-areas: 'img interest froms price icons' 'img count crncy price icons';
		grid-template-columns: auto 1fr auto auto auto;
		grid-template-rows: 1fr 1fr;
	}

	@media (min-width: 600px) {
		.fare-card--interest {
			grid-template-areas: 'img interest froms price icons' 'img count crncy price icons';
			grid-template-columns: auto 1fr auto auto auto;
			grid-template-rows: 1fr 1fr;
		}
	}

	@media (min-width: 1180px) {
		.fare-card--interest {
			grid-template-areas: 'img interest interest' 'img count count' 'img froms price' 'img crncy price';
			grid-template-columns: auto 1fr auto;
			grid-template-rows: 1fr 1fr auto auto;
		}
	}
</style>
