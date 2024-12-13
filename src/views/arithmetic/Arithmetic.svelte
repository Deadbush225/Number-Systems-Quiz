<script lang="ts">
	import type { OtherViews } from "../views";

	import Answer from "../../Components/Answer.svelte";

	export let Name: OtherViews;

	type operation = {
		minuend: number;
		subtrahend: number;
	};

	type Boperation = {
		minuend: string;
		subtrahend: string;
	};

	function getRandomInt(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function generateUniqueNumbers(min: number, max: number): [number, number] {
		let num1 = getRandomInt(min, max);
		let num2 = getRandomInt(min, max);

		// Ensure num2 is different from num1
		while (num1 === num2) {
			num2 = getRandomInt(min, max);
		}

		return [num1, num2];
	}

	$: {
		// alert($parity);
		// console.log($parity);
	}

	/* ━━━━━━━━━━━━━━━━━━━━━━━━ Variables ━━━━━━━━━━━━━━━━━━━━━━━━━ */
	let question: String;

	$: question;
	// $: {
	// }
	let positiveBinary: Boperation;
	let negativeBinary: Boperation;
	let positiveOperation: operation;
	let negativeOperation: operation;

	let positiveAns: number;
	let negativeAns: number;

	$: {
		positiveAns = positiveOperation.minuend - positiveOperation.subtrahend;
		console.log(`Positive: ${positiveAns.toString(2)}`);
	}
	$: {
		negativeAns = negativeOperation.subtrahend - negativeOperation.minuend;
		console.log(`Negative: -${negativeAns.toString(2)}`);
	}

	function reset() {
		console.clear();
		const [num1, num2] = generateUniqueNumbers(20, 256);
		const [num3, num4] = generateUniqueNumbers(20, 256);

		positiveOperation = {
			minuend: Math.max(num1, num2),
			subtrahend: Math.min(num1, num2),
		};

		negativeOperation = {
			minuend: Math.min(num3, num4),
			subtrahend: Math.max(num3, num4),
		};

		positiveBinary = {
			minuend: positiveOperation.minuend.toString(2),
			subtrahend: positiveOperation.subtrahend.toString(2),
		};

		negativeBinary = {
			minuend: negativeOperation.minuend.toString(2),
			subtrahend: negativeOperation.subtrahend.toString(2),
		};

		// question = generateRandomString(Math.ceil(Math.random() * 3) + 2);
	}

	reset();
</script>

<div class="container">
	<h2>
		{Name}
		<div class="note">Answer should look -1010101010</div>
	</h2>

	<h3>Positive Result:</h3>
	<div class="center_block">
		<div class="answer sub">
			<p>{positiveBinary.minuend}</p>
			<p>{positiveBinary.subtrahend}</p>
		</div>
	</div>
	<Answer answer={positiveAns.toString(2)} placeholder={"Positive"}></Answer>

	<h3>Negative Result:</h3>
	<div class="center_block">
		<div class="answer sub">
			<p>{negativeBinary.minuend}</p>
			<p>{negativeBinary.subtrahend}</p>
		</div>
	</div>
	<Answer answer={"-" + negativeAns.toString(2)} placeholder={"Negative"}
	></Answer>

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

	.sub {
		position: relative;
		&::before {
			content: "-";
			position: absolute;
			left: -1em;
			bottom: 0em;
		}
	}

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
