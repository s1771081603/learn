import axios from "../common/js/fetch";
import qs from "qs";
/**
 *    headers:{
 *           showLoading:true  loading是否显示
            "content-Type":"application/json"   //post  json入参时使用，参数需要JSON.stringify ， 默认使用表单 需要qs
        }
 * */
export default {
    //全局埋点接口
    logPoint: (params) => axios.post("/portal/journaling", qs.stringify(params)),
    //获取scheme
    getScheme: (params) =>
        axios.post("/market/wechat-service/wechat/getScheme", JSON.stringify(params), {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                showLoading:true
            },
        }),
    //获取服务器当前时间  op=currentTimeMillis
    opRequest: (params) => axios.post("/portal/ajax/tools/opRequest.action", qs.stringify(params)),
    //获取验证码
    getSmsCode: (params) => axios.post("/portal/auth/smsVerificationCode.action", qs.stringify(params),{
        headers: {
            showLoading: true,
        },
    }),
    //登陸
    login: (params) =>
        axios.post("/portal/auth/encryptDataLogin.action", qs.stringify(params), {
            headers: {
                showLoading: true,
            },
        }),
    //统一认证单点登陆
    tyrzLogin: (params) => axios.get("/portal/auth/tyrzLogin.action", { params: params }),
    /* 4G取号相关 start */
    getSign: (params) => axios.post("/portal/auth/getSign.action",qs.stringify(params)),
    tokenValidate:params=>axios.post('/portal/auth/tokenValidate.action',qs.stringify(params))    
    /* 4G取号相关 end */
   
};
