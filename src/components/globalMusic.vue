
<template>
  <div id='asdasdasd'>
    <h1>$$$ {{asdf}} $$$</h1>
    <h1>loop {{loop}} loop</h1>
    <h1>src {{src}} src</h1>
    <AudioPlayer v-bind="audioObj" />
    <audio src="https://emdc.healthlink.cn/emdc-resources/customize/common/audio/queue.wav" controls>
    </audio>
    <audio src="https://emdc.healthlink.cn/emdc-resources/customize/common/audio/timeout.mp3" controls>
    </audio>
    <audio src="https://emdc.healthlink.cn/emdc-resources/customize/common/audio/waitPhone.mp3" controls>
    </audio>
    <audio src="https://emdc.healthlink.cn/emdc-resources/customize/common/audio/longtime.wav" controls>
    </audio>
    <!-- <audio src="https://emdc.healthlink.cn/emdc-resources/customize/common/audio/network.mp3" preload="auto" controls> -->
    <audio src="../assets/audio/network.mp3" preload="auto" controls>
    </audio>
    <div>
    <button @click='shitloadofpusys("timeout")'>坐席超时</button>
    <button @click='shitloadofpusys("waitPhone")'>电话排队</button>
    <button @click='shitloadofpusys("WSdisconnect")'>ws断开</button>
    <button @click='shitloadofpusys("LongtimeCall")'>电话超时没呼入</button>
    <button @click='shitloadofpusys("queue")'>车辆监控超时声音</button>
    </div>
    <div>
    <button @click='shitloadofpusys("timeout", false)'>坐席超时-关-</button>
    <button @click='shitloadofpusys("waitPhone", false)'>电话排队-关-</button>
    <button @click='shitloadofpusys("WSdisconnect", false)'>ws断开-关-</button>
    <button @click='shitloadofpusys("LongtimeCall", false)'>电话超时没呼入-关-</button>
    <button @click='shitloadofpusys("queue", false)'>车辆监控超时声音-关-</button>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
const _home_ = ztools.s('home');
export default {
  props: {},
  data () {
    return {
      src: '',
      loop: false,
      currentPlayName: ''
    };
  },
  computed: {
    ...mapState({
      musciPlayerObj: _home_('musciPlayerObj')
    }),
    asdf () {
      return NODEENV.type;
    },
    audioObj () {
      return {
        // src: this.src === '' ? '' : NODEENV.isproduction ? (NODEENV.prefixUrl + this.src) : this.src,
        src: this.src,
        autoplay: true,
        currentPlayName: '', // 当前播放的名称;
        startPlay: ztools.makeRandomShit(),
        loop: this.loop,
        onplayend: this.onplayend
      }
    }
  },
  watch: {
    'musciPlayerObj.version': {
      handler: function (a, b) {
        let { list, baseUrl, maxLevel } = this.musciPlayerObj;
        ztools.log(`version::::::::::::` + a, 'green', 32, list);
        // 找到当前属性 isplay为true的最高权限的播放音乐;
        let currentPlayObj = list.filter(item => item.isplay).sort((a, b) => {
          let { level: levela } = a;
          let { level: levelb } = b;
          return levela > levelb ? -1 : levela === levelb ? 0 : 1;
        })[0];
        if (currentPlayObj) {
          let { filename, loop, name, localPath } = currentPlayObj;
          this.src = localPath ? localPath : baseUrl + filename;
          this.loop = loop === 1;
          this.currentPlayName = name;
        } else {
          // 说明全部关闭;
          this.loop = false;
          this.src = '';
          this.currentPlayName = '';
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions({
      UpdateMusciPlayerObj: `UpdateMusciPlayerObj`
    }),
    shitloadofpusys (name, isplay = true) {
      this.UpdateMusciPlayerObj({
        name,
        isplay
      });
    },
    onplayend () {
      if (this.currentPlayName) {
        if (!this.loop) {
          this.UpdateMusciPlayerObj({
            name: this.currentPlayName,
            isplay: false
          });
        }
      }
    }
  },
  beforeUpdate () {
    let src = this.src === '' ? '' : NODEENV.isproduction ? (NODEENV.prefixUrl + this.src) : this.src;
  },
  beforeDestroy () { },
  mounted () {

  }
};
</script>

<style scoped lang="less">
#asdasdasd {
  background: red;
  position: absolute;
  z-index: 9999;
  top: -10000px;
  // top: 30%;
  left: 10%;
  // display: none;
  visibility: hidden;
}
</style>
