// 用于活动分享
import weiXin from "./weiXin";
import useCurrentInstance from "@/common/js/useCurrentInstance";
import ClipboardJS from "clipboard";
import wx from "weixin-js-sdk";
type shareOptions = {
    title: string;
    desc?: string;
    link: string;
    imgUrl: string;
};
const wxShare = (options: shareOptions, miniOptions?: shareOptions) => {
    if (weiXin.isQQ() || weiXin.isWeiXin()) {
        weiXin.wxShare(options);
        if (weiXin.isWeiXin() && miniOptions) {
            wx.miniProgram.postMessage({
                data: miniOptions,
            });
        }
    }
};
const isApp = () => {
    const ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("MCloudApp".toLowerCase()) > -1 || ua.indexOf("iOSAmber".toLowerCase()) > -1;
}
const appShare = (options) => {
    if (isApp()) {
        let ifr = document.createElement("iframe");
        ifr.style.display = "none";
        Object.keys(options).forEach((key) => {
            options[key] = encodeURIComponent(options[key]);
        });
        ifr.src = `mcloudshareInfo://advert?title=${options.title}&desc=${options.desc}&link=${options.link}&imgUrl=${options.imgUrl}`;
        document.body.appendChild(ifr);
        window.setTimeout(function () {
            document.body.removeChild(ifr);
        }, 1800);
    }
};

const clickAppShare = (options) => {
    if (isApp()) {
        let ifr = document.createElement("iframe");
        ifr.style.display = "none";
        Object.keys(options).forEach((key) => {
            options[key] = encodeURIComponent(options[key]);
        });
        ifr.src = `mcloudshare://advert?title=${options.title}&desc=${options.desc}&link=${options.link}&imgUrl=${options.imgUrl}`;
        document.body.appendChild(ifr);
        window.setTimeout(function () {
            document.body.removeChild(ifr);
        }, 1800);
    }
};
//这边的复制方法多执行一次点击事件，若有影响，不要用该方法，自己写到页面上
let timer:number|null = null;
const cliboardShare = (text,event) => {
    let clipboard = new ClipboardJS(event.target, {
        text: () => {
            return text;
        },
    });
    return new Promise((resolve, reject) => {
        clipboard.on("success", (e) => {
            timer = setTimeout(()=>{ 
                clearTimeout(timer as number);   //两次点击 防抖
                resolve(e);
            },80)
            // 释放内存
            clipboard.destroy();
        });
        clipboard.on("error", (e) => {
            // 不支持复制
            timer = setTimeout(()=>{
                clearTimeout(timer as number);
                reject(e);
            },80)
            // 释放内存
            clipboard.destroy();
        });
        event.target.click();//为了解决首次点击无效的问题
    });
};

const init = (options:{ wxOptions?, miniOptions?, appOptions? }) => {
    wxShare(options.wxOptions, options.miniOptions);
    if(options.appOptions){
        appShare(options.appOptions);
    }
};


export { init, wxShare, appShare, clickAppShare, cliboardShare };
