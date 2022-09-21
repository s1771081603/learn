/* *
*执行单点和4G的方法
*/
import caiYunLoginJs from "./login";
import letLoginJs from "./letlogin";
import useCommonStore from "@/store/common";
import logPoint from "./logPoint";
const commonStore = useCommonStore();
interface params {
    pointName: string;
    sourceid?: string|null;
    marketName?: string|null;
}
function toLogin(options: params) {
    return new Promise((resolve, reject) => {
        var sourceid = options.sourceid;
        var pointName = options.pointName;
        var marketName = options.marketName;
        // 初始化超级属性平台及手机号码(平台根据自己的平台填写web、pc、wap、activity_marketing)
        sensors.registerPage({
            platForm: "activity_marketing",
            activityName: pointName,
        });
        sensors.quick("autoTrack");
        if (sourceid) {
            sensors.registerPage({
                channel: sourceid,
            });
        }
        caiYunLoginJs.getAccountCallback = (account, flag) => {
            if (account) {
                commonStore.setPhone(account);
                commonStore.setLoginState(true);
                sensors.putPhoneNumberInfo(account);
                //单点埋点
                if (flag) {
                    logPoint(`${pointName}_client`, sourceid, marketName);
                } else {
                    logPoint(`${pointName}_cookie_login`, sourceid, marketName);
                }
                resolve(account);
                return;
            }
            letLoginJs.successCallBack = function (data) {
                var phone = data.result.msisdn;
                if (phone.length === 11) {
                    commonStore.setPhone(phone);
                    commonStore.setLoginState(true);
                    sensors.putPhoneNumberInfo(phone);
                    logPoint(`${pointName}_4G`, sourceid, marketName);
                    resolve(phone);
                }
            };
            letLoginJs.errorCallBack = function () {
                reject();
            };
            letLoginJs.getNumber(5);
        };
        caiYunLoginJs.getAccount();
    });
}
export default toLogin;
