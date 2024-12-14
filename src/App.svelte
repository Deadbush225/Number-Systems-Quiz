<script lang="ts">
	import View from "./views/number-system/View.svelte";
	import OtherView from "./views/data-rep/OtherView.svelte";
	import Arithmetic from "./views/arithmetic/Arithmetic.svelte";
	import Ieee from "./views/IEEE/IEEE.svelte";

	import { onMount } from "svelte";

	import type { NumberSystem, OtherViews } from "./views/views";
	import { fractionsEnables_store } from "./lib/store/states";

	let initView: any;
	let otherViews: OtherViews[] = ["Data-Rep", "Arithmetic", "IEEE"];

	let supportedNumSystem: NumberSystem[] = [
		"Decimal",
		"Binary",
		"Octal",
		"Hexadecimal",
	];

	let ActiveTab: NumberSystem | OtherViews;
	let tabs = [...supportedNumSystem, ...otherViews];

	onMount(() => {
		setView("Decimal");
	});

	function setView(base: NumberSystem | OtherViews) {
		if (initView) {
			initView.$destroy();
			console.clear();
		}

		if (supportedNumSystem.includes(base as NumberSystem)) {
			initView = new View({
				target: document.getElementById("window")!,
				props: {
					GivenNumberSystem: base as NumberSystem,
				},
			});
		} else {
			if (base == "Data-Rep") {
				initView = new OtherView({
					target: document.getElementById("window")!,
					props: {
						Name: base as OtherViews,
					},
				});
			} else if (base == "Arithmetic") {
				initView = new Arithmetic({
					target: document.getElementById("window")!,
					props: {
						Name: base as OtherViews,
					},
				});
			} else if (base == "IEEE") {
				initView = new Ieee({
					target: document.getElementById("window")!,
					props: {
						Name: base as OtherViews,
					},
				});
			}
		}
		ActiveTab = base;
	}
</script>

<main>
	<div class="sidebar">
		<div class="tabs-container">
			{#each tabs as tab}
				<div
					role="button"
					tabindex="0"
					on:keypress={() => setView(tab)}
					on:click={() => setView(tab)}
					class="tab"
					class:active={ActiveTab == tab}
				>
					{tab}
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

			.tabs-container {
				padding: 5px;
				width: 10em;
				display: flex;
				flex-direction: column;
				gap: 5px;

				.tab {
					height: 2em;
					line-height: 2em;
					text-align: center;
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
		}
	}

	.active {
		background-color: #242424;
	}
	@import "./mobile.scss";
</style>
