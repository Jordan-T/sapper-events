<script>
	import { createEventDispatcher } from "svelte";
	import eventsStore from "../../stores/events-store.js";
	import userStore from "../../stores/user-store.js";
	import { favoriteEvent, unfavoriteEvent } from "../../services/events";

	export let event;

	let favLoading = false;
	const dispatch = createEventDispatcher();

	$: isFav = event.favOf && event.favOf[$userStore.id] === true;

	function onEdit() {
		dispatch("edit", event.id);
	}

	function onFav() {
		favLoading = true;
		favoriteEvent(event.id, $userStore.id)
			.then(data => {
				const favOf = event.favOf === undefined ? {} : { ...event.favOf };
				favOf[$userStore.id] = true;
				eventsStore.updateEvent(event.id, { favOf });
			})
			.finally(() => {
				favLoading = false;
			});
	}

	function onUnFav() {
		favLoading = true;
		unfavoriteEvent(event.id, $userStore.id)
			.then(data => {
				const favOf = event.favOf === undefined ? {} : { ...event.favOf };
				delete favOf[$userStore.id];
				eventsStore.updateEvent(event.id, { favOf });
			})
			.finally(() => {
				favLoading = false;
			});
	}
</script>

<style lang="scss">
	.event {
		border: solid 1px $color-primary--100;
		border-radius: $border-radius;
		overflow: hidden;
		padding: 1rem;

		:global(img) {
			display: block;
			max-width: calc(100% + 2rem);
			margin: -1rem -1rem 1rem;
			height: auto;
		}
	}
</style>

<div class="event">
	<img
		src={event.imageUrl}
		alt={event.name}
		width="500"
		height="280"
		loading="lazy" />
	<h2>{event.name}{isFav ? ' ⭐️' : ''}</h2>
	<p>{event.description}</p>
	<a rel="prefetch" href={`events/${event.id}`}>See more</a>

	{#if $userStore.logged}
		{#if favLoading}
			LOADING
		{:else if isFav}
			<button type="button" on:click={onUnFav}>👎 Unfavorite</button>
		{:else}
			<button type="button" on:click={onFav}>👍 Favorite</button>
		{/if}
	{/if}

	{#if $userStore.role === 'admin'}
		<button type="button" on:click={onEdit}>Edit</button>
	{/if}
</div>
