<!--自定义穿梭框-->
<template>
  <div class="ztransferContainer">
    <div class='leftside'>
      <z-Table ref="lefttable" v-bind="leftTbObj" />
    </div>
    <div class='centerside'>
      <Button @click="transfer('2left')" :disabled="disabledLeft" icon="arrow-left-a" class="tolefts">{{buttonTitle[0]}}</Button>
      <Button @click="transfer('2right')" :disabled="disabledRight" icon="arrow-right-a" class="torights">{{buttonTitle[1]}}</Button>
    </div>
    <div class='rightside'>
      <z-Table ref="righttable" v-bind="rightTbObj" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userServerRender: {
      // 是否启用服务端排序和渲染，启用后本地的oprateList方法不在执行
      type: Boolean,
      default: false
    },
    serverRenderFn: {
      // 服务端渲染方法
      type: Function,
      default: () => { }
    },
    leftList: {
      type: Array,
      default: () => []
    },
    leftback: {
      type: Array,
      default: () => []
    },
    rightback: {
      type: Array,
      default: () => []
    },
    rightList: {
      type: Array,
      default: () => []
    },
    tHead: {
      type: Array,
      default: () => []
    },
    height: {
      type: [String, Number],
      default: ``
    },
    valiFn: {
      // 传递的时候验证方法，此方法为一个promise方法，用于async 方法中，如果没有，默认返回resolve
      type: Function,
      default: () => {
        return Promise.resolve(true);
      }
    },
    buttonTitle: {
      type: Array,
      default: () => ['', '']
    },
    callback: {
      type: Function,
      default: () => { }
    }
  },
  data () {
    return {
      leftSelected: [],
      rightSelected: [],
      rList: [...this.rightList],
      lList: [...this.leftList],
      rback: [...this.rightback],
      lback: [...this.leftback],
      searchObj: {
        realTime: true,
        clearable: true,
        placeholder: '搜索内容'
      }
    };
  },
  watch: {
    rightList (a) {
      this.rList = this.matchDotCom(a, 'rightSelected');
    },
    leftList (a) {
      this.lList = this.matchDotCom(a, 'leftSelected');
    },
    rightback (a) {
      this.rback = this.matchDotCom(a, 'rightSelected');
    },
    leftback (a) {
      this.lback = this.matchDotCom(a, 'leftSelected');
    }
  },
  computed: {
    rightTbObj () {
      return {
        showSearch: true,
        showSelection: this.canShowRightSelections,
        tHead: this.tHead,
        proptbData: this.rList,
        backUpPropsdata: this.rightback,
        lazyload: true,
        height: this.height,
        searchObj: this.searchObj,
        selectFn: this.selectFn(`rightSelected`)
      };
    },
    canShowRightSelections () {
      // return this.rList.filter(item => item._sele)
      return true;
    },
    leftTbObj () {
      return {
        showSearch: true,
        showSelection: true,
        tHead: this.tHead,
        proptbData: this.lList,
        searchObj: this.searchObj,
        backUpPropsdata: this.leftback,
        lazyload: true,
        height: this.height,
        selectFn: this.selectFn(`leftSelected`)
      };
    },
    disabledRight () {
      return this.lList.length === 0 || this.leftSelected.length === 0;
    },
    disabledLeft () {
      return this.rList.length === 0 || this.rightSelected.length === 0;
    }
  },
  methods: {
    clearLeft () {
      this.$refs.lefttable.clearSearch();
      this.leftSelected = [];
    },
    clearRight () {
      this.$refs.righttable.clearSearch();
      this.rightSelected = []
    },
    clearAllSearch () {
      this.$refs.lefttable.clearSearch();
      this.$refs.righttable.clearSearch();
      this.rightSelected = []
      this.leftSelected = [];
    },
    // 匹配,list: 配对list，selected 选中数组的string
    matchDotCom (list, selected) {
      return list.map(item => {
        let { id, _checked } = item;
        let __checked = this[selected].filter(o => o.id === id)[0];
        __checked = __checked ? true : _checked;
        return {
          ...item,
          _checked: __checked
        };
      });
    },
    selectFn: function (type) {
      const that = this;
      return function (selected) {
        that.$data[type] = selected;
      };
    },
    // // 给传递进来的list增加key属性
    // addTransferKey(list){
    //   return list.map(item => {
    //   })
    // },
    /*
      selected: transfer的数组{Array}
      from: 被迁出的数组{String}
      to: 被迁入的数组{String}
    */
    oprateList (selected, from, to) {
      let resetOfFrom = this[from].filter(item => {
        return selected.filter(o => o.transferkey === item.transferkey).length === 0;
      }); // 被迁出后剩余的数组
      this[from] = [...resetOfFrom];
      this[to] = [...this[to], ...selected];
    },
    transfer (type) {
      if (type === `2left`) {
        // 右到左
        this.valiFn(this.rightSelected, '2left').then(val => {
          if (this.userServerRender) {
            this.serverRenderFn();
          } else {
            this.oprateList(this.rightSelected, 'rList', 'lList');
          }
          this.rightSelected = [];
          this.callback('2left', this.rightSelected, this.lList);
        });
      } else {
        // 左到右
        this.valiFn(this.leftSelected, '2right').then(val => {
          if (this.userServerRender) {
            this.serverRenderFn();
          } else {
            this.oprateList(this.leftSelected, 'lList', 'rList');
          }
          this.leftSelected = [];
          this.callback('2left', this.leftSelected, this.rightList);
        });
      }
    }
  },
  beforeUpdate () {
  },
  beforeDestroy () { },
  mounted () { }
};
</script>

<style scoped lang="less">
.ztransferContainer {
  display: flex;
  flex-flow: row nowrap;
  .leftside,
  .rightside {
    width: 430px;
    // height: 300px;
    overflow: auto;
  }
  .centerside {
    width: 90px;
    display: flex;
    flex-flow: column nowrap;
    align-content: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 10px;
  }
}
</style>
<style lang='less'>
.centerside {
  .ivu-btn:nth-of-type(1) {
    margin-bottom: 10px;
  }
}
</style>

