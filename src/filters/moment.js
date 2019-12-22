import moment from 'moment'

//设置语言为中文
moment.locale('zh-cn')

//参数 ...rest 使用了剩余语法，我们使用它将一个不定数量的参数表示为一个数组
export default function (value, ...rest) {
    //获取第一个日期参数
    const date = value;
    //验证日期是否合法
    if (moment(date).isValid()) {
        //获取第二个参数
        const key = rest.shift();
        if (key && typeof key === 'string') {
            switch (key) {
                case 'from':
                    //格式化日期为多久之前
                    value = moment(date).from();
                    //获取第三个参数
                    const otherOpts = rest.shift();
                    if (otherOpts && typeof otherOpts === 'object') {
                        //如果参数有startOf属性，就使用startOf的值作为开始值
                        value = moment(date).startOf(otherOpts.startOf).from();
                    }
                    break;
                default:
                    //直接使用第二个参数进行格式化
                    value = moment(date).format(key);
            }
        }
    }
    return value;
}
