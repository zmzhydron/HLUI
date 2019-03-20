<template>
  <div class="notice" :class="className">
    
  </div>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: 'blank Spaces'
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  beforeDestroy() {},
  mounted() {}
};
</script>

<style scoped lang="less">

</style>
