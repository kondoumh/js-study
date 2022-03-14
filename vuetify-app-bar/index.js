new Vue({
  el: '#app',
  vuetify: new Vuetify({
    theme: {
      dark: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    }    
  }
  ),
  data: () => ({
    dropdown_favs: [
      { text: 'foo' },
      { text: 'bar' },
      { text: 'baz' },
      { text: 'qux' },
    ],
    dropdown_history: [
      { text: 'fuga' },
      { text: 'huga' },
      { text: 'piyo' },
    ],
    tab: null,
    length: 5,
  }),
  methods: {
    greet: () => {
      console.log('hello');
    }
  },
  watch: {
    length (val) {
      this.tab = val - 1
    },
  },
})
