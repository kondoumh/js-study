<script>
	let count = 0;
	$: doubled = count * 2;
	$: {
		console.log(`the count is ${count}`);
		//alert(`I SAID THE COUNT IS ${count}`);
		if (count >= 10) {
			alert(`count is dangerously high!`);
			count = 9
		}
	}
	function handleClick() {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	Cliked {count} {count === 1 ? 'time' : 'times'}
</button>
<p>{count} doubled is {doubled}</p>
