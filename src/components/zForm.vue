<!-- 自定义表单之添加表头 -->
<template>
  <div class="zformCtn" :class="className" :style="style">
    <Form ref="formValidate" :model="formObj" :rules="rules" :label-width="0">
      <Row v-for="(qwer, pos) in rowList" :key="pos" :gutter="gutter" :class-name="shitloadofshit">
        <div class="formtitless" v-if="showTitle">{{qwer.text}}</div>
        <div class="formcontentsss">
          <Col :span="item.size" v-for="(item, index) in qwer.list" :key="index">
          <FormItem :prop="item.rule">
            <newInput :ref="item.ref" v-if="item.type === 'input'" :title="item.label" v-bind="item.props" v-model="formObj[item.key]" />
            <h2 class="formSubtitle" :class="classses(item)" v-else-if="item.type === 'title'">{{item.props.title}}</h2>
            <!-- <contactPhoneInput :ref="item.ref" v-else-if="item.type === 'vccccccc'" :title="item.label" v-bind="item.props" v-model="formObj[item.key]" /> -->
            <Zswitch :ref="item.ref" v-else-if="item.type === 'switch'" :title="item.label" v-bind="item.props" v-model="formObj[item.key]" />
            
            <AdvanceTimeSelect :ref="item.ref" v-else-if="item.type === 'datepk'" :title="item.label" v-bind="item.props" v-model="formObj[item.key]" />
            <!-- <DatePicker type="datetime" v-else-if="item.type === 'datetime'" :title="item.label" v-bind="item" v-model="formObj[item.key]"/> -->
            <mapInputer :ref="item.ref" v-else-if="item.type === 'mapinputer'" :title="item.label" v-bind="item.props" v-model="formObj[item.key]" />
            <MeetAddrInput :ref="item.ref" v-else-if="item.type === 'meetaddr'" :title="item.label" v-bind="item.props" v-model="formObj[item.key]" />
            <SecenAddrInput :ref="item.ref" v-else-if="item.type === 'secenaddr'" :title="item.label" v-bind="item.props" v-model="formObj[item.key]" />
            <newSelect :ref="item.ref" v-else-if="item.type === 'select'" :title="item.label" v-model="formObj[item.key]" v-bind="item.props" />
            <SelectInput :ref="item.ref" v-else-if="item.type === 'selectinput'" :title="item.label" v-model="formObj[item.key]" v-bind="item.props" />
            <AdvancedSelect :ref="item.ref" v-else-if="item.type === 'advanceselect'" :selected="formObj[item.key]" :title="item.label" v-bind="item.props" />
            <CheckGroup :ref="item.ref" v-else-if="item.type === 'checkboxgroup'" :title="item.label" :list="item.list" v-bind="item.props" v-model="formObj[item.key]" />
            <ZtimeSelect :ref="item.ref" v-else-if="item.type === 'timeselect'" :title="item.label" v-bind="item.props" v-model="formObj[item.key]" />
            <zRadioGroup :ref="item.ref" v-else-if="item.type === 'radiogroup'" :title="item.label" :list="item.list" v-bind="item.props" v-model="formObj[item.key]" />
            <Button :ref="item.ref" v-else-if="item.type === 'button'" v-bind="item.props" @click="item.props.click">{{item.label}}</Button>
            <Addtion :ref="item.ref" v-else-if="item.type === 'addtion'" v-bind="item.props" :pvalues="formObj[item.key]" />
            <div v-else-if="item.type === 'submit'"  data-id='2234'>
              <slot name="formFooter">
                <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                <Button type="ghost" @click="resets" style="margin-left: 8px">Reset</Button>
              </slot>
            </div>
          </FormItem>
          </Col>
          <!-- <Col span="6" align='left' data-id='1234'>
          <FormItem v-if="showBtn && !submitInline">
            <slot name="formFooter">
              <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
              <Button type="ghost" @click="resets" style="margin-left: 8px">Reset</Button>
            </slot>
          </FormItem>
          </Col> -->
        </div>
      </Row>

    </Form>
    <!-- <button @click="test">asdasdasdasdsad</button> -->
  </div>
