import Vue from 'vue'
import Message from './Message'
import Modal from "./Modal";
import Pagination from './Pagination'
import Slider from "./Slider";

const components = {
    Message,
    Modal,
    Pagination,
    Slider
};
//Object.entries() 可以把一个对象的键值以数组的形式遍历出来[['Message','Message'],['Modal','Modal']]
for (const [key, value] of Object.entries(components)) {
    Vue.component(key, value)
}

