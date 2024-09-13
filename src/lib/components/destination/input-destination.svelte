<script lang="ts">
	import { createCombobox, melt, type ComboboxOptionProps } from '@melt-ui/svelte';
	import Icon from '../site/icon.svelte';
	import { fly } from 'svelte/transition';
	import CarretDown from '$lib/assets/icon-carret-down.svg?raw';
	import IconCross from '$lib/assets/icon-cross.svg?raw';
	import IconError from '$lib/assets/icon-error.svg?raw';
	import { has, hasPath, isEmpty } from 'ramda';
	import { getDestinationsContext } from '$lib/components/destination/context';
	import type { DestinationReturnSchema } from '$lib/public/utils/destinations';
	import { isObject } from '@melt-ui/svelte/internal/helpers';
	import { destinationSchema, isDestination } from '$lib/cms/destination';
	import { requestData } from '$lib/public/utils/request-data';
	import { getFareModulesContext } from '../fare-modules';
	import { sortBy } from 'ramda';
	import { path } from 'ramda';

	export let item: Directus.FormInput;

	const fareModules = getFareModulesContext();

	const { placeholder, icon } = item;

	const itemLabel = item.label.split(' ');

	const toOption = (
		destination: DestinationReturnSchema
	): ComboboxOptionProps<DestinationReturnSchema> => ({
		value: destination,
		label: destination.translations[0]?.name || 'Not Found'
	});

	const { all: destinationsStore, selected: selectedDestination } = getDestinationsContext();

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput, selected },
		helpers: { isSelected }
	} = createCombobox<DestinationReturnSchema>({
		defaultSelected: $selectedDestination ? toOption($selectedDestination) : undefined,
		forceVisible: true,
		loop: true,
		closeOnEscape: true,
		highlightOnHover: true
	});

	let debounceTimer: ReturnType<typeof setTimeout>;

	const debounce = (callback: () => void) => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(callback, 450);
	};

	$: if (!$open) {
		$inputValue = $selected?.label ?? '';
	}

	$: {
		$selected = $selectedDestination ? toOption($selectedDestination) : undefined;
		if ($selectedDestination && window.dataLayer)
			window.dataLayer.push({
				event: 'select_destination',
				value: `${$selectedDestination.translations[0].name} (${$selectedDestination.iata_code})`
			});
	}

	$: filteredDestinations = $touchedInput
		? Object.values($destinationsStore).filter((destination) => {
				const normalizedInput = $inputValue.toLocaleLowerCase().trim();
				return (
					destination.iata_code.toLocaleLowerCase().includes(normalizedInput) ||
					destination.translations[0]?.name.toLocaleLowerCase().includes(normalizedInput) ||
					destination.country.translations[0]?.name.toLocaleLowerCase().includes(normalizedInput)
				);
			})
		: Object.values($destinationsStore);

	const toggleDropdown = (currentState: boolean) => () => ($open = !currentState);

	const erraseInputValue = () => {
		$inputValue = '';
		$selected = undefined;
		$selectedDestination = undefined;
	};

	const selectFirstOnEnter = ({ detail }: any) => {
		const event = detail.originalEvent;
		if ((event.key === 'Enter' || event.key === 'Tab') && $touchedInput && $inputValue) {
			selected.set(toOption(filteredDestinations[0]));
			$inputValue = $selected?.label ?? '';
			$selectedDestination = $selected?.value ?? undefined;
		}
	};

	const selectDestination = (destination: DestinationReturnSchema) => () => {
		$selectedDestination = destination;
	};

	$: getDestinationsData = handleDestinationChange($selectedDestination);

	function handleDestinationChange(value: unknown) {
		if (!isDestination(value)) return;

		debounce(() => {
			requestData('calendar', { destination: value.iata_code }).then((value) => {
				if (!value || !Array.isArray(value)) return;

				const { calendarMonths, calendarFares } = value[0];

				fareModules.set({
					...$fareModules,
					calendar: calendarFares,
					calendarMonths: calendarMonths
				});
			});
		});
	}
</script>

