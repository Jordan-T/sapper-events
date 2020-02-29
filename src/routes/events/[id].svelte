<script context="module">
  import { getEvent } from "../../services/events";
  export async function preload({ params, query }) {
    // the `id` parameter is available because
    // this file is called [id].svelte
    return getEvent
      .call(this, params.id)
      .then(event => {
        return { event };
      })
      .catch(err => {
        this.error(404, err.message);
      });
  }
</script>

<script>
  export let event;
</script>

<style lang="scss">
  .event {
    display: grid;
    grid-gap: 1.5rem;
    @media (min-width: 500px) {
      grid-template-areas:
        "link link"
        "image content";
      grid-template-columns: minmax(200px, 500px) minmax(250px, 1fr);
    }

    :global(img) {
      grid-area: image;
      display: block;
      max-width: 100%;
      height: auto;
    }

    :global(.back) {
      grid-area: link;
    }

    :global(.content) {
      grid-area: content;
    }
  }
  .no-event {
  }
</style>

<svelte:head>
  <title>Event: {event.name}</title>
</svelte:head>

<div class="event">
  <a rel="prefetch" class="back" href="/events">Back to events</a>

  <img src={event.imageUrl} alt={event.name} width="500" height="380" />
  <div class="content">
    <h1>{event.name}</h1>
    <p>{event.description}</p>
  </div>
</div>
<pre>{JSON.stringify(event, null, 2)}</pre>
