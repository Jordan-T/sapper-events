<script context="module">
  import { getEvents } from "../../services/events";
  export async function preload({ params, query }) {
    return getEvents
      .call(this)
      .then(events => {
        return { events };
      })
      .catch(err => {
        this.error(500, err.message);
      });
  }
</script>

<script>
  export let events;
</script>

<style lang="scss">
  .events {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
  .event {
    border: solid 1px rgba(255, 62, 0, 0.1);
    border-radius: 0.3rem;
    overflow: hidden;
    padding: 1rem;

    :global(img) {
      display: block;
      max-width: calc(100% + 2rem);
      margin: -1rem -1rem 1rem;
      height: auto;
    }
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

<div class="events">
  {#each events as event (event.id)}
    <div class="event">
      <img src={event.image} alt={event.name} width="500" height="280" />
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      <a rel="prefetch" href={`events/${event.id}`}>See more</a>
    </div>
  {:else}
    <div class="no-events">No events</div>
  {/each}
</div>

<a rel="prefetch" href={`events/bad`}>☠️ bad event ☠️</a>

<pre>{JSON.stringify(events, null, 2)}</pre>
