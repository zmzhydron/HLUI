<template>
  <Modal :mask-closable=false :width="width" :styles="styles" class="oshit" :class="customeClass" v-model="isShow" :title="title" v-bind="popConfig" class-name="vertical-center-modal">
    <slot v-if="vmodel"></slot>
    <div slot="footer">
      <slot name="footer">
        <Button @click='okfn' type='primary'>确认</Button>
        <Button @click='closefn'>取消</Button>
      </slot>
    </div>
  </Modal>
</template>

<script>
let box, dragEle;
export default {
  props: {
    styles: {
      type: Object,
      default: () => {}
    },
    setShow: {
      // 是否显示组件，和data.isShow联合控制
      type: Boolean,
      default: false
    },
    reRender: {
      // 是每次在isShow改变的时候强制刷新slot里的内容；
      type: Boolean,
      default: false
    },
    control: {
      // 是否由外部方法控制显示
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: 520
    },
    isShowCb: {
      // 当弹窗显示的时候，执行的回调函数
      type: Function,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否可以通过表头进行拖动
    draggable: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    ok: {
      type: Function,
      default: () => {}
    },
    close: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      isShow: this.setShow,
      dragFlag: false,
      popConfig: {
        closable: false,
        scrollable: false
      },
      fixPos: {
        x: 0,
        y: 0
      },
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
      if (this.isShow) {
        this.isShowCb();
      }
    }
  },
  computed: {
    customeClass: function() {
      return {
        draggable: this.$props.draggable
      };
    },
    // styles() {
    //   return {
    //     left: '-400px'
    //   };
    // },
    vmodel() {
      return this.reRender ? this.isShow : true;
    }
  },
  methods: {
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
      this.$data.border.bottom = maxHeight - box.offsetHeight;
      this.$data.border.right = maxWidth - box.offsetWidth;
      return this.$data.border;
    },
    mouseDown(event) {
      this.getBorder();
      this.$data.fixPos = {
        x: event.clientX - box.offsetLeft,
        y: event.clientY - box.offsetTop
      };
      this.dragFlag = true;
    },
    mousemove(event) {
      if (this.dragFlag && this.draggable) {
        let x = event.clientX - this.fixPos.x;
        if (x < 0) {
          x = 0;
        } else if (x > this.border.right) {
          x = this.border.right;
        }
        let y = event.clientY - this.fixPos.y;
        if (y < 0) {
          y = 0;
        } else if (y > this.border.bottom) {
          y = this.border.bottom;
        }
        box.style.left = x + 'px';
        box.style.top = y + 'px';
      }
    },
    mouseup(event) {
      this.dragFlag = false;
    },
    resize(event) {
      this.getBorder();
    }
  },
  beforeDestroy: function() {
    if (this.draggable) {
      dragEle.removeEventListener('mousedown', this.mouseDown);
      document.removeEventListener('mousemove', this.mousemove);
      document.removeEventListener('mouseup', this.mouseup);
      window.removeEventListener('resize', this.resize);
    }
  },
  mounted: function() {
    if (this.draggable) {
      box = this.$el.querySelector('.ivu-modal');
      window.boxx = box;
      box.classList.add('draggable');
      dragEle = this.$el.querySelector('.ivu-modal-header');
      dragEle.addEventListener('mousedown', this.mouseDown, false);
      document.addEventListener('mousemove', this.mousemove, false);
      document.addEventListener('mouseup', this.mouseup, false);
      window.addEventListener('resize', this.resize, false);
      // // 复制 弹窗 并移动到body级。
      // setTimeout(() => {}, 1000);
      // box = box.cloneNode(true);
      // that.$el.parentNode.removeChild(that.$el);
      // document.body.appendChild(box);
    }
  }
};
</script>

<style lang="less">
.oshit.draggable {
  .ivu-modal {
    position: absolute;
  }
  .ivu-modal-header {
    cursor: pointer !important;
    color: red;
    background-color: #3399ff;
  }
}
.ivu-modal.draggable {
  position: absolute;
  z-index: 999 !important;
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 0;
  }
}
.rest-window .ivu-modal-footer {
  border-top: 0;
}
</style>
