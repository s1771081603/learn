import axios from '@/services/index'

export default {
  getUserInfo: params => axios.post("/market/jiangSu/cloudNote/index", params,{
    headers:{
      showLoading: true,
      'Content-Type': 'application/json'
    }
  }),
  clickReceive: params => axios.post("/market/jiangSu/cloudNote/receive", params,{
    headers:{
      showLoading: true,
      'Content-Type': 'application/json'
    }
  })
}