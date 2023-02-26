<template>
  <header>
    <h2>Scrapbox graph</h2>
    <select v-model="project" @change="onChange">
      <option>help-jp</option>
      <option>comic-forum</option>
      <option>icons</option>
    </select>
  </header>
</template>

<script setup>
  const project = useState('selected-project', () => {
    return 'help-jp';
  });
</script>

<style scoped>
header {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 50px;
}

h2 {
  margin: 0;
  margin-left: 1em;
  text-align: left;
}

select {
  position: fixed;
  top: 0px;
  right: 0px;
  margin: 1em;
}
</style>
