<template>
    <div>
        <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {
                msg: '', // 消息
                msgType: '', // 消息类型
                msgShow: false // 是否显示消息，默认不显示
            }
        },
        /**
         * 组件内的路由导航守卫
         * @param to 即将要进入的路由目标
         * @param from 即将要离开的目标路由
         * @param next 一个用来解决当前钩子的方法，需要调用该方法确认或者中段路由。
         */
        beforeRouteEnter(to, from, next) {
            //路由的名称
            const fromName = from.name;
            const logout = to.params.logout;
            //确认导航
            next(vm => {
                //通过vm参数访问到组件实例，已登录时，评估路由名称
                if (vm.$store.state.auth) {
                    switch (fromName) {
                        case 'Register':
                            vm.showMsg('注册成功');
                            break;
                        case 'Login':
                            vm.showMsg('登录成功');
                            break;
                    }
                } else if (logout) {
                    vm.showMsg('注册成功')
                }
            })
        },
        computed: {
            auth() {
                return this.$store.state.auth;
            }
        },
        watch: {
            auth(value) {
                if (!value) {
                    this.showMsg('操作成功')
                }
            }
        },
        methods: {
            showMsg(msg, type = 'success') {
                this.msg = msg;
                this.msgType = type;
                this.msgShow = true
            }
        }
    }
</script>

<style scoped>

</style>
