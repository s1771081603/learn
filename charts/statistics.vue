<template>
  <div>
    <table-car class="m-b-16" style="padding: 0 24px 0 24px" title="费用统计">
      <template slot="title">
        <el-page-header
          title="返回"
          class="title"
          @back="$emit('goBack')"
          content="费用统计"
        ></el-page-header>
      </template>
      <div style="width: 100%; display: flex;justify-content: flex-end;">
        <el-select
            v-model="yearValue"
            placeholder="请选择"
            :popper-append-to-body="false"
            clearable
        >
          <el-option
              v-for="item in yearData"
              :key="item"
              :label="item"
              :value="item"
          >
          </el-option>
        </el-select>
      </div>
      <div
        class="statistics-page"
        v-loading="pieLoading"
      >
        <div class="page-graph">
          <div class="chart-content">
            <div
                :class="className"
                :style="{ height: height, minHeight: minHeight }"
                ref="chart-application"
            ></div>
          </div>
          <div class="chart-content">
            <div
                :class="className"
                :style="{ height: height, minHeight: minHeight }"
                ref="chart-expenditure"
            ></div>
          </div>
          <div class="chart-content">
            <div
              :class="className"
              :style="{ height: height, minHeight: minHeight }"
              ref="chart-depts"
            ></div>
          </div>
        </div>
      </div>
<!--      <div style="height: 5px;"></div>-->
    </table-car>

    <table-car
      v-loading="progressCardLoading"
      element-loading-background="rgba(233, 233, 233, 0.5)"
      style="padding: 0 24px 15px 24px"
      title="费用统计"
      :type="1"
      :checked.sync="checked"
      @checkedChange="checkedChange"
      :title-list="[
        { name: '供应商统计', value: 1 },
        { name: '部门统计', value: 2 },
        { name: '项目统计', value: 3 }
      ]"
    >
      <div>
        <div
            v-show="checked === 1"
            :class="className"
            :style="{ height: height, minHeight: minHeight }"
            ref="chart-supplier-blend"
        ></div>
        <div
            v-show="checked === 2"
            :class="className"
            :style="{ height: height, minHeight: minHeight }"
            ref="chart-depts-blend"
        ></div>
        <div
            v-show="checked === 3"
            :class="className"
            :style="{ height: height, minHeight: minHeight }"
            ref="chart-project-blend"
        ></div>
      </div>
<!--      <div-->
<!--        v-if="!(proportionData && proportionData.length)"-->
<!--        style="padding-bottom: 20px; width: 100%"-->
<!--      >-->
<!--        <div class="no-data flex-center" style="height: 234px">暂无数据</div>-->
<!--      </div>-->
      <dept-table
        v-loading="tableDataLoading"
        element-loading-background="rgba(233, 233, 233, 0.5)"
        :table-data="tableData"
      />
    </table-car>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import sum from 'lodash/sum';
