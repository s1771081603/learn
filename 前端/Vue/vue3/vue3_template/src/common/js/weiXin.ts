import wx from "weixin-js-sdk";
import jsonp from "./jsonp";
let again = false;
export default {
    init() {
        if (typeof wx == "object" || this.isWeiXin() || this.isQQ()) {
            this.startConfig();
            let _this = this;
            wx.error(function () {
                if (!again) {
                    _this.startConfig();
                    again = true;
                }
            });
        }
    },
    startConfig() {
        jsonp(`https://caiyun.feixin.10086.cn:7071/portal/auth/weixinLogin.action?op=sign4jsonp`, {
            referer: location.href.split("#")[0] + "",
        },{
            prefix: "jQuery_"
        })
            .then((data: any) => {
                wx.config({
                    // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.appId, // 必填，公众号的唯一标识
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
                    signature: data.signature, // 必填，签名
                    jsApiList: ["chooseImage", "updateAppMessageShareData", "updateTimelineShareData"], // 必填，随意一个接口即可
                    openTagList: ["wx-open-launch-weapp"], // 填入打开小程序的开放标签名
                });
            })
            .catch((err) => {
                console.log("ajax error: ", err);
            });
    },
    wxShare(data) {
        var baseUrl = `${location.origin}/portal/`;
        data.link = baseUrl + "CaiyunAuthServlet?isShare=true&url=" + encodeURIComponent(data.link);
        var imgUrl = data.imgUrl;
        if (imgUrl.indexOf("http") !== 0) {
            data.imgUrl = baseUrl + imgUrl;
        }
        this.shareData(data);
    },
    shareData(data) {
        wx.ready(function () {
            //需在用户可能点击分享按钮前就先调用
            wx.updateAppMessageShareData({
                //自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
                title: data.title, // 分享标题
                desc: data.desc, // 分享描述
                link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: data.imgUrl, // 分享图标
                success: function () {
                    // alert('调用微信分享成功updateAppMessageShareData')
                },
            });
            wx.updateTimelineShareData({
                //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
                title: data.title, // 分享标题
                desc: data.desc, // 分享描述
                link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: data.imgUrl, // 分享图标
                success: function () {
                    // alert('调用微信分享成功updateTimelineShareData')
                },
            });
        });
    },
    isWeiXin() {
        var userAgent = navigator.userAgent.toLowerCase();
        return userAgent.match(/MicroMessenger/i) as any == "micromessenger";
    },
    isQQ() {
        var userAgent = navigator.userAgent.toLowerCase();
        return userAgent.match(/QQ\/[0-9]/i);
    }
};
