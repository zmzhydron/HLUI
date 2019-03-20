<!-- 起始时间和结束时间选择，集成必填项 -->
<template>
  <div class="twotimeselect">
    <DatePicker type="date" v-bind="one" :placeholder="placeHolderList[0]" :style="styleOne" @on-change="shitone" />
    <span>-</span>
    <DatePicker type="date" v-bind="two" :placeholder="placeHolderList[1]" :style="styleTwo" @on-change="shittwo" />
  </div>
</template>
<script>
export default {
  model: {
    prop: 'value',
    event: 'emitValue'
  },
  props: {
    placeHolderList: {
      type: Array,
      default: () => ['选择开始日期', '选择结束日期']
    },
    widthList: {
      type: Array,
      default: () => ['200px', '200px']
    },
    value: {
      type: Array,
      default: () => {
        return [0, 0];
      }
    }
  },
  data() {
    return {
      v1: this.value[0],
      v2: this.value[1]
    };
  },
  computed: {
    styleOne() {
      return {
        width: this.widthList[0]
      };
    },
    styleTwo() {
      return {
        width: this.widthList[1]
      };
    },
    one() {
      return {
        options: {
          disabledDate: this.disabledDateOne
        }
      };
    },
    two() {
      return {
        options: {
          disabledDate: this.disabledDateTwo
        }
      };
    }
  },
  watch: {
    value(a, b) {
      this.v1 = a[0];
      this.v2 = a[1];
    }
  },
  methods: {
    disabledDateOne(date) {
      // 默认不能选择V2之后的任何日期
      if (this.v2) {
        let v2 = new Date(this.v2).valueOf();
        let cur = new Date(date).valueOf();
        return cur > v2;
      } else {
        return false;
      }
    },
    disabledDateTwo(date) {
      // 默认不能选择V1之前的任何日期
      if (this.v1) {
        let v1 = new Date(this.v1).valueOf();
        let cur = new Date(date).valueOf();
        return cur < v1 - 86400000;
      } else {
        return false;
      }
    },
    shitone(value) {
      this.v1 = value;
      this.$emit('emitValue', [this.v1, this.v2]);
    },
    shittwo(value) {
      this.v2 = value;
      this.$emit('emitValue', [this.v1, this.v2]);
    }
  },
  beforeDestroy() {},
  mounted() {}
};
</script>

<style scoped lang="less">
</style>
