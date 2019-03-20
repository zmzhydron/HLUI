<template>
  <div class="AdvancedSelect">
    <div class="selectedCtn" @click="hover" :class="{showTitle: showTitle, inline: inline}">
      <span class="title" :style="titleStyle" v-if="showTitle">{{title}}</span>
      <BoxItem v-bind="SelectBoxesObj" />
      <div class="controller" @click="popfn">{{btntext}}</div>
    </div>
    <PopUp ref='pop' v-bind="bindobj1">
      <SelectView v-bind="selectObj" ref="sv1" />
    </PopUp>
  </div>
</template>
<script>
export default {
  props: {
    showType: {
      type: String,
      default: ''
    },
    maxInput: {
      // 最大的选择数，0为不限制。
      type: Number,
      default: 999999
    },
    titleWidth: {
      // 标题的宽度
      type: Number,
      default: 0
    },
    // 是否显示侧边栏
    sideBar: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    inline: {
      // 是否一行显示已经选中的内容
      type: Boolean,
      default: false
    },
    btntext: {
      type: String,
      default: '添加'
    },
    addUnanemed: {
      // 是否允许添加匿名的内容
      type: Boolean,
      default: false
    },
    maxInputlength: {
      type: Number,
      default: 30
    },
    // 已经选择的
    selected: {
      type: Array,
      default: () => []
    },
    // 数据源
    content: {
      type: Array,
      default: () => []
    },
    refNameKey: {
      type: String,
      default: 'name'
    },
    refKeyValue: {
      type: String,
      default: 'id'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否扁平化输入内容
    flattenContent: {
      type: Boolean,
      default: true
    },
    removeCb: {
      type: Function,
      default: () => { }
    },
    okcb: {
      type: Function,
      default: () => { }
    }
  },
  data () {
    return {
      selectedList: this.selected
    };
  },
  watch: {
    selected (a, b) {
      this.selectedList = a;
    }
  },
  computed: {
    showTitle () {
      return this.title.length !== 0;
    },
    titleStyle () {
      if (this.titleWidth) {
        return {
          width: this.titleWidth + 'px'
        };
      }
      return {};
    },
    falttenContentList () {
      // 扁平化后的数组
      if (this.flattenContent) {
        return this.content.reduce((a, b) => {
          return [...a, ...b.list];
        }, []);
      }
      return [];
    },
    bindobj1 () {
      return {
        disabled: this.disabled,
        titles: this.title,
        styles: {
          left: '-300px'
        },
        width: `740`,
        ok: this.popok,
        close: this.popclose
      };
    },
    SelectBoxesObj () {
      let dataSource = [];
      // 提示状态下才进行数据过滤
      if (this.showType === 'hint') {
        dataSource = this.falttenContentList.map(item => {
          return {
            ...item,
            _selected: this.selectedList.filter(o => o[this.refNameKey] === item[this.refNameKey]).length
          };
        });
      }
      return {
        content: this.selectedList,
        removeFn: this.removeFn,
        disabled: this.disabled,
        refNameKey: this.refNameKey,
        refKeyValue: this.refKeyValue,
        maxInput: this.maxInput,
        dataSource,
        cancelable: true,
        maxlength: this.maxInputlength,
        showType: this.showType,
        inputBlur: this.addInputItem
      };
    },
    selectObj () {
      return {
        selectType: 'BOX',
        height: 290,
        maxInput: this.maxInput,
        refNameKey: this.refNameKey,
        maxlength: this.maxInputlength,
        // removeCb: this.removeFn,
        sideBar: this.sideBar,
        selected: this.selectedList,
        content: this.content,
        selectedCb: this.selectedCb
      };
    }
  },
  methods: {
    hover () {
      if (this.showType === 'input') {
        let r1 = this.$el.querySelector('.inputblure');
        if (r1) {
          r1.querySelector('.ivu-input').focus();
        }
      } else if (this.showType === 'hint') {
        let r1 = this.$el.querySelector('.inputhintCtn');
        if (r1) {
          r1.querySelector('.ivu-input').focus();
        }
      }
    },
    addInputItem (val) {
      if (this.selectedList.filter(item => item[this.refNameKey] === val).length === 0 && val.trim().length !== 0) {
        // 查询是否超过了允许的输入个数限制
        if (this.maxInput) {
          if (this.selectedList.length >= this.maxInput) {
            __msgErr__(`最多允许添加${this.maxInput}个`);
            return false;
          }
        }
        // 再次判断如果输入的值和content里的值一致的话，默认替换为content里的匹配值
        let binggo = this.falttenContentList.filter(item => item[this.refNameKey] === val);
        if (binggo.length) {
          this.selectedList = [...this.selectedList, ...binggo];
        } else {
          if (this.addUnanemed) {
            this.selectedList = [...this.selectedList, { [this.refNameKey]: val, [this.refKeyValue]: this.makeRandom() }];
          }
          // 没有匹配中的不允许添加
        }
        this.okcb(this.selectedList);
      } else {
        // console.error(`值 ${val} 已经存在`);
      }
    },
    selectedCb (item, list) {
      // this.selectedList = list;
    },
    removeFn (item) {
      this.selectedList = this.selectedList.filter(o => {
        return o[this.refKeyValue] !== item[this.refKeyValue];
      });
      this.removeCb(this.selectedList, item);
    },
    popfn () {
      if (!this.disabled) {
        this.$refs.pop.isShow = true;
      }
    },
    popok () {
      this.selectedList = this.$refs.sv1.selectedList;
      this.okcb(this.selectedList);
      this.$refs.pop.isShow = false;
    },
    popclose () {
      this.$refs.sv1.selectedList = this.selectedList;
      this.$refs.pop.isShow = false;
    }
  },
  beforeUpdate () { },
  mounted () { }
};
</script>

<style scoped lang="less">
.AdvancedSelect {
  // border: solid 1px red;
  .selectedCtn {
    display: flex;
    align-items: stretch;
    align-content: stretch;
    // width: 400px;
    .title {
      color: black;
      white-space: nowrap;
      border: solid 1px #d0d0d0;
      border-right: 0px;
      background-color: #f5f7fa;
      line-height: 30px;
      padding: 0 5px;
      font-size: 16px;
    }
    .controller {
      white-space: nowrap;
      padding: 0 5px;
      font-size: 16px;
      background: #f5f7fa;
      position: relative;
      border-radius: 0 4px 4px 0;
      border: solid 1px #d0d0d0;
      border-left: 0;
      cursor: pointer;
      box-sizing: border-box;
      line-height: 28px;
    }
    .viewBoxSELCTE {
      border: solid 1px #d0d0d0;
      flex: 2 1 auto;
      min-height: 30px;
      width: 0;
      display: flex;
      flex-flow: row wrap;
    }
  }
  .selectedCtn.showTitle {
  }
  .selectedCtn.inline {
    .viewBoxSELCTE {
      height: 32px;
      overflow: hidden;
      display: flex;
      flex-flow: row nowrap;
    }
  }
}
</style>
<style lang='less'>
.AdvancedSelect {
  .selectedCtn {
    .viewBoxSELCTE {
      .view-selected-item {
        margin: 4px 2px 2px 2px;
      }
    }
  }
}
</style>

