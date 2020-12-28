import Vue from 'vue'

import App from './common/ui/App.vue'
import router from './router'
import store from './common/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
