<template>
  <div class="timelinectn" :style="ctnStyle">
    <div class="single" :class="{deactive: !item.active}" v-for="item in currentList" :key="item.class" :style="{marginLeft: item.margin}">
      <div class="title">
        <div class="titletext" :title="item.title">
          {{item.title}}
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" ref="triangle" class="triangle">
          <path d="M14 0 L8 12 L20 12 Z" :style="{fill: item.active ? '#179b30' : 'silver' }" stroke-width="1" />
        </svg>
        <div class="roundIcon" :class="item.class">
          <div class="lines" v-if="!item.hideLast" :style="{width: item.line}">
            <div class="timea" v-if="item.timea">{{item.timea}}</div>
          </div>
        </div>
        <!-- <div class="tiemb" v-if="!item.hideLast && item.active"> -->
        <div class="tiemb" v-if="item.active">
          <div class="timebup">{{item.timebup}}</div>
          <div class="timebdown">{{item.timebdown}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const maxWidth = 210;
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    width: {
      type: [Number, String],
      default: 1240
    },
    type: {
      type: String,
      default: 'A'
    }
  },
  data() {
    return {
      stop: 2,
      referr: {
        A: 'typeA', // 车辆信息
        B: 'typeB', // 通话信息
        C: 'typeC',
        D: 'typeD'
      },
      typeA: [
        {
          title: '分配任务',
          icon: 'A',
          class: 'assJob',
          timea: '11:22:33',
          timebup: '2017-04-10',
          timebdown: '11:22:33'
        },
        {
          title: '收到指令',
          icon: 'A',
          class: 'outJob',
          timea: '11:22:33',
          timebup: '2017-04-10',
          timebdown: '11:22:33'
        },
        {
          title: '驶向现场',
          icon: 'A',
          class: 'driveTo',
          timea: '11:22:33',
          timebup: '2017-04-10',
          timebdown: '11:22:33'
        },
        {
          title: '到达现场',
          icon: 'A',
          class: 'ArrivAt',
          timea: '11:22:33',
          timebup: '2017-04-10',
          timebdown: '11:22:33'
        },
        {
          title: '病人上车',
          icon: 'A',
          class: 'onCar',
          timea: '11:22:33',
          timebup: '2017-04-10',
          timebdown: '11:22:33'
        },
        {
          title: '到达医院',
          icon: 'A',
          class: 'ArrivHos',
          timea: '11:22:33',
          timebup: '2017-04-10',
          timebdown: '11:22:33'
        },
        {
          title: '离开医院',
          icon: 'A',
          class: 'outHos',
          timea: '11:22:33',
          timebup: '2017-04-10',
          timebdown: '11:22:33'
        },
        {
          title: '归站时刻',
          icon: 'A',
          class: 'toStation',
          timea: '11:22:33',
          timebup: '2017-04-10',
          timebdown: '11:22:33'
        }
      ],
      typeB: [
        {
          title: '震铃时刻',
          icon: 'A',
          class: 'ring',
          key: 'alertingTime',
          timea: '11:22:33',
          timebup: '2017-04-10',
          timebdown: '11:22:33'
        },
        {
          title: '摘机时刻',
          icon: 'A',
          class: 'onphone',
          key: 'offhookTime',
          timea: '11:22:33',
          timebup: '2017-04-10',
          timebdown: '11:22:33'
        },
        {
          title: '受理时刻',
          icon: 'A',
          class: 'receive',
          key: 'acceptStartTime',
          timea: '11:22:33',
          timebup: '2017-04-10',
          timebdown: '11:22:33'
        },
        {
          title: '受理完成时刻',
          icon: 'A',
          class: 'dispatch',
          key: 'acceptCompleteTime',
          timea: '11:888:33',
          timebup: '2017-04-10',
          timebdown: '11:22:33'
        },
        {
          title: '结束时刻',
          icon: 'A',
          timea: '99999',
          key: 'acceptEndTime',
          class: 'endtime',
          timebup: '2017-04-10',
          timebdown: '11:22:33'
        }
      ]
    };
  },
  computed: {
    ctnStyle() {
      return {
        width: this.$props.width + 'px'
      };
    },
    currentList() {
      // 把本地数据和传递过来的数据进行合并
      let list = this[this.referr[this.type]];
      let listLen = list.length;
      let stage1 = list.map((item, index, array) => {
        let strLen = this.getStringWidth(item.title);
        let setTime = this.list[index]; // 当前节点的时间段 毫秒级别
        if (setTime === 'passthrough') {
          // 说明该段没有值，但是可以直接激活，不显示时间
          return {
            ...item,
            active: index < this.list.length - 1,
            timea: '',
            timebup: '',
            timebdown: '',
            strLen
          };
        }
        let diffTime = ''; // 当前节点和上一个节点的差值
        let nextSetTime = this.list[index + 1]; // 下个节点的时间，用于和当前节点计算，得出相差时间HHMMSS
        if (nextSetTime && setTime && nextSetTime !== 'passthrough') {
          // 10-10 设置一个绝对值，保证不会出现负数
          let diffnumber = Math.abs(nextSetTime - setTime);
          diffTime = ztools.getDiffTimes(diffnumber);
        }
        return {
          ...item,
          active: setTime,
          timea: diffTime,
          timebup: setTime ? ztools.getYMD(setTime) : item.timebup,
          timebdown: setTime ? ztools.getHMS(setTime) : item.timebdown,
          strLen: strLen > maxWidth ? maxWidth : strLen
        };
      });
      let line = Math.round((this.$props.width - listLen * 32 - stage1[0].strLen / 2 - stage1[listLen - 1].strLen / 2) / (listLen - 1));
      let stage2 = stage1
        .map((item, index, array) => {
          return {
            ...item,
            line
          };
        })
        .map((item, index, array) => {
          let margin = 0 + 'px';
          if (index !== 0) {
            margin = line - item.strLen / 2 - array[index - 1].strLen / 2 + 8 + 'px';
          }
          return {
            ...item,
            margin,
            hideLast: index === array.length - 1,
            line: item.line + 'px'
          };
        });
      return stage2;
    }
  },
  methods: {},
  beforeDestroy() { },
  mounted() { }
};
</script>

