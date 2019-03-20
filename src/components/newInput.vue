<!-- 文本+input框 -->
<template>
  <div class="cusContainer" :class="classObj">
    <div class="content" :style="inputStyle">
      <span class="title" :style="titleStyle" v-if="showTitle">{{title}}</span>
      <Input v-if="inputtype === 'text'" @on-blur="blurfn" :autocomplete="autocomplete" :maxlength="maxlength" :disabled="disabled" :placeholder="placeholder" :value="value" @on-change="change" />
      <input class="cuscontainernumberinputer" v-else-if="inputtype === 'number'" :type="inputtype" @on-blur="blurfn" :autocomplete="autocomplete" :maxlength="maxlength" :disabled="disabled" :placeholder="placeholder" :value="value" @input="change" />
      <input class="cuscontainernumberinputer" v-else-if="inputtype === 'password'" type="password" @on-blur="blurfn" :autocomplete="autocomplete" :maxlength="maxlength" :disabled="disabled" :placeholder="placeholder" :value="value" @input="change" />
    </div>
    <!-- <span class="errortext" :class="{erorrActive: erorrActive, showError: showError}" v-if="showError">{{errors.msg}}</span> -->
    <span class="errortext" v-if="showError">{{errormsg}}</span>
    <div class="showErrorTip"></div>
  </div>
</template>

<script>
export default {
  mixins: [ztools.validateMixins],
  props: {
    title: {
      type: String,
      default: ''
    },
    inputtype: {
      type: String,
      default: 'text'
    },
    titleWidth: {
      // 标题的宽度
      type: Number,
      default: 0
    },
    blur: {
      type: Function,
      default: () => {}
    },
    contentWidth: {
      // 输入框的长度，设置的话一般表示需要展示错误信息，并且需要把错误信息定位到右边
      type: Number,
      default: 0
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    value: {
      type: [String, Number],
      default: ''
    },
    maxlength: {
      type: Number,
      default: 255
    },
    onChange: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  computed: {
    titleStyle() {
      if (this.titleWidth) {
        return {
          width: this.titleWidth + 'px'
        };
      }
      return {};
    },
    inputStyle() {
      if (this.contentWidth) {
        return {
          width: this.contentWidth + 'px'
        };
      }
      return {};
    }
  },
  watch: {
  },
  methods: {
    change(e, asdf) {
      let val = e.target.value.trim();
      this.$emit('input', val);
      if (this.valiObj.method === 'change') {
        this.validate(val);
      }
    },
    blurfn(e) {
      let val = e.target.value.trim();
      if (this.valiObj.method === 'blur') {
        this.validate(val);
      }
      this.blur(val);
    }
  },
  beforeDestroy() {},
  mounted: function() {}
};
</script>

<style scoped lang="less">
</style>

