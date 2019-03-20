<template>
  <div class="cusContainerswp" :class="classObj">
    <h2>this is swip component</h2>
    <span class="swptitles">{{title}}</span>
    <Zswitch v-bind="swtichObj" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: [Boolean, String, Number],
      default: true
    },
    truevalue: {
      type: [Boolean, String, Number],
      default: true
    },
    falsevalue: {
      type: [Boolean, String, Number],
      default: false
    }
  },
  data() {
    return {};
  },
  computed: {
    swtichObj() {
      return {};
    }
  },
  methods: {},
  beforeDestroy() { },
  mounted() { }
};
</script>

<style scoped lang="less">
.cusContainerswp {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  .swptitles {
    font-size: 16px;
  }
}
</style>
