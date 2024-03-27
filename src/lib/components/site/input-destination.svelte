<script lang="ts">
	import { melt } from '@melt-ui/svelte';
	import { joinClasses } from '$lib/public/utils';
	import Icon from './icon.svelte';

	export let input: Directus.FormInput;

	const { options, options_api, name, placeholder, icon } = input;

	const newLabel = input.label.split(' ');

	let inputValue: string;
	let touchedInput = true;
	let open;

	const allItems = [
		{ value: 'mango', label: 'Santiago de los Caballeros', country: 'country', iata: 'AAA' },
		{ value: 'watermelon', label: 'Watermelon', country: 'country', iata: 'AAA' },
		{ value: 'apple', label: 'Apple', country: 'country', iata: 'AAA' },
		{ value: 'pineapple', label: 'Pineapple', country: 'country', iata: 'AAA' },
		{ value: 'orange', label: 'Orange', country: 'country', iata: 'AAA' }
	];

	$: items =
		inputValue && touchedInput
			? allItems.filter((fruit) => fruit.value.includes(inputValue.toLowerCase()))
			: allItems;

	const setFocusClass = (event: MeltEvent<Event>) => {
		console.log('click', event);
	};

	const configureComboBox = (node: HTMLElement, params: any) => {
		node.addEventListener('focus', setFocusClass);
	};

	const getAreaByIndex = (index: number) =>
		index === 0
			? '[grid-area:desde] text-common-white text-14/20'
			: index === 1
				? '[grid-area:orig] text-secondary font-heading text-24/32 font-heading-medium'
				: '[grid-area:hacia] text-common-white text-14/20';
</script>
