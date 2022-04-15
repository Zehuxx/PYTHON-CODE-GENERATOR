import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueHighlightJS from 'vue-highlight.js';
import python from 'highlight.js/lib/languages/python';

import 'highlight.js/styles/default.css';

Vue.use(VueHighlightJS, {
	languages: {
		python
	}
});

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
