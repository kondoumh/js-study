<script setup lang="ts">
const route = useRoute();
const {id} = route.query;
const articles = [{
  id: 1,
  title: 'Hello Nuxt',
  content: 'Introduction to Nuxt'
}, {
  id: 2,
  title: 'Hello Vue',
  content: 'Introduction to Vue'
}, {
  id: 3,
  title: 'Hello TypeScript',
  content: 'Introduction to TypeScript'
}];
const article = ref<{ id: number, title: string, content: string }>(null);
article.value = articles.find(article => +id === article.id);
</script>

<template>
  <div>
    <article v-if="article">
      <p>title:{{ article.title }}</p>
      <hr />
      <div style="width: 500px;">{{ article.content }}</div>
    </article>
    <NuxtLink to="/">Back</NuxtLink>
  </div>
</template>
