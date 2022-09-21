// 引入上一步从github安装的jsonp，
// 即“原始jsonp”（与下面自己封装的“jsonp”区分开）
import originJSONP from "jsonp";

// param1：我们希望url仅仅是一个纯净的地址
// param2：后面的各种参数通过data传入，然后拼接在一起
// param3：option对应原始jsonp的第二个参数：opts
export default function jsonp(url, data, option = {}) {
    // 拼接url时判断是否已有问号
    url += (url.indexOf("?") > -1 ? "&" : "?") + param(data);
    return new Promise((resolve, reject) => {
        originJSONP(url, option, (err, data) => {
            // 如果没错误，就resolve(data)
            if (!err) {
                resolve(data);
            } else {
                reject(err);
            }
        });
    });
}

// 将data（参数对象）封装到url里面
function param(data) {
    let url = "";
    for (let i in data) {
        let value = data[i] !== undefined ? data[i] : "";
        // url拼接参数，参数之间用&隔开
        url += `&${i}=${encodeURIComponent(value)}`;
    }
    // 如果url有data，将第一个"&"删掉
    return url ? url.substring(1) : "";
}
