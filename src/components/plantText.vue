<template>
  <div class="planttext">
    <div class="content">{{content}}</div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: [String, Array, Object, Number],
      default: '噢噢噢噢哦哦哦哦哦哦'
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted: function() {}
};
</script>

<style scoped lang="less">
.planttext {
  text-align: center;
  .content {
    text-align: left;
    display: inline-block;
  }
}
</style>
