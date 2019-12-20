import MessageComponent from "@/components/Message"

export default {
    //插件的公开方法 install
    install: (Vue) => {
        //使用Vue.extend基于传入的组件生成一个新的子类
        const Message = Vue.extend(MessageComponent);
        //new一个新的实例
        const vm = new Message();
        //手动挂载实例并返回实例目标
        const $el = vm.$mount().$el;
        Vue.nextTick(() => {
            //在下一次DOM更新后，将实例目标添加到#main-container元素内部的最前面
            document.querySelector('#main-container').prepend($el)
        })
        //监听show值得改变
        vm.$on('update:show', (value) => {
            //更改当前的show值
            vm.show = value;
        })
        //添加hide和show方法来显示和关闭提示框
        const message = {
            //更改消息并显示提示框，其逻辑跟之前写的showMsg一样
            show(msg = '', type = 'success') {
                vm.msg = msg;
                vm.type = type;
                vm.show = false;

                Vue.nextTick(() => {
                    vm.show = true;
                })
            },
            //关闭提示框
            hide() {
                Vue.nextTick(() => {
                    vm.show = false;
                })
            }
        };

        Vue.prototype.$message = message;
    }


}
