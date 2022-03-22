<template>
  <!--滑块验证码-->
  <div class="award_wrap">
    <!--滑块区域-->
    <div class="dialog_slider" id="dialog_slider" v-show="receiveAwardCode">
      <div class="close" @click="$emit('awardClose',false)"><van-icon name="close" size="28" color="#fff"/></div>
      <div class="slide-img">
        <img class="slide-img-big" src="a" alt=""/>
        <img class="slide-img-small" src="b" alt="">
      </div>
      <div class="slide-box">
        <div class="slide-cover"></div>
        <p class="slide-font" @mousedown="move">请拖动滑块至正确缺口>></p>
        <div class="slide-bar">
          <van-icon name="arrow" size="16" color="#fff"/>
          <van-icon name="arrow" size="16" color="#fff"/>
          <van-icon name="arrow" size="16" color="#fff"/>
        </div>
      </div>
    </div>
    <!--短信验证区域-->
    <div class="dialog_code" id="dialog_code" v-show="!receiveAwardCode">
      <div class="close" @click="$emit('awardClose',false)"><van-icon name="close" size="24" color="#000"/></div>
      <div class="dialog_code_top">
        <p class="fb">短信验证码</p>
        <p>为保障您的奖品能正常使用，请输入验证码</p>
      </div>
      <div class="dialog_code_cont">
        <input type="text" maxlength="6" placeholder="请输入验证码" class="code_int" v-model="smsCode">
        <p class="getcodeA" @click="getSmsCode02">获取验证码</p>
      </div>
      <div class="common_buts" @click="getCode">确认</div>
    </div>
  </div>
</template>

<script>
import commonService from '@/services/commonService'
export default {
  name: "receiveAward",
  props:{
    prizeOID:'',
    prizeId: ''
  },
  data() {
    return {
      receiveAwardCode: true,
      countDFlag : false, // 计数标记
      // 滑块组件 ———  开始
      picWidth : Number,
      bili2 : Number,
      oBox : '',
      oBar : '',
      oCover : '',
      oFont : '',
      oImgBox : '',
      oImgBar : '',
      lastX : Number,
      disX : Number,
      isMobile : '',
      MOUSEDOWN : '',
      MOUSEMOVE : '',
      MOUSEUP : '',
      // 滑块组件 ———— 结束
      times: 60,
      smsCode:'',
      puzzleLeft: null,
    }
  },
  mounted() {
      // 初始化滑块
      this.getSlideData()
      this.oBox = document.querySelector('.slide-box')
      this.oBar = document.querySelector('.slide-bar')
      this.oCover = document.querySelector('.slide-cover')
      this.oFont = document.querySelector('.slide-font')
      this.oImgBox = document.querySelector('.slide-img')
      this.oImgBar = document.querySelector('.slide-img-small')
      this.isMobile = 'ontouchstart' in window
      this.MOUSEDOWN = this.isMobile ? 'touchstart' : 'mousedown'
      this.MOUSEMOVE = this.isMobile ? 'touchmove' : 'mousemove'
      this.MOUSEUP = this.isMobile ? 'touchend' : 'mouseup'
      // 给滑块增加拖拽
      this.oBar.addEventListener(this.MOUSEDOWN, ev => {
        this.oImgBox.classList.add('show')
        this.oFont.classList.add('hide')
        this.lastX = this.isMobile ? ev.touches[0].pageX : ev.pageX
        this.oBar.style.transition = 'none'
        this.oCover.style.transition = 'none'
        this.oBar.addEventListener(this.MOUSEMOVE, this.move, true)
        this.oBar.addEventListener(this.MOUSEUP, this.up, true)
      }, true)
      this.oBar.addEventListener('transitionend', () => {
        this.oFont.classList.remove('hide')
      }, true)
  },
  methods: {
    // 拖拽事件
    move(e) {
      this.disX = (this.isMobile ? e.targetTouches[0].pageX : e.pageX) - this.lastX
      if (this.disX <= 0) {
        this.disX = 0
      } else if (this.disX >= this.oBox.offsetWidth - this.oBar.offsetWidth - 1) {
        this.disX = this.oBox.offsetWidth - this.oBar.offsetWidth - 1
      }
      this.oBar.style.left = this.oCover.style.width = this.oImgBar.style.left = this.disX + 'px'
      this.disX = Math.floor(this.disX * this.bili2) //最终相对真实图片的偏移量
      this.oFont.classList.remove('show')
      this.oFont.classList.add('hide')
    },
    up() {
      // console.log("UP"+this.disX)
      this.puzzleValidate();
    },
    // 获取滑块数据
    getSlideData() {
      commonService.getSlideData({}).then(res => {
        let data = res.data
        if (data.code ==0) {
          let picture = data.result.picture
          let puzzle = data.result.puzzle
          let picType = data.result.picType
          this.puzzleLeft = data.result.puzzleLeft
          if(!/^data:image/.test(picture)) picture = 'data:image/' + picType + ';base64,' + picture
          if(!/^data:image/.test(puzzle)) puzzle = 'data:image/' + picType + ';base64,' + puzzle
          $('.slide-img-big').attr('src',picture)
          $('.slide-img-small').attr('src',puzzle)

          let puzzleWidth = data.result.puzzleWidth
          this.picWidth = data.result.picWidth
          let bili = puzzleWidth / this.picWidth // 大小滑块的宽度比例
          let mainWidth = $('.slide-font').width()
          let puzzleWidthUI = mainWidth * bili + 'px'  //$('.slide-img-small').width()
          $('.slide-bar').css('width',puzzleWidthUI) //按钮的宽度和小滑块的宽度一致
          this.bili2 = this.picWidth / mainWidth // ui 和 真实滑块的宽度比例
        } else {
            this.$toast(`系统繁忙，请稍后再试${data.code ? "code:" + data.code : ""}`)
        }
      })
    },
    // 滑块验证
    puzzleValidate(){
      commonService.puzzleValidate({
        puzzleOffset : this.disX,
        account: this.$store.state.loginServerNumber,
      }).then(res => {
        let code = res.data.code
        this.oFont.classList.remove('hide')
        this.oFont.classList.add('show')
        this.oBar.style.transition = '.3s'
        this.oCover.style.transition = '.3s'
        this.oBar.style.left = this.disX = this.oCover.style.width = this.oImgBar.style.left = 0
        if(code === 0){
          this.receiveAwardCode = false
          this.oFont.innerHTML = '请拖动滑块至正确缺口>>'
          this.disX = this.puzzleLeft
          this.getSmsCode02()
        } else {
          this.oFont.innerHTML = '验证失败，请重新拖动滑块至正确缺口'
          this.$toast(res.data.msg)
          this.getSlideData()
        }
      })
    },
    // 获取手机验证码
    getSmsCode02() {
      if (this.countDFlag) {
        this.$Toast("操作太频繁，请稍后再试~'")
        return
      }
      if (this.postoid == '' || this.postoid == null || this.postoid == undefined) {
        this.$toast("抱歉，查询不到该奖品编码~'")
        return
      }
      commonService.getSmsCode02({
        oid: this.postoid,
        puzzleOffset: this.disX,
      }).then(res=>{
        let code = res.data.code
        if (code == 0) {
          this.countDFlag = true
          this.countDownA()
        } else if (res.code == -1) {
          this.$toast("滑块验证失败，请稍后再试~'")
        } else {
          this.$toast("信息发送失败，请稍后再试~'")
        }
      })
    },
    // 倒计时
    countDownA() {
      if (!this.countDFlag) {
        $('.getcodeA').html('重新获取')
        return
      }
      let times = 60
      let itimes = setInterval(() => {
        times--
        $('.getcodeA').html(times + 's')
        if (times <= 0) {
          $('.getcodeA').html('获取验证码')
          clearTimeout(itimes)
          times = 60
          this.countDFlag = false
        }
      }, 1000)
    },
    // 返回领奖的状态码
    getCode() {
      if (!this.countDFlag) {
        this.$toast('请先获取验证码')
        return
      }
      if (this.smsCode == '') {
        this.$toast('请先输入验证码')
        return
      }
      commonService.getPrizeCheckPrize({
        smsCode: this.smsCode,
        oid: this.prizeOID,
        prizeId: this.prizeId,
      }).then(res=>{
        let code = res.data.code
        this.$emit('getCode', code)
      })
    },
  },
}
</script>

