<script setup lang="ts">
const { fetchArticles, articles } = useArticles();
fetchArticles();
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
