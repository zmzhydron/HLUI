<!-- 
 输入框和popup的联动效果
 TODO: 目前只做了UI逻辑
-->
<template>
  <div class="inputpopup">
    <newInput :title="title" mixinClass="deadpool2" v-model="shitman" />
    <Hud ref="HUDTwo" v-bind="hudtwoObj">
      <div class="slotcatns">
        <input v-model='searchval' class='shitloadofsearch' placeholder="请输入...." />
        <div class='ddrbar'>
          <div class='ddrbaritems' v-for="item in sendHospitalListSorted" :key="item.id" :class="{active: item.hospName === shitman}">
            <div class="optionslotwarpper" @click="cliclfunctions(item)">
              <span class="hosname">{{ item.hospName }}</span>
              <span class="hosdistance">{{ item.distance }}</span>
            </div>
          </div>
        </div>
      </div>
      <Button class="hudTriggeraaa" slot="trigger">医院</Button>
    </Hud>
  </div>
</template>

<script>
import { createNamespacedHelpers, mapState, mapActions } from 'vuex';
const { mapState: formState, mapActions: formAction } = createNamespacedHelpers('commonForm');
const _manualOrder_ = ztools.s('manualOrder');
export default {
  // model: {
  //   props: [value]
  // },
  props: {
    title: {
      type: String,
      default: ''
    },
    index: {
      // 当前控件所在的索引；
      type: Number,
      default: 0
    },
    value: {
      type: [Number, String],
      default: ''
    },
    selected: {
      type: Function,
      default: () => { }
    }
  },
  data () {
    return {
      inputvalue: "",
      searchval: '',
      shitman: ""
    };
  },
  computed: {
    ...mapState({
      sendHospitalList: _manualOrder_(`sendHospitalList`)
    }),
    hudtwoObj () {
      return {
        dir: 'bottom',
        width: '400',
        height: '250',
        // showBorder: false,
        showHeader: false,
        offset: -110,
        title: '推荐车辆'
      };
    },
    sendHospitalListSorted () {
      // return this.sendHospitalList.sort((a, b) => {
      //   let pre = a.distanceRaw || 0;
      //   let next = b.distanceRaw || 0;
      //   return pre > next ? 1 : (pre === next ? 0 : -1);
      // })
      return this.sendHospitalList.filter(item => {
        return this.searchval ? item.hospName.includes(this.searchval) : true;
      })
    }
  },
  watch: {
    value: {
      handler: function (a) {
        this.inputvalue = a;
        this.shitman = a;
      },
      immediate: true
    },
    shitman (a) {
      // 根据输入的值查询经纬度;
      // let binggo = this.sendHospitalList.filter(item => item.hospName === a)[0];
      // let lng = null;
      // let lat = null;
      // if (binggo) {
      //   lng = binggo.longitude;
      //   lat = binggo.latitude;
      // }
      // this.arrivalAddrPosChange({
      //   value: [lng, lat],
      //   index: this.index
      // })
      this.$emit('input', a);
    }
  },
  methods: {
    ...formAction({
      // arrivalAddrPosChange: `arrivalAddrPosChange`
    }),
    cliclfunctions (item) {
      // this.selected(item);
      this.shitman = item.hospName;
      this.$refs.HUDTwo.isShow = false;
    }
  },
  beforeDestroy () { },
  mounted () { },
  beforeUpdate () { }
};
</script>

<style scoped lang="less">
.slotcatns {
  padding: 5px;
  .shitloadofsearch {
    height: 25px;
    width: 100%;
  }
  .ddrbar {
    height: 205px;
    overflow: auto;
  }
  .ddrbaritems {
  }
  .ddrbaritems.active,
  .ddrbaritems:hover {
    background-color: #3399ff;
    color: white;
  }
}

.shitmanaa {
  .ivu-btn {
    height: 30px !important;
  }
}
.inputpopup {
  display: flex;
  flex-flow: row nowrap;
  position: relative;
}
</style>
<style lang='less'>
.optionslotwarpper {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 0 2px;
  cursor: pointer;
  .hosname {
    flex: flex-start;
  }
  .hosdistance {
    flex: flex-end;
  }
}
.inputpopup {
  .cusContainer {
    .content {
      // border-right: 0px;
      border-radius: 0px;
    }
  }
  .shitmanaa {
    .ivu-btn {
      border-left: 0px;
      margin-left: 0px;
      border-radius: 0 4px 4px 0;
      border-color: #d0d0d0;
      background: #f5f7fa;
    }
    .ivu-btn-primary {
      color: #464444;
    }
    .ivu-btn-primary:focus {
      box-shadow: 0 0 0 0px;
    }
  }
}
</style>

