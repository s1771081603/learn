<template>
  <div class="box-content">
    <div class="box-content-title">{{ title }}</div>
    <div class="circleBox">
      <el-progress
        type="circle"
        :width="130"
        :show-text="false"
        :percentage="formatPercentage"
        color="#304e7d"
      ></el-progress>
      <div class="circleCenter">
        <div>SLA平均事件响应</div>
        <span>
          {{ formatPercentage+ '%' }}
        </span>
      </div>
    </div>
    <div class="box-text">
      <div style="display: flex; flex-direction: column">
        <div class="box-title">MIR(#)事故报告</div>
      </div>
      <div style="display: flex; flex-direction: column">
        <span class="box-num">{{ rptAmount }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chartsReport',
  props: {
    title: String,
    slaResponse: [Number, String],
    rptAmount: String
  },
  data() {
    return {
      chart: null
    };
  },
  computed: {
    formatPercentage() {
      if (typeof this.slaResponse === 'string' && this.slaResponse.includes('%')) {
        return +this.slaResponse.slice(0, -1);
      }
      return this.slaResponse * 100;
    }
  }
};
</script>
<style scoped lang="scss">
.box-content {
  margin: 0 14px;
  background-color: #fafafa;
  border: 1px solid #ebebeb;
  padding: 14px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .circleBox {
    position: relative;
    text-align: center;
    margin: 30px 0;
    .circleCenter {
      position: absolute;
      top: calc(50% + 4px);
      left: 50%;
      transform: translate(-50%, -50%);
      span {
        font-size: 24px;
        color: #304e7d;
        font-weight: 600;
        margin-bottom: 10px;
      }
      div {
        font-size: 12px;
        word-break: keep-all;
        color: #707070;
        margin-bottom: 5px;
      }
    }
  }
  .box-text {
    display: flex;
    line-height: 1.2;
    //flex-direction: column;
    .box-title {
      color: #707070;
      display: flex;
      justify-content: flex-end;
    }
    .box-num {
      color: black;
      font-weight: bold;
      margin-left: 10px;
    }
  }
}
/deep/ .el-progress__text {
  white-space: pre;
}
/deep/ .el-progress-circle__track {
}
</style>
