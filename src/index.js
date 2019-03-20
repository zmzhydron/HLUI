import { fromJS } from 'immutable';
import Table from '@Comp/Table';
import TableNew from '@Comp/TableNew';
import Search from '@Comp/Search';
import PopUp from '@Comp/PopUp';
import dragPop from '@Comp/dragPop';
import hud from '@Comp/Hud';
import Swip from '@Comp/swip';
import Zswitch from '@Comp/Switch';
import SelectView from '@Comp/SelectView';
import SelectViewContent from '@Comp/SelectViewView';
import zForm from '@Comp/zForm';
import inputHint from '@Comp/inputHint';
import BoxItem from '@Comp/BoxItem';
import AdvancedSelect from '@Comp/AdvancedSelect';
import CheckGroup from '@Comp/CheckGroup';
import zRadioGroup from '@Comp/zRadioGroup';
import newSelect from '@Comp/newSelect';
import newInput from '@Comp/newInput';
import AdvanceNotice from '@Comp/AdvanceNotice';
import Timeline from '@Comp/Timeline';
import SelectInput from '@Comp/SelectInput';
import Ztransfer from '@Comp/Ztransfer';
import TwoTimeSelect from '@Comp/twoTimeSelect';
import InputPopUp from '@Comp/inputPopUp';
import AdvanceTable from '@Comp/AdvanceTable';
import AudioPlayer from '@Comp/AudioPlayer';
import AdvanceTimeSelect from '@Comp/AdvanceTimeSelect';
import ZtimeSelect from '@Comp/ZtimeSelect';
import AdvanceText from '@Comp/AdvanceText';
import countDown from '@Comp/countDown';

