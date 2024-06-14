<template>
  <div class="matter-table">
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      element-loading-text="加载中"
      stripe
      max-height="235"
      min-height="235"
      empty-text="暂无数据"
      class="taskList"
      @mousewheel.prevent="handleWheel"
    >
      <el-table-column v-for="col in tableHeaderData" :key="col.label" v-bind="col">
        <template slot-scope="scope">
          <!-- 模版插槽列 -->
          <template v-if="col.label === '序号'">
            {{ scope.$index + 1 }}
          </template>
          <template v-else-if="col.prop === 'name'">
            {{ col.formatter ? col.formatter(scope.row) : scope.row[col.prop] }}
          </template>
          <template v-else-if="col.prop === 'percentage'">
            {{ scope.row[col.prop] }}%
          </template>
          <template v-else>
            {{ formDataNumber(scope.row[col.prop]) }}
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!-- <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="limit"
      :current-page.sync="page"
      @size-change="pageSizeChangeHandle"
      @current-change="pageCurrentChangeHandle"
    ></el-pagination> -->
  </div>
</template>

<script>
import TableCar from '../../../project/overview/components/table-car'
import { getTodoList, getTodoListHis } from '@/utils/api/flow';

export default {
  props: {
    tableData: Array,
  },
  data() {
    return {
      radio: 0,
      page: 1,
      limit: 5,
      total: 0,
      tableLoading: false,
      // tableData: [
      //   {
      //     name: '云平台',
      //     number: '165万',
      //     processDefinitionName: '50万',
      //     money: '115万',
      //     taskName: '500',
      //     createTime: '400',
      //   },
      //   {
      //     name: '硬件采购',
      //     number: '300万',
      //     processDefinitionName: '120万',
      //     money: '180万',
      //     taskName: '300',
      //     createTime: '100',
      //   },
      //   {
      //     name: '办公费用',
      //     number: '180万',
      //     processDefinitionName: '100万',
      //     money: '80万',
      //     taskName: '400',
      //     createTime: '400',
      //   },
      //   {
      //     name: '其他',
      //     number: '35万',
      //     processDefinitionName: '10万',
      //     money: '25万',
      //     taskName: '300',
      //     createTime: '200',
      //   },
      // ],
      taskColData: [
        {prop: 'number', label: '序号', width: '60'},
        {
          prop: 'name',
          label: '供应商/部门/项目名称',
        },
        {
          prop: 'poAmount',
          label: 'PO金额',
          showOverflowTooltip: true
        },
        {
          prop: 'acceptanceAmount',
          label: '验收金额',
          showOverflowTooltip: true
        },
        {
          prop: 'percentage',
          label: '占比',
          showOverflowTooltip: true
        },
      ],
    };
  },
  components: {
    TableCar
  },
  computed: {
    tableHeaderData() {
      const showColData = this.radio ? this.taskColHistoryData : this.taskColData;
      return [
        ...showColData,
        // {
        //   prop: 'deal',
        //   fixed: 'right',
        //   label: '操作',
        //   width: '80'
        // }
      ];
    }
  },
  watch: {
    radio: {
      handler(val) {
        this.page = 1;
        this.getUserTodoList();
      }
    }
  },
  filters: {
    formatProcessName(val) {
      if (val !== undefined) {
        switch (val) {
          case 'brd':
            return 'BRD流程';
          case 'prd':
            return 'PRD流程';
          case 'risk':
            return '风险流程';
          default:
            return '';
        }
      }
      return '';
    },
    approveStatusFormatter(value) {
      let approveStatusList = [
        {
          key: 'create',
          value: '创建'
        },
        {
          key: 'running',
          value: '进行中'
        },
        {
          key: 'finish',
          value: '同意'
        },
        {
          key: 'reject',
          value: '驳回'
        },
        {
          key: 'stop',
          value: '中止'
        },
        {
          key: 'assign',
          value: '转交'
        },
        {
          key: 'error',
          value: '审批失败'
        },
        {
          key: 'confirm',
          value: '确认'
        },
        {
          key: 'suspend',
          value: '中止'
        },
        {
          key: 'submit',
          value: '提交'
        },
        {
          key: 'upgrade',
          value: '升级'
        },
        {
          key: 'completed',
          value: '完成'
        }
      ];
      let obj = approveStatusList.find((item) => value === item.key);
      if (obj) {
        return obj.value;
      } else {
        return `-`;
      }
    }
  },
  mounted() {
    this.getUserTodoList();
  },
  methods: {
    handleWheel(event) {
      event.stopPropagation(); // 阻止事件冒泡
    },
    formDataNumber(number) {
      const trueNumber = +number
      if (typeof trueNumber === 'number') {
        return trueNumber.toLocaleString();
      }
      return number
    },
    taskOnClick(instanceId, taskDefinitionKey, taskId, pid, flow) {
      //  zhongliang 处理
      if (flow === 'brd') {
        // brd参数有问题，先强行提交
        let type = '';
        switch (taskDefinitionKey) {
          case 'approveByBO':
            type = 'boApprove';
            break;
          case 'approveByLeader':
            type = 'boLeaderApprove';
            break;
          case 'createBRD':
            type = 'edit';
            break;
        }
        // taskDefinitionKey === 'approveByLeader'|| 'approveByBO' ? type = 'boApprove' : type = 'boLeaderApprove'
        this.$router.push({
          name: 'brdDetail',
          query: {
            id: pid,
            type: type,
            brdCode: '',
            instanceId: instanceId,
            taskDefinitionKey: taskDefinitionKey,
            inlet: 'overview'
          }
        });
      } else if (flow === 'prd') {
        this.$router.push({
          name: 'prdDetail',
          query: {
            id: pid,
            type: taskDefinitionKey === 'createPRD' ? 'edit' : 'view',
            detailView: taskDefinitionKey,
            instanceId: instanceId,
            inlet: 'overview'
          }
        });
      } else if (flow === 'risk') {
        this.$router.push({
          name: 'riskDetail',
          query: { id: pid, type: 'flow', inlet: 'overview' }
        });
      }
    },
    taskView(row) {
      if (row.processDefinitionName === 'brd') {
        this.$nextTick(() => {
          this.$router.push({ name: 'brdDetail', query: { id: row.relDataId, type: 'view' } });
        });
      } else if (row.processDefinitionName === 'prd') {
        this.$nextTick(() => {
          this.$router.push({
            name: 'prdDetail',
            query: { id: row.relDataId, type: 'view', detailView: 'createPRDView' }
          });
        });
      } else if (row.processDefinitionName === 'risk') {
        this.$router.push({
          name: 'riskDetail',
          query: { id: row.relDataId, type: 'view', inlet: 'overview' }
        });
      }
    },
    getUserTodoList() {
      // this.tableLoading = true;
      // const params = {
      //   page: this.page,
      //   limit: this.limit
      // };
      // let getList = this.radio ? getTodoListHis : getTodoList;
      // getList(params)
      //   .then(({ data: res }) => {
      //     if (res && res.code === 0) {
      //       this.tableData = res.data.list || [];
      //       this.total = res.data.total;
      //     } else {
      //       this.tableData = [];
      //       this.total = 0;
      //       return this.$message.error(res.msg);
      //     }
      //   })
      //   .finally(() => {
      //     this.tableLoading = false;
      //   });
    },
    pageSizeChangeHandle(val) {
      this.page = 1;
      this.limit = val;
      this.getUserTodoList();
    },
    // 改变当前页
    // val 当前页码
    pageCurrentChangeHandle(val) {
      this.page = val;
      this.getUserTodoList();
    },
    // 根据状态返回el-tag的type
    typeByStatus(status) {
      switch (status) {
        case 'reject':
          return 'danger';
        case 'assign':
          return 'warning';
        case 'finish':
          return 'success';
        case 'stop':
          return 'info';
        default:
          return '';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/modules/pagination.scss';

.taskList {
  height: 235px;
  /deep/ .el-table__header {
    font-size: 14px !important;
  }
}
</style>
