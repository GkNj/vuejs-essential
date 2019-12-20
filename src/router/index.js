import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'

Vue.use(Router)

const router = new Router({
    // mode：路由模式，默认值 'hash' 使用井号（ # ）作路由，
    // 值 'history' 可利用 History API 来完成页面跳转且无须重新加载；
    mode: 'history',
    //linkExactActiveClass的值是一个类名，用来添加到与当前路由对应的<router-link></router-link>上，
    //以显示当前激活的<router-link>，默认值是'router-link-exact-active'，这里改为‘active’是为了利用
    // Bootstrap的样式
    linkExactActiveClass: 'active',
    routes
})

const that=this;
router.beforeEach((to, from, next) => {
    const app = router.app;
    const store = app.$options.store;
    const auth = store.state.auth;
    app.$message.hide();

    if (
        (auth && to.path.indexOf('/auth/') !== -1) ||
        (!auth && to.meta.auth)
    ) {
        next('/')
    } else {
        next()
    }
});

export default router
