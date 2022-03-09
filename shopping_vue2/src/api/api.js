import axios from './index'
import qs from 'qs'

export default {
  // 获取 Home 页面的数据
  getHomeData: params => axios.get(`/api/index?${qs.stringify(params)}`,{
    headers:{
      showLoading: true,
    }
  }),
  // 获取 Home 页面的数据
  getProductData: params => axios.get(`/api/goods?${qs.stringify(params)}`,{
    headers:{
      showLoading: true,
    }
  }),
}