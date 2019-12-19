import Vue from 'vue'
import validator from './validator'
import dropdown from './dropdown'

const directives = {
    validator,
    dropdown
}
//循环注册所有的指令
//Object.entries()方法返回给定对象的键值对数组
for (const [key, value] of Object.entries(directives)) {
    // console.log([key, value]);
    Vue.directive(key, value)
}

