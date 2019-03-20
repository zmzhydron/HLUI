<!--可以输入文字的下拉框-->
<template>
  <div class="inputSelect">
    <Input ref="xixihaha" :disabled="disabled" :value="inputValue" :maxlength="4" :placeholder="placeholder" />
    <div class='iconCtn' :class="{down: showDrop}" @click="toggleDrop">
      <Icon type="arrow-down-b" />
    </div>
    <div class="inputDrop" v-show="showDrop">
      <div class="inputDropItem" :class="actClass(item)" v-for="(item, index) in list" @click="DropClick(item)" :key="index" :title="item[refNameKey]">{{item[refNameKey]}}</div>
    </div>
    <div class="shadowcover" @click="close" v-show="showDrop"></div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    keydown: {
      type: Function,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    },
    numberonly: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 255
    },
    value: {
      type: [String, Number],
      default: ''
    },
    // 当选中下拉选项时执行的回调函数。
    selectCb: {
      type: Function,
      default: () => {}
    },
    // true为以显示的名称来进行Drop选中设置，false为以ID进行显示。
    checkByName: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '....'
    },
    refValueKey: {
      type: String,
      default: 'id'
    },
    refNameKey: {
      type: String,
      default: 'name'
    }
  },
  data() {
    return {
      showDrop: false,
      inputValue: this.value
    };
  },
  computed: {
    hideholder() {
      return this.list.filter(item => {
        return item[this.checkByName ? this.refNameKey : this.refValueKey] === this.inputValue;
      });
    },
    icontype() {
      return `arrow-${['up', 'down'][Number(this.showDrop)]}-b`;
    }
  },
  watch: {
    inputValue(a, b) {
      this.$emit('input', a);
    },
    value(a) {
      this.inputValue = a;
    }
  },
  methods: {
    actClass(item) {
      return {
        active: item[this.checkByName ? this.refNameKey : this.refValueKey] === this.inputValue
      };
    },
    toggleDrop() {
      if (this.disabled) {
        return false;
      }
      this.showDrop = !this.showDrop;
    },
    close() {
      this.showDrop = false;
    },
    DropClick(item) {
      if (this.disabled) {
        return false;
      }
      this.showDrop = !this.showDrop;
      this.selectCb(item);
      this.inputValue = item[this.refNameKey];
    }
  },
  beforeDestroy() {},
  mounted() {
    this.$refs.xixihaha.$el.querySelector('.ivu-input').onkeydown = e => {
      let code = e.keyCode;
      // 屏蔽鼠标选择的事件，该事件会相应keydown造成影响
      if (code === 67 || code === 17) {
        return false;
      }
      // 允许删除和backspace
      if (code === 8 || code === 47) {
        setTimeout(() => {
          this.inputValue = e.target.value.substring(0, e.target.value.length - 1);
        });
        return false;
      }
      if (this.numberonly) {
        setTimeout(() => {
          let val = e.target.value;
          if (!isNaN(Number(val))) {
            this.inputValue = val;
            this.keydown(true);
          } else {
            // e.target.value = val.substring(0, val.length - 1);
            e.target.value = this.inputValue;
          }
        }, 0);
      } else {
        this.inputValue = e.target.value;
        this.keydown(true);
      }
    };
  }
};
</script>

<style scoped lang="less">
.shadowcover {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
}
.inputSelect {
  position: relative;
  .myinputs {
    width: 100%;
    text-indent: 5px;
    font-size: 12px !important;
  }
}
.iconCtn {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 30px;
  line-height: 30px;
  cursor: pointer;
}
.inputDrop {
  position: absolute;
  width: 100%;
  height: 250px;
  overflow: auto;
  z-index: 3;
  background: white;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  .inputDropItem {
    font-size: 12px;
    padding: 7px 16px;
    text-align: center;
    cursor: pointer;
  }
  .inputDropItem:hover {
    background: #f3f3f3;
  }
  .inputDropItem.active {
    background: rgba(45, 140, 240, 0.9);
    color: white;
  }
}
</style>
<style lang='less'>
.iconCtn {
  .ivu-icon {
    vertical-align: middle;
    position: relative;
    transition: all 0.2s ease-in-out;
  }
}
.iconCtn.down {
  .ivu-icon.ivu-icon-arrow-down-b {
    transform: rotate(180deg);
  }
}
.inputSelect {
  .ivu-input {
    padding-right: 30px;
  }
}
</style>
