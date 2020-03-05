<script>
	import { goto } from '@sapper/app';
	import userStore from '../stores/user-store';

	if($userStore.name) {
		goto('/');
	}

	function login() {
		userStore.setUser({
			name: 'John Doe'
		});

		goto('/');
	}
</script>

{#if !$userStore.logged}
	<h1>Login page</h1>

	<button on:click={login}>Login</button>
{:else}
	<h1>Already logged</h1>

	<a href="/">Back to home</a>
{/if}
