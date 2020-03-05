<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let selectedButton = 0;
</script>

<style>
  div {
    font-size: 0px;
  }

  button {
    background: var(--color-primary--100);
    font: inherit;
    font-size: 1rem;
    cursor: pointer;
    border: 1px solid var(--color-primary--100);
    padding: 0.5rem 1rem;
    transition: 0.1s ease-out;
    transition-property: background-color, border-color, color;
  }

  button:focus {
    outline: none;
  }

  button:first-of-type {
    border-radius: var(--border-radius) 0 0 var(--border-radius);
  }

  button:last-of-type {
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
  }

  button:hover,
  button:active,
  .active {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--color-primary-alt);
  }
</style>

<div>
  <button
    type="button"
    class:active={selectedButton === 0}
    on:click={() => {
      selectedButton = 0;
      dispatch('select', 0);
    }}>
    All
  </button>
  <button
    type="button"
    class:active={selectedButton === 1}
    on:click={() => {
      selectedButton = 1;
      dispatch('select', 1);
    }}>
    Favorites
  </button>
</div>
