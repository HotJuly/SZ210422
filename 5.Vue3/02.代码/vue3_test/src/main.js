import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')

// new Vue({
//     store,
//     router,
//     render:h=>h(App)
// })

// Vue.use(Vuex)
// Vue.use(VueRouter)