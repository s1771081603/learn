/* *
    * 跳转小程序获得scheme链接
*/
import commonApi from "@/api/common";
import utils from "./utils";

export default {
    code: 0,
     /* 
    * obj:{
        marketName<string>  或者 传（appId appKey	secretKey）
        phone<string>?	登录传手机号没有就不传
        pageType<string>? 页面路径pagetype： 1-首页个人云 2-首页个人云（用户已登录拉起上传弹窗） 3-首页家庭云 4-首页共享云 5-首页我的 6-个人云文件夹 7-我的卡包 8-发现广场 9-分享页 10-广告页 11-广告页（可分享）
        channel<string>?	需区分渠道时选填，当渠道号不一致时，将分配或切换不同的fromSource。渠道号规则固定为（20001,20002,20003,20004,20005,20006,20007,20008,20009,20010）
        fileId<string>?	文件夹ID：pagetype为6、7时必填（填写说明提供原生成工具可选文件夹目录ID）
        shareId<string>?	分享ID：pagetype为9时必填，规则：文件id-文件提取码
        advertisement<string>?	动页URL：pagetype为10、11时必填，需与营销平台投放中广告页校验
    }
  */
    getScheme(obj) {
        obj.phone = obj.phone ? utils.publicKeyEncrypt(obj.phone) : "";
        return new Promise((resolve, reject) => {
            commonApi
                .getScheme(obj)
                .then((res) => {
                    let data = res.data;
                    if (data.code === 0) {
                        let result = data.result;
                        if (result.code === 0) {
                            resolve(result.data);
                        } else {
                            let msg = this.schemeErrMsg(result.code);
                            reject(msg || result.message);
                        }
                    } else {
                        reject("获取scheme链接失败");
                    }
                })
                .catch((err) => {
                    reject("获取scheme链接失败");
                });
        });
    },
    schemeErrMsg(code) {
        let errCode = Number(code);
        this.code = code;
        switch (errCode) {
            case 44990:
                return "活动太火爆，请稍后重试";
                break;
            case 45009:
                return "今日访问已达上限,请明日再试";
                break;
            case 500205:
            case 500206:
            case 500208:
                return "系统开小差，请刷新重试";
                break;
            case 500207:
                return "今日访问已达上限，请明日再试";
                break;
            case 500209:
                return "访问页面无效";
                break;
            case 7001:
                return "访问id失效";
                break;
            default:
                return false;
        }
    },
}