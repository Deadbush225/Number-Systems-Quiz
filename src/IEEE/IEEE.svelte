<script lang="ts">
	// import type { OtherViews } from "./types";
	import type { OtherViews } from "../data-rep/types";
	import FormAnswer from "./AnswerFo.svelte";

	import { parity } from "../number-system/store/states";
	import Answer from "./AnswerFo.svelte";

	import { truncateToSixDecimals } from "../number-system/converter/converter";

	export let Name: OtherViews;

	let randomFloat: number;
	// let displayRnd: number;

	let sign: number;
	let biasedExponent: number;
	let mantissa: number;
	let ieeeRepresentation: string;

	let Ssign: string;
	let SbiasedExponent: string;
	let Smantissa: string;

	// Function to generate a random float
	function generateRandomFloat() {
		randomFloat = parseFloat(
			(Math.random() * (Math.random() < 0.5 ? -1 : 1) * 100).toFixed(2)
		); // Random float between -1 and 1
		// let e = parseFloat(randomFloat.toFixed(4));
		// console.log(`E: ${e}`);
		// displayRnd = Math.ceil(randomFloat);
		return randomFloat;
	}

	// Function to convert to IEEE representation
	function convertToIEEE() {
		if (randomFloat === null) return;

		// Getting the sign bit
		const signBit = randomFloat < 0 ? 1 : 0;

		// Converting float to IEEE representation
		const floatArray = new Float32Array(1);
		floatArray[0] = randomFloat;
		const uint32Array = new Uint32Array(floatArray.buffer);

		const ieeeBinaryString = uint32Array[0].toString(2).padStart(32, "0");

		// Extracting components
		sign = parseInt(ieeeBinaryString[0], 10);
		biasedExponent = parseInt(ieeeBinaryString.slice(1, 9), 2);
		mantissa = parseInt(ieeeBinaryString.slice(9), 2);

		Ssign = sign.toString(2);
		console.log(`Signed: ${Ssign}`);
		SbiasedExponent = biasedExponent.toString(2);
		console.log(`Biased Exponent: ${SbiasedExponent}`);
		Smantissa = mantissa.toString(2);
		console.log(`Mantissa: ${Smantissa}`);

		ieeeRepresentation = `Sign: ${sign}, Biased Exponent: ${biasedExponent}, Mantissa: ${mantissa}`;
	}

	function toRadix(num: number, rad: number) {
		let converted: string = num.toString(rad);
		console.log(`Converted: ${converted}`);
		return converted;
	}

	/* ━━━━━━━━━━━━━━━━━━━━━━━━ Variables ━━━━━━━━━━━━━━━━━━━━━━━━━ */
	let question: String;

	$: question;

	function reset() {
		generateRandomFloat();
		convertToIEEE();
	}

	reset();
</script>

<div class="container">
	<h2>
		{Name}
		<div class="note">Answer per part</div>
	</h2>

	<h3>Float:</h3>
	<div class="center_block">
		<div class="answer sub">
			<p>{randomFloat}</p>
			<!-- {#if displayRnd % 2 == 0}
			{:else if displayRnd % 3 == 0}
				<p>{toRadix(randomFloat, 16)}</p>
			{:else}
				<p>{toRadix(randomFloat, 8)}</p>
			{/if} -->
		</div>
	</div>
	<div class="note">
		Hint: 1.{mantissa.toString(2)} x 2 ^ {biasedExponent - 127}
	</div>
	<h3>Signed Bit:</h3>
	<Answer answer={Ssign} placeholder={"In Binary"}></Answer>

	<h3>Biased Exponent:</h3>
	<Answer answer={SbiasedExponent} placeholder={"In Binary"}></Answer>
	<h3>Mantissa:</h3>
	<Answer answer={Smantissa} placeholder={"In Binary"}></Answer>

	<!-- <button class="regen" on:click={reset}>Regenerate</button> -->
	<button class="regen" on:click={reset}>Regenerate</button>
</div>

<style lang="scss">
	@mixin center {
		text-align: center;
	}
	.answer {
		// @include center;
		font-size: 3em;
		text-align: right;
		p {
			font-family: "Courier New", Courier, monospace;
			margin: 0;
			margin-block-start: 0em;
			margin-block-end: 0em;
		}
	}
	.per-letter {
		margin-bottom: 0.5em;
	}
	.letter {
		min-width: 2em;
		display: inline-block;
		text-align: center;
	}

	// .sub {
	// 	position: relative;
	// 	&::before {
	// 		content: "-";
	// 		position: absolute;
	// 		left: -1em;
	// 		bottom: 0em;
	// 	}
	// }

	.center_block {
		display: flex;
		justify-content: center;
	}

	.table-container {
		margin-top: 1.3em;
		// margin-bottom: 0.5em;
		// padding: 1em;
	}

	table {
		margin: 1.5em auto;
		text-align: center;
		border-radius: 15px;
		overflow: hidden;
		border: 1px solid #343434;
		// border: 1px solid gray
		td {
			border: 1px solid #343434;
		}

		.header {
			background-color: #323232;
			td {
				padding: 0.1em 0.5em;
			}
		}
	}

	.regen {
		display: block;
		margin: 0 auto;
		margin-top: 4em;
	}
</style>
