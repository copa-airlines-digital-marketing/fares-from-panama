<script>
	export let id;
	export let name;
	export let value;
</script>

<div class="grid grid-cols-1 grid-rows-1">
	<input
		type="radio"
		{name}
		{id}
		{value}
		class="col-start-1 row-start-1 h-48 checked:bg-primary border-none bg-grey-300 appearance-none rounded-sm my-4 peer transition-colors hover:bg-primary-light outline-primary"
		required
	/>
	<label
		for={id}
		class="col-start-1 row-start-1 place-self-center peer-checked:text-common-white peer-hover:text-common-white transition-colors font-heading font-heading-medium"
	>
		<slot />
	</label>
</div>
