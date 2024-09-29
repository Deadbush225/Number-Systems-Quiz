<script lang="ts">
	export let solved;
	$: solved;

	// $: console.log(solved);
</script>

<div class="button" class:solved class:wrong={solved == false}>
	<div class="container1">
		<div class="text1">Check</div>
	</div>
	<div class="container2"><div class="text2">✅</div></div>
</div>

<style lang="scss">
	.check {
		// display: none;
		// visibility: hidden;
		// background: red;
		display: inline-block;
		padding-right: 5px;
		position: relative;
		left: -30px;
		z-index: 5;
	}
	.container {
		display: inline-block;
		background-color: inherit;

		height: 100%;
		border-radius: 9px;
		width: auto;
		// transition: width 4s;
	}

	// @keyframes slide-out {
	// 	0% {
	// 		transform: translateX(0%);
	// 	}
	// 	30%,
	// 	80% {
	// 		transform: translateX(100%);
	// 	}
	// 	100% {
	// 		transform: translate(0%);
	// 	}
	// }

	button {
		position: relative;
		z-index: 10;
	}

	@keyframes shakeAnim {
		0% {
			left: 0;
		}
		1% {
			left: -5px;
		}
		2% {
			left: 5px;
		}
		3% {
			left: -8px;
		}
		4% {
			left: 8px;
		}
		5% {
			left: -5px;
		}
		6% {
			left: 3px;
		}
		7% {
			left: 0;
		}
	}
	/* ------------------------------------------------------------------------- */
	.solved {
		background-color: green !important;
		+ .check {
			// visibility: visible;
			// display: inline;
			// -webkit-animation: slide-out 3s forwards;
			// animation: slide-out 3s forwards;
		}
	}
	.wrong {
		.container1 {
			background-color: red !important;
		}
		&:active {
			position: relative;
			animation-name: shakeAnim;
			animation-duration: 3s;
			animation-iteration-count: 1;
			animation-timing-function: ease-in;
			cursor: pointer;
		}
	}

	.button {
		cursor: pointer;
		display: inline-flex;
		position: relative;
		// background-clip: content-box;
		// background-color: beige;
		border-radius: 5px;
		overflow: hidden;
		height: 1.7em;

		width: fit-content;

		.container1 {
			// border-radius: 5px;

			padding: 0 0.3em;
			background-color: green;
			display: flex;
			align-items: center;
			justify-content: center;
			z-index: 10;

			.text1 {
				// font-size: 0.5em;
			}
		}

		.container2 {
			display: inline-block;
			background-color: beige;
			width: 0;
			transition: width 0.5s;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;

			.text2 {
				position: relative;
				left: -1.5em;
				transition: left 0.5s;
				// font-size: 0.5em;
			}
		}

		&.solved {
			.container2 {
				width: 1.5em;

				.text2 {
					left: 0;
				}
			}
		}
	}
</style>
