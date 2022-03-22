<template>
  <van-popup v-model="show" class="pop_wrap" :close-on-click-overlay="false">
    <div class="common_pop rule_pop">
      <div class="close" @click="closeClick"><img src="../images/close.png" alt="关闭"></div>
      <div class="title"><img src="../images/ruleTitle.png" alt="活动规则"></div>
      <div class="rule_box">
        <div class="rule_box_wrap" v-if="isRule" v-html="ruleText"></div>
        <div class="rule_box_wrap" v-else>
          <p class="rule_title">1、活动时间</p>
          <p class="rule_content">2022年2月1日—2022年6月30日</p>
          <p class="rule_title">2、活动对象</p>
          <p class="rule_content">江苏移动用户（物联网卡用户不可参与）。</p>
          <p class="rule_title">3、活动主题：体验和彩云云笔记，每月可领500MB流量！</p>
          <p class="rule_title">4、活动内容</p>
          <p class="rule_content">
            （1）活动期间，用户每日完成一次“新建笔记”，可领取一次88MB流量，每日仅可领取1次。<br>
            （2）用户当月累计有8次任务一，次月还可以再领取500MB流量，每月仅可领取1次。
          </p>
          <p class="rule_title">5、领奖说明</p>
          <p class="rule_content">用户参与活动获得奖品后，在活动页面领取奖品后需要到和彩云APP领奖专区进行奖品领取兑换，奖励将在24小时内到账，最终到账时间以到账短信为准。</p>
          <p class="rule_title">6、温馨提示</p>
          <p class="rule_content">
            （1）活动期间，若发现用户参与活动过程中存在可疑异常行为或通过非正常方式参与活动（包括但不限于恶意套现，机器作弊等），和彩云将有权取消该用户活动获奖资格；如被取消资格，可通过和彩云APP-我的-帮助与反馈-在线客服申诉。<br>
            （2）活动期间，手机号出现停机、换号、注销等情况，导致无法成功领取或充值奖品，则视为客户主动放弃，不再进行补发。
          </p>
          <p class="rule_title">7、联系我们</p>
          <p class="rule_content">
            如有咨询或建议，可通过以下途径联系我们：<br>
            （1）和彩云APP：和彩云APP-我的-帮助与反馈-在线客服；<br>
            （2）微信公众号：进入“中国移动和彩云”对话框输入“客服”，接入人工客服；
          </p>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import commonService from "@/services/commonService.js";
export default {
  props: {
    show: {
      type: Boolean
    },
    closeClick: {
      type: Function
    }
  },
  data(){
    return {
      isRule: false,
      ruleText: '',
    }
  },
  watch: {
    show(value){
      if (value) {
        // 微服务获取活动规则
        commonService.getByMarketRuleName({
          marketName: 'jiangSu_cloudNote'
        }).then( res =>{
          let result = res.data.result
          if (res.data.code == 0){
            this.isRule = true
            this.ruleText = result.rule
          }
        })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.pop_wrap{
  overflow: initial;
  background: rgba(0,0,0,0);
}
/deep/.rule_pop {
  transform: translate(-50%);
  width: 6.2rem;
  height: 8.6rem;
  background: #567CFF;
  border-radius: .1rem;
  padding: .2rem;
  .rule_box{
    width: 5.8rem;
    height: 8.2rem;
    background: #F6FFFE;
    box-shadow: 0 0 0 0 rgba(0, 56, 51, 0.19);
    border-radius: .1rem;
    padding: .5rem .4rem .4rem;
    .rule_box_wrap{
      width: 100%;
      height: 100%;
      overflow-y: auto;
      line-height: .35rem;
      .rule_title{
        font-size: .28rem;
        font-weight: bolder;
        &:first-child{
          margin-top: 0;
        }
      }
      .rule_content{
        font-size: .25rem;
        font-weight: initial;
      }
    }
  }
  .title{
    width: 3.62rem;
    height: .86rem;
    position: absolute;
    top: -.3rem;
    left: 50%;
    transform: translate(-50%,0);
  }
}
</style>