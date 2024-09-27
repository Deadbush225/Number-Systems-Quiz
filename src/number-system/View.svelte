<script lang="ts">
	import { get } from "svelte/store";
	import ConverterUnit from "./converter/ConverterUnit.svelte";
	import {
		toBinary,
		toDecimal,
		toHexadecimal,
		toOctal,
	} from "./converter/converter";
	import { fractionsEnables_store } from "./store/states";
	import type { NumberSystem } from "./types";

	// import ToOctal from "../converter/toOctal.svelte";

	export let GivenNumberSystem: NumberSystem;

	let number: Number | String;
	let binary: String;
	let octal: String;
	let hex: String;
	let decimal: String;
	let answer: String;
	let fractionEnables: boolean;

	$: number;
	$: answer;
	$: {
		// fractionEnables = get(fractionsEnables_store);
		// console.log(fractionEnables);
		$fractionsEnables_store;
		reset();
	}

	function reset() {
		if ($fractionsEnables_store) {
			number = Number(Math.random() * 64);
			let tmp = number.toFixed(6);
			number = parseFloat(tmp);

			// number = Number(Math.random() * 1000).toFixed(6);
		} else {
			number = Math.floor(Math.random() * 1000);
		}

		console.clear();
		binary = toBinary(number);
		decimal = toDecimal(number);
		hex = toHexadecimal(number);
		octal = toOctal(number);
		// if ($fractionsEnables_store) {
		// binary = binary;
		// }
		// 	solved = null;
		// 	decimalInput = 0;
		switch (GivenNumberSystem) {
			case "Binary":
				answer = binary;
				break;
			case "Decimal":
				answer = decimal;
				break;
			case "Hexadecimal":
				answer = hex;
				break;
			case "Octal":
				answer = octal;
				break;
		}
	}

	reset();
</script>

<div class="container">
	<h2>From {GivenNumberSystem},</h2>
	<h1 class="answer">{answer}</h1>

	{#if GivenNumberSystem != "Decimal"}
		<ConverterUnit base="Decimal" number={number.toString()}></ConverterUnit>
	{/if}
	{#if GivenNumberSystem != "Binary"}
		<ConverterUnit base="Binary" number={binary.toString()}></ConverterUnit>
	{/if}
	{#if GivenNumberSystem != "Hexadecimal"}
		<ConverterUnit base="Hexadecimal" number={hex}></ConverterUnit>
	{/if}
	{#if GivenNumberSystem != "Octal"}
		<ConverterUnit base="Octal" number={octal}></ConverterUnit>
	{/if}

	<button class="regen" on:click={reset}>Regenerate</button>
</div>

<style lang="scss">
	@mixin center {
		text-align: center;
	}

	.answer {
		@include center;
		// font-size: 3em;
		font-family: "Courier New", Courier, monospace;
	}

	.regen {
		display: block;
		margin: 0 auto;
		margin-top: 1em;
	}
</style>
