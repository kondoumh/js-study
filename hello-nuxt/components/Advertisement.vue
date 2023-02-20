<script setup lang="ts">
const ads = ref<{ id: number, title: string, url: string }[]>([]);
ads.value = [{
  id: 1,
  title: 'We are hiring!',
  url: 'https://www.google.com'
}, {
  id: 2,
  title: 'Webinar: How to use Nuxt3',
  url: 'https://www.google.com'
}];
</script>

<template>
  <hr />
  <p style="margin: 0.2rem 0">Advertisement</p>
  <ul style="list-style-type:none;padding-left:0;">
    <li v-for="ad in ads" :key="ad.id">
      <a :href="ad.url">{{ ad.title }}</a>
    </li>
  </ul>
</template>
