<template>
  <div class="wrap">
    <!-- logo 和 login -->
    <commonHeader
      :wrapStyle="{width: '7.5rem', height: '.37rem',padding: '0 .23rem'}"
      :logoUrl="require('@/views/jiangsu_cloudNotes/images/logo.png')"
      :logoStyle="{width: '2.45rem', height: '0.37rem'}"
      :loginStyle="{color: '#333333', fontSize: '.2rem'}"
    />
    <div class="rule_btn" @click="ruleClick()">活<br/>动<br/>规<br/>则</div>
    <button class="task_01" v-if="taskStatus1 == 0" @click="goToFeature">创建一篇笔记 领88MB流量 <van-icon name="arrow" /><van-icon name="arrow" /></button>
    <button class="task_01" v-else-if="taskStatus1 == 1" @click="clickReceive(1)">立即领取88MB流量</button>
    <button class="task_01" v-else-if="taskStatus1 == 2">今日已成功领取 明天再来吧 ~</button>
    <div class="task_02_wrap">
      <!--  进度条  -->
      <van-circle
          v-model="taskCircleStart"
          :rate="taskCircleEnd"
          :speed="150"
          :stroke-width="150"
          size="1.4rem"
          class="task_02_circle"
          layer-color="#CFDAFF"
      />
      <p class="tips"><span>{{completedDays}}</span>/8</p>
      <p class="task_02_desc">当月累计完成 <span>8</span> 天 <br> 次月可额外 <br> 领取 <span>500MB</span> 流量</p>
      <button class="task_02" v-if="taskStatus2 == 0">上月未完成任务</button>
      <button class="task_02 active" v-else-if="taskStatus2 == 1" @click="clickReceive(2)">领取上月奖励</button>
      <button class="task_02" v-else-if="taskStatus2 == 2">已领取上月奖励</button>
    </div>
    <img src="./images/explanation.png" alt="说明" class="explanation">
    <img src="./images/features.png" alt="特色" class="features">
    <div class="footer">——&nbsp;&nbsp;&nbsp;&nbsp;美好生活，和彩云相伴&nbsp;&nbsp;&nbsp;&nbsp;——</div>
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
    <!-- 登录弹窗 -->
    <loginPop/>
    <!--  领奖成功弹窗  -->
    <van-overlay :show="successPop.show">
      <div class="common_pop success_pop" v-if="successPop.type == 1">
        <img src="./images/MB88.png" alt="88MB流量" class="mb">
        <img src="./images/successBtn.png" alt="领奖成功按钮" class="btn" @click="successPop.btnClick">
      </div>
      <div class="common_pop success_pop" v-if="successPop.type == 2">
        <div class="title">本月继续加油做任务吧~</div>
        <img src="./images/MB500.png" alt="500MB流量" class="mb">
        <img src="./images/successBtn.png" alt="领奖成功按钮" class="btn" @click="successPop.btnClick">
      </div>
    </van-overlay>
  </div>
</template>

<script>
import utils from '@/utils/utils'
import commonHeader from '@/components/commonHeader'
import commonPop from './components/common_pop'
import rulePop from './components/rule_pop'
import loginPop from './components/login_pop'
import jiangsu_cloudNotesService from './service/jiangsu_cloudNotesService'
import { mapState } from "vuex";

