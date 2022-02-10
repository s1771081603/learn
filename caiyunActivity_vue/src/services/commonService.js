import axios from './xhr/index'
import qs from 'qs'
export default {
  // 创建口令
  createKlCodeInfo: params => axios.post("/portal/ajax/common/createKlCodeInfo.action",params,{
    headers:{
      showLoading: true,
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }),
  // 奖品列表
  queryAcceptExt: params => axios.post("/portal/ajax/common/queryAcceptExt.action?op=pageUserDraw",params,{
    headers:{
      showLoading: true,
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }),
  // 奖品详情
  receiveDetails: params => axios.post("/portal/ajax/common/receiveDetails.action",params,{
    headers:{
      showLoading: true,
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }),
  // 获取滑块验证码
  getSlideData:() => axios.post("/portal/auth/getSlidePuzzle.action",{},{
    headers: {
      showLoading: true
    }
  }),
  // 验证滑块验证码
  puzzleValidate: params => axios.post("/portal/auth/puzzleValidate.action",qs.stringify(params),{
    headers:{
      showLoading: true,
    }
  }),
  // 获取短信验证码
  getSmsCode02: params => axios.post("/portal/ajax/common/sendSmsCodeV2.action",qs.stringify(params),{
    headers:{
      showLoading: true,
    }
  }),
  // 领奖
  getPrizeCheckPrize: params => axios.post("/portal/ajax/common/getPrizeCheckPrize.action",params,{
    headers:{
        showLoading: true,
        'Content-Type': 'application/json;charset=UTF-8'
    }
  }),
  // 获取活动规则
  getRuleText: params => axios.post("/portal/ajax/common/caiYunUploadGift.action",qs.stringify(params)),
  // 获取活动规则
  getByMarketRuleName: params => axios.get(`/market/manager/commonMarketconfig/getByMarketRuleName?${qs.stringify(params)}`),
}