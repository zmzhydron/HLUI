import { fromJS, is as immutableIS } from 'immutable';
export const getSessionItems = key => {
  let str = sessionStorage.getItem(key);
  if (str === null) {
    return null;
  }
  let r = '';
  try {
    r = JSON.parse(str);
  } catch (e) {
    r = str;
  }
  return r;
};
export const trimObjsAll = obj => {
  const isEmpty = val => {
    let r = false;
    switch (Object.prototype.toString.call(val)) {
      case '[object Object]':
        if (Object.keys(val).length === 0) {
          r = true;
        }
        break;
      case '[object Number]':
        if (val === 0) {
          r = true;
        }
        break;
      case '[object String]':
        if (val.length === 0) {
          r = true;
        }
        break;
      case '[object Array]':
        if (val.length === 0) {
          r = true;
        }
        break;
      case '[object Null]':
        r = true;
        break;
      case '[object Undefined]':
        r = true;
        break;
    }
    return r;
  };
  let o = {};
  for (let [key, value] of Object.entries(obj)) {
    let empty = isEmpty(value);
    if (!empty) {
      o[key] = value;
    }
  }
  return o;
}
export const calcMarginBaseOnAngle = angle => {
  let left = -24;
  let top = 40;
  if (angle > 0 && angle <= 10) {
    // return parseInt((16 / 45) * angle) + "px";
    top = parseInt((5 / 10) * angle) + top;
  } else if (angle > 10 && angle <= 20) {
    // top = parseInt((9 / 10) * (angle - 10)) + top;
    top = 48;
    left = Math.abs(parseInt((9 / 10) * (angle - 10))) + left;
  } else if (angle > 20 && angle <= 30) {
    // top = parseInt((13 / 10) * (angle - 20)) + top;
    top = 53;
    left = Math.abs(parseInt((15 / 10) * (angle - 20))) + left;
  } else if (angle > 30 && angle <= 40) {
    // top = parseInt((23 / 10) * (angle - 30)) + top;
    top = 62;
    left = Math.abs(parseInt((14 / 10) * (angle - 30))) + left;
  } else if (angle > 40 && angle <= 50) {
    // top = parseInt((22 / 10) * (angle - 40)) + top;
    top = 67;
    left = Math.abs(parseInt((22 / 10) * (angle - 40))) + left;
  } else if (angle > 50 && angle <= 60) {
    // top = parseInt((23 / 10) * (angle - 50)) + top;
    top = 72;
    // left = Math.abs(parseInt((29 / 10) * (angle - 50))) + left;
    left = -5;
  } else if (angle > 60 && angle <= 70) {
    // top = parseInt((23 / 10) * (angle - 60)) + top;
    left = 6;
    // left = Math.abs(parseInt((34 / 10) * (angle - 60))) + left;
    top = 65;
  } else if (angle > 70 && angle <= 80) {
    top = 65;
    left = 12;
    // top = parseInt((23 / 10) * (angle - 70)) + top;
    // left = Math.abs(parseInt((40 / 10) * (angle - 70))) + left;
  } else if (angle > 80 && angle <= 90) {
    top = 65;
    left = 18;
    // top = parseInt((16 / 10) * (angle - 80)) + top;
    // left = Math.abs(parseInt((45 / 10) * (angle - 80))) + left;
  } else if (angle > 90 && angle <= 100) {
    top = 55;
    left = 24;
    // top = parseInt((7 / 10) * (angle - 90)) + top;
    // left = Math.abs(parseInt((52 / 10) * (angle - 90))) + left;
  } else if (angle > 100 && angle <= 110) {
    top = 40;
    left = 31;
    // top = parseInt((7 / 10) * (angle - 100)) + top;
    // left = Math.abs(parseInt((57 / 10) * (angle - 100))) + left;
  } else if (angle > 110 && angle <= 120) {
    // top = parseInt((-11 / 10) * (angle - 110)) + top;
    top = 39;
    // left = Math.abs(parseInt((57 / 10) * (angle - 110))) + left;
    left = 36;
  } else if (angle > 120 && angle <= 130) {
    top = 35;
    left = 43;
    // top = parseInt((-11 / 10) * (angle - 120)) + top;
    // left = Math.abs(parseInt((65 / 10) * (angle - 120))) + left;
  } else if (angle > 130 && angle <= 140) {
    top = parseInt((-11 / 10) * (angle - 130)) + top;
    // left = Math.abs(parseInt((74 / 10) * (angle - 130))) + left;
    left = 50;
  } else if (angle > 140 && angle <= 150) {
    top = 21;
    left = 50;
    // top = parseInt((-20 / 10) * (angle - 140)) + top;
    // left = Math.abs(parseInt((74 / 10) * (angle - 140))) + left;
  } else if (angle > 150 && angle <= 160) {
    top = 12;
    left = 41;
    // top = parseInt((-26 / 10) * (angle - 150)) + top;
    // left = Math.abs(parseInt((74 / 10) * (angle - 150))) + left;
  } else if (angle > 160 && angle <= 170) {
    top = 7;
    left = 40;
    // top = parseInt((-35 / 10) * (angle - 160)) + top;
    // left = Math.abs(parseInt((68 / 10) * (angle - 160))) + left;
  } else if (angle > 170 && angle <= 180) {
    top = 2;
    left = 46;
    // top = 0;
    // left = Math.abs(parseInt((68 / 10) * (angle - 170))) + left;
  } else if (angle > 180 && angle <= 190) {
    top = -5;
    left = 44;
    // top = parseInt((-47 / 10) * (angle - 180)) + top;
    // left = Math.abs(parseInt((68 / 10) * (angle - 180))) + left;
  } else if (angle > 190 && angle <= 200) {
    top = -8;
    left = 36;
    // top = parseInt((-52 / 10) * (angle - 190)) + top;
    // left = Math.abs(parseInt((64 / 10) * (angle - 190))) + left;
  } else if (angle > 200 && angle <= 210) {
    top = -21;
    left = 46;
    // top = parseInt((-60 / 10) * (angle - 200)) + top;
    // left = Math.abs(parseInt((64 / 10) * (angle - 200))) + left;
  } else if (angle > 210 && angle <= 220) {
    top = -14;
    left = 25;
    // top = parseInt((-60 / 10) * (angle - 210)) + top;
    // left = Math.abs(parseInt((55 / 10) * (angle - 210))) + left;
  } else if (angle > 220 && angle <= 230) {
    top = -14;
    left = 19;
    // top = parseInt((-60 / 10) * (angle - 220)) + top;
    // left = Math.abs(parseInt((47 / 10) * (angle - 220))) + left;
  } else if (angle > 230 && angle <= 240) {
    top = -33;
    left = 28;
    // top = parseInt((-60 / 10) * (angle - 230)) + top;
    // left = Math.abs(parseInt((41 / 10) * (angle - 230))) + left;
  } else if (angle > 240 && angle <= 250) {
    top = -26;
    left = 12;
    // top = parseInt((-60 / 10) * (angle - 240)) + top;
    // left = Math.abs(parseInt((36 / 10) * (angle - 240))) + left;
  } else if (angle > 250 && angle <= 260) {
    top = -26;
    left = 6;
    // top = parseInt((-60 / 10) * (angle - 250)) + top;
    // left = Math.abs(parseInt((30 / 10) * (angle - 250))) + left;
  } else if (angle > 260 && angle <= 270) {
    top = -26;
    left = 0;
  } else if (angle > 270 && angle <= 280) {
    top = -26;
    left = -7;
    // top = parseInt((-51 / 10) * (angle - 270)) + top;
    // left = Math.abs(parseInt((17 / 10) * (angle - 270))) + left;
  } else if (angle > 280 && angle <= 290) {
    top = -11;
    left = -12;
    // top = parseInt((-42 / 10) * (angle - 280)) + top;
    // left = Math.abs(parseInt((14 / 10) * (angle - 280))) + left;
  } else if (angle > 290 && angle <= 300) {
    top = -5;
    left = -20;
    // top = parseInt((-42 / 10) * (angle - 290)) + top;
    // left = Math.abs(parseInt((6 / 10) * (angle - 290))) + left;
  } else if (angle > 300 && angle <= 310) {
    top = 6;
    left = -20;
    // top = parseInt((-26 / 10) * (angle - 300)) + top;
    // left = Math.abs(parseInt((8 / 10) * (angle - 300))) + left;
  } else if (angle > 310 && angle <= 320) {
    top = 13;
    left = -22;
    // top = parseInt((-20 / 10) * (angle - 310)) + top;
    // left = Math.abs(parseInt((8 / 10) * (angle - 310))) + left;
  } else if (angle > 320 && angle <= 330) {
    top = 22;
    left = -22;
    // top = parseInt((-16 / 10) * (angle - 320)) + top;
    // left = Math.abs(parseInt((-6 / 10) * (angle - 320))) + left;
  } else if (angle > 330 && angle <= 340) {
    top = 22;
    left = -34;
    // top = parseInt((-11 / 10) * (angle - 330)) + top;
    // left = Math.abs(parseInt((-6 / 10) * (angle - 330))) + left;
  } else if (angle > 340 && angle <= 350) {
    top = 31;
    left = -34;
    // top = parseInt((-6 / 10) * (angle - 340)) + top;
    // left = Math.abs(parseInt((-6 / 10) * (angle - 340))) + left;
  }
  return {
    top: top + "px",
    left: left + "px"
  }
}

