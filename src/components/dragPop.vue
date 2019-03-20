<template>
  <div :style="style" v-transfer-dom :data-transfer=true v-show="isShow" @click="bodyClick" class="dragpopCtn">
    <div class="drg headers" v-if="showHeader" :class="{dragcrosshair: draggable}">
      <h2 class="titles">{{title}}</h2>
      <slot name="header">
        <h2></h2>
      </slot>
    </div>
    <div class="bodys" :style="styleBodys">
      <slot v-if="vmodel"></slot>
    </div>
    <slot name="footer">
      <div class="footer" v-if="showFooter">
        <Button type="primary" v-if="showOk === true" @click='okfn'>确定</Button>
        <Button @click='closefn'>关闭</Button>
      </div>
    </slot>
  </div>
</template>

<script>
import TransferDom from './transferDom.js';
export default {
  directives: { TransferDom },
  props: {
    bodyClick: {
      // 最外层窗口点击事件。
      type: Function,
      default: () => {}
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    overflow: {
      type: String,
      default: 'auto'
    },
    // 把弹出框的定位信息传递出去;
    emitPosition: {
      type: Function,
      default: () => {}
    },
    dir: {
      // 定位的位置，top 为 top、left， bottom 为bottom right
      type: String,
      default: `top`
    },
    showCover: {
      // 是否显示遮罩层
      type: Boolean,
      default: true
    },
    control: {
      // 是否由外部方法控制显示
      type: Boolean,
      default: false
    },
    reRender: {
      // 是每次在isShow改变的时候强制刷新slot里的内容；
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'OOPS'
    },
    setShow: {
      // 是否显示组件，和data.isShow联合控制
      type: Boolean,
      default: false
    },
    ok: {
      type: Function,
      default: () => {}
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    showOk: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    positionAtBotton: {
      // 当拖动的时候 是否定位到bottom right
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: 520
    },
    height: {
      type: [String, Number],
      default: 200
    },
    draggable: {
      // 是否允许拖动
      type: Boolean,
      default: false
    },
    close: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      name: '1234',
      isShow: this.setShow,
      fixPos: {
        x: 0,
        y: 0
      },
      box: null,
      dragEle: null,
      dragFlag: false,
      windowHeight: 0,
      windowWidth: 0,
      dragEleWidth: 0,
      dragEleHeight: 0,
      curPox: 0,
      curPoY: 0,
      border: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }
    };
  },
  watch: {
    setShow(a, b) {
      this.isShow = a;
    }
  },
  computed: {
    style() {
      return {
        width: this.width + 'px',
        height: this.height + 'px'
      };
    },
    styleBodys() {
      let style = {
        overflow: this.overflow
      };
      if (this.scroll) {
        return {
          ...style,
          height: this.scroll + 'px'
        };
      } else {
        return style;
      }
    },
    vmodel() {
      return this.reRender ? this.isShow : true;
    }
  },
  methods: {
    shadowClick() {},
    okfn() {
      this.$props.ok();
      if (!this.control) {
        this.isShow = false;
      }
    },
    closefn() {
      this.$props.close();
      if (!this.control) {
        this.isShow = false;
      }
    },
    getBorder() {
      let maxWidth = document.documentElement.clientWidth;
      let maxHeight = document.documentElement.clientHeight;
      this.windowHeight = maxHeight;
      this.windowWidth = maxWidth;
      this.border.bottom = maxHeight - this.box.offsetHeight;
      this.border.right = maxWidth - this.box.offsetWidth;
      return this.border;
    },
    mouseDown(event) {
      this.getBorder();
      this.fixPos = {
        x: event.clientX - this.box.offsetLeft,
        y: event.clientY - this.box.offsetTop
      };
      this.dragEleWidth = this.box.offsetWidth;
      this.dragEleHeight = this.box.offsetHeight;
      this.dragFlag = true;
    },
    mousemove(event) {
      if (this.dragFlag) {
        let x, y;
        x = event.clientX - this.fixPos.x;
        if (x < 0) {
          x = 0;
        } else if (x > this.border.right) {
          x = this.border.right;
        }
        y = event.clientY - this.fixPos.y;
        if (y < 0) {
          y = 0;
        } else if (y > this.border.bottom) {
          y = this.border.bottom;
        }
        this.curPox = x;
        this.curPoY = y;
        this.box.style.left = x + 'px';
        this.box.style.top = y + 'px';
        // if (this.dir === 'top') {
        //   x = event.clientX - this.fixPos.x;
        //   if (x < 0) {
        //     x = 0;
        //   } else if (x > this.border.right) {
        //     x = this.border.right;
        //   }
        //   y = event.clientY - this.fixPos.y;
        //   if (y < 0) {
        //     y = 0;
        //   } else if (y > this.border.bottom) {
        //     y = this.border.bottom;
        //   }
        //   this.box.style.left = x + 'px';
        //   this.box.style.top = y + 'px';
        // } else {
        //   x = event.clientX - this.fixPos.x + this.dragEleWidth;
        //   if (x < this.dragEleWidth) {
        //     x = this.dragEleWidth;
        //   } else if (x > this.windowWidth) {
        //     x = this.windowWidth;
        //   }
        //   y = event.clientY - this.fixPos.y + this.dragEleHeight;
        //   if (y < this.dragEleHeight) {
        //     y = this.dragEleHeight;
        //   } else if (y > this.windowHeight) {
        //     y = this.windowHeight;
        //   }
        //   this.box.style.right = x + 'px';
        //   this.box.style.bottom = y + 'px';
        // }
        this.curPox = x;
        this.curPoY = y;
        this.emitPosition(x, y);
      }
    },
    mouseup(event) {
      // if (this.dir === 'bottom') {
      //   this.box.removeAttribute('style');
      //   let newStyle = this.style;
      //   newStyle.bottom = this.windowHeight - this.curPoy + this.dragEleHeight + 'px';
      //   newStyle.right = this.windowWidth - this.curPox + this.dragEleWidth + 'px';
      //   this.box.setAttribute(`style`, newStyle);
      // }
      // this.emitPosition(this.curPox, this.curPoy, 'mouseup');
      this.dragFlag = false;
    },
    resize(event) {
      this.getBorder();
    }
  },
  beforeDestroy: function() {
    if (this.dragFlag) {
      this.dragEle.removeEventListener('mousedown', this.mouseDown);
      document.removeEventListener('mousemove', this.mousemove);
      document.removeEventListener('mouseup', this.mouseup);
      window.removeEventListener('resize', this.resize);
    }
  },
  mounted() {
    if (this.draggable) {
      this.box = this.$el;
      this.dragEle = this.$el.querySelector('.drg.headers');
      this.dragEle.addEventListener('mousedown', this.mouseDown, false);
      document.addEventListener('mousemove', this.mousemove, false);
      document.addEventListener('mouseup', this.mouseup, false);
      window.addEventListener('resize', this.resize, false);
    }
  }
};
</script>

<style scoped lang="less">
.parentCtns {
  position: relative;
}
.shadowCover {
  position: fixed;
  opacity: 0.3;
  background: gray;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 3;
}
.dragpopCtn {
  z-index: 3;
  background-color: white;
  position: absolute;
  display: flex;
  flex-flow: column nowrap;
  text-align: left;
  box-shadow: 0 0 10px #666;
  .headers {
    // display: flex;
    // flex-flow: row nowrap;
    padding: 0px 15px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    background-color: #3399ff;
    border-bottom: 1px solid #e9eaec;
    > :last-child {
      // color: red;
      float: right;
    }
    .titles {
      float: left;
    }
  }
  .headers.dragcrosshair {
    cursor: crosshair;
  }
  .footer {
    padding: 5px 10px;
    text-align: right;
    border-top: 1px solid #e9eaec;
    background-color: #f2f2f2;
  }
  .bodys {
    // min-width: 240px;
    min-height: 50px;
    flex: 2 1 auto;
    overflow: auto;
    padding: 5px;
    background-color: #fbfaf8;
  }
}
</style>
