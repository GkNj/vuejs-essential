import Vue from 'vue'
import App from './App'
import router from './router'
import './directives'
import './components'
import store from './store'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    router,
    //将store注入到每一个子组件中，这样子组件就可以通过this.$store来访问到仓库。
    store,
    render: h => h(App)
}).$mount("#app")
