<script lang="ts">
	import { joinClasses } from '$lib/public/utils';
	import { Combobox, Label } from 'bits-ui';
	import Icon from './icon.svelte';

	export let input: Directus.FormInput;

	const { options, options_api, name, placeholder, icon } = input;

	const newLabel = input.label.split(' ');

	let inputValue: string;
	let touchedInput = true;

	const allItems = [
		{ value: 'mango', label: 'Mango', country: 'country', iata: 'AAA' },
		{ value: 'watermelon', label: 'Watermelon', country: 'country', iata: 'AAA' },
		{ value: 'apple', label: 'Apple', country: 'country', iata: 'AAA' },
		{ value: 'pineapple', label: 'Pineapple', country: 'country', iata: 'AAA' },
		{ value: 'orange', label: 'Orange', country: 'country', iata: 'AAA' }
	];

	$: items =
		inputValue && touchedInput
			? allItems.filter((fruit) => fruit.value.includes(inputValue.toLowerCase()))
			: allItems;

	const getAreaByIndex = (index: number) =>
		index === 0
			? '[grid-area:desde] text-common-white text-14/20'
			: index === 1
				? '[grid-area:orig] text-secondary font-heading text-24/32 font-heading-medium'
				: '[grid-area:hacia] text-common-white text-14/20';
</script>

<div class="">
	<label
		for={name}
		class="grid [grid-template-areas:'desde_._hacia_.''orig_orig_sel_sel''._sml__sml_.'] gap-x-8 gap-y-4"
	>
		{#each newLabel as label, index}
			<span class={joinClasses(getAreaByIndex(index))}>{label}</span>
		{/each}
		<div class="[grid-area:sel] self-baseline relative">
			<Combobox.Root {items} bind:inputValue bind:touchedInput>
				<Combobox.Input
					class=" bg-transparent font-heading font-heading-medium text-24/32 border-b-2 border-common-white
           placeholder:text-grey-200 text-common-white transition-colors outline-none hover:border-red focus:border-red caret-red"
					{placeholder}
					aria-label={input.label}
				></Combobox.Input>
				<Combobox.Content
					class="w-full rounded-lg bg-common-white shadow-medium outline-none overflow-hidden"
					sideOffset={8}
				>
					{#each items as item (item.value)}
						<Combobox.Item
							class="grid [grid-template-areas:'dest_iata''ctry_iata'] grid-cols-[1fr_auto] select-none items-center p-16 outline-none transition-all data-[highlighted]:bg-backgound-lightblue"
							value={item.value}
							label={item.label}
						>
							<span
								class="flex gap-4 items-center text-grey-700 text-16/24 font-heading-medium font-heading [grid-area:dest]"
							>
								{item.label}
								<Combobox.ItemIndicator class="[grid-area:sel] self-center pr-4" asChild={false}>
									<Icon data={icon} class="[grid-area:sml] fill-secondary w-16 justify-self-center"
									></Icon>
								</Combobox.ItemIndicator>
							</span>
							<span class="text-grey-400 text-12/16 [grid-area:ctry]">
								{item.country}
							</span>
							<span
								class="text-primary text-20/24 font-heading font-heading-medium [grid-area:iata] self-center"
							>
								{item.iata}
							</span>
						</Combobox.Item>
					{:else}
						<span class="block p-16 text-grey-600"> No econtramos tarifas para {inputValue} </span>
					{/each}
				</Combobox.Content>
				<Combobox.HiddenInput {name} />
			</Combobox.Root>
		</div>
		<Icon data={icon} class="[grid-area:sml] fill-secondary w-48 justify-self-center"></Icon>
	</label>
</div>
