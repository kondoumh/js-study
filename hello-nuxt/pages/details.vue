<script setup lang="ts">
const route = useRoute();
const {id} = route.query;
const { fetchArticle, article } = useArticles();
fetchArticle(+id);
</script>

<template>
  <div>
    <article v-if="article">
      <p>title:{{ article.title }}</p>
      <hr />
      <div style="width: 500px;">{{ article.content }}</div>
    </article>
    <NuxtLink to="/">Back</NuxtLink>
    <Advertisement />
  </div>
</template>
