<script>
	export let type = "button";
	export let href = null;
	export let mode = null;
	export let color = null;
	export let disabled = false;
</script>

<style lang="scss">
	button,
	a {
		font: inherit;
		border: 1px solid $color-primary;
		background: $color-primary;
		padding: 0.5rem 1rem;
		color: $color-primary-alt;
		border-radius: $border-radius;
		cursor: pointer;
		text-decoration: none;
		transition: background-color 0.1s ease-out;
	}

	button:focus {
		outline: none;
	}

	button:hover,
	button:active,
	a:hover,
	a:active {
		background: $color-primary--hover;
		border-color: $color-primary--hover;
	}

	button:disabled,
	button:disabled:hover,
	button:disabled:active {
		background: #ccc;
		border-color: #ccc;
		color: #959595;
		cursor: not-allowed;
	}

	.success {
		background: #01a129;
		border-color: #01a129;
	}

	.success:hover,
	.success:active {
		background: #1ac745;
		border-color: #1ac745;
	}

	.outline {
		background: transparent;
		color: $color-primary;
	}

	.outline:hover,
	.outline:active {
		background: $color-primary--100;
	}

	.outline:disabled,
	.outline:disabled:hover,
	.outline:disabled:active {
		background: transparent;
		color: #ccc;
	}

	.outline.success {
		border-color: #01a129;
		color: #01a129;
	}

	.outline.success:hover,
	.outline.success:active {
		background: #c2ffd1;
	}
</style>

{#if href}
	<a {href}>
		<slot />
	</a>
{:else}
	<button class="{mode} {color}" {type} on:click {disabled}>
		<slot />
	</button>
{/if}
