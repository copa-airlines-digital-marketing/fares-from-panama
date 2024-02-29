<script lang="ts">
	const viewBoxRegex = /viewBox="([\d\- \.]+)"/;

	const excecuteRegex = (text: string, regex: RegExp) => regex.exec(text);

	const getArraySecondElement = (arg: RegExpExecArray | null) => (arg ? arg[1] : null);

	const extractViewData = (svg: string, regex: RegExp) =>
		getArraySecondElement(excecuteRegex(svg, regex));

	export let data = '';
	export let viewBox = extractViewData(data, viewBoxRegex) || '0 0 24 24';

	$: elements = data.replace(/<svg ([^>]*)>/, '').replace('</svg>', '');
</script>

<svg xmlns="http://www.w3.org/2000/svg" {viewBox} {...$$restProps}>
	{@html elements}
</svg>
