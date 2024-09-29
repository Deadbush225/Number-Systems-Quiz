<script lang="ts">
	import favicon from "/favicon.png";
	// import viteLogo from "/vite.svg";
	// import Counter from "./lib/Counter.svelte";
	import View from "./number-system/View.svelte";
	import { onMount } from "svelte";
	import type { NumberSystem } from "./number-system/types";

	import { fractionsEnables_store } from "./number-system/store/states";
	import { get } from "svelte/store";

	let initView: any;
	// let tabEntries = [Binary];
	let supportedNumSystem: NumberSystem[] = [
		"Decimal",
		"Binary",
		"Octal",
		"Hexadecimal",
	];

	onMount(() => {
		setView("Decimal");
	});

	function setView(base: NumberSystem) {
		if (initView) {
			initView.$destroy();
		}
		initView = new View({
			target: document.getElementById("window")!,
			props: {
				GivenNumberSystem: base,
			},
		});
		ActiveTab = base;
	}

	let ActiveTab: NumberSystem;

	// let f: boolean;
	$: {
		// f = get(fractionsEnables_store);
		console.log($fractionsEnables_store);
	}
</script>

<main>
	<div class="sidebar">
		<div class="tabs-container">
			{#each supportedNumSystem as system}
				<div
					class="tab"
					class:active={ActiveTab == system}
					on:click={() => {
						setView(system);
					}}
				>
					{system}
				</div>
			{/each}
		</div>
		<div class="fraction-switcher">
			<input bind:checked={$fractionsEnables_store} type="checkbox" /> Fractions🐦‍🔥
		</div>
		<!-- {tabEntries.Binary.title} -->
	</div>
	<div id="window"></div>
</main>

<style lang="scss">
	main {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: row;
		// margin-left: 10em;

		.sidebar {
			z-index: 19;
			position: sticky;
			top: 0;
			left: 0;
			width: 10em;
			height: 100vh;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			background-color: #323232;
			// position: fixed;
			// top: 0;
			// left: 0;

			.tabs-container {
				padding: 5px;
				width: 10em;
				// width: 50%;
				display: flex;
				flex-direction: column;
				gap: 5px;

				.tab {
					height: 2em;
					line-height: 2em;
					text-align: center;
					// background-color: #1f1f1f;
					border-radius: 5px;
					&:hover {
						background-color: #242424;
					}
				}
			}
			.fraction-switcher {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 3em;
			}
		}

		#window {
			height: 100%;
			width: 100%;
			padding: 2em;
			// padding-left: 12em;
			// z-index: -100;
		}
	}

	.logo {
		height: 6em;
		padding: 1.5em;
		will-change: filter;
		transition: filter 300ms;
	}
	.logo:hover {
		filter: drop-shadow(0 0 2em #646cffaa);
	}
	.logo.svelte:hover {
		filter: drop-shadow(0 0 2em #ff3e00aa);
	}
	.read-the-docs {
		color: #888;
	}
	.active {
		background-color: #242424;
	}
	@import "./mobile.scss";
</style>
