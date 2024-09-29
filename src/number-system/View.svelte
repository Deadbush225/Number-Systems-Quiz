<script lang="ts">
	import { get } from "svelte/store";
	import ConverterUnit from "./converter/ConverterUnit.svelte";
	import {
		parseFractionalString,
		toBinary,
		toDecimal,
		toHexadecimal,
		toOctal,
	} from "./converter/converter";
	import { fractionsEnables_store } from "./store/states";
	import type { NumberSystem } from "./types";

	import { truncateToThreeDecimals } from "./converter/converter";
	import TableGuide from "./converter/TableGuide.svelte";
	// import ToOctal from "../converter/toOctal.svelte";

	export let GivenNumberSystem: NumberSystem;
	let converter: Function;

	let number: Number | String;
	let num_binary: String;
	let num_octal: String;
	let num_hex: String;
	let num_decimal: String;

	let binary: String;
	let octal: String;
	let hex: String;
	let decimal: String;

	let answer: String;
	let fractionEnables: boolean;
	let radix: number;

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
			number = Math.random() * 64;
			// let numberW3decPlaces = number.toFixed(3);
			// number = parseFloat(numberW3decPlaces);

			// // number = Number(Math.random() * 1000).toFixed(6);
			// console.log(tmp);
			// number = parseFractionalString(tmp, 10);
			// console.log("--");
			// console.log(number);
		} else {
			number = Math.floor(Math.random() * 1000);
		}

		// if ($fractionsEnables_store) {
		// binary = binary;
		// }
		// 	solved = null;
		// 	decimalInput = 0;

		console.clear();
		binary = toBinary(number);
		decimal = toDecimal(number);
		hex = toHexadecimal(number);
		octal = toOctal(number);

		switch (GivenNumberSystem) {
			case "Binary":
				radix = 2;
				answer = binary;
				break;
			case "Decimal":
				radix = 10;
				answer = decimal;
				break;
			case "Hexadecimal":
				radix = 16;
				answer = hex;
				break;
			case "Octal":
				radix = 8;
				answer = octal;
				break;
		}

		if ($fractionsEnables_store) {
			if (GivenNumberSystem != "Binary") {
				answer = truncateToThreeDecimals(answer);
			}

			let tmp_answer = parseFractionalString(answer, radix);

			console.clear();
			binary = toBinary(tmp_answer);
			decimal = toDecimal(tmp_answer);
			hex = toHexadecimal(tmp_answer);
			octal = toOctal(tmp_answer);

			// answer = tmp_answer;
		}
		// console.log(answer.toString());
		// // let num = parseFloat(answer.toString());
		// console.log(num);

		// binary = toBinary(num);
		// decimal = toDecimal(num);
		// hex = toHexadecimal(num);
		// octal = toOctal(num);
	}

	reset();
</script>

<div class="container">
	<h2>From {GivenNumberSystem},</h2>
	<h1 class="answer">{answer}</h1>

	{#if GivenNumberSystem != "Decimal"}
		<ConverterUnit base="Decimal" number={decimal}></ConverterUnit>
	{/if}
	{#if GivenNumberSystem != "Binary"}
		<ConverterUnit base="Binary" number={binary}></ConverterUnit>
		<TableGuide radix={2}></TableGuide>
	{/if}
	{#if GivenNumberSystem != "Hexadecimal"}
		<ConverterUnit base="Hexadecimal" number={hex}></ConverterUnit>
		<TableGuide radix={16}></TableGuide>
	{/if}
	{#if GivenNumberSystem != "Octal"}
		<ConverterUnit base="Octal" number={octal}></ConverterUnit>
		<TableGuide radix={8}></TableGuide>
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
