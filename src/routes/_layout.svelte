<script>
	import {onDestroy} from 'svelte';
	import PageNav from '../components/Page/PageNav.svelte';
	import PageLoadingBar from '../components/Page/PageLoadingBar.svelte';
	import userStore from '../stores/user-store.js';

	import { stores } from '@sapper/app';
	const { preloading } = stores();

	export let segment;

	let user = null;

	const unsubscribe = userStore.subscribe(userStored => {
		user = userStored;
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<style lang="scss" global>
	@import "../styles/global";

	main {
		position: relative;
		max-width: 56em;
		padding: 2em;
		margin: 0 auto;
	}
</style>

<PageLoadingBar preloading={preloading} />

<PageNav {segment}/>

<main>
	<slot></slot>
	<p>USER:</p>
	<pre>{JSON.stringify(user, null, 2)}</pre>
</main>
