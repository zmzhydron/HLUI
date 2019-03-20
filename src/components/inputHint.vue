<template>
  <div class="inputhintCtn">
    <Input @on-blur="blurfn" :maxlength="maxlength" :style="inputStyle" ref="hintInput" :value="value" :disabled="disabled" :placeholder="placeholder" @on-change="change" />
    <div class="hintSourceCtn active" :style="hintStyle" :class="{binggo: binggo}">
      <div class="hints" :class="{active: item.active, selected: item._selected}" v-for="(item, index) in binggoList" :key="index" @click.stop=clicker(item)>
        <span class="hintstext">{{item[refNameKey]}}</span>
        <Icon v-if="item._selected" class="hintIcon" type="checkmark-round"></Icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    maxlength: {
      type: Number,
      default: 255
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 110
    },
    popWidth: {
      type: Number,
      default: 250
    },
    height: {
      type: Number,
      default: 300
    },
    placeholder: {
      type: [Number, String],
      default: '请输入'
    },
    value: {
      type: [Number, String],
      default: ''
    },
    dataSource: {
      type: Array,
      default: () => []
    },
    refValueKey: {
      type: String,
      default: `value`
    },
    refNameKey: {
      type: String,
      default: `name`
    },
    blurCb: {
      type: Function,
      default: () => { }
    },

    clickCb: {
      type: Function,
      default: () => { }
    }
  },
  data() {
    return {
      binggoList: [],
      index: -1,
      addly: true // 哨兵变量，如果为true的话可以绑定键盘事件，false则不能。
    };
  },
  computed: {
    binggo() {
      return this.binggoList.length > 0;
    },
    inputStyle() {
      return {
        width: this.width + 'px'
      };
    },
    hintStyle() {
      return {
        width: this.popWidth + 'px',
        maxHeight: this.height + 'px'
      };
    }
  },
  watch: {
    binggoList(a, b) {
      if (a.length) {
        if (this.addly) {
          document.addEventListener('keyup', this.keyMove, false);
          this.addly = false;
        }
      } else {
        document.removeEventListener('keyup', this.keyMove, false);
        this.addly = true;
      }
    }
  },
  methods: {
    blurfn(e) {
      this.blurCb(e.target.value.trim());
    },
    change(e) {
      let val = e.target.value.trim();
      // 只要内容改变，则重置index
      this.index = -1;
      if (val) {
        this.binggoList = this.dataSource.filter(item => {
          return item[this.refNameKey].includes(val);
        });
      } else {
        this.binggoList = [];
      }
      this.$emit(`input`, val);
    },
    clicker(item) {
      let val = item[this.refNameKey];
      // this.$refs.hintInput.value = val;
      this.binggoList = [];
      this.$emit(`input`, val);
      this.clickCb(val);
    },
    moveCore(index = 0) {
      this.binggoList = this.binggoList.map((item, ind) => {
        if (ind === index) {
          let val = item[this.refNameKey];
          this.$emit(`input`, val);
        }
        return {
          ...item,
          active: ind === index
        };
      });
    },
    keyMove(e) {
      let code = e.keyCode;
      let maxLen = this.binggoList.length;
      if (code === 40) {
        this.index++;
        if (this.index >= maxLen) {
          this.index = 0;
        }
        this.moveCore(this.index);
        // down
      } else if (code === 38) {
        // up
        this.index--;
        if (this.index < 0) {
          this.index = maxLen - 1;
        }
        this.moveCore(this.index);
      } else if (code === 13) {
        if (this.binggoList.length && this.index > -1) {
          let val = this.binggoList[this.index][this.refNameKey];
          // this.$refs.hintInput.value = val;
          this.$emit(`input`, val);
          this.clickCb(val);
          this.binggoList = [];
        }
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.keyMove);
    document.removeEventListener('keyup', this.keyMove);
  },
  mounted() {
    document.addEventListener('keyup', this.keyMove);
  }
};
</script>

<style scoped lang="less">
.inputhintCtn {
  position: relative;
  .hintSourceCtn {
    position: absolute;
    display: none;
    display: flex;
    overflow: auto;
    top: 34px;
    flex-flow: column nowrap;
    z-index: 3;
    // border: solid 1px silver;
    box-shadow: 1px 1px 3px silver, -1px -1px 3px silver;
    .hints {
      white-space: nowrap;
      font-size: 14px;
      line-height: 25px;
      color: black;
      cursor: pointer;
      background: white;
      font-weight: normal;
      text-shadow: none;
      display: flex;
      flex-flow: row nowrap;
      .hintstext {
        flex: 1 0 auto;
        // text-indent: 10px;
      }
      .hintIcon {
        margin-right: 10px;
        position: absolute;
        right: 0px;
        margin-top: 5px;
      }
    }
    .hints:hover,
    .hints.active {
      background: silver;
    }
    .hints.selected {
      .hintstext {
      }
      .hintIcon {
        color: #080;
      }
    }
  }
  .hintSourceCtn.binggo {
    display: block;
  }
}
</style>
