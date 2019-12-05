// 在 el 元素的上方显示或隐藏一个内容为 title 的提示框
function showTitle(el, title) {
    const popover = getPopover()
    const popoverStyle = popover.style

    if (title === undefined) {
        popoverStyle.display = 'none'
    } else {
        const elRect = el.getBoundingClientRect()
        const elComputedStyle = window.getComputedStyle(el, null)
        const rightOffset = parseInt(elComputedStyle.getPropertyValue('padding-right')) || 0
        const topOffset = parseInt(elComputedStyle.getPropertyValue('padding-top')) || 0

        popoverStyle.visibility = 'hidden'
        popoverStyle.display = 'block'
        popover.querySelector('.popover-content').textContent = title
        popoverStyle.left = elRect.left - popover.offsetWidth / 2 + (el.offsetWidth - rightOffset) / 2 + 'px'
        popoverStyle.top = elRect.top - popover.offsetHeight + topOffset + 'px'
        popoverStyle.display = 'block'
        popoverStyle.visibility = 'visible'
    }
}

// 创建或者返回一个提示框
function getPopover() {
    let popover = document.querySelector('.title-popover')

    if (!popover) {
        const tpl = `
      <div class="popover title-popover top fade in" style="position:fixed;">
        <div class="arrow"></div>
        <div class="popover-content"></div>
      </div>
    `
        const fragment = document.createRange().createContextualFragment(tpl)

        document.body.appendChild(fragment)
        popover = document.querySelector('.title-popover')
    }

    return popover
}

export default {
        //bind只调用一次，指令第一次绑定到元素时调用，在这里可以进行一次性的初始化设置
        // eslint-disable-next-line no-unused-vars
    bind(el, binding, vnode) {
        // 使用 const 声明一个只读的常量，其值是需要监听的事件类型列表
        const events = ['mouseenter', 'mouseleave', 'click']
        // 声明一个处理器，以根据不同的事件类型传不同的参数
        const handler = (event) => {
            if (event.type === 'mouseenter') {
                //显示一个提示框
                showTitle(el, binding.value)
            } else {
                //隐藏一个提示框
                showTitle()
            }
        }
        //为el添加监听事件
        events.forEach((event) => {
            el.addEventListener(event, handler, false)
        })
        //在el元素上添加一个属性，以便其他钩子访问
        el.destroy = () => {
            // 移除 el 元素上的事件监听
            events.forEach((event) => {
                // 移除 el 元素上的 destroy
                el.removeEventListener(event, handler, false)
            })
            el.destroy = null
        }
    },
    unbind(el) {
        // 移除事件监听和数据绑定
        el.destroy()
    }
}