<style scoped lang="scss">
.show{
  display: block!important;
}
.hide{
  display: none!important;
}
.award_wrap{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .6);
  // 滑块验证码部分
  .dialog_slider{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 6rem;
    transform: translate(-50%,-50%);
    background: #fff;
    .close{
      position: absolute;
      left: 50%;
      bottom: -.8rem;
      transform: translate(-50%,0);
    }
    .slide-img{
      position: relative;
      .slide-img-big{
        width: 100%;
      }
      .slide-img-small{
        position: absolute;
        top: 0;
        left: 0;
        width: auto;
        height: 100%;
      }
    }
    .slide-box{
      position: relative;
      height: .5rem;
      line-height: .5rem;
      .slide-cover{
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
        background: #a9ffe5;
        transition: 0.3s;
      }
      .slide-font{
        position: relative;
        color: #999;
        font-size: .2rem;
        text-align: center;
      }
      .slide-font.success{
        display: block;
        color: #52ccba;
      }
      .slide-bar{
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 1rem !important;
        height: 100%;
        cursor: move;
        transition: 0.3s;
        z-index: 99;
        background: burlywood;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  // 验证码
  .dialog_code {
    position: fixed;
    width: 6rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: .5rem .3rem;
    background: #def9ff;
    border-radius: .25rem;
    color: #313131;
    .close{
      position: absolute;
      top: .2rem;
      right: .2rem;
    }
    .dialog_code_top{
      font-size: 0.25rem;
      line-height: .45rem;
      font-weight: 600;
      .fb{
        font-size: .3rem;
        font-weight: bolder;
      }
    }
    .dialog_code_cont{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: .3rem;
      font-size: .25rem;
      line-height: .6rem;
      .code_int{
        width: 65%;
        border: .2px solid #f2f2f2;
        padding: 0 .15rem;
      }
      .getcodeA{
        width: 30%;
        text-align: center;
        background: #52ccba;
        color: #fff;
      }
    }
    .common_buts{
      font-size: 0.3rem;
      line-height: 0.8rem;
      font-weight: bolder;
      text-align: center;
      margin-top: .3rem;
      background: #fff;
    }
  }
}
</style>