import dayjs from 'dayjs';
import progressCard from './components/progress-card.vue';
import deptTable from './components/dept-table.vue';
import TableCar from '../../project/overview/components/table-car';
import { fetchData, getMappingApi } from '@/views/modules/volvo/charts/apiData';
export default {
  name: 'statistics',
  // import引入的组件需要注入到对象中才能使用
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    height: {
      type: String,
      // default: 'calc((100vh - 284px) / 2)'
      default: '300px'
    },
    minHeight: {
      type: String,
      default: '300px'
    },
    title: String,
    resRate: String,
    rptAmount: String
  },
  components: {
    TableCar,
    progressCard,
    deptTable
  },
  data() {
    return {
      currentYear: dayjs().format('YYYY'),
      yearValue: '',
      chartDepts: null,
      chartAmount: null,
      chartApplication: null,
      chartExpenditure: null,
      chartDeptsBlend: null,
      chartSupplierBlend: null,
      chartProjectBlend: null,
      checked: 0,
      deptData: [],
      yearData: [],
      supplierData: [],
      projectData: [],
      trendData: {},
      deptsPieData: [],
      amountPieData: [],
      applicationPieData: [],
      hadAppliedText: '',
      hadSpentText: '',
      projectDetail: {
        req: {},
        risk: {}
      },
      tableDataLoading: false,
      deptLoading: false,
      supplierLoading: false,
      trendDataLoading: false,
      progressCardLoading: false,
      projectDetailLoading: false,
      pieLoading: false,
      deptChecked: '',
      tableData: [],
      proportionData: []
    };
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    getMappingApi('year')().then(({ data: res }) => {
      this.yearData = res.data
      this.yearValue = res.data && res.data.length ? Math.max(...this.yearData) : dayjs().format('YYYY')
      // this.init();
    })
  },
  activated() {},
  computed: {
    statData() {
      return [
        {
          name: '中标总金额',
          value: this.deptData.bidAmount
        },
        // {
        //   name: '项目中标金额',
        //   value: this.deptData.bidAmount
        // },
        {
          name: 'PO总金额',
          value: this.deptData.poAmount
        },
        {
          name: '结算总金额',
          // name: '已结算金额',
          value: this.deptData.settleAmount
        },
        {
          name: '预计工作点数',
          value: this.deptData.planPoint
        },
        {
          name: '实际工作点数',
          value: this.deptData.realPoint
        }
      ];
    },
    progressDefine() {
      return [
        {
          title: 'PO总金额/中标总金额',
          color: null,
          current: this.deptData.poAmount,
          target: this.deptData.bidAmount
        },
        {
          title: '实际工作点数/预计工作点数',
          color: 'success',
          current: this.deptData.realPoint,
          target: this.deptData.planPoint
        },
        {
          title: 'PO总金额/结算总金额',
          realColor: '#aa8a61',
          current: this.deptData.poAmount,
          target: this.deptData.settleAmount
        },
        {
          title: '已完成需求/需求总数',
          color: 'warning',
          current: this.projectDetail.req.finished,
          target: this.projectDetail.req.total
        },
        {
          title: '已解决风险/风险总数',
          color: 'exception',
          current: this.projectDetail.risk.confirmed,
          target: this.projectDetail.risk.total
        }
      ];
    }
    // proportionData() {
    //   return this.checked === 1 ? this.deptData.deptDetails : this.supplierData.supplierDetails
    // }
  },
  watch: {
    deptChecked(val) {
      switch (this.checked) {
        case 1:
          this.tableDataLoading = true;
          try {
            let dataIndex = this.deptData.deptDetails.findIndex((item) => {
              return item.name === val;
            });
            if (dataIndex === -1) return;
            this.tableData = this.deptData.deptDetails[dataIndex].details;
          } catch (error) {
            this.tableData = [];
          }
          this.tableDataLoading = false;
          setTimeout(() => {}, 150);
          break;
        case 2:
          this.tableDataLoading = true;
          try {
            let supplierDataIndex = this.supplierData.supplierDetails.findIndex((item) => {
              return item.name === val;
            });
            if (supplierDataIndex === -1) return;
            this.tableData = this.supplierData.supplierDetails[supplierDataIndex].details;
          } catch (error) {
            this.tableData = [];
          }
          setTimeout(() => {
            this.tableDataLoading = false;
          }, 150);
          break;
      }
    },
    yearValue(val){
      if(!val) return
      this.init()
    },
    // checked(val) {
    //
    // }
  },
  methods: {
    checkedChange(val) {
      switch (val) {
        case 1:
          this.progressCardLoading = true;
          try {
            this.tableData = this.supplierData
            this.initBlendChart('chartSupplierBlend', 'chart-supplier-blend', {
              xAxis: 'xAxisSupplier',
              yAxisA: 'yAxisSupplierPoAmount',
              yAxisB: 'yAxisSupplierAmount' ,
              yAxisLine: 'yAxisSupplierPercentage'
            })
          } catch (error) {
            this.proportionData = [];
            this.deptChecked = null;
          }
          setTimeout(() => {
            this.progressCardLoading = false;
          }, 250);
          break;
        case 2:
          this.progressCardLoading = true;
          try {
            this.tableData = this.deptData
            this.initBlendChart('chartDeptsBlend', 'chart-depts-blend', {
              xAxis: 'xAxisDept',
              yAxisA: 'yAxisDeptPoAmount',
              yAxisB: 'yAxisDeptAmount' ,
              yAxisLine: 'yAxisDeptPercentage'
            })
          } catch (error) {
            this.proportionData = [];
            this.deptChecked = null;
          }
          setTimeout(() => {
            this.progressCardLoading = false;
          }, 250);
          break;
        case 3:
          this.progressCardLoading = true;
          try {
            this.tableData = this.projectData
            this.initBlendChart('chartProjectBlend', 'chart-project-blend', {
              xAxis: 'xAxisProject',
              yAxisA: 'yAxisProjectPoAmount',
              yAxisB: 'yAxisProjectAmount' ,
              yAxisLine: 'yAxisProjectPercentage'
            })
          } catch (error) {
            this.proportionData = [];
            this.deptChecked = null;
          }
          setTimeout(() => {
            this.progressCardLoading = false;
          }, 250);
          break;
      }
    },
    chartResize() {
      this.chartDepts && this.chartDepts.resize();
      this.chartApplication && this.chartApplication.resize()
      this.chartExpenditure && this.chartExpenditure.resize()
      this.chartDeptsBlend && this.chartDeptsBlend.resize()
      this.chartSupplierBlend && this.chartSupplierBlend.resize()
      this.chartProjectBlend && this.chartProjectBlend.resize()
    },
    formatProgress(current, target) {
      const res = (current / target).toFixed(4) * 100;
      return res || 0;
    },
    formDataNumber(number) {
      if (!number) return '-';
      const trueNumber = +number;
      if (typeof trueNumber === 'number') {
        return trueNumber.toLocaleString();
      }
      return number;
    },
    init() {
      this.deptLoading = true;
      this.supplierLoading = true;
      this.trendDataLoading = true;
      this.progressCardLoading = true
      this.pieLoading = true
      this.checked = 1

      const deptFetch = getMappingApi('dept')({ year: this.yearValue }).then(({ data: res }) => {
        let { code, data } = res;
        if (!data) data = {};
        this.deptData = data.details || [];
        if( !data.poDetails ) data.poDetails = []
        this.deptsPieData = data.poDetails.map((dept) => {
          return {
            name: dept.name,
            value: dept.poAmount
          };
        });
        if (!data.details ) data.details = []
        this.xAxisDept = data.details.map((dept) => {
          return dept.name
        })
        this.yAxisDeptAmount = data.details.map((dept) => {
          return dept.acceptanceAmount
        })

        this.yAxisDeptPoAmount = data.details.map((dept) => {
          return dept.poAmount
        })

        this.yAxisDeptPercentage = data.details.map((dept) => {
          return dept.percentage
        })

      });
      const supplierFetch = getMappingApi('supplier')({ year: this.yearValue }).then(
        ({ data: res }) => {
          let { code, data } = res;
          if (!data) data = []
          this.supplierData = data;
          this.xAxisSupplier = data.map((dept) => {
            return dept.name
          })
          this.yAxisSupplierAmount = data.map((dept) => {
            return dept.acceptanceAmount
          })

          this.yAxisSupplierPoAmount = data.map((dept) => {
            return dept.poAmount
          })

          this.yAxisSupplierPercentage = data.map((dept) => {
            return dept.percentage
          })
          this.supplierLoading = false;
        }
      );

      const projectFetch = getMappingApi('project')({ year: this.yearValue }).then(
          ({ data: res }) => {
            let { code, data } = res;
            if (!data) data = []
            this.projectData = data;
            this.xAxisProject = data.map((dept) => {
              return dept.name
            })
            this.yAxisProjectAmount = data.map((dept) => {
              return dept.acceptanceAmount
            })

            this.yAxisProjectPoAmount = data.map((dept) => {
              return dept.poAmount
            })

            this.yAxisProjectPercentage = data.map((dept) => {
              return dept.percentage
            })
            this.projectLoading = false;
          }
      );

      const projectDetailFetch = getMappingApi('projectDetail')().then(({ data: res }) => {
        const { code, data } = res;
        this.projectDetail = {
          req: data.req || {},
          risk: data.risk || {}
        };
        this.projectDetailLoading = false;
      });


      const expenseFetch = getMappingApi('expense')({ year: this.yearValue }).then(({ data: res }) => {
        const { code, data } = res;
        const expenseData = data
        if (!expenseData) return
        this.hadAppliedText = ((expenseData.hadApplied / (expenseData.hadApplied + expenseData.pendingApplied)) * 100).toFixed(2)
        this.applicationPieData = [
          { name: '已申请项', value: expenseData.hadApplied },
          { name: '待申请项', value: expenseData.pendingApplied }
        ]
        this.hadSpentText = ((expenseData.hadSpent / (expenseData.hadSpent + expenseData.pendingSpent)) * 100).toFixed(2)
        this.expenditurePieData = [
          { name: '已支出项', value: expenseData.hadSpent },
          { name: '待支出项', value: expenseData.pendingSpent }
        ]
      })
      const promises = [ deptFetch, supplierFetch, projectDetailFetch, expenseFetch, projectFetch];

      Promise.all(promises).then((res) => {
        this.initPieChart();
        this.checkedChange(1)
        this.$emit('inited');
      }).finally(() => {
        this.pieLoading = false
      });
    },
    cardChange(key) {
      this.deptChecked = key;
    },
    // 销毁饼图图表
    disposeChart() {
      if (this.chartDepts) {
        this.chartDepts.dispose();
        this.chartDepts = null;
      }
      if (this.chartAmount) {
        this.chartAmount.dispose();
        this.chartAmount = null;
      }
      if (this.chartApplication) {
        this.chartApplication.dispose()
        this.chartApplication = null
      }
      if (this.chartExpenditure) {
        this.chartExpenditure.dispose()
        this.chartExpenditure = null
      }
    },
    // 销毁柱状折线图表
    disposeBlendChart() {
      if (this.chartDeptsBlend) {
        this.chartDeptsBlend.dispose();
        this.chartDeptsBlend = null;
      }
      if (this.chartSupplierBlend) {
        this.chartSupplierBlend.dispose()
        this.chartSupplierBlend = null
      }
      if (this.chartProjectBlend) {
        this.chartProjectBlend.dispose()
        this.chartProjectBlend = null
      }
    },
    // 初始化折线柱状图
    initBlendChart(option, ref, chartCon) {
      this.disposeBlendChart();
      let that = this;
      this.$nextTick(() => {
        try {
          let optionData = {}
          that[option] = echarts.init(this.$refs[ref]);
          this.initBlendChartData(option, optionData, chartCon)
        } catch {}
      });
    },
    // 初始化部门的折线柱状数据
    initBlendChartData(chart, option, chartCon) {
      const color = [
        '#314d7c',
        '#314d7cd0',
        '#314d7cb0',
        '#314d7c90',
        '#314d7c70',
        '#314d7c50',
        '#314d7c30',
        '#314d7c10'
      ];
      option = {
        color,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
        },
        legend: {
          data: ['PO金额', '验收金额', '占比']
        },
        xAxis: [
          {
            type: 'category',
            data: this[chartCon.xAxis],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '金额',
            min: 0,
            // max: 250,
            // interval: 50,
          },
          {
            type: 'value',
            name: '百分比',
            min: 0,
            // max: 25,
            // interval: 5,
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: 'PO金额',
            type: 'bar',
            data: this[chartCon.yAxisA]
          },
          {
            name: '验收金额',
            type: 'bar',
            data: this[chartCon.yAxisB]
          },
          {
            name: '占比',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + ' %';
              }
            },
            data: this[chartCon.yAxisLine]
          }
        ]
      };
      console.log(this[chart], option, '初始化数据')
      this[chart].setOption(option);
    },
    setBlendOptions() {},
    // 初始化饼状图
    initPieChart() {
      this.disposeChart();
      let that = this;
      this.$nextTick(() => {
        try {
          this.chartDepts = echarts.init(this.$refs['chart-depts']);
          // this.chartAmount = echarts.init(this.$refs['chart-amount']);
          this.chartApplication = echarts.init(this.$refs['chart-application'])
          this.chartExpenditure = echarts.init(this.$refs['chart-expenditure'])
          this.setPieOptions();
          this.chartDepts.on('click', function (params) {
            that.$emit('showChartDetail', that.rptDefId);
          });
          // this.chartAmount.on('click', function (params) {
          //   that.$emit('showChartDetail', that.rptDefId);
          // });
        } catch {}
      });
    },
    initApplicationOptions() {
      this.applicationOptions = {
        color: ['#314d7c', '#314d7ca0'],
        title: {
          text: '申请情况',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: (item) => {
            return `<div style="display: flex; justify-content: space-between">
                      <div>
                        ${item.marker}${item.name}
                      </div>
                      <div style="margin-left: 16px">
                        ${(+item.value).toLocaleString()}（${item.percent}%）
                      </div>
                    </div> `;
          },
          axisPointer: {
            type: 'shadow'
          }
        },
        graphic: [
          {
            type: 'text',
            left: 'center',
            top: '38%',
            style: {
              text: '已申请项',
              fontFamily: 'Volvo Novum',
              textAlign: 'center',
              fontSize: 18,
              fill: '#aaa',
              width: 30,
              height: 30,
              lineHeight: 40
            }
          },
          {
            type: 'text',
            left: 'center',
            top: '48%',
            style: {
              text: (this.hadAppliedText || 0) + '%',
              fontFamily: 'Volvo Novum',
              textAlign: 'center',
              fontSize: 18,
              fill: '#aaa',
              width: 30,
              height: 30,
              lineHeight: 40
            }
          }
        ],
        legend: {
          bottom: '0',
          itemWidth: 16,
          itemHeight: 12,
          left: 'center',
          selectedMode: false,
          // show: this.applicationPieData.length < 10,
        },
        series: [
          {
            data: this.applicationPieData,
            radius: ['43%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                formatter: function (item) {
                  return `${item.name}: ${item.percent}%`;
                }
              }
            },
            type: 'pie',
            areaStyle: {}
          }
        ]
      };
      this.chartApplication.setOption(this.applicationOptions);
    },
    initExpenditureOptions() {
      this.expenditureOptions = {
        color: ['#314d7c', '#314d7ca0'],
        title: {
          text: '支出情况',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: (item) => {
            return `<div style="display: flex; justify-content: space-between">
                      <div>
                        ${item.marker}${item.name}
                      </div>
                      <div style="margin-left: 16px">
                        ${(+item.value).toLocaleString()}（${item.percent}%）
                      </div>
                    </div> `;
          },
          axisPointer: {
            type: 'shadow'
          },
        },
        graphic: [
          {
            type: 'text',
            left: 'center',
            top: '38%',
            style: {
              text: '已支出项',
              fontFamily: 'Volvo Novum',
              textAlign: 'center',
              fontSize: 18,
              fill: '#aaa',
              width: 30,
              height: 30,
              lineHeight: 40
            }
          },
          {
            type: 'text',
            left: 'center',
            top: '48%',
            style: {
              text: (this.hadSpentText || 0) + '%',
              fontFamily: 'Volvo Novum',
              textAlign: 'center',
              fontSize: 18,
              fill: '#aaa',
              width: 30,
              height: 30,
              lineHeight: 40
            }
          }
        ],
        legend: {
          bottom: '0',
          itemWidth: 16,
          itemHeight: 12,
          left: 'center',
          selectedMode: false,
          // show: this.applicationPieData.length < 10,
        },
        series: [
          {
            data: this.expenditurePieData,
            radius: ['43%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                formatter: function (item) {
                  return `${item.name}: ${item.percent}%`;
                }
              }
            },
            type: 'pie',
            areaStyle: {},
          }
        ]
      };
      this.chartExpenditure.setOption(this.expenditureOptions);
    },
    // 设置面积图参数
    setPieOptions() {
      const color = [
        '#314d7c',
        '#314d7cd0',
        '#314d7cb0',
        '#314d7c90',
        '#314d7c70',
        '#314d7c50',
        '#314d7c30',
        '#314d7c10'
      ];
      this.deptsOptions = {
        color,
        title: {
          text: `部门PO金额统计`,
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: (item) => {
            return `<div>
                      <span style="margin-left: 2px">${item.marker}</span>
                      ${item.name}
                    </div>
                    <div>
                      金额：${(+item.value).toLocaleString()}
                    </div>
                    <div>
                      占比：${item.percent}%
                    </div>`;
          },
          axisPointer: {
            type: 'shadow'
          }
        },
        // graphic: [
        //   {
        //     type: 'text',
        //     left: 'center',
        //     top: '38%',
        //     style: {
        //       text: '中标总金额',
        //       fontFamily: 'Volvo Novum',
        //       textAlign: 'center',
        //       fontSize: 18,
        //       fill: '#aaa',
        //       width: 30,
        //       height: 30,
        //       lineHeight: 40
        //     }
        //   },
        //   {
        //     type: 'text',
        //     left: 'center',
        //     top: '48%',
        //     style: {
        //       text: sum(this.deptsPieData.map((item) => parseInt(item.value))).toLocaleString(),
        //       fontFamily: 'Volvo Novum',
        //       textAlign: 'center',
        //       fontSize: 18,
        //       fill: '#aaa',
        //       width: 30,
        //       height: 30,
        //       lineHeight: 40
        //     }
        //   }
        // ],
        legend: {
          bottom: '0',
          itemWidth: 16,
          itemHeight: 12,
          left: 'center',
          show: this.deptsPieData.length < 10,
        },
        series: [
          {
            data: this.deptsPieData,
            radius: ['43%', '70%'],
            label: {
              normal: {
                formatter: function (item) {
                  return `${item.name}: ${item.percent}%`;
                }
              }
            },
            // labelLine: {
            //   show: false
            // },
            type: 'pie',
            areaStyle: {}
          }
        ]
      };

      // // 监听饼状图点击legend调整总数
      // let echartsArr = [];
      // let echartsNum = 0;
      // this.chartDepts.on('legendselectchanged', (params) => {
      //   echartsArr = [];
      //   for (let key in params.selected) {
      //     // 判断值是否为true 将值为true的名字push到echartsArr数组当中保留起来
      //     if (params.selected[key]) {
      //       echartsArr.push(key);
      //     }
      //   }
      //   echartsNum = 0;
      //   this.deptsOptions.series[0].data.forEach((item) => {
      //     echartsArr.forEach((v) => {
      //       if (item.name === v) {
      //         echartsNum += parseInt(item.value);
      //       }
      //     });
      //   });
      //   this.deptsOptions.graphic[1].style.text = echartsNum.toLocaleString();
      //   if (['uatReport', 'produceReport'].includes(this.reportType)) {
      //     delete this.deptsOptions.legend;
      //   }
      //   this.$nextTick(() => {
      //     this.chartDepts.setOption(this.deptsOptions);
      //   });
      // });

      this.chartDepts.setOption(this.deptsOptions);
      this.initApplicationOptions()
      this.initExpenditureOptions()
    }
  }
};
</script>
<style scoped lang="scss">
.list-dept {
  display: flex;
  // flex-wrap: wrap;
  justify-content: space-between;
  border-radius: 5px;
  overflow-x: auto;
  .list-item {
    flex: 1;
    margin: 0 10px;
    min-width: 187px;
  }
  .list-item:first-child {
    margin: 0 10px 0 0;
    //filter: drop-shadow(1px 1px 3px #304e7d);
  }
  .list-item:last-child {
    margin: 0 0 0 10px;
  }
  .list-item:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
  .item-color {
    background-color: #fafafa;
  }
  .item-color-checked {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
  }
}
.list-dept::-webkit-scrollbar {
  width: 10px !important;
  height: 10px !important;
}

