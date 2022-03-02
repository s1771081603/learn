<template>
  <van-popup v-model="show" class="pop_wrap" :close-on-click-overlay="false">
    <div class="common_pop rule_pop">
      <div class="close" @click="closeClick"><van-icon name="cross" size="22"/></div>
      <div class="title">活动规则</div>
      <div class="rule_box" v-if="isRule" v-html="ruleText"></div>
      <div class="rule_box" v-else>

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
          marketName: '${name}'
        }).then(res=>{
          let result = res.data.result
          if (res.data.code == 0){
            this.isRule = true
            if (this.isApp){
              this.ruleText = result.apprule
            } else if (this.isMiniProgram) {
              this.ruleText = result.minirule
            } else {
              this.ruleText = result.rule
            }
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pop_wrap{
  overflow: initial;
  background: rgba(0,0,0,0);
}
/deep/.rule_pop{
  .rule_box{
    max-height: 7rem;
    overflow: auto;
    text-align: left;
    .rule_title{
      font-size: .3rem;
      line-height: .45rem;
    }
    .rule_text{
      font-size: .22rem;
      line-height: .35rem;
      margin-bottom: .2rem;
    }
  }
}
</style>