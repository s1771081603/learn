<template>
  <div>
    <div class="box-content" @click="cardChange">
      <!--      <div :class="className" :style="{ height: height, minHeight: minHeight }" ref="chart"></div>-->
      <div class="box-content-title">{{ title }}</div>
      <div class="circleBox">
        <el-progress
          type="circle"
          :width="120"
          :show-text="false"
          :percentage="formatPercentage"
          color="#304e7d"
        ></el-progress>
        <div class="circleCenter">
          <div>
            <div>中标金额</div>
            <div class="m-b-0">
              {{ formDataNumber(bidAmount) }}
            </div>
          </div>
          <span class="percentage" style="transform: translateY(-20px);">
            {{ formatPercentage + '%' }}
            <!-- <span class="font-12 color-info m-0">占比</span> -->
          </span>
        </div>
      </div>
      <div class="box-text">
        <div style="display: flex; flex-direction: column">
          <div class="box-title">PO金额</div>
          <div class="box-title">结算金额</div>
          <div class="box-title">预计点数</div>
          <div class="box-title">实际点数</div>
        </div>
        <div style="display: flex; flex-direction: column">
          <span class="box-num">{{ formDataNumber(poAmount) }}</span>
          <span class="box-num">{{ formDataNumber(settleAmount) }}</span>
          <span class="box-num">{{ formDataNumber(planPoint) }}</span>
          <span class="box-num">{{ formDataNumber(realPoint) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chartsReport',
  // import引入的组件需要注入到对象中才能使用
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    height: {
      type: String,
      default: 'calc((100vh - 284px) / 2)'
      // default: '320px'
    },
    minHeight: {
      type: String,
      default: '320px'
    },
    title: String,
    bidAmount: [Number, String],
    percentage: [Number, String],
    poAmount: [Number, String],
    settleAmount: [Number, String],
    planPoint: [Number, String],
    realPoint: [Number, String]
  },
  data() {
    return {
      chart: null
    };
  },
  computed: {
    formatPercentage() {
      if (typeof this.percentage === 'string' && this.percentage.includes('%')) {
        return +this.percentage.slice(-1);
      }
      return +(this.percentage * 100).toFixed(1);
    }
  },
  methods: {
    formDataNumber(number) {
      const trueNumber = +number;
      if (typeof trueNumber === 'number') {
        return trueNumber.toLocaleString();
      }
      return number;
    },
    cardChange() {
      this.$emit('cardChange', this.title);
    }
  }
};
</script>
<style scoped lang="scss">
.box-content {
  //background-color: #fafafa;
  cursor: pointer;
  //border: 1px solid #ebebeb;
  padding: 15px 0;
  border-radius: 4px;
  // width: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .circleBox {
    position: relative;
    text-align: center;
    white-space: nowrap;
    //width: 200px;
    margin: 10px 0;
    .circleCenter {
      position: absolute;
      top: calc(50% - 2px);
      left: 50%;
      transform: translate(-50%, -50%);
      .percentage {
        font-size: 24px;
        color: #304e7d;
        font-weight: 600;
      }
      div {
        font-size: 12px;
        color: #999999;
        margin-bottom: 5px;
      }
    }
  }
  .box-text {
    display: flex;
    //flex-direction: column;
    .box-title {
      color: #707070a0;
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
//.box-content:hover {
//  color: #409eff;
//  border-color: #c6e2ff;
//  background-color: #ecf5ff;
//}
/deep/ .el-progress__text {
  white-space: pre;
}
/deep/ .el-progress-circle__track {
}
</style>
