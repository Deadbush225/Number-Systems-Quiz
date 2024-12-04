<script lang="ts">
	import Button from "../number-system/converter/Button.svelte";

	// export let system;
	export let answer: string;
	export let placeholder: string;

	let solved: boolean | null;
	let binaryInput: String = "";

	$: {
		solved = false;
		if (answer == binaryInput) {
			solved = true;
		}
	}
</script>

<div class="form-answer">
	<!-- <p class="converter-header">To: {system}</p> -->
	<!-- {number} -->
	<input class="input" bind:value={binaryInput} type="text" {placeholder} />
	<Button {solved}></Button>
	<!-- {answer} -->
</div>

<style lang="scss">
	.input {
		height: 2em;
		font-size: 1em;
		border: 1px #222222 solid;
		background: #3b3b3b;
		border-radius: 5px;
		padding: 0 0 0 10px;
		width: 16em;

		&:focus-visible {
			outline: #3b3b3b 1px solid !important;
		}
	}
	.converter-header {
		margin-bottom: 0.1em;
	}

	.form-answer {
		display: inline-block;
		margin-left: 1em;
	}
</style>
