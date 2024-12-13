<script lang="ts">
	import type { OtherViews } from "../views";
	import FormAnswer from "../../Components/Answer.svelte";
	// import FormAnswer from "./FormAnswer.svelte";

	import { parity } from "../../lib/store/states";

	export let Name: OtherViews;

	type NSys = "ASCII" | "EBCDIC";

	// Define the type for the selected option
	type Parity = "ODD" | "EVEN";

	// Variable to hold the selected value
	// let selectedOption: Parity = "ODD"; // Default selected option

	// Function to handle changes
	function handleChange(event: Event) {
		const target = event.target as HTMLInputElement; // Type assertion

		$parity = target.value as Parity; // Update the selected option
		reset();
	}

	function countOnes(str: string): number {
		let count = 0;
		for (let i = 0; i < str.length; i++) {
			if (str[i] === "1") {
				count++;
			}
		}
		return count;
	}

	// Function to convert a character to its ASCII and EBCDIC values
	function generateRandomString(length: number = 4): string {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		let result = "";

		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			result += characters[randomIndex];
		}

		return result;
	}

	$: {
		// alert($parity);
		// console.log($parity);
	}

	function CharToEBCDIC(char: string) {
		let ebcdic;
		// Check if the input is a single character
		if (char.length !== 1) {
			console.log("Please enter a single character.");
			return;
		}

		// EBCDIC conversion table for uppercase and lowercase letters
		const ebcdicTable: { [key: string]: Number } = {
			A: 0xc1,
			B: 0xc2,
			C: 0xc3,
			D: 0xc4,
			E: 0xc5,
			F: 0xc6,
			G: 0xc7,
			H: 0xc8,
			I: 0xc9,
			J: 0xd1,
			K: 0xd2,
			L: 0xd3,
			M: 0xd4,
			N: 0xd5,
			O: 0xd6,
			P: 0xd7,
			Q: 0xd8,
			R: 0xd9,
			S: 0xe2,
			T: 0xe3,
			U: 0xe4,
			V: 0xe5,
			W: 0xe6,
			X: 0xe7,
			Y: 0xe8,
			Z: 0xe9,
			a: 0x81,
			b: 0x82,
			c: 0x83,
			d: 0x84,
			e: 0x85,
			f: 0x86,
			g: 0x87,
			h: 0x88,
			i: 0x89,
			j: 0x91,
			k: 0x92,
			l: 0x93,
			m: 0x94,
			n: 0x95,
			o: 0x96,
			p: 0x97,
			q: 0x98,
			r: 0x99,
			s: 0xf2,
			t: 0xf3,
			u: 0xf4,
			v: 0xf5,
			w: 0xf6,
			x: 0xf7,
			y: 0xf8,
			z: 0xf9,
		};

		// Get EBCDIC value
		const ebcdicValue = ebcdicTable[char];
		// ebcdicTable[char] !== undefined ? ebcdicTable[char] : null;

		const e: string = parseInt(
			ebcdicValue?.toString(16).toUpperCase(),
			16
		).toString(2); // Convert to hex format

		if (e === undefined) {
			return "ERROR";
		}
		// console.log(`E: ${e}`);
		// console.log(`E: ${Number(e)}`);
		// console.log(`E: ${parseInt(e, 16)}`);
		let ones = countOnes(e);
		// console.log(`1's: ${ones}`);
		// console.log(`1's: ${$parity}`);

		let ans: string;
		if ($parity == "ODD") {
			// if (ones % 2 != 1) {
			// ans = "1 " + e; //add one
			ans = (ones % 2 == 0 ? "1 " : "0 ") + e; //add one
			// }
		} else {
			// parity is EVEN
			// if (ones % 2 != 0) {
			ans = (ones % 2 == 1 ? "1 " : "0 ") + e; //add one
			// add one
			// }
		}
		// ans = "0 " + e;
		console.log(`${char} -> EBCDIC: ${ans}`);
		return ans;
	}

	function CharToASCII(char: string) {
		let ascii;
		// Check if the input is a single character
		if (char.length !== 1) {
			console.log("Please enter a single character.");
			return;
		}

		// Get ASCII value
		const asciiValue = char.charCodeAt(0);

		// console.log(`Character: ${char}`);
		// return asciiValue;

		const e = asciiValue?.toString(2); // Convert to hex format
		const ones = countOnes(e);

		let ans: string;
		if ($parity == "ODD") {
			// if (ones % 2 != 1) {
			// ans = "1 " + e; //add one
			ans = (ones % 2 == 0 ? "1 " : "0 ") + e; //add one
			// }
		} else {
			// parity is EVEN
			// if (ones % 2 != 0) {
			// ans = "1 " + e; //add one
			ans = (ones % 2 == 1 ? "1 " : "0 ") + e; //add one
			// add one
			// }
		}
		// ans = "0 " + e;
		console.log(`${char} -> ASCII: ${ans}`);
		return ans;
	}

	// Example usage
	// convertChar("A"); // Replace with any character you want to convert
	/* ━━━━━━━━━━━━━━━━━━━━━━━━ Variables ━━━━━━━━━━━━━━━━━━━━━━━━━ */
	let question: String;

	$: question;
	// $: {
	// 	reset();
	// }

	function reset() {
		console.clear();
		question = generateRandomString(Math.ceil(Math.random() * 3) + 2);
	}
	reset();
