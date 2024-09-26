<script lang="ts">
	import Button from "./Button.svelte";
	import { type NumberSystem } from "../types";

	// export let input_type: "number" | "text" = "number";
	export let number: String;
	export let base: NumberSystem;

	let solved: boolean | null;
	let decimalInput: String = "";
	let replacedString: String = "";

	$: solved;
	$: decimalInput;

	$: {
		solved = false;
		// console.log(`${number} == ${decimalInput}`);

		replacedString = decimalInput.replace(/^0+/, "");
		// console.log(`${number} == ${replacedString}`);

		replacedString = replacedString.replace(/\s/g, "");
		// console.log(`${number} == ${replacedString}`);

		replacedString = replacedString.toLowerCase();
		// console.log(`${number} == ${replacedString}`);

		if (number == replacedString) {
			solved = true;
		}
	}

	$: {
		// refer number here so it executes when number changes and reset the input
		number;
		solved = null;
		decimalInput = "";
	}
</script>

<div class="converter-block">
	<h2 class="converter-header">To {base}:</h2>
	<!-- {number} -->
	<input class="input" bind:value={decimalInput} type="text" />
	<Button {solved}></Button>
</div>

<style lang="scss">
	.input {
		height: 2em;
		font-size: 1em;
		border: 1px #222222 solid;
		background: #3b3b3b;
		border-radius: 5px;
		padding: 0 0 0 10px;

		&:focus-visible {
			outline: #3b3b3b 1px solid !important;
		}
	}
	.converter-header {
		margin-bottom: 0.1em;
	}
</style>
