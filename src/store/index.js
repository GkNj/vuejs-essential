import Vue from 'vue'
import Vuex from 'vuex'
import ls from '../utils/localStorage'
import router from '../router'

Vue.use(Vuex)

//共享状态 在这里不能直接更改状态  但是可以通过store.state.user的方式访问状态
const state = {
    user: ls.getItem('user'),
    //保存当前用户的登录状态
    auth: ls.getItem('auth')
}
//更改状态的方法，在这里可以更改状态，像store.commit('UPDATE_USER'，"user")这样提交一个事件类型，
//这里不能包含异步操作
const mutations = {
    //UPDATE_USER是事件类型，不一定要用大写
    UPDATE_USER(state, user) {
        state.user = user
        ls.setItem('user', user)
    },
    UPDATE_AUTH(state, auth) {
        state.auth = auth
        ls.setItem("auth", auth)
    }
}
//action的第一个参数是与仓库具有相同属性和方法的context对象，可以通过context.state访问到state的状态，
// 使用context.commit来提交一个事件类型，可以在第一个参数使用参数解构来简化代码，比如{commit}
const actions = {
    login({commit}, user) {
        //登录时如果传了用户信息就更新用户信息
        if (user) commit('UPDATE_USER', user)
        commit('UPDATE_AUTH', true)
        router.push('/')
    },
    logout({commit}, user) {
        commit('UPDATE_AUTH', false)
        router.push({ name: 'Home', params: { logout: true } })
    }
}
//不使用参数解构的action的写法
// const actions={
//     login(context,user){
//         if (user) context.commit('UPDATE_USER',user)
//         router.push("/")
//     }
// }

const store = new Vuex.Store({
    state,
    mutations,
    actions
})

export default store
