<template>
  <div v-loading="wholeLoading" class="overview-page">
    <table-car class="m-b-16" style="padding: 0 12px 24px" title="">
      <template slot="title">
        <!-- <p class="title cursor-pointer" @click="goOverview">C端用户统计</p> -->
        <el-page-header
          title="返回"
          class="title"
          @back="$emit('goBack')"
          content="C端用户统计"
        ></el-page-header>
      </template>

      <template v-if="!cuserLoading">
        <div class="list-car">
          <template v-for="(item, i) in cuserData">
            <number-card :key="i" :item="item" />
          </template>
        </div>

        <div v-if="!(cuserData && cuserData.length)" class="skeleton-user color-info">
          <span class="el-skeleton__item flex-center no-data">暂无数据</span>
        </div>
      </template>

      <el-skeleton v-if="cuserLoading" animated class="skeleton-user">
        <template slot="template">
          <el-skeleton-item v-for="num in 9" :key="num" variant="rect" />
        </template>
      </el-skeleton>
    </table-car>

    <table-car class="m-b-16" style="padding: 0 12px 24px" title="需求分布">
      <template v-if="!projectDetailLoading">
        <div v-if="!projectDetailLoading" class="list-car">
          <template v-for="(item, i) in projectDetailData">
            <number-card :key="i" :item="item" />
          </template>
        </div>

        <div
          v-if="!(projectDetailData && projectDetailData.length)"
          class="skeleton-req color-info"
        >
          <span class="el-skeleton__item flex-center no-data">暂无数据</span>
        </div>
      </template>

      <el-skeleton v-if="projectDetailLoading" animated class="skeleton-req">
        <template slot="template">
          <el-skeleton-item v-for="num in 4" :key="num" variant="rect" />
        </template>
      </el-skeleton>
    </table-car>

    <table-car class="m-b-16" style="padding: 0 12px 24px" title="事件统计">
      <div v-show="!accidentChinaLoading" class="list-car">
        <template v-for="(item, i) in accidentChinaData">
          <number-card :key="i" :item="item" />
        </template>

        <div
          v-if="!(accidentChinaData && accidentChinaData.length)"
          class="skeleton-accident color-info flex-1"
        >
          <span class="el-skeleton__item flex-center no-data">暂无数据</span>
        </div>

        <div
          v-show="accidentGlobalData.length"
          v-loading="accidentGlobalLoading"
          style="width: 50%; position: relative"
          class="p-h-14 flex-cloum"
        >
          <barChart ref="barChartRef" height="150px" width="100%"></barChart>
        </div>

        <div
          v-if="!accidentGlobalData.length"
          class="skeleton-accident color-info"
          style="width: 50%;"
        >
          <span class="el-skeleton__item flex-center no-data">暂无数据</span>
        </div>
      </div>

      <el-skeleton v-if="accidentChinaLoading" animated class="skeleton-accident">
        <template slot="template">
          <div class="flex-1 j-between">
            <el-skeleton-item v-for="num in 2" :key="num" variant="rect" />
          </div>
          <div class="flex-1 marginZero">
            <div class="m-h-14">
              <el-skeleton-item variant="rect" />
            </div>
          </div>
        </template>
      </el-skeleton>
    </table-car>

    <table-car class="m-b-16" style="padding: 0 12px 24px" :title="`运维统计（${currentYear}年）`">
      <template v-if="!operationLoading">
        <div class="list-car j-between">
          <progressCardOpt
            v-for="item in operationData"
            :key="item.key"
            :title="item.key"
            :slaResponse="item.slaResponse"
            :rptAmount="item.rptAmount"
            class="flex-1"
          ></progressCardOpt>
        </div>

        <div v-if="!(operationData && operationData.length)" class="skeleton-operation color-info">
          <span class="el-skeleton__item flex-center no-data">暂无数据</span>
        </div>
      </template>

      <el-skeleton v-if="operationLoading" animated class="skeleton-operation">
        <template slot="template">
          <el-skeleton-item v-for="num in 4" :key="num" variant="rect" />
        </template>
      </el-skeleton>
    </table-car>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import numberCard from './components/number-card.vue';
import TableCar from '../../project/overview/components/table-car';
import progressCardOpt from './components/progress-card-opt.vue';
import barChart from './components/bar-chart.vue';
import { fetchData, getMappingApi } from './apiData';

