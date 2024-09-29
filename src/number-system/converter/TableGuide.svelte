<script lang="ts">
	import { truncateToSixDecimals } from "./converter";

	export let radix: number;

	let exponents = [
		[8, 7, 6, 5, 4, 3, 2, 1],
		[-1, -2, -3, -4, -5, -6],
	];
</script>

<div class="table-container">
	{#each exponents as sign}
		<div class="table">
			<div class="row">
				{#each sign as exponent}
					{#if radix ** exponent < 5000}
						<div class="cell">
							<div class="title">
								<!-- {`$$1^2$$`} -->
								{`$$\{` + radix + `}^{` + exponent + `}$$`}

								<!-- {`$$${radix}^${exponent}$$`} -->
							</div>
							<div class="value">
								{truncateToSixDecimals((radix ** exponent).toString())}
							</div>
						</div>
					{/if}
				{/each}
			</div>
			<!-- <div class="row">
				{#each sign as exponent}
					{#if radix ** exponent < 5000}
						<td>
						</td>
					{/if}
				{/each}
			</div> -->
		</div>
	{/each}
</div>

<style lang="scss">
	table {
		width: 100%;
		table-layout: fixed;
		tr:first-child {
			background-color: #323232;
		}

		tr {
			td {
				// width: 3em;
				text-align: center;
			}
		}
	}

	.table-container {
		margin: 1.5em;
		margin-top: 1.3em;
		// margin-bottom: 0.5em;
		// padding: 1em;
	}

	.table {
		display: flex;
		flex-direction: column;
		margin-bottom: 0.7em;

		.row {
			display: flex;
			flex-direction: row;
			border-radius: 5px;
			overflow: hidden;
			border-bottom: 2em;
		}

		.cell {
			display: flex;
			flex-direction: column;
			flex: 1;

			.title {
				&:first-child {
					background-color: #323232;
				}
			}
			.value {
				text-align: center;
			}
		}
	}

	@media screen and (max-width: 800px) {
		// .table {

		.row {
			flex-wrap: wrap;
			border-radius: 0 !important;
			column-gap: 0.5em;
			row-gap: 0.5em;
			align-items: center;
		}
		.cell {
			border: 1px solid #444444;
			border-radius: 5px;
			// background-color: red;
			flex-direction: row !important;
			.value {
				// margin: auto;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 0.5em;
			}
			.title {
				padding: 0 0.5em;
			}
		}

		// }
	}
</style>
