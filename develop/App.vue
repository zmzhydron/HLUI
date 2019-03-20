<template>
  <div id="app">
    <Button v-for="item of RouterData" type="primary" class="linksss" :key="item.name" @click="jumppage(item)">{{item.name}}</Button>
     <router-view />
    <!--<Spin fix v-show="showSpin">
      <div class="loaderwarpper">
        <svg class="loadercircular" viewBox="25 25 50 50">
          <circle class="fucjyoupath" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
        </svg>
      </div>
    </Spin> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ExsampleIndexPage from "@EXP/ExsampleIndexPage.vue";
import RouterData from "./router"
export default {
  name: 'app',
  components: {
    ExsampleIndexPage
  },
  data() {
    return {
      showSpin: false,
      errmsg: '',
      RouterData
    };
  },
  watch: {
  },
  computed: {
    routerLinkButtons(){
      console.log(this.RouterData);
      return [];
    }
  },
  created() { },
  beforeDestroy() {
    localStorage.setItem("beforeDestroy", new Date().valueOf());
  },
  destroyed() {
    localStorage.setItem("destroyed", new Date().valueOf());
  },
  mounted() {
    console.log(this.RouterData);
    // 暴露router对象给window
    // window._$route_ = this.$router;
    // // 暴露控制方法给全局对象
    // window.__spin__ = this.controlSpin;
    // const duration = 3;
    // this.$Message.config({
    //   top: 124,
    //   duration
    // });
    // window.__msgErr__ = msg => {
    //   this.$Message.destroy();

    //   this.$Message.error(msg);
    // };
    // window.__msgOk__ = msg => {
    //   this.$Message.destroy();
    //   // this.$Message.config({
    //   //   top: 125,
    //   //   duration
    //   // });
    //   // this.$Message.success({
    //   //   render: h => {
    //   //     return h('p', {
    //   //       'class': {
    //   //         fuckyou: true
    //   //       }
    //   //     }, msg)
    //   //   }
    //   // });
    //   this.$Message.success(msg);
    // };
    // document.addEventListener('visibilitychange', this.handleVisibilityChange, false);
    // window.addEventListener('blur', this.handleVisibilityChange1, false);
    // window.addEventListener('focus', this.handleVisibilityChange2, false);
  },
  methods: {
    fff() {
      alert(`fuck kendra lust!!`);
    },
    jumppage(item){
      this.$router.push(item.path);
    },
    ...mapActions({
    }),
    setfocus() {
    },
    controlSpin(boo) {
      this.$data.showSpin = boo;
    },
    handleVisibilityChange2() {
    },
    handleVisibilityChange1() {
    },
    // 增加判断页签是否在前台的方法
    handleVisibilityChange() {
    }
  }
}
</script>

<style lang="less">
.linksss{
  margin: 0 5px;
}
@keyframes fffrotate {
  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}
@keyframes fffcolor {
  0%,
  to {
    stroke: #d62d20;
  }

  40% {
    stroke: #0057e7;
  }

  66% {
    stroke: #008744;
  }

  80%,
  90% {
    stroke: #ffa700;
  }
}
@keyframes fffdash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }

  to {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}
#app {
  // position: relative;
  .ivu-spin-fix {
    z-index: 9999;
    background-color: rgba(255, 255, 255, 0.25);
  }
  .loaderwarpper {
    width: 75px;
    height: 75px;
    position: relative;
    margin: 0 auto;
  }
  .loadercircular {
    -webkit-animation: fffrotate 2s linear infinite;
    animation: fffrotate 2s linear infinite;
    height: 100%;
    -webkit-transform-origin: center center;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .fucjyoupath {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    -webkit-animation: fffdash 1.5s ease-in-out infinite,
      fffcolor 6s ease-in-out infinite;
    animation: fffdash 1.5s ease-in-out infinite,
      fffcolor 6s ease-in-out infinite;
    stroke-linecap: round;
  }
}
</style>
