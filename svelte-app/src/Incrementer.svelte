<script>
  import { count } from './stores';

  function increment() {
    // increment the count
    count.update(n => n + 1);
  }
</script>

<button on:click={increment}>
  +
</button>
