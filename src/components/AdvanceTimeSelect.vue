<!-- 单个的日期输入框 或则 时间输入框 -->
<template>
  <div class="cusContainer" :class="classObj">
    <div class="content" :class="className" :style="inputStyle">
      <span class="title" :style="titleStyle" v-if="showTitle">{{title}}</span>
      <ZtimeSelect ref="a" :placement="this.placement" v-if="type === 'time'" v-model="rawvalue" v-bind="timeObjs" />
      <ZtimeSelect ref="b" :placement="this.placement" v-if="type === 'date'" v-model="rawvalue" v-bind="timeObjs" />
      <div class="TimeContent" v-if="type === 'date-time'">
        <ZtimeSelect ref="c" :placement="this.placement" v-model="v1" v-bind="rangeObjsa" />
        <span>-</span>
        <ZtimeSelect ref="d" :placement="this.placement" v-model="v2" v-bind="rangeObjsb" />
      </div>
      <div class="TimeContent" v-if="type === 'range'">
        <ZtimeSelect ref="e" :placement="this.placement" v-model="v1" v-bind="rangeObjsc" />
        <span>-</span>
        <ZtimeSelect ref="f" :placement="this.placement" v-model="v2" v-bind="rangeObjsd" />
      </div>
    </div>
    <span class="errortext" v-if="showError">{{errormsg}}</span>
    <div class="showErrorTip"></div>
  </div>
</template>

<script>
export default {
  mixins: [ztools.validateMixins],
  model: {
    prop: 'value',
    event: 'emitValue'
  },
  props: {
    className: {
      type: String,
      default: `noborder`
    },
    showHMS: {
      //  是否显示时分秒的选择
      type: Boolean,
      default: false
    },
    returnLong: {
      // 是否返回long类型的时间;
      type: Boolean,
      default: false
    },
    fromNow: {
      // 是否只能选择当前日期之后的日期
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    titleWidth: {
      // 标题的宽度
      type: Number,
      default: 0
    },
    blur: {
      type: Function,
      default: () => { }
    },
    contentWidth: {
      // 输入框的长度，设置的话一般表示需要展示错误信息，并且需要把错误信息定位到右边
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 'date'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: [Array, String],
      default: () => []
    },
    widthList: {
      type: Array,
      default: () => ['200px', '200px']
    },
    value: {
      type: [String, Array, Number, Date],
      default: ''
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    onChange: {
      type: Function,
      default: () => { }
    }
  },
  data() {
    return {
      v1: '',
      refList: ['a', `b`, 'c', 'd', 'e', 'f'],
      v2: '',
      rawvalue: this.value
    };
  },
  watch: {
    value(a, b) {
      this.v1 = a[0];
      this.v2 = a[1];
      this.rawvalue = a;
    },
    rawvalue(a, b) {
      this.$emit('emitValue', this.processDate(a));
    },
    v2(a) {
      this.$emit('emitValue', [
        this.processDate(this.v1),
        this.processDate(this.v2)
      ]);
    },
    v1(a) {
      this.$emit('emitValue', [
        this.processDate(this.v1),
        this.processDate(this.v2)
      ]);
    }
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
      return {};
    },
    two() {
      return {
        disabledDate: this.disabledDateTwo
      };
    },
    timeObjs() {
      return {
        placeholder: this.placeHolderList[0],
        disabled: this.disabled,
        style: this.styleOne,
        fromNow: this.fromNow,
        valiObj: this.valiObj
      };
    },
    placeHolderList() {
      let matchList = {
        time: ['请选择时间'],
        date: [`请选择日期`],
        range: ['选择开始日期', '选择结束日期'],
        'date-time': ['请选择日期', '请选择时间']
      };
      return this.placeholder[0] ? this.placeholder : matchList[this.type];
    },
    titleStyle() {
      if (this.titleWidth) {
        return {
          width: this.titleWidth + 'px'
        };
      }
      return {};
    },
    inputStyle() {
      if (this.contentWidth) {
        return {
          width: this.contentWidth + 'px'
        };
      }
      return {};
    },
    rangeObjsa() {
      return {
        type: `date`,
        disabled: this.disabled,
        style: this.styleOne,
        showHMS: this.showHMS,
        fromNow: this.fromNow,
        valiObj: {
          ...this.valiObj,
          msg: this.valiObj.msg[0]
        },
        placeholder: this.placeHolderList[0]
      };
    },
    rangeObjsb() {
      return {
        type: `time`,
        disabled: this.disabled,
        style: this.styleTwo,
        showHMS: this.showHMS,
        fromNow: this.fromNow,
        valiObj: {
          ...this.valiObj,
          msg: this.valiObj.msg[1]
        },
        placeholder: this.placeHolderList[1]
      };
    },
    rangeObjsc() {
      return {
        type: `date`,
        disabled: this.disabled,
        style: this.styleOne,
        showHMS: this.showHMS,
        fromNow: this.fromNow,
        valiObj: {
          ...this.valiObj,
          msg: this.valiObj.msg[0]
        },
        options: {
          disabledDate: this.disabledDateOne
        },
        placeholder: this.placeHolderList[0]
      };
    },
    rangeObjsd() {
      return {
        type: `date`,
        disabled: this.disabled,
        fromNow: this.fromNow,
        showHMS: this.showHMS,
        style: this.styleTwo,
        valiObj: {
          ...this.valiObj,
          msg: this.valiObj.msg[1]
        },
        options: {
          disabledDate: this.disabledDateTwo
        },
        placeholder: this.placeHolderList[1]
      };
    }
  },
  methods: {
    processDate(value) {
      return value;
    },
    disabledDateOne(date) {
      // 默认不能选择V2之后的任何日期
      return this.v2
        ? new Date(date).valueOf() > new Date(this.v2).valueOf()
        : false;
    },
    disabledDateTwo(date) {
      // 默认不能选择V1之前的任何日期
      return this.v1
        ? new Date(date).valueOf() < new Date(this.v1).valueOf()
        : false;
    }
  },
  beforeDestroy() { },
  mounted() { }
};
</script>

<style scoped lang="less">
.TimeContent {
  display: flex;
  flex-flow: row nowrap;
}
</style>

<!--
{
  type: 'range',
  showArrow: false,
  valiObj: {
    active: true, // 是否要求验证,
    required: true,
    errorPos: 'Bottom', // 错误信息定位
    method: 'change', // change表示输入的时候就要验证，blur则表示失去焦点的时候验证
    msg: ['请选择起始日期', '请选择结束日期'] // 如果自己写了descriptor，则message无效
  },
  widthList: [`100px`, `100px`],
  placeholder: [`test`, `me`]
};
-->