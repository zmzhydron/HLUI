<template>
  <div class="cusContainer" :class="classObj">
    <div class="content">
      <span v-if="showTitle" class="title" :style="titleStyle">{{title}}</span>
      <Select :placement="placement" :filterable=filterable :placeholder="placeholder" :disabled="disabled" :value="localValue" @on-change="change">
        <Option v-for="item in thelist" :value="item[refValueKey]" :key="item[refValueKey]">{{ item[refNameKey] }}</Option>
      </Select>
    </div>
    <span class="errortext" v-if="showError">{{errormsg}}</span>
    <div class="showErrorTip"></div>
  </div>
</template>

<script>
export default {
  mixins: [ztools.validateMixins],
  props: {
    canempty: {
      // 是否允许出现 选择“无”
      type: Boolean,
      default: false
    },
    filterable: {
      // 是否允许搜索
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    emptyText: {
      // 默认空的文本
      type: String,
      default: '无'
    },
    emptyValue: {
      // 默认空的值
      type: String,
      default: ''
    },
    passClass: {
      // 自定义标签
      type: String,
      default: ''
    },
    titleWidth: {
      // 标题的宽度
      type: Number,
      default: 0
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    list: {
      type: Array,
      default: () => []
    },
    refValueKey: {
      type: String,
      default: 'id'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    refNameKey: {
      type: String,
      default: 'name'
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number, Object],
      default: ''
    }
  },
  data() {
    return {
      // val: this.value
    };
  },
  watch: {},
  beforeUpdate() { },
  computed: {
    titleStyle() {
      if (this.titleWidth) {
        return {
          width: this.titleWidth + 'px'
        };
      }
      return {};
    },
    thelist() {
      return this.canempty
        ? [
          {
            [this.refValueKey]: `emptyValue`,
            [this.refNameKey]: this.emptyText
          },
          ...this.list
        ]
        : this.list;
    },
    valueType() {
      return ztools.typeOF(this.value) === '[object Object]' ? 'object' : 'normal';
    },
    localValue() {
      return this.valueType === 'object' ? this.value[this.refValueKey] : this.canempty ? (this.value === '' ? 'emptyValue' : this.value) : this.value;
    }
  },
  methods: {
    change(val) {
      let selected = this.thelist.filter(item => item[this.refValueKey] === val)[0];
      let value = '';
      if (selected) {
        value = selected[this.refValueKey];
        value = value === `emptyValue` ? '' : value;
        this.$emit('input', value);
      }
      this.validate(value);
    }
  },
  mounted() { }
};
</script>

<style scoped lang="less">
</style>
