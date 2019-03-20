<!-- 日期基本控件 -->
<template>
  <div class="cusContainer" :class="classObj">
    <div class="content timeselect" :style="inputStyle">
      <TimePicker v-if="type === 'time'" @on-change="change" v-bind="timeObjs" />
      <DatePicker v-else-if="type === 'date'" @on-change="change" v-bind="dateObjs" />
    </div>
    <span class="errortext" v-if="showError">{{errormsg}}</span>
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
    showHMS: {
      //  是否显示时分秒的选择
      type: Boolean,
      default: false
    },
    fromNow: {
      // 是否只能选择当前日期之后的日期
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'date'
    },
    titleWidth: {
      // 标题的宽度
      type: Number,
      default: 0
    },
    options: {
      type: Object,
      default: () => { }
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
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    value: {
      type: [String, Number, Date],
      default: ''
    },
    onChange: {
      type: Function,
      default: () => { }
    }
  },
  data() {
    return {};
  },
  computed: {
    optionsFn() {
      if (this.options && Object.keys(this.options).length !== 0) {
        return this.options;
      } else {
        if (this.fromNow) {
          return {
            disabledDate: date => {
              return new Date(date).valueOf() < new Date().valueOf() - 86400000;
            }
          }
        }
        return {};
      }
    },
    timeObjs() {
      return {
        placeholder: this.placeholder,
        disabled: this.disabled,
        value: this.value,
        style: this.inputStyle,
        
        placement: this.placement,
        options: this.optionsFn
      };
    },
    dateObjs() {
      return {
        placeholder: this.placeholder,
        disabled: this.disabled,
        value: this.value,
        style: this.inputStyle,
        placement: this.placement,
        type: this.showHMS ? 'datetime' : 'date',
        options: this.optionsFn
      };
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
    }
  },
  methods: {
    change(value) {
      this.$emit('emitValue', value);
      this.validate(value);
    }
  },
  beforeDestroy() { },
  mounted: function () { }
};
</script>

<style scoped lang="less">
</style>

