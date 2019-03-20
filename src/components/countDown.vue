<template>
  <div class="countDonwCtn" :style="countDonwCtnStyle">
    <div class="altering" v-if="reachLimit">
      <!-- <img src="../assets/img/countaltering.png" /> -->
    </div>
    <div class="progressBar" v-if="!reachLimit">
      <div class="outerbar">
        <div class="innerBar" :class="innerBarClass" :style="innerBarStyle"></div>
      </div>
      <span class="time" :class="innerBarClass">{{counttext}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    displayType: {
      // 显示默认，normal 为 普通增加， time 为时间格式增加
      type: String,
      default: `normal`
    },
    invokOnce: {
      type: Boolean,
      default: true
    },
    reachLimitCb: {
      // 到达上线后的回调函数
      type: Function,
      default: () => { }
    },
    limit: {
      type: Number,
      default: 120
    },
    count: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 90
    }
  },
  data() {
    return {
      isInvoked: false, // 是否唤醒.
      leng: 100
    };
  },
  computed: {
    innerBarStyle() {
      return {
        width: this.count / this.limit * this.width + 'px'
      };
    },
    counttext() {
      return this.displayType === 'time' ? this.getDiffTimes(this.count * 1000) : this.count;
    },
    countDonwCtnStyle() {
      return {
        width: this.width + 'px'
      };
    },
    innerBarClass() {
      // 当达到某个值的时候改变的样式
      return {
        amber: this.count > this.limit / 2
      };
    },
    reachLimit() {
      if (this.invokOnce && !this.isInvoked) {
        this.isInvoked = true;
      }
      return this.count > this.limit;
    }
  },
  methods: {
    getDiffTimes(dateString, dot = ':') {
      dateString = Math.round(dateString / 1000);
      let isMinus = dateString < 0 ? '-' : '';
      dateString = Math.abs(dateString);
      let m = Math.floor(dateString / 60);
      let s = Math.floor(dateString - m * 60);
      m = (m + '').length === 1 ? '0' + m : m;
      s = (s + '').length === 1 ? '0' + s : s;
      return `${isMinus}${m}:${s}`;
    }
  },
  watch: {
    count(a) {
      if (a === this.limit) {
        this.reachLimitCb();
      }
    }
  },
  beforeDestroy() { },
  mounted() { }
};
</script>

<style scoped lang="less">
@keyframes animateone {
  0% {
    transform: scale(0.7);
  }
  100% {
    transform: scale(1.05);
  }
}
.countDonwCtn {
  height: 38px;
  width: 80px;
  padding-top: 7px;
  .altering {
    img {
      height: 30px;
      width: 30px;
      position: relative;
      top: 0px;
      animation: animateone infinite 500ms;
    }
  }
  .progressBar {
    display: flex;
    flex-flow: column;
    .outerbar {
      position: relative;
      border: solid 1px #d2d2d2;
      height: 12px;
      overflow: hidden;
      border-radius: 5px;
    }
    .innerBar {
      position: absolute;
      left: 0px;
      top: 0px;
      height: 12px;
      background: #0fcf1c;
      width: 0px;
    }
    .innerBar.amber {
      background: orange;
    }
    .time {
      color: #0fcf1c;
      font-size: 12px;
    }
    .time.amber {
      color: orange;
    }
  }
}
</style>
