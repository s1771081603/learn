/* *
*登录相关
*/
import commonApi from "@/api/common";
import utils from "@/common/js/utils";
export default {
    errorMsg: {
        j101: "参数过期",
        "-10001": "参数过期",
        j001: "请输入正确的手机号码",
        j002: "请输入正确的手机号码",
        9103: "请输入正确的手机号码",
        9430: "账号不存在，请注册后再登录！",
        9431: "号码不可用，请重新输入号码",
        9432: "密码不正确",
        9435: "验证码无效, 请重新输入",
        9441: "验证码错误，请重新获取",
        9442: "验证码已失效，请重新获取",
        9445: "重复登录次数太多了, 请明天再试",
        200000504: "获取验证码已达上限",
        200050437: "操作太频繁，请稍后再试！",
        200050432: "您已关闭和彩云业务，如需使用请重新开启",
        200059505: "用户已被锁定，请联系管理员",
        200050500: "服务器操作失败",
        200059508: "获取短信密码次数已达上限",
        1809099999: "获取验证码失败，请稍后再试！",
        200050436: "拒绝登录",
    },
    /**
     * 查询是否手机号
     * @param phone
     * @returns
     */
    checkPhone(phone) {
        var pattern = /0?(1)[0-9]{10}/;
        return pattern.test(phone);
    },
    getAccount() {
        var account = utils.getHashQueryString("account");
        var token = utils.getHashQueryString("token");
        var ssoToken = utils.getHashQueryString("ssoToken");
        if (ssoToken) {
            this.tyrzLogin(ssoToken);
            return;
        }
        if (token && (token.indexOf("|") === -1 || token.indexOf("STuid") === 0)) {
            this.tyrzLogin(token);
            return;
        }
        if (account && token) {
            this.tokenLogin({ account: account, token: token });
            return;
        }
        this.getAccount2();
    },
    //统一认证单点
    tyrzLogin: function (ssoToken) {
        commonApi
            .tyrzLogin({
                ssoToken: ssoToken,
            })
            .then((res) => {
                let data = res.data;
                if (data && data.code == 0) {
                    this.accountDecrypt(data.result.account, true);
                } else {
                    this.getAccount2();
                }
            }).catch(()=>{
                this.getAccountCallback();
            });
    },
    //和彩云单点
    tokenLogin: async function (paramObj) {
        let account: string | null = null;
        let token: string | null = null;
        if (paramObj) {
            account = paramObj.account;
            token = paramObj.token;
        } else {
            account = utils.getHashQueryString("account");
            token = utils.getHashQueryString("token");
        }
        if (!token || !account) {
            this.getAccountCallback();
            return;
        }
        let encryptTime = await this.getEncryptTime();
        let data = { account: account, encryptTime: encryptTime };
        let postData = {
            data: utils.publicKeyEncrypt(data),
            token: token,
            op: "tokenLogin",
        };
        commonApi.login(postData).then((res) => {
            let data = res.data;
            if (!data) {
                this.getAccount2();
                return;
            }
            let result = data.result;
            if (data.code !== 10000 || !result) {
                this.getAccount2();
                return;
            }
            this.accountDecrypt(data.result, true);
        }).catch(()=>{
            this.getAccountCallback();
        });
    },
    getAccount2() {
        commonApi
            .login({
                op: "getAccount",
            })
            .then((res) => {
                let data = res.data;
                if (!data) {
                    this.getAccountCallback();
                    return;
                }
                if (data.code !== 10000) {
                    this.getAccountCallback();
                    return;
                }
                /**
                 * time:20210805
                 * 新增loginType字段（统一认证单点埋点）
                 */
                this.accountDecrypt(data.result, this.judgeLoginType());
            }).catch(()=>{
                this.getAccountCallback();
            });
    },
    //后续页面重新赋值
    getAccountCallback(account?, isLogin?) {},
    //手机号解密
    accountDecrypt(accountResult, isLogin) {
        let account = utils.privateDecrypt(accountResult);
        if (!account || account.length !== 11) {
            this.getAccountCallback();
            return;
        }
        this.getAccountCallback(account, isLogin);
    },
    judgeLoginType() {
        return utils.getHashQueryString("loginType") === "ssoToken";
    },
    //获取服务器当前时间
    getEncryptTime: async function () {
        let time = new Date().getTime();
        let res = await commonApi.opRequest({
            op: "currentTimeMillis",
        });
        let data = res.data || null;
        if (data && data.result) {
            time = data.result;
        }
        return time;
    },
};
