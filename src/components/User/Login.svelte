<script>
	import { createEventDispatcher } from "svelte";
	import userStore from "../../stores/user-store";

	export let withClose = false;

	const dispatch = createEventDispatcher();

	function login() {
		userStore.setUser({
			id: "AAA",
			name: "John Doe",
			role: "admin"
		});

		dispatch("close");
	}
</script>

{#if !$userStore.logged}
	<button on:click={login}>Login</button>
{:else}
	<h1>Already logged</h1>
{/if}

{#if withClose}
	<button type="button" on:click={dispatch('close')}>Close</button>
{/if}