<div class="w-full">
	<label use:melt={$label} class="grid [grid-template-areas:'desde_hacia''pty_input'] gap-x-8 h-56">
		<div class="text-common-white text-14/20 [grid-area:desde]">
			{itemLabel[0]}
		</div>
		<div class="text-secondary text-28/32 font-heading font-body-medium [grid-area:pty]">
			{itemLabel[1]}
		</div>
		<div class="text-common-white text-14/20 [grid-area:hacia]">
			{itemLabel[2]}
		</div>
		<div
			class="w-full relative [grid-area:input] {$open
				? 'xs:fixed xs:top-0 xs:left-0 xs:p-16 xs:bg-primary xs:z-10'
				: ''}"
		>
			<input
				use:melt={$input}
				{placeholder}
				on:m-keydown={(e) => selectFirstOnEnter(e)}
				class="pr-24 w-full font-heading text-28/32 text-common-white font-heading-medium placeholder:text-common-white/50 placeholder:font-body-normal bg-transparent border-b border-grey-100 border-spacing-4 hover:border-primary-red focus:placeholder:text-common-white focus:bg-common-white/15 focus:border-red transition-colors outline-none peer"
			/>
			{#if !$inputValue}
				<button
					tabindex="-1"
					type="button"
					aria-controls="destinations-list"
					on:click={toggleDropdown($open)}
					class="absolute right-0 top-1/2 -translate-y-1/2 text-grey-400 peer-focus:text-common-white {$open
						? 'xs:pr-16'
						: ''}"
				>
					<Icon
						data={CarretDown}
						class="square-24 fill-current {$open ? 'rotate-180' : ''} transition-all"
					></Icon>
				</button>
			{:else}
				<button
					tabindex="-1"
					type="button"
					on:click={erraseInputValue}
					class="absolute right-0 top-1/2 -translate-y-1/2 text-grey-400 peer-focus:text-common-white {$open
						? 'xs:pr-16'
						: ''}"
					transition:fly={{ duration: 150, x: 5 }}
				>
					<Icon data={IconCross} class="square-24 fill-current"></Icon>
				</button>
			{/if}
		</div>
	</label>
</div>
{#if $open}
	<ul
		class="z-10 flex flex-col rounded-md bg-common-white border border-primary shadow-medium fixed top-0 left-0 max-h-[calc(100svh-33px-40px)] sm:max-h-[360px] overflow-y-auto"
		id="destinations-list"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -5 }}
	>
		{#if !isEmpty($destinationsStore)}
			{#each sortBy(path( ['translations', 0, 'name'] ), filteredDestinations) as destination, index (index)}
				<li
					class="p-16 cursor-pointer hover:bg-backgound-lightblue data-[highlighted]:bg-backgound-lightblue data-[selected]:bg-backgound-lightblue grid [grid-template-areas:'dest_iata''ctry_iata'] grid-cols-[1fr_auto] grid-rows-[1fr_auto]"
					on:m-click={selectDestination(destination)}
					use:melt={$option(toOption(destination))}
				>
					<span class="text-grey-800 font-heading font-heading-medium [grid-area:dest]">
						<span>{destination.translations[0]?.name || '⚠️ Destino sin nombre'}</span>
						<span>
							{#if $isSelected(destination)}
								<Icon data={icon} class="square-16 fill-secondary inline-block"></Icon>
							{/if}
						</span>
					</span>
					<span class="text-primary font-heading font-heading-medium [grid-area:iata] self-center">
						{destination.iata_code}
					</span>
					<span class="text-12/16 text-grey-600 [grid-area:ctry]">
						{destination.country.translations[0]?.name ||
							'⚠️ Pais sin nombre: ' + destination.country.code}
					</span>
				</li>
			{:else}
				<li
					class="p-16 cursor-pointer hover:bg-backgound-lightblue data-[highlighted]:bg-backgound-lightblue data-[selected]:bg-backgound-lightblue grid [grid-template-areas:'icon_dest''icon_ctry'] grid-cols-[auto_1fr] gap-x-4 grid-rows-[1fr_auto]"
				>
					<Icon data={IconError} class="square-24 fill-red [grid-area:icon]"></Icon>
					<span class="text-system-error text-14/20 font-body-medium [grid-area:dest]">
						No se encontraron resultados.
					</span>
					<span class="text-grey-600 text-12/16 [grid-area:ctry]">
						Por favor, modifica tu búsqueda.
					</span>
				</li>
			{/each}
		{:else}
			<li class="p-16 grid place-content-center">
				<span class="animate-pulse">cargando destinos</span>
			</li>
		{/if}
	</ul>
{/if}
