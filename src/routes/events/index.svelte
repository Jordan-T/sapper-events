<script context="module">
	import { getEvents } from "../../services/events";
	export async function preload({ params, query }) {
		return getEvents
			.call(this)
			.then(events => {
				return { fetchedEvents: events.reverse() };
			})
			.catch(err => {
				this.error(500, err.message);
			});
	}
</script>

<script>
	import { onMount, onDestroy } from "svelte";
	import events from "../../stores/events-store.js";
	import userStore from "../../stores/user-store.js";
	import Button from "../../components/UI/Button.svelte";
	import EventFilter from "../../components/Event/EventFilter.svelte";
	import EventItem from "../../components/Event/EventItem.svelte";

	export let fetchedEvents;

	let loadedEvents = fetchedEvents;
	let editMode;
	let editedId;
	let isLoading;
	let unsubscribe;
	let EditEvent;

	let favsOnly = false;

	$: if ($userStore.logged === false) {
		favsOnly = false;
	}

	$: filteredEvents = favsOnly
		? loadedEvents.filter(e => e.favOf && e.favOf[$userStore.id])
		: loadedEvents;

	$: if ($userStore.role === "admin") {
		import("../../components/Event/EditEvent.svelte").then(cpt => {
			EditEvent = cpt.default;
		});
	}

	onMount(() => {
		unsubscribe = events.subscribe(items => {
			loadedEvents = items;
		});
		events.setEvents(fetchedEvents);
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});

	function setFilter(event) {
		favsOnly = event.detail === 1;
	}

	function savedEvent(event) {
		editMode = null;
		editedId = null;
	}

	function cancelEdit() {
		editMode = null;
		editedId = null;
	}

	function startEdit(event) {
		editMode = "edit";
		editedId = event.detail;
	}

	function startAdd() {
		editMode = "edit";
	}
</script>

<style lang="scss">
	.event-controls {
		display: flex;
		width: 100%;
		justify-content: space-between;
		margin-bottom: 1.5rem;
	}
	.events {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		grid-gap: 1.5rem;
		margin-bottom: 1.5rem;
	}
	.no-events {
		grid-column: 1 / -1;
		padding: 1rem 1.5rem;
		background: #eee;
		border-radius: 0.3rem;
		text-align: center;
	}
</style>

<svelte:head>
	<title>Events</title>
</svelte:head>

<h1>This is my events</h1>

{#if editMode === 'edit'}
	<svelte:component
		this={EditEvent}
		id={editedId}
		on:save={savedEvent}
		on:cancel={cancelEdit} />
{/if}
{#if isLoading}
	<h1>LOADING...</h1>
{:else}
	{#if $userStore.logged}
		<section class="event-controls">
			<EventFilter on:select={setFilter} />
			{#if $userStore.role === 'admin'}
				<Button on:click={startAdd}>New Event</Button>
			{/if}
		</section>
	{/if}
	<div class="events">
		{#if filteredEvents.length === 0}
			<div class="no-events">No events found, you can start adding some.</div>
		{/if}
		{#each filteredEvents as event (event.id)}
			<EventItem {event} on:edit={startEdit} />
		{/each}
	</div>
{/if}

<a rel="prefetch" href={`events/bad`}>☠️ bad event ☠️</a>

<pre>{JSON.stringify(filteredEvents, null, 2)}</pre>
