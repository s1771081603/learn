const utils = {
    //生成随机数
    getUUID(len) {
        len = len || 6;
        len = parseInt(len, 10);
        len = isNaN(len) ? 6 : len;
        var seed = "0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ";
        var seedLen = seed.length - 1;
        var uuid = "";
        while (len--) {
            uuid += seed[Math.round(Math.random() * seedLen)];
        }
        return uuid;
    },
    // 深拷贝
    deepcopy(source) {
        if (!source) {
            return source;
        }
        let sourceCopy = source instanceof Array ? [] : {};
        for (let item in source) {
            sourceCopy[item] = typeof source[item] === "object" ? this.deepcopy(source[item]) : source[item];
        }
        return sourceCopy;
    },
    //时间戳转时间
    timetrans(time) {
        var date = new Date(time.toString().length !== 13 ? time * 1000 : time);
        var Y = date.getFullYear() + "-";
        var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
        var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
        var h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
        var m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
        var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
    },
    //时间格式化
    Format(date, fmt) {
        //author: meizz
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "H+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            S: date.getMilliseconds(), //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        return fmt;
    },
    // 获取url参数
    getHashQueryString(name) {
        let reg = new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)") as any;
        return decodeURIComponent((reg.exec(window.location.href) || [, ""])[1].replace(/\+/g, "%20")) || null;
    },
    // 设置cookie
    setCookie(key, value, t) {
        var oDate = new Date(); //创建日期对象
        oDate.setDate(oDate.getDate() + t); //设置过期时间
        document.cookie = key + "=" + value + ";expires=" + oDate.toUTCString(); //设置cookie的名称，数值，过期时间
    },
    // 获取cookie
    getCookie(key) {
        var arr1 = document.cookie.split("; "); //将cookie按“; ”分割，数组元素为： cookie名=cookie值
        for (var i = 0; i < arr1.length; i++) {
            //分割数组里的每个元素
            var arr2 = arr1[i].split("="); //按照“=”分割
            if (arr2[0] == key) {
                //如果数组的第一个元素等于给定的cookie名称
                return decodeURI(arr2[1]); //返回翻译编码后的cookie值
            }
        }
    },
    // 删除cookie
    removeCookie(key) {
        this.setCookie(key, "", -1); //cookie的过期时间设为昨天
    },
    // 加密
    publicKeyEncrypt(data) {
        if (!data || typeof JSEncrypt === String(undefined)) {
            return {};
        }
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(this.getPublicKey());
        if (typeof data === "object") {
            return encrypt.encrypt(JSON.stringify(data));
        } else {
            return encrypt.encrypt(data);
        }
    },
    getPublicKey: function () {
        return (
            "-----BEGIN PUBLIC KEY-----" +
            "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEdVKnXpmib/xkN/SYguTHTTd4f1N3K8L/QmcWLKtyrdoFwENaaAZC1v471+ge9y3cAgsSZJNbW9LmPD/7W0KZ3K1HXLS5PBMAGFW/CybJ8nE8+xCH6ypOhFMq504q9mDujhtOI54XvDC1BZnDvA5J1OpxeJuOtRAQar/7BgU1nwIDAQAB" +
            "-----END PUBLIC KEY-----"
        );
    },
    // 解密
    privateDecrypt: function (data) {
        if (typeof JSEncrypt === String(undefined)) {
            return "";
        }
        var encrypt = new JSEncrypt();
        encrypt.setPrivateKey(this.getPrivateKey());
        return encrypt.decrypt(data);
    },
    getPrivateKey: function () {
        return "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAJQ2f38Gu6bEeT17bPagnN5meP2RxX9/OByQLqW8xQXn6dPZ53kxkODlIc9eQ5wEC+XXYzRqJIiF3i+cT7L4m37EMSXDsSOtDbkIUvpg6ZiQ/ugzQULJZnJ1p5mm1ySTG9hrIOol0KgHDiyh3dRiS/dfttot2UxYCSitpzIyjdIlAgMBAAECgYBWPG9qhYxhuCei8lGwHjun24/CWjLDwE3xsKKzpGYuzYVr0nmwNnrJoAhQE9Tazi/uB6idMrUXCm0A3r4wsB4odz+y65uLKMZ4s6VW86qNz+R+wEIxEc2fvkJKRDAQBO0OMoJBx8R2p+6bgqSPuwh3XIAE/Q02bE57dPRlzF2Q8QJBAPXUhIRkYJeSmrpvQtXULNd8AamLKSKciRw8fs4egjljJcXOiUkFAnerkeUOdXNCLn3rscgAGeWsuSRnHU8YlyMCQQCaWChT9gE43RlZUM7D7HVZTfQRPNF3v8bzMrUv7XtMSYceRQDKtSdQ/qFjksyHKlDWdx8SgWNB20TlR75OSaoXAkEAmELZEWdarIcRbwgazXZtj8ou/WRERjvOcL7Hi8M5xXGzo6EZRzDjJlwOMWGTPaBwS24A32+wmqEwy2tSq/r/IQJAVHSK1K6XKptpZIMgMPsxl0VdmRUTdZg98BO+K1SilDLjub9+WG1Z7yr1+rt4KToRc9lI6mJcgsvN3jwsuT/7zwJAA9JZeqJp2vNo4ZhIgVA/cPXtojDlpoL9G6sA4Fp28t2jpV1AoZC2s7MsYcCsOSJK/r135fLqPO1QiOj91q6Fow==";
    },
    //判断浏览器是否支持heic格式的图片
    async judgeHeic(event, url) {
        if (/\.heic$/i.test(event)) {
            let img = new Image();
            let flag = true;
            img.src = url;
            await new Promise((resolve, reject) => {
                img.onload = () => {
                    resolve(null);
                };
                img.onerror = () => {
                    reject();
                };
            }).catch(() => {
                flag = false;
            });
            return flag;
        }
        return true;
    },
    //根据750设计图的px  计算实际px
    calculationPx(num) {
        let bodyWidth = document.getElementsByTagName("body")[0].offsetWidth;
        return num * (bodyWidth / 750);
    }
};

export default utils;
