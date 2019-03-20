<!--录音播放框-->
<!-- https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events -->
<template>
  <div class="audioCtn">
    <audio :id=id :autoplay="autoplay" :loop="loop" :style="styleObj" :src="src" controls>
      您的浏览器不支持 audio 标签。
    </audio>
  </div>
</template>

<script>
export default {
  props: {
    loop: {
      // 是否循环播放
      type: Boolean,
      default: false
    },
    startPlay: {
      // 用随机值通过watch来让其马上播放；
      type: String,
      default: ""
    },
    onplayend: {
      // 播放完成事件;
      type: Function,
      default: () => { }
    },
    src: {
      type: String,
      default: ''
    },
    isAutoPlay: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {
      audioEle: '',
      id: ztools.makeRandomShit(),
    };
  },
  computed: {
    styleObj() {
      return {
        width: this.width + 'px'
      };
    },
    boxStyle() {
      return {
        left: this.boxx + 'px'
      };
    },
    autoplay() {
      return this.isAutoPlay ? `autoplay` : '';
    },
    line2style() {
      return {
        width: this.boxx + 'px'
      };
    },
    maxW() {
      return this.width - 20;
    }
  },
  methods: {
    dragStart(e) {
      this.dragflag = true;
      this.borderX = e.pageX - e.offsetX;
      this.offsetx = e.offsetX;
    },
    drag(e) {
      if (this.dragflag) {
        let x = e.pageX - this.borderX - this.offsetx;
        x = x < 0 ? 0 : x > this.maxW ? this.maxW : x;
        this.boxx = x;
        this.audioObj.currentTime = Math.floor(this.boxx / this.step);
      }
    },
    dragOff() {
      this.dragflag = false;
    },
    playend() {
      this.onplayend();
    },
    bindDragEvents() {
      let dragxxx = document.getElementById('dragxxx');
      dragxxx.addEventListener('mousedown', this.dragStart, false);
      document.addEventListener('mousemove', this.drag, false);
      document.addEventListener('mouseup', this.dragOff, false);
    },
    // playfn() {
    //   if (this.duration) {
    //     this.audioObj.play();
    //   }
    // },
    // pausefn() {
    //   if (this.duration) {
    //     this.audioObj.pause();
    //   }
    // },
    // stopfn() {
    //   if (this.duration) {
    //     this.audioObj.stop();
    //   }
    // },
    // audioEvents() {
    //   var audio = document.getElementById('audioone');
    //   this.audioObj = audio;
    //   // 当能资源播放的时候，这时候可能只能播放几秒，canplaythrough 这个事件表示资源已经下载完成
    //   audio.oncanplay = () => {
    //     this.duration = audio.duration;
    //     console.log(audio.duration, `duration`);
    //     console.log(`var audio = document.getElementById('audioone');`);
    //   };
    //   // 当资源被下载的时候，值为buffer数据
    //   audio.onprogress = () => {
    //     // console.log(audio.currentTime, audio.duration, `audio.currentTime`);
    //   };
    //   // 当开始执行播放的时候
    //   audio.onplay = () => {
    //     // console.log(`audio.onplay, audio.onplayaudio.onplayaudio.onplay`);
    //     this.status = 'play';
    //   };
    //   audio.onended = () => {
    //     this.status = 'end';
    //   };
    //   // 查询
    //   audio.onseeking = () => {
    //     // console.log(audio.currentTime, audio.duration, `audio.seeking`);
    //   };
    // }
  },
  watch: {
    startPlay(a) {
      if (a) {
        // this.audioEle && this.audioEle.play();
      }
    }
    // duration(a, b) {
    //   if (a) {
    //     // 设置步进
    //     this.step = (this.width - 20) / a;
    //   }
    // }
  },
  beforeDestroy() {
    this.audioEle.removeEventListener('ended', this.playend);
  },
  mounted() {
    this.audioEle = document.getElementById(this.id);
    this.audioEle.addEventListener(`ended`, this.playend, false);
  }
};
</script>

<style scoped lang="less">
.dragLine {
  position: relative;
  height: 30px;
  width: 300px;
  border: solid 1px green;
  .line {
    height: 2px;
    background: red;
    position: absolute;
    top: 14px;
    left: 0px;
    width: 100%;
  }
  .linetwo {
    height: 4px;
    background: orchid;
    position: absolute;
    top: 13px;
    left: 0px;
    width: 0;
  }
  .box {
    height: 20px;
    width: 20px;
    background: black;
    position: absolute;
    left: 0px;
    top: 5px;
    cursor: pointer;
  }
}
// #audioone{
//   width: 600px;
// }
</style>
