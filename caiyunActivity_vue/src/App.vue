<template>
  <div id="app">
    <div class="loading" v-if="$store.state.showLoading"><van-loading  type="spinner" size=".7rem"/></div>
    <router-view />
  </div>
</template>
<script>
import weiXinMixin from './mixins/weiXinMixin'
export default {
  name: 'App',
  mixins: [ weiXinMixin ],
  mounted() {
    
  },
  methods: {
    // 自动登录
    caiYunLogin(pointName) {
      let vm = this
      var sourceid = this.sourceid
      sensors.registerPage({
        platForm: 'activity_marketing',
        activityName: pointName
      });
      sensors.quick('autoTrack')
      if (sourceid) {
        sensors.registerPage({
          channel: sourceid
        });
      }
      caiYunLoginJs.getAccountCallback = function (account, isLogin1) {
        if (account) {
          vm.$store.commit('loginServerNumber', account)
          vm.$store.commit('isLogin', true)
          sensors.putPhoneNumberInfo(account)
          //单点埋点
          if (isLogin1) {
            vm.logPoint(account, pointName + '_client', sourceid, pointName)
          } else {
            vm.logPoint(account, pointName + '_cookie_login', sourceid, pointName)
          }
          return
        }
        letLoginJs.successCallBack = function (data) {
          var phone = data.result.msisdn;
          if (phone.length === 11) {
            vm.$store.commit('loginServerNumber', phone)
            vm.$store.commit('isLogin', true)
            sensors.putPhoneNumberInfo(phone);
            vm.logPoint(phone, pointName + '_4G', sourceid, pointName)
          }
        }
        letLoginJs.errorCallBack = function () {
          var mobilPhone = caiYunLoginJs.semiAutomaticLogin()
          if (mobilPhone && mobilPhone.length === 11) {
            //半自动登录
          }
        }
        letLoginJs.getNumber(5)
      }
      caiYunLoginJs.getAccount()
    },
  }
}
</script>
<style lang="scss" scoped>
 #app{
   .loading{
     position: fixed;
     left: 0;
     top: 0;
     width: 100%;
     height: 100%;
     background: rgba(0, 0, 0, 0.6);
     display: flex;
     justify-content: center;
     align-items: center;
     z-index: 999;
   }
 }
</style>