<!-- 文本+input框 -->
<template>
  <div class="cusContainer deadpool2">
    <div class="content">
      <span class="title">{{title}}:</span>
      <SelectInput :disabled="disabled" :numberonly=true :placeholder="placeholder" :keydown="keydown" :selectCb="selectCb" :list="ageList" v-model="inputVal" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'titles'
    },
    ageList: {
      type: Array,
      default: () => []
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
      type: [String, Number],
      default: ''
    },
    selectCb: {
      type: Function,
      default: () => {}
    },
    keydown: {
      type: Function,
      default: () => {}
    },
    onChange: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      inputVal: this.value
    };
  },
  watch: {
    value(a, b) {
      this.inputVal = a;
    },
    inputVal(a, b) {
      this.$emit('input', a);
    }
  },
  computed: {},
  methods: {},
  beforeDestroy() {},
  mounted() {}
};
</script>

<style scoped lang="less">
</style>

