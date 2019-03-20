<template>
  <div class="advancetable" :class="className">
    <zform v-if="showForms" v-bind="localformPropsObj" ref='tableForm'>
      <div slot="formFooter" class="zmzlolo" v-if="showSubmit">
        <Button type='primary' @click="submits">{{submitText}}</Button>
        <Button @click="addtionCb" v-if="showAddBtn">{{addText}}</Button>
      </div>
    </zform>
    <z-Table ref="ztable" v-bind="theTableObj">
    </z-Table>
  </div>
</template>

<script>
export default {
  props: {
    tableObj: {
      type: Object,
      default: () => { }
    },
    formPropsObj: {
      // 表单的对象
      type: Object,
      default: () => { }
    },
    requestType: {
      // 请求url的请求方式默认为POST
      type: String,
      default: 'POST'
    },
    formGutter: {
      // 控件之间的宽度
      type: Number,
      default: 0
    },
    pageTotal: {
      // 总数据
      type: Number,
      default: 0
    },
    submitText: {
      // 提交的按钮名称，如果是空的话，不显示按钮；
      type: String,
      default: ''
    },
    addText: {
      // 新增的按钮名称，如果是空的话，不显示按钮；
      type: String,
      default: ''
    },
    addtionCb: {
      // 新增的回调函数
      type: Function,
      default: () => { }
    },
    submitSize: {
      // 提交按钮的宽度
      type: Number,
      default: 3
    },
    showForms: {
      // 是否显示form表单功能
      type: Boolean,
      default: false
    },
    pageIndexChange: {
      // 页码变化的时候回调函数
      type: Function,
      default: () => { }
    },
    pageSizeChange: {
      // 每页显示数量变化的回调函数
      type: Function,
      default: () => { }
    },
    className: {
      // 最外层的容器的class
      type: String,
      default: ''
    },
    passOutParams: {
      // 当没有设置url的时候，动态传递请求参数到外部方法
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
    url: {
      // 请求的URL
      type: String,
      default: ''
    },
    params: {
      // 请求参数
      type: Object,
      default: () => { }
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
    }
  },
  data () {
    return {
      localParams: {}, // 本地的请求参数，来自form表单提交
      pageIndex: 0,
      localTableObj: {},
      pageSize: 10
    };
  },
  beforeDestroy () { },
  watch: {
    numPrePage: {
      immediate: true,
      handler: function (a, b) {
        if (a !== false) {
          this.pageSize = a;
        }
      }
    },
    reqparams (a, b) {
      if (!ztools.isOjbectEqual(a, b)) {
        // this.passOutParams(a);
      }
    },
    tableObj: {
      handler: function (a, b) {
        this.localTableObj = a;
      },
      immediate: true,
    }
  },
  mounted () {
  },
  beforeUpdate () { },
  computed: {
    localformPropsObj () {
      return {
        ...this.formPropsObj,
        className: this.className + "-title"
      }
    },
    theTableObj () {
      let params = {
        ...this.params,
        ...this.localParams,
      };
      params = this.trimObject(params, this.formPropsObj.formList);
      return {
        ...this.localTableObj,
        url: this.url,
        params,
        className: this.className + "-body",
        numPrePage: this.pageSize,
        pageIndex: this.pageIndex,
        pageTotal: this.$props.pageTotal,
        passOutParams: this.passOutParams,
        requestType: this.requestType,
        pageIndexChange: this.pageIndexChangefn,
        pageSizeChange: this.pageSizeChangefn,
      }
    },
    showSubmit () {
      return this.submitText.length > 0;
    },
    showAddBtn () {
      return this.addText.length;
    },
    reqparams () {
      let params = {
        ...this.params,
        ...this.localParams,
      };
      params = this.trimObject(params, this.formPropsObj.formList);
      let r = {
        ...params,
        [this.pageReqOffsetKey]: this.pageIndex.length === 13 ? 0 : this.pageIndex,
        [this.pageReqLimitKey]: this.pageSize
      };
      return r;
    }
  },
  methods: {
    pageIndexChangefn (val) {
      this.$props.pageIndexChange(val);
      this.pageIndex = val;
      this.passOutParamsFn();
    },
    resets (obj) {

    },
    refresh () {
      this.submits();
    },
    pageSizeChangefn (val) {
      this.$props.pageSizeChange(val);
      this.pageSize = val;
      this.passOutParamsFn();
    },
    passOutParamsFn () {
      if (this.tableObj.lazyload) {
        this.passOutParams({
          ...this.localParams,
          [this.pageReqLimitKey]: this.pageSize,
          [this.pageReqOffsetKey]: this.pageIndex
        })
      }
    },
    submits (ppt = {}) {
      this.$refs.tableForm.handleSubmit().then(val => {
        if (!this.tableObj.lazyload) {
          // zmz 9-11 提交的时候默认将其设置为0
          this.pageIndex = new Date().valueOf() + "";
          if (ztools.isOjbectEqual(this.localParams, val)) {
            // 如果相同的话，才直接调动请求方法
            this.$nextTick(() => {
              this.$refs.ztable.requestTableDATAfn(ppt);
            })
          }
        }
        this.localParams = val;
        if (this.tableObj.lazyload) {
          this.pageIndex = 0; // 提交的时候将pageindex修改为0;
          this.passOutParamsFn();
        }
      });
    }
  }
};
</script>

<style scoped lang='less'>
.zmzlolo {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  .ivu-btn {
    margin-right: 5px;
  }
}
.tableHeader {
  text-align: right;
}
.pager-wrap {
  padding-top: 10px;
}
</style>
