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
    length: 5
  }),
  watch: {
    length (val) {
      this.tab = val - 1
    },
  },
})
