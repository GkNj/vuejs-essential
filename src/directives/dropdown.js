/**
 * 导出下拉菜单指令对象
 */
export default {
    bind(el, binding, vnode) {
        //当前元素的事件处理器
        const handler = () => {
            //找到当前元素的父元素，切换它的open类
            el.parentElement.classList.toggle('open')
        };
        //document的事件处理器
        const documentHandler = (e) => {
            //当前的点击目标
            const target = e.target;
            //如果点击的是当前元素或者当前元素的后代节点就不处理
            if (target.isSameNode(el) || el.contains(target)) {
                return;
            }
            //找到当前元素的父元素，移除open类
            el.parentElement.classList.remove('open');
        };

        el.addEventListener('click', handler, false);
        document.addEventListener('click', documentHandler, false);
        el.destroy = () => {
            el.removeEventListener('click', handler, false);
            document.removeEventListener('click', documentHandler, false);
            el.destroy = null;
        }
    },
    unbind(el) {
        el.destroy()
    }

}
