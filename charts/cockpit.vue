<template>
  <div class="overview-page">
    <table-car class="m-b-16" style="padding: 0 24px 38px 24px;" title="C端用户统计">
      <div class="list-car">
        <template v-for="(item, i) in carList">
          <number-card v-loading="countLoading" :key="i" :item="item" />
        </template>
      </div>
    </table-car>

    <table-car class="m-b-16" style="padding: 0 24px 38px 24px;" title="需求分布">
      <div class="list-car">
        <template v-for="(item, i) in carList2">
          <number-card v-loading="countLoading" :key="i" :item="item" />
        </template>
      </div>
    </table-car>

    <table-car class="m-b-16" style="padding: 0 24px 38px 24px;" title="部门统计">
      <img style="width: 100%;" src="../../../../assets/img/dataCockpit/banner.jpg" alt="">
    </table-car>

    <table-car class="m-b-16" style="padding: 0 24px 38px 24px;" title="部门预算">
      <div class="list-car j-between">
        <progressCard
          v-for="item in depts"
          :key="item.title"
          :title="item.title"
          :bidAmount="item.bidAmount"
          :bidRate="item.bidRate"
          :poAmount="item.poAmount"
          :settleAmount="item.settleAmount"
          :planPoint="item.planPoint"
          :realPoint="item.realPoint"
        ></progressCard>
      </div>
      <dept-table/>
    </table-car>

    <table-car class="m-b-16" style="padding: 0 24px 38px 24px;" title="供应商统计">
      <el-tabs v-model="activeName" class="m-l-10">
        <el-tab-pane label="唯都" name="唯都"></el-tab-pane>
        <el-tab-pane label="荣联" name="荣联"></el-tab-pane>
        <el-tab-pane label="凯捷" name="凯捷"></el-tab-pane>
        <el-tab-pane label="NEC" name="NEC"></el-tab-pane>
        <el-tab-pane label="联蔚" name="联蔚"></el-tab-pane>
        <el-tab-pane label="华为" name="华为"></el-tab-pane>
        <el-tab-pane label="用友" name="用友"></el-tab-pane>
        <el-tab-pane label="PWC" name="PWC"></el-tab-pane>
        <el-tab-pane label="KPMG" name="KPMG"></el-tab-pane>
      </el-tabs>
      <dept-table/>
    </table-car>

    <table-car class="m-b-16" style="padding: 0 24px 38px 24px;" title="事件统计">
      <div class="list-car">
        <template v-for="(item, i) in carList3">
          <number-card v-loading="countLoading" :key="i" :item="item" />
        </template>
        <div style="width: 50%; position: relative;" class="p-h-20 flex-cloum">
          <h4 style="text-align: center; background-color: white; position: absolute; top: 0; left: 0; width: 100%; margin: 0; padding: 10px 0;">Global</h4>
          <img style="width: 100%;" src="../../../../assets/img/dataCockpit/barChart.jpg" alt="">
        </div>
      </div>
    </table-car>

    <table-car class="m-b-16" style="padding: 0 24px 38px 24px;" title="运维统计">
      <div class="list-car j-between">
        <progressCardOpt
          v-for="item in opts"
          :key="item.title"
          :title="item.title"
          :resRate="item.resRate"
          :rptAmount="item.rptAmount"
        ></progressCardOpt>
      </div>
    </table-car>
  </div>
</template>

<script>
import numberCard from './components/number-card.vue';
import TableCar from '../../project/overview/components/table-car';
import deptTable from './components/dept-table.vue';
import progressCard from './components/progress-card.vue';
import progressCardOpt from './components/progress-card-opt.vue';

