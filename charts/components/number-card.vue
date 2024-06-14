<template>
  <!-- <div class="new-card">
    <div class="title">{{ item.label }}</div>
    <div class="a-center">
      <i
        class="iconfont avatar font-26 color-white flex-center"
        :style="{ 'background-color': item.backgroundColor }"
        :class="item.icon"
      ></i>
      <div class="number cursor-pointer" @click="link(item)">
        {{ Math.ceil((item.number * rate) / 100) }}
      </div>
    </div>
  </div> -->

  <div class="desc-car flex-column">
    <span class="desc m-t-14 m-h-16 line-1">
      {{ item.key }}
    </span>
    <div class="flex-center flex-1 m-b-10">
      <div class="content a-end p-v-16">
        <span class="number">
          {{ formDataNumber(item.value) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { isIE } from '@/utils/common';
import ieMenuIcon from '@/assets/img/ieMenuIcon';
import TooltipLabel from '@/views/modules/screenData/tooltip-label.vue';

export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    TooltipLabel
  },
  data() {
    return {
      ieMenuIcon,
      isIE: isIE(),
      rate: 0,
      timer: null,
      iconEnum: {
        首页: 'homePage',
        个人工作台: 'workStation',
        我的需求: 'demandManage',
        BRD管理: 'brdManage',
        PRD管理: 'prdManage'
      }
    };
  },
  watch: {
    item: {
      handler() {
        this.rate = 0;
        this.timer = setInterval(() => {
          this.rate += 2;
          this.rate = Math.min(100, this.rate);
          if (this.rate >= 100) {
            clearInterval(this.timer);
          }
        }, 20);
      },
      deep: true
    }
  },
  methods: {
    formDataNumber(number) {
      const trueNumber = +number;
      if (trueNumber && typeof trueNumber === 'number') {
        if (trueNumber > (10000 * 10000)) {
          return (trueNumber / (10000 * 10000)).toFixed(2) + '亿';
        }
        if (trueNumber > 10000) {
          return (trueNumber / 10000).toFixed(2) + '万';
        }
        return trueNumber.toLocaleString();
      }
      return number;
    },
    link(item) {
      switch (item.type) {
        case 'myReqCount':
          this.$router.push({ path: '/demandManagement', query: { upType: 'task' } });
          break;
        case 'myCompleteReqCount':
          this.$router.push({ path: '/demandManagement', query: { status: 'onlineDone' } });
          break;
        case 'myUndoCount':
          this.$router.push('/volvo/task');
          break;
        case 'myDoneCount':
          this.$router.push('/volvo/taskHistory');
          break;
        case 'myNoticeCount':
          this.$router.push('/volvo/notice');
          break;
        case 'myRiskCount':
          this.$router.push({
            path: '/volvo/risk',
            query: { status: ['status_doing', 'status_completed'] }
          });
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.new-card {
  flex: 1;
  padding: 0 16px;
  .avatar {
    height: 46px;
    width: 46px;
    border-radius: 50%;
    margin-right: 16px;
  }
  .title {
    margin-left: 62px;
    color: #495057;
    opacity: 0.6;
  }
  .number {
    font-weight: bold;
    font-size: 40px;
  }
}

.desc-car {
  flex: 1;
  background-color: #fafafa;
  border: 1px solid #ebebeb;
  border-radius: 4px;
  margin: 0 14px;
  width: 190px;
  flex-shrink: 0;

  .desc {
    color: #707070;
    line-height: 22px;
  }

  .content {
    color: #284e80;
    text-align: center;
    max-width: 100%;
    .number {
      font-size: 32px;
      line-height: 48px;
      font-weight: 500;
      white-space: nowrap;
      // padding-bottom: 8px;
      // cursor: pointer;
    }

    .unit {
      font-size: 14px;
      line-height: 14px;
      font-weight: 400;
    }
  }
}
</style>