</template>
<script>
// import contactPhoneInput from '@comps/contactPhoneInput.vue';
export default {
  props: {
    className: {
      // 最外层的容器的class
      type: String,
      default: ''
    },
    showBtn: {
      // 是否显示form按钮
      type: Boolean,
      default: false
    },
    submitInline: {
      // 是否把提交按钮不换行显示。
      type: Boolean,
      default: false
    },
    formObj: {
      type: Object,
      detault: () => { }
    },
    showTitle: {
      // 是否显示按钮组名称，ps 用于手工制表的形式与list对象中的for有关
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String],
      default: 'auto'
    },
    gutter: {
      // 控件之间的宽度
      type: Number,
      default: 0
    },
    rules: {
      // 控件的验证规则
      type: Object,
      detault: () => { }
    },
    formList: {
      // 控件列表
      type: Array,
      detault: () => []
    },
    titleList: {
      // 控件分组的名称与formList中的for有关。
      type: Array,
      detault: () => []
    },
    showReset: {
      // 是否由重置功能
      type: Boolean,
      default: false
    },
    okcb: {
      // 提交成功回调函数
      type: Function,
      default: () => { }
    }
  },
  data () {
    return {
      refList: [],
      valiList: [],
      refPropsMap: {
        input: [{ key: `blur`, value: () => { } }, { key: `change`, value: () => { } }, { key: `click`, value: () => { } }]
      }
    };
  },
  components: {
    // contactPhoneInput
  },
  computed: {
    style: function () {
      let r = {
        width: this.$props.width + 'px'
      };
      if ((this.$props.width + '').toLowerCase() === 'auto') {
        delete r.width;
      }
      return r;
    },
    shitloadofshit () {
      return this.$props.showTitle ? 'shitloadofshit' : '';
    },
    rowList () {
      let r = this.$props.showTitle
        ? this.$props.titleList.map(item => {
          return {
            ...item,
            list: this.$props.formList.filter(o => o.for === item.key).map(o => {
              // 自动补全缺失的参数
              o.props = this.autoComplet(o.type, o.props);
              let ref = this.makeRandom();
              this.refList.push(ref);
              if (o.props && o.props.valiObj && o.props.valiObj.active) {
                this.valiList.push(ref);
              }
              return {
                ...o,
                ref,
                type: o.type.toLowerCase()
              };
            })
          };
        })
        : [
          {
            list: this.$props.formList.map(o => {
              let ref = this.makeRandom();
              this.refList.push(ref);
              if (o.props && o.props.valiObj && o.props.valiObj.active) {
                this.valiList.push(ref);
              }
              return {
                ...o,
                ref,
                type: o.type.toLowerCase()
              };
            })
          }
        ];
      if (this.submitInline && this.showBtn) {
        if (!this.$props.showTitle) {
          // 有titile的暂时不做
          // 如果提交按钮不单独一行显示则添加到队列中
          r[0].list = [
            ...r[0].list,
            {
              type: `submit`,
              size: `3`
            }
          ];
        }
      }
      return r;
    }
  },
  beforeUpdate () { },
  watch: {
    // formObj: {
    //   deep: true,
    //   handler: function (a, b) {
    //     ztools.log('!!!!!!!!!!!!!!!', 'gray', 35, a);
    //   }
    // }
  },
  methods: {
    classses (item) {
      let pos = item.props.pos;
      return pos ? pos : `center`;
    },
    test () {
      this.valiList.forEach(item => {
        this.$refs[item][0].validateFn().then(val => {
        });
      });
    },
    autoComplet (type, obj) {
      // 自动补全的参数
      let binggo = this.refPropsMap[type];
      if (binggo) {
        binggo.forEach(item => {
          let { k, v } = item;
          if (!obj[k]) {
            obj[k] = v;
          }
        });
      }
      return obj;
    },
    // 提交方法，接受一个参数，如果为all的话，那么不根据formList来过滤formObj
    async handleSubmit (type) {
      let errorList = [];
      let valiPromiseList = [];
      this.valiList.forEach(item => {
        if (this.$refs[item][0]) {
          valiPromiseList.push(this.$refs[item][0].validateFn());
        }
      });
      let r1 = await Promise.all(valiPromiseList);
      errorList = r1.filter(item => item.isError);
      if (errorList.length) {
        return false;
      } else {
        if (type === 'all') {
          return this.trimObjectNoref(this.formObj);
        } else {
          return this.trimObject(this.formObj, this.formList);
        }
      }
    },
    resets () {
      this.valiList.forEach(item => {
        if (this.$refs[item][0]) {
          this.$refs[item][0].clearErrors();
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.formSubtitle {
  .left {
    text-align: left;
  }
  .right {
    text-align: right;
  }
}
.shitloadofshit {
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  .formtitless {
    background-color: #e4e4e4;
    margin-bottom: 6px;
    font-size: 16px;
    writing-mode: vertical-lr;
    text-align: center;
    line-height: 24px;
    letter-spacing: 2px;
  }
  .formcontentsss {
    flex: 1 1 auto;
  }
}
.shitloadofshit:hover {
  .formtitless {
    color: white;
    background-color: #3399ff;
  }
}
</style>
<style lang='less'>
.zformCtn {
  .ivu-col {
    flex-shrink: 0;
  }
  .ivu-form-item-error-tip {
    padding-top: 1px;
    font-size: 12px;
  }
  .ivu-form-item.ivu-form-item-required {
    margin-bottom: 14px;
  }
  .ivu-form-item {
    margin-bottom: 6px;
  }
}
</style>
