<template>
  <div class="textcontainer" v-bind="textcontainerobj">
    <span>{{value}}</span>
    <!-- <Icon type="ios-copy" size='20' class="shithovercopybtn" :title="copyBtnText" @click.native="copyfn"/> -->
    <!-- <Button class="shithovercopybtn" @click="copyfn">{{copyBtnText}}</Button> -->
    <div class="textcopycover" :title="copyBtnTextCom" @click="copyfn">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    online: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    copyBtnText: {
      type: String,
      default: `复制`
    },
    width: {
      type: [Number, String],
      default: 0
    },
    copy: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {};
  },
  computed: {
    copyBtnTextCom() {
      return '点击' + this.copyBtnText;
    },
    textcontainerobj() {
      return {
        style: this.styleObjs
      }
    },
    styleObjs() {
      if (this.width) {
        return {
          width: this.width + 'px'
        }
      }
    }
  },
  methods: {
    copyfn() {
      ztools.copyText(this.value);
      __msgOk__('复制成功！');
    }
  },
  beforeDestroy() { },
  mounted() { }
};
</script>
<style scoped lang="less">
.textcontainer {
  display: flex;
  position: relative;
  flex-flow: row nowrap;
  align-items: center;
  // padding-right: 30px;
  .shithovercopybtn {
    position: absolute;
    right: 0px;
    top: 0px;
    cursor: pointer;
    display: none;
  }
  .textcopycover {
    position: absolute;
    opacity: 0.5;
    cursor: pointer;
    background: gray;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    border-radius: 5px;
    display: none;
  }
}
.textcontainer:hover {
  .textcopycover{
    display: block;
  }
  .shithovercopybtn {
    display: block;
  }
}
</style>
