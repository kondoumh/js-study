new Vue({
  el: '#app',
  vuetify: new Vuetify({
    theme: {
      dark: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    }    
  }
  ),
  data: () => ({
    tab: null,
    items: [
      'web', 'shopping', 'videos', 'images', 'news', 'item1', 'item2', 'item3', 'item4', 'item5', 'item6'
    ],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  }),
})
