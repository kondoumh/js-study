<script>
	let src = 'tutorial/image.gif'
	let name = 'Rick Astley';
	import Nested from './Nested_1.svelte';
	let string = `this string contains some <strong>HTML!!!</strong>`
</script>

<style>
	p {
		color: purple;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
</style>

<img {src} alt="{name} dances.">
<p>This is a paragraph</p>
<Nested/>
{@html string}
