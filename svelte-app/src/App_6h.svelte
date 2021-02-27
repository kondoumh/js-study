<script>
  let html = '<p>Write some text!</p>'
</script>

<div
  contenteditable="true"
  bind:innerHTML={html}
></div>

<style>
  [contenteditable] {
    padding: 0.5em;
    border: 1px solid #eee;
    border-right: 4px;
  }
</style>
