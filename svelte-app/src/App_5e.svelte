<script>
  import Outer from './Outer5e.svelte';

  function handleMessage(event) {
    alert(event.detail.text);
  }
</script>

<Outer on:message={handleMessage}/>
