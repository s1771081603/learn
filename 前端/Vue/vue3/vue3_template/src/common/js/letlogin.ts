/**
 * 4G 取号登录
 */
import commonApi from "@/api/common";
export default {
    data: {
        "2": {
            appId: "300011941130",
            version: "1.2",
        },
        "3": {
            appId: "300011973178",
            version: "1.2",
        },
        "4": {
            appId: "300011980198",
            version: "1.2",
        },
        "5": {
            appId: "300011999053",
            version: "1.2",
        },
        apiVersion: 2,
        contextPath: "",
    },
    //获取配置
    getConfig: function () {
        return this.data[this.data.apiVersion];
    },
    getNumber: function (apiVersion) {
        if (apiVersion) {
            this.data.apiVersion = apiVersion;
        }
        var config = this.getConfig();
        var preSign = YDRZ.getSign(config.appId, config.version);
        this.getSign(preSign);
    },
    //获取前面
    getSign: function (preSign) {
        var data = {
            preSign: preSign,
        };
        commonApi.getSign(data).then((res) => {
            let data = res.data;
            if (data.code == 0) {
                this.getTokenInfo(data.result);
            } else {
                this.errorCallBack();
            }
        });
    },
    //拿到YDRZ的token
    getTokenInfo: function (sign) {
        var self = this;
        var config = self.getConfig();
        //3、通过jssdk获取token
        YDRZ.getTokenInfo({
            data: {
                version: config.version,
                appId: config.appId,
                sign: sign,
                openType: "0",
                expandParams: "",
                isTest: "1",
            },
            success: function (res) {
                console.log(res);
                //4、成功返回token,调用后台接口校验token并登录
                if (res.code === "000000") {
                    self.tokenValidate(res.token, res.userInformation);
                }
            },
            error: function (res) {
                self.errorCallBack();
                //没有成功获取token，不作处理
                console.log(res);
            },
        });
    },
    //校验token 获得手机号
    tokenValidate: function (token, userInformation) {
        let data = {
            type: 1,
            token: token,
            userInformation: userInformation,
            version: this.data.apiVersion,
        };
        commonApi.tokenValidate(data).then((res) => {
            let data = res.data;
            if (data.code == 0) {
                this.successCallBack(data);
            } else {
                this.errorCallBack();
            }
        });
    },
    successCallBack: function (response) {
        // TODO 取号成功回调, 请覆盖该方法
    },
    errorCallBack: function () {
        // 回调, 请覆盖该方法
    }
};