export default {
  components: {
    numberCard,
    TableCar,
    barChart,
    progressCardOpt
  },
  data() {
    return {
      currentYear: dayjs().format('YYYY'),
      currentMonth: dayjs().format('YYYY年MM月'),

      cuserData: [],
      projectDetailData: [],
      accidentChinaData: [],
      accidentGlobalData: [],
      operationData: [],

      wholeLoading: false,

      cuserLoading: true,
      projectDetailLoading: true,
      accidentChinaLoading: true,
      accidentGlobalLoading: true,
      operationLoading: true
    };
  },
  mounted() {
    this.$emit('inited');
    this.initPage();
  },
  methods: {
    barChartResize() {
      if (this.$refs.barChartRef) {
        this.$refs.barChartRef.chartResize();
      }
    },
    initBarChart() {
      this.$nextTick(() => {
        const total = this.accidentGlobalData.reduce((pre, item) => {
          return pre + item.doing + item.remain;
        }, 0);

        this.$refs.barChartRef.initChart({
          title: 'Global',
          yAxisData: this.accidentGlobalData.map((v) => v.key),
          series: [
            {
              name: '进行中',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
                formatter: ({ value }) => {
                  return value > total / 10 ? value : '';
                }
              },
              emphasis: {
                focus: 'series'
              },
              data: this.accidentGlobalData.map((v) => v.doing)
            },
            {
              name: '剩余',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
                formatter: ({ value }) => {
                  return value > total / 10 ? value : '';
                }
              },
              emphasis: {
                focus: 'series'
              },
              data: this.accidentGlobalData.map((v) => v.remain)
            },
            {
              name: '总数',
              type: 'bar',
              stack: 'total', // 与上面为一列
              label: {
                normal: {
                  show: true,
                  formatter: ({ dataIndex }) => {
                    return this.accidentGlobalData.map((v) => v.value)[dataIndex];
                  },
                  textStyle: { color: '#000' }
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgba(128, 128, 128, 0)'
                }
              },
              data: this.accidentGlobalData.map((v) => Math.floor(total / 20))
            }
          ],
          otherOptions: {
            tooltip: {
              trigger: 'axis',
              formatter: (eve) => {
                const [doing, remain, total] = eve;
                const project = this.accidentGlobalData.find((v) => v.key === doing.name);
                const totalNumber = project && project.value;
                return `
                    <div style="min-width: 120px">${total.name}<div/>
                    <div style="display: flex; justify-content: space-between">
                      <div>
                        ${total.marker}${total.seriesName}
                      </div>  
                      <div>
                        ${totalNumber}
                      </div>
                    </div> 
                    <div style="display: flex; justify-content: space-between">
                      <div>
                        ${doing.marker}${doing.seriesName}
                      </div>  
                      <div>
                        ${doing.value}
                      </div>
                    </div> 
                    <div style="display: flex; justify-content: space-between">
                      <div>
                        ${remain.marker}${remain.seriesName}
                      </div>  
                      <div>
                        ${remain.value}
                      </div>
                    </div> 
                  `;
              },
              axisPointer: {
                type: 'shadow'
              }
            }
          }
        });
        this.accidentGlobalLoading = false;
      });
    },
    initPage() {
      const cuserFetch = getMappingApi('cuser')({ year: this.currentYear }).then(
        ({ data: res }) => {
          const { code, data } = res;
          this.cuserData = data;
          this.cuserLoading = false;
        }
      );
      const projectDetailsFetch = getMappingApi('projectDetail')().then(({ data: res }) => {
        const {
          code,
          data: { req: reqData }
        } = res;
        this.projectDetailData = [
          { key: '需求总数', value: reqData.total },
          { key: '待排期', value: reqData.waiting },
          { key: '进行中', value: reqData.doing },
          { key: '已完成', value: reqData.finished }
        ];
        this.projectDetailLoading = false;
      });
      const accidentChinaFetch = getMappingApi('accidentChina')({ year: this.currentYear }).then(
        ({ data: res }) => {
          const { code, data } = res;
          this.accidentChinaData = data.details;
          this.accidentChinaLoading = false;
        }
      );
      const accidentGlobalFetch = getMappingApi('accidentGlobal')({ year: this.currentYear }).then(
        ({ data: res }) => {
          const { code, data } = res;
          this.accidentGlobalData = Array.isArray(data && data.details)
            ? [...data.details].reverse()
            : [];
          this.initBarChart();
        }
      );
      const operationFetch = getMappingApi('operation')({ year: this.currentYear }).then(
        ({ data: res }) => {
          const { code, data } = res;
          this.operationData = data.map((v) => {
            const [{ value: slaResponse }, { value: rptAmount }] = v.details;
            return {
              key: v.name,
              slaResponse,
              rptAmount
            };
          });
          this.operationLoading = false;
        }
      );

      const promises = [
        cuserFetch,
        projectDetailsFetch,
        accidentChinaFetch,
        accidentGlobalFetch,
        operationFetch
      ];

      Promise.all(promises).finally((res) => {
        this.$emit('inited');
        this.$nextTick(() => {
          this.wholeLoading = false;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.overview-page {
  height: 1080px;
  /deep/ .title {
    padding: 20px 0 16px 28px !important;
  }
  /deep/ .el-page-header__content {
    font-size: 20px;
  }
  /deep/ .el-page-header__left {
    margin-right: 24px;
    &::after {
      right: -12px;
    }
  }
  .list-car {
    display: flex;
    // flex-wrap: wrap;
  }
}
/deep/ .el-skeleton {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
/deep/ .el-skeleton__item {
  flex: 1;
  margin: 0 14px;
}
.marginZero /deep/ .el-skeleton__item {
  flex: 1;
  margin: 0 !important;
}
.skeleton {
  &-user {
    /deep/ .el-skeleton__item {
      height: 128px;
    }
  }
  &-req {
    /deep/ .el-skeleton__item {
      height: 128px;
    }
  }
  &-accident {
    /deep/ .el-skeleton__item {
      height: 150px;
    }
  }
  &-operation {
    /deep/ .el-skeleton__item {
      height: 256px;
    }
  }
}
.no-data {
  background-color: #f1f1f1;
  width: calc(100% - 24px);
}
</style>
