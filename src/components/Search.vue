<template>
  <div class="z-search-div" :style="styles" v-bind:class="classObject">
    <Input :placeholder="placeholder" :maxlength="255" v-model="value" @on-change="onchangefn" :clearable="clearable ? true : false" :style="style" :class="classname" />
    <Button v-if="!realTime" type="primary" class="search-btn" icon="ios-search" @click="onClickFn"></Button>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请搜索'
    },
    width: {
      type: [Number, String],
      default: 0
    },
    inline: {
      // 是否一行显示
      type: Boolean,
      default: true
    },
    url: {
      type: String,
      default: ''
    },
    realTime: {
      // 是否是同步输入改变
      type: Boolean,
      default: false
    },
    // 默认的请求参数健名
    requestKey: {
      type: String,
      default: 'param'
    },
    type: {
      type: String,
      default: 'get'
    },
    classname: {
      type: String,
      default: 'ops'
    },
    searchValue: {
      type: String,
      default: ''
    },
    clearable: {
      // 是否可以点击清除
      type: Boolean,
      default: false
    },
    onchange: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      name: '1234',
      style: {},
      value: this.$props.searchValue,
      classObject: {
        inline: this.$props.inline
      }
    };
  },
  computed: {
    styles() {
      if (this.width && this.width !== 'auto') {
        return {
          width: this.width + 'px'
        };
      }
      return {};
    }
  },
  methods: {
    manualClear() {
      this.value = '';
      this.$props.onchange('');
    },
    onchangefn(event, value) {
      let data = event.target.value;
      if (this.$props.realTime) {
        this.$props.onchange(data);
      }
    },
    onClickFn() {
      let data = this.$data.value;
      let { type, requestKey, onchange, url } = this.$props;
      if (url) {
        // ajax request
        ajax[type](url)({
          [requestKey]: data
        })(data => {});
      } else {
        onchange(data);
      }
    }
  },
  mounted: function() {}
};
</script>

<style scoped lang="less">
.z-search-div {
  display: flex;
  flex-flow: row nowrap;
  padding: 5px;
  flex-shrink: 0;
  // height: 35px;
  .search-btn {
    margin-left: 5px;
  }
}
.z-search-div.inline {
  display: inline-flex;
}
</style>
