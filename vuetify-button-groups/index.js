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
  }),
  methods: {
    greet: () => {
      console.log('hello');
    }
  }
})