export const wgs84togcj02 = function wgs84togcj02 (lng, lat) {
  var lat = +lat;
  var lng = +lng;
  // if (out_of_china(lng, lat)) {
  //   return [lng, lat]
  // } else {

  // }
  var dlat = transformlat(lng - 105.0, lat - 35.0);
  var dlng = transformlng(lng - 105.0, lat - 35.0);
  var radlat = lat / 180.0 * PI;
  var magic = Math.sin(radlat);
  magic = 1 - ee * magic * magic;
  var sqrtmagic = Math.sqrt(magic);
  dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
  dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
  var mglat = lat + dlat;
  var mglng = lng + dlng;
  return [mglng, mglat]
};
export const domwloadS = (url, method = `get`) => (params = { name: 1 }) => {
  // const locations = '192.168.7.247:18080'; // 开发环境。
  // // const locations = window.location.host;
  let prefix = getSessionItems(`AudioPrefix`);
  // url = NODEENV.prefixUrl + url;
  url = prefix + url;
  // window.location.href = url;
  // http://bos.nj.bpc.baidu.com/v1/baiduplayer/player/BaiduPlayer5Setup_5.exe  //for test only;
  let r = window.open(url);
  setTimeout(() => {
    r.close();
  }, 100);



  // let paramsObj = Object.keys(params).map(item => {
  //   // return `<input type='hidden' name='${item}' value=${params[item]}/>`;
  //   return `<input type='hidden' name='' value=''/>`;
  // });
  // let form = document.createElement("form");
  // ztools.log(url, 'purple', 66);
  // form.action = url;
  // form.method = method;
  // // if (paramsObj.length) {
  // //   form.innerHTML = paramsObj.join('');
  // // }
  // document.body.appendChild(form);
  // // nexttick
  // setTimeout(() => {
  //   form.submit();
  //   document.body.removeChild(form);
  //   // 避免内存泄漏
  //   form = null;
  // }, 0);



  // var $form = $('<form method="GET"></form>');
  // $form.attr('action', url);
  // $form.appendTo($('body'));
  // $form.submit();
  // $form.remove();
}
// 去除掉手机前面的0，让其
export const removeCellPhoneZero = number => {
  // 区分是否为移动电话和固话，固话的话则直接返回
  number = number + '';
  if (/^(010|0[2-9]+\d)/.test(number + '')) {
    return number;
  } else {
    if ((number + '').substr(0, 1) === '0') {
      // 如果手机号之前已经有0；
      return number.substr(1);
    }
    return number;
  }
}
export const copyText = text => {
  var input = document.createElement("input");
  input.value = text;
  input.type = 'text';
  input.style.cssText = `position: absolute; top: -10000px;`;
  document.body.appendChild(input);
  input.select(); // 选择输入框内容；
  document.execCommand("copy"); //执行粘贴操作;
  document.body.removeChild(input);
  log('复制成功，值为：' + text, 'blue', 38);
}
export const pasteText = () => {

}
export const s = path => key => state => {
  // 获取全局store某个特定属性
  // params
  // path: store的路径, String Or [Array]
  // key:  属性的名称
  // let pathstr = path+'.';
  // let stateStr = JSON.stringify(state);
  // if (typeof path !== 'string') {
  //   pathstr = path.map(item => item + '.').join('');
  // }
  // console.log(pathstr, '$$$$$$$$$$$$');
  // return new Function(`
  //   try{
  //     return ${stateStr}.${pathstr}${key};
  //   }catch(e){
  //     return false;
  //   }
  // `)();
  if (typeof path === 'string') {
    return state[path][key];
  } else {
    let pathstr = path.map(item => item + '.').join('');
    return eval(`state.${pathstr}${key}`);
  }
};
export const isOjbectEqual = (a, b) => {
  return immutableIS(fromJS(a), fromJS(b));
}
export const getBlackInvalidTime = () => {
  // zmz 9-20 根据配置文件设置黑名单失效时间; 单位为秒
  let userConfig = ztools.getSessionItems('userConfig');
  let expireTime = 100;
  if (userConfig && userConfig.centerConfigVO) {
    expireTime = userConfig.centerConfigVO.centerConfig.blackInvalidTime.dataValue;
  }
  return expireTime + '';
}
export const g = path => key => getters => {
  // 获取全局store getters某个特定属性
  // params
  // path: store的路径, String Or [Array]
  // key:  属性的名称
  if (typeof path === 'string') {
    return getters[path][key];
  } else {
    let pathstr = path.map(item => item + '.').join('');
    return eval(`getters.${pathstr}${key}`);
  }
};
function ConvertoDate (value) {
  let date = false;
  if (value === null) {
    // 空情况下直接得到1970的数据，需要返回false
    date = false;
  } else {
    if (/^\d+$/.test(value)) {
      value = parseInt(value);
    }
    date = new Date(value);
    if (date.toString() === 'Invalid Date') {
      date = false;
    }
  }
  return date;
}
// 获取年月日
export const getYMD = (dateString, dot = '-') => {
  let date = ConvertoDate(dateString);
  if (!date) {
    return '';
  }
  return `${date.getFullYear()}${dot}${date.getMonth() + 1}${dot}${date.getDate()}`;
};
// 获取时分秒
export const getHMS = (dateString, dot = ':') => {
  let date = ConvertoDate(dateString);
  if (!date) {
    return '';
  }
  let m = date.getMinutes() + '';
  let h = date.getHours() + '';
  let s = date.getSeconds() + '';
  return `${h.length === 1 ? '0' + h : h}${dot}${m.length === 1 ? '0' + m : m}${dot}${s.length === 1 ? '0' + s : s}`;
};
// 获取 年 月日 时分秒
export const getYMDHMS = (dateString, dot = ':') => {
  let date = ConvertoDate(dateString);
  if (!date) {
    return '';
  }
  let y = date.getFullYear() + '';
  let m = date.getMinutes() + '';
  let h = date.getHours() + '';
  let s = date.getSeconds() + '';
  return `${y}-${date.getMonth() + 1}-${date.getDate()} ${h.length === 1 ? '0' + h : h}${dot}${m.length === 1 ? '0' + m : m}${dot}${s.length === 1 ? '0' + s : s}`;
};
export const getPhoneName = book => number => {
  number = number + '';
  // 判断是否为手机，手机则匹配第一次，第一次匹配失败则判断是否前置有0，有0则去掉再次匹配;
  if (/^(010|0[2-9]+\d)/.test(number)) {
    return book[number];
  } else {
    let r = book[number];
    if (r) {
      return r;
    } else {
      if ((number + '').substr(0, 1) === '0') {
        // 如果手机号之前已经有0；
        return book[number.substring(1)];
      }
    }
  }
}
// 获取月日 时分秒
export const getMDHMS = (dateString, dot = ':') => {
  let date = ConvertoDate(dateString);
  if (!date) {
    return '';
  }
  let m = date.getMinutes() + '';
  let h = date.getHours() + '';
  let s = date.getSeconds() + '';
  return `${date.getMonth() + 1}-${date.getDate()} ${h.length === 1 ? '0' + h : h}${dot}${m.length === 1 ? '0' + m : m}${dot}${s.length === 1 ? '0' + s : s}`;
};
// 获取时间差值
export const getDiffTimes = (dateString, dot = ':') => {
  if (!/^\d+$/.test(dateString)) {
    return '';
  }
  dateString = parseInt(dateString);
  dateString = Math.round(dateString / 1000);
  let isMinus = dateString < 0 ? '-' : '';
  dateString = Math.abs(dateString);
  let h = Math.floor(dateString / (60 * 60));
  let m = Math.floor((dateString - h * 60 * 60) / 60);
  let s = Math.ceil((dateString - h * 60 * 60 - m * 60));
  h = (h + '').length === 1 ? '0' + h : h;
  m = (m + '').length === 1 ? '0' + m : m;
  s = (s + '').length === 1 ? '0' + s : s;
  return `${isMinus}${h}:${m}:${s}`;
};
export const deleteCookie = key => {
  document.cookie
    .split(';')
    .map(item => {
      let index = item.indexOf('=');
      return {
        key: item.substring(0, index).trim(),
        value: item.substring(index + 1).trim()
      };
    })
    .forEach(item => {
      document.cookie = item.key + '=; Path=/; Max-Age=-99999999; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    });
};
export const makeRandomShit = (num = 10) => {
  return Array.from({ length: num })
    .map(item => String.fromCharCode(Math.floor(Math.random() * (122 - 97) + 97)))
    .join('');
};
// 判断是否为非数字或则等于0
export const validPos = num => {
  return ztools.isNumber(num) ? (parseInt(num) === 0 ? false : true) : false;
}
export const setSessionItems = (key, value) => {
  let type = Object.prototype.toString.call(value);
  if (['[object Array]', '[object Object]'].includes(type)) {
    value = JSON.stringify(value);
  }
  sessionStorage.setItem(key, value);
};
// delay 延迟， 默认300毫秒
// callback 回调执行函数
export const throttle = (callback, delay = 300) => (context = null) => {
  let oldtime = 0;
  let nowtime = new Date().valueOf();
  let timer = null;
  return function () {
    nowtime = new Date().valueOf();
    clearTimeout(timer);
    if (nowtime - oldtime > delay) {
      callback.apply(context, arguments);
      oldtime = new Date().valueOf();
    }
    // timer = setTimeout(() => {
    //   callback.apply(context, arguments);
    // }, delay);
  }
}
export const callOnce = (callback, context = null) => {
  return function () {

  }
}
export const removeSessionItems = key => {
  sessionStorage.removeItem(key);
}
export const isCallActive = () => {
  // 是否激活了话机
  let userConfig = ztools.getSessionItems('userConfig');
  if (userConfig) {
    return parseInt(userConfig.centerInfoVo.isActiveCall) === 1;
  } else {
    return false;
  }
}
export const setLocalStorage = (key, value) => {
  if (localStorage) {
    if ([`[object Object]`, `[object Array]`].includes(Object.prototype.toString.call(value))) {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }
};
// 为了避免泄露隐私，需要把查询的电话号码
export const blurPhoneNumber = number => {
  number = number + '';
  if ((number + '').substr(0, 1) === '0') {
    // 如果手机号之前已经有0；
    number = (number + "").substr(1);
  }
  return number.substr(0, number.length - 4) + '0000';
}
export const isEmpty = val => {
  let r = false;
  switch (Object.prototype.toString.call(val)) {
    case '[object Object]':
      r = Object.keys(val).length === 0;
      break;
    case '[object Number]':
      r = val === 0;
      break;
    case '[object String]':
      r = val === '';
      break;
    case '[object Array]':
      r = val.length === 0;
      break;
    case '[object Null]':
      r = true;
      break;
    case '[object Undefined]':
      r = true;
      break;
  }
  if (isNaN(val)) {
    r = true;
  }
  return r;
};
export const getLocalStorage = key => {
  if (localStorage) {
    let str = localStorage.getItem(key);
    if (str === null) {
      return '';
    }
    let r = '';
    try {
      r = JSON.parse(str);
    } catch (e) {
      r = str;
    }
    return r;
  }
  return '';
};
export const deepClone = obj => {
  return fromJS(obj).toJS();
};
export const toKM = number => {
  let raw1 = number / 1000;
  raw1 = raw1 > 10 ? parseInt(raw1 * 100) / 100 : parseInt(raw1 * 1000) / 1000;
  return raw1 + 'km';
};
export const typeOF = value => {
  return Object.prototype.toString.call(value);
};
export let chunks = (list, number) => {
  return Array.from({ length: Math.ceil(list.length / number) }).map((item, i) => {
    return list.slice(i * number, (i + 1) * number);
  })
}
export const trimObject = (obj, refmap) => {
  let newObj = {};
  Object.keys(obj).forEach(item => {
    let match = refmap.includes(item);
    let val = obj[item];
    if (match) {
      if (!isEmpty(val)) {
        newObj[item] = val;
      }
    } else {
      newObj[item] = val;
    }
  })
  return newObj;
}
export const isNumber = (value, allowZero = true) => {
  value = value + '';

  function validateCore (value) {
    let val = Number(value);
    if (isNaN(val)) {
      return false;
    }
    if ((val + '').length !== (value + '').length) {
      return false;
    }
    return Object.prototype.toString.call(val) === '[object Number]';
  }
  // 如果前面有0;
  if (parseInt(value.substr(0, 1)) === 0 && value.length > 1 && allowZero) {
    value = value.split('').filter(item => item !== '0').join('');
    return validateCore(value.substr(1));
  } else {
    return validateCore(value);
  }
};
export const isArray = val => {
  return Object.prototype.toString.call(val) === '[object Array]';
};
export const sortMethod = (cb = (a, b) => [a, b]) => (a, b, type) => {
  let [a1, b1] = cb(a, b);
  let truly = type === 'asc' ? 1 : -1;
  let falsly = type === 'asc' ? -1 : 1;
  return a1 === b1 ? 0 : a1 > b1 ? truly : falsly;
};
export function log (msg, color = 'green', size = 20) {
  let args = [...arguments].slice(3);
  console.log(`%c ${msg}`, `color: ${color}; font-size: ${size}px`);
  if (args.length) {
    console.log.apply(null, args);
  }
}
export const validateMixins = {
  data () {
    return {
      errormsg: ''
    }
  },
  methods: {
    clearErrors () {
      this.errormsg = '';
    },
    async validate (val) {
      let r = await this.validateCore(this.valiObjs, val);
      let { ok, errormsg } = r;
      if (ok === 0) {
        this.errormsg = errormsg;
      } else {
        this.errormsg = '';
      }
      return {
        isError: !ok,
        value: val,
        errormsg: this.errormsg
      }
    },
    // 对外暴露的验证接口
    async validateFn () {
      let r = await this.validate(this.value);
      return r;
    },
    // 如果这是一个父组件，其包含了多个有validateFn方法的子组件，这可以作为验证总入口;
    async validateAll () {
      if (!this.refList || this.refList.length === 0) {
        console.warn(`没有reflist 验证失败`);
        return false;
      }
      let prolist = this.refList
        .filter(item => {
          return this.$refs[item] && this.$refs[item].validateFn;
        })
        .map(item => {
          return this.$refs[item].validateFn();
        });
      let r = await Promise.all(prolist);
      return r;
    }
  },
  props: {
    mixinClass: {
      // 自定义的类名
      type: [Array, String],
      default: ''
    },
    showArrow: {
      // 是否显示左上角标识需要验证的三角标
      type: Boolean,
      default: true
    },
    valiObj: {
      type: Object,
      default: () => {
        return {
          active: false, // 是否要求验证,
          required: true,
          errorPos: 'Bottom', // 错误信息定位
          method: 'change', // change表示输入的时候就要验证，blur则表示失去焦点的时候验证
          msg: '需要添加错误提示信息'
        };
      }
    }
  },
  computed: {
    classObj () {
      let mixinClass = {};
      if (this.mixinClass) {
        if (ztools.isArray(this.mixinClass)) {
          this.mixinClass.forEach(item => {
            mixinClass[item] = true;
          })
        } else {
          mixinClass = {
            [this.mixinClass]: true
          }
        }
      }
      return {
        showTitle: this.showTitle,
        isError: this.showError,
        showArrow: this.showArrow && this.valiObjs.required,
        showError: this.valiObjs.active,
        errorRight: this.errorRight,
        ...mixinClass
      };
    },
    valiObjs () {
      let { active = false, type = 'string', transform = val => val, descriptor = false, required = true, errorPos = 'Bottom', method = 'change', msg = '需要添加错误提示信息' } = this.valiObj;
      return {
        active,
        required,
        errorPos,
        transform,
        descriptor,
        method,
        type,
        msg
      };
    },
    errorRight () {
      return this.valiObjs.errorPos.toLowerCase() === 'right';
    },
    erorrActive () {
      return this.valiObj.active;
    },
    showError () {
      return this.errormsg && this.errormsg.length && this.erorrActive
    },
    showTitle () {
      return this.title.length;
    }
  }
}
export const rightMenuMixins = {
  data () {
    return {
      showContent: false,
      contentMemuPos: {},
      contentMenuData: []
    }
  },
  methods: {
    changeshowContent (value) {
      this.showContent = value;
    },
    rightmenufn (event) {
      event.preventDefault();
      let target = event.target;
      let classList = target.classList;
      while (!classList.contains(`ivu-table-row`) && !classList.contains('ivu-table-body')) {
        target = target.parentNode;
        classList = target.classList;
      }
      // 由于可能是点击的tbody空白处，所以需要判断是否是tr
      if (target.classList.contains(`ivu-table-row`)) {
        // 右键选中的时候，同时也要选中这条数据
        if (!this.dontClickBySelect) {
          target.click();
        }
        let index = target.querySelector(`.hiddenIndex`).getAttribute(`data-index`);
        let data = this.currentList[parseInt(index)];
        this.showContentMenu(data, event.clientX, event.clientY);
      }
    },
    addRightmenu (eleString) {
      this.$el.querySelector(eleString).addEventListener(
        'contextmenu',
        this.rightmenufn,
        false
      );
      document.addEventListener('click', this.clearContentMenu, false);
      this.$el.addEventListener('mousewheel', this.clearContentMenu, false);
    },
    removeMenuEvents (eleString) {
      this.$el.removeEventListener('click', this.clearContentMenu);
      this.$el.removeEventListener('mousewheel', this.clearContentMenu);
      this.$el.querySelector(eleString).removeEventListener(
        'contextmenu',
        this.rightmenufn,
        false
      );
    },
    // 移除右键菜单
    clearContentMenu () {
      this.showContent = false;
    },
    // 表格项右键菜单
    showContentMenu (item, x, y) {
      this.selectTdIndex = item.ambId;
      this.contentMenuData = item;
      this.showContent = true;
      this.contentMemuPos = {
        x,
        y
      };
    }
  }
};

export const downloadMixins = {
  methods: {
    downoloads (url, params = {}) {
      // url string
      // params Object
      let paramsInputString = [];
      for (let [value, key] of Object.entries(params)) {
        paramsInputString.push(`<input type='hidden' name='${key}' value=${value}/>`);
      }
      paramsInputString = paramsInputString.join('');
      // todo 在部署后需要动态获取该地址。
      // let fullurl = `http://${pkg.config.devHost +":"+pkg.config.devPort}/api/entity/manager/export`
      //   $(`<form method='get'  action='${url}'>
      //     <input type='hidden' name='zhangmingzhi' value='creator'/>;
      //   </form>`)
      //   .appendTo('body')
      //   .HTML(paramsInputString)
      //   .submit()
      //   .remove();
    }
  }
};
// render函数，用于table的文字超过宽度隐藏的显示。
export const overflowRender = (key, cb = val => val[key]) => (h, params) => {
  let text = cb(params.row);
  let title = text;
  if (!text) {
    text = '-'
  }
  if (Object.prototype.toString.call(text) === `[object Object]`) {
    title = text.title;
    text = text.text;
  }
  return (< span title={title} class="tableCellwarp"> {text} </span>)
};