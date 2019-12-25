import Vue from 'vue'
import App from './App'
import router from './router'
import './directives'
import './components'
import store from './store'
import message from "./plugins/message";
import './filters'
//引入插件，弹窗
import VueSweetalert2 from './plugins/vue-sweetalert2'
import {mockArticles} from './mock/data'
import ls from './utils/localStorage'

Vue.use(VueSweetalert2);
Vue.use(message);
Vue.config.productionTip = false;
const AddMockData = (() => {
    // 是否加入测试数据
    const isAddMockData = true;
    // 用户数据
    let userArticles = ls.getItem('articles');

    if (Array.isArray(userArticles)) {
        userArticles = userArticles.filter(article => parseInt(article.uid) === 1)
    } else {
        userArticles = []
    }

    if (isAddMockData) {
        // 合并用户数据和测试数据，使用合并值作为所有文章
        store.commit('UPDATE_ARTICLES', [...userArticles, ...mockArticles(10)])
    } else {
        // 使用用户数据作为所有文章
        store.commit('UPDATE_ARTICLES', userArticles)
    }
})();
/* eslint-disable no-new */
new Vue({
    router,
    //将store注入到每一个子组件中，这样子组件就可以通过this.$store来访问到仓库。
    store,
    render: h => h(App)
}).$mount("#app")
