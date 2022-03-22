<template>
  <div class="wrap">
    <!-- logo 和 login -->
    <commonHeader
      :wrapStyle="{background: 'rgba(0,0,0,.6)'}"
      :logoUrl="require('@/assets/images/logo_01.png')"
      :logoStyle="{width: '2rem'}"
      :loginStyle="{color: '#fff'}"
    />
    <span class="rule_btn btn" @click="ruleClick()">活<br/>动<br/>规<br/>则</span>
    <span class="rule_btn btn" @click="prizeClick()">我<br/>的<br/>奖<br/>品</span>
    <!-- 公共弹窗 -->
    <commonPop
      :show="commonPop.show"
      :closeShow="commonPop.closeShow"
      :closeClick="commonPop.closeClick"
      :titleShow="commonPop.titleShow"
      :title="commonPop.title"
      :textShow="commonPop.textShow"
      :text="commonPop.text"
      :btnShow="commonPop.btnShow"
      :btnClick="commonPop.btnClick"
      :btnText="commonPop.btnText"
    />
    <!-- 活动规则 -->
    <rulePop
      :show="rulePop.show"
      :closeClick="rulePop.closeClick"
    />
    <!-- 我的奖品 -->
    <van-overlay :show="prizePopShow">
      <div class="common_pop prize_pop">
        <div class="close" @click="prizePopShow = false"><van-icon name="cross" size="22"/></div>
        <div class="title">我的奖品</div>
        <div class="text">
          <span v-if="noPrize">很抱歉，您还未获得奖品，快去参加活动吧~</span>
          <div class="prizeLise" v-else>
            <p class="listTitle"><span>奖品名称</span><span>获奖时间</span><span>领奖情况</span></p>
            <ul>
              <li v-for="(item,index) in prizeList" :key="index">
                <span>{{item.prizeName}}</span>
                <span>{{utils.timeTransYMD(item.insertTime)}}</span>
                <span v-if="item.flag == 1" class="red" @click="getReceiveAward(item)">我要领奖</span>
                <span v-if="item.flag == 2" class="gary" @click="receiveDetails(item)">已领取</span>
                <span v-if="item.flag == 10" class="gary">已失效</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </van-overlay>
    <!-- 登录弹窗 -->
    <loginPop/>
    <!-- 领奖 -->
    <award v-if="award" :prizeOID= "prizeOID" :prizeId="prizeId" @awardClose="awardClose" @getCode="getCode"/>
  </div>
</template>

<script>
import utils from "@/utils/utils";
import {mapMutations, mapState} from "vuex";
import commonService from '@/services/commonService'
import commonHeader from '@/components/commonHeader'
import commonPop from './components/common_pop'
import rulePop from './components/rule_pop'
import loginPop from './components/login_pop'
import award from '@/components/award'
import ${name}Service from './service/${name}Service'

