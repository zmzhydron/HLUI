<template>
  <div class="Ztable" :class="className">
    <div class='tableHeader' :class="{hasSearch:showSearch}">
      <slot name="tableheader">
      </slot>
      <z-Search ref="tablesearchRef" v-if="showSearch" :inline="searchInline" :searchValue="searchValue" :onchange="onSearchFn" v-bind="searchObj" />
    </div>
    <Table ref="tables" v-bind='localtableObj' @on-expand="onExpand" :row-class-name="rowClassName" @on-current-change="onCurrentChange" @on-row-dblclick="onRowDblclick" :class="{tbHasSearch:showSearch}" :highlight-row="highlightRow" :disabled-hover=true @on-row-click="rowClick" @on-selection-change="selectionFn" stripe>
    </Table>
    <div class="pager-wrap" v-if="showPager">
      <Page v-bind="pageObj" show-sizer @on-change='onpagechange' @on-page-size-change="onpagesizechange"></Page>
    </div>
    <slot ref="contextMenu" name='contextMenu' v-if="showContext" :props="contextMenuData"></slot>
  </div>
</template>
<script>
// TODO 提升性能 启用:disabled-hover=true，考虑后期是否去掉？?？
export default {
  props: {
    onSortChange: {
      type: [Function, Boolean],
      default: false
    },
    onExpand: {
      type: Function,
      default: () => { }
    },
    rowClassName: {
      type: Function,
      default: () => { }
    },
    pageReqOffsetKey: {
      // 分页时候请求服务器健名，offset
      type: String,
      default: `offset`
    },
    pageReqLimitKey: {
      // 分页时候请求服务器健名，limit
      type: String,
      default: `limit`
    },
    pageTotal: {
      type: Number,
      default: -1
    },
    pageIndexChange: {
      type: Function,
      default: () => { }
    },
    customFixWidth: {
      // 为true的话，修改组件原先计算出来的表头和body的宽度，并且删除colgroup
      // 该属性是修改打包后在远程服务器上出现的table宽度为几千万像素的bug，临时方案。
      type: Boolean,
      default: false
    },
    onCurrentChange: {
      type: Function,
      default: (item, olditem) => { }
    },
    onRowDblclick: {
      type: Function,
      default: item => { }
    },
    modifyParamsfun: {
      type: Function,
      default: val => { }
    },
    hasModifyFn: {
      type: Boolean,
      default: false,
    },
    tdAlign: {
      type: String,
      default: `left`
    },
    requestType: {
      // 请求url的请求方式默认为POST
      type: String,
      default: 'POST'
    },
    nodatatext: {
      type: String,
      default: `-`
    },
    // 是否显示单击选中的效果
    highlightRow: {
      type: Boolean,
      default: false
    },
    rowClickfn: {
      type: Function,
      default: () => { }
    },
    searchValue: {
      type: String,
      default: ''
    },
    showSearch: {
      // 是否显示搜索功能
      type: Boolean,
      default: false
    },
    pageSizeChange: {
      type: Function,
      default: () => { }
    },
    passOutParams: {
      // 当没有设置url的时候，动态传递请求参数到外部方法
      type: Function,
      default: () => { }
    },
    searchCB: {
      type: Function,
      default: () => { }
    },
    className: {
      type: String,
      default: ''
    },
    showSelection: {
      // 是否显示复选框
      type: Boolean,
      default: false
    },
    searchInline: {
      type: Boolean,
      default: false
    },
    height: {
      type: [String, Number],
      default: ``
    },
    width: {
      type: [String, Number],
      default: `auto`
    },
    pageSizeOpts: {
      type: Array,
      default: () => {
        return [10, 15, 20, 25, 30, 35, 40]
      }
    },
    url: {
      type: String,
      default: ''
    },
    tHead: {
      type: Array,
      require: true
    },
    hasCustomSearchFn: {
      // 是否有自定义的搜索方法，如果有，则默认的不启用
      type: Boolean,
      default: false
    },
    passOutSearchVal: {
      // 传递出查询的字段
      type: Function,
      default: () => { }
    },
    customSearchFn: {
      type: Function,
      default: () => { }
    },
    backUpPropsdata: {
      // 直接传递过来的备份数据
      type: Array,
      default: () => []
    },
    proptbData: {
      // 直接传递过来的数据
      type: Array,
      default: () => []
    },
    lazyload: {
      // 是否从props直接传递tabledata
      type: Boolean,
      default: false
    },
    params: {
      // 请求参数
      type: Object,
      default: () => { }
    },
    searchObj: {
      // 查询参数
      type: Object,
      default: () => { }
    },
    showPager: {
      // 是否显示分页
      type: Boolean,
      default: false
    },
    pageIndex: {
      // 初始化时候的page索引
      type: [String, Number],
      default: 0
    },
    numPrePage: {
      // 默认的每页展示数据
      type: Number,
      default: 10
    },
    selectFn: {
      // 多选的回调函数
      type: Function,
      default: () => { }
    },
    contextMenu: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const that = this;
    return {
      _tHead: this.$props.tHead,
      disabeldAllselector: false,
      localData: [],
      tData: this.filterNull(this.$props.proptbData),
      localPageIndex: 1,
      localPageTotal: 0,
      localPageSize: this.$props.numPrePage,
      backupData: this.$props.backUpPropsdata,
      contextMenuData: {
        closeCb: () => {
          that.showContext = false;
        }
      }, // 当前slot-scope的展示数据
      showContext: false // 是否显示contextmenu
    };
  },
  beforeDestroy: function () {
    this.$el.removeEventListener('click', this.contextmenuFn);
  },
  watch: {
    pageTotal: {
      handler: function (a, b) {
        if (a !== undefined) {
          this.localPageTotal = a;
        }
      },
      immediate: true
    },
    numPrePage: {
      pageIndex: {
        handler: function (a, b) {
          if (a !== undefined) {
            this.localPageSize = a;
          }
        },
        immediate: true
      }
    },
    pageIndex: {
      handler: function (a, b) {
        if (a !== undefined) {
          this.localPageIndex = (a + "").length === 13 ? 0 : a;
        }
      },
      immediate: true
    },
    proptbData (a) {
      this.tData = this.filterNull(a);
      // 判断如果所有的行都是禁用状态的话，那么就禁用全选框.
      if (this.selectAllInput) {
        if (a.filter(item => item._disabled).length === a.length) {
          // this.selectAllInput.setAttribute("disabled", "disabled")
          this.$nextTick(() => {
            this.selectAllInput.disabled = true;
          })
          // 避免后于mounted执行
          this.disabeldAllselector = true;
        } else {
          this.selectAllInput.removeAttribute("disabled");
          this.disabeldAllselector = false;
        }
      }
    },
    reqparams: {
      deep: true,
      handler: function (a, b) {
        if (a && !ztools.isOjbectEqual(a, b)) {
          if (this.lazyload) {
            // this.passOutParams(a);
          } else {
            if (this.url) {
              this.requestTableDATAfn();
            }
          }
        }
      }
    },
    backUpPropsdata (a) {
      this.backupData = a;
    },
    lazyload (a, b) {
      if (a) {
        this.backupData = this.$props.backUpPropsdata;
      }
    }
  },
  mounted () {
    if (this.$props.lazyload) {
    } else {
      this.requestTableDATAfn(this.$props.parmas);
    }
    if (this.$props.contextMenu) {
      this.$el.addEventListener('contextmenu', this.contextmenuFn, false);
    }
    this.selectAllInput = this.$refs.tables.$el.querySelector('.ivu-table-header .ivu-table-column-center .ivu-checkbox-input');
    window.selectAllInput = this.selectAllInput;
    if(this.disabeldAllselector){
      this.selectAllInput.setAttribute('disabled', 'disabled');
    }
    // $el.querySelector('.ivu-table-header .ivu-table-column-center. ivu-checkbox-input'), '@@@@@@@@@@@@@@');
  },
  beforeUpdate () { },
  computed: {
    localtableObj () {
      return {
        data: this.tableData,
        width: this.width,
        columns: this.tableHead,
        height: this.heights
      }
    },
    reqparams () {
      return {
        ...this.$props.params,
        [this.pageReqOffsetKey]: this.localPageIndex,
        [this.pageReqLimitKey]: this.localPageSize
      };
    },
    pageObj () {
      return {
        showTotal: true,
        total: this.localPageTotal,
        current: this.localPageIndex + 1,
        pageSize: this.localPageSize,
        pageSizeOpts: this.pageSizeOpts
      };
    },
    filterKeys () {
      return this.tHead.map(item => item.key);
    },
    heights () {
      if (this.$props.height === 'auto') {
        return '';
      }
      return this.$props.height;
    },
    tableData () {
      if (this.lazyload) {
        return this.tData;
      } else {
        return this.filterNull(this.localData);
      }
    },
    tableHead () {
      if (this.showSelection) {
        this.$data._tHead = [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          ...this.$data._tHead
        ];
      }
      return this.$data._tHead.map(item => {
        // 根据传入的props来批量设置td的对齐方式，
        // 假如有单独某列设置了对齐方式的话，那么该列采用自己设置的对齐方式
        let { align = this.tdAlign } = item;
        return {
          ...item,
          align
        };
      });
    }
  },
  methods: {
    clearSearch () {
      this.$refs.tablesearchRef.manualClear();
    },
    filterNull (list) {
      // 把null 和 undefined设置为默认的值，保证能够进行排序
      return list.map(item => {
        let keys = Object.keys(item);
        let newObj = {}
        this.tHead.forEach(o => {
          let { defaultValue = '', key: k } = o;
          if (item[k] === null || item[k] === undefined) {
            newObj[k] = defaultValue;
          }
        })
        return {
          ...item,
          ...newObj
        }
      });
    },
    clearContextMenu () { },
    contextmenuFn (event) {
      event.preventDefault();
      if (this.contextMenu && !this.$data.showContext) {
        let { pageX, pageY } = event;
        var fakeEvent = new MouseEvent('click');
        let dispatcher = this.$el.querySelector('.ivu-table-row.ivu-table-row-hover');
        if (dispatcher) {
          dispatcher.dispatchEvent(fakeEvent);
          this.$data.showContext = true;
          this.$data.contextMenuData.pos = {
            x: pageX,
            y: pageY
          };
        }
      }
    },
    modifyParamsFn (obj) {
      return new Promise((resolve, reject) => {
        if (!this.hasModifyFn) {
          let modified = {};
          let offset = obj[this.pageReqOffsetKey];
          let limit = obj[this.pageReqLimitKey];
          if (offset !== false && limit !== false) {
            modified = {
              ...obj,
              offset: offset * limit
            }
          } else {
            modified = obj;
          }
          resolve(modified);
        } else {
          resolve(this.modifyParamsfun(obj));
        }
      });
    },
    async requestTableDATAfn (ppt = {}) {
      let { hideSpin = false } = ppt;
      let modifyParams = await this.modifyParamsFn(this.reqparams);
      ajax[this.requestType.toLowerCase()](this.url, hideSpin)(modifyParams)(val => {
        let { list, total, pages, pageNum } = val;
        this.localPageTotal = total;
        this.localData = list;
      })
    },
    rowClick (data, index, event) {
      this.rowClickfn({
        index,
        data
      });
      // 行列单击事件，给contextMenu提供数据
      if (this.contextMenu && !this.$data.showContext) {
        this.$data.contextMenuData = {
          ...this.$data.contextMenuData,
          data,
          index
        };
      } else {
      }
    },
    selectionFn (selected) {
      this.selectFn(selected);
    },
    onSearchFn (value) {
      value = value.trim();
      if (this.hasCustomSearchFn) {
        this.tData = this.customSearchFn(this.backupData, value);
      } else {
        this.tData = this.backupData.filter(item => {
          return this.filterKeys.filter(key => {
            return (item[key] + '').includes(value);
          }).length
        });
      }
      this.passOutSearchVal(value);
    },
    getBackUpData () {
      return this.$data.backupData;
    },
    onpagechange (index) {
      index--;
      this.$data.localPageIndex = index;
      this.$props.pageIndexChange(index);
    },
    onpagesizechange (num) {
      this.$data.localPageIndex = 0;
      this.$data.localPageSize = num;
      this.$props.pageSizeChange(num);
      this.$props.pageIndexChange(0);
    },
    clearCurrentRow () {
      this.$refs.tables.clearCurrentRow();
    }
  }
};
</script>

<style scoped lang='less'>
.tableHeader {
  text-align: right;
}
.tableHeader.hasSearch {
  // position: fixed;
  // z-index: 1;
  // top:0px;
}
.pager-wrap {
  padding-top: 10px;
}
</style>
<style lang='less'>
.Ztable {
  position: relative;
  .ivu-table-cell {
    // overflow: visible !important;
  }
  .ivu-table-wrapper.tbHasSearch {
    // margin-top:50px;
  }
}
</style>

