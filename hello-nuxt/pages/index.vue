<script setup lang="ts">
const articles = ref< { id: number, title: string }[]>([]);
articles.value = [
  { id: 1, title: 'Hello Nuxt' },
  { id: 2, title: 'Hello Vue' },
  { id: 3, title: 'Hello TypeScript' },
];
</script>

<template>
  <div>
    <p>New articles!!</p>
    <ul>
      <li v-for="article in articles" :key="article.id">
        <NuxtLink :to="{path: '/details', query: { id:article.id }}">
          {{ article.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
