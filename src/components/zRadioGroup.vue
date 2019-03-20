<template>
  <div class="cusContainer" :class="{showTitle: showTitle, hideBorder: hideBorder}">
    <span class="title" v-if="showTitle">{{title}}:</span>
    <RadioGroup @on-change="onChange" v-model="selectedValue">
      <Radio :disabled="disabled" v-for="(item, index) in list" :key="index" :label="item[refNameKey]" />
    </RadioGroup>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'selected',
    event: 'change'
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    hideBorder: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => ''
    },
    selected: {
      type: [String, Number],
      default: ''
    },
    onchangecb: {
      type: Function,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    },
    refValueKey: {
      type: String,
      default: 'id'
    },
    refNameKey: {
      type: String,
      default: 'name'
    }
  },
  data() {
    return {
      selectedValue: this.pair()
    };
  },
  watch: {
    selected(a, b) {
      this.selectedValue = this.pair();
    }
  },
  computed: {
    showTitle() {
      return this.title.length !== 0;
    }
  },
  methods: {
    pair() {
      let r = this.list.filter(o => {
        return o[this.refValueKey] === this.selected;
      });
      return r.length ? r[0][this.refNameKey] : '';
    },
    rePair(value) {
      let r = this.list.filter(o => {
        return o[this.refNameKey] === value;
      });
      return r.length ? r[0][this.refValueKey] : '';
    },
    onChange(list) {
      this.selectedList = list;
      this.$emit('change', this.rePair(list));
    }
  },
  mounted: function() {}
};
</script>

<style scoped lang="less">
.cusContainer {
  border: 1px solid #dddee1;
  // border: 1px solid red;
  display: flex;
  flex-flow: row nowrap;
  border-radius: 0 5px 5px 0;
  .title {
    color: black;
    white-space: nowrap;
    border-right: solid 1px #d0d0d0;
    background-color: #f5f7fa;
    line-height: 32px;
    padding: 0 5px;
    height: 32px;
    font-size: 12px;
  }
}
.cusContainer.hideBorder{
  border-width: 0;
}
</style>
<style lang='less'>
.cusContainer {
  .ivu-radio-group {
    padding-left: 5px;
  }
}
</style>

