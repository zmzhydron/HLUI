<!-- 左边显示标题，右边显示内容的组件 -->
<template>
  <div class="viewCtns" :style="ctnStyle">
    <div class="view-selected" :style="selectedStyle" v-if="selectable">
      <span class="titles">已选择:</span>
      <BoxItem v-bind='objc' />
    </div>
    <div class="view-select" :style="selectStyle" v-if="this.sideBar">
      <div class="view-title">
        <div class="view-title-item" :class="{active: showContent(index)}" @click="changeView(index)" v-for="(item, index) in dataList" :key="index">
          {{item.name}}
        </div>
      </div>
      <div class="view-content-ctn">
        <div class="view-content-item" :class="{activeContent: showContent(index)}" v-show="showContent(index)" v-for="(item, index) in dataList" :key="index">
          <SelectViewContent clases="content" v-bind="obja" :content="item.list" :item="item" />
        </div>
      </div>
    </div>
    <div class="view-select" :style="selectStyle" v-if="!this.sideBar">
      <div class="view-content-ctn">
        <BoxItem v-bind="objb" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectable: {
      type: Boolean,
      default: true
    },
    // 是否显示侧边栏
    sideBar: {
      type: Boolean,
      default: true
    },
    maxInput: {
      // 最大的选择数，0为不限制。
      type: Number,
      default: 99999
    },
    maxlength: {
      type: Number,
      default: 255
    },
    // 数据源
    content: {
      type: Array,
      default: () => []
    },
    width: {
      type: Number,
      default: 700
    },
    selectType: {
      type: String,
      default: 'text'
    },
    refNameKey: {
      type: String,
      default: 'name'
    },
    refKeyValue: {
      type: String,
      default: 'id'
    },
    selectedCb: {
      type: Function,
      default: () => { }
    },
    removeCb: {
      type: Function,
      default: () => { }
    },
    selected: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 200
    },
    // 选择结果区和选择区的比列
    scale: {
      type: Number,
      default: 20
    }
  },
  beforeUpdate: function () { },
  data () {
    return {
      name: '1234',
      dataList: this.content,
      selectedContentIndex: 0,
      selectedList: this._clone(this.selected)
    };
  },
  watch: {
    selected: function (a, b) {
      this.selectedList = this._clone(a);
    },
    dataList (a, b) {
    },
    content (a, b) {
      this.dataList = a;
    }
  },
  computed: {
    objc () {
      return {
        cancelable: true,
        removeFn: this.removeFn,
        maxlength: this.maxlength,
        refNameKey: this.refNameKey,
        refKeyValue: this.refKeyValue,
        content: this.selectedList
      }
    },
    obja () {
      return {
        showType: this.selectType,
        refNameKey: this.refNameKey,
        maxlength: this.maxlength,
        refKeyValue: this.refKeyValue,
        selectedList: this.selectedList,
        selectedFn: this.selectedFn
      }
    },
    objb () {
      return {
        removeFn: this.removeFn,
        refNameKey: this.refNameKey,
        refKeyValue: this.refKeyValue,
        content: this.dataList,
        maxlength: this.maxlength,
        selectedList: this.selectedList,
        selectedFn: this.selectedFn
      }
    },
    ctnStyle: function () {
      return {
        width: this.$props.width + 'px'
        // height: this.$props.height + 'px'
      };
    },
    selectStyle: function () {
      let val = this.selectable ? this.scale : 0;
      return {
        maxHeight: this.$props.height * ((100 - val) / 100) + 'px'
      };
      // return {};
    },
    selectedStyle: function () {
      // let val = this.selectable ? this.scale : 0;
      // return {
      //   maxHeight: this.$props.height * (val / 100) + 'px'
      // };
      return {};
    }
  },
  methods: {
    selectedFn (item) {
      if (this.selectedList.length >= this.maxInput) {
        __msgErr__(`最多允许添加${this.maxInput}个`);
        return false;
      }
      this.selectedList.push(item);
    },
    removeFn (item) {
      this.selectedList = this.selectedList.filter(o => {
        return o[this.refKeyValue] !== item[this.refKeyValue];
      });
      this.removeCb(item);
    },
    changeView (index) {
      this.selectedContentIndex = index;
    },
    showContent (index) {
      return this.selectedContentIndex === index;
    }
  },
  mounted: function () { }
};
</script>

<style scoped lang="less">
.viewCtns {
  .titles {
    white-space: nowrap;
    padding-left: 5px;
    display: inline-block;
    line-height: 30px;
  }
  .activeContent {
    color: red;
  }
  box-sizing: border-box;
  .view-selected {
    display: flex;
    flex-flow: row nowrap;
    .selected-items {
      display: inline-flex;
    }
  }
  .view-select {
    display: flex;
    flex-flow: row nowrap;
    padding: 2px;
    border: solid 1px silver;
    .view-title {
      width: 150px;
      overflow: auto;
      flex-shrink: 0;
      .view-title-item {
        cursor: pointer;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: left;
        text-indent: 5px;
        color: #4d4e4f;
        line-height: 38px;
      }
      .view-title-item.active {
        background-color: #edf2fa;
        width: 99%;
      }
    }
    .view-content-ctn {
      .view-title-item {
        margin: 5px 10px !important;
      }
    }
  }
}
</style>
