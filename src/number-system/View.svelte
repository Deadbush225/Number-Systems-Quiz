<script lang="ts">
	import ConverterUnit from "./converter/ConverterUnit.svelte";
	import {
		toBinary,
		toDecimal,
		toHexadecimal,
		toOctal,
	} from "./converter/converter";
	import type { NumberSystem } from "./types";
	// import ToOctal from "../converter/toOctal.svelte";

	export let GivenNumberSystem: NumberSystem;

	let number: Number;
	let binary: String;
	let octal: String;
	let hex: String;
	let decimal: String;
	let answer: String;

	$: number;
	$: answer;

	function reset() {
		number = Math.floor(Math.random() * 1000);
		binary = toBinary(number);
		octal = toOctal(number);
		hex = toHexadecimal(number);
		decimal = toDecimal(number);
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
