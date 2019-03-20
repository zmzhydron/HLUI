<template>
  <div class="switchcontainer">
    <span class="switctitles">{{title}}</span>
    <div class="switchCtn" @click="clicker" :class="dotclass">
      <div class="dot"></div>
      <div class="textes ontext">{{ontext}}</div>
      <div class="textes offtext">{{offtext}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    clickCb: {
      type: Function,
      default: () => { }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    offtext: {
      type: String,
      default: '关闭'
    },
    ontext: {
      type: String,
      default: '开启'
    },
    value: {
      type: [Boolean, String, Number],
      default: true
    },
    truevalue: {
      // 打开的值
      type: [Boolean, String, Number],
      default: true
    },
    falsevalue: {
      // 关闭的值
      type: [Boolean, String, Number],
      default: false
    }
  },
  data() {
    return {
      local: this.falsevalue === this.value ? 'lefts' : 'rights',
      // 反向选择 根据class来反向对出对应相反的值，
      // 相当于在right的情况下点击，其实是想得到left 的value值
      reversMap: {
        lefts: this.truevalue,
        rights: this.falsevalue
      }
    };
  },
  watch: {
    value(a, b) {
      // this.local = a;
    }
  },
  computed: {
    refMap() {
      return {
        [this.falsevalue]: `lefts`,
        [this.truevalue]: `rights`
      };
    },
    dotclass() {
      return this.refMap[this.value];
    }
  },
  methods: {
    clicker() {
      console.log(this.reversMap[this.dotclass], this.dotclass);
      if (this.disabled) {
        return false;
      }
      this.$emit(`input`, this.reversMap[this.dotclass]);
    }
  },
  beforeDestroy() { },
  mounted() { }
};
</script>

<style scoped lang="less">
.switchcontainer {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.switchCtn {
  height: 22px;
  width: 60px;
  border: solid 1px gray;
  position: relative;
  background: gray;
  transition: all 300ms ease;
  border-radius: 11px;
  .textes {
    font-size: 14px;
    color: white;
    height: 20px;
    top: 0px;
    line-height: 20px;
    transition: all 300ms ease;
    position: absolute;
  }
  .ontext {
    left: 5px;
  }
  .offtext {
    right: 5px;
  }
  .dot {
    position: absolute;
    top: 0px;
    height: 20px;
    width: 20px;
    z-index: 1;
    border-radius: 50%;
    transition: all 300ms ease;
    background: white;
  }
}
.switchCtn.lefts {
  background: gray;
  .dot {
    left: 0px;
  }
  .ontext {
    opacity: 0;
  }
  .offtext {
    opacity: 1;
  }
}
.switchCtn.rights {
  background: #33bf26;
  border-color: #33bf26;
  .dot {
    left: 37px;
  }
  .ontext {
    opacity: 1;
  }
  .offtext {
    opacity: 0;
  }
}
</style>
