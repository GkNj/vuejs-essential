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
    /**
     * scrollBehavior 只在支持 history.pushState 的浏览器中可用，
     * history.pushState 用来在浏览历史中添加一条新的记录。
     * @param to
     * @param from
     * @param savedPosition
     * @returns {{x: number, y: number}|{selector: *}|*}
     */
    // 指定滚动行为
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            // 有锚点时，滚动到锚点
            return {selector: to.hash}
        } else if (savedPosition) {
            // 有保存位置时，滚动到保存位置
            return savedPosition
        } else {
            // 默认滚动到页面顶部
            return {x: 0, y: 0}
        }
    },
    routes
});


router.beforeEach((to, from, next) => {
    const app = router.app;
    const store = app.$options.store;
    const auth = store.state.auth;
    //从路由中获取文章Id
    const articleId = to.params.articledId;
    //当前用户
    const user = store.state.user && store.state.user.name;
    // 路由参数中的用户
    const paramUser = to.params.user;
    app.$message.hide();

    if (
        (auth && to.path.indexOf('/auth/') !== -1) ||
        (!auth && to.meta.auth) ||
        //有文章ID但是不能找到对应的文章，跳转到首页
        (articleId && !store.getters.getArticleById(articleId)) ||
        // 路由参数中的用户不为当前用户，且找不到与其对应的文章时，跳转到首页
        (paramUser && paramUser !== user && !store.getters.getArticlesByUid(null, paramUser).length)
    ) {
        next('/')
    } else {
        next()
    }
});
//注册全局后置钩子，在导航确认后调用
router.afterEach((to, from) => {
    const app = router.app;
    const store = app.$options.store;
    const showMsg = to.params.showMsg;
    if (showMsg) {
        if (typeof showMsg === 'String') {
            app.$message.show(showMsg)
        } else {
            app.$message.show('操作成功')
        }
    }
})

export default router