export default {
  name: 'jiangsu_cloudNotes',
  components: { commonHeader, loginPop, rulePop, commonPop },
  data(){
    return{
      pointName: 'jiangsu_cloudNotes',
      isOver: true,
      isTargetUser: true,
      // 公共弹窗
      commonPop: {
        show: false,
        titleShow: true,
        title: "提示",
        textShow: true,
        text: "公共弹窗",
        btnShow: true,
        btnText: "好的",
        btnClick: () => this.commonPop.show = false
      },
      // 活动规则弹窗
      rulePop: {
        show: false,
        closeClick: () => this.rulePop.show = false
      },
      // 领奖成功弹窗
      successPop: {
        show: false,
        type: 1,
        btnClick: ()=> this.successPop.show = false
      },
      taskStatus1: 0, // 任务一状态
      taskStatus2: 0, // 任务二状态
      completedDays: 0, // 当月完成任务一的天数
      taskCircleStart: 0,
      taskCircleEnd: 0,
    }
  },
  created() {
    this.logPoint("", this.pointName + "_pv", this.sourceid, this.pointName);
    if (this.isApp) {
      this.$parent.caiYunLogin(this.pointName)
    } else if(this.isMiniProgram) {
      this.$parent.caiYunLogin(this.pointName)
    } else {
      this.$parent.caiYunLogin(this.pointName)
    }
    this.$nextTick(() => {
      if (this.isWeiXin){
        this.$parent.wxShare({
          title: "体验和彩云云笔记，每月可领500MB流量！",
          desc: "体验和彩云云笔记，每月可领500MB流量！",
          link: `${this.baseUrl}caiyunActivity/index.html?path=${this.pointName}&sourceid=${this.sourceid}`,
          imgUrl: `${this.baseUrl}caiyunActivity/${require(`@/assets/images/wx_share.png`)}`,
        });
      }
    })
  },
  watch: {
    isLogin(val){
      if (val){
        this.getUserInfo() // 查询用户状态
      }
    },
    isOver(value){
      if (!value) location.href = `${this.baseUrl}templateView/initve.html?id=102&marketName=commonPage`
    }
  },
  computed: {
    ...mapState(['isLogin','loginServerNumber'])
  },
  methods: {
    // 查询用户信息
    getUserInfo(){
      jiangsu_cloudNotesService.getUserInfo({
        "data": utils.publicKeyEncrypt(this.loginServerNumber + '-' + new Date().getTime())
      }).then(res => {
        let data = res.data,result = res.data.result;
        if (data.code == 0){
          this.taskStatus1 = result.taskStatus1;
          this.taskStatus2 = result.taskStatus2;
          this.completedDays = result.completedDays;
          this.taskCircleEnd = result.completedDays * 100 / 8;
        } else if (data.code == 90001) {
          this.$store.commit('showLogin',true)
        } else if (data.code == 602){
          this.isOver = false
        } else if (data.code == 607 || data.code == 608 || data.code == 609 || data.code == 604 || data.code == 605){
          this.isTargetUser = false
          this.commonPopType(1)
        } else {
          this.commonPop = {
            show: true,
            titleShow: true,
            title: data.msg,
            textShow: false,
            btnShow: true,
            btnText: "好的",
            btnClick: () => this.commonPop.show = false
          }
        }
      })
    },
    // 公共弹窗 type(1：活动结束；2：不是活动对象；3：不是江苏移动用户；4：领奖失败。)
    commonPopType(type){
      this.commonPop = {
        show: true,
        titleShow: true,
        title: '',
        textShow: false,
        btnShow: true,
        btnText: "好的",
        btnClick: () => this.commonPop.show = false
      }
      if (type == 1) this.commonPop.title = `非常抱歉，<br>本活动仅限江苏移动用户参与！请参与其他活动吧~<br>谢谢！`
      if (type == 2) {
        this.commonPop.title = `领取失败！`
        this.commonPop.textShow = true
        this.commonPop.text = `可能由于：1、系统存在延迟；2、当前网络问题，请稍后再试！`
      }
    },
    // 显示活动规则
    ruleClick(){
      this.rulePop = {
        show: true,
        closeClick: () => this.rulePop.show = false
      }
    },
    // 跳转到App活动首页或者云笔记模块
    goToFeature(){
      if (this.isApp){
        location.href = 'mcloud://main/featureServices?params=eyJsaW5rVXJsIjoiMHwxMDEzIiwidGl0bGUiOiLkupHnrJTorrAifQ=='
      } else {
        if (this.isLogin) {
          this.$store.commit('showLogin',true)
          return;
        }
        if (!this.isOver){
          location.href = `${this.baseUrl}templateView/initve.html?id=102&marketName=commonPage`
          return;
        }
        if (!this.isTargetUser){
          this.commonPopType(1)
          return;
        }
        location.href = `${this.baseUrl}clientDL2/index.html?v=mCloud_1085&titleName=${decodeURIComponent(
            '体验和彩云云笔记，每月可领500MB流量！')
        }&linkUrl=${decodeURIComponent(
            `${this.baseUrl}caiyunActivity/index.html?path=jiangsu_cloudNotes`)
        }&sourceid=${this.sourceid}`
      }
    },
    // 点击领奖
    clickReceive(type){
      if (this.isLogin) {
        this.$store.commit('showLogin',true)
        return;
      }
      if (!this.isOver){
        location.href = `${this.baseUrl}templateView/initve.html?id=102&marketName=commonPage`
        return;
      }
      if (!this.isTargetUser){
        this.commonPopType(1)
        return;
      }
      if (type == 1){
        this.logPoint(this.loginServerNumber, this.pointName + "_receive_88MB", this.sourceid, this.pointName);
      } else if (type == 2){
        this.logPoint(this.loginServerNumber, this.pointName + "_receive_500MB", this.sourceid, this.pointName);
      }
      jiangsu_cloudNotesService.clickReceive({
        "taskType": type,
        "data": utils.publicKeyEncrypt(this.loginServerNumber + '-' + new Date().getTime()),
      }).then(res => {
        let data = res.data;
        if (data.code == 0){
          this.getUserInfo()
          this.successPop.show = true
          this.successPop.type = type
        } else if (data.code == 90001) {
          this.$store.commit('showLogin',true)
        } else if (data.code == 602){
          this.isOver = false
        } else if (data.code == 607 || data.code == 608 || data.code == 609 || data.code == 604 || data.code == 605){
          this.isTargetUser = false
          this.commonPopType(1)
        } else if (data.code == 99999){
          this.commonPopType(2)
        } else {
          this.commonPop = {
            show: true,
            titleShow: true,
            title: data.msg,
            textShow: false,
            btnShow: true,
            btnText: "好的",
            btnClick: () => this.commonPop.show = false
          }
        }
      })
    },
  }
}
</script>
<style lang="scss" src="./scss/index.scss"></style>