<style scoped lang="less">
// @import '../assets/css/mixin.less';
// @import '../assets/css/common.less';
.timelinectn {
  display: flex;
  flex-flow: row nowrap;
  font-size: 12px;
  .single {
    position: relative;
    .title {
      position: relative;
      .triangle {
        position: absolute;
        bottom: -12px;
        left: 50%;
        top: 5px;
        margin-left: -15px;
        z-index: 1;
        width: 30px;
        height: 30px;
        transform: rotate(-180deg);
      }
      .titletext {
        height: 24px;
        min-width: 73px;
        position: relative;
        border-radius: 5px;
        background-color: #179b30;
        color: white;
        padding: 0 10px;
        line-height: 24px;
        max-width: 210px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .roundIcon {
      height: 32px;
      width: 32px;
      list-style: 32px;
      text-align: center;
      border-radius: 50%;
      background-color: #179b30;
      margin: 0 auto;
      margin-top: 15px;
      position: relative;
    }
    .roundIcon.assJob {
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAACfElEQVR4nO3bsapcRQCA4TxCOgs7Cx/AQi7BQoSARRA1hXAVAmm0EYxY2aZSQa5VSBdjIVamCcFKBK3ERmOhqYSAoAnBUmLyW+xcGDbnVuI9gf0+WNidmQNT/Zw5nD1x4gjVs4efo9YArK46Vf3Sxr3qhWnulepCdVBdq36s/qqurrlnYAdVe9VPPepcdba6ujBX9cXaewd2yDgCfr8VosvT9/3qZPWxYAGrGbH6ZitCr47xH6a7rJPVh4IFrGJE6aspPg+qlxsP3MdRcL86X33uSAisYsTqyyk896uXFtY9WX27EKrDMcEC/l8jWIf+rs4srHm6urUQqxfHEfFCdWWF7QO7ZCtYH7Tw3lWbVxtmd6tn2rzicLo6vcbegR0zgvXpFKOL29Gq/pzmb1ZPjfGDMfbaOrsHds6I1qUpSp/M0RpHwtvVjeqJafy96ZrX19k9sHNGtD6aAvTZ0vFw4Zqvx/qH1d5x7RfYcSNAF6doXT8qWmPtu1vPtgQLOD4jRO9PEfpuKUTVm1uxuidYwLEb0XpnitHP1XPT/BtbsbpTnVpzz8AOG9F6a4rSb9Xzbd56fziN/+HOCljdiNb5KU4Pqn+m37+LFfDYGNHa71G3xQp47Ixovd3mrzv3q1/FCgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgP/oX4clXiU8bgyNAAAAAElFTkSuQmCC");
      background-position: 5px 5px;
    }
    .roundIcon.outJob {
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAACcElEQVR4nO3csctXVRzH8d8W7Q3h4BJBPAiaWWO0NOTkov0DDY4KzVI0NIRQLeEgDkYQUZMitLgGtYhD5BAtEVQmVNRU74bnPHD4+XML7wP39YIznPO9w/cuH87hXO5ms0P11MHYVQc4FKqnq6/a90P1zNI9ATxk7Kq+7GFnq9em5/aqS9XX1cklewZWaITVp1NI/VW9M83PjOf2qmvT+nfVqaX7B1ZihNWVKYR+r14YtW+mXdaJ6vaOHdj5pd8BWIERVu9uhdXzo3a5ulVdrN4au6ltb1R7S78HsALV+Sl8HlTHp9r1sX511GZ/V2eEFfDYTEfB+9Wxrdr1dvupemWhloG1mgLr4o7arsC6W71UvXowlugbWKHqxerPEUantmq7Auvt9m8K3x/z15fqHVip6o8RQKentUcdCd+r3pzmR5fsHVihKbTOjfkcWPerO9XN6qNRvzBqP1dPLNs9sDrVbyOEPqleHmOvrdvA6nj1zxRoAgt4/Kp/RwhdekT92fa/hD9wQ2ABixlHwKoPt9aPVr9OYfV59eRSfQJsNpvNpvplhNIXY36k+nEKq8/srIBDYwqt76t7U1h9LKyAQ2e6PTxwTVgBh1L1XPt/bfi2+kBYAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8D/4D7YU+1sisJx5AAAAAElFTkSuQmCC");
      background-position: 6px 6px;
    }
    .roundIcon.driveTo {
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAACQklEQVR4nO3aMWvdVRzH4UAzmDFLIRIKrUt9Dy0OgiC1UwoNdHEtFF9Ahw55C6K74OTgYKoZLH0F4tC5UEyGgmLwHXxczoW/yU3TDLk3eJ8HDuee3zlcfnf5cjjctbULqLrIeYCFmwXVyRngypkE1fXpGuDKqXarozE+nwUXwJUzgmrmaNn9ACuu+ngE0ttzxt/VP9XmsnsGVlC1Wf1ZfVptvcf4qnq57L6BFVR9U309Wd+pdk6c+ax6VT2tro3PO6e/DeCSVLerw2pjrG9N3qseTc4dVF9WL0ZofVL9UX2wvO6BlVLdrN5M1rO3rO+rJ5P6fnW/+qh6PWo/VM+W0TewguYE1kb1Y/V7tTWp/1L9VT2vjkftRnVcbS+jd2DFnAysd5zbrB6MsT2p/1Tdu9wuAdb+G1jjD6J71e4ZZ0/tjxvXF4vqF1hhs8Aaj+mNQDqsfj1xbu6+wAIWpvqw+m2E0PqorY9w+rn6dszz9g/GfHe5vwJYGePWtDentl89HvO8/e+EFbBQ1cNxU5reoA5nb1Xn7QMs1HijOhw3p854wzpzHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+r/4FophgkRx6q+gAAAAASUVORK5CYII=");
      background-position: 6px 5px;
    }
    .roundIcon.ArrivAt {
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAABJElEQVR4nO3YuwqAMBAEwPz/T2tlE3wdRJeDmUZsgjZLdsdWMACS3gaRwALiBBbQxhFEc/U7e09+J8CYA+npCRBTuWEZ5IGoFRuWwAJ+IbCANqqju0oIxKwY3QUW8IvqDevuDIBPVTcslRCIMboDbaiEQBvV0V0lBGLcsIA2bFhAG1cVryr9HwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwlR33TjXnJ0IqzgAAAABJRU5ErkJggg==");
      background-position: 7px 6px;
    }
    .roundIcon.onCar {
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAABY0lEQVR4nO3XMWpCQRAGYNN7m9wgnff0CrlETJnW7hXWQggx6J8iig9JfA+VjLDfB9PssjB/M+xMJgAAAABw55Kskiyr+wAYlB/v1X0ADOoPrCSzJN2+Zvuz5ySvv9RLknmSx9oEQDNOBlaXo653f85XkqfaFEATbjCwkmRRmwJowoiVcIzP2hRAE/oD64/76Zj6z56BRvV+Sbsr6q06B9CAkSvfkHV1DqABh5UwycOFtUnyUZ0DaMBhYF3xfpNke8ueAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADuwDd2agJliKjyWAAAAABJRU5ErkJggg==");
      background-position: 6px 5px;
    }
    .roundIcon.ArrivHos {
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAABJElEQVR4nO3ZQQ6AIAwEQP7/ab0aolISoWmcOXLrZdMt7ZjQADJFg0hgAenugij6BrBVH0RPFVBgAelsWEAZMzcsB3kg1RdHd4EFbCGwgDKuYROpfSohkMaGBZQhsIAyor9/o5qYNwHwGzYsoAyBBZQRqX19/XurjgDL2LCAMgQWUMaoBkZlzwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAq5xU794wDCOFLgAAAABJRU5ErkJggg==");
      background-position: 6px 6px;
    }
    .roundIcon.outHos {
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAACPklEQVR4nO3YvYqVVxSA4QGHqI0wYDMyCMbGtKkNFoKNplJwII2tIF6ARYq5BYl9iJWFhX9TKLkCsbAWxLEIJCjewZtmDxzHMzNaeL7iPA9s9tlrLz7WaRabtbLyDarVb8kHWLjqxNiPTl0LwIGqn6v31V/VyeqHqWsCmGs0q13vp64HWHLVT6Mh/XPI+lB9qtamrhlYQtVa9W91sVr/inW7+nvquoElVP1R3Z05n6+u7sm5VL2u7lRHxu+rX34N4DupzlU71fFx/nFmXvXbTN52daN6MZrWhepddWy66oGlUp2p3s6cd2dZ96tbM/HH1a/V2erNiD2ofp+ibmAJzWlYx6uH1atqfSb+rPqvelJ9HLHT1cdqY4ragSWzt2EdkLdWXRtrYyb+qLr8fasEWPm8YVWb1Va1uU/uF/fjxXVlUfUCS2y3YY1heqMh7VTP9+TNvdewgIWpTlUvRxNaHbHV0ZyeVvfGPu9+e+y/TPsvgKUxXk1bc2KPq5tjn3f/p2YFLFR1fbyUZl9QO7uzqsPuARZqzKh2xsupfWZY+94DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAT+x8UlE37qp+gcQAAAABJRU5ErkJggg==");
      background-position: 6px 5px;
    }
    .roundIcon.toStation {
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAACA0lEQVR4nO3bP2pUURjG4YhGTSGSYCOYBYi6hWxAwRXYWFi4BEEUtXAHtjbW9oJW1goRTGGjWGpnjJEYfjZDmIxm4r+ZIfg8cItz7nvhqz4O55w7NzdGda56Xb2rVsZlAWamWq7eVJeqK9XH6vys6wLYpVqsXlWXh+auVe+rM7OsDWBHdbx6Xl3/ybu71Wp1cha1AeyoDlePq/tjMg+rp9XRadYGsEv1oHpUHRqTma+e7JcDmJjqZvXsV1ZO1Ynq5biVGMBEVFd/d2+qOj247vDDXhfARFQXq7d/cvpXna0+DJ8mAkxM9aK68Bffr1Sr/7ImgD1VR6q1kbk71Ua1OXi+VPdGMmvVwnSrBf5r1bFqe2Tuc7U4NF6uNkcy28MZgInbo2FtjYwXqkbmNCxgujQs4MDQsIADQ8MCDozBP4Rfq6XBeKlaH8nMV1vVqaHMN6eEwNRVN6pPgysMG9XtfTLr1a0ZlAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU/Udkcay+JWiIqQAAAAASUVORK5CYII=");
      background-position: 6px 5px;
    }
    .roundIcon.ring {
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAABnUlEQVR4nO3cPUoDQQCAUc8TxCKIiHgCwZvkahbBwgNYexARS0v5LFwx+BcJxs2S92CaZRdmm4+dZZiDgzWqWfVQ3VezdfcDjGYI1hvBAnZLdVgtqtvqcSVYj8O1RXU49jyBPVfNq7vWu6vmY88X2FPD8u/mF7F6c2OZCIziw/+q3xIs4P9VJ4IFTEJ1LljAJFRnggVMQnUqWMAkVMeCBUxCdSRYwCRs+IV1PPa8gT3R696rWXVRLTcI1nJ4duZrC9iqNtss+h3BArZnCNbTH8TqSbCAret9Wbg6LteMT8+M/R7AnurnpaI4AbtjCNb1F7G6Fixg5/R6NtZV9TyMq5yBBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACw414AWevHTL4HQW0AAAAASUVORK5CYII=");
      background-position: 5px 5px;
    }
    .roundIcon.onphone {
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAB+klEQVR4nO3doWuUYQDH8efvERkiBsOSQcRoFINBDGJaMojVaDIvicHgX2A2LsiSiFkWhsFg+hr2bmO3d84gvC/s84Erdxd+6ctzz8HdGBuqa8ePzdcAVmGK1NNqvyN71c2ldwGcMcXqbee9WXobwBnVs5lYVR34aAisxnS6+nZBsKruLr0RYIxxEqy/2Vl6I8AY49Jgfa+2l94IMMY4CdaPjVB97ugbQ/dXwLpUnzaC9XzpTQCzqp2NYO07XQGrVG3N3F89XnoXwDnTPdb7jWAdVFtLbwM4p9qeOWXt+mgIrM50yno9E60d0QJWZ4rW3ky0Hh5Ha3rPg+pVdVvMgMVMETqcidaTKVa7G8+/EC1gMdX96vdMtPZnnqv6WF1fejdwRVX3qp8XBGrOu6U3A1dYdWs6Pf2Lr0vvBa64Tn+J9NclwXq09FaAMcYY1Y3qZfWl0/utw+pDdScX78Aa5Y8qAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA/+gPdvS4ciT/ELoAAAAASUVORK5CYII=");
      background-position: 5px 5px;
    }
    .roundIcon.receive {
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAABzUlEQVR4nO3dMU4bQRiGYc4TIZSS4+QQFL5NSgrEIVAOwRlSubCo3xRehBUF7zpiWNk8j7SNvZZ2mk8z//4zvrpaoPp2eC35DcCnqW6qTfVUbXuznT7bVDdrPyfwhU2zqLtq17zddK9ZF/C5quvqfkFQ/e2+ul77+YEvYppZ/U9YHYaWmRYw3rS0e89rwX3O3drjAC5c+wL7sZrV0sDapRAPjNT+jd8xSwOrarP2eIAL1r5N4aMC62nt8QAXagqi7UwInRJY2xTfgREWBtEpgZXAAoY4MbB+CixgNS1bEj6cEFqWhMA4zRfdq35V3xeElqI7ME7zbQ2vnqvbKbQe37lHWwMwTvONo4d+Vz+ql398p3EUGK/jW3OWsjUHGC+bn4FzkuNlgHOSA/yAc5MjkoFzlD+hAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABvoDDvB7J6ZPCi8AAAAASUVORK5CYII=");
      background-position: 5px 5px;
    }
    .roundIcon.dispatch {
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAB50lEQVR4nO3bMUoDQQCG0ZxHLHKA1HaCeAALsQgWXsITWOUEVp7AygN4ArEIFimsLCSkkt8iEx3X1URJNhDegwU3M4Rs8zEzib0ke/+5egBdKwH6K8ECurdisF6TXFf3h1ZbQOdWCNZjkkGZd1cFa+E5yblwARvXCNZ9I1a3SfplzkVjhdV0k6S/7ecBdlgVrFH5e1Tur6pt31UjTotgLcYfyv0kycG2nwnYUVWwnpLsl+u0vN4vq6ymj2CV9zirxsaxPQQ2IV+3hKMqQoPMz6/aNFdYzXMwwQLWryU2R0mOM/9m8CdtZ1iCBWxWCdY4yazEZvJLiGZlrmAB3cvnlu5wxattCyhYwOatEJ//ECxg/ZJv/ydYe2kZ/2lu6rFtPxew4/L1N1VJMlkyd1rNnQoV0KkkJ5kfrr8luVwyd1hCNU0y7OozAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB04B3cAPP4ejT4KAAAAABJRU5ErkJggg==");
      background-position: 5px 7px;
    }
    .roundIcon.endtime {
      background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAADGElEQVR4nO3cP+iVVRzHcRFqCudAwS1QpEkipKSGmmpJiEBKSAhqc2sQG0LCoCwqh0IoIgj6M0UFEeEQNARSgUNjQYKVaUMNae+G37n0/G5ecfndH3FfL3jg8j3fA+dZPpzz3HufLVtuQLV3/rqReQAbboTS/uq56mz1V+t9Ux2v9gkvYNOMsDrajTsqtIClG2H1ySSMfq5OVu9X56oT1ePVe3OhdUZoAUszwuqzSQh9Xb1c3V8dHrXDk959c+H2hdACNtwIoGNzx7zXx+eHRmB9Pwusybw7x65r5pjQAjZUde8kdE5W91QPV39Ul6o915l7R/XKZP5dy1w7sGImz6SuTHdI1YOjfmhS2z6eY52Z1PZWV0fva8teP7BCqt9H2Jydq++p3qwuTmpHRu+Lc70fj/pvy1o3sGLGw/O/R9icWtDzQ/V59c7o+6jaPtfz2OxMuJyVAytnBNbMWwt6Xp30fFXdWj1Rna6erw5U91V/Cixgw8wF1qcLek6O8SPVS13buWrXstcPrJC5I+EzC3puGn1H5kLqwrhmfqm2LfsegBVS/ToC56fr9GwdgTR1urWH8lMvLHPtwIpp/V9tdi7o2TXpuVgdHIH1SHWq+nZyNNy67HsAVkR19ySMzlS3X6Pn4KTn/KT+6NhlnZuMCyxg47T2rd/Mk9WOufH9CwJr/kh4QWABG6raUb09CZ4T0+Nhdct0FzapH6/OV5fH2IebcwfASql2tv43V1erQ9XN1bbq2da+UXyjemruenfMuW2z7wNYEWOndaB/f+owc2mMf9liHzgOApti7Kyern6srozantZeI/PdCKnLrb0L64Fq92avGeA/qt2za7PXAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/L/9A9nwWuFGEspyAAAAAElFTkSuQmCC");
      background-position: 5px 5px;
    }
    .lines {
      width: 400px;
      position: absolute;
      left: 99%;
      top: 50%;
      margin-top: -3px;
      border-top: solid 6px #179b30;
    }
    .timea {
      height: 16px;
      line-height: 16px;
      color: white;
      width: 60px;
      background-color: #179b30;
      margin: 0 auto;
      margin-top: 6px;
      border-radius: 5px;
      padding: 0 5px;
    }
    .tiemb {
      width: 70px;
      margin: 0 auto;
      margin-top: 10px;
      div {
        height: 16px;
        line-height: 16px;
      }
    }
  }
  .single.deactive {
    color: red;
    .lines {
      border-top: solid 6px silver;
    }
    .roundIcon {
      background-color: silver;
    }
    .title {
      .titletext {
        background: silver;
      }
    }
  }
}
</style>