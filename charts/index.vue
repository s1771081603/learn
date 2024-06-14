<template>
  <div
    @wheel="goWheel"
    class="main-screen"
  >
    <!-- <cockpit></cockpit> -->
    <el-carousel
      ref="swiper"
      arrow="hover"
      height="1045px"
      direction="vertical"
      :loop="false"
      :autoplay="false"
      style=" position: relative;"
      @change="change"
    >
      <el-carousel-item v-for="item in 2" :key="item">
        <reqView v-if="item === 2" ref="reqViewRef" @goBack="goBack" @inited="setTransForm"></reqView>
        <statistics v-if="item === 1" ref="statisticsRef" @goBack="goBack" @inited="setTransForm" />
      </el-carousel-item>
    </el-carousel>
    <i v-if="allowIndex === 1" class="btn-div-up el-icon-caret-top" @click="prev"></i>
    <i v-if="allowIndex === 0" class="btn-div-down el-icon-caret-bottom" @click="next"></i>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import cockpit from './cockpit';
import reqView from './req-view.vue';
import Statistics from '@/views/modules/volvo/charts/statistics';
import { isCockpitUser } from '@/utils/userMapping';
import screenfull from 'screenfull';

export default {
  components: {
    Statistics,
    cockpit,
    reqView
  },
  data() {
    return {
      allowChange: true, //以此来控制每次轮播图切换的张数
      screenScale: {
        x: 1,
        y: 1
      },
      contentMargin: {
        top: 0,
        left: 0
      },
      allowIndex: 0
    };
  },
  provide() {
    return {
      screenScale: this.screenScale
    };
  },
  activated() {
    this.setTransForm();
  },
  created() {
    if (!isCockpitUser()) {
      this.$message.warning('暂无权限，请联系系统管理员');
      this.goBack();
    }
    if (this.shouldFull()) {
      screenfull && screenfull.request && screenfull.request();
    }
  },
  mounted() {
    this.__resizeHanlder = debounce(() => {
      this.setTransForm();
    }, 100);
    window.addEventListener('resize', this.__resizeHanlder);

    // // 去掉侧边栏的动画完成之后，初始化主内容框边距
    // setTimeout(() => {
    //   this.setTransForm();
    // }, 500)
  },
  beforeDestroy() {
    screenfull && screenfull.exit && screenfull.exit();
    document.body.style = ``;
    window.removeEventListener('resize', this.__resizeHanlder);
  },
  methods: {
    change(val) {
      this.allowIndex = val
    },
    prev() {
      this.$refs.swiper.prev();
    },
    next() {
      this.$refs.swiper.next();
    },
    goBack() {
      const routeList = Object.assign([], this.$store.state.routeList);
      let to = routeList[routeList.length - 2];
      if (to && to.name !== 'sso') {
        this.$router.replace(to);
      } else {
        this.$router.replace('/overview');
      }
    },
    shouldFull() {
      // 1.拿到当前设备（浏览器）的宽度
      let currentWidth = document.documentElement.clientWidth || document.body.clientWidth;
      let currentHeight = document.documentElement.clientHeight || document.body.clientHeight;

      // windows： 1920 / 890   ---   2.175
      return currentWidth / currentHeight > 17 / 9;
    },
    isScrollable(element) {
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;

      if (scrollHeight > clientHeight) {
        return true;
      }

      if (element.style.overflow === 'auto' || element.style.overflow === 'scroll') {
        return true;
      }

      return false;
    },
    testAllowWheel(event) {
      const targetDom = document.querySelector('.el-table__body-wrapper');

      if (targetDom && this.isScrollable(targetDom)) {
        const mouseX = event.clientX; // 获取鼠标位置的x坐标
        const mouseY = event.clientY; // 获取鼠标位置的y坐标

        // 获取目标DOM的坐标和大小
        const targetRect = targetDom.getBoundingClientRect();
        const targetX = targetRect.left;
        const targetY = targetRect.top;
        const targetWidth = targetRect.width;
        const targetHeight = targetRect.height;

        // 判断鼠标是否在目标DOM内
        if (
          mouseX >= targetX &&
          mouseX <= targetX + targetWidth &&
          mouseY >= targetY &&
          mouseY <= targetY + targetHeight
        ) {
          return false;
        }
      }
      return true;
    },
    goWheel(event) {
      if (!this.testAllowWheel(event)) {
        return;
      }
      if (event.deltaY > 5 && this.allowChange == true) {
        this.$refs.swiper.next();
        this.allowChange = false;
        setTimeout(() => {
          this.allowChange = true;
        }, 500);
      }

      if (event.deltaY < -5 && this.allowChange == true) {
        this.$refs.swiper.prev();
        this.allowChange = false;
        setTimeout(() => {
          this.allowChange = true;
        }, 500);
      }
    },
    setTransForm() {
      // 设计稿：1920 * 1080
      // 设配目标：1920 * 1080 ( 1 : 1) | 3840* 2160 ( 2 : 2 ) | 7680 * 2160 ( 4 : 2)

      // 1.设计稿尺寸
      let targetWidth = 1920;
      let targetHeight = 1080;

      let targetRatio = 16 / 9; // 宽高比率 （宽 / 高）

      // 2.拿到当前设备（浏览器）的宽度
      let currentWidth = document.documentElement.clientWidth || document.body.clientWidth;
      let currentHeight = document.documentElement.clientHeight || document.body.clientHeight;

      // 3.计算缩放比率(屏幕过宽，根据高度计算缩放比例)
      let scaleRatioX = currentWidth / targetWidth; // 参照宽度进行缩放（默认情况下）

      // 当前宽高比例
      let scaleRatioY = currentHeight / targetHeight;

      // 需求变更 - 保持宽高比
      scaleRatioX = Math.min(scaleRatioX, scaleRatioY);
      scaleRatioY = scaleRatioX;
      let mx = Math.max((currentWidth - targetWidth * scaleRatioX) / 2, 0);
      let my = Math.max((currentHeight - targetHeight * scaleRatioX) / 2, 0);

      this.screenScale = {
        x: scaleRatioX,
        y: scaleRatioY
      };

      // if (currentRatio > targetRatio) {
      //   scaleRatio = currentHeight / targetHeight; // 参照高度进行缩放（屏幕很宽的情况下）
      //   document.body.style = `transform: scale(${scaleRatio}) translateX(-50%); left: 50%;`;
      // } else {
      // 4.开始缩放网页
      console.log(my,mx, '屏幕比例')
      document.body.style = `height: 1080px; width: 1920px; transform: scale(${scaleRatioX}, ${scaleRatioY}); overflow: hidden; transform-origin: left top; margin:${my}px ${mx}px`;
      // }

      // this.initProgressDom(scaleRatioX, scaleRatioY);

      // 2.拿到当前设备（浏览器）的宽度
      const contentDom = document.querySelector('.main-screen');
      if (contentDom) {
        let contentCurrentWidth = contentDom.clientWidth;
        let contentCurrentHeight = contentDom.clientHeight;

        const top = (currentHeight - 32 - contentCurrentHeight * scaleRatioX) / 2;
        const left = (currentWidth - 32 - contentCurrentWidth * scaleRatioX) / 2;

        // 由于系统侧边栏动画导致内容区宽度随之变动，变动期间持续更新宽度
        if (this.contentMargin.left !== left || this.contentMargin.top !== top) {
          setTimeout(() => {
            this.setTransForm();
          }, 50)
        }

        this.contentMargin.top = top;
        this.contentMargin.left = left;
      }

      if (this.$refs.reqViewRef[0]) {
        this.$refs.reqViewRef[0].barChartResize();
      }
      if (this.$refs.statisticsRef[0]) {
        this.$refs.statisticsRef[0].chartResize();
      }
    },
    initProgressDom(scaleRatioX, scaleRatioY) {
      const progressDoms = document.querySelectorAll('.el-progress-circle');
      for (let index = 0; index < progressDoms.length; index++) {
        const element = progressDoms[index];
        element.style.transform = `scale(${1 / scaleRatioX}, ${1 / scaleRatioY})`;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-carousel__indicators--vertical {
  // top: auto;
  // bottom: 10%;
  right: 4px;
}
/deep/ .el-carousel__indicators {
  background-color: #eef5fe;
  border-radius: 10px;
  padding: 16px 0;
}
/deep/ .el-carousel__indicator--vertical {
  padding: 0 6px;
}
/deep/ .el-carousel__button {
  background-color: white;
  width: 4px;
  height: 32px;
  // height: 72px;
  border-radius: 1px;
}
// /deep/ .el-carousel__indicator:first-of-type .el-carousel__button {
//   position: relative;
//   &::after {
//     content: '需求过程';
//     position: absolute;
//     color: #374c78;
//     left: -4px;
//     top: 0;
//   }
// }
// /deep/ .el-carousel__indicator:last-of-type .el-carousel__button {
//   position: relative;
//   &::after {
//     content: '费用结算';
//     position: absolute;
//     color: #374c78;
//     left: -4px;
//     bottom: 0;
//   }
// }
/deep/ .is-active .el-carousel__button {
  background-color: #818eab;
  // background-color: #eef5fe;
}
.btn-div-up {
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  transition: .3s;
  border-radius: 50%;
  color: #818eab;
  position: absolute;
  top: calc(50% - 60px);
  right: 2px;
  z-index: 10;
  transform: translateY(-50%);
  text-align: center;
  font-size: 20px;
}
.btn-div-down {
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  transition: .3s;
  border-radius: 50%;
  color: #818eab;
  position: absolute;
  right: 2px;
  top: calc(50% + 60px);
  z-index: 10;
  transform: translateY(-50%);
  text-align: center;
  font-size: 20px;
}
</style>