export default {
  components: {
    numberCard,
    TableCar,
    deptTable,
    progressCard,
    progressCardOpt
  },
  data() {
    return {
      activeName: "唯都",
      countLoading: false,
      carList: [
        { label: 'App总用户数', number: '100245', unit: '项' },
        { label: 'App在线用户人数', number: '5654', unit: '项' },
        { label: 'App新增用户注册率', number: '56.42%', unit: '件' },
        { label: 'App日活用户数', number: '32232', unit: '件' },
        { label: '绑车率', number: '76.51%', unit: '件' },

        { label: '小程序总用户数', number: '10321', unit: '条' },
        { label: '小程序日活用户数', number: '6420', unit: '条' },
        { label: '小程序用户新增率', number: '56.4%', unit: '条' },
      ],
      carList2: [
        { label: '需求总数', number: '2654', unit: '项' },
        { label: '待排期', number: '782', unit: '项' },
        { label: '进行中', number: '872', unit: '件' },
        { label: '已完成', number: '1000', unit: '件' },
      ],
      carList3: [
        { label: 'C端', number: '30', unit: '项' },
        { label: 'B端', number: '30', unit: '项' },
        { label: '中台', number: '50', unit: '件' },
      ],
      depts: [
        {
          title: 'Dealer Network',
          bidAmount: '1,600万',
          bidRate: '16',
          poAmount: '1,250',
          settleAmount: '933',
          planPoint: '3000',
          realPoint: '2000',
        },
        {
          title: 'Dealer Network1',
          bidAmount: '1,600万',
          bidRate: '16',
          poAmount: '1,250',
          settleAmount: '933',
          planPoint: '3000',
          realPoint: '2000',
        },
        {
          title: 'Dealer Network2',
          bidAmount: '1,600万',
          bidRate: '16',
          poAmount: '1,250',
          settleAmount: '933',
          planPoint: '3000',
          realPoint: '2000',
        },
        {
          title: 'Dealer Network3',
          bidAmount: '1,600万',
          bidRate: '16',
          poAmount: '1,250',
          settleAmount: '933',
          planPoint: '3000',
          realPoint: '2000',
        },
        {
          title: 'Dealer Network4',
          bidAmount: '1,600万',
          bidRate: '16',
          poAmount: '1,250',
          settleAmount: '933',
          planPoint: '3000',
          realPoint: '2000',
        },
        {
          title: 'Dealer Network5',
          bidAmount: '1,600万',
          bidRate: '16',
          poAmount: '1,250',
          settleAmount: '933',
          planPoint: '3000',
          realPoint: '2000',
        },
      ],
      opts: [
        {
          title: 'APP Wechat',
          resRate: '97',
          rptAmount: '1',
        },
        {
          title: 'NB SAL',
          resRate: '96',
          rptAmount: '1',
        },
        {
          title: 'NB AFS',
          resRate: '97',
          rptAmount: '1',
        },
        {
          title: 'Bl',
          resRate: '97',
          rptAmount: '1',
        },
      ]
    };
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/modules/pagination.scss';

.overview-page {
  .list-car {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -14px;
  }

  .bottom {
    display: flex;
    min-height: 542px;
    .left {
      width: 64%;
    }

    .right {
      flex: 1;
      margin-left: 16px;
      .noNotice {
        display: flex;
        justify-content: center;
        height: auto;
        min-height: 456px;
        img {
          max-width: 300px;
        }
      }

      &-content {
        // display: flex;
        // flex-direction: column;
        // justify-content: space-between;
        // height: calc(100% - 54px);
        min-height: 456px;
        .notice-content {
          // height: calc(100% - 28px);
          // min-height: 440px;
          // height: 620px;
          // height: calc(100vh - 560px);
          // overflow: auto;
        }
      }

      ::-webkit-scrollbar {
        width: 8px;
        background-color: rgba(0, 0, 0, 0);
      }

      ::-webkit-scrollbar-track {
        background-color: rgba(0, 0, 0, 0);
      }

      ::-webkit-scrollbar-thumb {
        border-radius: 49px;
        background-color: #dcdcdc;
      }
    }

    /deep/ .el-table__header {
      width: 100% !important;
    }

    /deep/ .el-table__body {
      width: 100% !important;
    }
  }
}

.mailMore {
  display: flex;
  justify-content: flex-end;

  .more {
    text-align: right;
    margin-top: 12px;
    cursor: pointer;
  }

  .more:hover {
    color: #2a609d;
    text-decoration: underline;
  }
}
</style>

