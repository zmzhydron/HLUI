import axios from 'axios';
let spinList = []; // 旋转的窗口的list，只要有内容就一直旋转.
const __spin__ = window.__spin__;
const hideSpinFn = singleSpin => {
  let index = spinList.findIndex(item => item === singleSpin);
  if (index > -1) {
    spinList = [...spinList.slice(0, index), ...spinList.slice(index + 1)];
  }
  if (!spinList.length) {
    __spin__ && __spin__(false);
  }
}
const baseObject = {
  url: '',
  hideSpin: false,
  urlHeader: '',
  crossBaseUrl: '',
  params: {},
  returnPromise: false,
  susccessMsg: '',
  headers: {},
  showErrorMsg: true,
  callBack: () => { },
  errorBack: () => { },
  config: {},
}
const blacklistofcode = [6005]; // 返回错误码黑名单，符合黑名单的，则不弹出错误显示。
async function universal ({ type, urlHeader, url, params, headers, callBack, errorBack,
  hideSpin, returnPromise = false, susccessMsg,
  crossBaseUrl, showErrorMsg = true, config = {} }) {
  const errorFn = (response = {}, showErrorMsg) => {
    let { code } = response;
    if (code === 'ECONNABORTED') {
      // 超时调用
      ztools.log(`${url} 超过 ${config.timeout} 毫秒后 调用失败!`, 'red', 22);
      return false;
    } else {
      if (response) {
        let msg = response;
        if (['[object Error]', '[object DOMException]'].includes(Object.prototype.toString.call(response))) {
          msg = response.message;
        }
        if (Object.prototype.toString.call(response) === `[object Object]`) {
          msg = response.message;
        }
        ztools.log(`__msgErr__`, 'purple', 36, "msg::" + msg, `response` + response);
        if (__msgErr__ && msg && showErrorMsg) {
          __msgErr__(msg);
        }
      }
      return false;
    }
  }
  const successFn = (response = {}) => {
    let { data: responsedata = {} } = response;
    if (urlHeader === `gloalbal`) {
      return responsedata;
    }
    if (responsedata) {
      let { success, data, message } = responsedata;
      message = message === null ? '' : message;
      if (success) {
        if (susccessMsg) {
          // 如果成功的话，有成功信息的话，则显示该信息
          __msgOk__(susccessMsg);
        }
        return data;
      } else {
        // 判断登出
        let { data } = response;
        if (data) {
          let { code } = data;
          if (code === 406) {
            window.hack && window.hack.loginoutcallback && window.hack.loginoutcallback();
            _$route_ && _$route_.push({ path: '/' });
          } else if (code !== 406 && __msgErr__ && message && showErrorMsg) {
            if(!blacklistofcode.includes(parseInt(code))){
              __msgErr__(message);
            }
          }
        }
        return false;
      }
    } else {
      return false;
    }
  }
  let singleSpin = '';
  if (!hideSpin) {
    if (__spin__) {
      singleSpin = (new Date().valueOf() + "").substr(0, 4) + ztools.makeRandomShit();
      if (!spinList.length) {
        __spin__(true);
      }
      spinList.push(singleSpin);
    }
  }
  // 动态配置服务器IP地址
  if (urlHeader !== 'gloalbal' && urlHeader !== 'cross') {
    // 说明url请求为外链，不做url拼接
    url = urlHeader + url;
  }
  if (urlHeader === `cross`) {
    headers = {
      ...headers,
      'Allow-Control-Allow-Origin': '*'
    }
  }
  let ax = axios.create({
    headers,
  });
  let response = null;
  let iserror = false;
  if (type === 'post') {
    response = await ax[type](url, params, config)
      .catch(error => {
        ztools.log(`await ajax catch errors : ${type}, ${url}`, 'red', '32', error);
        iserror = true;
        return error;
      });
  } else {
    response = await ax[type](url, {
      ...config,
      params
    }).catch(error => {
      // ztools.log(`await ajax catch errors : ${type}, ${url}`, 'red', '32', error);
      iserror = true;
      return error;
    })
  }
  let data = iserror ? errorFn(response, showErrorMsg) : successFn(response, susccessMsg, showErrorMsg);
  if (url === `//acceptInfo/systemTime`) {
    // ztools.log('//acceptInfo/systemTime', 'green', 16, response, "iserror:::" + iserror);
  }
  // iserror 在success为false的情况下也要设置为true
  iserror = data === false;
  hideSpinFn(singleSpin);
  if (returnPromise) {
    return {
      data,
      response
    }
  } else {
    if (iserror) {
      errorBack(data, response);
    } else {
      callBack(data, response);
    }
  }
}
// 普通请求
const cores = type => (url, hideSpin = false, urlHeader = '', crossBaseUrl) => (params = {}, susccessMsg = '', headers = {}, showErrorMsg = true) => (callBack = () => { }, errorBack = () => { }) => {
  return universal({ type, urlHeader, url, params, headers, callBack, errorBack, hideSpin, susccessMsg, crossBaseUrl, showErrorMsg });
};
const newcores = type => (obj = {}) => {
  if (!obj.url) {
    ztools.log('url为空 ajax调用失败', 'red', 32);
    return false;
  }
  return universal({
    type,
    ...baseObject,
    ...obj,
  });
};
// 返回一个promise请求
const pcores = type => (obj = {}) => {
  return newcores(type)({
    returnPromise: true,
    ...obj
  })
};
export const newget = newcores('get');
export const newpost = newcores('post');
export const get = cores('get');
export const post = cores('post');
export const put = cores('put');
export const deleted = cores('delete');
export const Pget = pcores('get');
export const Ppost = pcores('post');

function urlencodeFormData (fd) {
  var s = '';
  function encode (s) {
    return encodeURIComponent(s).replace(/%20/g, '+');
  }
  for (var pair of fd.entries()) {
    if (typeof pair[1] === 'string') {
      s += (s ? '&' : '') + encode(pair[0]) + '=' + encode(pair[1]);
    }
  }
  return s;
}
export const form = (url, hideSpin = false, urlHeader = '//') => (params = {}, headers = {}) => (callBack = () => { }, errorBack = () => { }) => {
  let header = {
    ...headers,
    'Content-Type': `application/x-www-form-urlencoded`
  };
  let form = new FormData();
  Object.keys(params).forEach((item, index) => {
    form.append(item, params[item]);
  });
  form = urlencodeFormData(form);
  return universal({ type: 'post', urlHeader, url, form, header, callBack, errorBack, hideSpin });
};