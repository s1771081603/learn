<template>
  <div class="chart-container">
    <div v-if="yAxisData.length > 0">
      <div :class="className" :style="{ height, width }" ref="chart"></div>
    </div>
    <div v-else class="r-char-wrap" :style="{ height, width }">
      <span class="no-data">暂无数据</span>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import debounce from 'lodash/debounce';

export default {
  name: 'burndown',
  props: {
    className: {
      type: String,
      default: 'chart j-center'
    },
    height: {
      type: String,
      default: '350px'
    },
    width: {
      type: String,
      default: ''
    },
    chartData: {
      type: Object
    }
  },
  data() {
    return {
      chart: null,
      dataList: [],
      yAxisData: [],
      title: '',
      series: [],
      legends: [],
      otherOptions: ''
    };
  },
  activated() {
    if (this.chart) {
      this.chart.resize();
    }
  },
  mounted() {
    this.__resizeHanlder = debounce(() => {
      this.chartResize();
    }, 100);
    window.addEventListener('resize', this.__resizeHanlder);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener('resize', this.__resizeHanlder);
    this.chart.dispose();
    this.chart = null;
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  methods: {
    chartResize() {
      if (this.chart) {
        this.chart.resize();
      }
    },
    setOptions(legendNames) {
      const options = {
        color: ['#314d7c', '#cbcbcb'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '1%',
          bottom: '3%',
          top: '28px',
          containLabel: true
        },
        title: {
          text: this.title,
          left: 'center',
          textStyle: {
            color: '#6e6e6e',
            fontSize: 16
          }
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: this.yAxisData
        },
        // legend: {
        //   data: this.legends,
        //   orient: "vertical",
        //   left: "left",
        // },
        series: this.series,
        ...this.otherOptions
      };
      if (this.legends && this.legends.length > 1) {
        options.legend = {
          show: true,
          top: '6%'
        };
      }
      this.chart.setOption(options);
    },
    initChart({ title, yAxisData, legends, series, otherOptions }) {
      if (otherOptions) {
        this.otherOptions = otherOptions;
      }
      if (this.chart) {
        this.chart.dispose();
        this.chart = null;
      }
      this.title = title;
      if (yAxisData.length == 0) {
        this.yAxisData = [];
        this.legends = [];
        this.series = [];
        return;
      }
      this.yAxisData = yAxisData;
      this.legends = legends;
      this.series = series;
      this.$nextTick(() => {
        this.chart = echarts.init(this.$refs['chart']);
        this.setOptions();
      });
    }
  }
};
</script>
<style scoped>
.r-char-wrap {
  position: relative;
}
/* .chart-container {
  margin-top: 15px;
  padding-bottom: 10px;
  padding-top: 5px;
  margin-left: 10px;
  margin-right: 10px !important;
  border-radius: 4px;
  border: 1px solid #e6e8ee;
  box-sizing: border-box;
  outline: 0;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  background-color: rgb(255, 255, 255) !important;
  box-shadow: 0 1px 7.2px 0 rgb(250, 250, 250);

  .status-chart {
    margin-left: 10px;
  }
} */
.no-data {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
