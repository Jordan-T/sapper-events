<script>
  import { createEventDispatcher } from "svelte";

  export let event;

  const dispatch = createEventDispatcher();

  function onEdit() {
    dispatch("edit", event.id);
  }
</script>

<style lang="scss">
  .event {
    border: solid 1px var(--color-primary--100);
    border-radius: var(--border-radius);
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
  <img src={event.imageUrl} alt={event.name} width="500" height="280" />
  <h2>{event.name}</h2>
  <p>{event.description}</p>
  <a rel="prefetch" href={`events/${event.id}`}>See more</a>
  <button type="button" on:click={onEdit}>Edit</button>
</div>