const ComponentList = [{
  name: 'ZtimeSelect',
  Comp: ZtimeSelect
},
{
  name: 'AdvanceNotice',
  Comp: AdvanceNotice
},
{
  name: 'Swip',
  Comp: Swip
},
{
  name: 'AdvanceText',
  Comp: AdvanceText
},
{
  name: 'countDown',
  Comp: countDown
},
{
  name: 'AdvanceTimeSelect',
  Comp: AdvanceTimeSelect
},
{
  name: 'AudioPlayer',
  Comp: AudioPlayer
},
{
  name: 'TwoTimeSelect',
  Comp: TwoTimeSelect
},
{
  name: 'AdvanceTable',
  Comp: AdvanceTable
},
{
  name: 'inputHint',
  Comp: inputHint
},
{
  name: 'Zswitch',
  Comp: Zswitch
},
{
  name: 'InputPopUp',
  Comp: InputPopUp
},
{
  name: 'Ztransfer',
  Comp: Ztransfer
},
{
  name: 'SelectInput',
  Comp: SelectInput
},
{
  name: 'Timeline',
  Comp: Timeline
},
{
  name: 'newInput',
  Comp: newInput
},
{
  name: 'newSelect',
  Comp: newSelect
},
{
  name: 'zRadioGroup',
  Comp: zRadioGroup
},
{
  name: 'CheckGroup',
  Comp: CheckGroup
},
{
  name: 'zform',
  Comp: zForm
},
{
  name: 'SelectViewContent',
  Comp: SelectViewContent
},
{
  name: 'SelectView',
  Comp: SelectView
},
{
  name: 'z-Table',
  Comp: Table
},
{
  name: 'z-TableNew',
  Comp: TableNew
},
{
  name: 'z-Search',
  Comp: Search
},
{
  name: 'PopUp',
  Comp: PopUp
},
{
  name: 'DragPop',
  Comp: dragPop
},
{
  name: 'Hud',
  Comp: hud
},
{
  name: 'BoxItem',
  Comp: BoxItem
},
{
  name: 'AdvancedSelect',
  Comp: AdvancedSelect
}
];
const isEmpty = val => {
  let r = false;
  switch (Object.prototype.toString.call(val)) {
    case '[object Object]':
      if (Object.keys(val).length === 0) {
        r = true;
      }
      break;
    // case '[object Number]':
    //   if (val === 0) {
    //     r = true;
    //   }
    //   break;
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
const installer = {
  myname: 'zhangmingzhis',
  install: function (Vue, options) {
    ComponentList.forEach((item, index) => {
      let { name, Comp } = item;
      Vue.component(name, Comp);
    });
    Vue.directive('changecolor', {
      // 当被绑定的元素插入到 DOM 中时……
      inserted: function (el) {
        ztools.log(`inserted`, 'red', 33, el);
        // el.focus()
      },
      update (el) {
        ztools.log(`update`, 'purple', 33, el);
      },
      componentUpdated (el, binds) {
        ztools.log(`componentUpdated`, 'green', 33, binds);
      }
    })
    Vue.prototype.makeRandom = function (num = 10) {
      return Array.from({ length: num })
        .map(item => String.fromCharCode(Math.floor(Math.random() * (122 - 97) + 97)))
        .join('');
    };
    Vue.prototype.gettrueObj = function (key) {
      return this.formprops.formList.filter(item => item.key === key)[0];
    };
    Vue.prototype.validateCore = function (obj, value) {
      // obj 验证对象
      let { msg: message, required = true, type = `string`, descriptor = false, transform = val => val } = obj;
      var finaldescriptor = {
        value: { type, required, message, transform }
      };
      if (descriptor) {
        // 如果传递了规则，则应用该规则
        finaldescriptor = descriptor;
      }
      var chemas = new SchemValidator(finaldescriptor);
      let r = new Promise((resolve, reject) => {
        let errormsg = '';
        let ok = 1;
        chemas.validate({ value }, (errors, fileds) => {
          if (errors) {
            ok = 0;
            errormsg = errors.map(item => item.message).join(',');
          }
          resolve({
            ok,
            errormsg
          });
        });
      });
      return r;
    }
    Vue.prototype.fromJS = function (obj) {
      return fromJS(obj);
    };
    Vue.prototype.isEmpty = function (val) {
      return isEmpty(val);
    };
    Vue.prototype._isObject = function (val) {
      return Object.prototype.toString.call(val) === '[object Object]';
    };
    Vue.prototype._isArray = function (val) {
      return Object.prototype.toString.call(val) === '[object Array]';
    };
    Vue.prototype.toJS = function (value) {
      return value.toJS();
    };
    Vue.prototype._clone = function (value) {
      return fromJS(value).toJS();
    };
    Vue.prototype.getStringWidth = function (str, size = 12, padding = 0) {
      var body = document.body;
      var p = document.createElement('p');
      p.style.cssText = `
        position: absolute;
        top: -10000px;
        padding: 0 ${padding}px;
      `;
      p.style.fontSize = `${size}px`;
      p.innerHTML = str;
      body.appendChild(p);
      let width = p.offsetWidth;
      setTimeout(() => {
        body.removeChild(p);
      }, 300);
      return width;
    };
    Vue.prototype.trimObject = function (obj, ref) {
      let o = {};
      ref.forEach(item => {
        let { deleteable, key } = item;
        let val = obj[key];
        if (deleteable !== true) {
          let empty = isEmpty(val);
          if (!empty) {
            o[key] = val;
          }
        } else {
          o[key] = val;
        }
      });
      return o;
    };
    Vue.prototype.trimObjectNoref = function (obj) {
      let o = {};
      for (let [key, value] of Object.entries(obj)) {
        let empty = isEmpty(value);
        if (!empty) {
          o[key] = value;
        }
      }
      return o;
    };
    Vue.prototype.dateTransfer = function (param) {
      Date.prototype.format = function (fmt) {
        var o = {
          'M+': this.getMonth() + 1, // 月份
          'd+': this.getDate(), // 日
          'h+': this.getHours(), // 小时
          'm+': this.getMinutes(), // 分
          's+': this.getSeconds() // 秒
        };
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
          }
        }
        return fmt;
      };
      if (param) {
        var time1 = new Date(param).format('MM-dd hh:mm:ss');
        return time1;
      } else {
        return '';
      }
    };
  }
};

// module.exports.default = module.exports = installer;
export default installer;
// module.exports = installer