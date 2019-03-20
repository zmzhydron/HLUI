<template>
  <div class="viewBoxSELCTE" :class="clasesObj">
    <div v-if="showBOXES(item)" v-for="(item, index) in dataList" :key="index" class="view-selected-item" :class="{ activeHover: hoverType === 'active', selected: item.selected, cancelable: cancelable, hint:item.showType === 'hint',input: item.showType === 'input'}">
      <div v-if="!item.showType">
        <span class="texts" @click="selectedFUN(item, item.selected, $event)">{{item[refNameKey]}}</span>
        <span class="icons" @click="cancel(item)" v-if="cancelable">
          <Icon size="8px" type="close-round"></Icon>
        </span>
      </div>
      <Input v-else-if="item.showType === 'input'" :maxlength="maxlength" :disabled="disabled" placeholder="请输入" class="inputblure" v-model="inputVal" @on-blur="blurfn" />
      <inputHint v-else-if="item.showType === 'hint'" v-model="inputVal" v-bind="hintObj" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hoverType: {
      // 鼠标在没选中的选项上的时候的样式，clean为不改变样式，active为改变样式为active
      type: String,
      default: 'active'
    },
    clickCb: {
      type: Function,
      default: () => { }
    },
    maxlength: {
      type: Number,
      default: 255
    },
    maxInput: {
      // 最大的选择数，0为不限制。
      type: Number,
      default: 99999
    },
    showType: {
      type: String,
      default: ''
    },
    refNameKey: {
      type: String,
      default: `name`
    },
    refValueKey: {
      type: String,
      default: `id`
    },
    checkByName: {
      // 是否只以name来做对比
      type: Boolean,
      default: false
    },
    compareKeys: {
      // 是否采用传递进来的comparekey
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    inputBlur: {
      type: Function,
      default: () => { }
    },
    // outerStyle
    clases: {
      type: String,
      default: ''
    },
    cusClass: {
      type: String,
      default: ''
    },
    // 数据源
    content: {
      type: Array,
      default: () => []
    },
    removeFn: {
      type: Function,
      default: () => { }
    },
    dataSource: {
      type: Array,
      default: () => []
    },
    // 被选中的列表
    selectedList: {
      type: Array,
      default: () => []
    },
    selectedFn: {
      type: Function,
      default: () => { }
    },
    // 是否可以单击选中的单元直接取消；
    reCLickAble: {
      type: Boolean,
      default: false
    },
    cancelable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      inputVal: ''
    };
  },
  watch: {
    dataList (a) {
    }
  },
  computed: {
    hintObj () {
      return {
        dataSource: this.dataSource,
        disabled: this.disabled,
        blurCb: this.blurfn,
        clickCb: this.blurfn
      };
    },
    compareKey () {
      // 对比是否选中的属性值，如果checkByName为true的话，只以checkByName来对比
      return this.$props.compareKeys ? this.compareKeys : (this.checkByName ? this.refNameKey : this.refValueKey);
    },
    clasesObj () {
      return {
        container: this.$props.clases,
        [this.$props.cusClass]: this.$props.cusClass
      };
    },
    dataList () {
      // 如果有选中的数组的话，进行过滤
      if (this.selectedList.length) {
        return this.$props.content.map(item => {
          let r = this.selectedList.filter(o => {
            let key = o[this.compareKey] || o;
            return key === item[this.compareKey];
          }).length;
          return {
            ...item,
            selected: r
          };
        });
      }
      if (this.showType) {
        return [...this.$props.content, { showType: this.showType }];
      } else {
        return this.$props.content;
      }
    }
  },
  methods: {
    showBOXES (item) {
      return item.showType === 'hint' || item.showType === 'input' || item.showType === undefined;
    },
    blurfn (e) {
      this.inputBlur(this.inputVal);
      this.inputVal = '';
    },
    cancel (item) {
      if (!this.disabled) {
        this.removeFn(item);
      }
    },
    selectedFUN (item, selected, event) {
      this.clickCb(item, selected);
      if (this.reCLickAble) {
        this.selectedFn(item);
      } else {
        if (!selected && !this.cancelable) {
          this.selectedFn(item);
        }
      }
    }
  },
  beforeUpdate () { },
  mounted () { },
};
</script>

<style scoped lang="less">
</style>
