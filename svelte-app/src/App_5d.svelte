<script>
  import Inner from './Inner5d.svelte'

  function handleMessage(event) {
    alert(event.detail.text)
  }
</script>

<Inner on:message={handleMessage}/>
