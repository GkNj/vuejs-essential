import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'

Vue.use(Router)

const router = new Router({
    // mode：路由模式，默认值 'hash' 使用井号（ # ）作路由，
    // 值 'history' 可利用 History API 来完成页面跳转且无须重新加载；
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    //从仓库里获取登录信息
    const auth = router.app.$options.store.state.auth;
    if (auth && to.path.indexOf('/auth/') != -1) {
        next('/')
    } else {
        next()
    }
})

export default router