.statistics-page {
  background-color: #fff;
  padding-bottom: 10px;
  border-radius: 4px;
  // width: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .page-graph {
    width: 100%;
    display: flex;
    padding-bottom: 20px;
    justify-content: space-between;
    .chart-content {
      flex: 1;
    }
    .progress-content {
      flex: 1;
      display: flex;
      align-items: center;
      .page-progress {
        margin: 24px 0;
        .progress-text {
          display: flex;
          justify-content: space-between;
          font-size: 15px;
          margin-bottom: 5px;
        }
      }
    }
  }
  .page-data {
    display: flex;
    width: 100%;
    .data-statistics {
      background-color: #fafafa;
      width: 100%;
      height: 88px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .data-item {
        // width: 16%;
        flex: 1;
        height: 58px;
        border-right: 1px solid #d9d9d9;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        :first-child {
          font-weight: bold;
          margin-bottom: 5px;
        }
      }
      :last-child {
        border-right: 0;
      }
    }
  }
}
/deep/ .el-progress-bar {
  padding-right: 0 !important;
}
/deep/ .title {
  padding: 20px 0 16px 16px !important;
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
.no-data {
  background-color: #f1f1f1;
  width: 100%;
}
/deep/ .el-select-dropdown.el-popper{
  left: 0 !important;
  width: 100%;
}
///deep/ /* 隐藏Element UI Select组件的箭头 */
//.el-select .el-input__suffix {
//  display: none;
//}
</style>
