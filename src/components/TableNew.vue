<template>
  <div class="Ztable" :class="className">
    <div class='tableHeader' :class="{hasSearch:showSearch}">
      <slot name="tableheader">
      </slot>
      <z-SearchMutiply v-if="showSearch" :inline="searchInline" :onchange="onSearchFn" v-bind="searchObj" />
    </div>
    <Table @on-expand="onExpand" :columns="tHead" :data="proptbData" stripe :style="style" :height="heights">
    </Table>
    <div class="pager-wrap" v-if="showPager">
      <Page :total=total ref="pa" show-elevator show-total :page-size="pagesize" @on-change='onpagechange' :current="current" />
    </div>
    <slot ref="contextMenu" name='contextMenu' v-if="showContext" :props="contextMenuData"></slot>
  </div>
</template>

<script>
// TODO 提升性能 启用:disabled-hover=true，考虑后期是否去掉？？?
export default {
  props: {
    pagesize: {
      type: Number,
      default: 10
    },
    onExpand: {
      type: Function,
      default: () => {}
    },
    fun: {
      type: Function,
      default: () => {}
    },
    pageIndexChange: {
      type: Function,
      default: () => {}
    },
    total: {
      type: Number,
      default: 0
    },
    // 是否显示单击选中的效果
    highlightRow: {
      type: Boolean,
      default: false
    },
    rowClickfn: {
      type: Function,
      default: () => {}
    },
    showSearch: {
      // 是否显示搜索功能
      type: Boolean,
      default: false
    },
    pageSizeChange: {
      type: Function,
      default: () => {}
    },
    searchCB: {
      type: Function,
      default: () => {}
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
      type: String,
      default: `100%`
    },
    url: {
      type: String,
      default: ''
    },
    tHead: {
      type: Array,
      require: true
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
      default: () => {}
    },
    searchObj: {
      // 查询参数
      type: Object,
      default: () => {}
    },
    showPager: {
      // 是否显示分页
      type: Boolean,
      default: false
    },
    pageIndex: {
      // 初始化时候的page索引
      type: Number,
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
      default: () => {}
    },
    contextMenu: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const that = this;
    return {
      current: 1,
      _tHead: this.$props.tHead,
      localData: [],
      tData: this.$props.proptbData,
      _pageIndex: this.$props.pageIndex,
      pageSize: this.$props.numPrePage,
      backupData: this.$props.backUpPropsdata,
      contextMenuData: {
        closeCb: () => {
          that.showContext = false;
        }
      }, // 当前slot-scope的展示数据
      showContext: false // 是否显示contextmenu
    };
  },

  beforeDestroy() {
    this.$el.removeEventListener('click', this.contextmenuFn);
  },
  mounted() {},
  beforeUpdate() {},
  computed: {
    style() {
      return {
        width: this.$props.width
      };
    },
    heights() {
      if (this.$props.height === 'auto') {
        return '';
      }
      return this.$props.height;
    }
  },
  methods: {
    // 页数变化
    onpagechange(index) {
      this.$data._pageIndex = index;
      this.$props.pageIndexChange(index);
      this.current = index;
      this.$emit('pageClick', index);
    },
    // search子组件提交过来的数据
    onSearchFn(value) {
      this.$emit('searchClick', value);
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