</script>

<div class="container">
	<h2>
		{Name}

		<div class="note">Answer should be in (0 11111111)</div>
	</h2>
	<h1 class="answer">{question}</h1>
	<div class="parity" style="position: absolute; top: 10em; right: 2em;">
		<h3 style="margin: 0;">Parity</h3>
		<div>
			<label>
				<input
					type="radio"
					name="options"
					value="EVEN"
					bind:group={$parity}
					on:change={handleChange}
				/>
				Even
			</label>
		</div>
		<div>
			<label>
				<input
					type="radio"
					name="options"
					value="ODD"
					bind:group={$parity}
					on:change={handleChange}
				/>
				Odd
			</label>
		</div>
	</div>

	{#each question as x}
		<div class="per-letter">
			<span class="letter">
				{x}
			</span>
			<div style="display:inline-block;">
				<FormAnswer placeholder="EBCDIC" answer={CharToEBCDIC(x) || "invalid"}
				></FormAnswer>
				<!-- {CharToEBCDIC(x)} -->
				<FormAnswer placeholder="ASCII" answer={CharToASCII(x) || "invalid"}
				></FormAnswer>
			</div>
			<!-- {CharToASCII(x)} -->
		</div>
	{/each}
	<div class="table-container">
		<table>
			<tbody>
				<tr class="header">
					<td>Character</td>
					<td>ASCII</td>
					<td>ZONE</td>
					<td>DIGIT</td>
				</tr>
				<tr>
					<td>A - I</td>
					<td>65 - 73</td>
					<td>12</td>
					<td>1 - 9</td>
				</tr>
				<tr>
					<td>J - R</td>
					<td>74 - 82</td>
					<td>13</td>
					<td>1 - 9</td>
				</tr>
				<tr>
					<td>S - Z</td>
					<td>83 - 90</td>
					<td>14</td>
					<td>1 - 9</td>
				</tr>
				<tr>
					<td>a - i</td>
					<td>91 - 105</td>
					<td>8</td>
					<td>1 - 9</td>
				</tr>
				<tr>
					<td>j - r</td>
					<td>106 - 114</td>
					<td>9</td>
					<td>1 - 9</td>
				</tr>
				<tr>
					<td>s - z</td>
					<td>115 - 122</td>
					<td>10</td>
					<td>1 - 9</td>
				</tr>
			</tbody>
		</table>
	</div>
	<!-- <button class="regen" on:click={reset}>Regenerate</button> -->
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
	.per-letter {
		margin-bottom: 0.5em;
	}
	.letter {
		min-width: 2em;
		display: inline-block;
		text-align: center;
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
		margin-top: 1em;
	}
</style>
