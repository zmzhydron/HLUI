<!-- 位置弹窗，根据触发元素的位置弹窗，可以被拖动 -->
<template>
  <div class="hudctn">
    <div class="contentCtn" :class="{showBorder: showBorder}" :id="this.makeRandom()" ref="shohu" :data-transfer=true :style="style" v-if="bindShowAndRender" v-show="isShow">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" :style="triangleStyle" ref="triangle" class="triangle">
        <path d="M14 0 L5 12 L23 12 Z" style="fill:white" stroke="#cccccc" stroke-width="1" />
        <line x1="4" y1="12" x2="24" y2="12" style="stroke:white;stroke-width:2"></line>
      </svg>
      <div class="headers" v-if="showHeader">
        {{title}}
      </div>
      <div class="content">
        <slot></slot>
      </div>
      <div class="footer" v-if="showFooter">
        <slot name='footer'>
          <Button @click='okfn'>ok</Button>
          <Button @click='closefn'>close</Button>
        </slot>
      </div>
    </div>
    <span ref="shitman" class="shitmanaa">
      <slot name="trigger">
        <Button>默认触发啦啦啦</Button>
      </slot>
    </span>
    <div class="shadowcovershud" v-show="isShow" @click="closeShadow"></div>
  </div>
</template>

<script>
import TransferDom from './transferDom.js';
export default {
  directives: { TransferDom },
  props: {
    title: {
      type: String,
      default: ''
    },
    // 是否显示边框。
    showBorder: {
      type: Boolean,
      default: true
    },
    // 显示隐藏的时候回调函数
    showCb: {
      type: Function,
      default: () => {}
    },
    // 垫片点击关闭的时候的回调函数。
    shadowCloseFnCb: {
      type: Function,
      default: () => {}
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: false
    },
    reRender: {
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
    // 布局位置
    dir: {
      type: String,
      default: 'Bottom'
    },
    offsetY: {
      type: Number,
      default: 5
    },
    offset: {
      type: Number,
      default: 0
    },
    triggerType: {
      type: String,
      default: `Click`
    }
  },
  data() {
    return {
      isShow: false,
      triggeEle: null,
      triangleEle: null,
      triangleStyle: {},
      pos: {
        x: 0,
        y: 0
      }
    };
  },
  computed: {
    bindShowAndRender() {
      return this.reRender ? this.isShow : true;
    },
    style() {
      return {
        width: this.width + 'px',
        height: this.height + 'px',
        left: this.pos.x + 'px',
        top: this.pos.y + 'px'
      };
    }
  },
  watch: {
    isShow(a) {
      let btns = this.$el.querySelector('.shitmanaa').querySelector('.ivu-btn');
      if (a) {
        btns.className = `ivu-btn ivu-btn-primary`;
      } else {
        btns.className = `ivu-btn`;
      }
      this.showCb(a);
    }
  },
  methods: {
    closeShadow() {
      this.isShow = false;
      this.shadowCloseFnCb();
    },
    okfn() {
      this.isShow = false;
    },
    closefn() {
      this.isShow = false;
    },
    trigger() {
      this.calc();
      this.isShow = !this.isShow;
    },
    calc() {
      // 按钮定位
      // let x = $(this.triggeEle).offset().left;
      // let y = $(this.triggeEle).offset().top;
      let x = this.$el.offsetLeft;
      let y = this.$el.offsetTop;
      // 触发按钮的高宽。
      let triggerHeight = this.triggeEle.offsetHeight;
      let triggerWidth = this.triggeEle.offsetWidth;
      // let contentHeight = this.$refs.shohu.offsetHeight;
      // let contentWidth = this.$refs.shohu.offsetWidth;
      // 窗口的高宽
      let contentHeight = this.$props.height;
      let contentWidth = this.$props.width;
      // 如果设置了不显示header的话，需要减去40高度
      // let headerPos = this.showHeader ? 0 : -40;
      let offset = this.$props.offset;
      let triangleStyle = {
        transform: 'rotate(-90deg)'
      };
      // let padding = this.showBorder ? 10 : 0;
      let padding = this.offsetY;
      // 如果显示border的话，那么就要移动1px，等于border的宽度;
      let borderPos = this.showBorder ? -1 : 0;

      switch (this.dir.toLowerCase()) {
        case 'bottom':
          y = y + triggerHeight + padding + 5;
          // y = 30 + triggerHeight + padding + 1;
          // x = x - contentWidth / 2 + triggerWidth / 2 + offset;
          x = x - contentWidth / 2 + triggerWidth / 2 + offset;
          triangleStyle = {
            transform: 'rotate(0deg)',
            left: contentWidth / 2 - 22 - offset + 'px',
            top: -10 + 'px'
          };
          break;
        case 'top':
          y = y - contentHeight - padding;
          x = x - contentWidth / 2 + triggerWidth / 2 + offset;
          triangleStyle = {
            transform: 'rotate(180deg)',
            left: contentWidth / 2 - 22 - offset + 'px',
            top: contentHeight - 20 + borderPos + 'px'
          };
          break;
        case 'left':
          y = y - contentHeight / 2 + triggerHeight / 2 - 5 + offset;
          x = x - contentWidth - padding;
          triangleStyle = {
            transform: 'rotate(90deg)',
            left: contentWidth - 21 + 'px',
            top: contentHeight / 2 - 12 - offset + 'px'
          };
          break;
        case 'right':
          y = y - contentHeight / 2 + triggerHeight / 2 - 5 + offset;
          x = x + triggerWidth + padding;
          triangleStyle = {
            transform: 'rotate(-90deg)',
            left: '-11px',
            top: contentHeight / 2 - 12 - offset + 'px'
          };
          break;
      }
      this.$data.pos.x = x;
      this.$data.pos.y = y;
      this.triangleStyle = {
        // display: `none`,
        ...triangleStyle
      };
    }
  },
  mounted() {
    let triggerRef = this.$refs.shitman;
    let type = this.triggerType.toLowerCase();
    this.triggeEle = triggerRef.children[0];
    this.triangleEle = this.$refs.triangle;
    if (type === 'hover') {
      // trigger.addEventListener('click', this.trigger, false);
    } else if (type === 'click') {
      this.triggeEle.addEventListener('click', this.trigger, false);
    }
  }
};
</script>

<style scoped lang="less">
.shadowcovershud {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  z-index: 2;
  position: fixed;
}

.contentCtn {
  z-index: 9999;
  background-color: white;
  position: absolute;
  display: flex;
  flex-flow: column nowrap;
  .headers {
    line-height: 40px;
    text-indent: 21px;
    background: #3385ff;
    color: white;
    text-align: left;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #cccccc;
    height: 40px;
    box-sizing: border-box;
  }
  .content {
    // min-width: 240px;
    min-height: 50px;
    flex: 2 1 auto;
  }
  .footer {
    line-height: 45px;
    vertical-align: middle;
    text-align: right;
    border-top: 1px solid #e9eaec;
    padding-right: 10px;
  }
  .triangle {
    width: 30px;
    height: 30px;
    position: absolute;
    top: -11px;
    z-index: 2;
    left: 0px;
  }
  .triangle.inner {
    width: 0px;
    height: 0px;
    border-width: 15px;
    border-style: solid;
    border-color: transparent;
    border-bottom-color: white;
    position: absolute;
    top: -14px;
    left: -8px;
    border-top-width: 15px;
    border-left-width: 8px;
    border-right-width: 8px;
    border-bottom-width: 10px;
  }
}
.contentCtn.showBorder {
  border: solid 1px #cccccc;
  .content {
    // padding: 5px;
  }
}
</style>
<style lang='less'>
.shitmanaa {
  .ivu-btn {
    vertical-align: 0px;
  }
}
</style>