export default {
  name: '${name}',
  components: { commonHeader, loginPop, rulePop, commonPop, award },
  data(){
    return{
      pointName: '${name}',
      isOver: true, // 活动是否结束
      isPrize: true, // 奖品池是否为空
      isTargetUser: true, // 是否是目标用户
      // 公共弹窗
      commonPop: {
        show: false,
        closeShow: true,
        closeClick: () => this.commonPop.show = false,
        titleShow: true,
        title: "提示",
        textShow: true,
        text: "公共弹窗",
        btnShow: true,
        btnText: "我知道了",
        btnClick: () => this.commonPop.show = false,
      },
      // 活动规则弹窗
      rulePop: {
        show: false,
        closeClick: () => this.rulePop.show = false
      },
      prizePopShow: false, // 显示我的奖品
      noPrize: false, // 是否获得奖品
      prizeList: [], // 我的奖品列表
      award: false, // 滑块领奖
      prizeOID: '', // 奖品 OID
      prizeId: '', // 奖品 ID
    }
  },
  created() {
    this.logPoint(this.loginServerNumber, this.pointName + "_pv", this.sourceid, this.pointName);
    if (this.isApp || this.isMiniProgram) {
      this.$parent.caiYunLogin(this.pointName)
    } else {
      this.$parent.caiYunLogin(this.pointName)
    }
    this.$nextTick(() => {
      if (this.isMiniProgram) {
        this.wx.miniProgram.postMessage({
          data: {
            title: "",
            link: `${this.baseUrl}caiyunActivity/index.html?sourceid=${this.sourceid}&path=${this.pointName}&tokenType=ssoToken&targetSourceId=001005&loginType=ssoToken`,
            imgUrl: `${this.baseUrl}caiyunActivity/${require(`@/assets/images/wx_share.png`)}`,
          },
        });
      } else if (this.isWeiXin){
        this.$parent.wxShare({
          title: "",
          desc: "",
          link: `${this.baseUrl}caiyunActivity/index.html?path=${this.pointName}&sourceid=${this.sourceid}`,
          imgUrl: `${this.baseUrl}caiyunActivity/${require(`@/assets/images/wx_share.png`)}`,
        });
      }
    })
  },
  watch: {
    isLogin(val){
      if (val){

      }
    }
  },
  computed: {
    ...mapState(["isLogin",'loginServerNumber'])
  },
  methods: {
    ...mapMutations(["isLogins","showLogins","loginServerNumbers","showLoadings"]),
    // 显示活动规则
    ruleClick(){
      this.logPoint(this.loginServerNumber, this.pointName + "_rule", this.sourceid, this.pointName);
      this.rulePop = {
        show: true,
        closeClick: () => this.rulePop.show = false
      }
    },
    // 奖品记录
    prizeClick(){
      if (!this.isLogin) {
        this.showLogins(true)
        return
      }
      this.logPoint(this.loginServerNumber, this.pointName + "_prize", this.sourceid, this.pointName);
      commonService.queryAcceptExt({
        pageNumber: 1,
        pageSize: 20,
        param: {
          marketname: '${name}'
        }
      }).then(res=>{
        let data = res.data
        if (data.code == 10000) {
          this.prizePopShow = true
          if (data.result.totalCount == 0) {
            this.noPrize = true
          } else {
            this.prizeList = data.result.result
          }
        } else {
          this.$toast(data.msg)
        }
      })
    },
    // 显示公共弹窗    type:(0：活动结束；1：奖品已派完；2：非目标用户；)
    showcommonPop(type){
      this.commonPop = {
        show: true,
        closeShow: true,
        closeClick: () => this.commonPop.show = false,
        titleShow: true,
        title: "提示",
        textShow: true,
        text: "公共弹窗",
        btnShow: true,
        btnText: "我知道了",
        btnClick: () => this.commonPop.show = false,
      }
      if (type == 0) {
        this.commonPop.closeShow = false
        this.commonPop.titleShow = false
        this.commonPop.btnShow = false
        this.commonPop.text = '很抱歉，活动已结束，请参与其它活动吧~'
      } else if (type == 1) {
        this.commonPop.text = '活动太火爆了~奖品已派完，请稍后再来试试~'
      } else if (type == 2) {
        this.commonPop.text = '非陕西移动客户暂时不能参与该活动，感谢关注！'
      }
    },
    // 点击我要领奖
    getReceiveAward(item){
      this.prizeOID = item.oId
      this.prizeId = item.prizeId
      this.prizeShow = false
      this.award = true
    },
    // 点击获取奖品详情
    receiveDetails(item){
       commonService.receiveDetails({
         marketId: item.marketid,
         prizeId: item.prizeId,
         drawRecode: item.oId
       }).then(res=>{
         let data = res.data
         if (data.code == 0) {
          this.commonPop = {
            show: true,
            closeShow: true,
            closeClick: () => this.commonPop.show = false,
            titleShow: true,
            title: "奖品详情",
            textShow: true,
            text: `<div class="details"><p><span>获得时间：</span>${utils.timeTransYMD(item.insertTime)}</p><p><span>活动名称：</span>${item.marketname}</p><p><span>活动奖品：</span>${res.result.prizename}</p><p><span>活动详情：</span></br>${res.result.memo}</p></div>`,
            btnShow: true,
            btnText: "我知道了",
            btnClick: () => this.commonPop.show = false,
          }
         } else {
           this.$Toast(res.msg)
         }
       })
    },
    // 关闭领奖
    awardClose(value){
      this.award = value
    },
    // 领奖返回码
    getCode(code){
      console.log(code);
      if (code == 0) {
        this.$toast("领奖成功")
        this.award = false
      } else if (code == -1) {
        this.$toast("领奖失败")
      }
    },
  }
}
</script>
<style lang="scss" src="./scss/index.scss"></style>