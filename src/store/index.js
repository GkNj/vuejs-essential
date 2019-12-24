import Vue from 'vue'
import Vuex from 'vuex'
import ls from '../utils/localStorage'
import router from '../router'
import * as moreActions from './action'

Vue.use(Vuex);

//共享状态 在这里不能直接更改状态  但是可以通过store.state.user的方式访问状态
const state = {
    user: ls.getItem('user'),
    //保存当前用户的登录状态
    auth: ls.getItem('auth'),
    articles: ls.getItem('articles')
};
//更改状态的方法，在这里可以更改状态，像store.commit('UPDATE_USER'，"user")这样提交一个事件类型，
//这里不能包含异步操作
const mutations = {
    //UPDATE_USER是事件类型，不一定要用大写
    UPDATE_USER(state, user) {
        state.user = user;
        ls.setItem('user', user)
    },
    UPDATE_AUTH(state, auth) {
        state.auth = auth;
        ls.setItem("auth", auth)
    },
    UPDATE_ARTICLES(state, articles) {
        state.articles = articles;
        ls.setItem('articles', articles)
    }
};
//action的第一个参数是与仓库具有相同属性和方法的context对象，可以通过context.state访问到state的状态，
// 使用context.commit来提交一个事件类型，可以在第一个参数使用参数解构来简化代码，比如{commit}
const actions = {
    login({commit}, user) {
        //登录时如果传了用户信息就更新用户信息
        if (user) {
            commit('UPDATE_USER', user)
        }
        commit('UPDATE_AUTH', true);
        router.push('/')
    },
    logout({commit}, user) {
        commit('UPDATE_AUTH', false);
        router.push({name: 'Home', params: {logout: true}})
    },
    //更新个人信息
    updateUser({state, commit}, user) {
        const stateUser = state.user;
        if (stateUser && typeof stateUser === 'object') {
            // 合并新旧个人信息，等价于 user = Object.assign({}, stateUser, user)
            user = {...stateUser, ...user};
            console.log(user);
            // Object.assign()
        }
        commit('UPDATE_USER', user);
    },
    // 使用对象展开运算符混入 moreActions
    //const actions = Object.assign(actions, moreActions)跟对象展开运算符一样
    ...moreActions

}
//不使用参数解构的action的写法
// const actions={
//     login(context,user){
//         if (user) context.commit('UPDATE_USER',user)
//         router.push("/")
//     }
// }
const getters = {

    getArticleById: (state) => (id) => {
        let articles = state.articles;
        if (Array.isArray(articles)) {
            //传进来的id如果和文章的articleId相同就返回这些文章
            articles = articles.filter(article => parseInt(id) === parseInt(article.articleId));
            // 根据文章长度，返回文章或者 null
            return articles.length ? articles[0] : null;
        } else {
            return null;
        }
    }
};
const store = new Vuex.Store({
    getters,
    state,
    mutations,
    actions
});

export default store
