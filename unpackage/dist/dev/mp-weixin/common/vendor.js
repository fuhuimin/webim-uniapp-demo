(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!****************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/pages.json ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/*!********************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/utils/WebIM.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _wxEntry = _interopRequireDefault(__webpack_require__(/*! ../sdk/src/wxEntry */ 9));

var _WebIMConfig = _interopRequireDefault(__webpack_require__(/*! ./WebIMConfig */ 61));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // import websdk from "../newSDK/webimSDK3.1.2";
console.group = console.group || {};
console.groupEnd = console.groupEnd || {};
var window = {};
var WebIM = window.WebIM = wx.WebIM = _wxEntry.default;
window.WebIM.config = _WebIMConfig.default; //var DOMParser = window.DOMParser = xmldom.DOMParser;
//let document = window.document = new DOMParser().parseFromString("<?xml version='1.0'?>\n", "text/xml");

WebIM.isDebug = function (option) {
  if (option) {
    WebIM.config.isDebug = option.isDebug;
    openDebug(WebIM.config.isDebug);
  }

  function openDebug(value) {
    function ts() {
      var d = new Date();
      var Hours = d.getHours(); // 获取当前小时数(0-23)

      var Minutes = d.getMinutes(); // 获取当前分钟数(0-59)

      var Seconds = d.getSeconds(); // 获取当前秒数(0-59)

      return (Hours < 10 ? "0" + Hours : Hours) + ":" + (Minutes < 10 ? "0" + Minutes : Minutes) + ":" + (Seconds < 10 ? "0" + Seconds : Seconds) + " ";
    }
  }
};
/**
    * Set autoSignIn as true (autoSignInName and autoSignInPwd are configured below),
    * You can auto signed in each time when you refresh the page in dev model.
    */


WebIM.config.autoSignIn = false;

if (WebIM.config.autoSignIn) {
  WebIM.config.autoSignInName = "lwz2";
  WebIM.config.autoSignInPwd = "1";
} // var stropheConn = new window.Strophe.Connection("ws://im-api.easemob.com/ws/", {
//                 inactivity: 30,
//                 maxRetries: 5,
//                 pollingTime: 4500
//             });
//
// stropheConn.connect(
//   '$t$' + 'YWMtmbQEBKKIEeaGmMtXyg5n1wAAAVlkQvGO2WOJGlMCEJKM4VV9GCMnb_XLCXU',
//   function() {
//     console.log(arguments, 'ggogogo');
//   }, stropheConn.wait, stropheConn.hold);


WebIM.parseEmoji = function (msg) {
  if (typeof WebIM.Emoji === "undefined" || typeof WebIM.Emoji.map === "undefined") {
    return msg;
  }

  var emoji = WebIM.Emoji,
  reg = null;
  var msgList = [];
  var objList = [];

  for (var face in emoji.map) {
    if (emoji.map.hasOwnProperty(face)) {
      while (msg.indexOf(face) > -1) {
        msg = msg.replace(face, "^" + emoji.map[face] + "^");
      }
    }
  }

  var ary = msg.split("^");
  var reg = /^e.*g$/;

  for (var i = 0; i < ary.length; i++) {
    if (ary[i] != "") {
      msgList.push(ary[i]);
    }
  }

  for (var i = 0; i < msgList.length; i++) {
    if (reg.test(msgList[i])) {
      var obj = {};
      obj.data = msgList[i];
      obj.type = "emoji";
      objList.push(obj);
    } else {
      var obj = {};
      obj.data = msgList[i];
      obj.type = "txt";
      objList.push(obj);
    }
  }

  return objList;
};

WebIM.time = function () {
  var date = new Date();
  var Hours = date.getHours();
  var Minutes = date.getMinutes();
  var Seconds = date.getSeconds();
  var time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + (Hours < 10 ? "0" + Hours : Hours) + ":" + (Minutes < 10 ? "0" + Minutes : Minutes) + ":" + (Seconds < 10 ? "0" + Seconds : Seconds);
  return time;
};

// WebIM.Emoji = {
//   path: "../static/images/faces/",
//   map: {
//     "[):]": "ee_1.png",
//     "[:D]": "ee_2.png",
//     "[;)]": "ee_3.png",
//     "[:-o]": "ee_4.png",
//     "[:p]": "ee_5.png",
//     "[(H)]": "ee_6.png",
//     "[:@]": "ee_7.png",
//     "[:s]": "ee_8.png",
//     "[:$]": "ee_9.png",
//     "[:(]": "ee_10.png",
//     "[:'(]": "ee_11.png",
//     "[<o)]": "ee_12.png",
//     "[(a)]": "ee_13.png",
//     "[8o|]": "ee_14.png",
//     "[8-|]": "ee_15.png",
//     "[+o(]": "ee_16.png",
//     "[|-)]": "ee_17.png",
//     "[:|]": "ee_18.png",
//     "[*-)]": "ee_19.png",
//     "[:-#]": "ee_20.png",
//     "[^o)]": "ee_21.png",
//     "[:-*]": "ee_22.png",
//     "[8-)]": "ee_23.png",
//     "[del]": "btn_del.png",
//     "[(|)]": "ee_24.png",
//     "[(u)]": "ee_25.png",
//     "[(S)]": "ee_26.png",
//     "[(*)]": "ee_27.png",
//     "[(#)]": "ee_28.png",
//     "[(R)]": "ee_29.png",
//     "[({)]": "ee_30.png",
//     "[(})]": "ee_31.png",
//     "[(k)]": "ee_32.png",
//     "[(F)]": "ee_33.png",
//     "[(W)]": "ee_34.png",
//     "[(D)]": "ee_35.png"
//   }
// };
// WebIM.EmojiObj = {
//   // 相对 emoji.js 路径
//   path: "../static/images/faces/",
//   map1: {
//     "[):]": "ee_1.png",
//     "[:D]": "ee_2.png",
//     "[;)]": "ee_3.png",
//     "[:-o]": "ee_4.png",
//     "[:p]": "ee_5.png",
//     "[(H)]": "ee_6.png",
//     "[:@]": "ee_7.png"
//   },
//   map2: {
//     "[:s]": "ee_8.png",
//     "[:$]": "ee_9.png",
//     "[:(]": "ee_10.png",
//     "[:'(]": "ee_11.png",
//     "[<o)]": "ee_12.png",
//     "[(a)]": "ee_13.png",
//     "[8o|]": "ee_14.png"
//   },
//   map3: {
//     "[8-|]": "ee_15.png",
//     "[+o(]": "ee_16.png",
//     "[|-)]": "ee_17.png",
//     "[:|]": "ee_18.png",
//     "[*-)]": "ee_19.png",
//     "[:-#]": "ee_20.png",
//     "[del]": "del.png"
//   },
//   map4: {
//     "[^o)]": "ee_21.png",
//     "[:-*]": "ee_22.png",
//     "[8-)]": "ee_23.png",
//     "[(|)]": "ee_24.png",
//     "[(u)]": "ee_25.png",
//     "[(S)]": "ee_26.png",
//     "[(*)]": "ee_27.png"
//   },
//   map5: {
//     "[(#)]": "ee_28.png",
//     "[(R)]": "ee_29.png",
//     "[({)]": "ee_30.png",
//     "[(})]": "ee_31.png",
//     "[(k)]": "ee_32.png",
//     "[(F)]": "ee_33.png",
//     "[(W)]": "ee_34.png",
//     "[(D)]": "ee_35.png"
//   },
//   map6: {
//     "[del]": "del.png"
//   }
// }; 
// wx.connectSocket({url: WebIM.config.xmppURL, method: "GET"})

WebIM.conn = new WebIM.connection({
  appKey: "easemob-demo#chatdemoui",
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  https: typeof WebIM.config.https === "boolean" ? WebIM.config.https : location.protocol === "https:",
  url: WebIM.config.xmppURL,
  apiUrl: WebIM.config.apiURL,
  isAutoLogin: false,
  heartBeatWait: WebIM.config.heartBeatWait,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  autoReconnectInterval: WebIM.config.autoReconnectInterval,
  miniProgramType: WebIM.config.miniProgramType });


module.exports = {
  "default": WebIM };

/***/ }),
/* 9 */
/*!************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/wxEntry.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _connection = _interopRequireDefault(__webpack_require__(/*! ./connection */ 10));
var _long = _interopRequireDefault(__webpack_require__(/*! ../node_modules/long/dist/long */ 16));
var _allnode = _interopRequireDefault(__webpack_require__(/*! ./allnode */ 24));
var _protobuf = _interopRequireDefault(__webpack_require__(/*! ./weichatPb/protobuf */ 25));
var _status = _interopRequireDefault(__webpack_require__(/*! ./status */ 11));
var _wxUtils = _interopRequireDefault(__webpack_require__(/*! ./utils/wxUtils */ 60));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var _code = (0, _status.default)();
var all = (0, _allnode.default)();
var root = _connection.default.connection.prototype.root = _protobuf.default.Root.fromJSON(all);
var sock;
_connection.default.connection.prototype.getParams({
  root: root,
  utils: _wxUtils.default });

var base64transform = function base64transform(str, conn, notSend) {
  var init8arr = new Uint8Array(str);
  var obj = {
    data: init8arr.buffer };

  if (notSend) return obj;
  try {
    sock.send(obj);
  } catch (e) {
    conn.onError({
      type: _code.WEBIM_CONNCTION_USER_NOT_ASSIGN_ERROR,
      msg: e });

  }
};

function _getSock(conn) {
  var sock = wx.connectSocket({
    url: conn.url,
    header: {
      'content-type': 'application/json' },

    success: function success(e) {
      // !conn.logOut && conn.heartBeat(conn) //连接成功开始发送心跳
    },
    fail: function fail(e) {
      //部分机型从后台切回前台状态有延迟
      if (e.errMsg.indexOf('suspend') != -1) {
        //重连
      }
    } });

  return sock;
}

var _login = function _login(options, conn) {
  if (!options) {
    return;
  }
  try {
    sock = _getSock(conn);
    _connection.default.connection.prototype.sock = sock;
    sock.onOpen(function () {
      console.log('onOpen');
      // 初始重连状态
      conn.autoReconnectInterval = 0;
      conn.times = 1;
      conn.autoReconnectNumTotal = 0;
      var emptyMessage = [];
      var time = new Date().valueOf();
      var provisionMessage = root.lookup("easemob.pb.Provision");
      var secondMessage = provisionMessage.decode(emptyMessage);

      conn.context.jid.clientResource = conn.deviceId + "_" + time.toString();
      secondMessage.compressType = conn.compressType;
      secondMessage.encryptType = conn.encryptType;
      secondMessage.osType = conn.osType;
      secondMessage.version = conn.version;
      secondMessage.deviceName = conn.deviceId;
      secondMessage.resource = conn.deviceId + "_" + time.toString();
      secondMessage.deviceUuid = time.toString();
      secondMessage.auth = "$t$" + options.access_token;
      secondMessage = provisionMessage.encode(secondMessage).finish();
      var firstLookUpMessage = root.lookup("easemob.pb.MSync");
      var firstMessage = firstLookUpMessage.decode(emptyMessage);

      firstMessage.version = conn.version;
      firstMessage.guid = conn.context.jid;
      firstMessage.auth = "$t$" + options.access_token;
      firstMessage.command = 3;
      firstMessage.deviceId = conn.deviceId;
      firstMessage.encryptType = conn.encryptType;
      firstMessage.payload = secondMessage;
      firstMessage = firstLookUpMessage.encode(firstMessage).finish();
      base64transform(firstMessage);
      conn.logOut = false;
      conn.offLineSendConnecting = false;
      if (conn.unSendMsgArr.length > 0) {
        for (var i in conn.unSendMsgArr) {
          var str = conn.unSendMsgArr[i];
          conn.sendMSync(str);
          delete conn.unSendMsgArr[i];
        }
      }
      conn.onOpened();
    });

    sock.onClose(function (e) {
      console.log('onClose', e);
      if (!conn.logOut &&
      conn.autoReconnectNumTotal < conn.autoReconnectNumMax && (
      conn.autoReconnectNumTotal <= conn.xmppHosts.length && conn.isHttpDNS || !conn.isHttpDNS)
      // && conn.xmppIndex < conn.xmppHosts.length - 1
      ) {
          conn.reconnect();
          var error = {
            type: _code.WEBIM_CONNCTION_DISCONNECTED };

          conn.onError(error);
          // conn.onClosed();
        } else if (conn.logOut) {
        conn.clear();
        conn.onClosed();
      } else {
        var error = {
          type: _code.WEBIM_CONNCTION_DISCONNECTED };

        conn.onError(error);
        conn.onClosed();
      }
    });

    sock.onMessage(function (e) {
      var mainMessage = root.lookup("easemob.pb.MSync");
      var result = mainMessage.decode(e.data);
      switch (result.command) {
        case 0:
          debugger;
          var CommSyncDLMessage = root.lookup("easemob.pb.CommSyncDL");
          CommSyncDLMessage = CommSyncDLMessage.decode(result.payload);
          var msgId = new _long.default(CommSyncDLMessage.serverId.low, CommSyncDLMessage.serverId.high, CommSyncDLMessage.serverId.unsigned).toString();
          var metaId = new _long.default(CommSyncDLMessage.metaId.low, CommSyncDLMessage.metaId.high, CommSyncDLMessage.metaId.unsigned).toString();

          // console.log('CommSyncDLMessage', CommSyncDLMessage)

          if (CommSyncDLMessage.metas.length !== 0) {
            conn._metapayload(CommSyncDLMessage.metas, CommSyncDLMessage.status, conn);
            conn._lastsession(CommSyncDLMessage.nextKey, CommSyncDLMessage.queue, conn);
          } else if (CommSyncDLMessage.isLast) {
            //当前为最后一条消息
            var queuesIndex = _wxUtils.default.checkArray(conn._queues, CommSyncDLMessage.queue);
            // console.log(CommSyncDLMessage.queue)
            if (queuesIndex !== false) {
              // islsat == true 删除队列当前的queue
              conn._queues.splice(queuesIndex, 1);
            }
            if (conn._queues.length > 0) {
              conn._backqueue(conn._queues[0], conn);
              this.qTimer && clearTimeout(this.qTimer);
            }
          } else if (CommSyncDLMessage.status && CommSyncDLMessage.status.errorCode === 0) {
            if (conn._msgHash[metaId]) {
              try {
                conn._msgHash[metaId].success instanceof Function && conn._msgHash[metaId].success(metaId, msgId);
              } catch (e) {
                conn.onError({
                  type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
                  data: e });

              }
              delete conn._msgHash[metaId];
            }
            conn.onReceivedMessage({
              id: metaId,
              mid: msgId });

            conn.heartBeat(conn); //登陆成功后发送心跳
          } else if (CommSyncDLMessage.status && CommSyncDLMessage.status.errorCode === 15) {
            conn.onMutedMessage({
              mid: msgId });

          } else if (CommSyncDLMessage.status && CommSyncDLMessage.status.errorCode === 1) {
            var type = '';
            switch (CommSyncDLMessage.status.reason) {
              case "blocked":
                type = _code.PERMISSION_DENIED;
                break;
              case "group not found":
                type = _code.GROUP_NOT_EXIST;
                break;
              case "not in group or chatroom":
                type = _code.GROUP_NOT_JOINED;
                break;
              case "exceed recall time limit":
                type = _code.MESSAGE_RECALL_TIME_LIMIT;
                break;
              case "message recall disabled":
                type = _code.SERVICE_NOT_ENABLED;
                break;
              case "not in group or chatroom white list":
                type = _code.SERVICE_NOT_ALLOW_MESSAGING;
                break;
              default:
                type = _code.SERVER_UNKNOWN_ERROR;
                break;}

            conn.onError({
              type: type,
              reason: CommSyncDLMessage.status.reason ? CommSyncDLMessage.status.reason : '',
              data: {
                id: metaId,
                mid: msgId } });


          } else if (CommSyncDLMessage.status && CommSyncDLMessage.status.errorCode === 7 && CommSyncDLMessage.status.reason === "sensitive words") {
            conn.onError({
              type: _code.MESSAGE_INCLUDE_ILLEGAL_CONTENT,
              data: {
                id: metaId,
                mid: msgId } });


          } else {
            if (conn._msgHash[metaId]) {
              try {
                conn._msgHash[metaId].fail instanceof Function && conn._msgHash[metaId].fail(metaId, msgId);
              } catch (e) {
                conn.onError({
                  type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
                  data: e });

              }
              delete conn._msgHash[metaId];
            }
            conn.onError({
              type: _code.WEBIM_LOAD_MSG_ERROR,
              data: {
                errorCode: CommSyncDLMessage.status && CommSyncDLMessage.status.errorCode,
                reason: CommSyncDLMessage.status && CommSyncDLMessage.status.reason } });


          }
          break;
        case 1:
          var CommUnreadDLMessage = root.lookup("easemob.pb.CommUnreadDL");
          CommUnreadDLMessage = CommUnreadDLMessage.decode(result.payload);

          if (CommUnreadDLMessage.unread.length === 0) {
            //rebuild();
            //发sync 同步statistic
          } else {
            for (var i = 0; i < CommUnreadDLMessage.unread.length; i++) {
              conn._backqueue(CommUnreadDLMessage.unread[i].queue, conn);
            }
          }
          // conn._rebuild(); //测试每次都会走 case 1
          break;
        case 2:
          var Message = root.lookup("easemob.pb.CommNotice");
          var noticeMessage = Message.decode(result.payload);

          if (_wxUtils.default.checkArray(conn._queues, noticeMessage.queue) === false) {
            conn._queues.push(noticeMessage.queue);
            this.qTimer && clearTimeout(this.qTimer);
            this.qTimer = setTimeout(function () {
              var q = noticeMessage.queue;
              if (_wxUtils.default.checkArray(conn._queues, q) !== false) {
                conn._backqueue(q, conn);
              }
            }, 20000);
          } else {
            return;
          }

          if (conn._queues.length == 1) {
            conn._backqueue(noticeMessage.queue, conn);
          }

          break;
        case 3:
          conn._receiveProvision(result, conn);
          break;}


    });
    var accessToken = options.access_token || '';
    if (accessToken == '') {
      conn.onError({
        type: _code.WEBIM_CONNCTION_OPEN_USERGRID_ERROR,
        data: options });

      return;
    }

    conn.context.accessToken = options.access_token;
  } catch (e) {

  }
};

_connection.default.connection.prototype._base64transform = base64transform;
_connection.default.connection.prototype._getSock = _getSock;
_connection.default.connection.prototype._login = _login;

_connection.default.version = '_version';var _default =

_connection.default;exports.default = _default;

/***/ }),
/* 10 */
/*!***************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/connection.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _status = _interopRequireDefault(__webpack_require__(/*! ./status */ 11));
var _message2 = _interopRequireDefault(__webpack_require__(/*! ./message */ 12));
var _queue = _interopRequireDefault(__webpack_require__(/*! ./queue */ 13));
var _sendChatMessage = _interopRequireDefault(__webpack_require__(/*! ./chat/sendChatMessage */ 14));
var _handleChatMessage = _interopRequireDefault(__webpack_require__(/*! ./chat/handleChatMessage */ 15));
var _HandleMucMessage = _interopRequireDefault(__webpack_require__(/*! ./muc/HandleMucMessage */ 18));
var _HandleRosterMessage = _interopRequireDefault(__webpack_require__(/*! ./roster/HandleRosterMessage */ 19));
var _HandleStatisticsMessage = _interopRequireDefault(__webpack_require__(/*! ./statistics/HandleStatisticsMessage */ 20));
var _long = _interopRequireDefault(__webpack_require__(/*! ../node_modules/long/dist/long */ 16));
var _restApis = _interopRequireDefault(__webpack_require__(/*! ./restApis */ 21));
var _checkEnv = _interopRequireDefault(__webpack_require__(/*! ./checkEnv */ 23));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// import _utils from './utils/commonUtils';
var WebIM = {};

var _code = (0, _status.default)();

var max_cache_length = 100;
var load_msg_cache = [];

var root;
var _utils;
var SOCKJS_STATUS = {
  CLOSED: 3,
  CLOSING: 2,
  CONNECTING: 0,
  OPEN: 1 };


var EMPTY_FUN = function EMPTY_FUN() {};


/**
                                          * 当服务器有新消息提示时进行返回queue
                                          * */

var _validCheck = function _validCheck(options, conn) {
  options = options || {};

  if (options.user == '') {
    conn.onError({
      type: _code.WEBIM_CONNCTION_USER_NOT_ASSIGN_ERROR });

    return false;
  }

  var user = options.user + '' || '';
  var appKey = options.appKey || '';
  var devInfos = appKey.split('#');

  if (devInfos.length !== 2) {
    conn.onError({
      type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR });

    return false;
  }
  var orgName = devInfos[0];
  var appName = devInfos[1];

  if (!orgName) {
    conn.onError({
      type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR });

    return false;
  }
  if (!appName) {
    conn.onError({
      type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR });

    return false;
  }

  // var jid = appKey + '_' + user.toLowerCase() + '@' + conn.domain,
  //     resource = options.resource || 'webim';

  // if (conn.isMultiLoginSessions) {
  //     resource += user + new Date().getTime() + Math.floor(Math.random().toFixed(6) * 1000000);
  // }
  // conn.context.jid = jid + '/' + resource;
  /*jid: {appkey}_{username}@domain/resource*/

  conn.context.jid = {
    appKey: appKey,
    name: user,
    domain: conn.domain,
    clientResource: conn.clientResource };

  // conn.context.sock = sock;
  conn.context.root = root;
  conn.context.userId = user;
  conn.context.appKey = appKey;
  conn.context.appName = appName;
  conn.context.orgName = orgName;

  return true;
};

/**
    * The connection class.
    * @constructor
    * @param {Object} options - 创建连接的初始化参数
    * @param {String} options.url - xmpp服务器的URL
    * @param {String} options.apiUrl - API服务器的URL
    * @param {Boolean} options.isHttpDNS - 防止域名劫持
    * @param {Boolean} options.isMultiLoginSessions - 为true时同一账户可以同时在多个Web页面登录（多标签登录，默认不开启，如有需要请联系商务），为false时同一账号只能在一个Web页面登录
    * @param {Boolean} options.https - 是否启用wss.
    * @param {Number} options.heartBeatWait - 发送心跳包的时间间隔（毫秒）
    * @param {Boolean} options.isAutoLogin - 登录成功后是否自动出席
    * @param {Number} options.autoReconnectNumMax - 掉线后重连的最大次数
    * @param {Number} options.autoReconnectInterval -  掉线后重连的间隔时间（毫秒）
    * @param {Boolean} options.isWindowSDK - 是否运行在WindowsSDK上
    * @param {Boolean} options.encrypt - 是否加密文本消息
    * @param {Boolean} options.delivery - 是否发送delivered ack
    * @returns {Class}  连接实例
    */

//class
var connection = function connection(options) {
  if (!this instanceof connection) {
    return new connection(options);
  }
  var options = options || {};
  this.isDebug = options.isDebug || false;
  this.isHttpDNS = options.isHttpDNS || false;
  this.isMultiLoginSessions = options.isMultiLoginSessions || false;
  this.wait = options.wait || 30; //**** attach*/
  this.retry = options.retry || false; //*** */
  this.https = options.https && location.protocol === 'https:';
  this.url = options.url;
  this.hold = options.hold || 1; //**** attach*/
  this.route = options.route || null; //*** */
  // this.domain = options.domain || 'easemob.com';
  this.inactivity = options.inactivity || 30; //****getStrophe */
  this.heartBeatWait = options.heartBeatWait || 4500; //*** */
  this.maxRetries = options.maxRetries || 5; //*** getStrophe*/
  this.isAutoLogin = options.isAutoLogin === false ? false : true; //**** */
  this.pollingTime = options.pollingTime || 800; //****getStrophe */
  this.stropheConn = false;
  this.autoReconnectNumMax = options.autoReconnectNumMax || 0;
  this.autoReconnectNumTotal = 0;
  this.autoReconnectInterval = options.autoReconnectInterval || 0;
  this.context = {
    status: _code.STATUS_INIT };

  this.sendQueue = new _queue.default(); //instead of sending message immediately,cache them in this queue
  this.intervalId = null; //clearInterval return value
  this.apiUrl = options.apiUrl || '';
  this.isWindowSDK = options.isWindowSDK || false; //????
  this.encrypt = options.encrypt || {
    encrypt: {
      type: 'none' } };

  //**** */
  this.delivery = options.delivery || false;

  //jid 所用参数
  this.appKey = options.appKey || "";
  this.domain = options.domain || "easemob.com";
  this.clientResource = "84ff3eba1";
  this.user = '';
  this.orgName = '';
  this.appName = '';
  this.token = '';
  this.unSendMsgArr = [];

  this.dnsArr = ['https://rs.easemob.com', 'http://182.92.174.78', 'http://112.126.66.111']; //http dns server hosts
  this.dnsIndex = 0; //the dns ip used in dnsArr currently
  this.dnsTotal = this.dnsArr.length; //max number of getting dns retries
  this.restHosts = []; //rest server ips
  this.restIndex = 0; //the rest ip used in restHosts currently
  this.restTotal = 0; //max number of getting rest token retries
  this.xmppHosts = []; //xmpp server ips
  this.xmppIndex = 0; //the xmpp ip used in xmppHosts currently
  this.xmppTotal = 0; //max number of creating xmpp server connection(ws/bosh) retries

  this.groupOption = {};
  //mysnc配置
  this.version = options.version || "3.0.0";
  this.compressAlgorimth = options.compressAlgorimth || 0; //*** */
  this.userAgent = options.userAgent || 0; //*** */
  this.pov = options.pov || 0; /**** */
  this.command = options.command || 3;
  this.deviceId = options.deviceId || "webim";
  this.encryptKey = options.encryptKey || "";
  this.firstPayload = options.firstPayload || []; //*** */
  this.compressType = options.compressType || [0];
  this.encryptType = options.encryptType || [0];
  this.osType = 16;
  // window.this = this;

  // global params
  //isStropheLog = options.isStropheLog || false;
};

/**
    * 注册新用户
    * @param {Object} options - 
    * @param {String} options.username - 用户名，即用户ID
    * @param {String} options.password - 密码
    * @param {String} options.nickname - 用户昵称
    * @param {Function} options.success - 成功之后的回调，默认为空
    * @param {Function} options.error - 失败之后的回调，默认为空
    */

connection.prototype.registerUser = function (options) {
  if (this.isHttpDNS) {
    this.dnsIndex = 0;
    this.getHttpDNS(options, 'signup');
  } else {
    this.signup(options);
  }
};


/**
    * 注册监听函数
    * @param {Object} options - 回调函数集合
    * @param {connection~onOpened} options.onOpened - 处理登录的回调
    * @param {connection~onTextMessage} options.onTextMessage - 处理文本消息的回调
    * @param {connection~onEmojiMessage} options.onEmojiMessage - 处理表情消息的回调
    * @param {connection~onPictureMessage} options.onPictureMessage - 处理图片消息的回调
    * @param {connection~onAudioMessage} options.onAudioMessage - 处理音频消息的回调
    * @param {connection~onVideoMessage} options.onVideoMessage - 处理视频消息的回调
    * @param {connection~onFileMessage} options.onFileMessage - 处理文件消息的回调
    * @param {connection~onLocationMessage} options.onLocationMessage - 处理位置消息的回调
    * @param {connection~onCmdMessage} options.onCmdMessage - 处理命令消息的回调
    * @param {connection~onCustomMessage} options.onCustomMessage -处理自定义消息
    * @param {connection~onPresence} options.onPresence - 处理Presence消息的回调
    * @param {connection~onError} options.onError - 处理错误消息的回调
    * @param {connection~onReceivedMessage} options.onReceivedMessage - 处理Received消息的回调
    * @param {connection~onInviteMessage} options.onInviteMessage - 处理邀请消息的回调    /.....
    * @param {connection~onDeliverdMessage} options.onDeliverdMessage - 处理Delivered ACK消息的回调
    * @param {connection~onReadMessage} options.onReadMessage - 处理Read ACK消息的回调   //.....
    * @param {connection~onRecallMessage} options.onRecallMessage - 处理Recall 消息的回调   //....
    * @param {connection~onMutedMessage} options.onMutedMessage - 处理禁言消息的回调
    * @param {connection~onOffline} options.onOffline - 处理断网的回调
    * @param {connection~onOnline} options.onOnline - 处理联网的回调
    * @param {connection~onCreateGroup} options.onCreateGroup - 处理创建群组的回调
    */

connection.prototype.listen = function (options) {
  /**
                                                   * 登录成功后调用
                                                   * @callback connection~onOpened
                                                   */
  /**
                                                       * 收到文本消息
                                                       * @callback connection~onTextMessage
                                                       */
  /**
                                                           * 收到表情消息
                                                           * @callback connection~onEmojiMessage
                                                           */
  /**
                                                               * 收到图片消息
                                                               * @callback connection~onPictureMessage
                                                               */
  /**
                                                                   * 收到自定义消息
                                                                   * @callback connection~onCustomMessage
                                                                   */
  /**
                                                                       * 收到音频消息
                                                                       * @callback connection~onAudioMessage
                                                                       */
  /**
                                                                           * 收到视频消息
                                                                           * @callback connection~onVideoMessage
                                                                           */
  /**
                                                                               * 收到文件消息
                                                                               * @callback connection~onFileMessage
                                                                               */
  /**
                                                                                   * 收到位置消息
                                                                                   * @callback connection~onLocationMessage
                                                                                   */
  /**
                                                                                       * 收到命令消息
                                                                                       * @callback connection~onCmdMessage
                                                                                       */
  /**
                                                                                           * 收到错误消息
                                                                                           * @callback connection~onError
                                                                                           */
  /**
                                                                                               * 收到Presence消息
                                                                                               * @callback connection~onPresence
                                                                                               */
  /**
                                                                                                   * 收到Received消息
                                                                                                   * @callback connection~onReceivedMessage
                                                                                                   */
  /**
                                                                                                       * 被邀请进群
                                                                                                       * @callback connection~onInviteMessage   //....
                                                                                                       */
  /**
                                                                                                           * 收到已送达回执
                                                                                                           * @callback connection~onDeliverdMessage
                                                                                                           */
  /**
                                                                                                               * 收到已读回执
                                                                                                               * @callback connection~onReadMessage
                                                                                                               */
  /**
                                                                                                                   * 收到撤回消息回执
                                                                                                                   * @callback connection~onRecallMessage
                                                                                                                   */
  /**
                                                                                                                       * 被群管理员禁言
                                                                                                                       * @callback connection~onMutedMessage
                                                                                                                       */
  /**
                                                                                                                           * 浏览器被断网时调用
                                                                                                                           * @callback connection~onOffline
                                                                                                                           */
  /**
                                                                                                                               * 浏览器联网时调用
                                                                                                                               * @callback connection~onOnline
                                                                                                                               */
  /**
                                                                                                                                   * 建群成功后调用
                                                                                                                                   * @callback connection~onCreateGroup
                                                                                                                                   */
  this.onOpened = options.onOpened || EMPTY_FUN;
  this.onClosed = options.onClosed || EMPTY_FUN;
  this.onTextMessage = options.onTextMessage || EMPTY_FUN;
  this.onEmojiMessage = options.onEmojiMessage || EMPTY_FUN;
  this.onPictureMessage = options.onPictureMessage || EMPTY_FUN;
  this.onAudioMessage = options.onAudioMessage || EMPTY_FUN;
  this.onVideoMessage = options.onVideoMessage || EMPTY_FUN;
  this.onFileMessage = options.onFileMessage || EMPTY_FUN;
  this.onLocationMessage = options.onLocationMessage || EMPTY_FUN;
  this.onCustomMessage = options.onCustomMessage || EMPTY_FUN;
  this.onCmdMessage = options.onCmdMessage || EMPTY_FUN;
  this.onStatisticMessage = options.onStatisticMessage || EMPTY_FUN;
  this.onPresence = options.onPresence || EMPTY_FUN;
  this.onRoster = options.onRoster || EMPTY_FUN;
  this.onError = options.onError || EMPTY_FUN;
  this.onReceivedMessage = options.onReceivedMessage || EMPTY_FUN;
  this.onInviteMessage = options.onInviteMessage || EMPTY_FUN;
  this.onDeliverdMessage = options.onDeliveredMessage || EMPTY_FUN;
  this.onReadMessage = options.onReadMessage || EMPTY_FUN;
  this.onRecallMessage = options.onRecallMessage || EMPTY_FUN;
  this.onMutedMessage = options.onMutedMessage || EMPTY_FUN;
  this.onOffline = options.onOffline || EMPTY_FUN;
  this.onOnline = options.onOnline || EMPTY_FUN;
  this.onConfirmPop = options.onConfirmPop || EMPTY_FUN;
  this.onCreateGroup = options.onCreateGroup || EMPTY_FUN;
  //for WindowSDK start
  this.onUpdateMyGroupList = options.onUpdateMyGroupList || EMPTY_FUN;
  this.onUpdateMyRoster = options.onUpdateMyRoster || EMPTY_FUN;
  //for WindowSDK end
  this.onBlacklistUpdate = options.onBlacklistUpdate || EMPTY_FUN;
  _utils._listenNetwork(this.onOnline, this.onOffline);
};

connection.prototype.getParams = function (params) {
  root = params.root;
  _utils = params.utils;
  connection.prototype._utils = _utils;
  WebIM.utils = _utils;
  WebIM.statusCode = _code;
  WebIM.message = _message2.default;
  WebIM.message.prototype._utils = _utils;
};
connection.prototype._msgHash = {};

connection.prototype._queues = [];

/**
                                    * 确定收到消息给erlang反馈//跟服务端确认是否为最后一条消息comm消息islast = true
                                    * */
connection.prototype._lastsession = function (nexkey, queue, conn) {
  var emptyMessage = [];
  var commSyncULMessage = root.lookup("easemob.pb.CommSyncUL");
  var secondMessage = commSyncULMessage.decode(emptyMessage);
  secondMessage.queue = queue;
  secondMessage.key = new _long.default(nexkey.low, nexkey.high, nexkey.unsigned).toString();
  secondMessage = commSyncULMessage.encode(secondMessage).finish();

  var mSyncMessage = root.lookup("easemob.pb.MSync");

  var firstMessage = mSyncMessage.decode(emptyMessage);
  firstMessage.version = conn.version;
  firstMessage.encryptType = conn.encryptType;
  firstMessage.command = 0;
  firstMessage.payload = secondMessage;
  firstMessage = mSyncMessage.encode(firstMessage).finish();

  if (conn.sock.readyState !== SOCKJS_STATUS.OPEN) {
    var error = {
      type: _code.WEBIM_CONNCTION_DISCONNECTED };

    conn.onError(error);
  } else {
    conn._base64transform(firstMessage, conn);
  }
};

connection.prototype._metapayload = function (metas, status, conn) {
  for (var i = 0; i < metas.length; i++) {
    var msgId = new _long.default(metas[i].id.low, metas[i].id.high, metas[i].id.unsigned).toString();
    if (load_msg_cache.indexOf(msgId) < 0) {
      if (metas[i].ns === 1) {//CHAT
        // messageBody(metas[i]);
        (0, _handleChatMessage.default)(metas[i], status, conn);
      } else if (metas[i].ns === 2) {//MUC
        (0, _HandleMucMessage.default)(metas[i], status, conn);
      } else if (metas[i].ns === 3) {//ROSTER
        _HandleRosterMessage.default.handleMessage(metas[i], status, conn);
      } else if (metas[i].ns === 0) {
        //CHAT
        // messageBody(metas[i]);
        (0, _HandleStatisticsMessage.default)(metas[i], status, conn);
      } else if (metas[i].ns === 4) {//rtc信令
        conn.registerConfrIQHandler && conn.registerConfrIQHandler(metas[i], status, conn);
      }
      if (load_msg_cache.length <= max_cache_length) {
        load_msg_cache.push(msgId);
      } else {
        load_msg_cache.shift();
        load_msg_cache.push(msgId);
      }
    }
  }
};

/**
    *
    * 如何没有未读消息的处理
    * */
connection.prototype._rebuild = function () {
  var emptyMessage = [];
  //再次发送信息
  var StatisticsMessage = root.lookup("easemob.pb.StatisticsBody");
  var fourthMessage = StatisticsMessage.decode(emptyMessage);
  fourthMessage.operation = 0;
  // statisticsmessage.imTime=123;
  // statisticsmessage.chatTime=123;
  fourthMessage = StatisticsMessage.encode(fourthMessage).finish();

  var MetaMessage = root.lookup("easemob.pb.Meta");
  var thirdMessage = MetaMessage.decode(emptyMessage);
  thirdMessage.id = new Date().valueOf();
  thirdMessage.ns = 0;
  thirdMessage.payload = fourthMessage;
  // metamessage = MetaMessage.encode(metamessage).finish();
  var commsynculMessage = root.lookup("easemob.pb.CommSyncUL");
  var secondMessage = commsynculMessage.decode(emptyMessage);
  secondMessage.meta = thirdMessage;
  secondMessage = commsynculMessage.encode(secondMessage).finish();

  var mainMessage = root.lookup("easemob.pb.MSync");
  var firstMessage = mainMessage.decode(emptyMessage);
  firstMessage.version = "3.0.8";
  firstMessage.encryptType = [0];
  firstMessage.command = 0;
  firstMessage.payload = secondMessage;
  firstMessage = mainMessage.encode(firstMessage).finish();
  this._base64transform(firstMessage, this);
};

connection.prototype._backqueue = function (backqueue, conn) {
  var emptyMessage = [];
  var commsynculMessage = root.lookup("easemob.pb.CommSyncUL");
  var secondMessage = commsynculMessage.decode(emptyMessage);
  secondMessage.queue = backqueue;
  secondMessage = commsynculMessage.encode(secondMessage).finish();
  var mainMessage = root.lookup("easemob.pb.MSync");
  var firstMessage = mainMessage.decode(emptyMessage);
  firstMessage.version = conn.version;
  firstMessage.encryptType = conn.encryptType;
  firstMessage.command = 0;
  firstMessage.payload = secondMessage;
  firstMessage = mainMessage.encode(firstMessage).finish();
  conn._base64transform(firstMessage, conn);
};

var unreadDeal = function unreadDeal(conn) {
  debugger;
  var emptyMessage = [];
  var MSyncMessage = root.lookup("easemob.pb.MSync");
  var firstMessage = MSyncMessage.decode(emptyMessage);
  firstMessage.version = conn.version;
  firstMessage.encryptType = conn.encryptType;
  firstMessage.command = 1;
  firstMessage = MSyncMessage.encode(firstMessage).finish();
  conn._base64transform(firstMessage, conn);
};

connection.prototype._receiveProvision = function (result, conn) {
  debugger;
  var provisionMessage = root.lookup("easemob.pb.Provision");
  var receiveProvisionResult = provisionMessage.decode(result.payload);
  conn.context.jid.clientResource = receiveProvisionResult.resource;

  if (receiveProvisionResult.status.errorCode == 0) {
    unreadDeal(conn);
    conn._rebuild(conn);
  }
};

connection.prototype.heartBeatID = 0;
connection.prototype.heartBeat = function (conn) {
  debugger;
  this.stopHeartBeat();
  this.heartBeatID = setInterval(function () {
    unreadDeal(conn);
  }, this.heartBeatWait);
};
connection.prototype.stopHeartBeat = function () {
  clearInterval(this.heartBeatID);
};

/**
    * @private
    */
connection.prototype.getRestFromHttpDNS = function (options, type) {
  if (this.restIndex > this.restTotal) {
    return;
  }
  var url = '';
  var host = this.restHosts[this.restIndex];
  var domain = host.domain;
  var ip = host.ip;
  if (ip && location.protocol == 'http:') {
    var port = host.port;
    url = (location.protocol === 'https:' ? 'https:' : 'http:') + '//' + ip + ':' + port;
  } else {
    url = (location.protocol === 'https:' ? 'https:' : 'http:') + '//' + domain;
  }
  if (url != '') {
    this.apiUrl = url;
    options.apiUrl = url;
  }

  if (type == 'login') {
    this.login(options);
  } else {
    this.signup(options);
  }
};

/**
    * @private
    */

connection.prototype.getHttpDNS = function (options, type) {
  // if (this.restHosts) {r
  //     this.getRestFromHttpDNS(options, type);
  //     return;
  // }
  var self = this;
  var suc = function suc(data, xhr) {
    // data = new DOMParser().parseFromString(data, "text/xml").documentElement;
    //get rest ips
    var restHosts = data.rest.hosts;
    if (!restHosts) {
      return;
    }

    var httpType = self.https ? 'https' : 'http';

    var useRestHosts = restHosts.filter(function (item, index) {
      if (item.protocol == httpType) {
        return item;
      }
    });

    for (var i = 0; i < useRestHosts.length; i++) {
      if (useRestHosts[i].protocol === httpType) {
        var currentPost = useRestHosts[i];
        useRestHosts.splice(i, 1);
        useRestHosts.unshift(currentPost);
      }
    }
    self.restHosts = useRestHosts;
    self.restTotal = useRestHosts.length;

    //get xmpp ips
    var makeArray = function makeArray(obj) {//伪数组转为数组
      return Array.prototype.slice.call(obj, 0);
    };
    try {
      Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType;
    } catch (e) {
      makeArray = function makeArray(obj) {
        var res = [];
        for (var i = 0, len = obj.length; i < len; i++) {
          res.push(obj[i]);
        }
        return res;
      };
    }
    var xmppHosts = data['msync-ws'].hosts;
    if (!xmppHosts) {
      return;
    }

    var useXmppHosts = xmppHosts.filter(function (item, index) {
      if (item.protocol == httpType) {
        return item;
      }
    });

    for (var i = 0; i < useXmppHosts.length; i++) {
      // var httpType = self.https ? 'https' : 'http';
      if (useXmppHosts[i].protocol === httpType) {
        var currentPost = useXmppHosts[i];
        useXmppHosts.splice(i, 1);
        useXmppHosts.unshift(currentPost);
      }
    }
    self.xmppHosts = useXmppHosts;
    self.xmppTotal = useXmppHosts.length;

    self.getRestFromHttpDNS(options, type);
  };
  var error = function error(res, xhr, msg) {
    console.log('getHttpDNS error', res, msg);
    self.dnsIndex++;
    if (self.dnsIndex < self.dnsTotal) {
      self.getHttpDNS(options, type);
    }

  };
  var options2 = {
    url: this.dnsArr[this.dnsIndex] + '/easemob/server.json',
    dataType: 'json',
    type: 'GET',

    // url: 'http://www.easemob.com/easemob/server.xml',
    // dataType: 'xml',
    data: {
      app_key: encodeURIComponent(options.appKey || this.appKey) },

    success: suc || EMPTY_FUN,
    error: error || EMPTY_FUN };

  _utils.ajax(options2);
};

/**
    * @private
    */

connection.prototype.signup = function (options) {
  var self = this;
  var orgName = options.orgName || '';
  var appName = options.appName || '';
  var appKey = options.appKey || this.appKey;
  var suc = options.success || EMPTY_FUN;
  var err = options.error || EMPTY_FUN;

  if (!orgName && !appName && appKey) {
    var devInfos = appKey.split('#');
    if (devInfos.length === 2) {
      orgName = devInfos[0];
      appName = devInfos[1];
    }
  }
  if (!orgName && !appName) {
    err({
      type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR });

    return;
  }

  var error = function error(res, xhr, msg) {
    if (self.isHttpDNS) {
      if (self.restIndex + 1 < self.restTotal) {
        self.restIndex++;
        self.getRestFromHttpDNS(options, 'signup');
        return;
      }
    }
    self.clear();
    err(res);
  };
  var https = options.https || this.https;
  var apiUrl = options.apiUrl || this.apiUrl;
  var restUrl = apiUrl + '/' + orgName + '/' + appName + '/users';

  var userjson = {
    username: options.username,
    password: options.password,
    nickname: options.nickname || '' };


  var userinfo = _utils.stringify(userjson);
  var options2 = {
    url: restUrl,
    dataType: 'json',
    data: userinfo,
    success: suc,
    error: error };

  _utils.ajax(options2);
};

/**
    * 登录  
    * @param {Object} options - 用户信息
    * @param {String} options.user - 用户名
    * @param {String} options.pwd - 用户密码，跟token二选一
    * @param {String} options.accessToken - token，跟密码二选一
    * @param {String} options.appKey - Appkey
    * @param {String} options.apiUrl - Rest 服务地址,非必须。可在项目的WebIMConfig配置
    * @param {String} options.xmppURL - Xmpp 服务地址,非必须。可在项目的WebIMConfig配置
    * @param {Function} options.success - 成功之后的回调，默认为空，token登录没有该回调
    * @param {Function} options.error - 失败之后的回调，默认为空，token登录没有该回调
    */

connection.prototype.open = function (options) {
  var appkey = options.appKey,
  orgName = appkey.split('#')[0],
  appName = appkey.split('#')[1];
  this.orgName = orgName;
  this.appName = appName;
  if (options.accessToken) {
    this.token = options.accessToken;
  }
  // if (options.xmppURL) {
  //     this.url = _getXmppUrl(options.xmppURL, this.https);
  // }
  if (this.isHttpDNS) {
    this.dnsIndex = 0;
    this.getHttpDNS(options, 'login');
  } else {
    this.login(options);
  }
};

/**
    *
    * @param options
    * @private
    */

connection.prototype.login = function (options) {
  this.user = options.user;
  var pass = _validCheck(options, this);

  if (!pass) {
    return;
  }

  var conn = this;

  if (conn.isOpened()) {//** */
    return;
  }

  if (options.accessToken) {
    options.access_token = options.accessToken;
    // conn.context.restTokenData = options;
    this._login(options, conn);
  } else {
    var apiUrl = options.apiUrl;
    var userId = this.context.userId;
    var pwd = options.pwd || '';
    var appName = this.context.appName;
    var orgName = this.context.orgName;

    var suc = function suc(data, xhr) {
      // conn.context.status = _code.STATUS_DOLOGIN_IM;
      // conn.context.restTokenData = data;
      if (options.success)
      options.success(data);
      conn.token = data.access_token;
      conn.context.restTokenData = data.access_token;
      conn._login(data, conn);
    };
    var error = function error(res, xhr, msg) {
      if (options.error)
      options.error();
      if (conn.isHttpDNS) {
        if (conn.restIndex + 1 < conn.restTotal) {
          conn.restIndex++;
          conn.getRestFromHttpDNS(options, 'login');
          return;
        }
      }
      conn.clear();
      if (res.error && res.error_description) {
        conn.onError({
          type: _code.WEBIM_CONNCTION_OPEN_USERGRID_ERROR,
          data: res,
          xhr: xhr });

      } else {
        conn.onError({
          type: _code.WEBIM_CONNCTION_OPEN_ERROR,
          data: res,
          xhr: xhr });

      }
    };

    // this.context.status = _code.STATUS_DOLOGIN_USERGRID;

    var loginJson = {
      grant_type: 'password',
      username: userId,
      password: pwd,
      timestamp: +new Date() };

    var loginfo = _utils.stringify(loginJson);

    var options2 = {
      headers: {
        'Content-type': 'application/json' },

      url: apiUrl + '/' + orgName + '/' + appName + '/token',
      dataType: 'json',
      data: loginfo,
      success: suc || EMPTY_FUN,
      error: error || EMPTY_FUN };

    _utils.ajax(options2);
  }
};


/**
    * 断开连接，同时心跳停止
    * @param {String} reason - 断开原因
    */

connection.prototype.close = function (reason) {
  this.logOut = true;
  this.context.status = _code.STATUS_CLOSING;
  this.sock.close();
  this.stopHeartBeat();
  this.context.status = _code.STATUS_CLOSING;
};


/**
    * 发送撤回消息
    * @param {Object} option - 
    * @param {Object} option.mid -   回撤消息id
    * @param {Object} option.to -   消息的接收方
    * @param {Object} option.type -  chat(单聊) groupchat(群组聊天) chatroom(聊天室聊天)
    */
connection.prototype.recallMessage = function (option) {
  var messageOption = {
    id: this.getUniqueId(),
    type: "recall",
    group: option.type,
    ackId: option.mid,
    to: option.to,
    success: option.success,
    fail: option.fail };

  this.send(messageOption, this);
};

/**
    * @private
    */
connection.prototype.sendMSync = function (str) {//
  // var strr = "";
  // this.unSendMsgArr.push(dom);
  // for (var i = 0; i < str.length; i++) {
  //     var str0 = String.fromCharCode(str[i]);
  //     strr = strr + str0;
  // }

  // strr = window.btoa(strr);
  // strr = base64transform(str)

  if (this.sock.readyState === SOCKJS_STATUS.OPEN) {
    return this._base64transform(str, this);
  } else {
    this.unSendMsgArr.push(this._base64transform(str, this, true));
    if (!this.logOut &&
    this.autoReconnectNumTotal < this.autoReconnectNumMax && (
    this.autoReconnectNumTotal <= this.xmppHosts.length && this.isHttpDNS || !this.isHttpDNS))
    {
      this.offLineSendConnecting = true;
      this.reconnect();
    }
    this.onError({
      type: _code.WEBIM_CONNCTION_DISCONNECTED,
      reconnect: true });

  }
};

/**
    * 随机生成一个id用于消息id
    * @param {String} prefix - 前缀，默认为"WEBIM_"
    */

connection.prototype.getUniqueId = function (prefix) {//*******
  // fix: too frequently msg sending will make same id
  if (this.autoIncrement) {
    this.autoIncrement++;
  } else {
    this.autoIncrement = 1;
  }
  var cdate = new Date();
  var offdate = new Date(2010, 1, 1);
  var offset = cdate.getTime() - offdate.getTime();
  var hexd = offset + this.autoIncrement;
  return hexd;

};

/**
    * 发送消息
    * @param {Object} messageSource - 由 Class Message 生成
    * @example
    *let deliverMessage = new WebIM.message('delivery', msgId);
    *deliverMessage.set({
    *  id: msgId, 
    *  to: msg.from
    *});
    *conn.send(deliverMessage.body);
    */

connection.prototype.send = function (messageOption) {
  var self = this;
  (0, _sendChatMessage.default)(messageOption, self, _utils);
  this._msgHash[messageOption.id] = messageOption;
};


/**
    * 删除联系人
    *
    * @param {Object} options -
    * @param {String} options.to - 联系人ID
    * @param {Function} options.success - 成功之后的回调，默认为空
    * @param {Function} options.error - 失败之后的回调，默认为空
    */

connection.prototype.removeRoster = function (options) {
  _HandleRosterMessage.default.operatRoster(options, "remove", this);
};


/**
    * 订阅和反向订阅
    * @example
    *
    * A订阅B（A添加B为好友）
    * A执行：
    *  conn.subscribe({
           to: 'B',
           message: 'Hello~'
       });
    B的监听函数onPresence参数message.type == subscribe监听到有人订阅他
    B执行：
    conn.subscribed({
       to: 'A',
       message: '[resp:true]'
    });
    同意A的订阅请求
   //  B继续执行：
   //  conn.subscribe({
   //     to: 'A',
   //     message: '[resp:true]'
   //  });
   //  反向订阅A，这样才算双方添加好友成功。
   //被注释部分 sdk 3.0之后需要去掉
    若B拒绝A的订阅请求，只需执行：
    conn.unsubscribed({
       to: 'A',
       message: 'I do not want to be subscribed'
    });
    另外，在监听函数onPresence参数message.type == "subscribe"这个case中，加一句
    if (message && message.status === '[resp:true]') {
       return;
    }
    否则会进入死循环
    *
    * @param {Object} options - 
    * @param {String} options.to - 想要订阅的联系人ID
    * @param {String} options.nick - 想要订阅的联系人昵称 （非必须）
    * @param {String} options.message - 发送给想要订阅的联系人的验证消息（非必须）
    */
connection.prototype.subscribe = function (options) {
  _HandleRosterMessage.default.operatRoster(options, "add", this);
};

/**
    * 被订阅后确认同意被订阅
    * @param {Object} options - 
    * @param {String} options.to - 订阅人的ID
    * @param {String} options.message  - 默认为[resp:true]，后续将去掉该参数
    */
connection.prototype.subscribed = function (options) {
  _HandleRosterMessage.default.operatRoster(options, "accept", this);
};

/**
    * 拒绝对方的订阅请求
    * @param {Object} options -
    * @param {String} options.to - 订阅人的ID
    * @param {String} options.message - 发送给拒绝订阅的联系人的验证消息（非必须）
    */
connection.prototype.unsubscribed = function (options) {
  _HandleRosterMessage.default.operatRoster(options, "decline", this);
};

/**
    * @private
    *
    */
connection.prototype.isOpened = function () {
  return this.sock && this.sock.readyState === SOCKJS_STATUS.OPEN;
};

/**
    * @private
    *
    */
connection.prototype.clear = function () {
  var key = this.context.appKey;
  if (this.errorType != _code.WEBIM_CONNCTION_DISCONNECTED) {
    // this.context = {
    //     status: _code.STATUS_INIT,
    //     appKey: key
    // };
    if (this.logOut) {
      this.unSendMsgArr = [];
      this.offLineSendConnecting = false;
      this.context = {
        status: _code.STATUS_INIT,
        appKey: key };

    }
  }
  if (this.intervalId) {
    clearInterval(this.intervalId);
  }
  this.restIndex = 0;
  this.xmppIndex = 0;

  if (this.errorType == _code.WEBIM_CONNCTION_CLIENT_LOGOUT || this.errorType == -1) {
    var message = {
      data: {
        data: "logout" },

      type: _code.WEBIM_CONNCTION_CLIENT_LOGOUT };

    this.onError(message);
  }
};

/**
    * @private
    *
    */
connection.prototype.autoReconnectInterval = 0;
connection.prototype.times = 1;
connection.prototype.reconnect = function (v) {
  var that = this;
  if (that.xmppIndex < that.xmppHosts.length - 1) {
    that.xmppIndex++; //重连时改变ip地址
  }
  setTimeout(function () {
    that._login({
      access_token: that.context.accessToken },
    that);
    that.autoReconnectInterval += that.times * that.times;
    that.times++;
  }, (this.autoReconnectNumTotal == 0 ? 0 : that.autoReconnectInterval) * 1000);
  this.autoReconnectNumTotal++;
};

/**
    *
    * @private
    * @deprecated
    */
connection.prototype.closed = function () {
  var message = {
    data: {
      data: "Closed error" },

    type: _code.WEBIM_CONNECTION_CLOSED };

  this.onError(message);
  this.stopHeartBeat();
};

/**
    * 将好友加入到黑名单
    * @param {Object} options -    //&&&&
    * @param {Object[]} options.name - 用户ID,添加一个为单个用户ID；批量添加为用户ID数组，如["user1","user2",...]
    */
connection.prototype.addToBlackList = function (options) {
  _HandleRosterMessage.default.operatRoster({
    to: options.name },
  "ban", this);
};

/**
    * 将好友从黑名单移除
    * @param {Object} options -      //&&&&&
    * @param {Object[]} options.name - 用户ID,删除一个为单个用户ID，如 "user1"；批量删除为用户ID数组，如 ["user1","user2",...]
    */
connection.prototype.removeFromBlackList = function (options) {
  _HandleRosterMessage.default.operatRoster({
    to: options.name },
  "allow", this);
};

Object.assign(connection.prototype, _restApis.default);

WebIM.connection = connection;

WebIM.doQuery = function (str, suc, fail) {
  if (typeof window.cefQuery === 'undefined') {
    return;
  }
  window.cefQuery({
    request: str,
    persistent: false,
    onSuccess: suc,
    onFailure: fail });

};

// window.WebIM = WebIM;
if (false) {}

WebIM.debug = function (bool) {};var _default =

WebIM;exports.default = _default;

/***/ }),
/* 11 */
/*!***********************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/status.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var getCode = function getCode() {
  //管理各种错误信息
  return {
    WEBIM_CONNCTION_USER_NOT_ASSIGN_ERROR: 0,
    WEBIM_CONNCTION_OPEN_ERROR: 1,
    WEBIM_CONNCTION_AUTH_ERROR: 2,
    WEBIM_CONNCTION_OPEN_USERGRID_ERROR: 3,
    WEBIM_CONNCTION_ATTACH_ERROR: 4,
    WEBIM_CONNCTION_ATTACH_USERGRID_ERROR: 5,
    WEBIM_CONNCTION_REOPEN_ERROR: 6,
    WEBIM_CONNCTION_SERVER_CLOSE_ERROR: 7, //7: client-side network offline (net::ERR_INTERNET_DISCONNECTED)
    WEBIM_CONNCTION_SERVER_ERROR: 8, //8: offline by multi login
    WEBIM_CONNCTION_IQ_ERROR: 9,
    WEBIM_CONNCTION_USER_REMOVED: 207,
    WEBIM_CONNCTION_USER_LOGIN_ANOTHER_DEVICE: 206,
    WEBIM_CONNCTION_USER_KICKED_BY_CHANGE_PASSWORD: 216,
    WEBIM_CONNCTION_USER_KICKED_BY_OTHER_DEVICE: 217,

    WEBIM_CONNCTION_PING_ERROR: 10,
    WEBIM_CONNCTION_NOTIFYVERSION_ERROR: 11,
    WEBIM_CONNCTION_GETROSTER_ERROR: 12,
    WEBIM_CONNCTION_CROSSDOMAIN_ERROR: 13,
    WEBIM_CONNCTION_LISTENING_OUTOF_MAXRETRIES: 14,
    WEBIM_CONNCTION_RECEIVEMSG_CONTENTERROR: 15,
    WEBIM_CONNCTION_DISCONNECTED: 16, //16: server-side close the websocket connection
    WEBIM_CONNCTION_AJAX_ERROR: 17,
    WEBIM_CONNCTION_JOINROOM_ERROR: 18,
    WEBIM_CONNCTION_GETROOM_ERROR: 19,

    WEBIM_CONNCTION_GETROOMINFO_ERROR: 20,
    WEBIM_CONNCTION_GETROOMMEMBER_ERROR: 21,
    WEBIM_CONNCTION_GETROOMOCCUPANTS_ERROR: 22,
    WEBIM_CONNCTION_LOAD_CHATROOM_ERROR: 23,
    WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR: 24,
    WEBIM_CONNCTION_JOINCHATROOM_ERROR: 25,
    WEBIM_CONNCTION_QUITCHATROOM_ERROR: 26,
    WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR: 27,
    WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR: 28,
    WEBIM_CONNCTION_SESSIONID_NOT_ASSIGN_ERROR: 29,

    WEBIM_CONNCTION_RID_NOT_ASSIGN_ERROR: 30,
    WEBIM_CONNCTION_CALLBACK_INNER_ERROR: 31, //31: 处理下行消息出错 try/catch抛出异常
    WEBIM_CONNCTION_CLIENT_OFFLINE: 32, //32: client offline
    WEBIM_CONNCTION_CLIENT_LOGOUT: 33, //33: client logout
    WEBIM_CONNCTION_CLIENT_TOO_MUCH_ERROR: 34, // 34: Over amount of the tabs a user opened in the same browser
    WEBIM_CONNECTION_ACCEPT_INVITATION_FROM_GROUP: 35,
    WEBIM_CONNECTION_DECLINE_INVITATION_FROM_GROUP: 36,
    WEBIM_CONNECTION_ACCEPT_JOIN_GROUP: 37,
    WEBIM_CONNECTION_DECLINE_JOIN_GROUP: 38,
    WEBIM_CONNECTION_CLOSED: 39,


    WEBIM_UPLOADFILE_BROWSER_ERROR: 100,
    WEBIM_UPLOADFILE_ERROR: 101,
    WEBIM_UPLOADFILE_NO_LOGIN: 102,
    WEBIM_UPLOADFILE_NO_FILE: 103,


    WEBIM_DOWNLOADFILE_ERROR: 200,
    WEBIM_DOWNLOADFILE_NO_LOGIN: 201,
    WEBIM_DOWNLOADFILE_BROWSER_ERROR: 202,


    WEBIM_MESSAGE_REC_TEXT: 300,
    WEBIM_MESSAGE_REC_TEXT_ERROR: 301,
    WEBIM_MESSAGE_REC_EMOTION: 302,
    WEBIM_MESSAGE_REC_PHOTO: 303,
    WEBIM_MESSAGE_REC_AUDIO: 304,
    WEBIM_MESSAGE_REC_AUDIO_FILE: 305,
    WEBIM_MESSAGE_REC_VEDIO: 306,
    WEBIM_MESSAGE_REC_VEDIO_FILE: 307,
    WEBIM_MESSAGE_REC_FILE: 308,
    WEBIM_MESSAGE_SED_TEXT: 309,
    WEBIM_MESSAGE_SED_EMOTION: 310,
    WEBIM_MESSAGE_SED_PHOTO: 311,
    WEBIM_MESSAGE_SED_AUDIO: 312,
    WEBIM_MESSAGE_SED_AUDIO_FILE: 313,
    WEBIM_MESSAGE_SED_VEDIO: 314,
    WEBIM_MESSAGE_SED_VEDIO_FILE: 315,
    WEBIM_MESSAGE_SED_FILE: 316,
    WEBIM_MESSAGE_SED_ERROR: 317,


    STATUS_INIT: 400,
    STATUS_DOLOGIN_USERGRID: 401,
    STATUS_DOLOGIN_IM: 402,
    STATUS_OPENED: 403,
    STATUS_CLOSING: 404,
    STATUS_CLOSED: 405,
    STATUS_ERROR: 406,

    GROUP_NOT_EXIST: 605,
    GROUP_NOT_JOINED: 602,
    MESSAGE_RECALL_TIME_LIMIT: 504,
    SERVICE_NOT_ENABLED: 505,
    SERVICE_NOT_ALLOW_MESSAGING: 506,
    SERVER_UNKNOWN_ERROR: 503, //未知异常
    MESSAGE_INCLUDE_ILLEGAL_CONTENT: 501, //消息内容包含非法或敏感词
    PERMISSION_DENIED: 603, //权限问题
    WEBIM_LOAD_MSG_ERROR: 604 //消息发送失败下行
  };

};var _default =

getCode;exports.default = _default;

/***/ }),
/* 12 */
/*!************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/message.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var Message = function Message(type, id) {
  if (!this instanceof Message) {
    return new Message(type);
  }

  this._msg = {};
  if (typeof Message[type] === 'function') {
    Message[type].prototype.setGroup = this.setGroup;
    this._msg = new Message[type](id);
  }
  return this._msg;
};
Message.prototype.setGroup = function (group) {
  this.body.group = group;
};
Message.prototype._utils = {};
/*
                                * Read Message
                                */
Message.read = function (id) {
  this.id = id;
  this.type = 'read';
};

Message.read.prototype.set = function (opt) {
  this.body = {
    id: this.id,
    type: this.type,
    ackId: opt.id,
    to: opt.to,
    msgConfig: opt.msgConfig,
    ackContent: opt.ackContent };

  !opt.msgConfig && delete this.body.msgConfig;
  !opt.ackContent && delete this.body.ackContent;
};

/*
    * deliver message
    */
Message.delivery = function (id) {
  this.id = id;
  this.type = 'delivery';
};

Message.delivery.prototype.set = function (opt) {
  this.body = {
    id: this.id,
    type: this.type,
    ackId: opt.ackId,
    to: opt.to };

};

/*
    * text message
    */
Message.txt = function (id) {
  this.id = id;
  this.type = 'txt';
  this.body = {};
};
Message.txt.prototype.set = function (opt) {
  this.value = opt.msg;
  this.body = {
    id: this.id,
    to: opt.to,
    from: opt.from,
    msg: this.value,
    type: this.type,
    roomType: opt.roomType,
    ext: opt.ext || {},
    success: opt.success,
    fail: opt.fail,
    msgConfig: opt.msgConfig };

  !opt.msgConfig && delete this.body.msgConfig;
  !opt.roomType && delete this.body.roomType;
};

/*
    * cmd message
    */
Message.cmd = function (id) {
  this.id = id;
  this.type = 'cmd';
  this.body = {};
};
Message.cmd.prototype.set = function (opt) {
  this.value = '';

  this.body = {
    id: this.id,
    to: opt.to,
    from: opt.from,
    action: opt.action,
    msg: this.value,
    type: this.type,
    roomType: opt.roomType,
    ext: opt.ext || {},
    success: opt.success };

  !opt.roomType && delete this.body.roomType;
};

/*
    * custom message
    */
Message.custom = function (id) {
  this.id = id;
  this.type = 'custom';
  this.body = {};
};
Message.custom.prototype.set = function (opt) {
  this.body = {
    id: this.id,
    to: opt.to,
    from: opt.from,
    params: opt.params,
    customEvent: opt.customEvent,
    customExts: opt.customExts,
    type: this.type,
    roomType: opt.roomType,
    ext: opt.ext || {},
    success: opt.success };

  !opt.roomType && delete this.body.roomType;
};

/*
    * loc message
    */
Message.location = function (id) {
  this.id = id;
  this.type = 'loc';
  this.body = {};
};
Message.location.prototype.set = function (opt) {
  this.body = {
    id: this.id,
    to: opt.to,
    type: this.type,
    roomType: opt.roomType,
    addr: opt.addr,
    lat: opt.lat,
    lng: opt.lng,
    ext: opt.ext || {} };

};

/*
    * img message
    */
Message.img = function (id) {
  this.id = id;
  this.type = 'img';
  this.body = {};
};
Message.img.prototype.set = function (opt) {
  opt.file = opt.file || Message.prototype.getFileUrl(opt.fileInputId);
  this.value = opt.file;

  this.body = {
    id: this.id,
    file: this.value,
    apiUrl: opt.apiUrl,
    to: opt.to,
    from: opt.from,
    type: this.type,
    ext: opt.ext || {},
    roomType: opt.roomType,
    onFileUploadError: opt.onFileUploadError,
    onFileUploadComplete: opt.onFileUploadComplete,
    success: opt.success,
    fail: opt.fail,
    flashUpload: opt.flashUpload,
    width: opt.width,
    height: opt.height,
    body: opt.body,
    uploadError: opt.uploadError,
    uploadComplete: opt.uploadComplete };


  !opt.roomType && delete this.body.roomType;
};

/*
    * audio message
    */
Message.audio = function (id) {
  this.id = id;
  this.type = 'audio';
  this.body = {};
};
Message.audio.prototype.set = function (opt) {
  opt.file = opt.file || this._utils.getFileUrl(opt.fileInputId);

  this.value = opt.file;
  this.filename = opt.filename || this.value.filename;

  this.body = {
    id: this.id,
    file: this.value,
    filename: this.filename,
    apiUrl: opt.apiUrl,
    to: opt.to,
    from: opt.from,
    type: this.type,
    ext: opt.ext || {},
    length: opt.length || 0,
    roomType: opt.roomType,
    file_length: opt.file_length,
    onFileUploadError: opt.onFileUploadError,
    onFileUploadComplete: opt.onFileUploadComplete,
    success: opt.success,
    fail: opt.fail,
    flashUpload: opt.flashUpload,
    body: opt.body };

  !opt.roomType && delete this.body.roomType;
};

/*
    * file message
    */
Message.file = function (id) {
  this.id = id;
  this.type = 'file';
  this.body = {};
};
Message.file.prototype.set = function (opt) {
  opt.file = opt.file || this._utils.getFileUrl(opt.fileInputId);

  this.value = opt.file;
  this.filename = opt.filename || this.value.filename;

  this.body = {
    id: this.id,
    file: this.value,
    filename: this.filename,
    apiUrl: opt.apiUrl,
    to: opt.to,
    from: opt.from,
    type: this.type,
    ext: opt.ext || {},
    roomType: opt.roomType,
    onFileUploadError: opt.onFileUploadError,
    onFileUploadComplete: opt.onFileUploadComplete,
    success: opt.success,
    fail: opt.fail,
    flashUpload: opt.flashUpload,
    body: opt.body };

  !opt.roomType && delete this.body.roomType;
};

/*
    * video message
    */
Message.video = function (id) {
  this.id = id;
  this.type = 'video';
  this.body = {};
};
Message.video.prototype.set = function (opt) {
  opt.file = opt.file || this._utils.getFileUrl(opt.fileInputId);

  this.value = opt.file;
  this.filename = opt.filename || this.value.filename;

  this.body = {
    id: this.id,
    file: this.value,
    filename: this.filename,
    apiUrl: opt.apiUrl,
    to: opt.to,
    from: opt.from,
    type: this.type,
    ext: opt.ext || {},
    length: opt.length || 0,
    roomType: opt.roomType,
    file_length: opt.file_length,
    onFileUploadError: opt.onFileUploadError,
    onFileUploadComplete: opt.onFileUploadComplete,
    success: opt.success,
    fail: opt.fail,
    flashUpload: opt.flashUpload,
    body: opt.body };

  !opt.roomType && delete this.body.roomType;
};

var _msg = {
  // _msg: _Message,
  message: Message };var _default =


Message;exports.default = _default;

/***/ }),
/* 13 */
/*!**********************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/queue.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function Array_h(length) {
  this.array = length === undefined ? [] : new Array(length);
}

Array_h.prototype = {
  /**
                       * 返回数组长度
                       *
                       * @return {Number} length [数组长度]
                       */
  length: function length() {
    return this.array.length;
  },

  at: function at(index) {
    return this.array[index];
  },

  set: function set(index, obj) {
    this.array[index] = obj;
  },

  /**
      * 向数组的末尾添加一个或多个元素，并返回新的长度。
      *
      * @param  {*} obj [description]
      * @return {Number} length [新数组的长度]
      */
  push: function push(obj) {
    return this.array.push(obj);
  },

  /**
      * 返回数组中选定的元素
      *
      * @param  {Number} start [开始索引值]
      * @param  {Number} end [结束索引值]
      * @return {Array} newArray  [新的数组]
      */
  slice: function slice(start, end) {
    return this.array = this.array.slice(start, end);
  },

  concat: function concat(array) {
    this.array = this.array.concat(array);
  },

  remove: function remove(index, count) {
    count = count === undefined ? 1 : count;
    this.array.splice(index, count);
  },

  join: function join(separator) {
    return this.array.join(separator);
  },

  clear: function clear() {
    this.array.length = 0;
  } };


/**
        * 先进先出队列 (First Input First Output)
        *
        * 一种先进先出的数据缓存器
        */
var Queue = function Queue() {
  this._array_h = new Array_h();
};

Queue.prototype = {
  _index: 0,

  /**
              * 排队
              *
              * @param  {Object} obj [description]
              * @return {[type]}     [description]
              */
  push: function push(obj) {
    this._array_h.push(obj);
  },

  /**
      * 出队
      *
      * @return {Object} [description]
      */
  pop: function pop() {
    var ret = null;
    if (this._array_h.length()) {
      ret = this._array_h.at(this._index);
      if (++this._index * 2 >= this._array_h.length()) {
        this._array_h.slice(this._index);
        this._index = 0;
      }
    }
    return ret;
  },

  /**
      * 返回队列中头部(即最新添加的)的动态对象
      *
      * @return {Object} [description]
      */
  head: function head() {
    var ret = null,
    len = this._array_h.length();
    if (len) {
      ret = this._array_h.at(len - 1);
    }
    return ret;
  },

  /**
      * 返回队列中尾部(即最早添加的)的动态对象
      *
      * @return {Object} [description]
      */
  tail: function tail() {
    var ret = null,
    len = this._array_h.length();
    if (len) {
      ret = this._array_h.at(this._index);
    }
    return ret;
  },

  /**
      * 返回数据队列长度
      *
      * @return {Number} [description]
      */
  length: function length() {
    return this._array_h.length() - this._index;
  },

  /**
      * 队列是否为空
      *
      * @return {Boolean} [description]
      */
  empty: function empty() {
    return this._array_h.length() === 0;
  },

  clear: function clear() {
    this._array_h.clear();
  } };var _default =

Queue;exports.default = _default;

/***/ }),
/* 14 */
/*!*************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/chat/sendChatMessage.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils;

function encodeKeyValueMsg(msg) {
  if (!msg || typeof msg != "object") {
    return;
  }
  var emptyMessage = [];
  var keyValueBody = this.context.root.lookup("easemob.pb.KeyValue");
  var keyValueBodyArr = [];
  for (var key in msg) {
    var keyValueBodyMessage = keyValueBody.decode(emptyMessage);
    keyValueBodyMessage.key = key;

    if (typeof msg[key] == "object") {
      keyValueBodyMessage.type = 8;
      keyValueBodyMessage.stringValue = JSON.stringify(msg[key]);
    } else if (typeof msg[key] == "string") {
      keyValueBodyMessage.type = 7;
      keyValueBodyMessage.stringValue = msg[key];
    } else if (typeof msg[key] == "boolean") {
      keyValueBodyMessage.type = 1;
      keyValueBodyMessage.varintValue = msg[key];
    } else if (Number.isInteger(msg[key])) {
      keyValueBodyMessage.type = 2;
      keyValueBodyMessage.varintValue = msg[key];
    } else {
      keyValueBodyMessage.type = 6;
      keyValueBodyMessage.doubleValue = msg[key];
    }
    keyValueBodyArr.push(keyValueBodyMessage);
  }
  return keyValueBodyArr;
}

var sendMessage = function sendMessage(messageOption, conn) {
  var self = conn;
  conn.isDebug && console.log('上行消息：', messageOption);
  var emptyMessage = [];
  var contentMessage = conn.context.root.lookup("easemob.pb.MessageBody.Content");
  var fifthMessage = contentMessage.decode(emptyMessage);
  var keyValueBody = conn.context.root.lookup("easemob.pb.KeyValue");
  var keyValueBodyArr = [];

  switch (messageOption.type) {
    case 'txt':
      fifthMessage.type = 0;
      fifthMessage.text = messageOption.msg;
      break;
    case 'img':
      fifthMessage.type = 1;
      fifthMessage.displayName = messageOption.body.filename;
      fifthMessage.remotePath = messageOption.body.url;
      fifthMessage.secretKey = messageOption.body.secret;
      fifthMessage.fileLength = messageOption.body.file_length;
      fifthMessage.size = messageOption.body.size;
      fifthMessage.thumbnailDisplayName = messageOption.body.filename;
      break;
    case 'video':
      fifthMessage.type = 2;
      fifthMessage.displayName = messageOption.body.filename;
      fifthMessage.remotePath = messageOption.body.url;
      fifthMessage.secretKey = messageOption.body.secret;
      fifthMessage.fileLength = messageOption.body.file_length;
      fifthMessage.duration = messageOption.body.length;
      fifthMessage.thumbnailDisplayName = messageOption.body.filename;
      break;
    case 'loc':
      fifthMessage.type = 3;
      fifthMessage.latitude = messageOption.lat;
      fifthMessage.longitude = messageOption.lng;
      fifthMessage.address = messageOption.addr;
      fifthMessage.latitude = messageOption.lat;
      break;
    case 'audio':
      fifthMessage.type = 4;
      fifthMessage.displayName = messageOption.body.filename;
      fifthMessage.remotePath = messageOption.body.url;
      fifthMessage.secretKey = messageOption.body.secret;
      fifthMessage.fileLength = messageOption.body.file_length;
      fifthMessage.duration = messageOption.body.length;
      fifthMessage.size = messageOption.body.size;
      fifthMessage.thumbnailDisplayName = messageOption.body.filename;
      break;
    case 'file':
      fifthMessage.type = 5;
      fifthMessage.displayName = messageOption.body.filename;
      fifthMessage.remotePath = messageOption.body.url;
      fifthMessage.secretKey = messageOption.body.secret;
      fifthMessage.fileLength = messageOption.body.file_length;
      fifthMessage.size = messageOption.body.size;
      fifthMessage.thumbnailDisplayName = messageOption.body.filename;
      break;
    case 'cmd':
      fifthMessage.type = 6;
      fifthMessage.action = messageOption.action;
      // fifthMessage.params = 
      break;
    case 'custom':
      fifthMessage.type = 7;
      fifthMessage.params = encodeKeyValueMsg.call(conn, messageOption.params);
      fifthMessage.customEvent = messageOption.customEvent;
      fifthMessage.customExts = encodeKeyValueMsg.call(conn, messageOption.customExts);
      break;
    // default:
    //     throw Error('Unknown type:' + messageOption.type)
    //     break;
  }

  if (messageOption.ext) {
    for (var key in messageOption.ext) {
      var keyValueBodyMessage = keyValueBody.decode(emptyMessage);
      keyValueBodyMessage.key = key;
      if (typeof messageOption.ext[key] == "object") {
        keyValueBodyMessage.type = 8;
        keyValueBodyMessage.stringValue = JSON.stringify(messageOption.ext[key]);
      } else if (typeof messageOption.ext[key] == "string") {
        keyValueBodyMessage.type = 7;
        keyValueBodyMessage.stringValue = messageOption.ext[key];
      } else if (typeof messageOption.ext[key] == "boolean") {
        keyValueBodyMessage.type = 1;
        keyValueBodyMessage.varintValue = messageOption.ext[key];
      } else if (Number.isInteger(messageOption.ext[key])) {
        keyValueBodyMessage.type = 2;
        keyValueBodyMessage.varintValue = messageOption.ext[key];
      } else {
        keyValueBodyMessage.type = 6;
        keyValueBodyMessage.doubleValue = messageOption.ext[key];
      }

      keyValueBodyArr.push(keyValueBodyMessage);
    }
  }
  var messageBody = conn.context.root.lookup("easemob.pb.MessageBody");
  var fourthMessage = messageBody.decode(emptyMessage);
  if (messageOption.type === "recall") {
    fourthMessage.type = 6;
    // fourthMessage.from = conn.context.jid;
    // fourthMessage.to = {
    //     appKey: conn.appKey,
    //     name: messageOption.to,
    //     domain: "easemob.com",
    //     // clientResource: conn.clientResource
    // }
    fourthMessage.from = {
      name: conn.context.jid.name };

    fourthMessage.to = {
      name: messageOption.to };

    fourthMessage.ackMessageId = messageOption.ackId;
  } else if (messageOption.type === "delivery") {//目前为单聊的delivery
    fourthMessage.type = 5;
    // fourthMessage.from = conn.context.jid;
    // fourthMessage.to = {
    //     appKey: conn.appKey,
    //     name: messageOption.to,
    //     domain: "easemob.com",
    //     // clientResource: conn.clientResource
    // }
    fourthMessage.from = {
      name: conn.context.jid.name };

    fourthMessage.to = {
      name: messageOption.to };

    fourthMessage.ackMessageId = messageOption.ackId;
  } else if (messageOption.type === "read") {
    fourthMessage.type = 4;
    // fourthMessage.from = conn.context.jid;
    // fourthMessage.to = {
    //     appKey: conn.appKey,
    //     name: messageOption.to,
    //     domain: "easemob.com",
    //     // clientResource: conn.clientResource
    // }
    fourthMessage.from = {
      name: conn.context.jid.name };

    fourthMessage.to = {
      name: messageOption.to };

    fourthMessage.ackMessageId = messageOption.ackId;
    if (messageOption.msgConfig && messageOption.group === "groupchat" && !messageOption.roomType) {
      fourthMessage.msgConfig = messageOption.msgConfig;
      fourthMessage.ackContent = messageOption.ackContent;
    }
  } else if (!messageOption.group && !messageOption.roomType) {
    fourthMessage.type = 1;
    // fourthMessage.to = {
    //     appKey: conn.appKey,
    //     name: messageOption.to,
    //     domain: "easemob.com",
    //     // clientResource: conn.clientResource
    // }
    fourthMessage.from = {
      name: conn.context.jid.name };

    fourthMessage.to = {
      name: messageOption.to };

  } else if (messageOption.group === "groupchat" && !messageOption.roomType) {
    fourthMessage.type = 2;
    // fourthMessage.from = {
    //     appKey: conn.appKey,
    //     name: conn.user,
    //     domain: "conference.easemob.com",
    //     clientResource: conn.clientResource
    // };
    // fourthMessage.to = {
    //     appKey: conn.appKey,
    //     name: messageOption.to,
    //     domain: "conference.easemob.com",
    //     // clientResource: conn.clientResource
    // }
    fourthMessage.from = {
      name: conn.context.jid.name };

    fourthMessage.to = {
      name: messageOption.to };

    if (messageOption.msgConfig) {
      fourthMessage.msgConfig = messageOption.msgConfig;
    }

  } else if (messageOption.group === "groupchat" && messageOption.roomType) {
    fourthMessage.type = 3;
    // fourthMessage.from = {
    //     appKey: conn.appKey,
    //     name: conn.user,
    //     domain: "conference.easemob.com",
    //     clientResource: conn.clientResource
    // };
    // fourthMessage.to = {
    //     appKey: conn.appKey,
    //     name: messageOption.to,
    //     domain: "conference.easemob.com",
    //     // clientResource: conn.clientResource
    // }
    fourthMessage.from = {
      name: conn.context.jid.name };

    fourthMessage.to = {
      name: messageOption.to };

  }
  fourthMessage.contents = [fifthMessage];
  fourthMessage.ext = keyValueBodyArr;

  fourthMessage = messageBody.encode(fourthMessage).finish();
  var MetaMessage = conn.context.root.lookup("easemob.pb.Meta");
  var thirdMessage = MetaMessage.decode(emptyMessage);
  thirdMessage.id = messageOption.id;
  if (messageOption.type === "recall") {
    thirdMessage.from = conn.context.jid;
    var domain = "easemob.com";
    if (messageOption.group === 'groupchat' || messageOption.group === 'chatroom') {
      domain = 'conference.easemob.com';
    }
    thirdMessage.to = {
      appKey: conn.appKey,
      name: messageOption.to,
      domain: domain
      // clientResource: conn.clientResource
    };
  } else if (messageOption.type === "delivery") {//目前为单聊的delivery
    thirdMessage.from = conn.context.jid;
    thirdMessage.to = {
      appKey: conn.appKey,
      name: messageOption.to,
      domain: "easemob.com"
      // clientResource: conn.clientResource
    };
  } else if (messageOption.type === "read") {//目前为单聊的read
    thirdMessage.from = conn.context.jid;
    var domain = "easemob.com";
    if (messageOption.group === 'groupchat') {
      domain = 'conference.easemob.com';
    }
    thirdMessage.to = {
      appKey: conn.appKey,
      name: messageOption.to,
      domain: domain
      // clientResource: conn.clientResource
    };
  } else if (!messageOption.group && !messageOption.roomType) {
    thirdMessage.from = conn.context.jid;
    thirdMessage.to = {
      appKey: conn.appKey,
      name: messageOption.to,
      domain: "easemob.com"
      // clientResource: conn.clientResource
    };
  } else if (messageOption.group === "groupchat" && !messageOption.roomType) {
    thirdMessage.from = {
      appKey: conn.appKey,
      name: conn.user,
      domain: "conference.easemob.com"
      // clientResource: conn.clientResource
    };
    thirdMessage.to = {
      appKey: conn.appKey,
      name: messageOption.to,
      domain: "conference.easemob.com"
      // clientResource: conn.clientResource
    };
  } else if (messageOption.group === "groupchat" && messageOption.roomType) {
    thirdMessage.from = {
      appKey: conn.appKey,
      name: conn.user,
      domain: "conference.easemob.com"
      // clientResource: conn.clientResource
    };
    thirdMessage.to = {
      appKey: conn.appKey,
      name: messageOption.to,
      domain: "conference.easemob.com"
      // clientResource: conn.clientResource
    };
  }
  thirdMessage.ns = 1;
  thirdMessage.payload = fourthMessage;
  var commSyncULMessage = conn.context.root.lookup("easemob.pb.CommSyncUL");
  var secondMessage = commSyncULMessage.decode(emptyMessage);
  secondMessage.meta = thirdMessage;
  secondMessage = commSyncULMessage.encode(secondMessage).finish();
  var msyncMessage = conn.context.root.lookup("easemob.pb.MSync");
  var firstMessage = msyncMessage.decode(emptyMessage);
  firstMessage.version = conn.version;
  firstMessage.encryptType = conn.encryptType;
  firstMessage.command = 0;
  firstMessage.guid = conn.context.jid;
  firstMessage.payload = secondMessage;
  firstMessage = msyncMessage.encode(firstMessage).finish();
  conn.sendMSync(firstMessage);
};

var sendChatMessage = function sendChatMessage(messageOption, conn, utils) {
  _utils = utils;
  var me = conn || this;
  //var me = this;
  me.msg = messageOption;
  if (messageOption.file) {
    if (me.msg.body && me.msg.body.url) {// Only send msg
      sendMessage(me.msg, conn);
      return;
    }
    var _tmpComplete = me.msg.onFileUploadComplete;
    var _complete = function _complete(data) {
      if (data.entities[0]['file-metadata']) {
        var file_len = data.entities[0]['file-metadata']['content-length'];
        // me.msg.file_length = file_len;
        me.msg.filetype = data.entities[0]['file-metadata']['content-type'];
        if (file_len > 204800) {
          me.msg.thumbnail = true;
        }
      }

      me.msg.body = {
        type: me.msg.type || 'file',
        url: (conn.isHttpDNS ? conn.apiUrl + data.uri.substr(data.uri.indexOf("/", 9)) : data.uri) + '/' + data.entities[0]['uuid'],
        secret: data.entities[0]['share-secret'],
        filename: me.msg.file.filename || me.msg.filename,
        size: {
          width: me.msg.width || 0,
          height: me.msg.height || 0 },

        length: me.msg.length || 0,
        file_length: me.msg.ext.file_length || 0,
        filetype: me.msg.filetype || me.msg.file.filetype };

      sendMessage(me.msg, conn);
      _tmpComplete instanceof Function && _tmpComplete(data, me.msg.id);
    };

    me.msg.onFileUploadComplete = _complete;
    _utils.uploadFile.call(conn, me.msg);
  } else {
    sendMessage(me.msg, conn);
  }
};var _default =

sendChatMessage;exports.default = _default;

/***/ }),
/* 15 */
/*!***************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/chat/handleChatMessage.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _long = _interopRequireDefault(__webpack_require__(/*! ../../node_modules/long/dist/long */ 16));
var _sendChatMessage = _interopRequireDefault(__webpack_require__(/*! ./sendChatMessage */ 14));
var _status = _interopRequireDefault(__webpack_require__(/*! ../status */ 11));
var _message = _interopRequireDefault(__webpack_require__(/*! ../message */ 12));
var _commonUtil = _interopRequireDefault(__webpack_require__(/*! ../utils/commonUtil */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var _code = (0, _status.default)();
var ContentsType = {
  0: "TEXT",
  1: "IMAGE",
  2: "VIDEO",
  3: "LOCATION",
  4: "VOICE",
  5: "FILE",
  6: "COMMAND",
  7: "CUSTOM" };

var sendDelivery = function sendDelivery(conn, msg, msgId) {
  if (conn.delivery && msg.from !== msg.to) {
    var id = conn.getUniqueId();
    var deliverMessage = new _message.default('delivery', id);
    deliverMessage.set({
      ackId: msgId,
      to: msg.from });

    (0, _sendChatMessage.default)(deliverMessage.body, conn);
    // self.send(deliverMessage.body);
  }
};

var decodeMsg = function decodeMsg(msgExt) {
  if (!msgExt) {
    return;
  }
  var msg = msgExt;
  var msgObj = {};
  for (var k = 0; k < msg.length; k++) {
    if (msg[k].type == 8) {
      msgObj[msg[k].key] = JSON.parse(msg[k].stringValue);
    } else if (msg[k].type == 7) {
      msgObj[msg[k].key] = msg[k].stringValue;
    } else if (msg[k].type == 6) {
      msgObj[msg[k].key] = msg[k].doubleValue;
    } else if (msg[k].type == 5) {
      msgObj[msg[k].key] = msg[k].floatValue;
    } else if (msg[k].type == 1 || msg[k].type == 2 || msg[k].type == 3 || msg[k].type == 4) {
      if (msg[k].type == 2) {
        var varintValue = msg[k].varintValue;
        var value = new _long.default(varintValue.low, varintValue.high, varintValue.unsigned).toString();
        msgObj[msg[k].key] = Number(value);
      } else {
        msgObj[msg[k].key] = msg[k].varintValue;
      }
    }
  }
  return msgObj;
};
var handleMessage = function handleMessage(meta, status, conn, ignoreCallback) {
  var self = conn;
  var time = new _long.default(meta.timestamp.low, meta.timestamp.high, meta.timestamp.unsigned).toString();
  var messageBodyMessage = self.context.root.lookup("easemob.pb.MessageBody");
  var thirdMessage = messageBodyMessage.decode(meta.payload);
  var msgId = new _long.default(meta.id.low, meta.id.high, meta.id.unsigned).toString();
  var ackMsgId = thirdMessage.ackMessageId ? new _long.default(thirdMessage.ackMessageId.low, thirdMessage.ackMessageId.high, thirdMessage.ackMessageId.unsigned).toString() : "";
  var type = null;
  conn.isDebug && console.log('下行消息：', thirdMessage);
  if (thirdMessage.type === 1) {//messagetype 群组/聊天室。。。。
    type = "chat";
  } else if (thirdMessage.type === 2) {
    type = "groupchat";
  } else if (thirdMessage.type === 3) {
    type = "chatroom";
  } else if (thirdMessage.type === 4) {
    type = "read_ack"; //发送ack没写

    if (thirdMessage.msgConfig) {
      conn.onReadMessage({
        mid: ackMsgId,
        groupReadCount: thirdMessage.ext[0] && JSON.parse(thirdMessage.ext[0].stringValue),
        ackContent: thirdMessage.ackContent });

      return;
    }
    conn.onReadMessage({
      mid: ackMsgId });

    return;
  } else if (thirdMessage.type === 5) {
    type = "deliver_ack";
    conn.onDeliverdMessage({
      mid: ackMsgId });

    return;
  } else if (thirdMessage.type === 6) {
    type = "recall";
    conn.onRecallMessage({ //需要增加一个回撤消息的监听
      mid: ackMsgId });

    return;
  }

  for (var i = 0; i < thirdMessage.contents.length; i++) {
    var msg = {};
    var errorBool = status.errorCode > 0;
    var errorCode = status.errorCode;
    var errorText = status.reason;
    var msgBody = thirdMessage.contents[i];
    var from = thirdMessage.from.name;
    var to = thirdMessage.to.name;
    var extmsg = {};
    if (thirdMessage.ext) {
      extmsg = decodeMsg(thirdMessage.ext);
    }

    try {
      switch (msgBody.type) {//contentsType 为消息类型 txt、img。。。
        case 0:
          var receiveMsg = thirdMessage.contents[i].text;
          if (!WebIM) {
            var WebIM = {};
          }
          var emojibody = _commonUtil.default.parseTextMessage(receiveMsg, WebIM && WebIM.Emoji);
          // var emojibody = {}
          if (emojibody.isemoji) {
            msg = {
              id: msgId,
              type: type,
              contentsType: 'EMOJI',
              from: from,
              to: to
              // , delay: parseMsgData.delayTimeStamp
              ,
              data: emojibody.body,
              ext: extmsg,
              time: time,
              msgConfig: thirdMessage.msgConfig };

            !msg.delay && delete msg.delay;
            !msg.msgConfig && delete thirdMessage.msgConfig;
            msg.error = errorBool;
            msg.errorText = errorText;
            msg.errorCode = errorCode;
            !ignoreCallback && self.onEmojiMessage(msg);
          } else {
            msg = {
              id: msgId,
              type: type,
              contentsType: ContentsType[msgBody.type],
              from: from,
              to: to,
              data: msgBody.text,
              ext: extmsg,
              sourceMsg: msgBody.text,
              time: time,
              msgConfig: thirdMessage.msgConfig };

            !msg.msgConfig && delete thirdMessage.msgConfig;
            msg.error = errorBool;
            msg.errorText = errorText;
            msg.errorCode = errorCode;
            !ignoreCallback && conn.onTextMessage(msg);
          }
          break;
        case 1:
          if (msgBody.size) {
            var rwidth = msgBody.size.width || 0;
            var rheight = msgBody.size.height || 0;
          }
          msg = {
            id: msgId,
            type: type,
            contentsType: ContentsType[msgBody.type],
            from: from,
            to: to,
            url: msgBody.remotePath && self.apiUrl + msgBody.remotePath.substr(msgBody.remotePath.indexOf("/", 9)),
            secret: msgBody.secretKey,
            filename: msgBody.displayName,
            thumb: msgBody.thumbnailRemotePath,
            thumb_secret: msgBody.thumbnailSecretKey,
            file_length: msgBody.fileLength || '',
            width: rwidth,
            height: rheight,
            filetype: msgBody.filetype || '',
            accessToken: conn.token || '',
            ext: extmsg,
            time: time,
            msgConfig: thirdMessage.msgConfig
            // , delay: parseMsgData.delayTimeStamp
          };
          !msg.delay && delete msg.delay;
          !msg.msgConfig && delete thirdMessage.msgConfig;
          msg.error = errorBool;
          msg.errorText = errorText;
          msg.errorCode = errorCode;
          !ignoreCallback && conn.onPictureMessage(msg);
          break;
        case 2:
          msg = {
            id: msgId,
            type: type,
            contentsType: ContentsType[msgBody.type],
            from: from,
            to: to,
            url: msgBody.remotePath && self.apiUrl + msgBody.remotePath.substr(msgBody.remotePath.indexOf("/", 9)),
            secret: msgBody.secretKey,
            filename: msgBody.displayName,
            length: msgBody.duration || '',
            file_length: msgBody.fileLength || '',
            filetype: msgBody.filetype || '',
            accessToken: conn.token || '',
            ext: extmsg,
            time: time,
            msgConfig: thirdMessage.msgConfig
            // , delay: parseMsgData.delayTimeStamp
          };
          !msg.delay && delete msg.delay;
          !msg.msgConfig && delete thirdMessage.msgConfig;
          msg.error = errorBool;
          msg.errorText = errorText;
          msg.errorCode = errorCode;
          !ignoreCallback && conn.onVideoMessage(msg);
          break;
        case 3:
          msg = {
            id: msgId,
            type: type,
            contentsType: ContentsType[msgBody.type],
            from: from,
            to: to,
            addr: msgBody.address,
            lat: msgBody.latitude,
            lng: msgBody.longitude,
            ext: extmsg,
            time: time,
            msgConfig: thirdMessage.msgConfig
            // , delay: parseMsgData.delayTimeStamp
          };
          !msg.delay && delete msg.delay;
          !msg.msgConfig && delete thirdMessage.msgConfig;
          msg.error = errorBool;
          msg.errorText = errorText;
          msg.errorCode = errorCode;
          !ignoreCallback && conn.onLocationMessage(msg);
          break;
        case 4:
          msg = {
            id: msgId,
            type: type,
            contentsType: ContentsType[msgBody.type],
            from: from,
            to: to,
            url: msgBody.remotePath && self.apiUrl + msgBody.remotePath.substr(msgBody.remotePath.indexOf("/", 9)),
            secret: msgBody.secretKey,
            filename: msgBody.displayName,
            file_length: msgBody.fileLength || '',
            accessToken: conn.token || '',
            ext: extmsg,
            length: msgBody.duration,
            time: time,
            msgConfig: thirdMessage.msgConfig
            // , delay: parseMsgData.delayTimeStamp
          };
          !msg.delay && delete msg.delay;
          !msg.msgConfig && delete thirdMessage.msgConfig;
          msg.error = errorBool;
          msg.errorText = errorText;
          msg.errorCode = errorCode;
          !ignoreCallback && conn.onAudioMessage(msg);
          break;
        case 5:
          msg = {
            id: msgId,
            type: type,
            contentsType: ContentsType[msgBody.type],
            from: from,
            to: to,
            url: msgBody.remotePath && self.apiUrl + msgBody.remotePath.substr(msgBody.remotePath.indexOf("/", 9)),
            secret: msgBody.secretKey,
            filename: msgBody.displayName,
            file_length: msgBody.fileLength,
            accessToken: conn.token || '',
            ext: extmsg,
            time: time,
            msgConfig: thirdMessage.msgConfig
            // , delay: parseMsgData.delayTimeStamp
          };
          !msg.delay && delete msg.delay;
          !msg.msgConfig && delete thirdMessage.msgConfig;
          msg.error = errorBool;
          msg.errorText = errorText;
          msg.errorCode = errorCode;
          !ignoreCallback && conn.onFileMessage(msg);
          break;
        case 6:
          msg = {
            id: msgId,
            contentsType: ContentsType[msgBody.type],
            from: from,
            to: to,
            action: msgBody.action,
            ext: extmsg,
            time: time,
            msgConfig: thirdMessage.msgConfig
            // , delay: parseMsgData.delayTimeStamp
          };
          !msg.msgConfig && delete thirdMessage.msgConfig;
          msg.error = errorBool;
          msg.errorText = errorText;
          msg.errorCode = errorCode;
          !ignoreCallback && conn.onCmdMessage(msg);
          break;
        case 7:
          var customExts = '';
          var params = '';
          if (thirdMessage.contents[0].customExts) {
            customExts = decodeMsg(thirdMessage.contents[0].customExts);
          }

          if (thirdMessage.contents[0].params) {
            params = decodeMsg(thirdMessage.contents[0].params);
          }
          msg = {
            id: msgId,
            contentsType: ContentsType[msgBody.type],
            from: from,
            to: to,
            customEvent: msgBody.customEvent,
            params: params,
            customExts: customExts,
            ext: extmsg,
            time: time };

          !ignoreCallback && conn.onCustomMessage(msg);
          break;
        default:
          break;}

    } catch (e) {
      conn.onError({
        type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
        data: e });

    }
    // msg.error = "";
    // msg.errorText = "";
    // msg.errorCode = "";
    !ignoreCallback && thirdMessage.type === 1 && conn.delivery && sendDelivery(conn, msg, msgId);
    if (ignoreCallback || conn.delivery) {
      msg.message_type = type;
      return msg;
    }
  }

};var _default =

handleMessage;exports.default = _default;

/***/ }),
/* 16 */
/*!****************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/node_modules/long/dist/long.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,i){ true?module.exports=i():undefined}("undefined"!=typeof self?self:this,function(){return function(t){function i(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,i),r.l=!0,r.exports}var n={};return i.m=t,i.c=n,i.d=function(t,n,e){i.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:e})},i.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(n,"a",n),n},i.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},i.p="",i(i.s=0)}([function(t,i){function n(t,i,n){this.low=0|t,this.high=0|i,this.unsigned=!!n}function e(t){return!0===(t&&t.__isLong__)}function r(t,i){var n,e,r;return i?(t>>>=0,(r=0<=t&&t<256)&&(e=l[t])?e:(n=h(t,(0|t)<0?-1:0,!0),r&&(l[t]=n),n)):(t|=0,(r=-128<=t&&t<128)&&(e=f[t])?e:(n=h(t,t<0?-1:0,!1),r&&(f[t]=n),n))}function s(t,i){if(isNaN(t))return i?p:m;if(i){if(t<0)return p;if(t>=c)return q}else{if(t<=-v)return _;if(t+1>=v)return E}return t<0?s(-t,i).neg():h(t%d|0,t/d|0,i)}function h(t,i,e){return new n(t,i,e)}function u(t,i,n){if(0===t.length)throw Error("empty string");if("NaN"===t||"Infinity"===t||"+Infinity"===t||"-Infinity"===t)return m;if("number"==typeof i?(n=i,i=!1):i=!!i,(n=n||10)<2||36<n)throw RangeError("radix");var e;if((e=t.indexOf("-"))>0)throw Error("interior hyphen");if(0===e)return u(t.substring(1),i,n).neg();for(var r=s(a(n,8)),h=m,o=0;o<t.length;o+=8){var g=Math.min(8,t.length-o),f=parseInt(t.substring(o,o+g),n);if(g<8){var l=s(a(n,g));h=h.mul(l).add(s(f))}else h=h.mul(r),h=h.add(s(f))}return h.unsigned=i,h}function o(t,i){return"number"==typeof t?s(t,i):"string"==typeof t?u(t,i):h(t.low,t.high,"boolean"==typeof i?i:t.unsigned)}t.exports=n;var g=null;try{g=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch(t){}n.prototype.__isLong__,Object.defineProperty(n.prototype,"__isLong__",{value:!0}),n.isLong=e;var f={},l={};n.fromInt=r,n.fromNumber=s,n.fromBits=h;var a=Math.pow;n.fromString=u,n.fromValue=o;var d=4294967296,c=d*d,v=c/2,w=r(1<<24),m=r(0);n.ZERO=m;var p=r(0,!0);n.UZERO=p;var y=r(1);n.ONE=y;var b=r(1,!0);n.UONE=b;var N=r(-1);n.NEG_ONE=N;var E=h(-1,2147483647,!1);n.MAX_VALUE=E;var q=h(-1,-1,!0);n.MAX_UNSIGNED_VALUE=q;var _=h(0,-2147483648,!1);n.MIN_VALUE=_;var B=n.prototype;B.toInt=function(){return this.unsigned?this.low>>>0:this.low},B.toNumber=function(){return this.unsigned?(this.high>>>0)*d+(this.low>>>0):this.high*d+(this.low>>>0)},B.toString=function(t){if((t=t||10)<2||36<t)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative()){if(this.eq(_)){var i=s(t),n=this.div(i),e=n.mul(i).sub(this);return n.toString(t)+e.toInt().toString(t)}return"-"+this.neg().toString(t)}for(var r=s(a(t,6),this.unsigned),h=this,u="";;){var o=h.div(r),g=h.sub(o.mul(r)).toInt()>>>0,f=g.toString(t);if(h=o,h.isZero())return f+u;for(;f.length<6;)f="0"+f;u=""+f+u}},B.getHighBits=function(){return this.high},B.getHighBitsUnsigned=function(){return this.high>>>0},B.getLowBits=function(){return this.low},B.getLowBitsUnsigned=function(){return this.low>>>0},B.getNumBitsAbs=function(){if(this.isNegative())return this.eq(_)?64:this.neg().getNumBitsAbs();for(var t=0!=this.high?this.high:this.low,i=31;i>0&&0==(t&1<<i);i--);return 0!=this.high?i+33:i+1},B.isZero=function(){return 0===this.high&&0===this.low},B.eqz=B.isZero,B.isNegative=function(){return!this.unsigned&&this.high<0},B.isPositive=function(){return this.unsigned||this.high>=0},B.isOdd=function(){return 1==(1&this.low)},B.isEven=function(){return 0==(1&this.low)},B.equals=function(t){return e(t)||(t=o(t)),(this.unsigned===t.unsigned||this.high>>>31!=1||t.high>>>31!=1)&&(this.high===t.high&&this.low===t.low)},B.eq=B.equals,B.notEquals=function(t){return!this.eq(t)},B.neq=B.notEquals,B.ne=B.notEquals,B.lessThan=function(t){return this.comp(t)<0},B.lt=B.lessThan,B.lessThanOrEqual=function(t){return this.comp(t)<=0},B.lte=B.lessThanOrEqual,B.le=B.lessThanOrEqual,B.greaterThan=function(t){return this.comp(t)>0},B.gt=B.greaterThan,B.greaterThanOrEqual=function(t){return this.comp(t)>=0},B.gte=B.greaterThanOrEqual,B.ge=B.greaterThanOrEqual,B.compare=function(t){if(e(t)||(t=o(t)),this.eq(t))return 0;var i=this.isNegative(),n=t.isNegative();return i&&!n?-1:!i&&n?1:this.unsigned?t.high>>>0>this.high>>>0||t.high===this.high&&t.low>>>0>this.low>>>0?-1:1:this.sub(t).isNegative()?-1:1},B.comp=B.compare,B.negate=function(){return!this.unsigned&&this.eq(_)?_:this.not().add(y)},B.neg=B.negate,B.add=function(t){e(t)||(t=o(t));var i=this.high>>>16,n=65535&this.high,r=this.low>>>16,s=65535&this.low,u=t.high>>>16,g=65535&t.high,f=t.low>>>16,l=65535&t.low,a=0,d=0,c=0,v=0;return v+=s+l,c+=v>>>16,v&=65535,c+=r+f,d+=c>>>16,c&=65535,d+=n+g,a+=d>>>16,d&=65535,a+=i+u,a&=65535,h(c<<16|v,a<<16|d,this.unsigned)},B.subtract=function(t){return e(t)||(t=o(t)),this.add(t.neg())},B.sub=B.subtract,B.multiply=function(t){if(this.isZero())return m;if(e(t)||(t=o(t)),g){return h(g.mul(this.low,this.high,t.low,t.high),g.get_high(),this.unsigned)}if(t.isZero())return m;if(this.eq(_))return t.isOdd()?_:m;if(t.eq(_))return this.isOdd()?_:m;if(this.isNegative())return t.isNegative()?this.neg().mul(t.neg()):this.neg().mul(t).neg();if(t.isNegative())return this.mul(t.neg()).neg();if(this.lt(w)&&t.lt(w))return s(this.toNumber()*t.toNumber(),this.unsigned);var i=this.high>>>16,n=65535&this.high,r=this.low>>>16,u=65535&this.low,f=t.high>>>16,l=65535&t.high,a=t.low>>>16,d=65535&t.low,c=0,v=0,p=0,y=0;return y+=u*d,p+=y>>>16,y&=65535,p+=r*d,v+=p>>>16,p&=65535,p+=u*a,v+=p>>>16,p&=65535,v+=n*d,c+=v>>>16,v&=65535,v+=r*a,c+=v>>>16,v&=65535,v+=u*l,c+=v>>>16,v&=65535,c+=i*d+n*a+r*l+u*f,c&=65535,h(p<<16|y,c<<16|v,this.unsigned)},B.mul=B.multiply,B.divide=function(t){if(e(t)||(t=o(t)),t.isZero())throw Error("division by zero");if(g){if(!this.unsigned&&-2147483648===this.high&&-1===t.low&&-1===t.high)return this;return h((this.unsigned?g.div_u:g.div_s)(this.low,this.high,t.low,t.high),g.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?p:m;var i,n,r;if(this.unsigned){if(t.unsigned||(t=t.toUnsigned()),t.gt(this))return p;if(t.gt(this.shru(1)))return b;r=p}else{if(this.eq(_)){if(t.eq(y)||t.eq(N))return _;if(t.eq(_))return y;return i=this.shr(1).div(t).shl(1),i.eq(m)?t.isNegative()?y:N:(n=this.sub(t.mul(i)),r=i.add(n.div(t)))}if(t.eq(_))return this.unsigned?p:m;if(this.isNegative())return t.isNegative()?this.neg().div(t.neg()):this.neg().div(t).neg();if(t.isNegative())return this.div(t.neg()).neg();r=m}for(n=this;n.gte(t);){i=Math.max(1,Math.floor(n.toNumber()/t.toNumber()));for(var u=Math.ceil(Math.log(i)/Math.LN2),f=u<=48?1:a(2,u-48),l=s(i),d=l.mul(t);d.isNegative()||d.gt(n);)i-=f,l=s(i,this.unsigned),d=l.mul(t);l.isZero()&&(l=y),r=r.add(l),n=n.sub(d)}return r},B.div=B.divide,B.modulo=function(t){if(e(t)||(t=o(t)),g){return h((this.unsigned?g.rem_u:g.rem_s)(this.low,this.high,t.low,t.high),g.get_high(),this.unsigned)}return this.sub(this.div(t).mul(t))},B.mod=B.modulo,B.rem=B.modulo,B.not=function(){return h(~this.low,~this.high,this.unsigned)},B.and=function(t){return e(t)||(t=o(t)),h(this.low&t.low,this.high&t.high,this.unsigned)},B.or=function(t){return e(t)||(t=o(t)),h(this.low|t.low,this.high|t.high,this.unsigned)},B.xor=function(t){return e(t)||(t=o(t)),h(this.low^t.low,this.high^t.high,this.unsigned)},B.shiftLeft=function(t){return e(t)&&(t=t.toInt()),0==(t&=63)?this:t<32?h(this.low<<t,this.high<<t|this.low>>>32-t,this.unsigned):h(0,this.low<<t-32,this.unsigned)},B.shl=B.shiftLeft,B.shiftRight=function(t){return e(t)&&(t=t.toInt()),0==(t&=63)?this:t<32?h(this.low>>>t|this.high<<32-t,this.high>>t,this.unsigned):h(this.high>>t-32,this.high>=0?0:-1,this.unsigned)},B.shr=B.shiftRight,B.shiftRightUnsigned=function(t){if(e(t)&&(t=t.toInt()),0===(t&=63))return this;var i=this.high;if(t<32){return h(this.low>>>t|i<<32-t,i>>>t,this.unsigned)}return 32===t?h(i,0,this.unsigned):h(i>>>t-32,0,this.unsigned)},B.shru=B.shiftRightUnsigned,B.shr_u=B.shiftRightUnsigned,B.toSigned=function(){return this.unsigned?h(this.low,this.high,!1):this},B.toUnsigned=function(){return this.unsigned?this:h(this.low,this.high,!0)},B.toBytes=function(t){return t?this.toBytesLE():this.toBytesBE()},B.toBytesLE=function(){var t=this.high,i=this.low;return[255&i,i>>>8&255,i>>>16&255,i>>>24,255&t,t>>>8&255,t>>>16&255,t>>>24]},B.toBytesBE=function(){var t=this.high,i=this.low;return[t>>>24,t>>>16&255,t>>>8&255,255&t,i>>>24,i>>>16&255,i>>>8&255,255&i]},n.fromBytes=function(t,i,e){return e?n.fromBytesLE(t,i):n.fromBytesBE(t,i)},n.fromBytesLE=function(t,i){return new n(t[0]|t[1]<<8|t[2]<<16|t[3]<<24,t[4]|t[5]<<8|t[6]<<16|t[7]<<24,i)},n.fromBytesBE=function(t,i){return new n(t[4]<<24|t[5]<<16|t[6]<<8|t[7],t[0]<<24|t[1]<<16|t[2]<<8|t[3],i)}}])});
//# sourceMappingURL=long.js.map

/***/ }),
/* 17 */
/*!*********************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/utils/commonUtil.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var EMPTYFN = function EMPTYFN() {};

if (!Object.keys) {
  Object.keys = function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
    hasDontEnumBug = !{
      toString: null }.
    propertyIsEnumerable('toString'),
    dontEnums = [
    'toString',
    'toLocaleString',
    'valueOf',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'constructor'],

    dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [],
      prop,i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }();
}

var utils = {

  emptyfn: EMPTYFN,

  stringify: function stringify(json) {
    if (typeof JSON !== 'undefined' && JSON.stringify) {
      return JSON.stringify(json);
    } else {
      var s = '',
      arr = [];

      var iterate = function iterate(json) {
        var isArr = false;

        if (Object.prototype.toString.call(json) === '[object Array]') {
          arr.push(']', '[');
          isArr = true;
        } else if (Object.prototype.toString.call(json) === '[object Object]') {
          arr.push('}', '{');
        }

        for (var o in json) {
          if (Object.prototype.toString.call(json[o]) === '[object Null]') {
            json[o] = 'null';
          } else if (Object.prototype.toString.call(json[o]) === '[object Undefined]') {
            json[o] = 'undefined';
          }

          if (json[o] && typeof json[o] === 'object') {
            s += ',' + (isArr ? '' : '"' + o + '":' + (isArr ? '"' : '')) + iterate(json[o]) + '';
          } else {
            s += ',"' + (isArr ? '' : o + '":"') + json[o] + '"';
          }
        }

        if (s != '') {
          s = s.slice(1);
        }

        return arr.pop() + s + arr.pop();
      };
      return iterate(json);
    }
  },
  getFileSize: function getFileSize(file) {
    var fileSize = this.getFileLength(file);
    if (fileSize > 10000000) {
      return false;
    }
    var kb = Math.round(fileSize / 1000);
    if (kb < 1000) {
      fileSize = kb + ' KB';
    } else if (kb >= 1000) {
      var mb = kb / 1000;
      if (mb < 1000) {
        fileSize = mb.toFixed(1) + ' MB';
      } else {
        var gb = mb / 1000;
        fileSize = gb.toFixed(1) + ' GB';
      }
    }
    return fileSize;
  },

  trim: function trim(str) {
    str = typeof str === 'string' ? str : '';
    return str.trim ?
    str.trim() :
    str.replace(/^\s|\s$/g, '');
  },

  parseTextMessage: function parseTextMessage(message, faces) {
    if (typeof message !== 'string') {
      return;
    }

    if (Object.prototype.toString.call(faces) !== '[object Object]') {
      return {
        isemoji: false,
        body: [{
          type: 'txt',
          data: message }] };


    }

    var receiveMsg = message;
    var emessage = [];
    var expr = /\[[^[\]]{2,3}\]/mg;
    var emoji = receiveMsg.match(expr);

    if (!emoji || emoji.length < 1) {
      return {
        isemoji: false,
        body: [{
          type: 'txt',
          data: message }] };


    }
    var isemoji = false;
    for (var i = 0; i < emoji.length; i++) {
      var tmsg = receiveMsg.substring(0, receiveMsg.indexOf(emoji[i])),
      existEmoji = WebIM.Emoji.map[emoji[i]];

      if (tmsg) {
        emessage.push({
          type: 'txt',
          data: tmsg });

      }
      if (!existEmoji) {
        emessage.push({
          type: 'txt',
          data: emoji[i] });

        continue;
      }
      var emojiStr = WebIM.Emoji.map ? WebIM.Emoji.path + existEmoji : null;

      if (emojiStr) {
        isemoji = true;
        emessage.push({
          type: 'emoji',
          data: emojiStr });

      } else {
        emessage.push({
          type: 'txt',
          data: emoji[i] });

      }
      var restMsgIndex = receiveMsg.indexOf(emoji[i]) + emoji[i].length;
      receiveMsg = receiveMsg.substring(restMsgIndex);
    }
    if (receiveMsg) {
      emessage.push({
        type: 'txt',
        data: receiveMsg });

    }
    if (isemoji) {
      return {
        isemoji: isemoji,
        body: emessage };

    }
    return {
      isemoji: false,
      body: [{
        type: 'txt',
        data: message }] };


  },

  ts: function ts() {
    var d = new Date();
    var Hours = d.getHours(); //获取当前小时数(0-23)
    var Minutes = d.getMinutes(); //获取当前分钟数(0-59)
    var Seconds = d.getSeconds(); //获取当前秒数(0-59)
    var Milliseconds = d.getMilliseconds(); //获取当前毫秒
    return (Hours < 10 ? "0" + Hours : Hours) + ':' + (Minutes < 10 ? "0" + Minutes : Minutes) + ':' + (Seconds < 10 ? "0" + Seconds : Seconds) + ':' + Milliseconds + ' ';
  },

  getObjectKey: function getObjectKey(obj, val) {
    for (var key in obj) {
      if (obj[key] == val) {
        return key;
      }
    }
    return '';
  },

  sprintf: function sprintf() {
    var arg = arguments,
    str = arg[0] || '',
    i,len;
    for (i = 1, len = arg.length; i < len; i++) {
      str = str.replace(/%s/, arg[i]);
    }
    return str;
  },

  reverse: function reverse(array) {
    var newArray = [];
    if (Array.prototype.reverse) {
      newArray = array.reverse();
    } else {
      for (var i = 0; i < array.length; i++) {
        newArray.unshift(array[i]);
      }
    }
    return newArray;
  } };


utils.checkArray = function checkArray(arr, queue) {
  var turnOff = 'off';
  arr.forEach(function (item, index) {
    if (item.name === queue.name) {
      turnOff = 'on';
      return index;
    }
  });
  if (turnOff == 'off') {
    return false;
  }
};var _default =

utils;exports.default = _default;

/***/ }),
/* 18 */
/*!*************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/muc/HandleMucMessage.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _long = _interopRequireDefault(__webpack_require__(/*! ../../node_modules/long/dist/long */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var handleMessage = function handleMessage(meta, status, conn) {
  var self = conn;
  var messageBodyMessage = self.context.root.lookup("easemob.pb.MUCBody");
  var thirdMessage = messageBodyMessage.decode(meta.payload);
  var msgId = new _long.default(meta.id.low, meta.id.high, meta.id.unsigned).toString();
  var operation = thirdMessage.operation;

  function condition(operation) {
    var info = {
      type: '',
      owner: thirdMessage.from.name,
      gid: thirdMessage.mucId.name,
      from: thirdMessage.from.name,
      fromJid: thirdMessage.from,
      to: thirdMessage.to.length ? thirdMessage.to[0].name : '',
      toJid: thirdMessage.to,
      chatroom: thirdMessage.isChatroom,
      status: thirdMessage.status };


    return ({
      32: function _() {//解除群组/聊天室一键禁言
        info.type = thirdMessage.isChatroom ? 'rmChatRoomMute' : 'rmGroupMute';
        conn.onPresence(info);
      },
      31: function _() {//群组/聊天室一键禁言
        info.type = thirdMessage.isChatroom ? 'muteChatRoom' : 'muteGroup';
        conn.onPresence(info);
      },
      30: function _() {//删除群/聊天室白名单成员
        info.type = thirdMessage.isChatroom ? 'rmUserFromChatRoomWhiteList' : 'rmUserFromGroupWhiteList';
        conn.onPresence(info);
      },
      29: function _() {//增加群/聊天室组白名单成员
        info.type = thirdMessage.isChatroom ? 'addUserToChatRoomWhiteList' : 'addUserToGroupWhiteList';
        conn.onPresence(info);
      },
      28: function _() {
        info.type = 'deleteFile'; // 删除群文件
        conn.onPresence(info);
      },
      27: function _() {
        info.type = 'uploadFile'; // 上传群文件
        conn.onPresence(info);
      },
      26: function _() {
        info.type = 'deleteAnnouncement'; //删除群公告
        conn.onPresence(info);
      },
      25: function _() {
        info.type = 'updateAnnouncement'; // 更新群公告
        conn.onPresence(info);
      },
      24: function _() {
        info.type = 'removeMute'; //解除禁言
        conn.onPresence(info);
      },
      23: function _() {
        info.type = 'addMute'; //禁言
        conn.onPresence(info);
      },
      22: function _() {
        info.type = 'removeAdmin'; //去除管理员
        conn.onPresence(info);
      },
      21: function _() {
        info.type = 'addAdmin'; //成为管理员
        conn.onPresence(info);
      },
      20: function _() {
        info.type = 'changeOwner'; //转让群组
        conn.onPresence(info);
      },
      19: function _() {
        info.type = 'direct_joined'; //直接拉进群了
        conn.onPresence(info);
      },
      18: function _() {
        info.type = thirdMessage.isChatroom ? 'leaveChatRoom' : 'leaveGroup';
        //info.type = 'absence'; //退出群了
        conn.onPresence(info);
      },
      17: function _() {
        info.type = thirdMessage.isChatroom ? 'memberJoinChatRoomSuccess' : 'memberJoinPublicGroupSuccess';
        //info.type = 'presence'; // 有人进群了
        conn.onPresence(info);
      },
      16: function _() {
        info.type = 'unblock';
        conn.onPresence(info);
      },
      15: function _() {
        info.type = 'block';
        conn.onPresence(info);
      },
      14: function _() {
        info.type = 'update';
        conn.onPresence(info);
      },
      13: function _() {
        info.type = 'allow'; //移除黑名单
        info.reason = thirdMessage.reason;
        conn.onPresence(info);
      },
      12: function _() {
        info.type = 'ban';
        conn.onPresence(info);
      },
      11: function _() {
        info.type = 'getBlackList';
        conn.onPresence(info);
      },
      10: function _() {
        info.type = 'removedFromGroup'; //被移出群 或者被加入黑名单
        info.kicked = info.to;
        conn.onPresence(info);
      },
      9: function _() {
        info.type = 'invite_decline'; //拒绝加群邀请
        info.kicked = info.to;
        conn.onPresence(info);
      },
      8: function _() {
        info.type = 'invite_accept'; //接受加群邀请
        info.kicked = info.to;
        conn.onPresence(info);
      },
      7: function _() {
        info.type = 'invite'; //手机端邀请入群 "INVITE_ACCEPT": 8, "INVITE_DECLINE": 9,
        info.kicked = info.to;
        conn.onPresence(info);
      },
      6: function _() {
        info.type = 'joinPublicGroupDeclined'; //加群被拒绝
        conn.onPresence(info);
      },
      5: function _() {
        info.type = 'joinPublicGroupSuccess'; //加群成功
        conn.onPresence(info);
      },
      4: function _() {
        info.type = 'joinGroupNotifications'; //申请加群
        info.reason = thirdMessage.reason;
        conn.onPresence(info);
      },
      3: function _() {
        info.type = 'leave';
        conn.onPresence(info);
      },
      2: function _() {
        info.type = 'join';
        conn.onPresence(info);
      },
      1: function _() {
        info.type = 'deleteGroupChat'; //群组解散
        conn.onPresence(info);
      } }[

    operation] || function () {
      console.log("%c\u6CA1\u6709\u5339\u914D".concat(operation, "\u7C7B\u578B"), 'background: green');
    })();
  }

  condition(operation);
};var _default =

handleMessage;exports.default = _default;

/***/ }),
/* 19 */
/*!*******************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/roster/HandleRosterMessage.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _long = _interopRequireDefault(__webpack_require__(/*! ../../node_modules/long/dist/long */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var operatRoster = function operatRoster(option, type, conn) {
  var emptyMessage = [];
  var rosterBody = conn.context.root.lookup("easemob.pb.RosterBody");
  var rosterBodyJson = rosterBody.decode(emptyMessage);
  if (type === 'add') {
    rosterBodyJson.operation = 2;
  } else if (type === 'remove') {
    rosterBodyJson.operation = 3;
  } else if (type === 'accept') {
    rosterBodyJson.operation = 4;
  } else if (type === 'decline') {
    rosterBodyJson.operation = 5;
  } else if (type === 'ban') {//加入黑名单
    rosterBodyJson.operation = 6;
  } else if (type === 'allow') {//移除黑名单
    rosterBodyJson.operation = 7;
  }
  rosterBodyJson.from = conn.context.jid;
  var nameList = [];
  if (typeof option.to === "string") {
    nameList.push({
      appKey: conn.appKey || conn.context.appKey,
      name: option.to,
      domain: "easemob.com" });

  } else if (option.to instanceof Array) {
    for (var i = 0; i < option.to.length; i++) {
      nameList.push({
        appKey: conn.appKey,
        name: option.to[i],
        domain: "easemob.com" });

    }
  }
  rosterBodyJson.to = nameList;
  // rosterBodyJson.to = [{
  //     appKey: conn.appKey,
  //     name: option.to,
  //     domain: "easemob.com",
  //     // clientResource: conn.clientResource
  // }]
  rosterBodyJson.reason = option.message;
  // rosterBodyJson.roster_ver = '';
  // rosterBodyJson.bi_direction = false;
  rosterBodyJson = rosterBody.encode(rosterBodyJson).finish();
  var MetaMessage = conn.context.root.lookup("easemob.pb.Meta");
  var MetaMessageJson = MetaMessage.decode(emptyMessage);
  MetaMessageJson.id = option.id || conn.getUniqueId();
  MetaMessageJson.from = conn.context.jid;
  MetaMessageJson.to = {
    domain: "@easemob.com" };

  MetaMessageJson.ns = 3;
  MetaMessageJson.payload = rosterBodyJson;
  var commSyncULMessage = conn.context.root.lookup("easemob.pb.CommSyncUL");
  var commSyncULMessageJson = commSyncULMessage.decode(emptyMessage);
  commSyncULMessageJson.meta = MetaMessageJson;
  commSyncULMessageJson = commSyncULMessage.encode(commSyncULMessageJson).finish();
  var msyncMessage = conn.context.root.lookup("easemob.pb.MSync");
  var msyncMessageJson = msyncMessage.decode(emptyMessage);
  msyncMessageJson.version = conn.version;
  msyncMessageJson.encryptType = [0];
  msyncMessageJson.command = 0;
  msyncMessageJson.guid = conn.jid;
  msyncMessageJson.payload = commSyncULMessageJson;
  msyncMessageJson = msyncMessage.encode(msyncMessageJson).finish();
  conn.sendMSync(msyncMessageJson);

};
var handleMessage = function handleMessage(meta, status, conn) {
  var self = conn;
  var messageBodyMessage = self.context.root.lookup("easemob.pb.RosterBody");
  var thirdMessage = messageBodyMessage.decode(meta.payload);
  var msgId = new _long.default(meta.id.low, meta.id.high, meta.id.unsigned).toString();
  var type = null;
  var msg = {
    to: thirdMessage.to[0].name,
    from: thirdMessage.from.name,
    status: thirdMessage.reason };

  switch (thirdMessage.operation) {
    case 0:
      break;
    case 2:
      msg.type = 'subscribe';
      break;
    case 3:
      msg.type = 'unsubscribed';
      break;
    case 4:
      msg.type = 'subscribed';
      break;
    case 5:
      msg.type = 'unsubscribed';
      break;
    case 6:
      conn.getBlacklist();
      break;
    case 7:
      conn.getBlacklist();
      break;
    case 8:
      msg.type = 'subscribed';
      break;
    case 9:
      msg.type = 'unsubscribed';
      break;}



  conn.onPresence(msg);

};

var rosterClass = {
  handleMessage: handleMessage,
  operatRoster: operatRoster };var _default =


rosterClass;exports.default = _default;

/***/ }),
/* 20 */
/*!***************************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/statistics/HandleStatisticsMessage.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _long = _interopRequireDefault(__webpack_require__(/*! ../../node_modules/long/dist/long */ 16));
var _status = _interopRequireDefault(__webpack_require__(/*! ../status */ 11));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var _code = (0, _status.default)();
var handleMessage = function handleMessage(meta, status, conn) {
  var self = conn;
  var messageBodyMessage = self.context.root.lookup("easemob.pb.StatisticsBody");
  var thirdMessage = messageBodyMessage.decode(meta.payload);
  var msgId = new _long.default(meta.id.low, meta.id.high, meta.id.unsigned).toString();

  switch (thirdMessage.operation) {
    case 0:
      conn.onStatisticMessage(thirdMessage);
      break;
    case 1:
      var error = {
        type: _code.WEBIM_CONNCTION_USER_REMOVED };

      conn.logOut = true;
      conn.onError(error);
      // conn.onClosed();
      break;
    case 2:
      var error = {
        type: _code.WEBIM_CONNCTION_USER_LOGIN_ANOTHER_DEVICE };

      conn.logOut = true;
      conn.onError(error);
      break;
    case 3:
      var error = {
        type: _code.WEBIM_CONNCTION_USER_KICKED_BY_CHANGE_PASSWORD };

      conn.logOut = true;
      conn.onError(error);
      break;
    case 4:
      var error = {
        type: _code.WEBIM_CONNCTION_USER_KICKED_BY_OTHER_DEVICE };

      conn.logOut = true;
      conn.onError(error);
      break;}


  // conn.onPresence(msg);

};var _default =

handleMessage;exports.default = _default;

/***/ }),
/* 21 */
/*!*************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/restApis.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _handleChatMessage = _interopRequireDefault(__webpack_require__(/*! ./chat/handleChatMessage */ 15));
var _status = _interopRequireDefault(__webpack_require__(/*! ./status */ 11));
var _base = _interopRequireDefault(__webpack_require__(/*! ../node_modules/Base64/base64 */ 22));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var _code = (0, _status.default)();

var connectionProto = {
  mr_cache: [],
  _fetchMessages: function _fetchMessages(options, conn) {
    var token = options.accessToken || conn.context.accessToken;

    if (!conn._utils.isCanSetRequestHeader) {
      conn.onError({
        type: _code.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR });

      return;
    }

    if (token) {
      var apiUrl = conn.apiUrl;
      var appName = conn.context.appName;
      var orgName = conn.context.orgName;

      if (!appName || !orgName) {
        conn.onError({
          type: _code.WEBIM_CONNCTION_AUTH_ERROR });

        return;
      }

      if (!options.queue) {
        conn.onError({
          type: "",
          msg: "queue is not specified" });

        return;
      }

      var queue = options.queue;
      var _dataQueue = this.mr_cache[queue] || (this.mr_cache[queue] = {
        msgs: [] });

      var suc = function suc(res, xhr) {
        if (res && res.data) {
          var data = res.data;
          if (!res.data.msgs) {
            typeof options.success === 'function' && options.success(_dataQueue);
            _dataQueue.is_last = true;
            _dataQueue.next_key = '';
            return;
          }

          var msgs = data.msgs;
          var length = msgs.length;

          _dataQueue.is_last = data.is_last;
          _dataQueue.next_key = data.next_key;
          var _parseMeta = function _parseMeta(meta) {
            var arr = [];
            meta = _base.default.atob(meta);
            for (var i = 0, j = meta.length; i < j; ++i) {
              arr.push(meta.charCodeAt(i));
            }
            //var tmpUint8Array = new Uint8Array(arr); 

            var CommSyncDLMessage = conn.context.root.lookup("easemob.pb.Meta");
            CommSyncDLMessage = CommSyncDLMessage.decode(arr);

            var status = {
              errorCode: 0,
              reason: '' };

            if (CommSyncDLMessage.ns == 1) {
              var thirdMessage = (0, _handleChatMessage.default)(CommSyncDLMessage, status, conn, true);
              return thirdMessage;
            } else {
              //console.log('CommSyncDLMessage', CommSyncDLMessage)
            }
          };

          try {
            for (var i = 0; i < length; i++) {
              var msgObj = _parseMeta(msgs[i].msg);
              msgObj && _dataQueue.msgs.push(msgObj);
            }
          } catch (err) {
            console.log(err);
          } finally {
            typeof options.success === 'function' && options.success(_dataQueue);
          }
        }
      };

      var error = function error(res, msg) {
        if (res.error && res.error_description) {
          conn.onError({
            type: _code.WEBIM_CONNCTION_LOAD_CHATROOM_ERROR,
            msg: res.error_description,
            data: res });

        }
      };

      var userId = conn.context.userId;
      var start = -1;

      // 无历史消息或者缓存消息足够不再加载
      if (_dataQueue.msgs.length >= options.count || _dataQueue.is_last) {
        typeof options.success === 'function' && options.success(_dataQueue);
        return;
      }

      // 根据上一次拉取返回的last_key 进行本次消息拉取
      if (_dataQueue && _dataQueue.next_key) {
        start = _dataQueue.next_key;
      }

      var suffix = options.isGroup ? "@conference.easemob.com" : "@easemob.com";
      var data = {
        queue: queue + suffix,
        start: start,
        end: -1 };


      var opts = {
        url: apiUrl + '/' + orgName + '/' + appName + '/users/' + userId + '/messageroaming',
        dataType: 'json',
        type: 'POST',
        headers: {
          'Authorization': 'Bearer ' + token },

        data: JSON.stringify(data),
        success: suc || conn._utils.emptyfn,
        error: error || conn._utils.emptyfn };


      conn._utils.ajax(opts);

    } else {
      conn.onError({
        type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR });

    }
  },

  /**
      * 获取对话历史消息
      * @param {Object} options
      * @param {String} options.queue   - 对方用户名Id
      * @param {String} options.count   - 拉取条数
      * @param {Boolean} options.isGroup - 是否是群聊,默认为false
      * @param {Function} options.success
      * @param {Funciton} options.fail
      */
  fetchHistoryMessages: function fetchHistoryMessages(options) {
    var conn = this;
    if (!options.queue) {
      conn.onError({
        type: "",
        msg: "queue is not specified" });

      return;
    }

    var count = options.count || 20;

    function _readCacheMessages() {
      conn._fetchMessages({
        count: count,
        isGroup: options.isGroup ? true : false,
        queue: options.queue,
        success: function success(data) {
          var length = data.msgs.length;
          if (length >= count || data.is_last) {
            options.success && options.success(conn._utils.reverse(data.msgs.splice(0, count)));
          } else {
            _readCacheMessages();
          }
        },
        fail: function fail() {} },
      conn);
    }
    _readCacheMessages();
  },

  /**
      * 获取聊天室列表（分页）
      * @param {Object} options -
      * @param {String} options.apiUrl - rest的接口地址
      * @param {Number} options.pagenum - 页码，默认1
      * @param {Number} options.pagesize - 每页数量，默认20
      * @param {Function} options.success - 成功之后的回调，默认为空
      */
  getChatRooms: function getChatRooms(options) {
    var conn = this,
    token = options.accessToken || this.context.accessToken;
    if (!conn._utils.isCanSetRequestHeader) {
      conn.onError({
        type: _code.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR });

      return;
    }

    if (token) {
      var apiUrl = options.apiUrl;
      var appName = this.context.appName;
      var orgName = this.context.orgName;

      if (!appName || !orgName) {
        conn.onError({
          type: _code.WEBIM_CONNCTION_AUTH_ERROR });

        return;
      }

      var suc = function suc(data, xhr) {
        typeof options.success === 'function' && options.success(data);
      };

      var error = function error(res, xhr, msg) {
        if (res.error && res.error_description) {
          conn.onError({
            type: _code.WEBIM_CONNCTION_LOAD_CHATROOM_ERROR,
            msg: res.error_description,
            data: res,
            xhr: xhr });

        }
      };

      var pageInfo = {
        pagenum: parseInt(options.pagenum) || 1,
        pagesize: parseInt(options.pagesize) || 20 };


      var opts = {
        url: apiUrl + '/' + orgName + '/' + appName + '/chatrooms',
        dataType: 'json',
        type: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token },

        data: pageInfo,
        success: suc || conn._utils.emptyfn,
        error: error || conn._utils.emptyfn };

      conn._utils.ajax(opts);
    } else {
      conn.onError({
        type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR });

    }

  },

  /**
      * 加入聊天室
      * @param {Object} options - 
      * @param {String} options.roomId - 聊天室的ID
      * @param {stirng} opt.message - 原因，可选项
      * @param {Function} options.success - 成功之后的回调，默认为空
      * @param {Function} options.error - 失败之后的回调，默认为空
      */
  joinChatRoom: function joinChatRoom(options) {
    var options = options || {};
    if (!this._utils.isCanSetRequestHeader) {
      conn.onError({
        type: _code.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR });

      return;
    }

    var conn = this;
    var token = options.accessToken || this.token;

    if (token) {
      var apiUrl = options.apiUrl || this.apiUrl;
      var appName = this.context.appName;
      var orgName = this.context.orgName;
      var roomId = options.roomId;
      var message = options.message || '';
      if (!appName || !orgName) {
        conn.onError({
          type: _code.WEBIM_CONNCTION_AUTH_ERROR });

        return;
      }

      var suc = function suc(data, xhr) {
        typeof options.success === 'function' && options.success(data);
      };

      var error = function error(res, xhr, msg) {
        typeof options.error === 'function' && options.error(res);
      };

      var opts = {
        url: apiUrl + '/' + orgName + '/' + appName + '/chatrooms/' + roomId + '/apply',
        dataType: 'json',
        type: 'POST',
        data: JSON.stringify({
          message: message }),

        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json' },

        success: suc || conn._utils.emptyfn,
        error: error || conn._utils.emptyfn };

      conn._utils.ajax(opts);
    } else {
      conn.onError({
        type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR });

    }
  },

  /**
      * 退出聊天室
      * @param {Object} options -
      * @param {String} options.roomId - 聊天室的ID
      * @param {Function} options.success - 成功之后的回调，默认为空
      * @param {Function} options.error - 失败之后的回调，默认为空
      */
  quitChatRoom: function quitChatRoom(options) {
    var options = options || {};
    if (!this._utils.isCanSetRequestHeader) {
      conn.onError({
        type: _code.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR });

      return;
    }

    var conn = this;
    var token = options.accessToken || this.token;

    if (token) {
      var apiUrl = options.apiUrl || this.apiUrl;
      var appName = this.context.appName;
      var orgName = this.context.orgName;
      var roomId = options.roomId;
      if (!appName || !orgName) {
        conn.onError({
          type: _code.WEBIM_CONNCTION_AUTH_ERROR });

        return;
      }

      var suc = function suc(data, xhr) {
        typeof options.success === 'function' && options.success(data);
      };

      var error = function error(res, xhr, msg) {
        typeof options.error === 'function' && options.error(res);
      };

      var opts = {
        url: apiUrl + '/' + orgName + '/' + appName + '/chatrooms/' + roomId + '/quit',
        dataType: 'json',
        type: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token },

        success: suc || conn._utils.emptyfn,
        error: error || conn._utils.emptyfn };

      conn._utils.ajax(opts);
    } else {
      conn.onError({
        type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR });

    }
  },

  /**
      * 通过RestFul API接口创建群组
      * @param opt {Object} - 
      * @param opt.data {Object} - 群组信息
      * @param opt.data.groupname {string} - 群组名
      * @param opt.data.desc {string} - 群组描述
      * @param opt.data.members {string[]} - 好友id数组，群好友列表
      * @param opt.data.public {Boolean} - true: 公开群，false: 私有群
      * @param opt.data.approval {Boolean} - 前提：opt.data.public=true, true: 加群需要审批，false: 加群无需审批
      * @param opt.data.allowinvites {Boolean} - 前提：opt.data.public=false, true: 允许成员邀请入群，false: 不允许成员邀请入群
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      * @since 1.4.11
      */
  createGroupNew: function createGroupNew(opt) {
    opt.data.owner = this.user;
    opt.data.invite_need_confirm = false;
    var options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/chatgroups',
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify(opt.data),
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = function (respData) {
      opt.success(respData);
      this.onCreateGroup(respData);
    }.bind(this);
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API屏蔽群组，只对移动端有效
      * @param {Object} opt -
      * @param {string} opt.groupId - 需要屏蔽的群组ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      * @since 1.4.11
      */
  blockGroup: function blockGroup(opt) {
    var groupId = opt.groupId;
    groupId = 'notification_ignore_' + groupId;
    var data = {
      entities: [] };

    data.entities[0] = {};
    data.entities[0][groupId] = true;
    var options = {
      type: 'PUT',
      url: this.apiUrl + '/' + this.orgName + '/' +
      this.appName + '/' + 'users' + '/' + this.user,
      data: JSON.stringify(data),
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API分页获取群组列表
      * @param {Object} opt -
      * @param {Number} opt.limit - 每一页群组的最大数目
      * @param {string} opt.cursor=null - 游标，如果数据还有下一页，API 返回值会包含此字段，传递此字段可获取下一页的数据，为null时获取第一页数据
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      * @since 1.4.11
      */
  listGroups: function listGroups(opt) {
    var requestData = [];
    requestData['limit'] = opt.limit;
    requestData['cursor'] = opt.cursor;
    if (!requestData['cursor'])
    delete requestData['cursor'];
    if (isNaN(opt.limit)) {
      throw 'The parameter \"limit\" should be a number';
      return;
    }
    var options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/publicchatgroups',
      type: 'GET',
      dataType: 'json',
      data: requestData,
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API列出某用户所加入的所有群组
      * @param {Object} opt - 
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      * @since 1.4.11
      */
  getGroup: function getGroup(opt) {
    var options = {
      url: this.apiUrl + '/' + this.orgName +
      '/' + this.appName + '/' + 'users' + '/' +
      this.user + '/' + 'joined_chatgroups',
      dataType: 'json',
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过restful api转让群组
      * @param {Object} opt
      * @param {String}opt.groupId - 群组id
      * @param {String}opt.newOwner - 群组的新管理员 ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  changeOwner: function changeOwner(opt) {
    var requestData = {
      newowner: opt.newOwner };

    var options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/chatgroups/' + opt.groupId,
      type: 'PUT',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' },

      data: JSON.stringify(requestData) };

    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API根据groupId获取群组详情
      * @param {Object} opt -
      * @param {string} opt.groupId - 群组ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      * @since 1.4.11
      */
  getGroupInfo: function getGroupInfo(opt) {
    var options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/chatgroups/' + opt.groupId + '?joined_time=true',
      type: 'GET',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API修改群信息
      * @param {Object} opt -
      * @param {string} opt.groupId - 群组ID
      * @param {string} opt.groupName - 群组名
      * @param {string} opt.description - 群组简介
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  modifyGroup: function modifyGroup(opt) {
    var groupId = opt.groupId,
    requestData = {
      groupname: opt.groupName,
      description: opt.description },

    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatgroups' + '/' + groupId,
      type: 'PUT',
      data: JSON.stringify(requestData),
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API分页列出群组的所有成员
      * @param {Object} opt -
      * @param {Number} opt.pageNum - 页码，默认1
      * @param {Number} opt.pageSize - 每一页的最大群成员数目,最大值1000
      * @param {string} opt.groupId - 群组ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  listGroupMember: function listGroupMember(opt) {
    if (isNaN(opt.pageNum) || opt.pageNum <= 0) {
      throw 'The parameter \"pageNum\" should be a positive number';
      return;
    } else if (isNaN(opt.pageSize) || opt.pageSize <= 0) {
      throw 'The parameter \"pageSize\" should be a positive number';
      return;
    } else if (opt.groupId === null && typeof opt.groupId === 'undefined') {
      throw 'The parameter \"groupId\" should be added';
      return;
    }
    var requestData = [],
    groupId = opt.groupId;
    requestData['pagenum'] = opt.pageNum;
    requestData['pagesize'] = opt.pageSize;
    var options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/chatgroups' +
      '/' + groupId + '/users',
      dataType: 'json',
      type: 'GET',
      data: requestData,
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API获取群组下所有管理员
      * @param {Object} opt -
      * @param {string} opt.groupId - 群组ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      * @since 1.4.11
      */
  getGroupAdmin: function getGroupAdmin(opt) {
    var groupId = opt.groupId;
    var options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/chatgroups' +
      '/' + groupId + '/admin',
      dataType: 'json',
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API设置群管理员
      * @param {Object} opt -
      * @param {string} opt.groupId - 群组ID
      * @param {string} opt.username - 用户ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  setAdmin: function setAdmin(opt) {
    var groupId = opt.groupId,
    requestData = {
      newadmin: opt.username },

    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/' + 'chatgroups' +
      '/' + groupId + '/' + 'admin',
      type: "POST",
      dataType: 'json',
      data: JSON.stringify(requestData),
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API取消群管理员
      * @param {Object} opt -
      * @param {string} opt.gorupId - 群组ID
      * @param {string} opt.username - 用户ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  removeAdmin: function removeAdmin(opt) {
    var groupId = opt.groupId,
    username = opt.username,
    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/' + 'chatgroups' +
      '/' + groupId + '/' + 'admin' + '/' + username,
      type: 'DELETE',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API解散群组
      * @param {Object} opt -
      * @param {string} opt.groupId - 群组ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  dissolveGroup: function dissolveGroup(opt) {
    var groupId = opt.groupId,
    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatgroups' + '/' + groupId + '?version=v3',
      type: 'DELETE',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API离开群组
      * @param {Object} opt -
      * @param {string} opt.groupId - 群组ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  quitGroup: function quitGroup(opt) {
    var groupId = opt.groupId,
    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatgroups' + '/' + groupId + '/' + 'quit',
      type: 'DELETE',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API邀请群成员
      * @param {Object} opt -
      * @param {string} opt.groupId - 群组名
      * @param {string[]} opt.users - 用户ID数组
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  inviteToGroup: function inviteToGroup(opt) {
    var groupId = opt.groupId,
    users = opt.users,
    requestData = {
      usernames: users },

    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatgroups' + '/' + groupId + '/' + 'invite',
      type: 'POST',
      data: JSON.stringify(requestData),
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API发出入群申请
      * @param {Object} opt -
      * @param {String} opt.groupId - 加入群组ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      * @since 1.4.11
      */
  joinGroup: function joinGroup(opt) {
    var options = {
      url: this.apiUrl + '/' + this.orgName + '/' +
      this.appName + '/' + 'chatgroups' + '/' + opt.groupId + '/' + 'apply',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify({
        message: 'join group' }),
      // 后端参数变更，申请入群需要填写入群消息
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API同意用户加入群
      * @param {Object} opt -
      * @param {string} opt.applicant - 申请加群的用户ID
      * @param {Object} opt.groupId - 群组ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  agreeJoinGroup: function agreeJoinGroup(opt) {
    var groupId = opt.groupId,
    requestData = {
      "applicant": opt.applicant,
      "verifyResult": true,
      "reason": "no clue" },

    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatgroups' + '/' + groupId + '/' + 'apply_verify',
      type: 'POST',
      dataType: "json",
      data: JSON.stringify(requestData),
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API拒绝用户加入群
      * @param {Object} opt -
      * @param {string} opt.applicant - 申请加群的用户ID
      * @param {Object} opt.groupId - 群组ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  rejectJoinGroup: function rejectJoinGroup(opt) {
    var groupId = opt.groupId,
    requestData = {
      "applicant": opt.applicant,
      "verifyResult": false,
      "reason": "no clue" },

    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatgroups' + '/' + groupId + '/' + 'apply_verify',
      type: 'POST',
      dataType: "json",
      data: JSON.stringify(requestData),
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API同意加群邀请
      * @param {Object} opt -
      * @param {string} opt.invitee - 处理群邀请用户的用户名
      * @param {Object} opt.groupId - 群组ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  agreeInviteIntoGroup: function agreeInviteIntoGroup(opt) {
    var groupId = opt.groupId,
    requestData = {
      "invitee": opt.invitee,
      "verifyResult": true },

    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatgroups' + '/' + groupId + '/' + 'invite_verify',
      type: 'POST',
      dataType: "json",
      data: JSON.stringify(requestData),
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API拒绝加群邀请
      * @param {Object} opt -
      * @param {string} opt.invitee - 处理群邀请用户的用户名
      * @param {Object} opt.groupId - 群组ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  rejectInviteIntoGroup: function rejectInviteIntoGroup(opt) {
    var groupId = opt.groupId,
    requestData = {
      "invitee": opt.invitee,
      "verifyResult": false },

    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatgroups' + '/' + groupId + '/' + 'invite_verify',
      type: 'POST',
      dataType: "json",
      data: JSON.stringify(requestData),
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API删除单个群成员
      * @param {Object} opt -
      * @param {string} opt.groupId - 群组ID
      * @param {string} opt.username - 用户ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  removeSingleGroupMember: function removeSingleGroupMember(opt) {
    var groupId = opt.groupId,
    username = opt.username,
    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatgroups' + '/' + groupId + '/' + 'users' + '/' +
      username,
      type: 'DELETE',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API删除多个群成员
      * @param {Object} opt -
      * @param {string} opt.groupId - 群组ID
      * @param {string[]} opt.users - 用户ID数组
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  removeMultiGroupMember: function removeMultiGroupMember(opt) {
    var groupId = opt.groupId,
    users = opt.users.join(','),
    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatgroups' + '/' + groupId + '/' + 'users' + '/' +
      users,
      type: 'DELETE',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API禁止群用户发言
      * @param {Object} opt -
      * @param {string} opt.username - 被禁言的群成员的ID
      * @param {Number} opt.muteDuration - 被禁言的时长，单位ms，如果是“-1000”代表永久
      * @param {string} opt.groupId - 群组ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      * @since 1.4.11
      */
  mute: function mute(opt) {
    var groupId = opt.groupId,
    requestData = {
      "usernames": [opt.username],
      "mute_duration": opt.muteDuration },

    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/' + 'chatgroups' +
      '/' + groupId + '/' + 'mute',
      dataType: 'json',
      type: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' },

      data: JSON.stringify(requestData) };

    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API禁止聊天室用户发言
      * @param {Object} opt -
      * @param {string} opt.username - 被禁言的聊天室成员的ID
      * @param {Number} opt.muteDuration - 被禁言的时长，单位ms，如果是“-1000”代表永久
      * @param {string} opt.chatRoomId - 聊天室ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      * @since 1.4.11
      */
  muteChatRoomMember: function muteChatRoomMember(opt) {
    var chatRoomId = opt.chatRoomId,
    requestData = {
      "usernames": [opt.username],
      "mute_duration": opt.muteDuration },

    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/' + 'chatrooms' +
      '/' + chatRoomId + '/' + 'mute',
      dataType: 'json',
      type: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' },

      data: JSON.stringify(requestData) };

    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API取消对群成员禁言
      * @param {Object} opt -
      * @param {string} opt.groupId - 群组ID
      * @param {string} opt.username - 被取消禁言的群用户ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      * @since 1.4.11
      */
  removeMute: function removeMute(opt) {
    var groupId = opt.groupId,
    username = opt.username;
    var options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/' + 'chatgroups' +
      '/' + groupId + '/' + 'mute' + '/' + username,
      dataType: 'json',
      type: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API取消对聊天室成员禁言
      * @param {Object} opt -
      * @param {string} opt.chatRoomId - 聊天室ID
      * @param {string} opt.username - 被取消禁言的群用户ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      * @since 1.4.11
      */
  removeMuteChatRoomMember: function removeMuteChatRoomMember(opt) {
    var chatRoomId = opt.chatRoomId,
    username = opt.username;
    var options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/' + 'chatrooms' +
      '/' + chatRoomId + '/' + 'mute' + '/' + username,
      dataType: 'json',
      type: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API获取群组下所有被禁言成员
      * @param {Object} opt -
      * @param {string} opt.groupId - 群组ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  getMuted: function getMuted(opt) {
    var groupId = opt.groupId;
    var options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/chatgroups' +
      '/' + groupId + '/mute',
      dataType: 'json',
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API获取聊天室下所有被禁言成员
      * @param {Object} opt -
      * @param {string} opt.chatRoomId - 聊天室ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  getChatRoomMuted: function getChatRoomMuted(opt) {
    var chatRoomId = opt.chatRoomId;
    var options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/chatrooms' +
      '/' + chatRoomId + '/mute',
      dataType: 'json',
      type: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API添加用户至群组黑名单(单个)
      * @param {Object} opt -
      * @param {string} opt.groupId - 群组ID
      * @param {stirng} opt.username - 用户ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  groupBlockSingle: function groupBlockSingle(opt) {
    var groupId = opt.groupId,
    username = opt.username,
    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatgroups' + '/' + groupId + '/' + 'blocks' + '/' +
      'users' + '/' + username,
      type: 'POST',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API添加用户至聊天室黑名单(单个)
      * @param {Object} opt -
      * @param {string} opt.chatRoomId - 聊天室ID
      * @param {stirng} opt.username - 用户ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  chatRoomBlockSingle: function chatRoomBlockSingle(opt) {
    var chatRoomId = opt.chatRoomId,
    username = opt.username,
    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatrooms' + '/' + chatRoomId + '/' + 'blocks' + '/' +
      'users' + '/' + username,
      type: 'POST',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API添加用户至群组黑名单(批量)
      * @param {Object} opt -
      * @param {string[]} opt.usernames - 用户ID数组
      * @param {string} opt.groupId - 群组ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  groupBlockMulti: function groupBlockMulti(opt) {
    var groupId = opt.groupId,
    usernames = opt.usernames,
    requestData = {
      usernames: usernames },

    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatgroups' + '/' + groupId + '/' + 'blocks' + '/' +
      'users',
      data: JSON.stringify(requestData),
      type: 'POST',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API添加用户至聊天室黑名单(批量)
      * @param {Object} opt -
      * @param {string[]} opt.usernames - 用户ID数组
      * @param {string} opt.chatRoomId - 聊天室ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  chatRoomBlockMulti: function chatRoomBlockMulti(opt) {
    var chatRoomId = opt.chatRoomId,
    usernames = opt.usernames,
    requestData = {
      usernames: usernames },

    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatrooms' + '/' + chatRoomId + '/' + 'blocks' + '/' +
      'users',
      data: JSON.stringify(requestData),
      type: 'POST',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API将用户从群黑名单移除（单个）
      * @param {Object} opt -
      * @param {string} opt.groupId - 群组ID
      * @param {string} opt.username - 用户ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  removeGroupBlockSingle: function removeGroupBlockSingle(opt) {
    var groupId = opt.groupId,
    username = opt.username,
    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatgroups' + '/' + groupId + '/' + 'blocks' + '/' +
      'users' + '/' + username,
      type: 'DELETE',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API将用户从聊天室黑名单移除（单个）
      * @param {Object} opt -
      * @param {string} opt.chatRoomId - 聊天室ID
      * @param {string} opt.username - 用户ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  removeChatRoomBlockSingle: function removeChatRoomBlockSingle(opt) {
    var chatRoomId = opt.chatRoomId,
    username = opt.username,
    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatrooms' + '/' + chatRoomId + '/' + 'blocks' + '/' +
      'users' + '/' + username,
      type: 'DELETE',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API将用户从群黑名单移除（批量）
      * @param {Object} opt -
      * @param {string} opt.groupId - 群组ID
      * @param {string} opt.usernames - 用户id的数组 ['user1', 'user2']
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  removeGroupBlockMulti: function removeGroupBlockMulti(opt) {
    var groupId = opt.groupId,
    username = opt.usernames.join(','),
    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatgroups' + '/' + groupId + '/' + 'blocks' + '/' +
      'users' + '/' + username,
      type: 'DELETE',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API将用户从聊天室黑名单移除（批量）
      * @param {Object} opt -
      * @param {string} opt.chatRoomId - 聊天室ID
      * @param {string} opt.usernames - 用户id的数组 ['user1', 'user2']
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  removeChatRoomBlockMulti: function removeChatRoomBlockMulti(opt) {
    var chatRoomId = opt.chatRoomId,
    username = opt.usernames.join(','),
    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatrooms' + '/' + chatRoomId + '/' + 'blocks' + '/' +
      'users' + '/' + username,
      type: 'DELETE',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API获取群组黑名单
      * @param {Object} opt -
      * @param {string} opt.groupId - 群组ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  getGroupBlacklistNew: function getGroupBlacklistNew(opt) {
    var groupId = opt.groupId,
    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatgroups' + '/' + groupId + '/' + 'blocks' + '/' + 'users',
      type: 'GET',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 通过RestFul API获取聊天室黑名单
      * @param {Object} opt -
      * @param {string} opt.chatRoomId - 聊天室ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  getChatRoomBlacklistNew: function getChatRoomBlacklistNew(opt) {
    var chatRoomId = opt.chatRoomId,
    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatrooms' + '/' + chatRoomId + '/' + 'blocks' + '/' + 'users',
      type: 'GET',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 群一键禁言. 操作权限：app admin、群组owner、群组admin及以上身份
      * @param {Object} opt -
      * @param {string} opt.groupId - 群组ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  disableSendGroupMsg: function disableSendGroupMsg(opt) {
    var groupId = opt.groupId,
    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatgroups' + '/' + groupId + '/' + 'ban',
      type: 'POST',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 聊天室一键禁言. 操作权限：app admin、群组owner、群组admin及以上身份
      * @param {Object} opt -
      * @param {string} opt.chatRoomId - 聊天室ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  disableSendChatRoomMsg: function disableSendChatRoomMsg(opt) {
    var chatRoomId = opt.chatRoomId,
    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatrooms' + '/' + chatRoomId + '/' + 'ban',
      type: 'POST',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 解除群一键禁言. 操作权限：app admin、群组owner、群组admin及以上身份
      * @param {Object} opt -
      * @param {string} opt.groupId - 群组ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  enableSendGroupMsg: function enableSendGroupMsg(opt) {
    var groupId = opt.groupId,
    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatgroups' + '/' + groupId + '/' + 'ban',
      type: 'DELETE',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 聊天室除群一键禁言. 操作权限：app admin、群组owner、群组admin及以上身份
      * @param {Object} opt -
      * @param {string} opt.chatRoomId - 聊天室ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  enableSendChatRoomMsg: function enableSendChatRoomMsg(opt) {
    var chatRoomId = opt.chatRoomId,
    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatrooms' + '/' + chatRoomId + '/' + 'ban',
      type: 'DELETE',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 增加白名单群成员 操作权限：app admin、群组owner、群组admin及以上身份
      * @param {Object} opt -
      * @param {string} opt.groupId - 群组ID
      * @param {Array} opt.users - 成员 ['username']
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  addUsersToGroupWhitelist: function addUsersToGroupWhitelist(opt) {
    var groupId = opt.groupId,
    requestData = {
      usernames: opt.users },

    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatgroups' + '/' + groupId + '/white/users',
      type: 'POST',
      data: JSON.stringify(requestData),
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 增加白名单群成员 操作权限：app admin、群组owner、群组admin及以上身份
      * @param {Object} opt -
      * @param {string} opt.chatRoomId - 聊天室ID
      * @param {Array} opt.users - 成员 ['username']
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  addUsersToChatRoomWhitelist: function addUsersToChatRoomWhitelist(opt) {
    var chatRoomId = opt.chatRoomId,
    requestData = {
      usernames: opt.users },

    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatrooms' + '/' + chatRoomId + '/white/users',
      type: 'POST',
      data: JSON.stringify(requestData),
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 删除白名单群成员 操作权限：app admin、群组owner、群组admin及以上身份
      * @param {Object} opt -
      * @param {string} opt.groupId - 群组ID
      * @param {string} opt.userName - 成员
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  rmUsersFromGroupWhitelist: function rmUsersFromGroupWhitelist(opt) {
    var groupId = opt.groupId,
    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatgroups' + '/' + groupId + '/white/users/' + opt.userName,
      type: 'DELETE',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 删除白名单聊天室成员 操作权限：app admin、群组owner、群组admin及以上身份
      * @param {Object} opt -
      * @param {string} opt.chatRoomId - 聊天室ID
      * @param {string} opt.userName - 成员
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  rmUsersFromChatRoomWhitelist: function rmUsersFromChatRoomWhitelist(opt) {
    var chatRoomId = opt.chatRoomId,
    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatrooms' + '/' + chatRoomId + '/white/users/' + opt.userName,
      type: 'DELETE',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 获取白名单群成员 操作权限：需app admin、群组admin及以上身份；
      * @param {Object} opt -
      * @param {string} opt.groupId - 群组ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  getGroupWhitelist: function getGroupWhitelist(opt) {
    var groupId = opt.groupId,
    requestData = {
      usernames: opt.users },

    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatgroups' + '/' + groupId + '/white/users',
      type: 'GET',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 获取白名单聊天室成员 操作权限：需app admin、群组admin及以上身份；
      * @param {Object} opt -
      * @param {string} opt.chatRoomId - 聊天室ID
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  getChatRoomWhitelist: function getChatRoomWhitelist(opt) {
    var chatRoomId = opt.chatRoomId,
    requestData = {
      usernames: opt.users },

    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatrooms' + '/' + chatRoomId + '/white/users',
      type: 'GET',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 查询群成员是否是白名单用户 操作权限：app admin可查询所有用户；app user可查询自己
      * @param {Object} opt -
      * @param {string} opt.groupId - 群组ID
      * @param {string} opt.userName - 用户名
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  isGroupWhiteUser: function isGroupWhiteUser(opt) {
    var groupId = opt.groupId,
    requestData = {
      usernames: opt.users },

    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatgroups' + '/' + groupId + '/white/users/' + opt.userName,
      type: 'GET',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 查询聊天室成员是否是白名单用户 操作权限：app admin可查询所有用户；app user可查询自己
      * @param {Object} opt -
      * @param {string} opt.chatRoomId - 群组ID
      * @param {string} opt.userName - 用户名
      * @param {Function} opt.success - 成功之后的回调，默认为空
      * @param {Function} opt.error - 失败之后的回调，默认为空
      */
  isChatRoomWhiteUser: function isChatRoomWhiteUser(opt) {
    var chatRoomId = opt.chatRoomId,
    requestData = {
      usernames: opt.users },

    options = {
      url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
      '/' + 'chatrooms' + '/' + chatRoomId + '/white/users/' + opt.userName,
      type: 'GET',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    options.success = opt.success || this._utils.emptyfn;
    options.error = opt.error || this._utils.emptyfn;
    this._utils.ajax(options);
  },

  /**
      * 查询群组消息都被哪些用户读过
      * @param {Object} options -
      * @param {String} options.groupId - 群组id
      * @param {String} options.msgId - 消息id
      * @param {Function} options.success - 成功的回调
      * @param {Function} options.error - 失败的回调
      *
      */
  getGroupMsgReadUser: function getGroupMsgReadUser(options) {
    var me = this;
    var options = options || {};
    if (!this._utils.isCanSetRequestHeader) {
      conn.onError({
        type: _code.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR });

      return;
    }

    var token = options.accessToken || this.token;

    if (token) {
      var apiUrl = me.apiUrl;
      var appName = me.context.appName;
      var orgName = me.context.orgName;

      if (!appName || !orgName) {
        me.onError({
          type: _code.WEBIM_CONNCTION_AUTH_ERROR });

        return;
      }

      var suc = function suc(data) {
        typeof options.success === 'function' && options.success(data);
      };
      var error = function error(err) {
        typeof options.error === 'function' && options.error(err);
      };

      var opts = {
        url: apiUrl + '/' + orgName + '/' + appName + '/chatgroups/' + options.groupId + '/acks/' + options.msgId,
        dataType: 'json',
        type: 'GET',
        data: {
          limit: 500,
          key: undefined },

        headers: {
          'Authorization': 'Bearer ' + token },

        success: suc || this._utils.emptyfn,
        error: error || this._utils.emptyfn };

      this._utils.ajax(opts);

    } else {
      me.onError({
        type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR });

    }
  },

  /**
      * 获取好友黑名单
      * @param {Object} options - 
      * @param {Function} options.success - 成功之后的回调，默认为空
      * @param {Function} options.error - 失败之后的回调，默认为空
      */
  getBlacklist: function getBlacklist(options) {
    var me = this;
    var options = options || {};
    if (!this._utils.isCanSetRequestHeader) {
      conn.onError({
        type: _code.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR });

      return;
    }

    var conn = this,
    token = options.accessToken || this.token;

    if (token) {
      var apiUrl = options.apiUrl || this.apiUrl;
      var appName = this.context.appName;
      var orgName = this.context.orgName;

      if (!appName || !orgName) {
        conn.onError({
          type: _code.WEBIM_CONNCTION_AUTH_ERROR });

        return;
      }

      var suc = function suc(data, xhr) {
        var list = {};
        data.data.forEach(function (v, i) {
          list[v] = {
            name: v };

        });
        me.onBlacklistUpdate(list);
        typeof options.success === 'function' && options.success(data);
      };

      var error = function error(res, xhr, msg) {
        me.onBlacklistUpdate([]);
        typeof options.error === 'function' && options.error(res);
      };

      var opts = {
        url: apiUrl + '/' + orgName + '/' + appName + '/users/' + this.user + '/blocks/users',
        dataType: 'json',
        type: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token },

        success: suc || this._utils.emptyfn,
        error: error || this._utils.emptyfn };

      this._utils.ajax(opts);
    } else {
      conn.onError({
        type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR });

    }
  },

  /**
      * 获取联系人
      * @param {Object} options - 
      * @param {Function} options.success - 成功之后的回调，默认为空
      * @param {Function} options.error - 失败之后的回调，默认为空
      */

  getRoster: function getRoster(options) {
    var options = options || {};
    var self = this;
    if (!this._utils.isCanSetRequestHeader) {
      conn.onError({
        type: _code.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR });

      return;
    }

    var conn = this,
    token = options.accessToken || this.token;

    if (token) {
      var apiUrl = options.apiUrl || this.apiUrl;
      var appName = this.context.appName;
      var orgName = this.context.orgName;

      if (!appName || !orgName) {
        conn.onError({
          type: _code.WEBIM_CONNCTION_AUTH_ERROR });

        return;
      }

      var suc = function suc(data, xhr) {
        //_parseFriend *****之前用这个方法处理的返回消息
        var friends = [];
        data.data.forEach(function (v, i) {
          friends.push({
            name: v,
            subscription: 'both',
            jid: self.context.jid });

        });
        typeof options.success === 'function' && options.success(friends);
        self.onRoster && self.onRoster(friends);
      };

      var error = function error(res, xhr, msg) {
        typeof options.error === 'function' && options.error(res);
      };

      // var pageInfo = {
      //     pagenum: parseInt(options.pagenum) || 1,
      //     pagesize: parseInt(options.pagesize) || 20
      // };

      var opts = {
        url: apiUrl + '/' + orgName + '/' + appName + '/users/' + this.user + '/contacts/users',
        dataType: 'json',
        type: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token },

        // data: pageInfo,
        success: suc || this._utils.emptyfn,
        error: error || this._utils.emptyfn };

      this._utils.ajax(opts);
    } else {
      conn.onError({
        type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR });

    }
  },

  /**
      * 获取群公告
      * @param {Object} options - 
      * @param {Object} options.groupId - 群组id
      * @param {Function} options.success - 成功之后的回调，默认为空
      * @param {Function} options.error - 失败之后的回调，默认为空
      */
  fetchGroupAnnouncement: function fetchGroupAnnouncement(options) {
    var apiUrl = options.apiUrl || this.apiUrl;
    var appName = this.context.appName;
    var orgName = this.context.orgName;
    var groupId = options.groupId;
    var opts = {
      url: "".concat(apiUrl, "/").concat(orgName, "/").concat(appName, "/chatgroups/").concat(groupId, "/announcement"),
      type: 'GET',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    opts.success = options.success || this._utils.emptyfn;
    opts.error = options.error || this._utils.emptyfn;
    this._utils.ajax(opts);
  },

  /**
      * 获取聊天室公告
      * @param {Object} options - 
      * @param {Object} options.roomId - 聊天室id
      * @param {Function} options.success - 成功之后的回调，默认为空
      * @param {Function} options.error - 失败之后的回调，默认为空
      */
  fetchChatRoomAnnouncement: function fetchChatRoomAnnouncement(options) {
    var apiUrl = options.apiUrl || this.apiUrl;
    var appName = this.context.appName;
    var orgName = this.context.orgName;
    var roomId = options.roomId;
    var opts = {
      url: "".concat(apiUrl, "/").concat(orgName, "/").concat(appName, "/chatrooms/").concat(roomId, "/announcement"),
      type: 'GET',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    opts.success = options.success || this._utils.emptyfn;
    opts.error = options.error || this._utils.emptyfn;
    this._utils.ajax(opts);
  },

  /**
      * 设置更新群公告
      * @param {Object} options - 
      * @param {Object} options.groupId - 群组id
      * @param {Object} options.announcement - 公告内容
      * @param {Function} options.success - 成功之后的回调，默认为空
      * @param {Function} options.error - 失败之后的回调，默认为空
      */

  updateGroupAnnouncement: function updateGroupAnnouncement(options) {
    var apiUrl = options.apiUrl || this.apiUrl;
    var appName = this.context.appName;
    var orgName = this.context.orgName;
    var groupId = options.groupId;
    var requestData = {
      announcement: options.announcement };

    var opts = {
      url: "".concat(apiUrl, "/").concat(orgName, "/").concat(appName, "/chatgroups/").concat(groupId, "/announcement"),
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(requestData),
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    opts.success = options.success || this._utils.emptyfn;
    opts.error = options.error || this._utils.emptyfn;
    this._utils.ajax(opts);
  },

  /**
      * 设置更新聊天室公告
      * @param {Object} options - 
      * @param {Object} options.roomId - 聊天室id
      * @param {Object} options.announcement - 公告内容
      * @param {Function} options.success - 成功之后的回调，默认为空
      * @param {Function} options.error - 失败之后的回调，默认为空
      */

  updateChatRoomAnnouncement: function updateChatRoomAnnouncement(options) {
    var apiUrl = options.apiUrl || this.apiUrl;
    var appName = this.context.appName;
    var orgName = this.context.orgName;
    var roomId = options.roomId;
    var requestData = {
      announcement: options.announcement };

    var opts = {
      url: "".concat(apiUrl, "/").concat(orgName, "/").concat(appName, "/chatrooms/").concat(roomId, "/announcement"),
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(requestData),
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    opts.success = options.success || this._utils.emptyfn;
    opts.error = options.error || this._utils.emptyfn;
    this._utils.ajax(opts);
  },

  /**
      * 上传群共享文件
      * @param {Object} options - 
      * @param {Object} options.groupId - 群组id
      * @param {Object} options.file - 上传的文件对象
      * @param {Object} options.onFileUploadProgress - 上传进度的回调
      * @param {Object} options.onFileUploadComplete - 上传完成的回调
      * @param {Object} options.onFileUploadError - 上传失败的回调
      * @param {Object} options.onFileUploadCanceled - 上传取消的回调
      */
  uploadGroupSharedFile: function uploadGroupSharedFile(options) {
    var apiUrl = options.apiUrl || this.apiUrl;
    var appName = this.context.appName;
    var orgName = this.context.orgName;
    var groupId = options.groupId;
    this._utils.uploadFile({
      uploadUrl: "".concat(apiUrl, "/").concat(orgName, "/").concat(appName, "/chatgroups/").concat(groupId, "/share_files"),
      onFileUploadProgress: options.onFileUploadProgress,
      onFileUploadComplete: options.onFileUploadComplete,
      onFileUploadError: options.onFileUploadError,
      onFileUploadCanceled: options.onFileUploadCanceled,
      accessToken: this.token,
      apiUrl: apiUrl,
      file: options.file,
      appKey: this.context.appKey });

  },

  /**
      * 上传聊天室共享文件
      * @param {Object} options - 
      * @param {Object} options.roomId - 聊天室id
      * @param {Object} options.file - 上传的文件对象
      * @param {Object} options.onFileUploadProgress - 上传进度的回调
      * @param {Object} options.onFileUploadComplete - 上传完成的回调
      * @param {Object} options.onFileUploadError - 上传失败的回调
      * @param {Object} options.onFileUploadCanceled - 上传取消的回调
      */
  uploadChatRoomSharedFile: function uploadChatRoomSharedFile(options) {
    var apiUrl = options.apiUrl || this.apiUrl;
    var appName = this.context.appName;
    var orgName = this.context.orgName;
    var roomId = options.roomId;
    this._utils.uploadFile({
      uploadUrl: "".concat(apiUrl, "/").concat(orgName, "/").concat(appName, "/chatrooms/").concat(roomId, "/share_files"),
      onFileUploadProgress: options.onFileUploadProgress,
      onFileUploadComplete: options.onFileUploadComplete,
      onFileUploadError: options.onFileUploadError,
      onFileUploadCanceled: options.onFileUploadCanceled,
      accessToken: this.token,
      apiUrl: apiUrl,
      file: options.file,
      appKey: this.context.appKey });

  },

  /**
      * 删除群共享文件
      * @param {Object} options - 
      * @param {Object} options.groupId - 群组id
      * @param {Object} options.fileId - 文件id
      * @param {Function} options.success - 成功之后的回调，默认为空
      * @param {Function} options.error - 失败之后的回调，默认为空
      */
  deleteGroupSharedFile: function deleteGroupSharedFile(options) {
    var apiUrl = options.apiUrl || this.apiUrl;
    var appName = this.context.appName;
    var orgName = this.context.orgName;
    var groupId = options.groupId;
    var fileId = options.fileId;
    var opts = {
      url: "".concat(apiUrl, "/").concat(orgName, "/").concat(appName, "/chatgroups/").concat(groupId, "/share_files/").concat(fileId),
      type: 'DELETE',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    opts.success = options.success || this._utils.emptyfn;
    opts.error = options.error || this._utils.emptyfn;
    this._utils.ajax(opts);
  },

  /**
      * 删除聊天室共享文件
      * @param {Object} options - 
      * @param {Object} options.roomId - 聊天室id
      * @param {Object} options.fileId - 文件id
      * @param {Function} options.success - 成功之后的回调，默认为空
      * @param {Function} options.error - 失败之后的回调，默认为空
      */
  deleteChatRoomSharedFile: function deleteChatRoomSharedFile(options) {
    var apiUrl = options.apiUrl || this.apiUrl;
    var appName = this.context.appName;
    var orgName = this.context.orgName;
    var roomId = options.roomId;
    var fileId = options.fileId;
    var opts = {
      url: "".concat(apiUrl, "/").concat(orgName, "/").concat(appName, "/chatrooms/").concat(roomId, "/share_files/").concat(fileId),
      type: 'DELETE',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    opts.success = options.success || this._utils.emptyfn;
    opts.error = options.error || this._utils.emptyfn;
    this._utils.ajax(opts);
  },

  /**
      * 下载群共享文件
      * @param {Object} options - 
      * @param {Object} options.groupId - 群组id
      * @param {Object} options.fileId - 文件id
      * @param {Object} options.onFileDownloadComplete - 文件下载成功的回调
      * @param {Object} options.onFileDownloadError - 文件下载失败的回调
      */
  downloadGroupSharedFile: function downloadGroupSharedFile(options) {
    var apiUrl = options.apiUrl || this.apiUrl;
    var appName = this.context.appName;
    var orgName = this.context.orgName;
    var groupId = options.groupId;
    var fileId = options.fileId;
    this._utils.download.call(this, {
      url: "".concat(apiUrl, "/").concat(orgName, "/").concat(appName, "/chatgroups/").concat(groupId, "/share_files/").concat(fileId),
      onFileDownloadComplete: options.onFileDownloadComplete,
      onFileDownloadError: options.onFileDownloadError,
      accessToken: this.token,
      id: fileId,
      secret: '' });

  },

  /**
      * 下载聊天室共享文件
      * @param {Object} options - 
      * @param {Object} options.roomId - 聊天室id
      * @param {Object} options.fileId - 文件id
      * @param {Object} options.onFileDownloadComplete - 文件下载成功的回调
      * @param {Object} options.onFileDownloadError - 文件下载失败的回调
      */
  downloadChatRoomSharedFile: function downloadChatRoomSharedFile(options) {
    var apiUrl = options.apiUrl || this.apiUrl;
    var appName = this.context.appName;
    var orgName = this.context.orgName;
    var roomId = options.roomId;
    var fileId = options.fileId;
    this._utils.download.call(this, {
      url: "".concat(apiUrl, "/").concat(orgName, "/").concat(appName, "/chatrooms/").concat(roomId, "/share_files/").concat(fileId),
      onFileDownloadComplete: options.onFileDownloadComplete,
      onFileDownloadError: options.onFileDownloadError,
      accessToken: this.token,
      id: fileId,
      secret: '' });

  },

  /**
      * 获取群共享文件列表
      * @param {Object} options - 
      * @param {Object} options.groupId - 群组id
      * @param {Function} options.success - 成功之后的回调，默认为空
      * @param {Function} options.error - 失败之后的回调，默认为空
      */
  fetchGroupSharedFileList: function fetchGroupSharedFileList(options) {
    var apiUrl = options.apiUrl || this.apiUrl;
    var appName = this.context.appName;
    var orgName = this.context.orgName;
    var groupId = options.groupId;
    var opts = {
      url: "".concat(apiUrl, "/").concat(orgName, "/").concat(appName, "/chatgroups/").concat(groupId, "/share_files"),
      type: 'GET',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    opts.success = options.success || this._utils.emptyfn;
    opts.error = options.error || this._utils.emptyfn;
    this._utils.ajax(opts);
  },

  /**
      * 获取聊天室共享文件列表
      * @param {Object} options - 
      * @param {Object} options.roomId - 聊天室id
      * @param {Function} options.success - 成功之后的回调，默认为空
      * @param {Function} options.error - 失败之后的回调，默认为空
      */
  fetchChatRoomSharedFileList: function fetchChatRoomSharedFileList(options) {
    var apiUrl = options.apiUrl || this.apiUrl;
    var appName = this.context.appName;
    var orgName = this.context.orgName;
    var roomId = options.roomId;
    var opts = {
      url: "".concat(apiUrl, "/").concat(orgName, "/").concat(appName, "/chatrooms/").concat(roomId, "/share_files"),
      type: 'GET',
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json' } };


    opts.success = options.success || this._utils.emptyfn;
    opts.error = options.error || this._utils.emptyfn;
    this._utils.ajax(opts);
  } };var _default =



connectionProto;exports.default = _default;

/***/ }),
/* 22 */
/*!***************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/node_modules/Base64/base64.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function () {

  var object = (
    // #34: CommonJS
     true && exports !== null &&
    typeof exports.nodeType !== 'number' ?
      exports :
    // #8: web workers
    typeof self != 'undefined' ?
      self :
    // #31: ExtendScript
      $.global
  );

  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  function InvalidCharacterError(message) {
    this.message = message;
  }
  InvalidCharacterError.prototype = new Error;
  InvalidCharacterError.prototype.name = 'InvalidCharacterError';

  // encoder
  // [https://gist.github.com/999166] by [https://github.com/nignag]
  object.btoa || (
  object.btoa = function (input) {
    var str = String(input);
    for (
      // initialize result and counter
      var block, charCode, idx = 0, map = chars, output = '';
      // if the next str index does not exist:
      //   change the mapping table to "="
      //   check if d has no fractional digits
      str.charAt(idx | 0) || (map = '=', idx % 1);
      // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
      output += map.charAt(63 & block >> 8 - idx % 1 * 8)
    ) {
      charCode = str.charCodeAt(idx += 3/4);
      if (charCode > 0xFF) {
        throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      }
      block = block << 8 | charCode;
    }
    return output;
  });

  // decoder
  // [https://gist.github.com/1020396] by [https://github.com/atk]
  object.atob || (
  object.atob = function (input) {
    var str = String(input).replace(/[=]+$/, ''); // #31: ExtendScript bad parse of /=
    if (str.length % 4 == 1) {
      throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (
      // initialize result and counters
      var bc = 0, bs, buffer, idx = 0, output = '';
      // get next character
      buffer = str.charAt(idx++);
      // character found in table? initialize bit storage and add its ascii value;
      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        // and if not first of each 4 characters,
        // convert the first 8 bits to one ascii character
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      // try to find character in table (0-63, not found => -1)
      buffer = chars.indexOf(buffer);
    }
    return output;
  });

}());


/***/ }),
/* 23 */
/*!*************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/checkEnv.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var wxMiniProgram = false;

var info = [
{
  key: 'Environment',
  value: 'production',
  keyBgColor: '#606060',
  valueBgColor: '#1299ec' },

{
  key: 'version',
  value: '3.1.2',
  keyBgColor: '#606060',
  valueBgColor: '#1299ec' },

{
  key: 'updateTime',
  value: '2020.5.14',
  keyBgColor: '#606060',
  valueBgColor: '#1299ec' },

{
  key: 'platform',
  value: wxMiniProgram ? 'miniProgram' : 'browser',
  keyBgColor: '#606060',
  valueBgColor: '#1299ec' }];



function logInfo(info) {
  for (var i = 0, len = info.length; i < len; i++) {
    console.log(
    "%c ".concat(info[i].key, " %c ").concat(info[i].value, " "),
    "padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: ".concat(info[i].keyBgColor, ";"), "padding: 1px; border-radius: 0 3px 3px 0; color: #fff; background: ".concat(info[i].valueBgColor, ";"));

  }
}

logInfo(info);var _default =

wxMiniProgram;exports.default = _default;

/***/ }),
/* 24 */
/*!************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/allnode.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var getAll = function getAll() {
  return {
    "nested": {
      "easemob": {
        "nested": {
          "pb": {
            "nested": {
              "MessageBody": {
                "fields": {
                  "type": {
                    "type": "Type",
                    "id": 1 },

                  "from": {
                    "type": "JID",
                    "id": 2 },

                  "to": {
                    "type": "JID",
                    "id": 3 },

                  "contents": {
                    "rule": "repeated",
                    "type": "Content",
                    "id": 4 },

                  "ext": {
                    "rule": "repeated",
                    "type": "KeyValue",
                    "id": 5 },

                  "ackMessageId": {
                    "type": "uint64",
                    "id": 6 },

                  "msgConfig": {
                    "type": "MessageConfig",
                    "id": 7 },

                  "ackContent": {
                    "type": "string",
                    "id": 8 } },


                "nested": {
                  "Content": {
                    "fields": {
                      "type": {
                        "type": "Type",
                        "id": 1 },

                      "text": {
                        "type": "string",
                        "id": 2 },

                      "latitude": {
                        "type": "double",
                        "id": 3 },

                      "longitude": {
                        "type": "double",
                        "id": 4 },

                      "address": {
                        "type": "string",
                        "id": 5 },

                      "displayName": {
                        "type": "string",
                        "id": 6 },

                      "remotePath": {
                        "type": "string",
                        "id": 7 },

                      "secretKey": {
                        "type": "string",
                        "id": 8 },

                      "fileLength": {
                        "type": "int32",
                        "id": 9 },

                      "action": {
                        "type": "string",
                        "id": 10 },

                      "params": {
                        "rule": "repeated",
                        "type": "KeyValue",
                        "id": 11 },

                      "duration": {
                        "type": "int32",
                        "id": 12 },

                      "size": {
                        "type": "Size",
                        "id": 13 },

                      "thumbnailRemotePath": {
                        "type": "string",
                        "id": 14 },

                      "thumbnailSecretKey": {
                        "type": "string",
                        "id": 15 },

                      "thumbnailDisplayName": {
                        "type": "string",
                        "id": 16 },

                      "thumbnailFileLength": {
                        "type": "int32",
                        "id": 17 },

                      "thumbnailSize": {
                        "type": "Size",
                        "id": 18 },

                      "customEvent": {
                        "type": "string",
                        "id": 19 },

                      "customExts": {
                        "rule": "repeated",
                        "type": "KeyValue",
                        "id": 20 } },


                    "nested": {
                      "Type": {
                        "values": {
                          "TEXT": 0,
                          "IMAGE": 1,
                          "VIDEO": 2,
                          "LOCATION": 3,
                          "VOICE": 4,
                          "FILE": 5,
                          "COMMAND": 6,
                          "CUSTOM": 7 } },


                      "Size": {
                        "fields": {
                          "width": {
                            "type": "double",
                            "id": 1 },

                          "height": {
                            "type": "double",
                            "id": 2 } } } } },





                  "Type": {
                    "values": {
                      "NORMAL": 0,
                      "CHAT": 1,
                      "GROUPCHAT": 2,
                      "CHATROOM": 3,
                      "READ_ACK": 4,
                      "DELIVER_ACK": 5,
                      "RECALL": 6 } },


                  "MessageConfig": {
                    "fields": {
                      "allowGroupAck": {
                        "type": "bool",
                        "id": 1 } } } } },





              "KeyValue": {
                "oneofs": {
                  "value": {
                    "oneof": [
                    "varintValue",
                    "floatValue",
                    "doubleValue",
                    "stringValue"] } },



                "fields": {
                  "key": {
                    "type": "string",
                    "id": 1 },

                  "type": {
                    "type": "ValueType",
                    "id": 2 },

                  "varintValue": {
                    "type": "int64",
                    "id": 3 },

                  "floatValue": {
                    "type": "float",
                    "id": 4 },

                  "doubleValue": {
                    "type": "double",
                    "id": 5 },

                  "stringValue": {
                    "type": "string",
                    "id": 6 } },


                "nested": {
                  "ValueType": {
                    "values": {
                      "BOOL": 1,
                      "INT": 2,
                      "UINT": 3,
                      "LLINT": 4,
                      "FLOAT": 5,
                      "DOUBLE": 6,
                      "STRING": 7,
                      "JSON_STRING": 8 } } } },




              "JID": {
                "fields": {
                  "appKey": {
                    "type": "string",
                    "id": 1 },

                  "name": {
                    "type": "string",
                    "id": 2 },

                  "domain": {
                    "type": "string",
                    "id": 3 },

                  "clientResource": {
                    "type": "string",
                    "id": 4 } } },



              "ConferenceBody": {
                "fields": {
                  "sessionId": {
                    "type": "string",
                    "id": 1 },

                  "operation": {
                    "type": "Operation",
                    "id": 2 },

                  "conferenceId": {
                    "type": "string",
                    "id": 3 },

                  "type": {
                    "type": "Type",
                    "id": 4 },

                  "content": {
                    "type": "string",
                    "id": 5 },

                  "network": {
                    "type": "string",
                    "id": 6 },

                  "version": {
                    "type": "string",
                    "id": 7 },

                  "identity": {
                    "type": "Identity",
                    "id": 8 },

                  "duration": {
                    "type": "string",
                    "id": 9 },

                  "peerName": {
                    "type": "string",
                    "id": 10 },

                  "endReason": {
                    "type": "EndReason",
                    "id": 11 },

                  "status": {
                    "type": "Status",
                    "id": 12 },

                  "isDirect": {
                    "type": "bool",
                    "id": 13 },

                  "controlType": {
                    "type": "StreamControlType",
                    "id": 14 },

                  "routeFlag": {
                    "type": "int32",
                    "id": 15 },

                  "routeKey": {
                    "type": "string",
                    "id": 16 } },


                "nested": {
                  "Status": {
                    "fields": {
                      "errorCode": {
                        "type": "int32",
                        "id": 1 } } },



                  "Operation": {
                    "values": {
                      "JOIN": 0,
                      "INITIATE": 1,
                      "ACCEPT_INITIATE": 2,
                      "ANSWER": 3,
                      "TERMINATE": 4,
                      "REMOVE": 5,
                      "STREAM_CONTROL": 6,
                      "MEDIA_REQUEST": 7 } },


                  "Type": {
                    "values": {
                      "VOICE": 0,
                      "VIDEO": 1 } },


                  "Identity": {
                    "values": {
                      "CALLER": 0,
                      "CALLEE": 1 } },


                  "EndReason": {
                    "values": {
                      "HANGUP": 0,
                      "NORESPONSE": 1,
                      "REJECT": 2,
                      "BUSY": 3,
                      "FAIL": 4,
                      "UNSUPPORTED": 5,
                      "OFFLINE": 6 } },


                  "StreamControlType": {
                    "values": {
                      "PAUSE_VOICE": 0,
                      "RESUME_VOICE": 1,
                      "PAUSE_VIDEO": 2,
                      "RESUME_VIDEO": 3 } } } },




              "MSync": {
                "fields": {
                  "version": {
                    "type": "Version",
                    "id": 1,
                    "options": {
                      "default": "MSYNC_V1" } },


                  "guid": {
                    "type": "JID",
                    "id": 2 },

                  "auth": {
                    "type": "string",
                    "id": 3 },

                  "compressAlgorimth": {
                    "type": "uint32",
                    "id": 4 },

                  "crypto": {
                    "type": "uint32",
                    "id": 5 },

                  "userAgent": {
                    "type": "string",
                    "id": 6 },

                  "pov": {
                    "type": "uint64",
                    "id": 7 },

                  "command": {
                    "type": "Command",
                    "id": 8 },

                  "deviceId": {
                    "type": "uint32",
                    "id": 10 },

                  "encryptType": {
                    "rule": "repeated",
                    "type": "EncryptType",
                    "id": 11,
                    "options": {
                      "packed": false } },


                  "encryptKey": {
                    "type": "string",
                    "id": 12 },

                  "payload": {
                    "type": "bytes",
                    "id": 9 } },


                "nested": {
                  "Version": {
                    "values": {
                      "MSYNC_V1": 0,
                      "MSYNC_V2": 1 } },


                  "Command": {
                    "values": {
                      "SYNC": 0,
                      "UNREAD": 1,
                      "NOTICE": 2,
                      "PROVISION": 3 } } } },




              "EncryptType": {
                "values": {
                  "ENCRYPT_NONE": 0,
                  "ENCRYPT_AES_128_CBC": 1,
                  "ENCRYPT_AES_256_CBC": 2 } },


              "CommSyncUL": {
                "fields": {
                  "meta": {
                    "type": "Meta",
                    "id": 1 },

                  "key": {
                    "type": "uint64",
                    "id": 2 },

                  "queue": {
                    "type": "JID",
                    "id": 3 },

                  "isRoam": {
                    "type": "bool",
                    "id": 4 },

                  "lastFullRoamKey": {
                    "type": "uint64",
                    "id": 5 } } },



              "CommSyncDL": {
                "fields": {
                  "status": {
                    "type": "Status",
                    "id": 1 },

                  "metaId": {
                    "type": "uint64",
                    "id": 2 },

                  "serverId": {
                    "type": "uint64",
                    "id": 3 },

                  "metas": {
                    "rule": "repeated",
                    "type": "Meta",
                    "id": 4 },

                  "nextKey": {
                    "type": "uint64",
                    "id": 5 },

                  "queue": {
                    "type": "JID",
                    "id": 6 },

                  "isLast": {
                    "type": "bool",
                    "id": 7 },

                  "timestamp": {
                    "type": "uint64",
                    "id": 8 },

                  "isRoam": {
                    "type": "bool",
                    "id": 9 } } },



              "CommNotice": {
                "fields": {
                  "queue": {
                    "type": "JID",
                    "id": 1 } } },



              "CommUnreadUL": {
                "fields": {} },

              "CommUnreadDL": {
                "fields": {
                  "status": {
                    "type": "Status",
                    "id": 1 },

                  "unread": {
                    "rule": "repeated",
                    "type": "MetaQueue",
                    "id": 2 },

                  "timestamp": {
                    "type": "uint64",
                    "id": 3 } } },



              "MetaQueue": {
                "fields": {
                  "queue": {
                    "type": "JID",
                    "id": 1 },

                  "n": {
                    "type": "uint32",
                    "id": 2 } } },



              "Meta": {
                "fields": {
                  "id": {
                    "type": "uint64",
                    "id": 1 },

                  "from": {
                    "type": "JID",
                    "id": 2 },

                  "to": {
                    "type": "JID",
                    "id": 3 },

                  "timestamp": {
                    "type": "uint64",
                    "id": 4 },

                  "ns": {
                    "type": "NameSpace",
                    "id": 5 },

                  "payload": {
                    "type": "bytes",
                    "id": 6 },

                  "routetype": {
                    "type": "RouteType",
                    "id": 7 } },


                "nested": {
                  "NameSpace": {
                    "values": {
                      "STATISTIC": 0,
                      "CHAT": 1,
                      "MUC": 2,
                      "ROSTER": 3,
                      "CONFERENCE": 4 } },


                  "RouteType": {
                    "values": {
                      "ROUTE_ALL": 0,
                      "ROUTE_ONLINE": 1 } } } },




              "Status": {
                "fields": {
                  "errorCode": {
                    "type": "ErrorCode",
                    "id": 1 },

                  "reason": {
                    "type": "string",
                    "id": 2 },

                  "redirectInfo": {
                    "rule": "repeated",
                    "type": "RedirectInfo",
                    "id": 3 } },


                "nested": {
                  "ErrorCode": {
                    "values": {
                      "OK": 0,
                      "FAIL": 1,
                      "UNAUTHORIZED": 2,
                      "MISSING_PARAMETER": 3,
                      "WRONG_PARAMETER": 4,
                      "REDIRECT": 5,
                      "TOKEN_EXPIRED": 6,
                      "PERMISSION_DENIED": 7,
                      "NO_ROUTE": 8,
                      "UNKNOWN_COMMAND": 9,
                      "PB_PARSER_ERROR": 10,
                      "BIND_ANOTHER_DEVICE": 11,
                      "IM_FORBIDDEN": 12,
                      "TOO_MANY_DEVICES": 13,
                      "PLATFORM_LIMIT": 14,
                      "USER_MUTED": 15,
                      "ENCRYPT_DISABLE": 16,
                      "ENCRYPT_ENABLE": 17,
                      "DECRYPT_FAILURE": 18 } } } },




              "RedirectInfo": {
                "fields": {
                  "host": {
                    "type": "string",
                    "id": 1 },

                  "port": {
                    "type": "uint32",
                    "id": 2 } } },



              "Provision": {
                "fields": {
                  "osType": {
                    "type": "OsType",
                    "id": 1 },

                  "version": {
                    "type": "string",
                    "id": 2 },

                  "networkType": {
                    "type": "NetworkType",
                    "id": 3 },

                  "appSign": {
                    "type": "string",
                    "id": 4 },

                  "compressType": {
                    "rule": "repeated",
                    "type": "CompressType",
                    "id": 5,
                    "options": {
                      "packed": false } },


                  "encryptType": {
                    "rule": "repeated",
                    "type": "EncryptType",
                    "id": 6,
                    "options": {
                      "packed": false } },


                  "encryptKey": {
                    "type": "string",
                    "id": 7 },

                  "status": {
                    "type": "Status",
                    "id": 8 },

                  "deviceUuid": {
                    "type": "string",
                    "id": 9 },

                  "isManualLogin": {
                    "type": "bool",
                    "id": 10 },

                  "password": {
                    "type": "string",
                    "id": 11 },

                  "deviceName": {
                    "type": "string",
                    "id": 12 },

                  "resource": {
                    "type": "string",
                    "id": 13 },

                  "auth": {
                    "type": "string",
                    "id": 14 } },


                "nested": {
                  "OsType": {
                    "values": {
                      "OS_IOS": 0,
                      "OS_ANDROID": 1,
                      "OS_LINUX": 2,
                      "OS_OSX": 3,
                      "OS_WIN": 4,
                      "OS_OTHER": 16 } },


                  "NetworkType": {
                    "values": {
                      "NETWORK_NONE": 0,
                      "NETWORK_WIFI": 1,
                      "NETWORK_4G": 2,
                      "NETWORK_3G": 3,
                      "NETWORK_2G": 4,
                      "NETWORK_WIRE": 5 } },


                  "CompressType": {
                    "values": {
                      "COMPRESS_NONE": 0,
                      "COMPRESS_ZLIB": 1 } } } },




              "MUCBody": {
                "fields": {
                  "mucId": {
                    "type": "JID",
                    "id": 1 },

                  "operation": {
                    "type": "Operation",
                    "id": 2 },

                  "from": {
                    "type": "JID",
                    "id": 3 },

                  "to": {
                    "rule": "repeated",
                    "type": "JID",
                    "id": 4 },

                  "setting": {
                    "type": "Setting",
                    "id": 5 },

                  "reason": {
                    "type": "string",
                    "id": 6 },

                  "isChatroom": {
                    "type": "bool",
                    "id": 7 },

                  "status": {
                    "type": "Status",
                    "id": 8 } },


                "nested": {
                  "Operation": {
                    "values": {
                      "CREATE": 0,
                      "DESTROY": 1,
                      "JOIN": 2,
                      "LEAVE": 3,
                      "APPLY": 4,
                      "APPLY_ACCEPT": 5,
                      "APPLY_DECLINE": 6,
                      "INVITE": 7,
                      "INVITE_ACCEPT": 8,
                      "INVITE_DECLINE": 9,
                      "KICK": 10,
                      "GET_BLACKLIST": 11,
                      "BAN": 12,
                      "ALLOW": 13,
                      "UPDATE": 14,
                      "BLOCK": 15,
                      "UNBLOCK": 16,
                      "PRESENCE": 17,
                      "ABSENCE": 18,
                      "DIRECT_JOINED": 19,
                      "ASSIGN_OWNER": 20,
                      "ADD_ADMIN": 21,
                      "REMOVE_ADMIN": 22,
                      "ADD_MUTE": 23,
                      "REMOVE_MUTE": 24,
                      "UPDATE_ANNOUNCEMENT": 25,
                      "DELETE_ANNOUNCEMENT": 26,
                      "UPLOAD_FILE": 27,
                      "DELETE_FILE": 28,
                      "ADD_USER_WHITE_LIST": 29,
                      "REMOVE_USER_WHITE_LIST": 30,
                      "BAN_GROUP": 31,
                      "REMOVE_BAN_GROUP": 32 } },


                  "Setting": {
                    "fields": {
                      "name": {
                        "type": "string",
                        "id": 1 },

                      "desc": {
                        "type": "string",
                        "id": 2 },

                      "type": {
                        "type": "Type",
                        "id": 3 },

                      "maxUsers": {
                        "type": "int32",
                        "id": 4 },

                      "owner": {
                        "type": "string",
                        "id": 5 } },


                    "nested": {
                      "Type": {
                        "values": {
                          "PRIVATE_OWNER_INVITE": 0,
                          "PRIVATE_MEMBER_INVITE": 1,
                          "PUBLIC_JOIN_APPROVAL": 2,
                          "PUBLIC_JOIN_OPEN": 3,
                          "PUBLIC_ANONYMOUS": 4 } } } },




                  "Status": {
                    "fields": {
                      "errorCode": {
                        "type": "ErrorCode",
                        "id": 1 },

                      "description": {
                        "type": "string",
                        "id": 2 } },


                    "nested": {
                      "ErrorCode": {
                        "values": {
                          "OK": 0,
                          "PERMISSION_DENIED": 1,
                          "WRONG_PARAMETER": 2,
                          "MUC_NOT_EXIST": 3,
                          "USER_NOT_EXIST": 4,
                          "UNKNOWN": 5 } } } } } },






              "RosterBody": {
                "fields": {
                  "operation": {
                    "type": "Operation",
                    "id": 1 },

                  "status": {
                    "type": "Status",
                    "id": 2 },

                  "from": {
                    "type": "JID",
                    "id": 3 },

                  "to": {
                    "rule": "repeated",
                    "type": "JID",
                    "id": 4 },

                  "reason": {
                    "type": "string",
                    "id": 5 },

                  "rosterVer": {
                    "type": "string",
                    "id": 6 },

                  "biDirection": {
                    "type": "bool",
                    "id": 7 } },


                "nested": {
                  "Operation": {
                    "values": {
                      "GET_ROSTER": 0,
                      "GET_BLACKLIST": 1,
                      "ADD": 2,
                      "REMOVE": 3,
                      "ACCEPT": 4,
                      "DECLINE": 5,
                      "BAN": 6,
                      "ALLOW": 7,
                      "REMOTE_ACCEPT": 8,
                      "REMOTE_DECLINE": 9 } },


                  "Status": {
                    "fields": {
                      "errorCode": {
                        "type": "ErrorCode",
                        "id": 1 },

                      "description": {
                        "type": "string",
                        "id": 2 } },


                    "nested": {
                      "ErrorCode": {
                        "values": {
                          "OK": 0,
                          "USER_NOT_EXIST": 1,
                          "USER_ALREADY_FRIEND": 2,
                          "USER_ALREADY_BLACKLIST": 3 } } } } } },






              "StatisticsBody": {
                "fields": {
                  "operation": {
                    "type": "Operation",
                    "id": 1 },

                  "os": {
                    "type": "OsType",
                    "id": 2 },

                  "version": {
                    "type": "string",
                    "id": 3 },

                  "network": {
                    "type": "NetworkType",
                    "id": 4 },

                  "imTime": {
                    "type": "uint32",
                    "id": 5 },

                  "chatTime": {
                    "type": "uint32",
                    "id": 6 },

                  "location": {
                    "type": "string",
                    "id": 7 } },


                "nested": {
                  "Operation": {
                    "values": {
                      "INFORMATION": 0,
                      "USER_REMOVED": 1,
                      "USER_LOGIN_ANOTHER_DEVICE": 2,
                      "USER_KICKED_BY_CHANGE_PASSWORD": 3,
                      "USER_KICKED_BY_OTHER_DEVICE": 4 } },


                  "OsType": {
                    "values": {
                      "OS_IOS": 0,
                      "OS_ANDROID": 1,
                      "OS_LINUX": 2,
                      "OS_OSX": 3,
                      "OS_WIN": 4,
                      "OS_OTHER": 16 } },


                  "NetworkType": {
                    "values": {
                      "NETWORK_NONE": 0,
                      "NETWORK_WIFI": 1,
                      "NETWORK_4G": 2,
                      "NETWORK_3G": 3,
                      "NETWORK_2G": 4,
                      "NETWORK_WIRE": 5 } } } } } } } } } };










};var _default =

getAll;exports.default = _default;

/***/ }),
/* 25 */
/*!***********************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/protobuf.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by zhangmiao on 2018/3/13.
 */



(function (protobufFactory) {
  //if (typeof define === 'function')//这里会不会定义重复呢?怎么去掉呢
  //    define('protobuf', protobufFactory);
  //else
  module.exports = protobufFactory();
})(function () {
  var protobuf = {};
  //app.globalData.protobuf = protobuf;

  /**
   * Build type, one of `"full"`, `"light"` or `"minimal"`.
   * @name build
   * @type {string}
   * @const
   */
  protobuf.build = "minimal";

  // Serialization
  protobuf.Writer = __webpack_require__(/*! ./src/writer */ 26);
  protobuf.encoder = __webpack_require__(/*! ./src/encoder */ 56);
  protobuf.Reader = __webpack_require__(/*! ./src/reader */ 54);

  // Utility
  protobuf.util = __webpack_require__(/*! ./src/util */ 27);
  protobuf.rpc = __webpack_require__(/*! ./src/rpc/service */ 51);
  protobuf.roots = __webpack_require__(/*! ./src/roots */ 28);
  protobuf.verifier = __webpack_require__(/*! ./src/verifier */ 55);

  protobuf.tokenize = __webpack_require__(/*! ./src/tokenize */ 47);
  protobuf.parse = __webpack_require__(/*! ./src/parse */ 46);
  protobuf.common = __webpack_require__(/*! ./src/common */ 52);

  protobuf.ReflectionObject = __webpack_require__(/*! ./src/object */ 40);
  protobuf.Namespace = __webpack_require__(/*! ./src/namespace */ 39);
  protobuf.Root = __webpack_require__(/*! ./src/root */ 41);
  protobuf.Enum = __webpack_require__(/*! ./src/enum */ 43);
  protobuf.Type = __webpack_require__(/*! ./src/type */ 38);
  protobuf.Field = __webpack_require__(/*! ./src/field */ 42);
  protobuf.OneOf = __webpack_require__(/*! ./src/oneof */ 45);
  protobuf.MapField = __webpack_require__(/*! ./src/mapField */ 48);
  protobuf.Service = __webpack_require__(/*! ./src/service */ 49);
  protobuf.Method = __webpack_require__(/*! ./src/method */ 50);
  protobuf.converter = __webpack_require__(/*! ./src/converter */ 59);
  protobuf.decoder = __webpack_require__(/*! ./src/decoder */ 57);

  // Runtime
  protobuf.Message = __webpack_require__(/*! ./src/message */ 53);
  protobuf.wrappers = __webpack_require__(/*! ./src/wrappers */ 58);

  // Utility
  protobuf.types = __webpack_require__(/*! ./src/types */ 44);
  protobuf.util = __webpack_require__(/*! ./src/util */ 27);

  protobuf.configure = configure;


  function load(filename, root, callback) {
    if (typeof root === "function") {
      callback = root;
      root = new protobuf.Root();
    } else if (!root)
    root = new protobuf.Root();
    return root.load(filename, callback);
  }

  protobuf.load = load;

  function loadSync(filename, root) {
    if (!root)
    root = new protobuf.Root();
    return root.loadSync(filename);
  }

  protobuf.loadSync = loadSync;


  //新增weichat支持的解析pbConfig接口
  function parseFromPbString(pbString, root, callback) {
    if (typeof root === "function") {
      callback = root;
      root = new protobuf.Root();
    } else if (!root)
    root = new protobuf.Root();
    return root.parseFromPbString(pbString, callback);
  }

  protobuf.parseFromPbString = parseFromPbString;

  /**
                                                   * Reconfigures the library according to the environment.
                                                   * @returns {undefined}
                                                   */
  function configure() {

    protobuf.converter._configure();
    protobuf.decoder._configure();
    protobuf.encoder._configure();
    protobuf.Field._configure();
    protobuf.MapField._configure();
    protobuf.Message._configure();
    protobuf.Namespace._configure();
    protobuf.Method._configure();
    protobuf.ReflectionObject._configure();
    protobuf.OneOf._configure();
    protobuf.parse._configure();
    protobuf.Reader._configure();
    protobuf.Root._configure();
    protobuf.Service._configure();
    protobuf.verifier._configure();
    protobuf.Type._configure();
    protobuf.types._configure();
    protobuf.wrappers._configure();
    protobuf.Writer._configure();
  }
  configure();

  if (arguments && arguments.length) {
    for (var i = 0; i < arguments.length; i++) {
      var argument = arguments[i];
      if (argument.hasOwnProperty("exports")) {
        argument.exports = protobuf;
        return;
      }
    }
  }
  return protobuf;
});

/***/ }),
/* 26 */
/*!*************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/writer.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = Writer;


var util = __webpack_require__(/*! ./util */ 27);
var LongBits;

var BufferWriter; // cyclic

var base64;
var utf8 = __webpack_require__(/*! ./utf8 */ 37);

/**
                               * Constructs a new writer operation instance.
                               * @classdesc Scheduled writer operation.
                               * @constructor
                               * @param {function(*, Uint8Array, number)} fn Function to call
                               * @param {number} len Value byte length
                               * @param {*} val Value to write
                               * @ignore
                               */
function Op(fn, len, val) {

  /**
                            * Function to call.
                            * @type {function(Uint8Array, number, *)}
                            */
  this.fn = fn;

  /**
                 * Value byte length.
                 * @type {number}
                 */
  this.len = len;

  /**
                   * Next operation.
                   * @type {Writer.Op|undefined}
                   */
  this.next = undefined;

  /**
                          * Value to write.
                          * @type {*}
                          */
  this.val = val; // type varies
}

/* istanbul ignore next */
function noop() {} // eslint-disable-line no-empty-function

/**
 * Constructs a new writer state instance.
 * @classdesc Copied writer state.
 * @memberof Writer
 * @constructor
 * @param {Writer} writer Writer to copy state from
 * @ignore
 */
function State(writer) {

  /**
                         * Current head.
                         * @type {Writer.Op}
                         */
  this.head = writer.head;

  /**
                            * Current tail.
                            * @type {Writer.Op}
                            */
  this.tail = writer.tail;

  /**
                            * Current buffer length.
                            * @type {number}
                            */
  this.len = writer.len;

  /**
                          * Next state.
                          * @type {State|null}
                          */
  this.next = writer.states;
}

/**
   * Constructs a new writer instance.
   * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
   * @constructor
   */
function Writer() {

  /**
                    * Current length.
                    * @type {number}
                    */
  this.len = 0;

  /**
                 * Operations head.
                 * @type {Object}
                 */
  this.head = new Op(noop, 0, 0);

  /**
                                   * Operations tail
                                   * @type {Object}
                                   */
  this.tail = this.head;

  /**
                          * Linked forked states.
                          * @type {Object|null}
                          */
  this.states = null;

  // When a value is written, the writer calculates its byte length and puts it into a linked
  // list of operations to perform when finish() is called. This both allows us to allocate
  // buffers of the exact required size and reduces the amount of work we have to do compared
  // to first calculating over objects and then encoding over objects. In our case, the encoding
  // part is just a linked list walk calling operations with already prepared values.
}

/**
   * Creates a new writer.
   * @function
   * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
   */
Writer.create = util.Buffer ?
function create_buffer_setup() {
  return (Writer.create = function create_buffer() {
    return new BufferWriter();
  })();
}
/* istanbul ignore next */ :
function create_array() {
  return new Writer();
};

/**
    * Allocates a buffer of the specified size.
    * @param {number} size Buffer size
    * @returns {Uint8Array} Buffer
    */
Writer.alloc = function alloc(size) {
  return new util.Array(size);
};

// Use Uint8Array buffer pool in the browser, just like node does with buffers
/* istanbul ignore else */
if (util.Array !== Array)
Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);

/**
                                                                        * Pushes a new operation to the queue.
                                                                        * @param {function(Uint8Array, number, *)} fn Function to call
                                                                        * @param {number} len Value byte length
                                                                        * @param {number} val Value to write
                                                                        * @returns {Writer} `this`
                                                                        * @private
                                                                        */
Writer.prototype._push = function push(fn, len, val) {
  this.tail = this.tail.next = new Op(fn, len, val);
  this.len += len;
  return this;
};

function writeByte(val, buf, pos) {
  buf[pos] = val & 255;
}

function writeVarint32(val, buf, pos) {
  while (val > 127) {
    buf[pos++] = val & 127 | 128;
    val >>>= 7;
  }
  buf[pos] = val;
}

/**
   * Constructs a new varint writer operation instance.
   * @classdesc Scheduled varint writer operation.
   * @extends Op
   * @constructor
   * @param {number} len Value byte length
   * @param {number} val Value to write
   * @ignore
   */
function VarintOp(len, val) {
  this.len = len;
  this.next = undefined;
  this.val = val;
}

VarintOp.prototype = Object.create(Op.prototype);
VarintOp.prototype.fn = writeVarint32;

/**
                                        * Writes an unsigned 32 bit value as a varint.
                                        * @param {number} value Value to write
                                        * @returns {Writer} `this`
                                        */
Writer.prototype.uint32 = function write_uint32(value) {
  // here, the call to this.push has been inlined and a varint specific Op subclass is used.
  // uint32 is by far the most frequently used operation and benefits significantly from this.
  this.len += (this.tail = this.tail.next = new VarintOp(
  (value = value >>> 0) < //将有符号的数变为无符号的数
  128 ? 1 //2的7次方
  : value < 16384 ? 2 //2的14次方
  : value < 2097152 ? 3 //2的21次方
  : value < 268435456 ? 4 //2的28次方
  : 5, //2的35次方 最多32次方,所以最多是5
  value)).len;
  return this;
};

/**
    * Writes a signed 32 bit value as a varint.
    * @function
    * @param {number} value Value to write
    * @returns {Writer} `this`
    */
Writer.prototype.int32 = function write_int32(value) {
  return value < 0 ?
  this._push(writeVarint64, 10, LongBits.fromNumber(value)) // 10 bytes per spec
  : this.uint32(value);
};

/**
    * Writes a 32 bit value as a varint, zig-zag encoded.
    * @param {number} value Value to write
    * @returns {Writer} `this`
    */
Writer.prototype.sint32 = function write_sint32(value) {
  return this.uint32((value << 1 ^ value >> 31) >>> 0);
};

function writeVarint64(val, buf, pos) {
  while (val.hi) {
    buf[pos++] = val.lo & 127 | 128;
    val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
    val.hi >>>= 7;
  }
  while (val.lo > 127) {
    buf[pos++] = val.lo & 127 | 128;
    val.lo = val.lo >>> 7;
  }
  buf[pos++] = val.lo;
}

/**
   * Writes an unsigned 64 bit value as a varint.
   * @param {Long|number|string} value Value to write
   * @returns {Writer} `this`
   * @throws {TypeError} If `value` is a string and no long library is present.
   */
Writer.prototype.uint64 = function write_uint64(value) {
  var bits = LongBits.from(value);
  return this._push(writeVarint64, bits.length(), bits);
};

/**
    * Writes a signed 64 bit value as a varint.
    * @function
    * @param {Long|number|string} value Value to write
    * @returns {Writer} `this`
    * @throws {TypeError} If `value` is a string and no long library is present.
    */
Writer.prototype.int64 = Writer.prototype.uint64;

/**
                                                   * Writes a signed 64 bit value as a varint, zig-zag encoded.
                                                   * @param {Long|number|string} value Value to write
                                                   * @returns {Writer} `this`
                                                   * @throws {TypeError} If `value` is a string and no long library is present.
                                                   */
Writer.prototype.sint64 = function write_sint64(value) {
  var bits = LongBits.from(value).zzEncode();
  return this._push(writeVarint64, bits.length(), bits);
};

/**
    * Writes a boolish value as a varint.
    * @param {boolean} value Value to write
    * @returns {Writer} `this`
    */
Writer.prototype.bool = function write_bool(value) {
  return this._push(writeByte, 1, value ? 1 : 0);
};

function writeFixed32(val, buf, pos) {
  buf[pos] = val & 255;
  buf[pos + 1] = val >>> 8 & 255;
  buf[pos + 2] = val >>> 16 & 255;
  buf[pos + 3] = val >>> 24;
}

/**
   * Writes an unsigned 32 bit value as fixed 32 bits.
   * @param {number} value Value to write
   * @returns {Writer} `this`
   */
Writer.prototype.fixed32 = function write_fixed32(value) {
  return this._push(writeFixed32, 4, value >>> 0);
};

/**
    * Writes a signed 32 bit value as fixed 32 bits.
    * @function
    * @param {number} value Value to write
    * @returns {Writer} `this`
    */
Writer.prototype.sfixed32 = Writer.prototype.fixed32;

/**
                                                       * Writes an unsigned 64 bit value as fixed 64 bits.
                                                       * @param {Long|number|string} value Value to write
                                                       * @returns {Writer} `this`
                                                       * @throws {TypeError} If `value` is a string and no long library is present.
                                                       */
Writer.prototype.fixed64 = function write_fixed64(value) {
  var bits = LongBits.from(value);
  return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
};

/**
    * Writes a signed 64 bit value as fixed 64 bits.
    * @function
    * @param {Long|number|string} value Value to write
    * @returns {Writer} `this`
    * @throws {TypeError} If `value` is a string and no long library is present.
    */
Writer.prototype.sfixed64 = Writer.prototype.fixed64;

/**
                                                       * Writes a float (32 bit).
                                                       * @function
                                                       * @param {number} value Value to write
                                                       * @returns {Writer} `this`
                                                       */
Writer.prototype.float = function write_float(value) {
  return this._push(util.float.writeFloatLE, 4, value);
};

/**
    * Writes a double (64 bit float).
    * @function
    * @param {number} value Value to write
    * @returns {Writer} `this`
    */
Writer.prototype.double = function write_double(value) {
  return this._push(util.float.writeDoubleLE, 8, value);
};

var writeBytes = util.Array.prototype.set ?
function writeBytes_set(val, buf, pos) {
  buf.set(val, pos); // also works for plain array values
}
/* istanbul ignore next */ :
function writeBytes_for(val, buf, pos) {
  for (var i = 0; i < val.length; ++i) {
    buf[pos + i] = val[i];}
};

/**
    * Writes a sequence of bytes.
    * @param {Uint8Array|string} value Buffer or string to write
    * @returns {Writer} `this`
    */
Writer.prototype.bytes = function write_bytes(value) {
  var len = value.length >>> 0;
  if (!len)
  return this._push(writeByte, 1, 0);

  if (util.isString(value)) {
    //len = (value = util.stringToBytes(value)).length;
    //var buf = Writer.alloc(len = base64.length(value));
    //base64.decode(value, buf, 0);
    //value = buf;
    var buf = Writer.alloc(len = utf8.length(value));
    utf8.write(value, buf, 0);
    value = buf;
  }
  return this.uint32(len)._push(writeBytes, len, value);
};

/**
    * Writes a string.
    * @param {string} value Value to write
    * @returns {Writer} `this`
    */
Writer.prototype.string = function write_string(value) {
  var len = utf8.length(value);
  return len ?
  this.uint32(len)._push(utf8.write, len, value) :
  this._push(writeByte, 1, 0);
};

/**
    * Forks this writer's state by pushing it to a stack.
    * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
    * @returns {Writer} `this`
    */
Writer.prototype.fork = function fork() {
  this.states = new State(this);
  this.head = this.tail = new Op(noop, 0, 0);
  this.len = 0;
  return this;
};

/**
    * Resets this instance to the last state.
    * @returns {Writer} `this`
    */
Writer.prototype.reset = function reset() {
  if (this.states) {
    this.head = this.states.head;
    this.tail = this.states.tail;
    this.len = this.states.len;
    this.states = this.states.next;
  } else {
    this.head = this.tail = new Op(noop, 0, 0);
    this.len = 0;
  }
  return this;
};

/**
    * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
    * @returns {Writer} `this`
    */
Writer.prototype.ldelim = function ldelim() {
  var head = this.head,
  tail = this.tail,
  len = this.len;
  this.reset().uint32(len);
  if (len) {
    this.tail.next = head.next; // skip noop
    this.tail = tail;
    this.len += len;
  }
  return this;
};

/**
    * Finishes the write operation.
    * @returns {Uint8Array} Finished buffer
    */
Writer.prototype.finish = function finish() {
  var head = this.head.next, // skip noop
  buf = this.constructor.alloc(this.len),
  pos = 0;
  while (head) {
    head.fn(head.val, buf, pos);
    pos += head.len;
    head = head.next;
  }
  // this.head = this.tail = null;
  return buf;
};

Writer._configure = function () {

  //util      = require("./util");
  LongBits = __webpack_require__(/*! ./longBits */ 29);
  base64 = __webpack_require__(/*! ./base64 */ 36);
  utf8 = __webpack_require__(/*! ./utf8 */ 37);
};

/***/ }),
/* 27 */
/*!***********************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/util.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by zhangmiao on 2018/3/12.
 */
var util = module.exports;

var roots = __webpack_require__(/*! ./roots */ 28);
util.LongBits = __webpack_require__(/*! ./longBits */ 29);
util.Long = __webpack_require__(/*! ./long */ 30);
util.pool = __webpack_require__(/*! ./pool */ 31);
util.float = __webpack_require__(/*! ./float */ 32);
util.asPromise = __webpack_require__(/*! ./asPromise */ 33);
util.EventEmitter = __webpack_require__(/*! ./EventEmitter */ 34);
util.path = __webpack_require__(/*! ./path */ 35);
util.base64 = __webpack_require__(/*! ./base64 */ 36);
util.utf8 = __webpack_require__(/*! ./utf8 */ 37);

util.compareFieldsById = function compareFieldsById(a, b) {
  return a.id - b.id;
};

util.toArray = function toArray(object) {
  if (object) {
    var keys = Object.keys(object),
    array = new Array(keys.length),
    index = 0;
    while (index < keys.length) {
      array[index] = object[keys[index++]];}
    return array;
  }
  return [];
};

util.toObject = function toObject(array) {
  var object = {},
  index = 0;
  while (index < array.length) {
    var key = array[index++],
    val = array[index++];
    if (val !== undefined)
    object[key] = val;
  }
  return object;
};

util.isString = function isString(value) {
  return typeof value === "string" || value instanceof String;
};

var safePropBackslashRe = /\\/g,
safePropQuoteRe = /"/g;

/**
                         * Tests whether the specified name is a reserved word in JS.
                         * @param {string} name Name to test
                         * @returns {boolean} `true` if reserved, otherwise `false`
                         */
util.isReserved = function isReserved(name) {
  return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(name);
};

util.isObject = function isObject(value) {
  return value && typeof value === "object";
};

util.Array = typeof Uint8Array !== "undefined" ? Uint8Array /* istanbul ignore next */ : Array;

util.oneOfGetter = function getOneOf(fieldNames) {
  var fieldMap = {};
  for (var i = 0; i < fieldNames.length; ++i) {
    fieldMap[fieldNames[i]] = 1;}

  /**
                                   * @returns {string|undefined} Set field name, if any
                                   * @this Object
                                   * @ignore
                                   */
  return function () {// eslint-disable-line consistent-return
    for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i) {
      if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null)
      return keys[i];}
  };
};

util.oneOfSetter = function setOneOf(fieldNames) {

  /**
                                                   * @param {string} name Field name
                                                   * @returns {undefined}
                                                   * @this Object
                                                   * @ignore
                                                   */
  return function (name) {
    for (var i = 0; i < fieldNames.length; ++i) {
      if (fieldNames[i] !== name)
      delete this[/*"_"+*/fieldNames[i]];} //设置为私有属性
  };
};


util.merge = function merge(dst, src, ifNotSet) {// used by converters
  for (var keys = Object.keys(src), i = 0; i < keys.length; ++i) {
    if (dst[keys[i]] === undefined || !ifNotSet)
    dst[keys[i]] = src[keys[i]];}
  return dst;
};

util.decorateType = function decorateType(ctor, typeName) {

  /* istanbul ignore if */
  if (ctor.$type) {
    if (typeName && ctor.$type.name !== typeName) {
      util.decorateRoot.remove(ctor.$type);
      ctor.$type.name = typeName;
      util.decorateRoot.add(ctor.$type);
    }
    return ctor.$type;
  }

  /* istanbul ignore next */
  if (!Type)
  Type = __webpack_require__(/*! ./type */ 38);

  var type = new Type(typeName || ctor.name);
  util.decorateRoot.add(type);
  type.ctor = ctor; // sets up .encode, .decode etc.
  Object.defineProperty(ctor, "$type", { value: type, enumerable: false });
  Object.defineProperty(ctor.prototype, "$type", { value: type, enumerable: false });
  return type;
};

util.emptyArray = Object.freeze ? Object.freeze([]) : /* istanbul ignore next */[]; // used on prototypes

util.emptyObject = Object.freeze ? Object.freeze({}) : /* istanbul ignore next */{}; // used on prototypes

util.longToHash = function longToHash(value) {
  return value ?
  util.LongBits.from(value).toHash() :
  util.LongBits.zeroHash;
};

util.copy = function (obj) {
  if (typeof obj != 'object') {
    return obj;
  }
  var newObj = {};
  for (var attr in obj) {
    newObj[attr] = obj[attr];
  }
  return newObj;
};

function deepCopy(obj) {
  if (typeof obj != 'object') {
    return obj;
  }
  var newobj = {};
  for (var attr in obj) {
    newobj[attr] = deepCopy(obj[attr]);
  }
  return newobj;
}

util.deepCopy = deepCopy;

util.ProtocolError = function newError(name) {

  function CustomError(message, properties) {

    if (!(this instanceof CustomError))
    return new CustomError(message, properties);

    // Error.call(this, message);
    // ^ just returns a new error instance because the ctor can be called as a function

    Object.defineProperty(this, "message", { get: function get() {return message;} });

    /* istanbul ignore next */
    if (Error.captureStackTrace) // node
      Error.captureStackTrace(this, CustomError);else

    Object.defineProperty(this, "stack", { value: new Error().stack || "" });

    if (properties)
    merge(this, properties);
  }

  (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;

  Object.defineProperty(CustomError.prototype, "name", { get: function get() {return name;} });

  CustomError.prototype.toString = function toString() {
    return this.name + ": " + this.message;
  };

  return CustomError;
};

util.toJSONOptions = {
  longs: String,
  enums: String,
  bytes: String,
  json: true };


util.Buffer = function () {
  return null;
}();


util.newBuffer = function newBuffer(sizeOrArray) {
  /* istanbul ignore next */
  return typeof sizeOrArray === "number" ?
  new util.Array(sizeOrArray) :
  typeof Uint8Array === "undefined" ?
  sizeOrArray :
  new Uint8Array(sizeOrArray);
};

util.stringToBytes = function stringToBytes(str) {
  var bytes = [];
  var len, c;
  len = str.length;
  for (var i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if (c >= 0x010000 && c <= 0x10FFFF) {
      bytes.push(c >> 18 & 0x07 | 0xF0);
      bytes.push(c >> 12 & 0x3F | 0x80);
      bytes.push(c >> 6 & 0x3F | 0x80);
      bytes.push(c & 0x3F | 0x80);
    } else if (c >= 0x000800 && c <= 0x00FFFF) {
      bytes.push(c >> 12 & 0x0F | 0xE0);
      bytes.push(c >> 6 & 0x3F | 0x80);
      bytes.push(c & 0x3F | 0x80);
    } else if (c >= 0x000080 && c <= 0x0007FF) {
      bytes.push(c >> 6 & 0x1F | 0xC0);
      bytes.push(c & 0x3F | 0x80);
    } else {
      bytes.push(c & 0xFF);
    }
  }
  return bytes;

};

util.byteToString = function byteToString(arr) {
  if (typeof arr === 'string') {
    return arr;
  }
  var str = '',
  _arr = arr;
  for (var i = 0; i < _arr.length; i++) {
    var one = _arr[i].toString(2),
    v = one.match(/^1+?(?=0)/);
    if (v && one.length == 8) {
      var bytesLength = v[0].length;
      var store = _arr[i].toString(2).slice(7 - bytesLength);
      for (var st = 1; st < bytesLength; st++) {
        store += _arr[st + i].toString(2).slice(2);
      }
      str += String.fromCharCode(parseInt(store, 2));
      i += bytesLength - 1;
    } else {
      str += String.fromCharCode(_arr[i]);
    }
  }
  return str;
};


util.isInteger = Number.isInteger || /* istanbul ignore next */function isInteger(value) {
  return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};

Object.defineProperty(util, "decorateRoot", {
  get: function get() {
    return roots["decorated"] || (roots["decorated"] = new (__webpack_require__(/*! ./root */ 41))());
  } });

/***/ }),
/* 28 */
/*!************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/roots.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Created by zhangmiao on 2018/3/13.
 */


module.exports = {};

/***/ }),
/* 29 */
/*!***************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/longBits.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = LongBits;

function LongBits(lo, hi) {
  this.lo = lo >>> 0;
  this.hi = hi >>> 0;
}

var zero = LongBits.zero = new LongBits(0, 0);

zero.toNumber = function () {return 0;};
zero.zzEncode = zero.zzDecode = function () {return this;};
zero.length = function () {return 1;};


var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";

LongBits.fromNumber = function fromNumber(value) {
  if (value === 0)
  return zero;
  var sign = value < 0; //如果sign为 1 ,表示为负数
  if (sign)
  value = -value;
  var lo = value >>> 0, //取出底32位
  hi = (value - lo) / 4294967296 >>> 0; //取出高32位
  if (sign) {//负数
    hi = ~hi >>> 0; //求取高32位的反码
    lo = ~lo >>> 0; //求取低32位的反码
    if (++lo > 4294967295) {//低32位大于Math.pow(2,31)-1
      lo = 0;
      if (++hi > 4294967295) //高32位大于Math.pow(2,31)-1
        hi = 0;
    }
  }
  return new LongBits(lo, hi);
};


LongBits.from = function from(value) {
  if (typeof value === "number")
  return LongBits.fromNumber(value);
  if (typeof value === "string" || value instanceof String) {
    return LongBits.fromNumber(parseInt(value, 10));
  }
  return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
};

LongBits.prototype.toNumber = function toNumber(unsigned) {
  if (!unsigned && this.hi >>> 31) {
    var lo = ~this.lo + 1 >>> 0,
    hi = ~this.hi >>> 0;
    if (!lo)
    hi = hi + 1 >>> 0;
    return -(lo + hi * 4294967296);
  }
  return this.lo + this.hi * 4294967296;
};
LongBits.prototype.toLong = function toLong(unsigned) {
  //return util.Long
  //    ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
  //    /* istanbul ignore next */
  //    : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
  return { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
};

var charCodeAt = String.prototype.charCodeAt;

LongBits.fromHash = function fromHash(hash) {
  if (hash === zeroHash)
  return zero;
  return new LongBits(
  (charCodeAt.call(hash, 0) |
  charCodeAt.call(hash, 1) << 8 |
  charCodeAt.call(hash, 2) << 16 |
  charCodeAt.call(hash, 3) << 24) >>> 0,

  (charCodeAt.call(hash, 4) |
  charCodeAt.call(hash, 5) << 8 |
  charCodeAt.call(hash, 6) << 16 |
  charCodeAt.call(hash, 7) << 24) >>> 0);

};

LongBits.prototype.toHash = function toHash() {
  return String.fromCharCode(
  this.lo & 255,
  this.lo >>> 8 & 255,
  this.lo >>> 16 & 255,
  this.lo >>> 24,
  this.hi & 255,
  this.hi >>> 8 & 255,
  this.hi >>> 16 & 255,
  this.hi >>> 24);

};

LongBits.prototype.zzEncode = function zzEncode() {
  var mask = this.hi >> 31;
  this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
  this.lo = (this.lo << 1 ^ mask) >>> 0;
  return this;
};

LongBits.prototype.zzDecode = function zzDecode() {
  var mask = -(this.lo & 1);
  this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
  this.hi = (this.hi >>> 1 ^ mask) >>> 0;
  return this;
};
LongBits.prototype.length = function length() {
  var part0 = this.lo,
  part1 = (this.lo >>> 28 | this.hi << 4) >>> 0,
  part2 = this.hi >>> 24;
  return part2 === 0 ?
  part1 === 0 ?
  part0 < 16384 ?
  part0 < 128 ? 1 : 2 :
  part0 < 2097152 ? 3 : 4 :
  part1 < 16384 ?
  part1 < 128 ? 5 : 6 :
  part1 < 2097152 ? 7 : 8 :
  part2 < 128 ? 9 : 10;
};

/***/ }),
/* 30 */
/*!***********************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/long.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = Long;

/**
                        * wasm optimizations, to do native i64 multiplication and divide
                        */
var wasm = null;

try {
  wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([
  0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])),
  {}).exports;
} catch (e) {

} // no wasm support :(

/**
 * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
 *  See the from* functions below for more convenient ways of constructing Longs.
 * @exports Long
 * @class A Long class for representing a 64 bit two's-complement integer value.
 * @param {number} low The low (signed) 32 bits of the long
 * @param {number} high The high (signed) 32 bits of the long
 * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
 * @constructor
 */
function Long(low, high, unsigned) {

  /**
                                     * The low 32 bits as a signed value.
                                     * @type {number}
                                     */
  this.low = low | 0;

  /**
                       * The high 32 bits as a signed value.
                       * @type {number}
                       */
  this.high = high | 0;

  /**
                         * Whether unsigned or not.
                         * @type {boolean}
                         */
  this.unsigned = !!unsigned;
}

// The internal representation of a long is the two given signed, 32-bit values.
// We use 32-bit pieces because these are the size of integers on which
// Javascript performs bit-operations.  For operations like addition and
// multiplication, we split each number into 16 bit pieces, which can easily be
// multiplied within Javascript's floating-point representation without overflow
// or change in sign.
//
// In the algorithms below, we frequently reduce the negative case to the
// positive case by negating the input(s) and then post-processing the result.
// Note that we must ALWAYS check specially whether those values are MIN_VALUE
// (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
// a positive number, it overflows back into a negative).  Not handling this
// case would often result in infinite recursion.
//
// Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
// methods on which they depend.

/**
 * An indicator used to reliably determine if an object is a Long or not.
 * @type {boolean}
 * @const
 * @private
 */
Long.prototype.__isLong__;

Object.defineProperty(Long.prototype, "__isLong__", { value: true });

/**
                                                                       * @function
                                                                       * @param {*} obj Object
                                                                       * @returns {boolean}
                                                                       * @inner
                                                                       */
function isLong(obj) {
  return (obj && obj["__isLong__"]) === true;
}

/**
   * Tests if the specified object is a Long.
   * @function
   * @param {*} obj Object
   * @returns {boolean}
   */
Long.isLong = isLong;

/**
                       * A cache of the Long representations of small integer values.
                       * @type {!Object}
                       * @inner
                       */
var INT_CACHE = {};

/**
                     * A cache of the Long representations of small unsigned integer values.
                     * @type {!Object}
                     * @inner
                     */
var UINT_CACHE = {};

/**
                      * @param {number} value
                      * @param {boolean=} unsigned
                      * @returns {!Long}
                      * @inner
                      */
function fromInt(value, unsigned) {
  var obj, cachedObj, cache;
  if (unsigned) {
    value >>>= 0;
    if (cache = 0 <= value && value < 256) {
      cachedObj = UINT_CACHE[value];
      if (cachedObj)
      return cachedObj;
    }
    obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
    if (cache)
    UINT_CACHE[value] = obj;
    return obj;
  } else {
    value |= 0;
    if (cache = -128 <= value && value < 128) {
      cachedObj = INT_CACHE[value];
      if (cachedObj)
      return cachedObj;
    }
    obj = fromBits(value, value < 0 ? -1 : 0, false);
    if (cache)
    INT_CACHE[value] = obj;
    return obj;
  }
}

/**
   * Returns a Long representing the given 32 bit integer value.
   * @function
   * @param {number} value The 32 bit integer in question
   * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
   * @returns {!Long} The corresponding Long value
   */
Long.fromInt = fromInt;

/**
                         * @param {number} value
                         * @param {boolean=} unsigned
                         * @returns {!Long}
                         * @inner
                         */
function fromNumber(value, unsigned) {
  if (isNaN(value))
  return unsigned ? UZERO : ZERO;
  if (unsigned) {
    if (value < 0)
    return UZERO;
    if (value >= TWO_PWR_64_DBL)
    return MAX_UNSIGNED_VALUE;
  } else {
    if (value <= -TWO_PWR_63_DBL)
    return MIN_VALUE;
    if (value + 1 >= TWO_PWR_63_DBL)
    return MAX_VALUE;
  }
  if (value < 0)
  return fromNumber(-value, unsigned).neg();
  return fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
}

/**
   * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
   * @function
   * @param {number} value The number in question
   * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
   * @returns {!Long} The corresponding Long value
   */
Long.fromNumber = fromNumber;

/**
                               * @param {number} lowBits
                               * @param {number} highBits
                               * @param {boolean=} unsigned
                               * @returns {!Long}
                               * @inner
                               */
function fromBits(lowBits, highBits, unsigned) {
  return new Long(lowBits, highBits, unsigned);
}

/**
   * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
   *  assumed to use 32 bits.
   * @function
   * @param {number} lowBits The low 32 bits
   * @param {number} highBits The high 32 bits
   * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
   * @returns {!Long} The corresponding Long value
   */
Long.fromBits = fromBits;

/**
                           * @function
                           * @param {number} base
                           * @param {number} exponent
                           * @returns {number}
                           * @inner
                           */
var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)

/**
 * @param {string} str
 * @param {(boolean|number)=} unsigned
 * @param {number=} radix
 * @returns {!Long}
 * @inner
 */
function fromString(str, unsigned, radix) {
  if (str.length === 0)
  throw Error('empty string');
  if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
  return ZERO;
  if (typeof unsigned === 'number') {
    // For goog.math.long compatibility
    radix = unsigned,
    unsigned = false;
  } else {
    unsigned = !!unsigned;
  }
  radix = radix || 10;
  if (radix < 2 || 36 < radix)
  throw RangeError('radix');

  var p;
  if ((p = str.indexOf('-')) > 0)
  throw Error('interior hyphen');else
  if (p === 0) {
    return fromString(str.substring(1), unsigned, radix).neg();
  }

  // Do several (8) digits each time through the loop, so as to
  // minimize the calls to the very expensive emulated div.
  var radixToPower = fromNumber(pow_dbl(radix, 8));

  var result = ZERO;
  for (var i = 0; i < str.length; i += 8) {
    var size = Math.min(8, str.length - i),
    value = parseInt(str.substring(i, i + size), radix);
    if (size < 8) {
      var power = fromNumber(pow_dbl(radix, size));
      result = result.mul(power).add(fromNumber(value));
    } else {
      result = result.mul(radixToPower);
      result = result.add(fromNumber(value));
    }
  }
  result.unsigned = unsigned;
  return result;
}

/**
   * Returns a Long representation of the given string, written using the specified radix.
   * @function
   * @param {string} str The textual representation of the Long
   * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to signed
   * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
   * @returns {!Long} The corresponding Long value
   */
Long.fromString = fromString;

/**
                               * @function
                               * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
                               * @param {boolean=} unsigned
                               * @returns {!Long}
                               * @inner
                               */
function fromValue(val, unsigned) {
  if (typeof val === 'number')
  return fromNumber(val, unsigned);
  if (typeof val === 'string')
  return fromString(val, unsigned);
  // Throws for non-objects, converts non-instanceof Long:
  return fromBits(val.low, val.high, typeof unsigned === 'boolean' ? unsigned : val.unsigned);
}

/**
   * Converts the specified value to a Long using the appropriate from* function for its type.
   * @function
   * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
   * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
   * @returns {!Long}
   */
Long.fromValue = fromValue;

// NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
// no runtime penalty for these.

/**
 * @type {number}
 * @const
 * @inner
 */
var TWO_PWR_16_DBL = 1 << 16;

/**
                               * @type {number}
                               * @const
                               * @inner
                               */
var TWO_PWR_24_DBL = 1 << 24;

/**
                               * @type {number}
                               * @const
                               * @inner
                               */
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;

/**
                                                       * @type {number}
                                                       * @const
                                                       * @inner
                                                       */
var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;

/**
                                                       * @type {number}
                                                       * @const
                                                       * @inner
                                                       */
var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;

/**
                                          * @type {!Long}
                                          * @const
                                          * @inner
                                          */
var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);

/**
                                           * @type {!Long}
                                           * @inner
                                           */
var ZERO = fromInt(0);

/**
                        * Signed zero.
                        * @type {!Long}
                        */
Long.ZERO = ZERO;

/**
                   * @type {!Long}
                   * @inner
                   */
var UZERO = fromInt(0, true);

/**
                               * Unsigned zero.
                               * @type {!Long}
                               */
Long.UZERO = UZERO;

/**
                     * @type {!Long}
                     * @inner
                     */
var ONE = fromInt(1);

/**
                       * Signed one.
                       * @type {!Long}
                       */
Long.ONE = ONE;

/**
                 * @type {!Long}
                 * @inner
                 */
var UONE = fromInt(1, true);

/**
                              * Unsigned one.
                              * @type {!Long}
                              */
Long.UONE = UONE;

/**
                   * @type {!Long}
                   * @inner
                   */
var NEG_ONE = fromInt(-1);

/**
                            * Signed negative one.
                            * @type {!Long}
                            */
Long.NEG_ONE = NEG_ONE;

/**
                         * @type {!Long}
                         * @inner
                         */
var MAX_VALUE = fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0, false);

/**
                                                                  * Maximum signed value.
                                                                  * @type {!Long}
                                                                  */
Long.MAX_VALUE = MAX_VALUE;

/**
                             * @type {!Long}
                             * @inner
                             */
var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF | 0, 0xFFFFFFFF | 0, true);

/**
                                                                          * Maximum unsigned value.
                                                                          * @type {!Long}
                                                                          */
Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;

/**
                                               * @type {!Long}
                                               * @inner
                                               */
var MIN_VALUE = fromBits(0, 0x80000000 | 0, false);

/**
                                                     * Minimum signed value.
                                                     * @type {!Long}
                                                     */
Long.MIN_VALUE = MIN_VALUE;

/**
                             * @alias Long.prototype
                             * @inner
                             */
var LongPrototype = Long.prototype;

/**
                                     * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
                                     * @returns {number}
                                     */
LongPrototype.toInt = function toInt() {
  return this.unsigned ? this.low >>> 0 : this.low;
};

/**
    * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
    * @returns {number}
    */
LongPrototype.toNumber = function toNumber() {
  if (this.unsigned)
  return (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0);
  return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
};

/**
    * Converts the Long to a string written in the specified radix.
    * @param {number=} radix Radix (2-36), defaults to 10
    * @returns {string}
    * @override
    * @throws {RangeError} If `radix` is out of range
    */
LongPrototype.toString = function toString(radix) {
  radix = radix || 10;
  if (radix < 2 || 36 < radix)
  throw RangeError('radix');
  if (this.isZero())
  return '0';
  if (this.isNegative()) {// Unsigned Longs are never negative
    if (this.eq(MIN_VALUE)) {
      // We need to change the Long value before it can be negated, so we remove
      // the bottom-most digit in this base and then recurse to do the rest.
      var radixLong = fromNumber(radix),
      div = this.div(radixLong),
      rem1 = div.mul(radixLong).sub(this);
      return div.toString(radix) + rem1.toInt().toString(radix);
    } else
    return '-' + this.neg().toString(radix);
  }

  // Do several (6) digits each time through the loop, so as to
  // minimize the calls to the very expensive emulated div.
  var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
  rem = this;
  var result = '';
  while (true) {
    var remDiv = rem.div(radixToPower),
    intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
    digits = intval.toString(radix);
    rem = remDiv;
    if (rem.isZero())
    return digits + result;else
    {
      while (digits.length < 6) {
        digits = '0' + digits;}
      result = '' + digits + result;
    }
  }
};

/**
    * Gets the high 32 bits as a signed integer.
    * @returns {number} Signed high bits
    */
LongPrototype.getHighBits = function getHighBits() {
  return this.high;
};

/**
    * Gets the high 32 bits as an unsigned integer.
    * @returns {number} Unsigned high bits
    */
LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
  return this.high >>> 0;
};

/**
    * Gets the low 32 bits as a signed integer.
    * @returns {number} Signed low bits
    */
LongPrototype.getLowBits = function getLowBits() {
  return this.low;
};

/**
    * Gets the low 32 bits as an unsigned integer.
    * @returns {number} Unsigned low bits
    */
LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
  return this.low >>> 0;
};

/**
    * Gets the number of bits needed to represent the absolute value of this Long.
    * @returns {number}
    */
LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
  if (this.isNegative()) // Unsigned Longs are never negative
    return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
  var val = this.high != 0 ? this.high : this.low;
  for (var bit = 31; bit > 0; bit--) {
    if ((val & 1 << bit) != 0)
    break;}
  return this.high != 0 ? bit + 33 : bit + 1;
};

/**
    * Tests if this Long's value equals zero.
    * @returns {boolean}
    */
LongPrototype.isZero = function isZero() {
  return this.high === 0 && this.low === 0;
};

/**
    * Tests if this Long's value equals zero. This is an alias of {@link Long#isZero}.
    * @returns {boolean}
    */
LongPrototype.eqz = LongPrototype.isZero;

/**
                                           * Tests if this Long's value is negative.
                                           * @returns {boolean}
                                           */
LongPrototype.isNegative = function isNegative() {
  return !this.unsigned && this.high < 0;
};

/**
    * Tests if this Long's value is positive.
    * @returns {boolean}
    */
LongPrototype.isPositive = function isPositive() {
  return this.unsigned || this.high >= 0;
};

/**
    * Tests if this Long's value is odd.
    * @returns {boolean}
    */
LongPrototype.isOdd = function isOdd() {
  return (this.low & 1) === 1;
};

/**
    * Tests if this Long's value is even.
    * @returns {boolean}
    */
LongPrototype.isEven = function isEven() {
  return (this.low & 1) === 0;
};

/**
    * Tests if this Long's value equals the specified's.
    * @param {!Long|number|string} other Other value
    * @returns {boolean}
    */
LongPrototype.equals = function equals(other) {
  if (!isLong(other))
  other = fromValue(other);
  if (this.unsigned !== other.unsigned && this.high >>> 31 === 1 && other.high >>> 31 === 1)
  return false;
  return this.high === other.high && this.low === other.low;
};

/**
    * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
    * @function
    * @param {!Long|number|string} other Other value
    * @returns {boolean}
    */
LongPrototype.eq = LongPrototype.equals;

/**
                                          * Tests if this Long's value differs from the specified's.
                                          * @param {!Long|number|string} other Other value
                                          * @returns {boolean}
                                          */
LongPrototype.notEquals = function notEquals(other) {
  return !this.eq( /* validates */other);
};

/**
    * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
    * @function
    * @param {!Long|number|string} other Other value
    * @returns {boolean}
    */
LongPrototype.neq = LongPrototype.notEquals;

/**
                                              * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
                                              * @function
                                              * @param {!Long|number|string} other Other value
                                              * @returns {boolean}
                                              */
LongPrototype.ne = LongPrototype.notEquals;

/**
                                             * Tests if this Long's value is less than the specified's.
                                             * @param {!Long|number|string} other Other value
                                             * @returns {boolean}
                                             */
LongPrototype.lessThan = function lessThan(other) {
  return this.comp( /* validates */other) < 0;
};

/**
    * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
    * @function
    * @param {!Long|number|string} other Other value
    * @returns {boolean}
    */
LongPrototype.lt = LongPrototype.lessThan;

/**
                                            * Tests if this Long's value is less than or equal the specified's.
                                            * @param {!Long|number|string} other Other value
                                            * @returns {boolean}
                                            */
LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
  return this.comp( /* validates */other) <= 0;
};

/**
    * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
    * @function
    * @param {!Long|number|string} other Other value
    * @returns {boolean}
    */
LongPrototype.lte = LongPrototype.lessThanOrEqual;

/**
                                                    * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
                                                    * @function
                                                    * @param {!Long|number|string} other Other value
                                                    * @returns {boolean}
                                                    */
LongPrototype.le = LongPrototype.lessThanOrEqual;

/**
                                                   * Tests if this Long's value is greater than the specified's.
                                                   * @param {!Long|number|string} other Other value
                                                   * @returns {boolean}
                                                   */
LongPrototype.greaterThan = function greaterThan(other) {
  return this.comp( /* validates */other) > 0;
};

/**
    * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
    * @function
    * @param {!Long|number|string} other Other value
    * @returns {boolean}
    */
LongPrototype.gt = LongPrototype.greaterThan;

/**
                                               * Tests if this Long's value is greater than or equal the specified's.
                                               * @param {!Long|number|string} other Other value
                                               * @returns {boolean}
                                               */
LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
  return this.comp( /* validates */other) >= 0;
};

/**
    * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
    * @function
    * @param {!Long|number|string} other Other value
    * @returns {boolean}
    */
LongPrototype.gte = LongPrototype.greaterThanOrEqual;

/**
                                                       * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
                                                       * @function
                                                       * @param {!Long|number|string} other Other value
                                                       * @returns {boolean}
                                                       */
LongPrototype.ge = LongPrototype.greaterThanOrEqual;

/**
                                                      * Compares this Long's value with the specified's.
                                                      * @param {!Long|number|string} other Other value
                                                      * @returns {number} 0 if they are the same, 1 if the this is greater and -1
                                                      *  if the given one is greater
                                                      */
LongPrototype.compare = function compare(other) {
  if (!isLong(other))
  other = fromValue(other);
  if (this.eq(other))
  return 0;
  var thisNeg = this.isNegative(),
  otherNeg = other.isNegative();
  if (thisNeg && !otherNeg)
  return -1;
  if (!thisNeg && otherNeg)
  return 1;
  // At this point the sign bits are the same
  if (!this.unsigned)
  return this.sub(other).isNegative() ? -1 : 1;
  // Both are positive if at least one is unsigned
  return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
};

/**
    * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
    * @function
    * @param {!Long|number|string} other Other value
    * @returns {number} 0 if they are the same, 1 if the this is greater and -1
    *  if the given one is greater
    */
LongPrototype.comp = LongPrototype.compare;

/**
                                             * Negates this Long's value.
                                             * @returns {!Long} Negated Long
                                             */
LongPrototype.negate = function negate() {
  if (!this.unsigned && this.eq(MIN_VALUE))
  return MIN_VALUE;
  return this.not().add(ONE);
};

/**
    * Negates this Long's value. This is an alias of {@link Long#negate}.
    * @function
    * @returns {!Long} Negated Long
    */
LongPrototype.neg = LongPrototype.negate;

/**
                                           * Returns the sum of this and the specified Long.
                                           * @param {!Long|number|string} addend Addend
                                           * @returns {!Long} Sum
                                           */
LongPrototype.add = function add(addend) {
  if (!isLong(addend))
  addend = fromValue(addend);

  // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

  var a48 = this.high >>> 16;
  var a32 = this.high & 0xFFFF;
  var a16 = this.low >>> 16;
  var a00 = this.low & 0xFFFF;

  var b48 = addend.high >>> 16;
  var b32 = addend.high & 0xFFFF;
  var b16 = addend.low >>> 16;
  var b00 = addend.low & 0xFFFF;

  var c48 = 0,c32 = 0,c16 = 0,c00 = 0;
  c00 += a00 + b00;
  c16 += c00 >>> 16;
  c00 &= 0xFFFF;
  c16 += a16 + b16;
  c32 += c16 >>> 16;
  c16 &= 0xFFFF;
  c32 += a32 + b32;
  c48 += c32 >>> 16;
  c32 &= 0xFFFF;
  c48 += a48 + b48;
  c48 &= 0xFFFF;
  return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
};

/**
    * Returns the difference of this and the specified Long.
    * @param {!Long|number|string} subtrahend Subtrahend
    * @returns {!Long} Difference
    */
LongPrototype.subtract = function subtract(subtrahend) {
  if (!isLong(subtrahend))
  subtrahend = fromValue(subtrahend);
  return this.add(subtrahend.neg());
};

/**
    * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
    * @function
    * @param {!Long|number|string} subtrahend Subtrahend
    * @returns {!Long} Difference
    */
LongPrototype.sub = LongPrototype.subtract;

/**
                                             * Returns the product of this and the specified Long.
                                             * @param {!Long|number|string} multiplier Multiplier
                                             * @returns {!Long} Product
                                             */
LongPrototype.multiply = function multiply(multiplier) {
  if (this.isZero())
  return ZERO;
  if (!isLong(multiplier))
  multiplier = fromValue(multiplier);

  // use wasm support if present
  if (wasm) {
    var low = wasm.mul(this.low,
    this.high,
    multiplier.low,
    multiplier.high);
    return fromBits(low, wasm.get_high(), this.unsigned);
  }

  if (multiplier.isZero())
  return ZERO;
  if (this.eq(MIN_VALUE))
  return multiplier.isOdd() ? MIN_VALUE : ZERO;
  if (multiplier.eq(MIN_VALUE))
  return this.isOdd() ? MIN_VALUE : ZERO;

  if (this.isNegative()) {
    if (multiplier.isNegative())
    return this.neg().mul(multiplier.neg());else

    return this.neg().mul(multiplier).neg();
  } else if (multiplier.isNegative())
  return this.mul(multiplier.neg()).neg();

  // If both longs are small, use float multiplication
  if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
  return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);

  // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
  // We can skip products that would overflow.

  var a48 = this.high >>> 16;
  var a32 = this.high & 0xFFFF;
  var a16 = this.low >>> 16;
  var a00 = this.low & 0xFFFF;

  var b48 = multiplier.high >>> 16;
  var b32 = multiplier.high & 0xFFFF;
  var b16 = multiplier.low >>> 16;
  var b00 = multiplier.low & 0xFFFF;

  var c48 = 0,c32 = 0,c16 = 0,c00 = 0;
  c00 += a00 * b00;
  c16 += c00 >>> 16;
  c00 &= 0xFFFF;
  c16 += a16 * b00;
  c32 += c16 >>> 16;
  c16 &= 0xFFFF;
  c16 += a00 * b16;
  c32 += c16 >>> 16;
  c16 &= 0xFFFF;
  c32 += a32 * b00;
  c48 += c32 >>> 16;
  c32 &= 0xFFFF;
  c32 += a16 * b16;
  c48 += c32 >>> 16;
  c32 &= 0xFFFF;
  c32 += a00 * b32;
  c48 += c32 >>> 16;
  c32 &= 0xFFFF;
  c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
  c48 &= 0xFFFF;
  return fromBits(c16 << 16 | c00, c48 << 16 | c32, this.unsigned);
};

/**
    * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
    * @function
    * @param {!Long|number|string} multiplier Multiplier
    * @returns {!Long} Product
    */
LongPrototype.mul = LongPrototype.multiply;

/**
                                             * Returns this Long divided by the specified. The result is signed if this Long is signed or
                                             *  unsigned if this Long is unsigned.
                                             * @param {!Long|number|string} divisor Divisor
                                             * @returns {!Long} Quotient
                                             */
LongPrototype.divide = function divide(divisor) {
  if (!isLong(divisor))
  divisor = fromValue(divisor);
  if (divisor.isZero())
  throw Error('division by zero');

  // use wasm support if present
  if (wasm) {
    // guard against signed division overflow: the largest
    // negative number / -1 would be 1 larger than the largest
    // positive number, due to two's complement.
    if (!this.unsigned &&
    this.high === -0x80000000 &&
    divisor.low === -1 && divisor.high === -1) {
      // be consistent with non-wasm code path
      return this;
    }
    var low = (this.unsigned ? wasm.div_u : wasm.div_s)(
    this.low,
    this.high,
    divisor.low,
    divisor.high);

    return fromBits(low, wasm.get_high(), this.unsigned);
  }

  if (this.isZero())
  return this.unsigned ? UZERO : ZERO;
  var approx, rem, res;
  if (!this.unsigned) {
    // This section is only relevant for signed longs and is derived from the
    // closure library as a whole.
    if (this.eq(MIN_VALUE)) {
      if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
      return MIN_VALUE; // recall that -MIN_VALUE == MIN_VALUE
      else if (divisor.eq(MIN_VALUE))
        return ONE;else
        {
          // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
          var halfThis = this.shr(1);
          approx = halfThis.div(divisor).shl(1);
          if (approx.eq(ZERO)) {
            return divisor.isNegative() ? ONE : NEG_ONE;
          } else {
            rem = this.sub(divisor.mul(approx));
            res = approx.add(rem.div(divisor));
            return res;
          }
        }
    } else if (divisor.eq(MIN_VALUE))
    return this.unsigned ? UZERO : ZERO;
    if (this.isNegative()) {
      if (divisor.isNegative())
      return this.neg().div(divisor.neg());
      return this.neg().div(divisor).neg();
    } else if (divisor.isNegative())
    return this.div(divisor.neg()).neg();
    res = ZERO;
  } else {
    // The algorithm below has not been made for unsigned longs. It's therefore
    // required to take special care of the MSB prior to running it.
    if (!divisor.unsigned)
    divisor = divisor.toUnsigned();
    if (divisor.gt(this))
    return UZERO;
    if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
      return UONE;
    res = UZERO;
  }

  // Repeat the following until the remainder is less than other:  find a
  // floating-point that approximates remainder / other *from below*, add this
  // into the result, and subtract it from the remainder.  It is critical that
  // the approximate value is less than or equal to the real value so that the
  // remainder never becomes negative.
  rem = this;
  while (rem.gte(divisor)) {
    // Approximate the result of division. This may be a little greater or
    // smaller than the actual value.
    approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));

    // We will tweak the approximate result by changing it in the 48-th digit or
    // the smallest non-fractional digit, whichever is larger.
    var log2 = Math.ceil(Math.log(approx) / Math.LN2),
    delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48),

    // Decrease the approximation until it is smaller than the remainder.  Note
    // that if it is too large, the product overflows and is negative.
    approxRes = fromNumber(approx),
    approxRem = approxRes.mul(divisor);
    while (approxRem.isNegative() || approxRem.gt(rem)) {
      approx -= delta;
      approxRes = fromNumber(approx, this.unsigned);
      approxRem = approxRes.mul(divisor);
    }

    // We know the answer can't be zero... and actually, zero would cause
    // infinite recursion since we would make no progress.
    if (approxRes.isZero())
    approxRes = ONE;

    res = res.add(approxRes);
    rem = rem.sub(approxRem);
  }
  return res;
};

/**
    * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
    * @function
    * @param {!Long|number|string} divisor Divisor
    * @returns {!Long} Quotient
    */
LongPrototype.div = LongPrototype.divide;

/**
                                           * Returns this Long modulo the specified.
                                           * @param {!Long|number|string} divisor Divisor
                                           * @returns {!Long} Remainder
                                           */
LongPrototype.modulo = function modulo(divisor) {
  if (!isLong(divisor))
  divisor = fromValue(divisor);

  // use wasm support if present
  if (wasm) {
    var low = (this.unsigned ? wasm.rem_u : wasm.rem_s)(
    this.low,
    this.high,
    divisor.low,
    divisor.high);

    return fromBits(low, wasm.get_high(), this.unsigned);
  }

  return this.sub(this.div(divisor).mul(divisor));
};

/**
    * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
    * @function
    * @param {!Long|number|string} divisor Divisor
    * @returns {!Long} Remainder
    */
LongPrototype.mod = LongPrototype.modulo;

/**
                                           * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
                                           * @function
                                           * @param {!Long|number|string} divisor Divisor
                                           * @returns {!Long} Remainder
                                           */
LongPrototype.rem = LongPrototype.modulo;

/**
                                           * Returns the bitwise NOT of this Long.
                                           * @returns {!Long}
                                           */
LongPrototype.not = function not() {
  return fromBits(~this.low, ~this.high, this.unsigned);
};

/**
    * Returns the bitwise AND of this Long and the specified.
    * @param {!Long|number|string} other Other Long
    * @returns {!Long}
    */
LongPrototype.and = function and(other) {
  if (!isLong(other))
  other = fromValue(other);
  return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
};

/**
    * Returns the bitwise OR of this Long and the specified.
    * @param {!Long|number|string} other Other Long
    * @returns {!Long}
    */
LongPrototype.or = function or(other) {
  if (!isLong(other))
  other = fromValue(other);
  return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
};

/**
    * Returns the bitwise XOR of this Long and the given one.
    * @param {!Long|number|string} other Other Long
    * @returns {!Long}
    */
LongPrototype.xor = function xor(other) {
  if (!isLong(other))
  other = fromValue(other);
  return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
};

/**
    * Returns this Long with bits shifted to the left by the given amount.
    * @param {number|!Long} numBits Number of bits
    * @returns {!Long} Shifted Long
    */
LongPrototype.shiftLeft = function shiftLeft(numBits) {
  if (isLong(numBits))
  numBits = numBits.toInt();
  if ((numBits &= 63) === 0)
  return this;else
  if (numBits < 32)
  return fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned);else

  return fromBits(0, this.low << numBits - 32, this.unsigned);
};

/**
    * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
    * @function
    * @param {number|!Long} numBits Number of bits
    * @returns {!Long} Shifted Long
    */
LongPrototype.shl = LongPrototype.shiftLeft;

/**
                                              * Returns this Long with bits arithmetically shifted to the right by the given amount.
                                              * @param {number|!Long} numBits Number of bits
                                              * @returns {!Long} Shifted Long
                                              */
LongPrototype.shiftRight = function shiftRight(numBits) {
  if (isLong(numBits))
  numBits = numBits.toInt();
  if ((numBits &= 63) === 0)
  return this;else
  if (numBits < 32)
  return fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned);else

  return fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
};

/**
    * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
    * @function
    * @param {number|!Long} numBits Number of bits
    * @returns {!Long} Shifted Long
    */
LongPrototype.shr = LongPrototype.shiftRight;

/**
                                               * Returns this Long with bits logically shifted to the right by the given amount.
                                               * @param {number|!Long} numBits Number of bits
                                               * @returns {!Long} Shifted Long
                                               */
LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
  if (isLong(numBits))
  numBits = numBits.toInt();
  numBits &= 63;
  if (numBits === 0)
  return this;else
  {
    var high = this.high;
    if (numBits < 32) {
      var low = this.low;
      return fromBits(low >>> numBits | high << 32 - numBits, high >>> numBits, this.unsigned);
    } else if (numBits === 32)
    return fromBits(high, 0, this.unsigned);else

    return fromBits(high >>> numBits - 32, 0, this.unsigned);
  }
};

/**
    * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
    * @function
    * @param {number|!Long} numBits Number of bits
    * @returns {!Long} Shifted Long
    */
LongPrototype.shru = LongPrototype.shiftRightUnsigned;

/**
                                                        * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
                                                        * @function
                                                        * @param {number|!Long} numBits Number of bits
                                                        * @returns {!Long} Shifted Long
                                                        */
LongPrototype.shr_u = LongPrototype.shiftRightUnsigned;

/**
                                                         * Converts this Long to signed.
                                                         * @returns {!Long} Signed long
                                                         */
LongPrototype.toSigned = function toSigned() {
  if (!this.unsigned)
  return this;
  return fromBits(this.low, this.high, false);
};

/**
    * Converts this Long to unsigned.
    * @returns {!Long} Unsigned long
    */
LongPrototype.toUnsigned = function toUnsigned() {
  if (this.unsigned)
  return this;
  return fromBits(this.low, this.high, true);
};

/**
    * Converts this Long to its byte representation.
    * @param {boolean=} le Whether little or big endian, defaults to big endian
    * @returns {!Array.<number>} Byte representation
    */
LongPrototype.toBytes = function toBytes(le) {
  return le ? this.toBytesLE() : this.toBytesBE();
};

/**
    * Converts this Long to its little endian byte representation.
    * @returns {!Array.<number>} Little endian byte representation
    */
LongPrototype.toBytesLE = function toBytesLE() {
  var hi = this.high,
  lo = this.low;
  return [
  lo & 0xff,
  lo >>> 8 & 0xff,
  lo >>> 16 & 0xff,
  lo >>> 24,
  hi & 0xff,
  hi >>> 8 & 0xff,
  hi >>> 16 & 0xff,
  hi >>> 24];

};

/**
    * Converts this Long to its big endian byte representation.
    * @returns {!Array.<number>} Big endian byte representation
    */
LongPrototype.toBytesBE = function toBytesBE() {
  var hi = this.high,
  lo = this.low;
  return [
  hi >>> 24,
  hi >>> 16 & 0xff,
  hi >>> 8 & 0xff,
  hi & 0xff,
  lo >>> 24,
  lo >>> 16 & 0xff,
  lo >>> 8 & 0xff,
  lo & 0xff];

};

/**
    * Creates a Long from its byte representation.
    * @param {!Array.<number>} bytes Byte representation
    * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
    * @param {boolean=} le Whether little or big endian, defaults to big endian
    * @returns {Long} The corresponding Long value
    */
Long.fromBytes = function fromBytes(bytes, unsigned, le) {
  return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
};

/**
    * Creates a Long from its little endian byte representation.
    * @param {!Array.<number>} bytes Little endian byte representation
    * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
    * @returns {Long} The corresponding Long value
    */
Long.fromBytesLE = function fromBytesLE(bytes, unsigned) {
  return new Long(
  bytes[0] |
  bytes[1] << 8 |
  bytes[2] << 16 |
  bytes[3] << 24,
  bytes[4] |
  bytes[5] << 8 |
  bytes[6] << 16 |
  bytes[7] << 24,
  unsigned);

};

/**
    * Creates a Long from its big endian byte representation.
    * @param {!Array.<number>} bytes Big endian byte representation
    * @param {boolean=} unsigned Whether unsigned or not, defaults to signed
    * @returns {Long} The corresponding Long value
    */
Long.fromBytesBE = function fromBytesBE(bytes, unsigned) {
  return new Long(
  bytes[4] << 24 |
  bytes[5] << 16 |
  bytes[6] << 8 |
  bytes[7],
  bytes[0] << 24 |
  bytes[1] << 16 |
  bytes[2] << 8 |
  bytes[3],
  unsigned);

};

/***/ }),
/* 31 */
/*!***********************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/pool.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = pool;

/**
                        * An allocator as used by {@link util.pool}.
                        * @typedef PoolAllocator
                        * @type {function}
                        * @param {number} size Buffer size
                        * @returns {Uint8Array} Buffer
                        */

/**
                            * A slicer as used by {@link util.pool}.
                            * @typedef PoolSlicer
                            * @type {function}
                            * @param {number} start Start offset
                            * @param {number} end End offset
                            * @returns {Uint8Array} Buffer slice
                            * @this {Uint8Array}
                            */

/**
                                * A general purpose buffer pool.
                                * @memberof util
                                * @function
                                * @param {PoolAllocator} alloc Allocator
                                * @param {PoolSlicer} slice Slicer
                                * @param {number} [size=8192] Slab size
                                * @returns {PoolAllocator} Pooled allocator
                                */
function pool(alloc, slice, size) {
  var SIZE = size || 8192;
  var MAX = SIZE >>> 1;
  var slab = null;
  var offset = SIZE;
  return function pool_alloc(size) {
    if (size < 1 || size > MAX)
    return alloc(size);
    if (offset + size > SIZE) {
      slab = alloc(SIZE);
      offset = 0;
    }
    var buf = slice.call(slab, offset, offset += size);
    if (offset & 7) // align to 32 bit
      offset = (offset | 7) + 1;
    return buf;
  };
}

/***/ }),
/* 32 */
/*!************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/float.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = factory(factory);

/**
                                    * Reads / writes floats / doubles from / to buffers.
                                    * @name util.float
                                    * @namespace
                                    */

/**
                                        * Writes a 32 bit float to a buffer using little endian byte order.
                                        * @name util.float.writeFloatLE
                                        * @function
                                        * @param {number} val Value to write
                                        * @param {Uint8Array} buf Target buffer
                                        * @param {number} pos Target buffer offset
                                        * @returns {undefined}
                                        */

/**
                                            * Writes a 32 bit float to a buffer using big endian byte order.
                                            * @name util.float.writeFloatBE
                                            * @function
                                            * @param {number} val Value to write
                                            * @param {Uint8Array} buf Target buffer
                                            * @param {number} pos Target buffer offset
                                            * @returns {undefined}
                                            */

/**
                                                * Reads a 32 bit float from a buffer using little endian byte order.
                                                * @name util.float.readFloatLE
                                                * @function
                                                * @param {Uint8Array} buf Source buffer
                                                * @param {number} pos Source buffer offset
                                                * @returns {number} Value read
                                                */

/**
                                                    * Reads a 32 bit float from a buffer using big endian byte order.
                                                    * @name util.float.readFloatBE
                                                    * @function
                                                    * @param {Uint8Array} buf Source buffer
                                                    * @param {number} pos Source buffer offset
                                                    * @returns {number} Value read
                                                    */

/**
                                                        * Writes a 64 bit double to a buffer using little endian byte order.
                                                        * @name util.float.writeDoubleLE
                                                        * @function
                                                        * @param {number} val Value to write
                                                        * @param {Uint8Array} buf Target buffer
                                                        * @param {number} pos Target buffer offset
                                                        * @returns {undefined}
                                                        */

/**
                                                            * Writes a 64 bit double to a buffer using big endian byte order.
                                                            * @name util.float.writeDoubleBE
                                                            * @function
                                                            * @param {number} val Value to write
                                                            * @param {Uint8Array} buf Target buffer
                                                            * @param {number} pos Target buffer offset
                                                            * @returns {undefined}
                                                            */

/**
                                                                * Reads a 64 bit double from a buffer using little endian byte order.
                                                                * @name util.float.readDoubleLE
                                                                * @function
                                                                * @param {Uint8Array} buf Source buffer
                                                                * @param {number} pos Source buffer offset
                                                                * @returns {number} Value read
                                                                */

/**
                                                                    * Reads a 64 bit double from a buffer using big endian byte order.
                                                                    * @name util.float.readDoubleBE
                                                                    * @function
                                                                    * @param {Uint8Array} buf Source buffer
                                                                    * @param {number} pos Source buffer offset
                                                                    * @returns {number} Value read
                                                                    */

// Factory function for the purpose of node-based testing in modified global environments
function factory(exports) {

  // float: typed array
  if (typeof Float32Array !== "undefined") (function () {

    var f32 = new Float32Array([-0]),
    f8b = new Uint8Array(f32.buffer),
    le = f8b[3] === 128;

    function writeFloat_f32_cpy(val, buf, pos) {
      f32[0] = val;
      buf[pos] = f8b[0];
      buf[pos + 1] = f8b[1];
      buf[pos + 2] = f8b[2];
      buf[pos + 3] = f8b[3];
    }

    function writeFloat_f32_rev(val, buf, pos) {
      f32[0] = val;
      buf[pos] = f8b[3];
      buf[pos + 1] = f8b[2];
      buf[pos + 2] = f8b[1];
      buf[pos + 3] = f8b[0];
    }

    /* istanbul ignore next */
    exports.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
    /* istanbul ignore next */
    exports.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;

    function readFloat_f32_cpy(buf, pos) {
      f8b[0] = buf[pos];
      f8b[1] = buf[pos + 1];
      f8b[2] = buf[pos + 2];
      f8b[3] = buf[pos + 3];
      return f32[0];
    }

    function readFloat_f32_rev(buf, pos) {
      f8b[3] = buf[pos];
      f8b[2] = buf[pos + 1];
      f8b[1] = buf[pos + 2];
      f8b[0] = buf[pos + 3];
      return f32[0];
    }

    /* istanbul ignore next */
    exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
    /* istanbul ignore next */
    exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;

    // float: ieee754
  })();else (function () {

    function writeFloat_ieee754(writeUint, val, buf, pos) {
      var sign = val < 0 ? 1 : 0;
      if (sign)
      val = -val;
      if (val === 0)
      writeUint(1 / val > 0 ? /* positive */0 : /* negative 0 */2147483648, buf, pos);else
      if (isNaN(val))
      writeUint(2143289344, buf, pos);else
      if (val > 3.4028234663852886e+38) // +-Infinity
        writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);else
      if (val < 1.1754943508222875e-38) // denormal
        writeUint((sign << 31 | Math.round(val / 1.401298464324817e-45)) >>> 0, buf, pos);else
      {
        var exponent = Math.floor(Math.log(val) / Math.LN2),
        mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
        writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
      }
    }

    exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
    exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);

    function readFloat_ieee754(readUint, buf, pos) {
      var uint = readUint(buf, pos),
      sign = (uint >> 31) * 2 + 1,
      exponent = uint >>> 23 & 255,
      mantissa = uint & 8388607;
      return exponent === 255 ?
      mantissa ?
      NaN :
      sign * Infinity :
      exponent === 0 // denormal
      ? sign * 1.401298464324817e-45 * mantissa :
      sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
    }

    exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
    exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE);

  })();

  // double: typed array
  if (typeof Float64Array !== "undefined") (function () {

    var f64 = new Float64Array([-0]),
    f8b = new Uint8Array(f64.buffer),
    le = f8b[7] === 128;

    function writeDouble_f64_cpy(val, buf, pos) {
      f64[0] = val;
      buf[pos] = f8b[0];
      buf[pos + 1] = f8b[1];
      buf[pos + 2] = f8b[2];
      buf[pos + 3] = f8b[3];
      buf[pos + 4] = f8b[4];
      buf[pos + 5] = f8b[5];
      buf[pos + 6] = f8b[6];
      buf[pos + 7] = f8b[7];
    }

    function writeDouble_f64_rev(val, buf, pos) {
      f64[0] = val;
      buf[pos] = f8b[7];
      buf[pos + 1] = f8b[6];
      buf[pos + 2] = f8b[5];
      buf[pos + 3] = f8b[4];
      buf[pos + 4] = f8b[3];
      buf[pos + 5] = f8b[2];
      buf[pos + 6] = f8b[1];
      buf[pos + 7] = f8b[0];
    }

    /* istanbul ignore next */
    exports.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
    /* istanbul ignore next */
    exports.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;

    function readDouble_f64_cpy(buf, pos) {
      f8b[0] = buf[pos];
      f8b[1] = buf[pos + 1];
      f8b[2] = buf[pos + 2];
      f8b[3] = buf[pos + 3];
      f8b[4] = buf[pos + 4];
      f8b[5] = buf[pos + 5];
      f8b[6] = buf[pos + 6];
      f8b[7] = buf[pos + 7];
      return f64[0];
    }

    function readDouble_f64_rev(buf, pos) {
      f8b[7] = buf[pos];
      f8b[6] = buf[pos + 1];
      f8b[5] = buf[pos + 2];
      f8b[4] = buf[pos + 3];
      f8b[3] = buf[pos + 4];
      f8b[2] = buf[pos + 5];
      f8b[1] = buf[pos + 6];
      f8b[0] = buf[pos + 7];
      return f64[0];
    }

    /* istanbul ignore next */
    exports.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
    /* istanbul ignore next */
    exports.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;

    // double: ieee754
  })();else (function () {

    function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
      var sign = val < 0 ? 1 : 0;
      if (sign)
      val = -val;
      if (val === 0) {
        writeUint(0, buf, pos + off0);
        writeUint(1 / val > 0 ? /* positive */0 : /* negative 0 */2147483648, buf, pos + off1);
      } else if (isNaN(val)) {
        writeUint(0, buf, pos + off0);
        writeUint(2146959360, buf, pos + off1);
      } else if (val > 1.7976931348623157e+308) {// +-Infinity
        writeUint(0, buf, pos + off0);
        writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
      } else {
        var mantissa;
        if (val < 2.2250738585072014e-308) {// denormal
          mantissa = val / 5e-324;
          writeUint(mantissa >>> 0, buf, pos + off0);
          writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
        } else {
          var exponent = Math.floor(Math.log(val) / Math.LN2);
          if (exponent === 1024)
          exponent = 1023;
          mantissa = val * Math.pow(2, -exponent);
          writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
          writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
        }
      }
    }

    exports.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
    exports.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);

    function readDouble_ieee754(readUint, off0, off1, buf, pos) {
      var lo = readUint(buf, pos + off0),
      hi = readUint(buf, pos + off1);
      var sign = (hi >> 31) * 2 + 1,
      exponent = hi >>> 20 & 2047,
      mantissa = 4294967296 * (hi & 1048575) + lo;
      return exponent === 2047 ?
      mantissa ?
      NaN :
      sign * Infinity :
      exponent === 0 // denormal
      ? sign * 5e-324 * mantissa :
      sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
    }

    exports.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
    exports.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);

  })();

  return exports;
}

// uint helpers

function writeUintLE(val, buf, pos) {
  buf[pos] = val & 255;
  buf[pos + 1] = val >>> 8 & 255;
  buf[pos + 2] = val >>> 16 & 255;
  buf[pos + 3] = val >>> 24;
}

function writeUintBE(val, buf, pos) {
  buf[pos] = val >>> 24;
  buf[pos + 1] = val >>> 16 & 255;
  buf[pos + 2] = val >>> 8 & 255;
  buf[pos + 3] = val & 255;
}

function readUintLE(buf, pos) {
  return (buf[pos] |
  buf[pos + 1] << 8 |
  buf[pos + 2] << 16 |
  buf[pos + 3] << 24) >>> 0;
}

function readUintBE(buf, pos) {
  return (buf[pos] << 24 |
  buf[pos + 1] << 16 |
  buf[pos + 2] << 8 |
  buf[pos + 3]) >>> 0;
}

/***/ }),
/* 33 */
/*!****************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/asPromise.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = asPromise;

/**
                             * Callback as used by {@link util.asPromise}.
                             * @typedef asPromiseCallback
                             * @type {function}
                             * @param {Error|null} error Error, if any
                             * @param {...*} params Additional arguments
                             * @returns {undefined}
                             */

/**
                                 * Returns a promise from a node-style callback function.
                                 * @memberof util
                                 * @param {asPromiseCallback} fn Function to call
                                 * @param {*} ctx Function context
                                 * @param {...*} params Function arguments
                                 * @returns {Promise<*>} Promisified function
                                 */
function asPromise(fn, ctx /*, varargs */) {
  var params = new Array(arguments.length - 1),
  offset = 0,
  index = 2,
  pending = true;
  while (index < arguments.length) {
    params[offset++] = arguments[index++];}
  return new Promise(function executor(resolve, reject) {
    params[offset] = function callback(err /*, varargs */) {
      if (pending) {
        pending = false;
        if (err)
        reject(err);else
        {
          var params = new Array(arguments.length - 1),
          offset = 0;
          while (offset < params.length) {
            params[offset++] = arguments[offset];}
          resolve.apply(null, params);
        }
      }
    };
    try {
      fn.apply(ctx || null, params);
    } catch (err) {
      if (pending) {
        pending = false;
        reject(err);
      }
    }
  });
}

/***/ }),
/* 34 */
/*!*******************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/EventEmitter.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = EventEmitter;

/**
                                * Constructs a new event emitter instance.
                                * @classdesc A minimal event emitter.
                                * @memberof util
                                * @constructor
                                */
function EventEmitter() {

  /**
                          * Registered listeners.
                          * @type {Object.<string,*>}
                          * @private
                          */
  this._listeners = {};
}

/**
   * Registers an event listener.
   * @param {string} evt Event name
   * @param {function} fn Listener
   * @param {*} [ctx] Listener context
   * @returns {util.EventEmitter} `this`
   */
EventEmitter.prototype.on = function on(evt, fn, ctx) {
  (this._listeners[evt] || (this._listeners[evt] = [])).push({
    fn: fn,
    ctx: ctx || this });

  return this;
};

/**
    * Removes an event listener or any matching listeners if arguments are omitted.
    * @param {string} [evt] Event name. Removes all listeners if omitted.
    * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
    * @returns {util.EventEmitter} `this`
    */
EventEmitter.prototype.off = function off(evt, fn) {
  if (evt === undefined)
  this._listeners = {};else
  {
    if (fn === undefined)
    this._listeners[evt] = [];else
    {
      var listeners = this._listeners[evt];
      for (var i = 0; i < listeners.length;) {
        if (listeners[i].fn === fn)
        listeners.splice(i, 1);else

        ++i;}
    }
  }
  return this;
};

/**
    * Emits an event by calling its listeners with the specified arguments.
    * @param {string} evt Event name
    * @param {...*} args Arguments
    * @returns {util.EventEmitter} `this`
    */
EventEmitter.prototype.emit = function emit(evt) {
  var listeners = this._listeners[evt];
  if (listeners) {
    var args = [],
    i = 1;
    for (; i < arguments.length;) {
      args.push(arguments[i++]);}
    for (i = 0; i < listeners.length;) {
      listeners[i].fn.apply(listeners[i++].ctx, args);}
  }
  return this;
};

/***/ }),
/* 35 */
/*!***********************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/path.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var path = module.exports;

var isAbsolute =
/**
                  * Tests if the specified path is absolute.
                  * @param {string} path Path to test
                  * @returns {boolean} `true` if path is absolute
                  */
path.isAbsolute = function isAbsolute(path) {
  return /^(?:\/|\w+:)/.test(path);
};

var normalize =
/**
                 * Normalizes the specified path.
                 * @param {string} path Path to normalize
                 * @returns {string} Normalized path
                 */
path.normalize = function normalize(path) {
  path = path.replace(/\\/g, "/").
  replace(/\/{2,}/g, "/");
  var parts = path.split("/"),
  absolute = isAbsolute(path),
  prefix = "";
  if (absolute)
  prefix = parts.shift() + "/";
  for (var i = 0; i < parts.length;) {
    if (parts[i] === "..") {
      if (i > 0 && parts[i - 1] !== "..")
      parts.splice(--i, 2);else
      if (absolute)
      parts.splice(i, 1);else

      ++i;
    } else if (parts[i] === ".")
    parts.splice(i, 1);else

    ++i;
  }
  return prefix + parts.join("/");
};

/**
    * Resolves the specified include path against the specified origin path.
    * @param {string} originPath Path to the origin file
    * @param {string} includePath Include path relative to origin path
    * @param {boolean} [alreadyNormalized=false] `true` if both paths are already known to be normalized
    * @returns {string} Path to the include file
    */
path.resolve = function resolve(originPath, includePath, alreadyNormalized) {
  if (!alreadyNormalized)
  includePath = normalize(includePath);
  if (isAbsolute(includePath))
  return includePath;
  if (!alreadyNormalized)
  originPath = normalize(originPath);
  return (originPath = originPath.replace(/(?:\/|^)[^/]+$/, "")).length ? normalize(originPath + "/" + includePath) : includePath;
};

/***/ }),
/* 36 */
/*!*************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/base64.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * A minimal base64 implementation for number arrays.
               * @memberof util
               * @namespace
               */
var base64 = module.exports;

/**
                              * Calculates the byte length of a base64 encoded string.
                              * @param {string} string Base64 encoded string
                              * @returns {number} Byte length
                              */
base64.length = function length(string) {
  var p = string.length;
  if (!p)
  return 0;
  var n = 0;
  while (--p % 4 > 1 && string.charAt(p) === "=") {
    ++n;}
  return Math.ceil(string.length * 3) / 4 - n;
};

// Base64 encoding table
var b64 = new Array(64);

// Base64 decoding table
var s64 = new Array(123);

// 65..90, 97..122, 48..57, 43, 47
for (var i = 0; i < 64;) {
  s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;}

/**
                                                                                          * Encodes a buffer to a base64 encoded string.
                                                                                          * @param {Uint8Array} buffer Source buffer
                                                                                          * @param {number} start Source start
                                                                                          * @param {number} end Source end
                                                                                          * @returns {string} Base64 encoded string
                                                                                          */
base64.encode = function encode(buffer, start, end) {
  var parts = null,
  chunk = [];
  var i = 0, // output index
  j = 0, // goto index
  t; // temporary
  while (start < end) {
    var b = buffer[start++];
    switch (j) {
      case 0:
        chunk[i++] = b64[b >> 2];
        t = (b & 3) << 4;
        j = 1;
        break;
      case 1:
        chunk[i++] = b64[t | b >> 4];
        t = (b & 15) << 2;
        j = 2;
        break;
      case 2:
        chunk[i++] = b64[t | b >> 6];
        chunk[i++] = b64[b & 63];
        j = 0;
        break;}

    if (i > 8191) {
      (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
      i = 0;
    }
  }
  if (j) {
    chunk[i++] = b64[t];
    chunk[i++] = 61;
    if (j === 1)
    chunk[i++] = 61;
  }
  if (parts) {
    if (i)
    parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
    return parts.join("");
  }
  return String.fromCharCode.apply(String, chunk.slice(0, i));
};

var invalidEncoding = "invalid encoding";

/**
                                           * Decodes a base64 encoded string to a buffer.
                                           * @param {string} string Source string
                                           * @param {Uint8Array} buffer Destination buffer
                                           * @param {number} offset Destination offset
                                           * @returns {number} Number of bytes written
                                           * @throws {Error} If encoding is invalid
                                           */
base64.decode = function decode(string, buffer, offset) {
  var start = offset;
  var j = 0, // goto index
  t; // temporary
  for (var i = 0; i < string.length;) {
    var c = string.charCodeAt(i++);
    if (c === 61 && j > 1)
    break;
    if ((c = s64[c]) === undefined)
    throw Error(invalidEncoding);
    switch (j) {
      case 0:
        t = c;
        j = 1;
        break;
      case 1:
        buffer[offset++] = t << 2 | (c & 48) >> 4;
        t = c;
        j = 2;
        break;
      case 2:
        buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
        t = c;
        j = 3;
        break;
      case 3:
        buffer[offset++] = (t & 3) << 6 | c;
        j = 0;
        break;}

  }
  if (j === 1)
  throw Error(invalidEncoding);
  return offset - start;
};

/**
    * Tests if the specified string appears to be base64 encoded.
    * @param {string} string String to test
    * @returns {boolean} `true` if probably base64 encoded, otherwise false
    */
base64.test = function test(string) {
  return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
};

/***/ }),
/* 37 */
/*!***********************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/utf8.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * A minimal UTF8 implementation for number arrays.
               * @memberof util
               * @namespace
               */
var utf8 = module.exports;

/**
                            * Calculates the UTF8 byte length of a string.
                            * @param {string} string String
                            * @returns {number} Byte length
                            */
utf8.length = function utf8_length(string) {
  var len = 0,
  c = 0;
  for (var i = 0; i < string.length; ++i) {
    c = string.charCodeAt(i);
    if (c < 128)
    len += 1;else
    if (c < 2048)
    len += 2;else
    if ((c & 0xFC00) === 0xD800 && (string.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
      ++i;
      len += 4;
    } else
    len += 3;
  }
  return len;
};

/**
    * Reads UTF8 bytes as a string.
    * @param {Uint8Array} buffer Source buffer
    * @param {number} start Source start
    * @param {number} end Source end
    * @returns {string} String read
    */
utf8.read = function utf8_read(buffer, start, end) {
  var len = end - start;
  if (len < 1)
  return "";
  var parts = null,
  chunk = [],
  i = 0, // char offset
  t; // temporary
  while (start < end) {
    t = buffer[start++];
    if (t < 128)
    chunk[i++] = t;else
    if (t > 191 && t < 224)
    chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;else
    if (t > 239 && t < 365) {
      t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 0x10000;
      chunk[i++] = 0xD800 + (t >> 10);
      chunk[i++] = 0xDC00 + (t & 1023);
    } else
    chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
    if (i > 8191) {
      (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
      i = 0;
    }
  }
  if (parts) {
    if (i)
    parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
    return parts.join("");
  }
  return String.fromCharCode.apply(String, chunk.slice(0, i));
};

/**
    * Writes a string as UTF8 bytes.
    * @param {string} string Source string
    * @param {Uint8Array} buffer Destination buffer
    * @param {number} offset Destination offset
    * @returns {number} Bytes written
    */
utf8.write = function utf8_write(string, buffer, offset) {
  var start = offset,
  c1, // character 1
  c2; // character 2
  for (var i = 0; i < string.length; ++i) {
    c1 = string.charCodeAt(i);
    if (c1 < 128) {
      buffer[offset++] = c1;
    } else if (c1 < 2048) {
      buffer[offset++] = c1 >> 6 | 192;
      buffer[offset++] = c1 & 63 | 128;
    } else if ((c1 & 0xFC00) === 0xD800 && ((c2 = string.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
      c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
      ++i;
      buffer[offset++] = c1 >> 18 | 240;
      buffer[offset++] = c1 >> 12 & 63 | 128;
      buffer[offset++] = c1 >> 6 & 63 | 128;
      buffer[offset++] = c1 & 63 | 128;
    } else {
      buffer[offset++] = c1 >> 12 | 224;
      buffer[offset++] = c1 >> 6 & 63 | 128;
      buffer[offset++] = c1 & 63 | 128;
    }
  }
  return offset - start;
};

/***/ }),
/* 38 */
/*!***********************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/type.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by zhangmiao on 2018/3/13.
 */


module.exports = Type;

var Namespace = __webpack_require__(/*! ./namespace */ 39);
((Type.prototype = Object.create(Namespace.prototype)).constructor = Type).className = "Type";


var Enum,
Field,
Message,
OneOf,
Writer,
Reader,
util,
verifier,
encoder,
decoder,
Service,
wrappers,
converter,
MapField;



function Type(name, options) {
  Namespace.call(this, name, options);

  /**
                                        * Message fields.
                                        * @type {Object.<string,Field>}
                                        */
  this.fields = {}; // toJSON, marker

  /**
   * Oneofs declared within this namespace, if any.
   * @type {Object.<string,OneOf>}
   */
  this.oneofs = undefined; // toJSON

  /**
   * Extension ranges, if any.
   * @type {number[][]}
   */
  this.extensions = undefined; // toJSON

  /**
   * Reserved ranges, if any.
   * @type {Array.<number[]|string>}
   */
  this.reserved = undefined; // toJSON

  /*?
   * Whether this type is a legacy group.
   * @type {boolean|undefined}
   */
  this.group = undefined; // toJSON 这个可能不需要,因为不支持

  /**
   * Cached fields by id.
   * @type {Object.<number,Field>|null}
   * @private
   */
  this._fieldsById = null;

  /**
                            * Cached fields as an array.
                            * @type {Field[]|null}
                            * @private
                            */
  this._fieldsArray = null;

  /**
                             * Cached oneofs as an array.
                             * @type {OneOf[]|null}
                             * @private
                             */
  this._oneofsArray = null;

  /**
                             * Cached constructor.
                             * @type {Constructor<{}>}
                             * @private
                             */
  this._ctor = null;
}


Object.defineProperties(Type.prototype, {

  /**
                                           * Message fields by id.
                                           * @name Type#fieldsById
                                           * @type {Object.<number,Field>}
                                           * @readonly
                                           */
  fieldsById: {
    get: function get() {

      /* istanbul ignore if */
      if (this._fieldsById)
      return this._fieldsById;

      this._fieldsById = {};
      for (var names = Object.keys(this.fields), i = 0; i < names.length; ++i) {
        var field = this.fields[names[i]],
        id = field.id;

        /* istanbul ignore if */
        if (this._fieldsById[id])
        throw Error("duplicate id " + id + " in " + this);

        this._fieldsById[id] = field;
      }
      return this._fieldsById;
    } },


  /**
          * Fields of this message as an array for iteration.
          * @name Type#fieldsArray
          * @type {Field[]}
          * @readonly
          */
  fieldsArray: {
    get: function get() {
      return this._fieldsArray || (this._fieldsArray = util.toArray(this.fields));
    } },


  /**
          * Oneofs of this message as an array for iteration.
          * @name Type#oneofsArray
          * @type {OneOf[]}
          * @readonly
          */
  oneofsArray: {
    get: function get() {
      return this._oneofsArray || (this._oneofsArray = util.toArray(this.oneofs));
    } },


  /**
          * The registered constructor, if any registered, otherwise a generic constructor.
          * Assigning a function replaces the internal constructor. If the function does not extend {@link Message} yet, its prototype will be setup accordingly and static methods will be populated. If it already extends {@link Message}, it will just replace the internal constructor.
          * @name Type#ctor
          * @type {Constructor<{}>}
          */
  ctor: {
    get: function get() {
      return this._ctor || (this.ctor = Type.generateConstructor(this));
    },
    set: function set(ctor) {

      // Ensure proper prototype
      var prototype = ctor.prototype;
      if (!(prototype instanceof Message)) {
        (ctor.prototype = new Message()).constructor = ctor;
        util.merge(ctor.prototype, prototype);
      }

      // Classes and messages reference their reflected type
      ctor.$type = ctor.prototype.$type = this;

      // Mix in static methods
      util.merge(ctor, Message, true);
      util.merge(ctor.prototype, Message, true);


      this._ctor = ctor;

      // Messages have non-enumerable default values on their prototype
      var i = 0;
      for (; i < /* initializes */this.fieldsArray.length; ++i) {
        this._fieldsArray[i].resolve();} // ensures a proper value

      // Messages have non-enumerable getters and setters for each virtual oneof field
      var ctorProperties = {};
      for (i = 0; i < /* initializes */this.oneofsArray.length; ++i) {
        var oneofName = this._oneofsArray[i].resolve().name;

        var oneOfGetAndSet = function (fieldNames) {
          var fieldMap = {};
          for (var i = 0; i < fieldNames.length; ++i) {
            fieldMap[fieldNames[i]] = 0;}

          return {
            setter: function setter(name) {
              if (fieldNames.indexOf(name) < 0) return;
              fieldMap[name] = 1;
              for (var i = 0; i < fieldNames.length; ++i) {
                if (fieldNames[i] !== name)
                delete this[/*"_"+*/fieldNames[i]];}
            },

            getter: function getter() {
              for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i) {
                if (fieldMap[keys[i]] === 1 && this[keys[i]] !== undefined && this[keys[i]] !== null)
                return keys[i];}
            } };


        }(this._oneofsArray[i].oneof);

        ctorProperties[oneofName] = {
          get: oneOfGetAndSet.getter,
          set: oneOfGetAndSet.setter };

        //var fieldNames = this._oneofsArray[i].oneof;
        //for (var  j = 0 ; j < fieldNames.length; j++){
        //    var fieldName = fieldNames[j];
        //    ctorProperties[fieldName] = {
        //        set : (function(oneofName, fieldName){
        //            return function (value){
        //                this[oneofName] = fieldName;
        //                this["_"+fieldName] = value;
        //            }
        //        })(oneofName , fieldName),
        //        get : (function(fieldName){
        //            return function (){
        //                return this["_"+fieldName];
        //            }
        //        })(fieldName)
        //    }
        //}
      }

      if (i) {
        //util.merge(ctor.prototype, ctorProperties, true);
        Object.defineProperties(ctor.prototype, ctorProperties);
      }
    } } });




//生成一个构造函数
Type.generateConstructor = function generateConstructor(mtype) {
  return function (p) {
    for (var i = 0, field; i < mtype.fieldsArray.length; i++) {
      if ((field = mtype._fieldsArray[i]).map) {
        this[field.name] = {};
      } else if (field.repeated) {
        this[field.name] = [];
      }
    }

    if (p) {
      for (var ks = Object.keys(p), j = 0; j < ks.length; ++j) {
        if (p[ks[j]] != null) {
          this[ks[j]] = p[ks[j]];
        }
      }
    }
  };
};


function clearCache(type) {
  type._fieldsById = type._fieldsArray = type._oneofsArray = null;
  delete type.encode;
  delete type.decode;
  delete type.verify;
  return type;
}



Type.fromJSON = function fromJSON(name, json) {
  var type = new Type(name, json.options);
  type.extensions = json.extensions;
  type.reserved = json.reserved;
  var names = Object.keys(json.fields),
  i = 0;
  for (; i < names.length; ++i) {
    type.add(
    (typeof json.fields[names[i]].keyType !== "undefined" ?
    MapField.fromJSON :
    Field.fromJSON)(names[i], json.fields[names[i]]));}

  if (json.oneofs)
  for (names = Object.keys(json.oneofs), i = 0; i < names.length; ++i) {
    type.add(OneOf.fromJSON(names[i], json.oneofs[names[i]]));}
  if (json.nested)
  for (names = Object.keys(json.nested), i = 0; i < names.length; ++i) {
    var nested = json.nested[names[i]];
    type.add( // most to least likely
    (nested.id !== undefined ?
    Field.fromJSON :
    nested.fields !== undefined ?
    Type.fromJSON :
    nested.values !== undefined ?
    Enum.fromJSON :
    nested.methods !== undefined ?
    Service.fromJSON :
    Namespace.fromJSON)(names[i], nested));

  }
  if (json.extensions && json.extensions.length)
  type.extensions = json.extensions;
  if (json.reserved && json.reserved.length)
  type.reserved = json.reserved;
  if (json.group)
  type.group = true;
  if (json.comment)
  type.comment = json.comment;
  return type;
};

Type.prototype.toJSON = function toJSON(toJSONOptions) {
  var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
  var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;

  return {
    "options": inherited && inherited.options || undefined,
    "oneofs": Namespace.arrayToJSON(this.oneofsArray, toJSONOptions),
    "fields": Namespace.arrayToJSON(this.fieldsArray.filter(function (obj) {return !obj.declaringField;}), toJSONOptions) || {},
    "extensions": this.extensions && this.extensions.length ? this.extensions : undefined,
    "reserved": this.reserved && this.reserved.length ? this.reserved : undefined,
    "group": this.group || undefined,
    "nested": inherited && inherited.nested || undefined,
    "comment": keepComments ? this.comment : undefined };

};

Type.prototype.resolveAll = function resolveAll() {
  var fields = this.fieldsArray,i = 0;
  while (i < fields.length) {
    fields[i++].resolve();}
  var oneofs = this.oneofsArray;i = 0;
  while (i < oneofs.length) {
    oneofs[i++].resolve();}
  return Namespace.prototype.resolveAll.call(this);
};

Type.prototype.get = function get(name) {
  return this.fields[name] ||
  this.oneofs && this.oneofs[name] ||
  this.nested && this.nested[name] ||
  null;
};

Type.prototype.add = function add(object) {

  if (this.get(object.name))
  throw Error("duplicate name '" + object.name + "' in " + this);

  if (object instanceof Field && object.extend === undefined) {
    if (this._fieldsById && this._fieldsById[object.id])
    throw Error("duplicate id " + object.id + " in " + this);
    if (this.isReservedId(object.id))
    throw Error("id " + object.id + " is reserved in " + this);
    if (this.isReservedName(object.name))
    throw Error("name '" + object.name + "' is reserved in " + this);

    if (object.parent)
    object.parent.remove(object);
    this.fields[object.name] = object;
    object.message = this;
    object.onAdd(this);
    return clearCache(this);
  }
  if (object instanceof OneOf) {
    if (!this.oneofs)
    this.oneofs = {};
    this.oneofs[object.name] = object;
    object.onAdd(this);
    return clearCache(this);
  }
  return Namespace.prototype.add.call(this, object);
};

Type.prototype.remove = function remove(object) {
  if (object instanceof Field && object.extend === undefined) {
    // See Type#add for the reason why extension fields are excluded here.

    /* istanbul ignore if */
    if (!this.fields || this.fields[object.name] !== object)
    throw Error(object + " is not a member of " + this);

    delete this.fields[object.name];
    object.parent = null;
    object.onRemove(this);
    return clearCache(this);
  }
  if (object instanceof OneOf) {

    /* istanbul ignore if */
    if (!this.oneofs || this.oneofs[object.name] !== object)
    throw Error(object + " is not a member of " + this);

    delete this.oneofs[object.name];
    object.parent = null;
    object.onRemove(this);
    return clearCache(this);
  }
  return Namespace.prototype.remove.call(this, object);
};

Type.prototype.isReservedId = function isReservedId(id) {
  return Namespace.isReservedId(this.reserved, id);
};

Type.prototype.isReservedName = function isReservedName(name) {
  return Namespace.isReservedName(this.reserved, name);
};

Type.prototype.create = function create(properties) {
  return new this.ctor(properties);
};


Type.prototype.setup = function setup() {
  // Sets up everything at once so that the prototype chain does not have to be re-evaluated
  // multiple times (V8, soft-deopt prototype-check).

  var fullName = this.fullName,
  types = [];
  for (var i = 0; i < /* initializes */this.fieldsArray.length; ++i) {
    types.push(this._fieldsArray[i].resolve().resolvedType);}

  // Replace setup methods with type-specific generated functions
  this.encode = encoder(this)({
    Writer: Writer,
    types: types,
    util: util });



  this.decode = decoder(this)({
    Reader: Reader,
    types: types,
    util: util });

  this.verify = verifier(this)({
    types: types,
    util: util });


  this.fromObject = converter.fromObject(this)({
    types: types,
    util: util });

  this.toObject = converter.toObject(this)({
    types: types,
    util: util });


  // Inject custom wrappers for common types
  var wrapper = wrappers[fullName];
  if (wrapper) {
    var originalThis = Object.create(this);
    // if (wrapper.fromObject) {
    originalThis.fromObject = this.fromObject;
    this.fromObject = wrapper.fromObject.bind(originalThis);
    // }
    // if (wrapper.toObject) {
    originalThis.toObject = this.toObject;
    this.toObject = wrapper.toObject.bind(originalThis);
    // }
  }

  return this;
};

/**
    * Encodes a message of this type. Does not implicitly {@link Type#verify|verify} messages.
    * @param {Message<{}>|Object.<string,*>} message Message instance or plain object
    * @param {Writer} [writer] Writer to encode to
    * @returns {Writer} writer
    */

Type.prototype.encode = function encode_setup(message, writer) {
  return this.setup().encode(message, writer); // overrides this method
};

/**
    * Encodes a message of this type preceeded by its byte length as a varint. Does not implicitly {@link Type#verify|verify} messages.
    * @param {Message<{}>|Object.<string,*>} message Message instance or plain object
    * @param {Writer} [writer] Writer to encode to
    * @returns {Writer} writer
    */
Type.prototype.encodeDelimited = function encodeDelimited(message, writer) {
  return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
};

/**
    * Decodes a message of this type.
    * @param {Reader|Uint8Array|ArrayBuffer} reader Reader or buffer to decode from
    * @param {number} [length] Length of the message, if known beforehand
    * @returns {Message<{}>} Decoded message
    * @throws {Error} If the payload is not a reader or valid buffer
    */

Type.prototype.decode = function decode_setup(reader, length) {
  return this.setup().decode(reader, length); // overrides this method
};
/**
    * Decodes a message of this type preceeded by its byte length as a varint.
    * @param {Reader|Uint8Array} reader Reader or buffer to decode from
    * @returns {Message<{}>} Decoded message
    * @throws {Error} If the payload is not a reader or valid buffer
    * @throws {util.ProtocolError} If required fields are missing
    */
Type.prototype.decodeDelimited = function decodeDelimited(reader) {
  if (!(reader instanceof Reader))
  reader = Reader.create(reader);
  return this.decode(reader, reader.uint32());
};

/**
    * Verifies that field values are valid and that required fields are present.
    * @param {Object.<string,*>} message Plain object to verify
    * @returns {null|string} `null` if valid, otherwise the reason why it is not
    */

Type.prototype.verify = function verify_setup(message) {
  return this.setup().verify(message); // overrides this method
};

/**
    * Creates a new message of this type from a plain object. Also converts values to their respective internal types.
    * @param {Object.<string,*>} object Plain object to convert
    * @returns {Message<{}>} Message instance
    */
Type.prototype.fromObject = function fromObject(object) {
  return this.setup().fromObject(object);
};

/**
    * Conversion options as used by {@link Type#toObject} and {@link Message.toObject}.
    * @interface IConversionOptions
    * @property {Function} [longs] Long conversion type.
    * Valid values are `String` and `Number` (the global types).
    * Defaults to copy the present value, which is a possibly unsafe number without and a {@link Long} with a long library.
    * @property {Function} [enums] Enum value conversion type.
    * Only valid value is `String` (the global type).
    * Defaults to copy the present value, which is the numeric id.
    * @property {Function} [bytes] Bytes value conversion type.
    * Valid values are `Array` and (a base64 encoded) `String` (the global types).
    * Defaults to copy the present value, which usually is a Buffer under node and an Uint8Array in the browser.
    * @property {boolean} [defaults=false] Also sets default values on the resulting object
    * @property {boolean} [arrays=false] Sets empty arrays for missing repeated fields even if `defaults=false`
    * @property {boolean} [objects=false] Sets empty objects for missing map fields even if `defaults=false`
    * @property {boolean} [oneofs=false] Includes virtual oneof properties set to the present field's name, if any
    * @property {boolean} [json=false] Performs additional JSON compatibility conversions, i.e. NaN and Infinity to strings
    */

/**
        * Creates a plain object from a message of this type. Also converts values to other types if specified.
        * @param {Message<{}>} message Message instance
        * @param {IConversionOptions} [options] Conversion options
        * @returns {Object.<string,*>} Plain object
        */
Type.prototype.toObject = function toObject(message, options) {
  return this.setup().toObject(message, options);
};

Type.d = function decorateType(typeName) {
  return function typeDecorator(target) {
    util.decorateType(target, typeName);
  };
};

Type._configure = function () {
  Enum = __webpack_require__(/*! ./enum */ 43);
  Field = __webpack_require__(/*! ./field */ 42);
  Message = __webpack_require__(/*! ./message */ 53);
  OneOf = __webpack_require__(/*! ./oneof */ 45);
  Writer = __webpack_require__(/*! ./writer */ 26);
  Reader = __webpack_require__(/*! ./reader */ 54);
  util = __webpack_require__(/*! ./util */ 27);
  verifier = __webpack_require__(/*! ./verifier */ 55);
  encoder = __webpack_require__(/*! ./encoder */ 56);
  decoder = __webpack_require__(/*! ./decoder */ 57);
  Service = __webpack_require__(/*! ./service */ 49);
  wrappers = __webpack_require__(/*! ./wrappers */ 58);
  converter = __webpack_require__(/*! ./converter */ 59);
  MapField = __webpack_require__(/*! ./mapField */ 48);

};

/***/ }),
/* 39 */
/*!****************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/namespace.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


module.exports = Namespace;

// extends ReflectionObject
var ReflectionObject = __webpack_require__(/*! ./object */ 40);
((Namespace.prototype = Object.create(ReflectionObject.prototype)).constructor = Namespace).className = "Namespace";

var Enum,
Field,
util;

var Type; // cyclic
var Service;

/**
              * Constructs a new namespace instance.
              * @name Namespace
              * @classdesc Reflected namespace.
              * @extends NamespaceBase
              * @constructor
              * @param {string} name Namespace name
              * @param {Object.<string,*>} [options] Declared options
              */

/**
                  * Constructs a namespace from JSON.
                  * @memberof Namespace
                  * @function
                  * @param {string} name Namespace name
                  * @param {Object.<string,*>} json JSON object
                  * @returns {Namespace} Created namespace
                  * @throws {TypeError} If arguments are invalid
                  */
Namespace.fromJSON = function fromJSON(name, json) {
  return new Namespace(name, json.options).addJSON(json.nested);
};

/**
    * Converts an array of reflection objects to JSON.
    * @memberof Namespace
    * @param {ReflectionObject[]} array Object array
    * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
    * @returns {Object.<string,*>|undefined} JSON object or `undefined` when array is empty
    */
function arrayToJSON(array, toJSONOptions) {
  if (!(array && array.length))
  return undefined;
  var obj = {};
  for (var i = 0; i < array.length; ++i) {
    obj[array[i].name] = array[i].toJSON(toJSONOptions);}
  return obj;
}

Namespace.arrayToJSON = arrayToJSON;

/**
                                      * Tests if the specified id is reserved.
                                      * @param {Array.<number[]|string>|undefined} reserved Array of reserved ranges and names
                                      * @param {number} id Id to test
                                      * @returns {boolean} `true` if reserved, otherwise `false`
                                      */
Namespace.isReservedId = function isReservedId(reserved, id) {
  if (reserved)
  for (var i = 0; i < reserved.length; ++i) {
    if (typeof reserved[i] !== "string" && reserved[i][0] <= id && reserved[i][1] >= id)
    return true;}
  return false;
};

/**
    * Tests if the specified name is reserved.
    * @param {Array.<number[]|string>|undefined} reserved Array of reserved ranges and names
    * @param {string} name Name to test
    * @returns {boolean} `true` if reserved, otherwise `false`
    */
Namespace.isReservedName = function isReservedName(reserved, name) {
  if (reserved)
  for (var i = 0; i < reserved.length; ++i) {
    if (reserved[i] === name)
    return true;}
  return false;
};

/**
    * Not an actual constructor. Use {@link Namespace} instead.
    * @classdesc Base class of all reflection objects containing nested objects. This is not an actual class but here for the sake of having consistent type definitions.
    * @exports NamespaceBase
    * @extends ReflectionObject
    * @abstract
    * @constructor
    * @param {string} name Namespace name
    * @param {Object.<string,*>} [options] Declared options
    * @see {@link Namespace}
    */
function Namespace(name, options) {
  ReflectionObject.call(this, name, options);

  /**
                                               * Nested objects by name.
                                               * @type {Object.<string,ReflectionObject>|undefined}
                                               */
  this.nested = undefined; // toJSON

  /**
   * Cached nested objects as an array.
   * @type {ReflectionObject[]|null}
   * @private
   */
  this._nestedArray = null;
}

function clearCache(namespace) {
  namespace._nestedArray = null;
  return namespace;
}

/**
   * Nested objects of this namespace as an array for iteration.
   * @name NamespaceBase#nestedArray
   * @type {ReflectionObject[]}
   * @readonly
   */
Object.defineProperty(Namespace.prototype, "nestedArray", {
  get: function get() {
    return this._nestedArray || (this._nestedArray = util.toArray(this.nested));
  } });


/**
         * Namespace descriptor.
         * @interface INamespace
         * @property {Object.<string,*>} [options] Namespace options
         * @property {Object.<string,AnyNestedObject>} [nested] Nested object descriptors
         */

/**
             * Any extension field descriptor.
             * @typedef AnyExtensionField
             * @type {IExtensionField|IExtensionMapField}
             */

/**
                 * Any nested object descriptor.
                 * @typedef AnyNestedObject
                 * @type {IEnum|IType|IService|AnyExtensionField|INamespace}
                 */
// ^ BEWARE: VSCode hangs forever when using more than 5 types (that's why AnyExtensionField exists in the first place)

/**
 * Converts this namespace to a namespace descriptor.
 * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
 * @returns {INamespace} Namespace descriptor
 */
Namespace.prototype.toJSON = function toJSON(toJSONOptions) {
  return util.toObject([
  "options", this.options,
  "nested", arrayToJSON(this.nestedArray, toJSONOptions)]);

};

/**
    * Adds nested objects to this namespace from nested object descriptors.
    * @param {Object.<string,AnyNestedObject>} nestedJson Any nested object descriptors
    * @returns {Namespace} `this`
    */
Namespace.prototype.addJSON = function addJSON(nestedJson) {
  var ns = this;
  /* istanbul ignore else */
  if (nestedJson) {
    for (var names = Object.keys(nestedJson), i = 0, nested; i < names.length; ++i) {
      nested = nestedJson[names[i]];
      ns.add( // most to least likely
      (nested.fields !== undefined ?
      Type.fromJSON :
      nested.values !== undefined ?
      Enum.fromJSON :
      nested.methods !== undefined ?
      Service.fromJSON :
      nested.id !== undefined ?
      Field.fromJSON :
      Namespace.fromJSON)(names[i], nested));

    }
  }
  return this;
};

/**
    * Gets the nested object of the specified name.
    * @param {string} name Nested object name
    * @returns {ReflectionObject|null} The reflection object or `null` if it doesn't exist
    */
Namespace.prototype.get = function get(name) {
  return this.nested && this.nested[name] ||
  null;
};

/**
    * Gets the values of the nested {@link Enum|enum} of the specified name.
    * This methods differs from {@link Namespace#get|get} in that it returns an enum's values directly and throws instead of returning `null`.
    * @param {string} name Nested enum name
    * @returns {Object.<string,number>} Enum values
    * @throws {Error} If there is no such enum
    */
Namespace.prototype.getEnum = function getEnum(name) {
  if (this.nested && this.nested[name] instanceof Enum)
  return this.nested[name].values;
  throw Error("no such enum: " + name);
};

/**
    * Adds a nested object to this namespace.
    * @param {ReflectionObject} object Nested object to add
    * @returns {Namespace} `this`
    * @throws {TypeError} If arguments are invalid
    * @throws {Error} If there is already a nested object with this name
    */
Namespace.prototype.add = function add(object) {

  if (!(object instanceof Field && object.extend !== undefined || object instanceof Type || object instanceof Enum || object instanceof Service || object instanceof Namespace))
  throw TypeError("object must be a valid nested object");

  if (!this.nested)
  this.nested = {};else
  {
    var prev = this.get(object.name);
    if (prev) {
      if (prev instanceof Namespace && object instanceof Namespace && !(prev instanceof Type || prev instanceof Service)) {
        // replace plain namespace but keep existing nested elements and options
        var nested = prev.nestedArray;
        for (var i = 0; i < nested.length; ++i) {
          object.add(nested[i]);}
        this.remove(prev);
        if (!this.nested)
        this.nested = {};
        object.setOptions(prev.options, true);

      } else
      throw Error("duplicate name '" + object.name + "' in " + this);
    }
  }
  this.nested[object.name] = object;
  object.onAdd(this);
  return clearCache(this);
};

/**
    * Removes a nested object from this namespace.
    * @param {ReflectionObject} object Nested object to remove
    * @returns {Namespace} `this`
    * @throws {TypeError} If arguments are invalid
    * @throws {Error} If `object` is not a member of this namespace
    */
Namespace.prototype.remove = function remove(object) {

  if (!(object instanceof ReflectionObject))
  throw TypeError("object must be a ReflectionObject");
  if (object.parent !== this)
  throw Error(object + " is not a member of " + this);

  delete this.nested[object.name];
  if (!Object.keys(this.nested).length)
  this.nested = undefined;

  object.onRemove(this);
  return clearCache(this);
};

/**
    * Defines additial namespaces within this one if not yet existing.
    * @param {string|string[]} path Path to create
    * @param {*} [json] Nested types to create from JSON
    * @returns {Namespace} Pointer to the last namespace created or `this` if path is empty
    */
Namespace.prototype.define = function define(path, json) {

  if (util.isString(path))
  path = path.split(".");else
  if (!Array.isArray(path))
  throw TypeError("illegal path");
  if (path && path.length && path[0] === "")
  throw Error("path must be relative");

  var ptr = this;
  while (path.length > 0) {
    var part = path.shift();
    if (ptr.nested && ptr.nested[part]) {
      ptr = ptr.nested[part];
      if (!(ptr instanceof Namespace))
      throw Error("path conflicts with non-namespace objects");
    } else
    ptr.add(ptr = new Namespace(part));
  }
  if (json)
  ptr.addJSON(json);
  return ptr;
};

/**
    * Resolves this namespace's and all its nested objects' type references. Useful to validate a reflection tree, but comes at a cost.
    * @returns {Namespace} `this`
    */
Namespace.prototype.resolveAll = function resolveAll() {
  var nested = this.nestedArray,i = 0;
  while (i < nested.length) {
    if (nested[i] instanceof Namespace)
    nested[i++].resolveAll();else

    nested[i++].resolve();}
  return this.resolve();
};

/**
    * Recursively looks up the reflection object matching the specified path in the scope of this namespace.
    * @param {string|string[]} path Path to look up
    * @param {*|Array.<*>} filterTypes Filter types, any combination of the constructors of `protobuf.Type`, `protobuf.Enum`, `protobuf.Service` etc.
    * @param {boolean} [parentAlreadyChecked=false] If known, whether the parent has already been checked
    * @returns {ReflectionObject|null} Looked up object or `null` if none could be found
    */
Namespace.prototype.lookup = function lookup(path, filterTypes, parentAlreadyChecked) {

  /* istanbul ignore next */
  if (typeof filterTypes === "boolean") {
    parentAlreadyChecked = filterTypes;
    filterTypes = undefined;
  } else if (filterTypes && !Array.isArray(filterTypes))
  filterTypes = [filterTypes];

  if (util.isString(path) && path.length) {
    if (path === ".")
    return this.root;
    path = path.split(".");
  } else if (!path.length)
  return this;

  // Start at root if path is absolute
  if (path[0] === "")
  return this.root.lookup(path.slice(1), filterTypes);

  // Test if the first part matches any nested object, and if so, traverse if path contains more
  var found = this.get(path[0]);
  if (found) {
    if (path.length === 1) {
      if (!filterTypes || filterTypes.indexOf(found.constructor) > -1)
      return found;
    } else if (found instanceof Namespace && (found = found.lookup(path.slice(1), filterTypes, true)))
    return found;

    // Otherwise try each nested namespace
  } else
  for (var i = 0; i < this.nestedArray.length; ++i) {
    if (this._nestedArray[i] instanceof Namespace && (found = this._nestedArray[i].lookup(path, filterTypes, true)))
    return found;}

  // If there hasn't been a match, try again at the parent
  if (this.parent === null || parentAlreadyChecked)
  return null;
  return this.parent.lookup(path, filterTypes);
};

/**
    * Looks up the reflection object at the specified path, relative to this namespace.
    * @name NamespaceBase#lookup
    * @function
    * @param {string|string[]} path Path to look up
    * @param {boolean} [parentAlreadyChecked=false] Whether the parent has already been checked
    * @returns {ReflectionObject|null} Looked up object or `null` if none could be found
    * @variation 2
    */
// lookup(path: string, [parentAlreadyChecked: boolean])

/**
 * Looks up the {@link Type|type} at the specified path, relative to this namespace.
 * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
 * @param {string|string[]} path Path to look up
 * @returns {Type} Looked up type
 * @throws {Error} If `path` does not point to a type
 */
Namespace.prototype.lookupType = function lookupType(path) {
  var found = this.lookup(path, [Type]);
  if (!found)
  throw Error("no such type: " + path);
  return found;
};

/**
    * Looks up the values of the {@link Enum|enum} at the specified path, relative to this namespace.
    * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
    * @param {string|string[]} path Path to look up
    * @returns {Enum} Looked up enum
    * @throws {Error} If `path` does not point to an enum
    */
Namespace.prototype.lookupEnum = function lookupEnum(path) {
  var found = this.lookup(path, [Enum]);
  if (!found)
  throw Error("no such Enum '" + path + "' in " + this);
  return found;
};

/**
    * Looks up the {@link Type|type} or {@link Enum|enum} at the specified path, relative to this namespace.
    * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
    * @param {string|string[]} path Path to look up
    * @returns {Type} Looked up type or enum
    * @throws {Error} If `path` does not point to a type or enum
    */
Namespace.prototype.lookupTypeOrEnum = function lookupTypeOrEnum(path) {
  var found = this.lookup(path, [Type, Enum]);
  if (!found)
  throw Error("no such Type or Enum '" + path + "' in " + this);
  return found;
};

/**
    * Looks up the {@link Service|service} at the specified path, relative to this namespace.
    * Besides its signature, this methods differs from {@link Namespace#lookup|lookup} in that it throws instead of returning `null`.
    * @param {string|string[]} path Path to look up
    * @returns {Service} Looked up service
    * @throws {Error} If `path` does not point to a service
    */
Namespace.prototype.lookupService = function lookupService(path) {
  var found = this.lookup(path, [Service]);
  if (!found)
  throw Error("no such Service '" + path + "' in " + this);
  return found;
};

Namespace._configure = function () {
  Enum = __webpack_require__(/*! ./enum */ 43);
  Field = __webpack_require__(/*! ./field */ 42);
  util = __webpack_require__(/*! ./util */ 27);

  Type = __webpack_require__(/*! ./type */ 38); // cyclic
  Service = __webpack_require__(/*! ./service */ 49);
};

/***/ }),
/* 40 */
/*!*************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/object.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = ReflectionObject;

ReflectionObject.className = "ReflectionObject";
var util;

var Root; // cyclic

/**
 * Constructs a new reflection object instance.
 * @classdesc Base class of all reflection objects.
 * @constructor
 * @param {string} name Object name
 * @param {Object.<string,*>} [options] Declared options
 * @abstract
 */
function ReflectionObject(name, options) {

  if (!util.isString(name))
  throw TypeError("name must be a string");

  if (options && !util.isObject(options))
  throw TypeError("options must be an object");

  /**
                                                 * Options.
                                                 * @type {Object.<string,*>|undefined}
                                                 */
  this.options = options; // toJSON

  /**
   * Unique name within its namespace.
   * @type {string}
   */
  this.name = name;

  /**
                     * Parent namespace.
                     * @type {Namespace|null}
                     */
  this.parent = null;

  /**
                       * Whether already resolved or not.
                       * @type {boolean}
                       */
  this.resolved = false;

  /**
                          * Comment text, if any.
                          * @type {string|null}
                          */
  this.comment = null;

  /**
                        * Defining file name.
                        * @type {string|null}
                        */
  this.filename = null;
}

Object.defineProperties(ReflectionObject.prototype, {

  /**
                                                       * Reference to the root namespace.
                                                       * @name ReflectionObject#root
                                                       * @type {Root}
                                                       * @readonly
                                                       */
  root: {
    get: function get() {
      var ptr = this;
      while (ptr.parent !== null) {
        ptr = ptr.parent;}
      return ptr;
    } },


  /**
          * Full name including leading dot.
          * @name ReflectionObject#fullName
          * @type {string}
          * @readonly
          */
  fullName: {
    get: function get() {
      var path = [this.name],
      ptr = this.parent;
      while (ptr) {
        path.unshift(ptr.name);
        ptr = ptr.parent;
      }
      return path.join(".");
    } } });



/**
             * Converts this reflection object to its descriptor representation.
             * @returns {Object.<string,*>} Descriptor
             * @abstract
             */
ReflectionObject.prototype.toJSON = /* istanbul ignore next */function toJSON() {
  throw Error(); // not implemented, shouldn't happen
};

/**
    * Called when this object is added to a parent.
    * @param {ReflectionObject} parent Parent added to
    * @returns {undefined}
    */
ReflectionObject.prototype.onAdd = function onAdd(parent) {
  if (this.parent && this.parent !== parent)
  this.parent.remove(this);
  this.parent = parent;
  this.resolved = false;
  var root = parent.root;
  if (root instanceof Root)
  root._handleAdd(this);
};

/**
    * Called when this object is removed from a parent.
    * @param {ReflectionObject} parent Parent removed from
    * @returns {undefined}
    */
ReflectionObject.prototype.onRemove = function onRemove(parent) {
  var root = parent.root;
  if (root instanceof Root)
  root._handleRemove(this);
  this.parent = null;
  this.resolved = false;
};

/**
    * Resolves this objects type references.
    * @returns {ReflectionObject} `this`
    */
ReflectionObject.prototype.resolve = function resolve() {
  if (this.resolved)
  return this;
  if (this.root instanceof Root)
  this.resolved = true; // only if part of a root
  return this;
};

/**
    * Gets an option value.
    * @param {string} name Option name
    * @returns {*} Option value or `undefined` if not set
    */
ReflectionObject.prototype.getOption = function getOption(name) {
  if (this.options)
  return this.options[name];
  return undefined;
};

/**
    * Sets an option.
    * @param {string} name Option name
    * @param {*} value Option value
    * @param {boolean} [ifNotSet] Sets the option only if it isn't currently set
    * @returns {ReflectionObject} `this`
    */
ReflectionObject.prototype.setOption = function setOption(name, value, ifNotSet) {
  if (!ifNotSet || !this.options || this.options[name] === undefined)
  (this.options || (this.options = {}))[name] = value;
  return this;
};

/**
    * Sets multiple options.
    * @param {Object.<string,*>} options Options to set
    * @param {boolean} [ifNotSet] Sets an option only if it isn't currently set
    * @returns {ReflectionObject} `this`
    */
ReflectionObject.prototype.setOptions = function setOptions(options, ifNotSet) {
  if (options)
  for (var keys = Object.keys(options), i = 0; i < keys.length; ++i) {
    this.setOption(keys[i], options[keys[i]], ifNotSet);}
  return this;
};

/**
    * Converts this instance to its string representation.
    * @returns {string} Class name[, space, full name]
    */
ReflectionObject.prototype.toString = function toString() {
  var className = this.constructor.className,
  fullName = this.fullName;
  if (fullName.length)
  return className + " " + fullName;
  return className;
};

ReflectionObject._configure = function (Root_) {
  Root = __webpack_require__(/*! ./root */ 41);
  util = __webpack_require__(/*! ./util */ 27);
};

/***/ }),
/* 41 */
/*!***********************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/root.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = Root;

// extends Namespace
var Namespace = __webpack_require__(/*! ./namespace */ 39);
((Root.prototype = Object.create(Namespace.prototype)).constructor = Root).className = "Root";

var Field = __webpack_require__(/*! ./field */ 42),
Enum = __webpack_require__(/*! ./enum */ 43),
OneOf = __webpack_require__(/*! ./oneof */ 45),
util = __webpack_require__(/*! ./util */ 27);

var Type, // cyclic
parse, // might be excluded
common; // "

/**
 * Constructs a new root namespace instance.
 * @classdesc Root namespace wrapping all types, enums, services, sub-namespaces etc. that belong together.
 * @extends NamespaceBase
 * @constructor
 * @param {Object.<string,*>} [options] Top level options
 */
function Root(options) {
  Namespace.call(this, "", options);

  /**
                                      * Deferred extension fields.
                                      * @type {Field[]}
                                      */
  this.deferred = [];

  /**
                       * Resolved file names of loaded files.
                       * @type {string[]}
                       */
  this.files = [];

  /**
                    * Resolved name of parsered pbString.
                    * @type {string[]}
                    */
  this.names = [];
}

/**
   * Loads a namespace descriptor into a root namespace.
   * @param {INamespace} json Nameespace descriptor
   * @param {Root} [root] Root namespace, defaults to create a new one if omitted
   * @returns {Root} Root namespace
   */
Root.fromJSON = function fromJSON(json, root) {
  json = typeof json === 'string' ? JSON.parse(json) : json;
  if (!root)
  root = new Root();
  if (json.options)
  root.setOptions(json.options);
  return root.addJSON(json.nested);
};

/**
    * Resolves the path of an imported file, relative to the importing origin.
    * This method exists so you can override it with your own logic in case your imports are scattered over multiple directories.
    * @function
    * @param {string} origin The file name of the importing file
    * @param {string} target The file name being imported
    * @returns {string|null} Resolved path to `target` or `null` to skip the file
    */
Root.prototype.resolvePath = util.path.resolve;

// A symbol-like function to safely signal synchronous loading
/* istanbul ignore next */
function SYNC() {} // eslint-disable-line no-empty-function

function parseFromPbString(pbString, options, callback) {

  if (typeof options === "function") {
    callback = options;
    options = undefined;
  }
  var self = this;
  if (!callback) {
    return util.asPromise(parseFromPbString, self, pbString, options);
  }

  var pbObj = null;
  if (typeof pbString === 'string') {
    pbObj = JSON.parse(pbString);
  } else if (typeof pbString === 'object') {
    pbObj = pbString;
  } else {
    //throw Error("pb格式转化失败");
    console.log("pb格式转化失败");
    return undefined;
  }

  var name = pbObj['name'];
  var pbJsonStr = pbObj['pbJsonStr'];

  function finish(err, root) {
    if (!callback)
    return;
    var cb = callback;
    callback = null;
    cb(err, root);
  }

  function process(name, source) {
    try {
      if (util.isString(source) && source.charAt(0) === "{")
      source = JSON.parse(source);
      if (!util.isString(source))
      self.setOptions(source.options).addJSON(source.nested);else
      {
        parse.filename = name;
        var parsed = parse(source, self, options),
        resolved;
        var i = 0;
        if (parsed.imports) {
          for (; i < parsed.imports.length; ++i) {
            resolved = parsed.imports[i];
            fetch(resolved);
          }
        }
        if (parsed.weakImports) {
          for (i = 0; i < parsed.weakImports.length; ++i) {
            resolved = parsed.weakImports[i];}
          fetch(resolved, true);
        }
      }
    } catch (err) {
      finish(err);
    }

    finish(null, self); // only once anyway
  }

  function fetch(name) {
    if (self.names.indexOf(name) > -1)
    return;
    self.names.push(name);
    if (name in common) {
      process(name, common[name]);
    }
  }

  process(name, pbJsonStr);
  return undefined;
}

Root.prototype.parseFromPbString = parseFromPbString;

/**
                                                       * Loads one or multiple .proto or preprocessed .json files into this root namespace and calls the callback.
                                                       * @param {string|string[]} filename Names of one or multiple files to load
                                                       * @param {IParseOptions} options Parse options
                                                       * @param {LoadCallback} callback Callback function
                                                       * @returns {undefined}
                                                       */
Root.prototype.load = function load(filename, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = undefined;
  }
  var self = this;
  if (!callback)
  return util.asPromise(load, self, filename, options);

  var sync = callback === SYNC; // undocumented

  // Finishes loading by calling the callback (exactly once)
  function finish(err, root) {
    /* istanbul ignore if */
    if (!callback)
    return;
    var cb = callback;
    callback = null;
    if (sync)
    throw err;
    cb(err, root);
  }

  // Processes a single file
  function process(filename, source) {
    try {
      if (util.isString(source) && source.charAt(0) === "{")
      source = JSON.parse(source);
      if (!util.isString(source))
      self.setOptions(source.options).addJSON(source.nested);else
      {
        parse.filename = filename;
        var parsed = parse(source, self, options),
        resolved,
        i = 0;
        if (parsed.imports)
        for (; i < parsed.imports.length; ++i) {
          if (resolved = self.resolvePath(filename, parsed.imports[i]))
          fetch(resolved);}
        if (parsed.weakImports)
        for (i = 0; i < parsed.weakImports.length; ++i) {
          if (resolved = self.resolvePath(filename, parsed.weakImports[i]))
          fetch(resolved, true);}
      }
    } catch (err) {
      finish(err);
    }
    if (!sync && !queued)
    finish(null, self); // only once anyway
  }

  // Fetches a single file
  function fetch(filename, weak) {

    // Strip path if this file references a bundled definition
    var idx = filename.lastIndexOf("google/protobuf/");
    if (idx > -1) {
      var altname = filename.substring(idx);
      if (altname in common)
      filename = altname;
    }

    // Skip if already loaded / attempted
    if (self.files.indexOf(filename) > -1)
    return;
    self.files.push(filename);

    // Shortcut bundled definitions
    if (filename in common) {
      if (sync)
      process(filename, common[filename]);else
      {
        ++queued;
        setTimeout(function () {
          --queued;
          process(filename, common[filename]);
        });
      }
      return;
    }

    // Otherwise fetch from disk or network
    if (sync) {
      var source;
      try {
        source = util.fs.readFileSync(filename).toString("utf8");
      } catch (err) {
        if (!weak)
        finish(err);
        return;
      }
      process(filename, source);
    } else {
      ++queued;
      util.fetch(filename, function (err, source) {
        --queued;
        /* istanbul ignore if */
        if (!callback)
        return; // terminated meanwhile
        if (err) {
          /* istanbul ignore else */
          if (!weak)
          finish(err);else
          if (!queued) // can't be covered reliably
            finish(null, self);
          return;
        }
        process(filename, source);
      });
    }
  }
  var queued = 0;

  // Assembling the root namespace doesn't require working type
  // references anymore, so we can load everything in parallel
  if (util.isString(filename))
  filename = [filename];
  for (var i = 0, resolved; i < filename.length; ++i) {
    if (resolved = self.resolvePath("", filename[i]))
    fetch(resolved);}

  if (sync)
  return self;
  if (!queued)
  finish(null, self);
  return undefined;
};
// function load(filename:string, options:IParseOptions, callback:LoadCallback):undefined

/**
 * Loads one or multiple .proto or preprocessed .json files into this root namespace and calls the callback.
 * @function Root#load
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {LoadCallback} callback Callback function
 * @returns {undefined}
 * @variation 2
 */
// function load(filename:string, callback:LoadCallback):undefined

/**
 * Loads one or multiple .proto or preprocessed .json files into this root namespace and returns a promise.
 * @function Root#load
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {Promise<Root>} Promise
 * @variation 3
 */
// function load(filename:string, [options:IParseOptions]):Promise<Root>

/**
 * Synchronously loads one or multiple .proto or preprocessed .json files into this root namespace (node only).
 * @function Root#loadSync
 * @param {string|string[]} filename Names of one or multiple files to load
 * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
 * @returns {Root} Root namespace
 * @throws {Error} If synchronous fetching is not supported (i.e. in browsers) or if a file's syntax is invalid
 */
Root.prototype.loadSync = function loadSync(filename, options) {
  if (!util.isNode)
  throw Error("not supported");
  return this.load(filename, options, SYNC);
};

/**
    * @override
    */
Root.prototype.resolveAll = function resolveAll() {
  if (this.deferred.length)
  throw Error("unresolvable extensions: " + this.deferred.map(function (field) {
    return "'extend " + field.extend + "' in " + field.parent.fullName;
  }).join(", "));
  return Namespace.prototype.resolveAll.call(this);
};

// only uppercased (and thus conflict-free) children are exposed, see below
var exposeRe = /^[A-Z]/;

/**
                          * Handles a deferred declaring extension field by creating a sister field to represent it within its extended type.
                          * @param {Root} root Root instance
                          * @param {Field} field Declaring extension field witin the declaring type
                          * @returns {boolean} `true` if successfully added to the extended type, `false` otherwise
                          * @inner
                          * @ignore
                          */
function tryHandleExtension(root, field) {
  var extendedType = field.parent.lookup(field.extend);
  if (extendedType) {
    var sisterField = new Field(field.fullName, field.id, field.type, field.rule, undefined, field.options);
    sisterField.declaringField = field;
    field.extensionField = sisterField;
    extendedType.add(sisterField);
    return true;
  }
  return false;
}

/**
   * Called when any object is added to this root or its sub-namespaces.
   * @param {ReflectionObject} object Object added
   * @returns {undefined}
   * @private
   */
Root.prototype._handleAdd = function _handleAdd(object) {
  if (object instanceof Field) {

    if ( /* an extension field (implies not part of a oneof) */object.extend !== undefined && /* not already handled */!object.extensionField)
    if (!tryHandleExtension(this, object))
    this.deferred.push(object);

  } else if (object instanceof Enum) {

    if (exposeRe.test(object.name))
    object.parent[object.name] = object.values; // expose enum values as property of its parent

  } else if (!(object instanceof OneOf)) /* everything else is a namespace */{

      if (object instanceof Type) // Try to handle any deferred extensions
        for (var i = 0; i < this.deferred.length;) {
          if (tryHandleExtension(this, this.deferred[i]))
          this.deferred.splice(i, 1);else

          ++i;}
      for (var j = 0; j < /* initializes */object.nestedArray.length; ++j) {// recurse into the namespace
        this._handleAdd(object._nestedArray[j]);}
      if (exposeRe.test(object.name))
      object.parent[object.name] = object; // expose namespace as property of its parent
    }

  // The above also adds uppercased (and thus conflict-free) nested types, services and enums as
  // properties of namespaces just like static code does. This allows using a .d.ts generated for
  // a static module with reflection-based solutions where the condition is met.
};

/**
    * Called when any object is removed from this root or its sub-namespaces.
    * @param {ReflectionObject} object Object removed
    * @returns {undefined}
    * @private
    */
Root.prototype._handleRemove = function _handleRemove(object) {
  if (object instanceof Field) {

    if ( /* an extension field */object.extend !== undefined) {
      if ( /* already handled */object.extensionField) {// remove its sister field
        object.extensionField.parent.remove(object.extensionField);
        object.extensionField = null;
      } else {// cancel the extension
        var index = this.deferred.indexOf(object);
        /* istanbul ignore else */
        if (index > -1)
        this.deferred.splice(index, 1);
      }
    }

  } else if (object instanceof Enum) {

    if (exposeRe.test(object.name))
    delete object.parent[object.name]; // unexpose enum values

  } else if (object instanceof Namespace) {

    for (var i = 0; i < /* initializes */object.nestedArray.length; ++i) {// recurse into the namespace
      this._handleRemove(object._nestedArray[i]);}

    if (exposeRe.test(object.name))
    delete object.parent[object.name]; // unexpose namespaces

  }
};

Root._configure = function () {
  Type = __webpack_require__(/*! ./type */ 38);
  parse = __webpack_require__(/*! ./parse */ 46);
  common = __webpack_require__(/*! ./common */ 52);

  Field = __webpack_require__(/*! ./field */ 42);
  Enum = __webpack_require__(/*! ./enum */ 43);
  OneOf = __webpack_require__(/*! ./oneof */ 45);
  util = __webpack_require__(/*! ./util */ 27);
};

/***/ }),
/* 42 */
/*!************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/field.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by zhangmiao on 2018/3/12.
 */

module.exports = Field;

// extends ReflectionObject
var ReflectionObject = __webpack_require__(/*! ./object */ 40);
((Field.prototype = Object.create(ReflectionObject.prototype)).constructor = Field).className = "Field";

var Enum,
types,
util;

var Type; // cyclic

var ruleRe = /^required|optional|repeated$/;

/**
                                              * Constructs a new message field instance. Note that {@link MapField|map fields} have their own class.
                                              * @name Field
                                              * @classdesc Reflected message field.
                                              * @extends FieldBase
                                              * @constructor
                                              * @param {string} name Unique name within its namespace
                                              * @param {number} id Unique id within its namespace
                                              * @param {string} type Value type
                                              * @param {string|Object.<string,*>} [rule="optional"] Field rule
                                              * @param {string|Object.<string,*>} [extend] Extended type if different from parent
                                              * @param {Object.<string,*>} [options] Declared options
                                              */

/**
                                                  * Constructs a field from a field descriptor.
                                                  * @param {string} name Field name
                                                  * @param {IField} json Field descriptor
                                                  * @returns {Field} Created field
                                                  * @throws {TypeError} If arguments are invalid
                                                  */
Field.fromJSON = function fromJSON(name, json) {
  return new Field(name, json.id, json.type, json.rule, json.extend, json.options, json.comment);
};

/**
    * Not an actual constructor. Use {@link Field} instead.
    * @classdesc Base class of all reflected message fields. This is not an actual class but here for the sake of having consistent type definitions.
    * @exports FieldBase
    * @extends ReflectionObject
    * @constructor
    * @param {string} name Unique name within its namespace
    * @param {number} id Unique id within its namespace
    * @param {string} type Value type
    * @param {string|Object.<string,*>} [rule="optional"] Field rule
    * @param {string|Object.<string,*>} [extend] Extended type if different from parent
    * @param {Object.<string,*>} [options] Declared options
    * @param {string} [comment] Comment associated with this field
    */
function Field(name, id, type, rule, extend, options, comment) {

  if (util.isObject(rule)) {
    comment = extend;
    options = rule;
    rule = extend = undefined;
  } else if (util.isObject(extend)) {
    comment = options;
    options = extend;
    extend = undefined;
  }

  ReflectionObject.call(this, name, options);

  if (!util.isInteger(id) || id < 0)
  throw TypeError("id must be a non-negative integer");

  if (!util.isString(type))
  throw TypeError("type must be a string");

  if (rule !== undefined && !ruleRe.test(rule = rule.toString().toLowerCase()))
  throw TypeError("rule must be a string rule");

  if (extend !== undefined && !util.isString(extend))
  throw TypeError("extend must be a string");

  /**
                                               * Field rule, if any.
                                               * @type {string|undefined}
                                               */
  this.rule = rule && rule !== "optional" ? rule : undefined; // toJSON

  /**
   * Field type.
   * @type {string}
   */
  this.type = type; // toJSON

  /**
   * Unique field id.
   * @type {number}
   */
  this.id = id; // toJSON, marker

  /**
   * Extended type if different from parent.
   * @type {string|undefined}
   */
  this.extend = extend || undefined; // toJSON

  /**
   * Whether this field is required.
   * @type {boolean}
   */
  this.required = rule === "required";

  /**
                                        * Whether this field is optional.
                                        * @type {boolean}
                                        */
  this.optional = !this.required;

  /**
                                   * Whether this field is repeated.
                                   * @type {boolean}
                                   */
  this.repeated = rule === "repeated";

  /**
                                        * Whether this field is a map or not.
                                        * @type {boolean}
                                        */
  this.map = false;

  /**
                     * Message this field belongs to.
                     * @type {Type|null}
                     */
  this.message = null;

  /**
                        * OneOf this field belongs to, if any,
                        * @type {OneOf|null}
                        */
  this.partOf = null;

  /**
                       * The field type's default value.
                       * @type {*}
                       */
  this.typeDefault = null;

  /**
                            * The field's default value on prototypes.
                            * @type {*}
                            */
  this.defaultValue = null;

  /**
                             * Whether this field's value should be treated as a long.
                             * @type {boolean}
                             */
  this.long = util.Long ? types.long[type] !== undefined : /* istanbul ignore next */false;

  /**
                                                                                             * Whether this field's value is a buffer.
                                                                                             * @type {boolean}
                                                                                             */
  this.bytes = type === "bytes";

  /**
                                  * Resolved type if not a basic type.
                                  * @type {Type|Enum|null}
                                  */
  this.resolvedType = null;

  /**
                             * Sister-field within the extended type if a declaring extension field.
                             * @type {Field|null}
                             */
  this.extensionField = null;

  /**
                               * Sister-field within the declaring namespace if an extended field.
                               * @type {Field|null}
                               */
  this.declaringField = null;

  /**
                               * Internally remembers whether this field is packed.
                               * @type {boolean|null}
                               * @private
                               */
  this._packed = null;

  /**
                        * Comment for this field.
                        * @type {string|null}
                        */
  this.comment = comment;
}

/**
   * Determines whether this field is packed. Only relevant when repeated and working with proto2.
   * @name Field#packed
   * @type {boolean}
   * @readonly
   */
Object.defineProperty(Field.prototype, "packed", {
  get: function get() {
    // defaults to packed=true if not explicity set to false
    if (this._packed === null)
    this._packed = this.getOption("packed") !== false;
    return this._packed;
  } });


/**
         * @override
         */
Field.prototype.setOption = function setOption(name, value, ifNotSet) {
  if (name === "packed") // clear cached before setting
    this._packed = null;
  return ReflectionObject.prototype.setOption.call(this, name, value, ifNotSet);
};

/**
    * Field descriptor.
    * @interface IField
    * @property {string} [rule="optional"] Field rule
    * @property {string} type Field type
    * @property {number} id Field id
    * @property {Object.<string,*>} [options] Field options
    */

/**
        * Extension field descriptor.
        * @interface IExtensionField
        * @extends IField
        * @property {string} extend Extended type
        */

/**
            * Converts this field to a field descriptor.
            * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
            * @returns {IField} Field descriptor
            */
Field.prototype.toJSON = function toJSON(toJSONOptions) {
  var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
  return util.toObject([
  "rule", this.rule !== "optional" && this.rule || undefined,
  "type", this.type,
  "id", this.id,
  "extend", this.extend,
  "options", this.options,
  "comment", keepComments ? this.comment : undefined]);

};

/**
    * Resolves this field's type references.
    * @returns {Field} `this`
    * @throws {Error} If any reference cannot be resolved
    */
Field.prototype.resolve = function resolve() {

  if (this.resolved)
  return this;

  if ((this.typeDefault = types.defaults[this.type]) === undefined) {// if not a basic type, resolve it
    this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type);
    if (this.resolvedType instanceof Type)
    this.typeDefault = null;else
      // instanceof Enum
      this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]]; // first defined
  }

  // use explicitly set default value if present
  if (this.options && this.options["default"] != null) {
    this.typeDefault = this.options["default"];
    if (this.resolvedType instanceof Enum && typeof this.typeDefault === "string")
    this.typeDefault = this.resolvedType.values[this.typeDefault];
  }

  // remove unnecessary options
  if (this.options) {
    if (this.options.packed === true || this.options.packed !== undefined && this.resolvedType && !(this.resolvedType instanceof Enum))
    delete this.options.packed;
    if (!Object.keys(this.options).length)
    this.options = undefined;
  }

  // convert to internal data type if necesssary
  if (this.long) {
    this.typeDefault = util.Long.fromNumber(this.typeDefault, this.type.charAt(0) === "u");

    /* istanbul ignore else */
    if (Object.freeze)
    Object.freeze(this.typeDefault); // long instances are meant to be immutable anyway (i.e. use small int cache that even requires it)

  } else if (this.bytes && typeof this.typeDefault === "string") {
    var buf;
    //if (util.base64.test(this.typeDefault))
    //    util.base64.decode(this.typeDefault, buf = util.newBuffer(util.base64.length(this.typeDefault)), 0);
    //else
    util.utf8.write(this.typeDefault, buf = util.newBuffer(util.utf8.length(this.typeDefault)), 0);
    this.typeDefault = buf;
  }

  // take special care of maps and repeated fields
  if (this.map)
  this.defaultValue = util.emptyObject;else
  if (this.repeated)
  this.defaultValue = util.emptyArray;else

  this.defaultValue = this.typeDefault;

  // ensure proper value on prototype
  if (this.parent instanceof Type) {
    this.parent.ctor.prototype[this.name] = this.defaultValue;
  }
  return ReflectionObject.prototype.resolve.call(this);
};

/**
    * Decorator function as returned by {@link Field.d} and {@link MapField.d} (TypeScript).
    * @typedef FieldDecorator
    * @type {function}
    * @param {Object} prototype Target prototype
    * @param {string} fieldName Field name
    * @returns {undefined}
    */

/**
        * Field decorator (TypeScript).
        * @name Field.d
        * @function
        * @param {number} fieldId Field id
        * @param {"double"|"float"|"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"string"|"bool"|"bytes"|Object} fieldType Field type
        * @param {"optional"|"required"|"repeated"} [fieldRule="optional"] Field rule
        * @param {T} [defaultValue] Default value
        * @returns {FieldDecorator} Decorator function
        * @template T extends number | number[] | Long | Long[] | string | string[] | boolean | boolean[] | Uint8Array | Uint8Array[] | Buffer | Buffer[]
        */
Field.d = function decorateField(fieldId, fieldType, fieldRule, defaultValue) {

  // submessage: decorate the submessage and use its name as the type
  if (typeof fieldType === "function")
  fieldType = util.decorateType(fieldType).name;

  // enum reference: create a reflected copy of the enum and keep reuseing it
  else if (fieldType && typeof fieldType === "object")
    fieldType = util.decorateEnum(fieldType).name;

  return function fieldDecorator(prototype, fieldName) {
    util.decorateType(prototype.constructor).
    add(new Field(fieldName, fieldId, fieldType, fieldRule, { "default": defaultValue }));
  };
};

/**
    * Field decorator (TypeScript).
    * @name Field.d
    * @function
    * @param {number} fieldId Field id
    * @param {Constructor<T>|string} fieldType Field type
    * @param {"optional"|"required"|"repeated"} [fieldRule="optional"] Field rule
    * @returns {FieldDecorator} Decorator function
    * @template T extends Message<T>
    * @variation 2
    */
// like Field.d but without a default value

Field._configure = function configure() {
  Type = __webpack_require__(/*! ./type */ 38);

  Enum = __webpack_require__(/*! ./enum */ 43);
  types = __webpack_require__(/*! ./types */ 44);
  util = __webpack_require__(/*! ./util */ 27);
};

/***/ }),
/* 43 */
/*!***********************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/enum.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by zhangmiao on 2018/3/12.
 */

module.exports = Enum;

var ReflectionObject = __webpack_require__(/*! ./object */ 40);

((Enum.prototype = Object.create(ReflectionObject.prototype)).constructor = Enum).className = "Enum";
var Namespace = __webpack_require__(/*! ./namespace */ 39);

function Enum(name, values, options, comment, comments) {
  ReflectionObject.call(this, name, options);

  if (values && typeof values !== "object")
  throw TypeError("values must be an object");

  /**
                                                * Enum values by id.
                                                * @type {Object.<number,string>}
                                                */
  this.valuesById = {};

  /**
                         * Enum values by name.
                         * @type {Object.<string,number>}
                         */
  this.values = Object.create(this.valuesById); // toJSON, marker

  /**
   * Enum comment text.
   * @type {string|null}
   */
  this.comment = comment;

  /**
                           * Value comment texts, if any.
                           * @type {Object.<string,string>}
                           */
  this.comments = comments || {};

  /**
                                   * Reserved ranges, if any.
                                   * @type {Array.<number[]|string>}
                                   */
  this.reserved = undefined; // toJSON

  // Note that values inherit valuesById on their prototype which makes them a TypeScript-
  // compatible enum. This is used by pbts to write actual enum definitions that work for
  // static and reflection code alike instead of emitting generic object definitions.

  if (values)
  for (var keys = Object.keys(values), i = 0; i < keys.length; ++i) {
    if (typeof values[keys[i]] === "number") // use forward entries only
      this.valuesById[this.values[keys[i]] = values[keys[i]]] = keys[i];}
}

/**
   * Enum descriptor.
   * @interface IEnum
   * @property {Object.<string,number>} values Enum values
   * @property {Object.<string,*>} [options] Enum options
   */

/**
       * Constructs an enum from an enum descriptor.
       * @param {string} name Enum name
       * @param {IEnum} json Enum descriptor
       * @returns {Enum} Created enum
       * @throws {TypeError} If arguments are invalid
       */
Enum.fromJSON = function fromJSON(name, json) {
  var enm = new Enum(name, json.values, json.options, json.comment, json.comments);
  enm.reserved = json.reserved;
  return enm;
};

/**
    * Converts this enum to an enum descriptor.
    * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
    * @returns {IEnum} Enum descriptor
    */
Enum.prototype.toJSON = function toJSON(toJSONOptions) {
  var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
  return util.toObject([
  "options", this.options,
  "values", this.values,
  "reserved", this.reserved && this.reserved.length ? this.reserved : undefined,
  "comment", keepComments ? this.comment : undefined,
  "comments", keepComments ? this.comments : undefined]);

};

/**
    * Adds a value to this enum.
    * @param {string} name Value name
    * @param {number} id Value id
    * @param {string} [comment] Comment, if any
    * @returns {Enum} `this`
    * @throws {TypeError} If arguments are invalid
    * @throws {Error} If there is already a value with this name or id
    */
Enum.prototype.add = function add(name, id, comment) {
  // utilized by the parser but not by .fromJSON

  if (!util.isString(name))
  throw TypeError("name must be a string");

  if (!util.isInteger(id))
  throw TypeError("id must be an integer");

  if (this.values[name] !== undefined)
  throw Error("duplicate name '" + name + "' in " + this);

  if (this.isReservedId(id))
  throw Error("id " + id + " is reserved in " + this);

  if (this.isReservedName(name))
  throw Error("name '" + name + "' is reserved in " + this);

  if (this.valuesById[id] !== undefined) {
    if (!(this.options && this.options.allow_alias))
    throw Error("duplicate id " + id + " in " + this);
    this.values[name] = id;
  } else
  this.valuesById[this.values[name] = id] = name;

  this.comments[name] = comment || null;
  return this;
};

/**
    * Removes a value from this enum
    * @param {string} name Value name
    * @returns {Enum} `this`
    * @throws {TypeError} If arguments are invalid
    * @throws {Error} If `name` is not a name of this enum
    */
Enum.prototype.remove = function remove(name) {

  if (!util.isString(name))
  throw TypeError("name must be a string");

  var val = this.values[name];
  if (val == null)
  throw Error("name '" + name + "' does not exist in " + this);

  delete this.valuesById[val];
  delete this.values[name];
  delete this.comments[name];

  return this;
};

/**
    * Tests if the specified id is reserved.
    * @param {number} id Id to test
    * @returns {boolean} `true` if reserved, otherwise `false`
    */
Enum.prototype.isReservedId = function isReservedId(id) {
  return Namespace.isReservedId(this.reserved, id);
};

/**
    * Tests if the specified name is reserved.
    * @param {string} name Name to test
    * @returns {boolean} `true` if reserved, otherwise `false`
    */
Enum.prototype.isReservedName = function isReservedName(name) {
  return Namespace.isReservedName(this.reserved, name);
};

/***/ }),
/* 44 */
/*!************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/types.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Common type constants.
               * @namespace
               */
var types = module.exports;
var util = __webpack_require__(/*! ./util */ 27);

var s = [
"double", // 0
"float", // 1
"int32", // 2
"uint32", // 3
"sint32", // 4
"fixed32", // 5
"sfixed32", // 6
"int64", // 7
"uint64", // 8
"sint64", // 9
"fixed64", // 10
"sfixed64", // 11
"bool", // 12
"string", // 13
"bytes" // 14
];

function bake(values, offset) {
  var i = 0,o = {};
  offset |= 0;
  while (i < values.length) {o[s[i + offset]] = values[i++];}
  return o;
}

/**
   * Basic type wire types.
   * @type {Object.<string,number>}
   * @const
   * @property {number} double=1 Fixed64 wire type
   * @property {number} float=5 Fixed32 wire type
   * @property {number} int32=0 Varint wire type
   * @property {number} uint32=0 Varint wire type
   * @property {number} sint32=0 Varint wire type
   * @property {number} fixed32=5 Fixed32 wire type
   * @property {number} sfixed32=5 Fixed32 wire type
   * @property {number} int64=0 Varint wire type
   * @property {number} uint64=0 Varint wire type
   * @property {number} sint64=0 Varint wire type
   * @property {number} fixed64=1 Fixed64 wire type
   * @property {number} sfixed64=1 Fixed64 wire type
   * @property {number} bool=0 Varint wire type
   * @property {number} string=2 Ldelim wire type
   * @property {number} bytes=2 Ldelim wire type
   */
types.basic = bake([
/* double   */1,
/* float    */5,
/* int32    */0,
/* uint32   */0,
/* sint32   */0,
/* fixed32  */5,
/* sfixed32 */5,
/* int64    */0,
/* uint64   */0,
/* sint64   */0,
/* fixed64  */1,
/* sfixed64 */1,
/* bool     */0,
/* string   */2,
/* bytes    */2]);


/**
                    * Basic type defaults.
                    * @type {Object.<string,*>}
                    * @const
                    * @property {number} double=0 Double default
                    * @property {number} float=0 Float default
                    * @property {number} int32=0 Int32 default
                    * @property {number} uint32=0 Uint32 default
                    * @property {number} sint32=0 Sint32 default
                    * @property {number} fixed32=0 Fixed32 default
                    * @property {number} sfixed32=0 Sfixed32 default
                    * @property {number} int64=0 Int64 default
                    * @property {number} uint64=0 Uint64 default
                    * @property {number} sint64=0 Sint32 default
                    * @property {number} fixed64=0 Fixed64 default
                    * @property {number} sfixed64=0 Sfixed64 default
                    * @property {boolean} bool=false Bool default
                    * @property {string} string="" String default
                    * @property {Array.<number>} bytes=Array(0) Bytes default
                    * @property {null} message=null Message default
                    */
types.defaults = bake([
/* double   */0,
/* float    */0,
/* int32    */0,
/* uint32   */0,
/* sint32   */0,
/* fixed32  */0,
/* sfixed32 */0,
/* int64    */0,
/* uint64   */0,
/* sint64   */0,
/* fixed64  */0,
/* sfixed64 */0,
/* bool     */false,
/* string   */"",
/* bytes    */util.emptyArray,
/* message  */null]);


/**
                       * Basic long type wire types.
                       * @type {Object.<string,number>}
                       * @const
                       * @property {number} int64=0 Varint wire type
                       * @property {number} uint64=0 Varint wire type
                       * @property {number} sint64=0 Varint wire type
                       * @property {number} fixed64=1 Fixed64 wire type
                       * @property {number} sfixed64=1 Fixed64 wire type
                       */
types.long = bake([
/* int64    */0,
/* uint64   */0,
/* sint64   */0,
/* fixed64  */1,
/* sfixed64 */1],
7);

/**
     * Allowed types for map keys with their associated wire type.
     * @type {Object.<string,number>}
     * @const
     * @property {number} int32=0 Varint wire type
     * @property {number} uint32=0 Varint wire type
     * @property {number} sint32=0 Varint wire type
     * @property {number} fixed32=5 Fixed32 wire type
     * @property {number} sfixed32=5 Fixed32 wire type
     * @property {number} int64=0 Varint wire type
     * @property {number} uint64=0 Varint wire type
     * @property {number} sint64=0 Varint wire type
     * @property {number} fixed64=1 Fixed64 wire type
     * @property {number} sfixed64=1 Fixed64 wire type
     * @property {number} bool=0 Varint wire type
     * @property {number} string=2 Ldelim wire type
     */
types.mapKey = bake([
/* int32    */0,
/* uint32   */0,
/* sint32   */0,
/* fixed32  */5,
/* sfixed32 */5,
/* int64    */0,
/* uint64   */0,
/* sint64   */0,
/* fixed64  */1,
/* sfixed64 */1,
/* bool     */0,
/* string   */2],
2);

/**
     * Allowed types for packed repeated fields with their associated wire type.
     * @type {Object.<string,number>}
     * @const
     * @property {number} double=1 Fixed64 wire type
     * @property {number} float=5 Fixed32 wire type
     * @property {number} int32=0 Varint wire type
     * @property {number} uint32=0 Varint wire type
     * @property {number} sint32=0 Varint wire type
     * @property {number} fixed32=5 Fixed32 wire type
     * @property {number} sfixed32=5 Fixed32 wire type
     * @property {number} int64=0 Varint wire type
     * @property {number} uint64=0 Varint wire type
     * @property {number} sint64=0 Varint wire type
     * @property {number} fixed64=1 Fixed64 wire type
     * @property {number} sfixed64=1 Fixed64 wire type
     * @property {number} bool=0 Varint wire type
     */
types.packed = bake([
/* double   */1,
/* float    */5,
/* int32    */0,
/* uint32   */0,
/* sint32   */0,
/* fixed32  */5,
/* sfixed32 */5,
/* int64    */0,
/* uint64   */0,
/* sint64   */0,
/* fixed64  */1,
/* sfixed64 */1,
/* bool     */0]);


types._configure = function () {
  util = __webpack_require__(/*! ./util */ 27);
};

/***/ }),
/* 45 */
/*!************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/oneof.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = OneOf;

// extends ReflectionObject
var ReflectionObject = __webpack_require__(/*! ./object */ 40);
((OneOf.prototype = Object.create(ReflectionObject.prototype)).constructor = OneOf).className = "OneOf";

var Field;
var util;

/**
           * Constructs a new oneof instance.
           * @classdesc Reflected oneof.
           * @extends ReflectionObject
           * @constructor
           * @param {string} name Oneof name
           * @param {string[]|Object.<string,*>} [fieldNames] Field names
           * @param {Object.<string,*>} [options] Declared options
           * @param {string} [comment] Comment associated with this field
           */
function OneOf(name, fieldNames, options, comment) {
  if (!Array.isArray(fieldNames)) {
    options = fieldNames;
    fieldNames = undefined;
  }
  ReflectionObject.call(this, name, options);

  /* istanbul ignore if */
  if (!(fieldNames === undefined || Array.isArray(fieldNames)))
  throw TypeError("fieldNames must be an Array");

  /**
                                                   * Field names that belong to this oneof.
                                                   * @type {string[]}
                                                   */
  this.oneof = fieldNames || []; // toJSON, marker

  /**
   * Fields that belong to this oneof as an array for iteration.
   * @type {Field[]}
   * @readonly
   */
  this.fieldsArray = []; // declared readonly for conformance, possibly not yet added to parent

  /**
   * Comment for this field.
   * @type {string|null}
   */
  this.comment = comment;
}

/**
   * Oneof descriptor.
   * @interface IOneOf
   * @property {Array.<string>} oneof Oneof field names
   * @property {Object.<string,*>} [options] Oneof options
   */

/**
       * Constructs a oneof from a oneof descriptor.
       * @param {string} name Oneof name
       * @param {IOneOf} json Oneof descriptor
       * @returns {OneOf} Created oneof
       * @throws {TypeError} If arguments are invalid
       */
OneOf.fromJSON = function fromJSON(name, json) {
  return new OneOf(name, json.oneof, json.options, json.comment);
};

/**
    * Converts this oneof to a oneof descriptor.
    * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
    * @returns {IOneOf} Oneof descriptor
    */
OneOf.prototype.toJSON = function toJSON(toJSONOptions) {
  var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
  return util.toObject([
  "options", this.options,
  "oneof", this.oneof,
  "comment", keepComments ? this.comment : undefined]);

};

/**
    * Adds the fields of the specified oneof to the parent if not already done so.
    * @param {OneOf} oneof The oneof
    * @returns {undefined}
    * @inner
    * @ignore
    */
function addFieldsToParent(oneof) {
  if (oneof.parent)
  for (var i = 0; i < oneof.fieldsArray.length; ++i) {
    if (!oneof.fieldsArray[i].parent)
    oneof.parent.add(oneof.fieldsArray[i]);}
}

/**
   * Adds a field to this oneof and removes it from its current parent, if any.
   * @param {Field} field Field to add
   * @returns {OneOf} `this`
   */
OneOf.prototype.add = function add(field) {

  /* istanbul ignore if */
  if (!(field instanceof Field))
  throw TypeError("field must be a Field");

  if (field.parent && field.parent !== this.parent)
  field.parent.remove(field);
  this.oneof.push(field.name);
  this.fieldsArray.push(field);
  field.partOf = this; // field.parent remains null
  addFieldsToParent(this);
  return this;
};

/**
    * Removes a field from this oneof and puts it back to the oneof's parent.
    * @param {Field} field Field to remove
    * @returns {OneOf} `this`
    */
OneOf.prototype.remove = function remove(field) {

  /* istanbul ignore if */
  if (!(field instanceof Field))
  throw TypeError("field must be a Field");

  var index = this.fieldsArray.indexOf(field);

  /* istanbul ignore if */
  if (index < 0)
  throw Error(field + " is not a member of " + this);

  this.fieldsArray.splice(index, 1);
  index = this.oneof.indexOf(field.name);

  /* istanbul ignore else */
  if (index > -1) // theoretical
    this.oneof.splice(index, 1);

  field.partOf = null;
  return this;
};

/**
    * @override
    */
OneOf.prototype.onAdd = function onAdd(parent) {
  ReflectionObject.prototype.onAdd.call(this, parent);
  var self = this;
  // Collect present fields
  for (var i = 0; i < this.oneof.length; ++i) {
    var field = parent.get(this.oneof[i]);
    if (field && !field.partOf) {
      field.partOf = self;
      self.fieldsArray.push(field);
    }
  }
  // Add not yet present fields
  addFieldsToParent(this);
};

/**
    * @override
    */
OneOf.prototype.onRemove = function onRemove(parent) {
  for (var i = 0, field; i < this.fieldsArray.length; ++i) {
    if ((field = this.fieldsArray[i]).parent)
    field.parent.remove(field);}
  ReflectionObject.prototype.onRemove.call(this, parent);
};

/**
    * Decorator function as returned by {@link OneOf.d} (TypeScript).
    * @typedef OneOfDecorator
    * @type {function}
    * @param {Object} prototype Target prototype
    * @param {string} oneofName OneOf name
    * @returns {undefined}
    */

/**
        * OneOf decorator (TypeScript).
        * @function
        * @param {...string} fieldNames Field names
        * @returns {OneOfDecorator} Decorator function
        * @template T extends string
        */
OneOf.d = function decorateOneOf() {
  var fieldNames = new Array(arguments.length),
  index = 0;
  while (index < arguments.length) {
    fieldNames[index] = arguments[index++];}
  return function oneOfDecorator(prototype, oneofName) {
    util.decorateType(prototype.constructor).
    add(new OneOf(oneofName, fieldNames));
    Object.defineProperty(prototype, oneofName, {
      get: util.oneOfGetter(fieldNames),
      set: util.oneOfSetter(fieldNames) });

  };
};

OneOf._configure = function () {
  Field = __webpack_require__(/*! ./field */ 42);
  util = __webpack_require__(/*! ./util */ 27);
};

/***/ }),
/* 46 */
/*!************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/parse.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = parse;

parse.filename = null;
parse.defaults = { keepCase: false };

var tokenize,
Root,
Type,
Field,
MapField,
OneOf,
Enum,
Service,
Method,
types,
util;

var base10Re = /^[1-9][0-9]*$/,
base10NegRe = /^-?[1-9][0-9]*$/,
base16Re = /^0[x][0-9a-fA-F]+$/,
base16NegRe = /^-?0[x][0-9a-fA-F]+$/,
base8Re = /^0[0-7]+$/,
base8NegRe = /^-?0[0-7]+$/,
numberRe = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/,
nameRe = /^[a-zA-Z_][a-zA-Z_0-9]*$/,
typeRefRe = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/,
fqTypeRefRe = /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/;

/**
                                                 * Result object returned from {@link parse}.
                                                 * @interface IParserResult
                                                 * @property {string|undefined} package Package name, if declared
                                                 * @property {string[]|undefined} imports Imports, if any
                                                 * @property {string[]|undefined} weakImports Weak imports, if any
                                                 * @property {string|undefined} syntax Syntax, if specified (either `"proto2"` or `"proto3"`)
                                                 * @property {Root} root Populated root instance
                                                 */

/**
                                                     * Options modifying the behavior of {@link parse}.
                                                     * @interface IParseOptions
                                                     * @property {boolean} [keepCase=false] Keeps field casing instead of converting to camel case
                                                     * @property {boolean} [alternateCommentMode=false] Recognize double-slash comments in addition to doc-block comments.
                                                     */

/**
                                                         * Options modifying the behavior of JSON serialization.
                                                         * @interface IToJSONOptions
                                                         * @property {boolean} [keepComments=false] Serializes comments.
                                                         */

/**
                                                             * Parses the given .proto source and returns an object with the parsed contents.
                                                             * @param {string} source Source contents
                                                             * @param {Root} root Root to populate
                                                             * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
                                                             * @returns {IParserResult} Parser result
                                                             * @property {string} filename=null Currently processing file name for error reporting, if known
                                                             * @property {IParseOptions} defaults Default {@link IParseOptions}
                                                             */
function parse(source, root, options) {
  /* eslint-disable callback-return */
  if (!(root instanceof Root)) {
    options = root;
    root = new Root();
  }
  if (!options)
  options = parse.defaults;

  var tn = tokenize(source, options.alternateCommentMode || false),
  next = tn.next,
  push = tn.push,
  peek = tn.peek,
  skip = tn.skip,
  cmnt = tn.cmnt;

  var head = true,
  pkg,
  imports,
  weakImports,
  syntax,
  isProto3 = false;

  var ptr = root;

  var applyCase = options.keepCase ? function (name) {return name;} : util.camelCase;

  /* istanbul ignore next */
  function illegal(token, name, insideTryCatch) {
    var filename = parse.filename;
    if (!insideTryCatch)
    parse.filename = null;
    return Error("illegal " + (name || "token") + " '" + token + "' (" + (filename ? filename + ", " : "") + "line " + tn.line + ")");
  }

  function readString() {
    var values = [],
    token;
    do {
      /* istanbul ignore if */
      if ((token = next()) !== "\"" && token !== "'")
      throw illegal(token);

      values.push(next());
      skip(token);
      token = peek();
    } while (token === "\"" || token === "'");
    return values.join("");
  }

  function readValue(acceptTypeRef) {
    var token = next();
    switch (token) {
      case "'":
      case "\"":
        push(token);
        return readString();
      case "true":case "TRUE":
        return true;
      case "false":case "FALSE":
        return false;}

    try {
      return parseNumber(token, /* insideTryCatch */true);
    } catch (e) {

      /* istanbul ignore else */
      if (acceptTypeRef && typeRefRe.test(token))
      return token;

      /* istanbul ignore next */
      throw illegal(token, "value");
    }
  }

  function readRanges(target, acceptStrings) {
    var token, start;
    do {
      if (acceptStrings && ((token = peek()) === "\"" || token === "'"))
      target.push(readString());else

      target.push([start = parseId(next()), skip("to", true) ? parseId(next()) : start]);
    } while (skip(",", true));
    skip(";");
  }

  function parseNumber(token, insideTryCatch) {
    var sign = 1;
    if (token.charAt(0) === "-") {
      sign = -1;
      token = token.substring(1);
    }
    switch (token) {
      case "inf":case "INF":case "Inf":
        return sign * Infinity;
      case "nan":case "NAN":case "Nan":case "NaN":
        return NaN;
      case "0":
        return 0;}

    if (base10Re.test(token))
    return sign * parseInt(token, 10);
    if (base16Re.test(token))
    return sign * parseInt(token, 16);
    if (base8Re.test(token))
    return sign * parseInt(token, 8);

    /* istanbul ignore else */
    if (numberRe.test(token))
    return sign * parseFloat(token);

    /* istanbul ignore next */
    throw illegal(token, "number", insideTryCatch);
  }

  function parseId(token, acceptNegative) {
    switch (token) {
      case "max":case "MAX":case "Max":
        return 536870911;
      case "0":
        return 0;}


    /* istanbul ignore if */
    if (!acceptNegative && token.charAt(0) === "-")
    throw illegal(token, "id");

    if (base10NegRe.test(token))
    return parseInt(token, 10);
    if (base16NegRe.test(token))
    return parseInt(token, 16);

    /* istanbul ignore else */
    if (base8NegRe.test(token))
    return parseInt(token, 8);

    /* istanbul ignore next */
    throw illegal(token, "id");
  }

  function parsePackage() {

    /* istanbul ignore if */
    if (pkg !== undefined)
    throw illegal("package");

    pkg = next();

    /* istanbul ignore if */
    if (!typeRefRe.test(pkg))
    throw illegal(pkg, "name");

    ptr = ptr.define(pkg);
    skip(";");
  }

  function parseImport() {
    var token = peek();
    var whichImports;
    switch (token) {
      case "weak":
        whichImports = weakImports || (weakImports = []);
        next();
        break;
      case "public":
        next();
      // eslint-disable-line no-fallthrough
      default:
        whichImports = imports || (imports = []);
        break;}

    token = readString();
    skip(";");
    whichImports.push(token);
  }

  function parseSyntax() {
    skip("=");
    syntax = readString();
    isProto3 = syntax === "proto3";

    /* istanbul ignore if */
    if (!isProto3 && syntax !== "proto2")
    throw illegal(syntax, "syntax");

    skip(";");
  }

  function parseCommon(parent, token) {
    switch (token) {

      case "option":
        parseOption(parent, token);
        skip(";");
        return true;

      case "message":
        parseType(parent, token);
        return true;

      case "enum":
        parseEnum(parent, token);
        return true;

      case "service":
        parseService(parent, token);
        return true;

      case "extend":
        parseExtension(parent, token);
        return true;}

    return false;
  }

  function ifBlock(obj, fnIf, fnElse) {
    var trailingLine = tn.line;
    if (obj) {
      obj.comment = cmnt(); // try block-type comment
      obj.filename = parse.filename;
    }
    if (skip("{", true)) {
      var token;
      while ((token = next()) !== "}") {
        fnIf(token);}
      skip(";", true);
    } else {
      if (fnElse)
      fnElse();
      skip(";");
      if (obj && typeof obj.comment !== "string")
      obj.comment = cmnt(trailingLine); // try line-type comment if no block
    }
  }

  function parseType(parent, token) {

    /* istanbul ignore if */
    if (!nameRe.test(token = next()))
    throw illegal(token, "type name");

    var type = new Type(token);
    ifBlock(type, function parseType_block(token) {
      if (parseCommon(type, token))
      return;

      switch (token) {

        case "map":
          parseMapField(type, token);
          break;

        case "required":
        case "optional":
        case "repeated":
          parseField(type, token);
          break;

        case "oneof":
          parseOneOf(type, token);
          break;

        case "extensions":
          readRanges(type.extensions || (type.extensions = []));
          break;

        case "reserved":
          readRanges(type.reserved || (type.reserved = []), true);
          break;

        default:
          /* istanbul ignore if */
          if (!isProto3 || !typeRefRe.test(token))
          throw illegal(token);

          push(token);
          parseField(type, "optional");
          break;}

    });
    parent.add(type);
  }

  function parseField(parent, rule, extend) {
    var type = next();
    if (type === "group") {
      parseGroup(parent, rule);
      return;
    }

    /* istanbul ignore if */
    if (!typeRefRe.test(type))
    throw illegal(type, "type");

    var name = next();

    /* istanbul ignore if */
    if (!nameRe.test(name))
    throw illegal(name, "name");

    name = applyCase(name);
    skip("=");

    var field = new Field(name, parseId(next()), type, rule, extend);
    ifBlock(field, function parseField_block(token) {

      /* istanbul ignore else */
      if (token === "option") {
        parseOption(field, token);
        skip(";");
      } else
      throw illegal(token);

    }, function parseField_line() {
      parseInlineOptions(field);
    });
    parent.add(field);

    // JSON defaults to packed=true if not set so we have to set packed=false explicity when
    // parsing proto2 descriptors without the option, where applicable. This must be done for
    // all known packable types and anything that could be an enum (= is not a basic type).
    if (!isProto3 && field.repeated && (types.packed[type] !== undefined || types.basic[type] === undefined))
    field.setOption("packed", false, /* ifNotSet */true);
  }

  function parseGroup(parent, rule) {
    var name = next();

    /* istanbul ignore if */
    if (!nameRe.test(name))
    throw illegal(name, "name");

    var fieldName = util.lcFirst(name);
    if (name === fieldName)
    name = util.ucFirst(name);
    skip("=");
    var id = parseId(next());
    var type = new Type(name);
    type.group = true;
    var field = new Field(fieldName, id, name, rule);
    field.filename = parse.filename;
    ifBlock(type, function parseGroup_block(token) {
      switch (token) {

        case "option":
          parseOption(type, token);
          skip(";");
          break;

        case "required":
        case "optional":
        case "repeated":
          parseField(type, token);
          break;

        /* istanbul ignore next */
        default:
          throw illegal(token); // there are no groups with proto3 semantics
      }
    });
    parent.add(type).
    add(field);
  }

  function parseMapField(parent) {
    skip("<");
    var keyType = next();

    /* istanbul ignore if */
    if (types.mapKey[keyType] === undefined)
    throw illegal(keyType, "type");

    skip(",");
    var valueType = next();

    /* istanbul ignore if */
    if (!typeRefRe.test(valueType))
    throw illegal(valueType, "type");

    skip(">");
    var name = next();

    /* istanbul ignore if */
    if (!nameRe.test(name))
    throw illegal(name, "name");

    skip("=");
    var field = new MapField(applyCase(name), parseId(next()), keyType, valueType);
    ifBlock(field, function parseMapField_block(token) {

      /* istanbul ignore else */
      if (token === "option") {
        parseOption(field, token);
        skip(";");
      } else
      throw illegal(token);

    }, function parseMapField_line() {
      parseInlineOptions(field);
    });
    parent.add(field);
  }

  function parseOneOf(parent, token) {

    /* istanbul ignore if */
    if (!nameRe.test(token = next()))
    throw illegal(token, "name");

    var oneof = new OneOf(applyCase(token));
    ifBlock(oneof, function parseOneOf_block(token) {
      if (token === "option") {
        parseOption(oneof, token);
        skip(";");
      } else {
        push(token);
        parseField(oneof, "optional");
      }
    });
    parent.add(oneof);
  }

  function parseEnum(parent, token) {

    /* istanbul ignore if */
    if (!nameRe.test(token = next()))
    throw illegal(token, "name");

    var enm = new Enum(token);
    ifBlock(enm, function parseEnum_block(token) {
      switch (token) {
        case "option":
          parseOption(enm, token);
          skip(";");
          break;

        case "reserved":
          readRanges(enm.reserved || (enm.reserved = []), true);
          break;

        default:
          parseEnumValue(enm, token);}

    });
    parent.add(enm);
  }

  function parseEnumValue(parent, token) {

    /* istanbul ignore if */
    if (!nameRe.test(token))
    throw illegal(token, "name");

    skip("=");
    var value = parseId(next(), true),
    dummy = {};
    ifBlock(dummy, function parseEnumValue_block(token) {

      /* istanbul ignore else */
      if (token === "option") {
        parseOption(dummy, token); // skip
        skip(";");
      } else
      throw illegal(token);

    }, function parseEnumValue_line() {
      parseInlineOptions(dummy); // skip
    });
    parent.add(token, value, dummy.comment);
  }

  function parseOption(parent, token) {
    var isCustom = skip("(", true);

    /* istanbul ignore if */
    if (!typeRefRe.test(token = next()))
    throw illegal(token, "name");

    var name = token;
    if (isCustom) {
      skip(")");
      name = "(" + name + ")";
      token = peek();
      if (fqTypeRefRe.test(token)) {
        name += token;
        next();
      }
    }
    skip("=");
    parseOptionValue(parent, name);
  }

  function parseOptionValue(parent, name) {
    if (skip("{", true)) {// { a: "foo" b { c: "bar" } }
      do {
        /* istanbul ignore if */
        if (!nameRe.test(token = next()))
        throw illegal(token, "name");

        if (peek() === "{")
        parseOptionValue(parent, name + "." + token);else
        {
          skip(":");
          if (peek() === "{")
          parseOptionValue(parent, name + "." + token);else

          setOption(parent, name + "." + token, readValue(true));
        }
      } while (!skip("}", true));
    } else
    setOption(parent, name, readValue(true));
    // Does not enforce a delimiter to be universal
  }

  function setOption(parent, name, value) {
    if (parent.setOption)
    parent.setOption(name, value);
  }

  function parseInlineOptions(parent) {
    if (skip("[", true)) {
      do {
        parseOption(parent, "option");
      } while (skip(",", true));
      skip("]");
    }
    return parent;
  }

  function parseService(parent, token) {

    /* istanbul ignore if */
    if (!nameRe.test(token = next()))
    throw illegal(token, "service name");

    var service = new Service(token);
    ifBlock(service, function parseService_block(token) {
      if (parseCommon(service, token))
      return;

      /* istanbul ignore else */
      if (token === "rpc")
      parseMethod(service, token);else

      throw illegal(token);
    });
    parent.add(service);
  }

  function parseMethod(parent, token) {
    var type = token;

    /* istanbul ignore if */
    if (!nameRe.test(token = next()))
    throw illegal(token, "name");

    var name = token,
    requestType,requestStream,
    responseType,responseStream;

    skip("(");
    if (skip("stream", true))
    requestStream = true;

    /* istanbul ignore if */
    if (!typeRefRe.test(token = next()))
    throw illegal(token);

    requestType = token;
    skip(")");skip("returns");skip("(");
    if (skip("stream", true))
    responseStream = true;

    /* istanbul ignore if */
    if (!typeRefRe.test(token = next()))
    throw illegal(token);

    responseType = token;
    skip(")");

    var method = new Method(name, type, requestType, responseType, requestStream, responseStream);
    ifBlock(method, function parseMethod_block(token) {

      /* istanbul ignore else */
      if (token === "option") {
        parseOption(method, token);
        skip(";");
      } else
      throw illegal(token);

    });
    parent.add(method);
  }

  function parseExtension(parent, token) {

    /* istanbul ignore if */
    if (!typeRefRe.test(token = next()))
    throw illegal(token, "reference");

    var reference = token;
    ifBlock(null, function parseExtension_block(token) {
      switch (token) {

        case "required":
        case "repeated":
        case "optional":
          parseField(parent, token, reference);
          break;

        default:
          /* istanbul ignore if */
          if (!isProto3 || !typeRefRe.test(token))
          throw illegal(token);
          push(token);
          parseField(parent, "optional", reference);
          break;}

    });
  }

  var token;
  while ((token = next()) !== null) {
    switch (token) {

      case "package":

        /* istanbul ignore if */
        if (!head)
        throw illegal(token);

        parsePackage();
        break;

      case "import":

        /* istanbul ignore if */
        if (!head)
        throw illegal(token);

        parseImport();
        break;

      case "syntax":

        /* istanbul ignore if */
        if (!head)
        throw illegal(token);

        parseSyntax();
        break;

      case "option":

        /* istanbul ignore if */
        if (!head)
        throw illegal(token);

        parseOption(ptr, token);
        skip(";");
        break;

      default:

        /* istanbul ignore else */
        if (parseCommon(ptr, token)) {
          head = false;
          continue;
        }

        /* istanbul ignore next */
        throw illegal(token);}

  }

  parse.filename = null;
  return {
    "package": pkg,
    "imports": imports,
    weakImports: weakImports,
    syntax: syntax,
    root: root };

}

/**
   * Parses the given .proto source and returns an object with the parsed contents.
   * @name parse
   * @function
   * @param {string} source Source contents
   * @param {IParseOptions} [options] Parse options. Defaults to {@link parse.defaults} when omitted.
   * @returns {IParserResult} Parser result
   * @property {string} filename=null Currently processing file name for error reporting, if known
   * @property {IParseOptions} defaults Default {@link IParseOptions}
   * @variation 2
   */
parse._configure = function () {
  tokenize = __webpack_require__(/*! ./tokenize */ 47),
  Root = __webpack_require__(/*! ./root */ 41),
  Type = __webpack_require__(/*! ./type */ 38),
  Field = __webpack_require__(/*! ./field */ 42),
  MapField = __webpack_require__(/*! ./mapField */ 48),
  OneOf = __webpack_require__(/*! ./oneof */ 45),
  Enum = __webpack_require__(/*! ./enum */ 43),
  Service = __webpack_require__(/*! ./service */ 49),
  Method = __webpack_require__(/*! ./method */ 50),
  types = __webpack_require__(/*! ./types */ 44),
  util = __webpack_require__(/*! ./util */ 27);
};

/***/ }),
/* 47 */
/*!***************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/tokenize.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = tokenize;

var delimRe = /[\s{}=;:[\],'"()<>]/g,
stringDoubleRe = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g,
stringSingleRe = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g;

var setCommentRe = /^ *[*/]+ */,
setCommentAltRe = /^\s*\*?\/*/,
setCommentSplitRe = /\n/g,
whitespaceRe = /\s/,
unescapeRe = /\\(.?)/g;

var unescapeMap = {
  "0": "\0",
  "r": "\r",
  "n": "\n",
  "t": "\t" };


/**
                * Unescapes a string.
                * @param {string} str String to unescape
                * @returns {string} Unescaped string
                * @property {Object.<string,string>} map Special characters map
                * @memberof tokenize
                */
function unescape(str) {
  return str.replace(unescapeRe, function ($0, $1) {
    switch ($1) {
      case "\\":
      case "":
        return $1;
      default:
        return unescapeMap[$1] || "";}

  });
}

tokenize.unescape = unescape;

/**
                               * Gets the next token and advances.
                               * @typedef TokenizerHandleNext
                               * @type {function}
                               * @returns {string|null} Next token or `null` on eof
                               */

/**
                                   * Peeks for the next token.
                                   * @typedef TokenizerHandlePeek
                                   * @type {function}
                                   * @returns {string|null} Next token or `null` on eof
                                   */

/**
                                       * Pushes a token back to the stack.
                                       * @typedef TokenizerHandlePush
                                       * @type {function}
                                       * @param {string} token Token
                                       * @returns {undefined}
                                       */

/**
                                           * Skips the next token.
                                           * @typedef TokenizerHandleSkip
                                           * @type {function}
                                           * @param {string} expected Expected token
                                           * @param {boolean} [optional=false] If optional
                                           * @returns {boolean} Whether the token matched
                                           * @throws {Error} If the token didn't match and is not optional
                                           */

/**
                                               * Gets the comment on the previous line or, alternatively, the line comment on the specified line.
                                               * @typedef TokenizerHandleCmnt
                                               * @type {function}
                                               * @param {number} [line] Line number
                                               * @returns {string|null} Comment text or `null` if none
                                               */

/**
                                                   * Handle object returned from {@link tokenize}.
                                                   * @interface ITokenizerHandle
                                                   * @property {TokenizerHandleNext} next Gets the next token and advances (`null` on eof)
                                                   * @property {TokenizerHandlePeek} peek Peeks for the next token (`null` on eof)
                                                   * @property {TokenizerHandlePush} push Pushes a token back to the stack
                                                   * @property {TokenizerHandleSkip} skip Skips a token, returns its presence and advances or, if non-optional and not present, throws
                                                   * @property {TokenizerHandleCmnt} cmnt Gets the comment on the previous line or the line comment on the specified line, if any
                                                   * @property {number} line Current line number
                                                   */

/**
                                                       * Tokenizes the given .proto source and returns an object with useful utility functions.
                                                       * @param {string} source Source contents
                                                       * @param {boolean} alternateCommentMode Whether we should activate alternate comment parsing mode.
                                                       * @returns {ITokenizerHandle} Tokenizer handle
                                                       */
function tokenize(source, alternateCommentMode) {
  /* eslint-disable callback-return */
  source = source.toString();

  var offset = 0,
  length = source.length,
  line = 1,
  commentType = null,
  commentText = null,
  commentLine = 0,
  commentLineEmpty = false;

  var stack = [];

  var stringDelim = null;

  /* istanbul ignore next */
  /**
                              * Creates an error for illegal syntax.
                              * @param {string} subject Subject
                              * @returns {Error} Error created
                              * @inner
                              */
  function illegal(subject) {
    return Error("illegal " + subject + " (line " + line + ")");
  }

  /**
     * Reads a string till its end.
     * @returns {string} String read
     * @inner
     */
  function readString() {
    var re = stringDelim === "'" ? stringSingleRe : stringDoubleRe;
    re.lastIndex = offset - 1;
    var match = re.exec(source);
    if (!match)
    throw illegal("string");
    offset = re.lastIndex;
    push(stringDelim);
    stringDelim = null;
    return unescape(match[1]);
  }

  /**
     * Gets the character at `pos` within the source.
     * @param {number} pos Position
     * @returns {string} Character
     * @inner
     */
  function charAt(pos) {
    return source.charAt(pos);
  }

  /**
     * Sets the current comment text.
     * @param {number} start Start offset
     * @param {number} end End offset
     * @returns {undefined}
     * @inner
     */
  function setComment(start, end) {
    commentType = source.charAt(start++);
    commentLine = line;
    commentLineEmpty = false;
    var lookback;
    if (alternateCommentMode) {
      lookback = 2; // alternate comment parsing: "//" or "/*"
    } else {
      lookback = 3; // "///" or "/**"
    }
    var commentOffset = start - lookback,
    c;
    do {
      if (--commentOffset < 0 ||
      (c = source.charAt(commentOffset)) === "\n") {
        commentLineEmpty = true;
        break;
      }
    } while (c === " " || c === "\t");
    var lines = source.
    substring(start, end).
    split(setCommentSplitRe);
    for (var i = 0; i < lines.length; ++i) {
      lines[i] = lines[i].
      replace(alternateCommentMode ? setCommentAltRe : setCommentRe, "").
      trim();}
    commentText = lines.
    join("\n").
    trim();
  }

  function isDoubleSlashCommentLine(startOffset) {
    var endOffset = findEndOfLine(startOffset);

    // see if remaining line matches comment pattern
    var lineText = source.substring(startOffset, endOffset);
    // look for 1 or 2 slashes since startOffset would already point past
    // the first slash that started the comment.
    var isComment = /^\s*\/{1,2}/.test(lineText);
    return isComment;
  }

  function findEndOfLine(cursor) {
    // find end of cursor's line
    var endOffset = cursor;
    while (endOffset < length && charAt(endOffset) !== "\n") {
      endOffset++;
    }
    return endOffset;
  }

  /**
     * Obtains the next token.
     * @returns {string|null} Next token or `null` on eof
     * @inner
     */
  function next() {
    if (stack.length > 0)
    return stack.shift();
    if (stringDelim)
    return readString();
    var repeat,
    prev,
    curr,
    start,
    isDoc;
    do {
      if (offset === length)
      return null;
      repeat = false;
      while (whitespaceRe.test(curr = charAt(offset))) {
        if (curr === "\n")
        ++line;
        if (++offset === length)
        return null;
      }

      if (charAt(offset) === "/") {
        if (++offset === length) {
          throw illegal("comment");
        }
        if (charAt(offset) === "/") {// Line
          if (!alternateCommentMode) {
            // check for triple-slash comment
            isDoc = charAt(start = offset + 1) === "/";

            while (charAt(++offset) !== "\n") {
              if (offset === length) {
                return null;
              }
            }
            ++offset;
            if (isDoc) {
              setComment(start, offset - 1);
            }
            ++line;
            repeat = true;
          } else {
            // check for double-slash comments, consolidating consecutive lines
            start = offset;
            isDoc = false;
            if (isDoubleSlashCommentLine(offset)) {
              isDoc = true;
              do {
                offset = findEndOfLine(offset);
                if (offset === length) {
                  break;
                }
                offset++;
              } while (isDoubleSlashCommentLine(offset));
            } else {
              offset = Math.min(length, findEndOfLine(offset) + 1);
            }
            if (isDoc) {
              setComment(start, offset);
            }
            line++;
            repeat = true;
          }
        } else if ((curr = charAt(offset)) === "*") {/* Block */
          // check for /** (regular comment mode) or /* (alternate comment mode)
          start = offset + 1;
          isDoc = alternateCommentMode || charAt(start) === "*";
          do {
            if (curr === "\n") {
              ++line;
            }
            if (++offset === length) {
              throw illegal("comment");
            }
            prev = curr;
            curr = charAt(offset);
          } while (prev !== "*" || curr !== "/");
          ++offset;
          if (isDoc) {
            setComment(start, offset - 2);
          }
          repeat = true;
        } else {
          return "/";
        }
      }
    } while (repeat);

    // offset !== length if we got here

    var end = offset;
    delimRe.lastIndex = 0;
    var delim = delimRe.test(charAt(end++));
    if (!delim)
    while (end < length && !delimRe.test(charAt(end))) {
      ++end;}
    var token = source.substring(offset, offset = end);
    if (token === "\"" || token === "'")
    stringDelim = token;
    return token;
  }

  /**
     * Pushes a token back to the stack.
     * @param {string} token Token
     * @returns {undefined}
     * @inner
     */
  function push(token) {
    stack.push(token);
  }

  /**
     * Peeks for the next token.
     * @returns {string|null} Token or `null` on eof
     * @inner
     */
  function peek() {
    if (!stack.length) {
      var token = next();
      if (token === null)
      return null;
      push(token);
    }
    return stack[0];
  }

  /**
     * Skips a token.
     * @param {string} expected Expected token
     * @param {boolean} [optional=false] Whether the token is optional
     * @returns {boolean} `true` when skipped, `false` if not
     * @throws {Error} When a required token is not present
     * @inner
     */
  function skip(expected, optional) {
    var actual = peek(),
    equals = actual === expected;
    if (equals) {
      next();
      return true;
    }
    if (!optional)
    throw illegal("token '" + actual + "', '" + expected + "' expected");
    return false;
  }

  /**
     * Gets a comment.
     * @param {number} [trailingLine] Line number if looking for a trailing comment
     * @returns {string|null} Comment text
     * @inner
     */
  function cmnt(trailingLine) {
    var ret = null;
    if (trailingLine === undefined) {
      if (commentLine === line - 1 && (alternateCommentMode || commentType === "*" || commentLineEmpty)) {
        ret = commentText;
      }
    } else {
      /* istanbul ignore else */
      if (commentLine < trailingLine) {
        peek();
      }
      if (commentLine === trailingLine && !commentLineEmpty && (alternateCommentMode || commentType === "/")) {
        ret = commentText;
      }
    }
    return ret;
  }

  return Object.defineProperty({
    next: next,
    peek: peek,
    push: push,
    skip: skip,
    cmnt: cmnt },
  "line", {
    get: function get() {return line;} });

  /* eslint-enable callback-return */
}

/***/ }),
/* 48 */
/*!***************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/mapField.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = MapField;

// extends Field
var Field = __webpack_require__(/*! ./field */ 42);
((MapField.prototype = Object.create(Field.prototype)).constructor = MapField).className = "MapField";

var types,
util;

/**
       * Constructs a new map field instance.
       * @classdesc Reflected map field.
       * @extends FieldBase
       * @constructor
       * @param {string} name Unique name within its namespace
       * @param {number} id Unique id within its namespace
       * @param {string} keyType Key type
       * @param {string} type Value type
       * @param {Object.<string,*>} [options] Declared options
       * @param {string} [comment] Comment associated with this field
       */
function MapField(name, id, keyType, type, options, comment) {
  Field.call(this, name, id, type, undefined, undefined, options, comment);

  /* istanbul ignore if */
  if (!util.isString(keyType))
  throw TypeError("keyType must be a string");

  /**
                                                * Key type.
                                                * @type {string}
                                                */
  this.keyType = keyType; // toJSON, marker

  /**
   * Resolved key type if not a basic type.
   * @type {ReflectionObject|null}
   */
  this.resolvedKeyType = null;

  // Overrides Field#map
  this.map = true;
}

/**
   * Map field descriptor.
   * @interface IMapField
   * @extends {IField}
   * @property {string} keyType Key type
   */

/**
       * Extension map field descriptor.
       * @interface IExtensionMapField
       * @extends IMapField
       * @property {string} extend Extended type
       */

/**
           * Constructs a map field from a map field descriptor.
           * @param {string} name Field name
           * @param {IMapField} json Map field descriptor
           * @returns {MapField} Created map field
           * @throws {TypeError} If arguments are invalid
           */
MapField.fromJSON = function fromJSON(name, json) {
  return new MapField(name, json.id, json.keyType, json.type, json.options, json.comment);
};

/**
    * Converts this map field to a map field descriptor.
    * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
    * @returns {IMapField} Map field descriptor
    */
MapField.prototype.toJSON = function toJSON(toJSONOptions) {
  var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
  return util.toObject([
  "keyType", this.keyType,
  "type", this.type,
  "id", this.id,
  "extend", this.extend,
  "options", this.options,
  "comment", keepComments ? this.comment : undefined]);

};

/**
    * @override
    */
MapField.prototype.resolve = function resolve() {
  if (this.resolved)
  return this;

  // Besides a value type, map fields have a key type that may be "any scalar type except for floating point types and bytes"
  if (types.mapKey[this.keyType] === undefined)
  throw Error("invalid key type: " + this.keyType);

  return Field.prototype.resolve.call(this);
};

/**
    * Map field decorator (TypeScript).
    * @name MapField.d
    * @function
    * @param {number} fieldId Field id
    * @param {"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"bool"|"string"} fieldKeyType Field key type
    * @param {"double"|"float"|"int32"|"uint32"|"sint32"|"fixed32"|"sfixed32"|"int64"|"uint64"|"sint64"|"fixed64"|"sfixed64"|"bool"|"string"|"bytes"|Object|Constructor<{}>} fieldValueType Field value type
    * @returns {FieldDecorator} Decorator function
    * @template T extends { [key: string]: number | Long | string | boolean | Uint8Array | Buffer | number[] | Message<{}> }
    */
MapField.d = function decorateMapField(fieldId, fieldKeyType, fieldValueType) {

  // submessage value: decorate the submessage and use its name as the type
  if (typeof fieldValueType === "function")
  fieldValueType = util.decorateType(fieldValueType).name;

  // enum reference value: create a reflected copy of the enum and keep reuseing it
  else if (fieldValueType && typeof fieldValueType === "object")
    fieldValueType = util.decorateEnum(fieldValueType).name;

  return function mapFieldDecorator(prototype, fieldName) {
    util.decorateType(prototype.constructor).
    add(new MapField(fieldName, fieldId, fieldKeyType, fieldValueType));
  };
};

MapField._configure = function () {
  types = __webpack_require__(/*! ./types */ 44);
  util = __webpack_require__(/*! ./util */ 27);
};

/***/ }),
/* 49 */
/*!**************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/service.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Service;

// extends Namespace
var Namespace = __webpack_require__(/*! ./namespace */ 39);
((Service.prototype = Object.create(Namespace.prototype)).constructor = Service).className = "Service";

var Method,
util,
rpc;

/**
      * Constructs a new service instance.
      * @classdesc Reflected service.
      * @extends NamespaceBase
      * @constructor
      * @param {string} name Service name
      * @param {Object.<string,*>} [options] Service options
      * @throws {TypeError} If arguments are invalid
      */
function Service(name, options) {
  Namespace.call(this, name, options);

  /**
                                        * Service methods.
                                        * @type {Object.<string,Method>}
                                        */
  this.methods = {}; // toJSON, marker

  /**
   * Cached methods as an array.
   * @type {Method[]|null}
   * @private
   */
  this._methodsArray = null;
}

/**
   * Service descriptor.
   * @interface IService
   * @extends INamespace
   * @property {Object.<string,IMethod>} methods Method descriptors
   */

/**
       * Constructs a service from a service descriptor.
       * @param {string} name Service name
       * @param {IService} json Service descriptor
       * @returns {Service} Created service
       * @throws {TypeError} If arguments are invalid
       */
Service.fromJSON = function fromJSON(name, json) {
  var service = new Service(name, json.options);
  /* istanbul ignore else */
  if (json.methods)
  for (var names = Object.keys(json.methods), i = 0; i < names.length; ++i) {
    service.add(Method.fromJSON(names[i], json.methods[names[i]]));}
  if (json.nested)
  service.addJSON(json.nested);
  service.comment = json.comment;
  return service;
};

/**
    * Converts this service to a service descriptor.
    * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
    * @returns {IService} Service descriptor
    */
Service.prototype.toJSON = function toJSON(toJSONOptions) {
  var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
  var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
  return util.toObject([
  "options", inherited && inherited.options || undefined,
  "methods", Namespace.arrayToJSON(this.methodsArray, toJSONOptions) || /* istanbul ignore next */{},
  "nested", inherited && inherited.nested || undefined,
  "comment", keepComments ? this.comment : undefined]);

};

/**
    * Methods of this service as an array for iteration.
    * @name Service#methodsArray
    * @type {Method[]}
    * @readonly
    */
Object.defineProperty(Service.prototype, "methodsArray", {
  get: function get() {
    return this._methodsArray || (this._methodsArray = util.toArray(this.methods));
  } });


function clearCache(service) {
  service._methodsArray = null;
  return service;
}

/**
   * @override
   */
Service.prototype.get = function get(name) {
  return this.methods[name] ||
  Namespace.prototype.get.call(this, name);
};

/**
    * @override
    */
Service.prototype.resolveAll = function resolveAll() {
  var methods = this.methodsArray;
  for (var i = 0; i < methods.length; ++i) {
    methods[i].resolve();}
  return Namespace.prototype.resolve.call(this);
};

/**
    * @override
    */
Service.prototype.add = function add(object) {

  /* istanbul ignore if */
  if (this.get(object.name))
  throw Error("duplicate name '" + object.name + "' in " + this);

  if (object instanceof Method) {
    this.methods[object.name] = object;
    object.parent = this;
    return clearCache(this);
  }
  return Namespace.prototype.add.call(this, object);
};

/**
    * @override
    */
Service.prototype.remove = function remove(object) {
  if (object instanceof Method) {

    /* istanbul ignore if */
    if (this.methods[object.name] !== object)
    throw Error(object + " is not a member of " + this);

    delete this.methods[object.name];
    object.parent = null;
    return clearCache(this);
  }
  return Namespace.prototype.remove.call(this, object);
};

/**
    * Creates a runtime service using the specified rpc implementation.
    * @param {RPCImpl} rpcImpl RPC implementation
    * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
    * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
    * @returns {rpc.Service} RPC service. Useful where requests and/or responses are streamed.
    */
Service.prototype.create = function create(rpcImpl, requestDelimited, responseDelimited) {
  var rpcService = new rpc.Service(rpcImpl, requestDelimited, responseDelimited);
  for (var i = 0, method; i < /* initializes */this.methodsArray.length; ++i) {
    var methodName = util.lcFirst((method = this._methodsArray[i]).resolve().name).replace(/[^$\w_]/g, "");
    rpcService[methodName] = util.codegen(["r", "c"], util.isReserved(methodName) ? methodName + "_" : methodName)("return this.rpcCall(m,q,s,r,c)")({
      m: method,
      q: method.resolvedRequestType.ctor,
      s: method.resolvedResponseType.ctor });

  }
  return rpcService;
};

Service._configure = function () {
  Method = __webpack_require__(/*! ./method */ 50);
  util = __webpack_require__(/*! ./util */ 27);
  rpc = __webpack_require__(/*! ./rpc/service */ 51);
};

/***/ }),
/* 50 */
/*!*************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/method.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Method;

// extends ReflectionObject
var ReflectionObject = __webpack_require__(/*! ./object */ 40);
((Method.prototype = Object.create(ReflectionObject.prototype)).constructor = Method).className = "Method";

var util;

/**
           * Constructs a new service method instance.
           * @classdesc Reflected service method.
           * @extends ReflectionObject
           * @constructor
           * @param {string} name Method name
           * @param {string|undefined} type Method type, usually `"rpc"`
           * @param {string} requestType Request message type
           * @param {string} responseType Response message type
           * @param {boolean|Object.<string,*>} [requestStream] Whether the request is streamed
           * @param {boolean|Object.<string,*>} [responseStream] Whether the response is streamed
           * @param {Object.<string,*>} [options] Declared options
           * @param {string} [comment] The comment for this method
           */
function Method(name, type, requestType, responseType, requestStream, responseStream, options, comment) {

  /* istanbul ignore next */
  if (util.isObject(requestStream)) {
    options = requestStream;
    requestStream = responseStream = undefined;
  } else if (util.isObject(responseStream)) {
    options = responseStream;
    responseStream = undefined;
  }

  /* istanbul ignore if */
  if (!(type === undefined || util.isString(type)))
  throw TypeError("type must be a string");

  /* istanbul ignore if */
  if (!util.isString(requestType))
  throw TypeError("requestType must be a string");

  /* istanbul ignore if */
  if (!util.isString(responseType))
  throw TypeError("responseType must be a string");

  ReflectionObject.call(this, name, options);

  /**
                                               * Method type.
                                               * @type {string}
                                               */
  this.type = type || "rpc"; // toJSON

  /**
   * Request type.
   * @type {string}
   */
  this.requestType = requestType; // toJSON, marker

  /**
   * Whether requests are streamed or not.
   * @type {boolean|undefined}
   */
  this.requestStream = requestStream ? true : undefined; // toJSON

  /**
   * Response type.
   * @type {string}
   */
  this.responseType = responseType; // toJSON

  /**
   * Whether responses are streamed or not.
   * @type {boolean|undefined}
   */
  this.responseStream = responseStream ? true : undefined; // toJSON

  /**
   * Resolved request type.
   * @type {Type|null}
   */
  this.resolvedRequestType = null;

  /**
                                    * Resolved response type.
                                    * @type {Type|null}
                                    */
  this.resolvedResponseType = null;

  /**
                                     * Comment for this method
                                     * @type {string|null}
                                     */
  this.comment = comment;
}

/**
   * Method descriptor.
   * @interface IMethod
   * @property {string} [type="rpc"] Method type
   * @property {string} requestType Request type
   * @property {string} responseType Response type
   * @property {boolean} [requestStream=false] Whether requests are streamed
   * @property {boolean} [responseStream=false] Whether responses are streamed
   * @property {Object.<string,*>} [options] Method options
   */

/**
       * Constructs a method from a method descriptor.
       * @param {string} name Method name
       * @param {IMethod} json Method descriptor
       * @returns {Method} Created method
       * @throws {TypeError} If arguments are invalid
       */
Method.fromJSON = function fromJSON(name, json) {
  return new Method(name, json.type, json.requestType, json.responseType, json.requestStream, json.responseStream, json.options, json.comment);
};

/**
    * Converts this method to a method descriptor.
    * @param {IToJSONOptions} [toJSONOptions] JSON conversion options
    * @returns {IMethod} Method descriptor
    */
Method.prototype.toJSON = function toJSON(toJSONOptions) {
  var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
  return util.toObject([
  "type", this.type !== "rpc" && /* istanbul ignore next */this.type || undefined,
  "requestType", this.requestType,
  "requestStream", this.requestStream,
  "responseType", this.responseType,
  "responseStream", this.responseStream,
  "options", this.options,
  "comment", keepComments ? this.comment : undefined]);

};

/**
    * @override
    */
Method.prototype.resolve = function resolve() {

  /* istanbul ignore if */
  if (this.resolved)
  return this;

  this.resolvedRequestType = this.parent.lookupType(this.requestType);
  this.resolvedResponseType = this.parent.lookupType(this.responseType);

  return ReflectionObject.prototype.resolve.call(this);
};

Method._configure = function () {
  util = __webpack_require__(/*! ./util */ 27);
};

/***/ }),
/* 51 */
/*!******************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/rpc/service.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Service;
var util = __webpack_require__(/*! ../util */ 27);

// Extends EventEmitter
(Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;

/**
                                                                                         * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
                                                                                         *
                                                                                         * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
                                                                                         * @typedef rpc.ServiceMethodCallback
                                                                                         * @template TRes extends Message<TRes>
                                                                                         * @type {function}
                                                                                         * @param {Error|null} error Error, if any
                                                                                         * @param {TRes} [response] Response message
                                                                                         * @returns {undefined}
                                                                                         */

/**
                                                                                             * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
                                                                                             * @typedef rpc.ServiceMethod
                                                                                             * @template TReq extends Message<TReq>
                                                                                             * @template TRes extends Message<TRes>
                                                                                             * @type {function}
                                                                                             * @param {TReq|Properties<TReq>} request Request message or plain object
                                                                                             * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
                                                                                             * @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
                                                                                             */

/**
                                                                                                 * Constructs a new RPC service instance.
                                                                                                 * @classdesc An RPC service as returned by {@link Service#create}.
                                                                                                 * @exports rpc.Service
                                                                                                 * @extends util.EventEmitter
                                                                                                 * @constructor
                                                                                                 * @param {RPCImpl} rpcImpl RPC implementation
                                                                                                 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
                                                                                                 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
                                                                                                 */
function Service(rpcImpl, requestDelimited, responseDelimited) {

  if (typeof rpcImpl !== "function")
  throw TypeError("rpcImpl must be a function");

  util.EventEmitter.call(this);

  /**
                                 * RPC implementation. Becomes `null` once the service is ended.
                                 * @type {RPCImpl|null}
                                 */
  this.rpcImpl = rpcImpl;

  /**
                           * Whether requests are length-delimited.
                           * @type {boolean}
                           */
  this.requestDelimited = Boolean(requestDelimited);

  /**
                                                      * Whether responses are length-delimited.
                                                      * @type {boolean}
                                                      */
  this.responseDelimited = Boolean(responseDelimited);
}

/**
   * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
   * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
   * @param {Constructor<TReq>} requestCtor Request constructor
   * @param {Constructor<TRes>} responseCtor Response constructor
   * @param {TReq|Properties<TReq>} request Request message or plain object
   * @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
   * @returns {undefined}
   * @template TReq extends Message<TReq>
   * @template TRes extends Message<TRes>
   */
Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {

  if (!request)
  throw TypeError("request must be specified");

  var self = this;
  if (!callback)
  return util.asPromise(rpcCall, self, method, requestCtor, responseCtor, request);

  if (!self.rpcImpl) {
    setTimeout(function () {callback(Error("already ended"));}, 0);
    return undefined;
  }

  try {
    return self.rpcImpl(
    method,
    requestCtor[self.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
    function rpcCallback(err, response) {

      if (err) {
        self.emit("error", err, method);
        return callback(err);
      }

      if (response === null) {
        self.end( /* endedByRPC */true);
        return undefined;
      }

      if (!(response instanceof responseCtor)) {
        try {
          response = responseCtor[self.responseDelimited ? "decodeDelimited" : "decode"](response);
        } catch (err) {
          self.emit("error", err, method);
          return callback(err);
        }
      }

      self.emit("data", response, method);
      return callback(null, response);
    });

  } catch (err) {
    self.emit("error", err, method);
    setTimeout(function () {callback(err);}, 0);
    return undefined;
  }
};

/**
    * Ends this service and emits the `end` event.
    * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
    * @returns {rpc.Service} `this`
    */
Service.prototype.end = function end(endedByRPC) {
  if (this.rpcImpl) {
    if (!endedByRPC) // signal end to rpcImpl
      this.rpcImpl(null, null, null);
    this.rpcImpl = null;
    this.emit("end").off();
  }
  return this;
};

/***/ }),
/* 52 */
/*!*************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/common.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = common;

var commonRe = /\/|\./;

/**
                         * Provides common type definitions.
                         * Can also be used to provide additional google types or your own custom types.
                         * @param {string} name Short name as in `google/protobuf/[name].proto` or full file name
                         * @param {Object.<string,*>} json JSON definition within `google.protobuf` if a short name, otherwise the file's root definition
                         * @returns {undefined}
                         * @property {INamespace} google/protobuf/any.proto Any
                         * @property {INamespace} google/protobuf/duration.proto Duration
                         * @property {INamespace} google/protobuf/empty.proto Empty
                         * @property {INamespace} google/protobuf/field_mask.proto FieldMask
                         * @property {INamespace} google/protobuf/struct.proto Struct, Value, NullValue and ListValue
                         * @property {INamespace} google/protobuf/timestamp.proto Timestamp
                         * @property {INamespace} google/protobuf/wrappers.proto Wrappers
                         * @example
                         * // manually provides descriptor.proto (assumes google/protobuf/ namespace and .proto extension)
                         * protobuf.common("descriptor", descriptorJson);
                         *
                         * // manually provides a custom definition (uses my.foo namespace)
                         * protobuf.common("my/foo/bar.proto", myFooBarJson);
                         */
function common(name, json) {
  if (!commonRe.test(name)) {
    name = "google/protobuf/" + name + ".proto";
    json = { nested: { google: { nested: { protobuf: { nested: json } } } } };
  }
  common[name] = json;
}

// Not provided because of limited use (feel free to discuss or to provide yourself):
//
// google/protobuf/descriptor.proto
// google/protobuf/source_context.proto
// google/protobuf/type.proto
//
// Stripped and pre-parsed versions of these non-bundled files are instead available as part of
// the repository or package within the google/protobuf directory.

common("any", {

  /**
                 * Properties of a google.protobuf.Any message.
                 * @interface IAny
                 * @type {Object}
                 * @property {string} [typeUrl]
                 * @property {Uint8Array} [bytes]
                 * @memberof common
                 */
  Any: {
    fields: {
      type_url: {
        type: "string",
        id: 1 },

      value: {
        type: "bytes",
        id: 2 } } } });





var timeType;

common("duration", {

  /**
                      * Properties of a google.protobuf.Duration message.
                      * @interface IDuration
                      * @type {Object}
                      * @property {number|Long} [seconds]
                      * @property {number} [nanos]
                      * @memberof common
                      */
  Duration: timeType = {
    fields: {
      seconds: {
        type: "int64",
        id: 1 },

      nanos: {
        type: "int32",
        id: 2 } } } });





common("timestamp", {

  /**
                       * Properties of a google.protobuf.Timestamp message.
                       * @interface ITimestamp
                       * @type {Object}
                       * @property {number|Long} [seconds]
                       * @property {number} [nanos]
                       * @memberof common
                       */
  Timestamp: timeType });


common("empty", {

  /**
                   * Properties of a google.protobuf.Empty message.
                   * @interface IEmpty
                   * @memberof common
                   */
  Empty: {
    fields: {} } });



common("struct", {

  /**
                    * Properties of a google.protobuf.Struct message.
                    * @interface IStruct
                    * @type {Object}
                    * @property {Object.<string,IValue>} [fields]
                    * @memberof common
                    */
  Struct: {
    fields: {
      fields: {
        keyType: "string",
        type: "Value",
        id: 1 } } },




  /**
                      * Properties of a google.protobuf.Value message.
                      * @interface IValue
                      * @type {Object}
                      * @property {string} [kind]
                      * @property {0} [nullValue]
                      * @property {number} [numberValue]
                      * @property {string} [stringValue]
                      * @property {boolean} [boolValue]
                      * @property {IStruct} [structValue]
                      * @property {IListValue} [listValue]
                      * @memberof common
                      */
  Value: {
    oneofs: {
      kind: {
        oneof: [
        "nullValue",
        "numberValue",
        "stringValue",
        "boolValue",
        "structValue",
        "listValue"] } },



    fields: {
      nullValue: {
        type: "NullValue",
        id: 1 },

      numberValue: {
        type: "double",
        id: 2 },

      stringValue: {
        type: "string",
        id: 3 },

      boolValue: {
        type: "bool",
        id: 4 },

      structValue: {
        type: "Struct",
        id: 5 },

      listValue: {
        type: "ListValue",
        id: 6 } } },




  NullValue: {
    values: {
      NULL_VALUE: 0 } },



  /**
                          * Properties of a google.protobuf.ListValue message.
                          * @interface IListValue
                          * @type {Object}
                          * @property {Array.<IValue>} [values]
                          * @memberof common
                          */
  ListValue: {
    fields: {
      values: {
        rule: "repeated",
        type: "Value",
        id: 1 } } } });





common("wrappers", {

  /**
                      * Properties of a google.protobuf.DoubleValue message.
                      * @interface IDoubleValue
                      * @type {Object}
                      * @property {number} [value]
                      * @memberof common
                      */
  DoubleValue: {
    fields: {
      value: {
        type: "double",
        id: 1 } } },




  /**
                      * Properties of a google.protobuf.FloatValue message.
                      * @interface IFloatValue
                      * @type {Object}
                      * @property {number} [value]
                      * @memberof common
                      */
  FloatValue: {
    fields: {
      value: {
        type: "float",
        id: 1 } } },




  /**
                      * Properties of a google.protobuf.Int64Value message.
                      * @interface IInt64Value
                      * @type {Object}
                      * @property {number|Long} [value]
                      * @memberof common
                      */
  Int64Value: {
    fields: {
      value: {
        type: "int64",
        id: 1 } } },




  /**
                      * Properties of a google.protobuf.UInt64Value message.
                      * @interface IUInt64Value
                      * @type {Object}
                      * @property {number|Long} [value]
                      * @memberof common
                      */
  UInt64Value: {
    fields: {
      value: {
        type: "uint64",
        id: 1 } } },




  /**
                      * Properties of a google.protobuf.Int32Value message.
                      * @interface IInt32Value
                      * @type {Object}
                      * @property {number} [value]
                      * @memberof common
                      */
  Int32Value: {
    fields: {
      value: {
        type: "int32",
        id: 1 } } },




  /**
                      * Properties of a google.protobuf.UInt32Value message.
                      * @interface IUInt32Value
                      * @type {Object}
                      * @property {number} [value]
                      * @memberof common
                      */
  UInt32Value: {
    fields: {
      value: {
        type: "uint32",
        id: 1 } } },




  /**
                      * Properties of a google.protobuf.BoolValue message.
                      * @interface IBoolValue
                      * @type {Object}
                      * @property {boolean} [value]
                      * @memberof common
                      */
  BoolValue: {
    fields: {
      value: {
        type: "bool",
        id: 1 } } },




  /**
                      * Properties of a google.protobuf.StringValue message.
                      * @interface IStringValue
                      * @type {Object}
                      * @property {string} [value]
                      * @memberof common
                      */
  StringValue: {
    fields: {
      value: {
        type: "string",
        id: 1 } } },




  /**
                      * Properties of a google.protobuf.BytesValue message.
                      * @interface IBytesValue
                      * @type {Object}
                      * @property {Uint8Array} [value]
                      * @memberof common
                      */
  BytesValue: {
    fields: {
      value: {
        type: "bytes",
        id: 1 } } } });





common("field_mask", {

  /**
                        * Properties of a google.protobuf.FieldMask message.
                        * @interface IDoubleValue
                        * @type {Object}
                        * @property {number} [value]
                        * @memberof common
                        */
  FieldMask: {
    fields: {
      paths: {
        rule: "repeated",
        type: "string",
        id: 1 } } } });





/**
                         * Gets the root definition of the specified common proto file.
                         *
                         * Bundled definitions are:
                         * - google/protobuf/any.proto
                         * - google/protobuf/duration.proto
                         * - google/protobuf/empty.proto
                         * - google/protobuf/field_mask.proto
                         * - google/protobuf/struct.proto
                         * - google/protobuf/timestamp.proto
                         * - google/protobuf/wrappers.proto
                         *
                         * @param {string} file Proto file name
                         * @returns {INamespace|null} Root definition or `null` if not defined
                         */
common.get = function get(file) {
  return common[file] || null;
};

/***/ }),
/* 53 */
/*!**************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/message.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Message;

var util;

/**
           * Constructs a new message instance.
           * @classdesc Abstract runtime message.
           * @constructor
           * @param {Properties<T>} [properties] Properties to set
           * @template T extends object
           */
function Message(properties) {
  // not used internally
  if (properties)
  for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
    this[keys[i]] = properties[keys[i]];}
}

/**
   * Reference to the reflected type.
   * @name Message.$type
   * @type {Type}
   * @readonly
   */

/**
       * Reference to the reflected type.
       * @name Message#$type
       * @type {Type}
       * @readonly
       */

/*eslint-disable valid-jsdoc*/

/**
                                * Creates a new message of this type using the specified properties.
                                * @param {Object.<string,*>} [properties] Properties to set
                                * @returns {Message<T>} Message instance
                                * @template T extends Message<T>
                                * @this Constructor<T>
                                */
Message.create = function create(properties) {
  return this.$type.create(properties);
};

/**
    * Encodes a message of this type.
    * @param {T|Object.<string,*>} message Message to encode
    * @param {Writer} [writer] Writer to use
    * @returns {Writer} Writer
    * @template T extends Message<T>
    * @this Constructor<T>
    */
Message.encode = function encode(message, writer) {
  if (!arguments.length) {
    return this.$type.encode(this);
  } else if (arguments.length == 1) {
    return this.$type.encode(arguments[0]);
  } else {
    return this.$type.encode(arguments[0], arguments[1]);
  }
  //return this.$type.encode(message, writer);
};

/**
    * Encodes a message of this type preceeded by its length as a varint.
    * @param {T|Object.<string,*>} message Message to encode
    * @param {Writer} [writer] Writer to use
    * @returns {Writer} Writer
    * @template T extends Message<T>
    * @this Constructor<T>
    */
Message.encodeDelimited = function encodeDelimited(message, writer) {
  return this.$type.encodeDelimited(message, writer);
};

/**
    * Decodes a message of this type.
    * @name Message.decode
    * @function
    * @param {Reader|Uint8Array} reader Reader or buffer to decode
    * @returns {T} Decoded message
    * @template T extends Message<T>
    * @this Constructor<T>
    */
Message.decode = function decode(reader) {
  return this.$type.decode(reader);
};

/**
    * Decodes a message of this type preceeded by its length as a varint.
    * @name Message.decodeDelimited
    * @function
    * @param {Reader|Uint8Array} reader Reader or buffer to decode
    * @returns {T} Decoded message
    * @template T extends Message<T>
    * @this Constructor<T>
    */
Message.decodeDelimited = function decodeDelimited(reader) {
  return this.$type.decodeDelimited(reader);
};

/**
    * Verifies a message of this type.
    * @name Message.verify
    * @function
    * @param {Object.<string,*>} message Plain object to verify
    * @returns {string|null} `null` if valid, otherwise the reason why it is not
    */
Message.verify = function verify(message) {
  return this.$type.verify(message);
};

/**
    * Creates a new message of this type from a plain object. Also converts values to their respective internal types.
    * @param {Object.<string,*>} object Plain object
    * @returns {T} Message instance
    * @template T extends Message<T>
    * @this Constructor<T>
    */
Message.fromObject = function fromObject(object) {
  return this.$type.fromObject(object);
};

/**
    * Creates a plain object from a message of this type. Also converts values to other types if specified.
    * @param {T} message Message instance
    * @param {IConversionOptions} [options] Conversion options
    * @returns {Object.<string,*>} Plain object
    * @template T extends Message<T>
    * @this Constructor<T>
    */
Message.toObject = function toObject(message, options) {
  message = message || this;
  return this.$type.toObject(message, options);
};

/**
    * Converts this message to JSON.
    * @returns {Object.<string,*>} JSON object
    */
Message.prototype.toJSON = function toJSON() {
  return this.$type.toObject(this, util.toJSONOptions);
};



Message.set = function (key, value) {
  Message[key] = value;
};

Message.get = function (key) {
  return Message[key];
};
/*eslint-enable valid-jsdoc*/

Message._configure = function () {
  util = __webpack_require__(/*! ./util */ 27);
};

/***/ }),
/* 54 */
/*!*************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/reader.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by zhangmiao on 2018/3/13.
 */

module.exports = Reader;

var util = __webpack_require__(/*! ./util */ 27);

var LongBits;
var utf8;

var BufferReader;

function indexOutOfRange(reader, writeLength) {
  return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
}


function Reader(buffer) {

  /**
                          * Read buffer.
                          * @type {Uint8Array}
                          */
  this.buf = buffer;

  /**
                      * Read buffer position.
                      * @type {number}
                      */
  this.pos = 0;

  /**
                 * Read buffer length.
                 * @type {number}
                 */
  this.len = buffer.length;
}

var create_array = typeof Uint8Array !== "undefined" ?
function create_typed_array(buffer) {
  if (buffer === '[401,"normal closed"]') {
    return console.log('socket正常关闭');
  }
  if (buffer instanceof Uint8Array || Array.isArray(buffer))
  return new Reader(buffer);
  if (typeof ArrayBuffer !== "undefined" && buffer instanceof ArrayBuffer) //增加ArrayBuffer构建
    return new Reader(new Uint8Array(buffer));
  throw Error("illegal buffer");
}
/* istanbul ignore next */ :
function create_array(buffer) {
  if (Array.isArray(buffer))
  return new Reader(buffer);
  throw Error("illegal buffer");
};

Reader.create = util.Buffer ?
function create_buffer_setup(buffer) {
  return (Reader.create = function create_buffer(buffer) {
    return util.Buffer.isBuffer(buffer) ?
    new BufferReader(buffer)
    /* istanbul ignore next */ :
    create_array(buffer);
  })(buffer);
}
/* istanbul ignore next */ :
create_array;

Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */util.Array.prototype.slice;


Reader.prototype.uint32 = function read_uint32_setup() {
  var value = 4294967295; // optimizer type-hint, tends to deopt otherwise (?!)
  return function read_uint32() {
    value = (this.buf[this.pos] & 127) >>> 0;if (this.buf[this.pos++] < 128) return value;
    value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;if (this.buf[this.pos++] < 128) return value;
    value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;if (this.buf[this.pos++] < 128) return value;
    value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;if (this.buf[this.pos++] < 128) return value;
    value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;if (this.buf[this.pos++] < 128) return value;

    /* istanbul ignore if */
    if ((this.pos += 5) > this.len) {
      this.pos = this.len;
      throw indexOutOfRange(this, 10);
    }
    return value;
  };
}();

Reader.prototype.int32 = function read_int32() {
  return this.uint32() | 0;
};

Reader.prototype.sint32 = function read_sint32() {
  var value = this.uint32();
  return value >>> 1 ^ -(value & 1) | 0;
};

function readLongVarint() {
  // tends to deopt with local vars for octet etc.
  var bits = new LongBits(0, 0);
  var i = 0;
  if (this.len - this.pos > 4) {// fast route (lo)
    for (; i < 4; ++i) {
      // 1st..4th
      bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
      if (this.buf[this.pos++] < 128)
      return bits;
    }
    // 5th
    bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
    bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
    if (this.buf[this.pos++] < 128)
    return bits;
    i = 0;
  } else {
    for (; i < 3; ++i) {
      /* istanbul ignore if */
      if (this.pos >= this.len)
      throw indexOutOfRange(this);
      // 1st..3th
      bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
      if (this.buf[this.pos++] < 128)
      return bits;
    }
    // 4th
    bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
    return bits;
  }
  if (this.len - this.pos > 4) {// fast route (hi)
    for (; i < 5; ++i) {
      // 6th..10th
      bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
      if (this.buf[this.pos++] < 128)
      return bits;
    }
  } else {
    for (; i < 5; ++i) {
      /* istanbul ignore if */
      if (this.pos >= this.len)
      throw indexOutOfRange(this);
      // 6th..10th
      bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
      if (this.buf[this.pos++] < 128)
      return bits;
    }
  }
  /* istanbul ignore next */
  throw Error("invalid varint encoding");
}

Reader.prototype.bool = function read_bool() {
  return this.uint32() !== 0;
};


function readFixed32_end(buf, end) {// note that this uses `end`, not `pos`
  return (buf[end - 4] |
  buf[end - 3] << 8 |
  buf[end - 2] << 16 |
  buf[end - 1] << 24) >>> 0;
}

Reader.prototype.fixed32 = function read_fixed32() {

  /* istanbul ignore if */
  if (this.pos + 4 > this.len)
  throw indexOutOfRange(this, 4);

  return readFixed32_end(this.buf, this.pos += 4);
};

Reader.prototype.sfixed32 = function read_sfixed32() {

  /* istanbul ignore if */
  if (this.pos + 4 > this.len)
  throw indexOutOfRange(this, 4);

  return readFixed32_end(this.buf, this.pos += 4) | 0;
};

/* eslint-disable no-invalid-this */

function readFixed64() /* this: Reader */{

  /* istanbul ignore if */
  if (this.pos + 8 > this.len)
  throw indexOutOfRange(this, 8);

  return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
}


Reader.prototype.float = function read_float() {

  /* istanbul ignore if */
  if (this.pos + 4 > this.len)
  throw indexOutOfRange(this, 4);

  var value = util.float.readFloatLE(this.buf, this.pos);
  this.pos += 4;
  return value;
};

Reader.prototype.double = function read_double() {

  /* istanbul ignore if */
  if (this.pos + 8 > this.len)
  throw indexOutOfRange(this, 4);

  var value = util.float.readDoubleLE(this.buf, this.pos);
  this.pos += 8;
  return value;
};

Reader.prototype.bytes = function read_bytes() {
  var length = this.uint32(),
  start = this.pos,
  end = this.pos + length;

  /* istanbul ignore if */
  if (end > this.len)
  throw indexOutOfRange(this, length);
  this.pos += length;
  if (Array.isArray(this.buf)) // plain array
    return this.buf.slice(start, end);
  return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
  ? new this.buf.constructor(0) :
  this._slice.call(this.buf, start, end);
};

Reader.prototype.string = function read_string() {
  var bytes = this.bytes();
  return utf8.read(bytes, 0, bytes.length);
};

Reader.prototype.skip = function skip(length) {
  if (typeof length === "number") {
    /* istanbul ignore if */
    if (this.pos + length > this.len)
    throw indexOutOfRange(this, length);
    this.pos += length;
  } else {
    do {
      /* istanbul ignore if */
      if (this.pos >= this.len)
      throw indexOutOfRange(this);
    } while (this.buf[this.pos++] & 128);
  }
  return this;
};

Reader.prototype.skipType = function (wireType) {
  switch (wireType) {
    case 0:
      this.skip();
      break;
    case 1:
      this.skip(8);
      break;
    case 2:
      this.skip(this.uint32());
      break;
    case 3:
      do {// eslint-disable-line no-constant-condition
        if ((wireType = this.uint32() & 7) === 4)
        break;
        this.skipType(wireType);
      } while (true);
      break;
    case 5:
      this.skip(4);
      break;

    /* istanbul ignore next */
    default:
      throw Error("invalid wire type " + wireType + " at offset " + this.pos);}

  return this;
};



//这部分可能用不到
Reader._configure = function () {

  //util       = require('./util');
  LongBits = __webpack_require__(/*! ./longBits */ 29);
  utf8 = __webpack_require__(/*! ./utf8 */ 37);

  var fn = util.Long ? "toLong" : /* istanbul ignore next */"toNumber";
  util.merge(Reader.prototype, {

    int64: function read_int64() {
      return readLongVarint.call(this)[fn](false);
    },

    uint64: function read_uint64() {
      return readLongVarint.call(this)[fn](true);
    },

    sint64: function read_sint64() {
      return readLongVarint.call(this).zzDecode()[fn](false);
    },

    fixed64: function read_fixed64() {
      return readFixed64.call(this)[fn](true);
    },

    sfixed64: function read_sfixed64() {
      return readFixed64.call(this)[fn](false);
    } });


};

/***/ }),
/* 55 */
/*!***************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/verifier.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by zhangmiao on 2018/3/14.
 */
module.exports = verifier;

var Enum;
var util;

function invalid(field, expected) {
  return field.name + ": " + expected + (field.repeated && expected !== "array" ? "[]" : field.map && expected !== "object" ? "{k:" + field.keyType + "}" : "") + " expected";
}

function verifyValue(field, fieldIndex, ref, options) {
  var _types = options.types;
  if (field.resolvedType) {
    if (field.resolvedType instanceof Enum) {
      var keys = Object.keys(field.resolvedType.values);
      if (keys.indexOf(ref) < 0) {
        //没有找到时候
        return invalid(field, "enum value");
      }
    } else {
      var e = _types[fieldIndex].verify(ref);
      if (e)
      return field.name + "." + e;
    }
  } else {
    switch (field.type) {
      case "int32":
      case "uint32":
      case "sint32":
      case "fixed32":
      case "sfixed32":
        if (!util.isInteger(ref))
        return invalid(field, "integer");
        break;
      case "int64":
      case "uint64":
      case "sint64":
      case "fixed64":
      case "sfixed64":
        if (!util.isInteger(ref) && !(ref && util.isInteger(ref.low) && util.isInteger(ref.high)))
        return invalid(field, "integer|Long");
        break;
      case "float":
      case "double":
        if (typeof ref !== "number")
        return invalid(field, "number");
        break;
      case "bool":
        if (typeof ref !== "boolean")
        return invalid(field, "boolean");
        break;
      case "string":
        if (!util.isString(ref))
        return invalid(field, "string");
        break;
      case "bytes":
        if (!(ref && typeof ref.length === "number" || util.isString(ref)))
        return invalid(field, "buffer");
        break;}

  }
}

function verifyKey(field, ref) {
  switch (field.keyType) {
    case "int32":
    case "uint32":
    case "sint32":
    case "fixed32":
    case "sfixed32":
      if (!util.key32Re.test(ref))
      return invalid(field, "integer key");
      break;
    case "int64":
    case "uint64":
    case "sint64":
    case "fixed64":
    case "sfixed64":
      if (!util.key64Re.test(ref))
      return invalid(field, "integer|Long key");
      break;
    case "bool":
      if (!util.key2Re.test(ref))
      return invalid(field, "boolean key");
      break;}

}

function verifier(mtype) {
  return function (options) {
    return function (m) {
      var invalidDes;
      if (typeof m !== 'object' || m === null)
      return "object expected";

      var oneofs = mtype.oneofsArray,
      seenFirstField = {};
      var p;
      if (oneofs.length)
      p = {};
      for (var i = 0; i < mtype.fieldsArray.length; ++i) {
        var field = mtype._fieldsArray[i].resolve(),
        ref = m[field.name];
        if (!field.optional || ref != null && m.hasOwnProperty(field.name)) {
          var _i;
          if (field.map) {
            if (!util.isObject(ref))
            return invalid(field, "object");
            var k = Object.keys(ref);
            for (_i = 0; _i < k.length; ++_i) {
              //检查key值的合法性
              invalidDes = verifyKey(field, k[_i]);
              if (invalidDes) {
                return invalidDes;
              }
              //检查value值的合法性
              invalidDes = verifyValue(field, i, ref[k[_i]], options);
              if (invalidDes) {
                return invalidDes;
              }
            }
          } else if (field.repeated) {
            if (!Array.isArray(ref)) {
              return invalid(field, "array");
            }

            for (_i = 0; _i < ref.length; ++_i) {
              invalidDes = verifyValue(field, i, ref[_i], options);
              if (invalidDes) {
                return invalidDes;
              }
            }
          } else {
            if (field.partOf) {
              var oneofPropName = field.partOf.name;
              if (seenFirstField[field.partOf.name] === 1)
              if (p[oneofPropName] === 1)
              return field.partOf.name + ": multiple values";
              p[oneofPropName] = 1;
            }
            invalidDes = verifyValue(field, i, ref, options);
            if (invalidDes) {
              return invalidDes;
            }
          }
        }
      }
    };
  };
}

verifier._configure = function () {
  Enum = __webpack_require__(/*! ./enum */ 43);
  util = __webpack_require__(/*! ./util */ 27);
};

/***/ }),
/* 56 */
/*!**************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/encoder.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by zhangmiao on 2018/3/13.
 * 改写原来的googleProtocolBuffer的encode,请不要告我侵犯版权;/(ㄒoㄒ)/~~
 */
var Enum;
var types;


//得到一个编码过程
function encoder(mtype) {
  return function (options) {
    var Writer = options.Writer;
    var _types = options.types;
    var util = options.util;
    return function (message, writer) {
      writer = writer || Writer.create();
      var fields = mtype.fieldsArray.slice().sort(util.compareFieldsById);
      for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        var index = mtype._fieldsArray.indexOf(field);

        var type = field.resolvedType instanceof Enum ? 'uint32' : field.type;
        var wireType = types.basic[type];
        var ref = message[field.name];
        //此处增加枚举型替换,有可能外界传入的枚举是string,转换成number
        if (field.resolvedType instanceof Enum && typeof ref === 'string') {
          ref = _types[index]['values'][ref];
        }

        //正式进行序列化
        if (field.map) {//有待验证
          if (ref != null && message.hasOwnProperty(field.name)) {
            for (var ks = Object.keys(ref), l = 0; l < ks.length; ++l) {
              writer.uint32((field.id << 3 | 2) >>> 0).fork().uint32(8 | types.mapKey[field.keyType])[field.keyType](ks[l]);
              if (wireType === undefined) {
                _types[index].encode(ref[ks[l]], writer.uint32(18).fork()).ldelim().ldelim();
              } else {
                writer.uint32(16 | wireType)[type](ref[ks[l]]).ldelim();
              }
            }
          }
        } else if (field.repeated) {
          if (ref && ref.length) {
            if (field.packed && types.packed[type] !== undefined) {//如果数据可以被packed的话
              writer.uint32((field.id << 3 | 2) >>> 0).fork();
              for (var j = 0; j < ref.length; j++) {
                writer[type](ref[j]);
              }
              writer.ldelim();
            } else {//数据不能packed的话
              for (var k = 0; k < ref.length; k++) {
                if (wireType === undefined) {//如果是一个自定义的数据类型
                  if (field.resolvedType.group) {
                    _types[index].encode(ref[k], writer.uint32((field.id << 3 | 3) >>> 0)).uint32((field.id << 3 | 4) >>> 0);
                  } else {
                    _types[index].encode(ref[k], writer.uint32((field.id << 3 | 2) >>> 0).fork()).ldelim();
                  }
                } else {//如果是string 或者 bytes
                  writer.uint32((field.id << 3 | wireType) >>> 0)[type](ref[k]);
                }
              }
            }
          }
        } else {
          if (!field.optional || ref != null && message.hasOwnProperty(field.name) /*|| field.partOf*/) {
            if (!field.optional && (ref == null || !message.hasOwnProperty(field.name))) {
              console.warn('注意啦!!!很大概率会报错 类型:', message.$type ? message.$type.name : "不晓得", '没有设置对应的属性:', field.name, '检查是不是proto文件属性设置为了required');
            }
            if (wireType === undefined) {
              if (field.resolvedType.group) {
                _types[index].encode(ref, writer.uint32((field.id << 3 | 3) >>> 0)).uint32((field.id << 3 | 4) >>> 0);
              } else {
                _types[index].encode(ref, writer.uint32((field.id << 3 | 2) >>> 0).fork()).ldelim();
              }
            } else {
              writer.uint32((field.id << 3 | wireType) >>> 0)[type](ref);
            }
          }
        }
      }
      return writer;
    };
  };
}

module.exports = encoder;

encoder._configure = function () {
  Enum = __webpack_require__(/*! ./enum */ 43);
  types = __webpack_require__(/*! ./types */ 44);
};

/***/ }),
/* 57 */
/*!**************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/decoder.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by zhangmiao on 2018/3/13.
 */

var Enum,
types,
util;


function missing(field) {
  return "missing required '" + field.name + "'";
}

function decoder(mtype) {
  return function (options) {
    var Reader = options.Reader;
    var _types = options.types;
    var _util = options.util;
    return function (r, l) {
      if (!(r instanceof Reader))
      r = Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
      m = new this.ctor();
      var k;
      while (r.pos < c) {
        var t = r.uint32();
        if (mtype.group) {
          if ((t & 7) === 4)
          break;
        }
        var fieldId = t >>> 3;
        var i = 0;
        var find = false;
        for (; i < mtype.fieldsArray.length; ++i) {
          var field = mtype._fieldsArray[i].resolve(),
          name = field.name,
          type = field.resolvedType instanceof Enum ? "int32" : field.type;
          //ref   = m[field.name];
          if (fieldId != field.id) continue;
          find = true;
          if (field.map) {
            r.skip().pos++;
            if (m[name] === _util.emptyObject)
            m[name] = {};
            k = r[field.keyType]();
            r.pos++;
            if (types.long[field.keyType] != undefined) {
              if (types.basic[type] == undefined) {
                m[name][typeof k === 'object' ? _util.longToHash(k) : k] = _types[i].decode(r, r.uint32());
              } else {
                m[name][typeof k === 'object' ? _util.longToHash(k) : k] = r[type]();
              }
            } else {
              if (types.basic[type] == undefined) {
                m[name] = _types[i].decode(r, r.uint32());
              } else {
                m[name] = r[type]();
              }
            }
          } else if (field.repeated) {
            if (!(m[name] && m[name].length)) {
              m[name] = [];
            }

            if (types.packed[type] != undefined && (t & 7) === 2) {
              var c2 = r.uint32() + r.pos;
              while (r.pos < c2) {
                m[name].push(r[type]());}
            } else {
              if (types.basic[type] == undefined) {
                field.resolvedType.group ?
                m[name].push(_types[i].decode(r)) :
                m[name].push(_types[i].decode(r, r.uint32()));

              } else {
                m[name].push(r[type]());
              }
            }
          } else if (types.basic[type] == undefined) {
            if (field.resolvedType.group) {
              m[name] = _types[i].decode(r);
            } else {
              m[name] = _types[i].decode(r, r.uint32());
            }
          } else {
            //console.log("m",JSON.stringify(m),"type",type,"field",field);
            m[name] = r[type]();
          }
          break;
        }

        if (!find) {
          console.log("t", t);
          r.skipType(t & 7);
        }

      }

      for (i = 0; i < mtype._fieldsArray.length; ++i) {
        var rfield = mtype._fieldsArray[i];
        if (rfield.required) {
          if (!m.hasOwnProperty(rfield.name)) {
            throw util.ProtocolError(missing(rfield), { instance: m });
          }
        }
      }
      //mtype.fieldsArray.filter(function(field) { return field.map; }).length
      return m;
    };
  };
}

module.exports = decoder;
decoder._configure = function () {
  Enum = __webpack_require__(/*! ./enum */ 43);
  types = __webpack_require__(/*! ./types */ 44);
  util = __webpack_require__(/*! ./util */ 27);
};

/***/ }),
/* 58 */
/*!***************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/wrappers.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wrappers = exports;


var Message;

/**
              * From object converter part of an {@link IWrapper}.
              * @typedef WrapperFromObjectConverter
              * @type {function}
              * @param {Object.<string,*>} object Plain object
              * @returns {Message<{}>} Message instance
              * @this Type
              */

/**
                  * To object converter part of an {@link IWrapper}.
                  * @typedef WrapperToObjectConverter
                  * @type {function}
                  * @param {Message<{}>} message Message instance
                  * @param {IConversionOptions} [options] Conversion options
                  * @returns {Object.<string,*>} Plain object
                  * @this Type
                  */

/**
                      * Common type wrapper part of {@link wrappers}.
                      * @interface IWrapper
                      * @property {WrapperFromObjectConverter} [fromObject] From object converter
                      * @property {WrapperToObjectConverter} [toObject] To object converter
                      */

// Custom wrapper for Any
wrappers[".google.protobuf.Any"] = {

  fromObject: function fromObject(object) {

    // unwrap value type if mapped
    if (object && object["@type"]) {
      var type = this.lookup(object["@type"]);
      /* istanbul ignore else */
      if (type) {
        // type_url does not accept leading "."
        var type_url = object["@type"].charAt(0) === "." ?
        object["@type"].substr(1) : object["@type"];
        // type_url prefix is optional, but path seperator is required
        return this.create({
          type_url: "/" + type_url,
          value: type.encode(type.fromObject(object)).finish() });

      }
    }

    return this.fromObject(object);
  },

  toObject: function toObject(message, options) {

    // decode value if requested and unmapped
    if (options && options.json && message.type_url && message.value) {
      // Only use fully qualified type name after the last '/'
      var name = message.type_url.substring(message.type_url.lastIndexOf("/") + 1);
      var type = this.lookup(name);
      /* istanbul ignore else */
      if (type)
      message = type.decode(message.value);
    }

    // wrap value if unmapped
    if (!(message instanceof this.ctor) && message instanceof Message) {
      var object = message.$type.toObject(message, options);
      object["@type"] = message.$type.fullName;
      return object;
    }

    return this.toObject(message, options);
  } };


wrappers._configure = function () {
  Message = __webpack_require__(/*! ./message */ 53);
};

/***/ }),
/* 59 */
/*!****************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/weichatPb/src/converter.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by zhangmiao on 2018/3/14.
 * 写这个,有点难;有错误请指出 ,微信中不能Function.Apply 和evl,所以去掉其中所有的gen()
 */
var converter = module.exports;

var Enum,
util;


converter._configure = function () {
  Enum = __webpack_require__(/*! ./enum */ 43);
  util = __webpack_require__(/*! ./util */ 27);
};

function valuePartial_fromObject(field, fieldIndex, propName, options) {
  var m = options['m'];
  var d = options['d'];
  var _types = options['types'];
  var ksi = options['ksi'];
  var ksiFlag = typeof ksi != 'undefined';
  if (field.resolvedType) {
    if (field.resolvedType instanceof Enum) {
      var prop = ksiFlag ? d[propName][ksi] : d[propName];
      var values = field.resolvedType.values,
      keys = Object.keys(values);
      for (var i = 0; i < keys.length; i++) {
        if (field.repeated && values[keys[i]] === field.typeDefault) {
          continue;
        }
        if (keys[i] == prop || values[keys[i]] == prop) {
          ksiFlag ?
          m[propName][ksi] = values[keys[i]] :
          m[propName] = values[keys[i]];
          break;
        }
      }
    } else {
      if (typeof (ksiFlag ? d[propName][ksi] : d[propName]) !== 'object')
      throw TypeError(field.fullName + ": object expected");
      ksiFlag ?
      m[propName][ksi] = _types[fieldIndex].fromObject(d[propName][ksi]) :
      m[propName] = _types[fieldIndex].fromObject(d[propName]);
    }
  } else {
    var isUnsigned = false;
    switch (field.type) {
      case "double":
      case "float":
        ksiFlag ?
        m[propName][ksi] = Number(d[propName][ksi]) :
        m[propName] = Number(d[propName]);
        break;
      case "uint32":
      case "fixed32":
        ksiFlag ?
        m[propName][ksi] = d[propName][ksi] >>> 0 :
        m[propName] = d[propName] >>> 0;
        break;
      case "int32":
      case "sint32":
      case "sfixed32":
        ksiFlag ?
        m[propName][ksi] = d[propName][ksi] | 0 :
        m[propName] = d[propName] | 0;
        break;
      case "uint64":
        isUnsigned = true;
      // eslint-disable-line no-fallthrough
      case "int64":
      case "sint64":
      case "fixed64":
      case "sfixed64":
        if (util.Long)
        ksiFlag ?
        m[propName][ksi] = util.Long.fromValue(d[propName][ksi]).unsigned = isUnsigned :
        m[propName] = util.Long.fromValue(d[propName]).unsigned = isUnsigned;else
        if (typeof (ksiFlag ? d[propName][ksi] : d[propName]) === 'string')
        ksiFlag ?
        m[propName][ksi] = parseInt(d[propName][ksi], 10) :
        m[propName] = parseInt(d[propName], 10);else
        if (typeof (ksiFlag ? d[propName][ksi] : d[propName]) === 'number')
        ksiFlag ?
        m[propName][ksi] = d[propName][ksi] :
        m[propName] = d[propName];else
        if (typeof (ksiFlag ? d[propName][ksi] : d[propName]) === 'object')
        ksiFlag ?
        m[propName][ksi] = new util.LongBits(d[propName][ksi].low >>> 0, d[propName][ksi].high >>> 0).toNumber(isUnsigned) :
        m[propName] = new util.LongBits(d[propName].low >>> 0, d[propName].high >>> 0).toNumber(isUnsigned);
        break;
      case "bytes":
        if (typeof (ksiFlag ? d[propName][ksi] : d[propName]) === "string")
        ksiFlag ?
        util.base64.decode(d[propName][ksi], m[propName][ksi] = util.newBuffer(util.base64.length(d[propName][ksi])), 0) :
        util.base64.decode(d[propName], m[propName] = util.newBuffer(util.base64.length(d[propName])), 0);else
        if ((ksiFlag ? d[propName][ksi] : d[propName]).length)
        ksiFlag ?
        m[propName][ksi] = d[propName][ksi] :
        m[propName] = d[propName];
        break;
      case "string":
        ksiFlag ?
        m[propName][ksi] = String(d[propName][ksi]) :
        m[propName] = String(d[propName]);
        break;
      case "bool":
        ksiFlag ?
        m[propName][ksi] = Boolean(d[propName][ksi]) :
        m[propName] = Boolean(d[propName]);
        break;}

  }
}

/*
  * @param {Type} mtype Message type
  * @returns {Function} Function instance
  */
converter.fromObject = function fromObject(mtype) {
  var fields = mtype.fieldsArray;
  return function (options) {
    return function (d) {
      if (d instanceof this.ctor)
      return d;
      if (!fields.length)
      return new this.ctor();

      var m = new this.ctor();
      for (var i = 0; i < fields.length; ++i) {
        var field = fields[i].resolve();
        var propName = field.name;
        var _i;
        if (field.map) {
          if (d[propName]) {
            if (typeof d[propName] !== 'object')
            throw TypeError(field.fullName + ": object expected");
            m[propName] = {};
          }
          var ks = Object.keys(d[propName]);
          for (_i = 0; _i < ks.length; ++_i) {
            valuePartial_fromObject(field, i, propName, util.merge(util.copy(options), { m: m, d: d, ksi: ks[_i] }));}
        } else if (field.repeated) {
          if (d[propName]) {
            if (!Array.isArray(d[propName]))
            throw TypeError(field.fullName + ": array expected");
            m[propName] = [];
            for (_i = 0; _i < d[propName].length; ++_i) {
              valuePartial_fromObject(field, i, propName, util.merge(util.copy(options), {
                m: m,
                d: d,
                ksi: _i }));

            }
          }
        } else {
          if (field.resolvedType instanceof Enum || d[propName] != null) {
            valuePartial_fromObject(field, i, propName, util.merge(util.copy(options), { m: m, d: d }));
          }
        }
      }
      return m;
    };
  };
};


function valuePartial_toObject(field, fieldIndex, propName, options) {
  var m = options['m'];
  var d = options['d'];
  var _types = options['types'];
  var ksi = options['ksi'];
  var o = options['o'];
  var ksiFlag = typeof ksi != 'undefined';
  if (field.resolvedType) {
    if (field.resolvedType instanceof Enum)
    ksiFlag ?
    d[propName][ksi] = o.enums === String ? _types[fieldIndex].values[m[propName][ksi]] : m[propName][ksi] :
    d[propName] = o.enums === String ? _types[fieldIndex].values[m[propName]] : m[propName];else

    ksiFlag ?
    d[propName][ksi] = _types[fieldIndex].toObject(m[propName][ksi], o) :
    d[propName] = _types[fieldIndex].toObject(m[propName], o);
  } else {
    var isUnsigned = false;
    switch (field.type) {
      case "double":
      case "float":
        ksiFlag ? d[propName][ksi] = o.json && !isFinite(m[propName][ksi]) ? String(m[propName][ksi]) : m[propName][ksi] :
        d[propName] = o.json && !isFinite(m[propName]) ? String(m[propName]) : m[propName];
        break;
      case "uint64":
        isUnsigned = true;
      // eslint-disable-line no-fallthrough
      case "int64":
      case "sint64":
      case "fixed64":
      case "sfixed64":
        if (typeof m[propName][ksi] === 'number')
        ksiFlag ?
        d[propName][ksi] = o.longs === String ? String(m[propName][ksi]) : m[propName][ksi] :
        d[propName] = o.longs === String ? String(m[propName]) : m[propName];else

        ksiFlag ?
        d[propName][ksi] =
        o.longs === String ?
        util.Long.prototype.toString.call(m[propName][ksi]) :
        o.longs === Number ? new util.LongBits(m[propName][ksi].low >>> 0, m[propName][ksi].high >>> 0).toNumber(isUnsigned) : m[propName][ksi] :
        d[propName] =
        o.longs === String ?
        util.Long.prototype.toString.call(m[propName]) :
        o.longs === Number ? new util.LongBits(m[propName].low >>> 0, m[propName].high >>> 0).toNumber(isUnsigned) : m[propName];
        break;
      case "bytes":
        ksiFlag ?
        d[propName][ksi] =
        o.bytes === String ?
        util.base64.encode(m[propName][ksi], 0, m[propName][ksi].length) :
        o.bytes === Array ? Array.prototype.slice.call(m[propName][ksi]) : m[propName][ksi] :
        d[propName] =
        o.bytes === String ?
        util.base64.encode(m[propName], 0, m[propName].length) :
        o.bytes === Array ? Array.prototype.slice.call(m[propName]) : m[propName];
        break;
      default:
        ksiFlag ? d[propName][ksi] = m[propName][ksi] : d[propName] = m[propName];
        break;}

  }
}


converter.toObject = function toObject(mtype) {
  var fields = mtype.fieldsArray.slice().sort(util.compareFieldsById);
  return function (options) {
    if (!fields.length)
    return function () {
      return {};
    };
    return function (m, o) {
      o = o || {};
      var d = {};
      var repeatedFields = [],
      mapFields = [],
      normalFields = [],
      field,
      propName,
      i = 0;
      for (; i < fields.length; ++i) {
        if (!fields[i].partOf)
        (fields[i].resolve().repeated ? repeatedFields :
        fields[i].map ? mapFields :
        normalFields).push(fields[i]);}

      if (repeatedFields.length) {
        if (o.arrays || o.defaults) {
          for (i = 0; i < repeatedFields.length; ++i) {
            d[repeatedFields[i].name] = [];}
        }
      }

      if (mapFields.length) {
        if (o.objects || o.defaults) {
          for (i = 0; i < mapFields.length; ++i) {
            d[mapFields[i].name] = {};}
        }
      }

      if (normalFields.length) {
        if (o.defaults) {
          for (i = 0; i < normalFields.length; ++i) {
            field = normalFields[i],
            propName = field.name;
            if (field.resolvedType instanceof Enum)
            d[propName] = o.enums = String ? field.resolvedType.valuesById[field.typeDefault] : field.typeDefault;else
            if (field.long) {
              if (util.Long) {
                var n = new util.Long(field.typeDefault.low, field.typeDefault.high, field.typeDefault.unsigned);
                d[propName] = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
              } else {
                d[propName] = o.longs === String ? field.typeDefault.toString() : field.typeDefault.toNumber();
              }
            } else if (field.bytes) {
              d[propName] = o.bytes === String ? String.fromCharCode.apply(String, field.typeDefault) : Array.prototype.slice.call(field.typeDefault).join('*..*').split("*..*");
            } else {
              d[propName] = field.typeDefault;
            }

          }
        }
      }
      var hasKs2 = false;
      for (i = 0; i < fields.length; ++i) {
        field = fields[i];
        propName = field.name;
        var index = mtype._fieldsArray.indexOf(field);
        var ks2;
        var j;
        if (field.map) {
          if (!hasKs2) {
            hasKs2 = true;
          }
          if (m[propName] && (ks2 = Object.keys(m[propName]).length)) {
            d[propName] = {};
            for (j = 0; j < ks2.length; ++j) {
              valuePartial_toObject(field, index, propName, util.merge(util.copy(options), { m: m, d: d, ksi: ks2[j], o: o }));
            }
          }
        } else if (field.repeated) {
          if (m[propName] && m[propName].length) {
            d[propName] = [];
            for (j = 0; j < m[propName].length; ++j) {
              valuePartial_toObject(field, index, propName, util.merge(util.copy(options), { m: m, d: d, ksi: j, o: o }));
            }
          }
        } else {
          if (m[propName] != null && m.hasOwnProperty(propName) /*|| field.partOf*/) {
            valuePartial_toObject(field, index, propName, util.merge(util.copy(options), { m: m, d: d, o: o }));
          }
          if (field.partOf) {
            if (o.oneofs)
            d[field.partOf.name] = propName;
          }
        }
      }
      return d;
    };
  };


};

/***/ }),
/* 60 */
/*!******************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/sdk/src/utils/wxUtils.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _status = _interopRequireDefault(__webpack_require__(/*! ../status */ 11));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var _code = (0, _status.default)();
var _tmpUtilXHR = false;
var _hasFormData = typeof FormData !== "undefined";
var _hasBlob = typeof Blob !== "undefined";
var _isCanSetRequestHeader = true;
var _hasOverrideMimeType = _tmpUtilXHR.overrideMimeType || false;
var _isCanUploadFileAsync = _isCanSetRequestHeader && _hasFormData;
var _isCanUploadFile = _isCanUploadFileAsync || false;
var _isCanDownLoadFile = _isCanSetRequestHeader && (_hasBlob || _hasOverrideMimeType);
var EMPTYFN = function EMPTYFN() {};
if (!Object.keys) {
  Object.keys = function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
    hasDontEnumBug = !{ toString: null }.propertyIsEnumerable('toString'),
    dontEnums = [
    'toString',
    'toLocaleString',
    'valueOf',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'constructor'],

    dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [],prop,i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }();
}

var utils = {
  hasFormData: _hasFormData,

  hasBlob: _hasBlob,

  emptyfn: EMPTYFN,

  isCanSetRequestHeader: _isCanSetRequestHeader,

  hasOverrideMimeType: _hasOverrideMimeType,

  isCanUploadFileAsync: _isCanUploadFileAsync,

  isCanUploadFile: _isCanUploadFile,

  isCanDownLoadFile: _isCanDownLoadFile,
  isSupportWss: true,
  hasFlash: false,
  xmlrequest: false,

  stringify: function stringify(json) {
    if (typeof JSON !== 'undefined' && JSON.stringify) {
      return JSON.stringify(json);
    } else {
      var s = '',
      arr = [];

      var iterate = function iterate(json) {
        var isArr = false;

        if (Object.prototype.toString.call(json) === '[object Array]') {
          arr.push(']', '[');
          isArr = true;
        } else if (Object.prototype.toString.call(json) === '[object Object]') {
          arr.push('}', '{');
        }

        for (var o in json) {
          if (Object.prototype.toString.call(json[o]) === '[object Null]') {
            json[o] = 'null';
          } else if (Object.prototype.toString.call(json[o]) === '[object Undefined]') {
            json[o] = 'undefined';
          }

          if (json[o] && typeof json[o] === 'object') {
            s += ',' + (isArr ? '' : '"' + o + '":' + (isArr ? '"' : '')) + iterate(json[o]) + '';
          } else {
            s += ',"' + (isArr ? '' : o + '":"') + json[o] + '"';
          }
        }

        if (s != '') {
          s = s.slice(1);
        }

        return arr.pop() + s + arr.pop();
      };
      return iterate(json);
    }
  },
  login: function login(options) {
    var options = options || {};
    var suc = options.success || EMPTYFN;
    var err = options.error || EMPTYFN;

    var appKey = options.appKey || '';
    var devInfos = appKey.split('#');
    if (devInfos.length !== 2) {
      err({
        type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR });

      return false;
    }

    var orgName = devInfos[0];
    var appName = devInfos[1];
    var https = https || options.https;
    var user = options.user || '';
    var pwd = options.pwd || '';

    var apiUrl = options.apiUrl;

    var loginJson = {
      grant_type: 'password',
      username: user,
      password: pwd,
      timestamp: +new Date() };

    var loginfo = utils.stringify(loginJson);

    var options = {
      url: apiUrl + '/' + orgName + '/' + appName + '/token',
      dataType: 'json',
      data: loginfo,
      success: suc,
      error: err };

    return utils.ajax(options);
  },

  getFileUrl: function getFileUrl(fileInputId) {
    var uri = {
      url: '',
      filename: '',
      filetype: '',
      data: '' };


    var fileObj = typeof fileInputId === 'string' ? document.getElementById(fileInputId) : fileInputId;

    if (!utils.isCanUploadFileAsync || !fileObj) {
      return uri;
    }
    try {
      if (window.URL.createObjectURL) {
        var fileItems = fileObj.files;
        if (fileItems.length > 0) {
          var u = fileItems.item(0);
          uri.data = u;
          uri.url = window.URL.createObjectURL(u);
          uri.filename = u.name || '';
        }
      } else {// IE
        var u = document.getElementById(fileInputId).value;
        uri.url = u;
        var pos1 = u.lastIndexOf('/');
        var pos2 = u.lastIndexOf('\\');
        var pos = Math.max(pos1, pos2);
        if (pos < 0)
        uri.filename = u;else

        uri.filename = u.substring(pos + 1);
      }
      var index = uri.filename.lastIndexOf('.');
      if (index != -1) {
        uri.filetype = uri.filename.substring(index + 1).toLowerCase();
      }
      return uri;

    } catch (e) {
      throw e;
    }
  },

  getFileSize: function getFileSize(fileInputId) {
    var file = document.getElementById(fileInputId);
    var fileSize = 0;
    if (file) {
      if (file.files) {
        if (file.files.length > 0) {
          fileSize = file.files[0].size;
        }
      }
    }
    return fileSize;
  },


  trim: function trim(str) {

    str = typeof str === 'string' ? str : '';

    return str.trim ?
    str.trim() :
    str.replace(/^\s|\s$/g, '');
  },

  // parseEmoji: function (msg) {
  //     if (typeof WebIM.Emoji === 'undefined' || typeof WebIM.Emoji.map === 'undefined') {
  //         return msg;
  //     } else {
  //         var emoji = WebIM.Emoji,
  //             reg = null;

  //         for (var face in emoji.map) {
  //             if (emoji.map.hasOwnProperty(face)) {
  //                 while (msg.indexOf(face) > -1) {
  //                     msg = msg.replace(face, '<img class="emoji" src="' + emoji.path + emoji.map[face] + '" />');
  //                 }
  //             }
  //         }
  //         return msg;
  //     }
  // },

  parseLink: function parseLink(msg) {

    var reg = /(https?\:\/\/|www\.)([a-zA-Z0-9-]+(\.[a-zA-Z0-9]+)+)(\:[0-9]{2,4})?\/?((\.[:_0-9a-zA-Z-]+)|[:_0-9a-zA-Z-]*\/?)*\??[:_#@*&%0-9a-zA-Z-/=]*/gm;

    msg = msg.replace(reg, function (v) {

      var prefix = /^https?/gm.test(v);

      return "<a href='" + (
      prefix ? v : '//' + v) +
      "' target='_blank'>" +
      v +
      "</a>";

    });

    return msg;

  },

  parseJSON: function parseJSON(data) {

    if (window.JSON && window.JSON.parse) {
      return window.JSON.parse(data + '');
    }

    var requireNonComma,
    depth = null,
    str = utils.trim(data + '');

    return str && !utils.trim(
    str.replace(/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g,
    function (token, comma, open, close) {

      if (requireNonComma && comma) {
        depth = 0;
      }

      if (depth === 0) {
        return token;
      }

      requireNonComma = open || comma;
      depth += !close - !open;
      return '';
    })) ?

    Function('return ' + str)() :
    Function('Invalid JSON: ' + data)();
  },

  parseUploadResponse: function parseUploadResponse(response) {
    return response.indexOf('callback') > -1 ? //lte ie9
    response.slice(9, -1) : response;
  },

  parseDownloadResponse: function parseDownloadResponse(response) {
    return response && response.type && response.type === 'application/json' ||
    0 > Object.prototype.toString.call(response).indexOf('Blob') ?
    this.url + '?token=' : window.URL.createObjectURL(response);
  },

  uploadFile: function uploadFile(options) {
    var options = options || {};
    options.onFileUploadProgress = options.onFileUploadProgress || EMPTYFN;
    options.onFileUploadComplete = options.onFileUploadComplete || EMPTYFN;
    options.onFileUploadError = options.onFileUploadError || EMPTYFN;
    options.onFileUploadCanceled = options.onFileUploadCanceled || EMPTYFN;

    var acc = options.accessToken || this.context.accessToken;
    if (!acc) {
      options.onFileUploadError({
        type: _code.WEBIM_UPLOADFILE_NO_LOGIN,
        id: options.id });

      return;
    }

    var orgName, appName, devInfos;
    var appKey = options.appKey || this.context.appKey || '';

    if (appKey) {
      devInfos = appKey.split('#');
      orgName = devInfos[0];
      appName = devInfos[1];
    }

    if (!orgName && !appName) {
      options.onFileUploadError({
        type: _code.WEBIM_UPLOADFILE_ERROR,
        id: options.id });

      return;
    }

    var apiUrl = options.apiUrl;
    if (this.isHttpDNS) {
      apiUrl = this.apiUrl;
    }
    var uploadUrl = apiUrl + '/' + orgName + '/' + appName + '/chatfiles';

    if (!utils.isCanUploadFileAsync) {
      if (utils.hasFlash && typeof options.flashUpload === 'function') {
        options.flashUpload && options.flashUpload(uploadUrl, options);
      } else {
        options.onFileUploadError({
          type: _code.WEBIM_UPLOADFILE_BROWSER_ERROR,
          id: options.id });

      }
      return;
    }

    var fileSize = options.file.data ? options.file.data.size : undefined;
    if (fileSize <= 0) {
      options.onFileUploadError({
        type: _code.WEBIM_UPLOADFILE_ERROR,
        id: options.id });

      return;
    }

    var xhr = utils.xmlrequest();
    var onError = function onError(e) {
      options.onFileUploadError({
        type: _code.WEBIM_UPLOADFILE_ERROR,
        id: options.id,
        xhr: xhr });

    };
    if (xhr.upload) {
      xhr.upload.addEventListener('progress', options.onFileUploadProgress, false);
    }
    if (xhr.addEventListener) {
      xhr.addEventListener('abort', options.onFileUploadCanceled, false);
      xhr.addEventListener('load', function (e) {
        try {
          var json = utils.parseJSON(xhr.responseText);
          try {
            options.onFileUploadComplete(json);
          } catch (e) {
            options.onFileUploadError({
              type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
              data: e });

          }
        } catch (e) {
          options.onFileUploadError({
            type: _code.WEBIM_UPLOADFILE_ERROR,
            data: xhr.responseText,
            id: options.id,
            xhr: xhr });

        }
      }, false);
      xhr.addEventListener('error', onError, false);
    } else if (xhr.onreadystatechange) {
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (ajax.status === 200) {
            try {
              var json = utils.parseJSON(xhr.responseText);
              options.onFileUploadComplete(json);
            } catch (e) {
              options.onFileUploadError({
                type: _code.WEBIM_UPLOADFILE_ERROR,
                data: xhr.responseText,
                id: options.id,
                xhr: xhr });

            }
          } else {
            options.onFileUploadError({
              type: _code.WEBIM_UPLOADFILE_ERROR,
              data: xhr.responseText,
              id: options.id,
              xhr: xhr });

          }
        } else {
          xhr.abort();
          options.onFileUploadCanceled();
        }
      };
    }

    xhr.open('POST', uploadUrl);

    xhr.setRequestHeader('restrict-access', 'true');
    xhr.setRequestHeader('Accept', '*/*'); // Android QQ browser has some problem with this attribute.
    xhr.setRequestHeader('Authorization', 'Bearer ' + acc);

    var formData = new FormData();
    formData.append('file', options.file.data);
    // fix: ie8 status error
    window.XDomainRequest && (xhr.readyState = 2);
    xhr.send(formData);
  },


  download: function download(options) {
    options.onFileDownloadComplete = options.onFileDownloadComplete || EMPTYFN;
    options.onFileDownloadError = options.onFileDownloadError || EMPTYFN;

    var accessToken = options.accessToken || this.context.accessToken;
    var xhr = utils.xmlrequest();
    if (!accessToken) {
      options.onFileDownloadError({
        type: _code.WEBIM_DOWNLOADFILE_NO_LOGIN,
        id: options.id });

      return;
    }

    var onError = function onError(e) {
      options.onFileDownloadError({
        type: _code.WEBIM_DOWNLOADFILE_ERROR,
        id: options.id,
        xhr: xhr });

    };

    if (!utils.isCanDownLoadFile) {
      options.onFileDownloadComplete();
      return;
    }
    if ('addEventListener' in xhr) {
      xhr.addEventListener('load', function (e) {
        options.onFileDownloadComplete(xhr.response, xhr);
      }, false);
      xhr.addEventListener('error', onError, false);
    } else if ('onreadystatechange' in xhr) {
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (ajax.status === 200) {
            options.onFileDownloadComplete(xhr.response, xhr);
          } else {
            options.onFileDownloadError({
              type: _code.WEBIM_DOWNLOADFILE_ERROR,
              id: options.id,
              xhr: xhr });

          }
        } else {
          xhr.abort();
          options.onFileDownloadError({
            type: _code.WEBIM_DOWNLOADFILE_ERROR,
            id: options.id,
            xhr: xhr });

        }
      };
    }

    var method = options.method || 'GET';
    var resType = options.responseType || 'blob';
    var mimeType = options.mimeType || 'text/plain; charset=x-user-defined';
    xhr.open(method, options.url);
    if (typeof Blob !== 'undefined') {
      xhr.responseType = resType;
    } else {
      xhr.overrideMimeType(mimeType);
    }

    var innerHeaer = {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/octet-stream',
      'share-secret': options.secret,
      'Authorization': 'Bearer ' + accessToken };

    var headers = options.headers || {};
    for (var key in headers) {
      innerHeaer[key] = headers[key];
    }
    for (var key in innerHeaer) {
      if (innerHeaer[key]) {
        xhr.setRequestHeader(key, innerHeaer[key]);
      }
    }
    // fix: ie8 status error
    window.XDomainRequest && (xhr.readyState = 2);
    xhr.send(null);
  },

  parseTextMessage: function parseTextMessage(message, faces) {
    if (typeof message !== 'string') {
      return;
    }

    if (Object.prototype.toString.call(faces) !== '[object Object]') {
      return {
        isemoji: false,
        body: [
        {
          type: 'txt',
          data: message }] };



    }

    var receiveMsg = message;
    var emessage = [];
    var expr = /\[[^[\]]{2,3}\]/mg;
    var emoji = receiveMsg.match(expr);

    if (!emoji || emoji.length < 1) {
      return {
        isemoji: false,
        body: [
        {
          type: 'txt',
          data: message }] };



    }
    var isemoji = false;
    for (var i = 0; i < emoji.length; i++) {
      var tmsg = receiveMsg.substring(0, receiveMsg.indexOf(emoji[i])),
      existEmoji = faces.map[emoji[i]];

      if (tmsg) {
        emessage.push({
          type: 'txt',
          data: tmsg });

      }
      if (!existEmoji) {
        emessage.push({
          type: 'txt',
          data: emoji[i] });

        continue;
      }
      var emojiStr = faces.map ? faces.path + existEmoji : null;

      if (emojiStr) {
        isemoji = true;
        emessage.push({
          type: 'emoji',
          data: emojiStr });

      } else {
        emessage.push({
          type: 'txt',
          data: emoji[i] });

      }
      var restMsgIndex = receiveMsg.indexOf(emoji[i]) + emoji[i].length;
      receiveMsg = receiveMsg.substring(restMsgIndex);
    }
    if (receiveMsg) {
      emessage.push({
        type: 'txt',
        data: receiveMsg });

    }
    if (isemoji) {
      return {
        isemoji: isemoji,
        body: emessage };

    }
    return {
      isemoji: false,
      body: [
      {
        type: 'txt',
        data: message }] };



  },

  ajax: function ajax(options) {
    var suc = options.success || EMPTYFN;
    var error = options.error || EMPTYFN;
    var type = options.type || "POST",
    data = options.data || null,
    tempData = "";

    if (type.toLowerCase() === "get" && data) {
      for (var o in data) {
        if (data.hasOwnProperty(o)) {
          tempData += o + "=" + data[o] + "&";
        }
      }
      tempData = tempData ? tempData.slice(0, -1) : tempData;
      options.url += (options.url.indexOf("?") > 0 ? "&" : "?") + (tempData ? tempData + "&" : tempData) + "_v=" + new Date().getTime();
      data = null;
      tempData = null;
    }
    wx.request({
      url: options.url,
      data: options.data,
      header: options.headers,
      method: type,
      success: function success(res) {
        // console.log("wx.request.success", arguments);
        if (res.statusCode == "200") {
          suc(res.data);
        } else
        {
          error(res);
        }
      },
      complete: function complete() {
        // console.log("wx.request.complete", arguments);
      },
      fail: function fail(e) {
        error(e);
        // console.log("wx.request.fail", arguments);
      } });

  },
  ts: function ts() {
    var d = new Date();
    var Hours = d.getHours(); //获取当前小时数(0-23)
    var Minutes = d.getMinutes(); //获取当前分钟数(0-59)
    var Seconds = d.getSeconds(); //获取当前秒数(0-59)
    var Milliseconds = d.getMilliseconds(); //获取当前毫秒
    return (Hours < 10 ? "0" + Hours : Hours) + ':' + (Minutes < 10 ? "0" + Minutes : Minutes) + ':' + (Seconds < 10 ? "0" + Seconds : Seconds) + ':' + Milliseconds + ' ';
  },

  getObjectKey: function getObjectKey(obj, val) {
    for (var key in obj) {
      if (obj[key] == val) {
        return key;
      }
    }
    return '';
  },

  sprintf: function sprintf() {
    var arg = arguments,
    str = arg[0] || '',
    i,len;
    for (i = 1, len = arg.length; i < len; i++) {
      str = str.replace(/%s/, arg[i]);
    }
    return str;
  },

  reverse: function reverse(array) {
    var newArray = [];
    if (Array.prototype.reverse) {
      newArray = array.reverse();
    } else {
      for (var i = 0; i < array.length; i++) {
        newArray.unshift(array[i]);
      }
    }
    return newArray;
  },

  getEnv: function getEnv() {
    var wxMiniProgram = true;
    try {
      if (window && navigator) {
        wxMiniProgram = false;
      } else {
        wxMiniProgram = true;
      }
    } catch (e) {
      wxMiniProgram = true;
    }
    return wxMiniProgram;
  } };


utils.checkArray = function checkArray(arr, queue) {
  var turnOff = 'off';
  arr.forEach(function (item, index) {
    if (item.name === queue.name) {
      turnOff = 'on';
      return index;
    }
  });
  if (turnOff == 'off') {
    return false;
  }
};

utils._listenNetwork = function (onlineCallback, offlineCallback) {

};var _default =


utils;exports.default = _default;

/***/ }),
/* 61 */
/*!**************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/utils/WebIMConfig.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * git do not control webim.config.js
                                                                                                      * everyone should copy webim.config.js to webim.config.js
                                                                                                      * and have their own configs.
                                                                                                      * In this way , others won't be influenced by this config while git pull.
                                                                                                      *
                                                                                                      */
// for react native
var location = {
  protocol: "https" };

var config = {
  /*
                * XMPP server
                */
  xmppURL: "wss://im-api-wechat.easemob.com/websocket",
  // xmppURL: '172.17.3.122:5280',

  /*
   * Backend REST API URL
   */
  // apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com',
  // ios must be https!!! by lwz
  apiURL: "https://a1.easemob.com",
  // apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//172.17.3.155:8080',

  /*
   * Application AppKey
   */
  appkey: "easemob-demo#chatdemoui",

  /*
                                      * Whether to use HTTPS      '1177161227178308#xcx'
                                      * @parameter {Boolean} true or false
                                      */
  https: false,

  /*
                 * isMultiLoginSessions
                 * true: A visitor can sign in to multiple webpages and receive messages at all the webpages.
                 * false: A visitor can sign in to only one webpage and receive messages at the webpage.
                 */
  isMultiLoginSessions: false,

  /**
                                * Whether to use window.doQuery()
                                * @parameter {Boolean} true or false
                                */
  isWindowSDK: false,

  /**
                       * isSandBox=true:  xmppURL: 'im-api.sandbox.easemob.com',  apiURL: '//a1.sdb.easemob.com',
                       * isSandBox=false: xmppURL: 'im-api.easemob.com',          apiURL: '//a1.easemob.com',
                       * @parameter {Boolean} true or false
                       */
  isSandBox: false,

  /**
                     * Whether to console.log in strophe.log()
                     * @parameter {Boolean} true or false
                     */
  isDebug: false,

  /**
                   * will auto connect the xmpp server autoReconnectNumMax times in background when client is offline.
                   * won't auto connect if autoReconnectNumMax=0.
                   */
  autoReconnectNumMax: 15,

  /**
                            * the interval secons between each atuo reconnectting.
                            * works only if autoReconnectMaxNum >= 2.
                            */
  autoReconnectInterval: 2,

  /**
                             * webrtc supports WebKit and https only
                             */
  isWebRTC: false,

  /*
                    * Set to auto sign-in
                    */
  isAutoLogin: true };var _default =

config;exports.default = _default;

/***/ }),
/* 62 */
/*!******************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/comps/chat/msgstorage.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Disp = __webpack_require__(/*! ../../utils/Dispatcher.js */ 63);

var msgPackager = __webpack_require__(/*! ./msgpackager.js */ 64);

var msgType = __webpack_require__(/*! ./msgtype.js */ 65);

var msgStorage = new Disp();

var disp = __webpack_require__(/*! ../../utils/broadcast.js */ 66);

msgStorage.saveReceiveMsg = function (receiveMsg, type) {
  var sendableMsg;

  if (type == msgType.IMAGE) {
    sendableMsg = {
      id: receiveMsg.id,
      type: type,
      body: {
        id: receiveMsg.id,
        from: receiveMsg.from,
        to: receiveMsg.to,
        type: receiveMsg.type,
        ext: receiveMsg.ext,
        chatType: receiveMsg.type,
        toJid: "",
        body: {
          type: type,
          url: receiveMsg.url,
          filename: receiveMsg.filename,
          filetype: receiveMsg.filetype,
          size: {
            width: receiveMsg.width,
            height: receiveMsg.height } } } };




  } else if (type == msgType.TEXT || type == msgType.EMOJI) {
    sendableMsg = {
      id: receiveMsg.id,
      type: type,
      body: {
        id: receiveMsg.id,
        from: receiveMsg.from,
        to: receiveMsg.to,
        type: receiveMsg.type,
        ext: receiveMsg.ext,
        chatType: receiveMsg.type,
        toJid: "",
        body: {
          type: type,
          msg: receiveMsg.data } },


      value: receiveMsg.data };

  } else if (type == msgType.FILE) {
    sendableMsg = {
      id: receiveMsg.id,
      type: type,
      body: {
        id: receiveMsg.id,
        length: receiveMsg.file_length,
        from: receiveMsg.from,
        to: receiveMsg.to,
        type: receiveMsg.type,
        ext: receiveMsg.ext,
        chatType: receiveMsg.type,
        toJid: "",
        body: {
          type: type,
          url: receiveMsg.url,
          filename: receiveMsg.filename,
          msg: "当前不支持此格式消息展示" } },


      value: receiveMsg.data };

  } else if (type == msgType.AUDIO) {
    sendableMsg = {
      id: receiveMsg.id,
      type: type,
      accessToken: receiveMsg.token || receiveMsg.accessToken,
      body: {
        id: receiveMsg.id,
        length: receiveMsg.length,
        from: receiveMsg.from,
        to: receiveMsg.to,
        type: receiveMsg.type,
        ext: receiveMsg.ext,
        chatType: type,
        toJid: "",
        body: {
          type: type,
          url: receiveMsg.url,
          filename: receiveMsg.filename,
          filetype: receiveMsg.filetype,
          from: receiveMsg.from,
          to: receiveMsg.to } } };



  } else {
    return;
  }

  this.saveMsg(sendableMsg, type, receiveMsg);
};

msgStorage.saveMsg = function (sendableMsg, type, receiveMsg) {
  //console.log('sendableMsgsendableMsg', sendableMsg)
  var me = this;
  var myName = wx.getStorageSync("myUsername");
  var sessionKey; // 仅用作群聊收消息，发消息没有 receiveMsg

  if (receiveMsg && receiveMsg.type == "groupchat") {
    sessionKey = receiveMsg.to + myName;
  } // 群聊发 & 单发 & 单收
  else {
      sessionKey = sendableMsg.body.from == myName ? sendableMsg.body.to + myName : sendableMsg.body.from + myName;
    }

  var curChatMsg = wx.getStorageSync(sessionKey) || [];
  var renderableMsg = msgPackager(sendableMsg, type, myName);

  if (type == msgType.AUDIO) {
    renderableMsg.msg.length = sendableMsg.body.length;
    renderableMsg.msg.token = sendableMsg.accessToken;
  }

  curChatMsg.push(renderableMsg); //console.log('renderableMsgrenderableMsg', renderableMsg)

  if (type == msgType.AUDIO) {
    renderableMsg.msg.token = sendableMsg.accessToken; //如果是音频则请求服务器转码
  }


  save();

  function save() {
    wx.setStorage({
      key: sessionKey,
      data: curChatMsg,

      success: function success() {
        if (type == msgType.AUDIO || type == msgType.VIDEO) {
          disp.fire('em.chat.audio.fileLoaded');
        }

        me.fire("newChatMsg", renderableMsg, type, curChatMsg, sessionKey);
      } });


  }
};

module.exports = msgStorage;

/***/ }),
/* 63 */
/*!*************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/utils/Dispatcher.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var dispCbs = [];
var dispIns = [];

function Dispatcher() {
  dispIns.push(this);
  dispCbs.push({});
}

Dispatcher.prototype = {
  on: function on(type, cb) {
    var cbtypes = dispCbs[dispIns.indexOf(this)];
    var cbs = cbtypes[type] = cbtypes[type] || [];

    if (!~cbs.indexOf(cb)) {
      cbs.push(cb);
    }
  },

  off: function off(type, cb) {
    var cbtypes = dispCbs[dispIns.indexOf(this)];
    var cbs = cbtypes[type] = cbtypes[type] || [];
    var curTypeCbIdx = cbs.indexOf(cb);

    if (~curTypeCbIdx) {
      cbs.splice(curTypeCbIdx, 1);
    }
  },

  fire: function fire(type) {
    var cbtypes = dispCbs[dispIns.indexOf(this)];
    var cbs = cbtypes[type] = cbtypes[type] || [];for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {args[_key - 1] = arguments[_key];}

    for (var i = 0; i < cbs.length; i++) {
      cbs[i].apply(null, args);
    }
  } };


module.exports = Dispatcher;

/***/ }),
/* 64 */
/*!*******************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/comps/chat/msgpackager.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var WebIM = __webpack_require__(/*! ../../utils/WebIM.js */ 8)["default"];

var msgType = __webpack_require__(/*! ./msgtype.js */ 65);

module.exports = function (sendableMsg, type, myName) {
  var time = WebIM.time();
  var renderableMsg = {
    info: {
      from: sendableMsg.body.from,
      to: sendableMsg.body.to },

    username: sendableMsg.body.from == myName ? sendableMsg.body.to : sendableMsg.body.from,
    yourname: sendableMsg.body.from,
    msg: {
      type: type,
      url: sendableMsg.body.url ? sendableMsg.body.url : '',
      data: getMsgData(sendableMsg, type) },

    style: sendableMsg.body.from == myName ? "self" : "",
    time: time,
    mid: sendableMsg.type + sendableMsg.id,
    chatType: sendableMsg.body.chatType };


  if (type == msgType.IMAGE) {
    renderableMsg.msg.size = {
      width: sendableMsg.body.body.size.width,
      height: sendableMsg.body.body.size.height };

  } else if (type == msgType.AUDIO) {
    renderableMsg.msg.length = sendableMsg.body.length;
  } else if (type == msgType.FILE) {
    renderableMsg.msg.data = [{
      data: "[当前不支持此格式消息展示]",
      type: "txt" }];

    renderableMsg.msg.type = 'txt';
  }

  return renderableMsg;

  function getMsgData(sendableMsg, type) {
    if (type == msgType.TEXT) {
      return WebIM.parseEmoji(sendableMsg.value.replace(/\n/mg, ""));
    } else if (type == msgType.EMOJI) {
      return sendableMsg.value;
    } else if (type == msgType.IMAGE || type == msgType.VIDEO || type == msgType.AUDIO) {
      return sendableMsg.body.body.url;
    } else if (type == msgType.FILE) {
      return sendableMsg.body.body.msg;
    }

    return "";
  }
};

/***/ }),
/* 65 */
/*!***************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/comps/chat/msgtype.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  IMAGE: "img",
  TEXT: "txt",
  LOCATION: "location",
  VIDEO: "video",
  AUDIO: "audio",
  EMOJI: "emoji",
  FILE: "chat",
  //
  chatType: {
    SINGLE_CHAT: "singleChat",
    CHAT_ROOM: "chatRoom" } };

/***/ }),
/* 66 */
/*!************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/utils/broadcast.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Dispatcher = __webpack_require__(/*! ./Dispatcher.js */ 63);

module.exports = new Dispatcher();

/***/ }),
/* 67 */,
/* 68 */,
/* 69 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */
/*!*****************************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/comps/chat/inputbar/suit/audio/record_status.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  RecordDesc: {
    0: "长按开始录音",
    2: "向上滑动取消",
    3: "松开手取消" },

  RecordStatus: {
    SHOW: 0,
    HIDE: 1,
    HOLD: 2,
    SWIPE: 3,
    RELEASE: 4 } };

/***/ }),
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */
/*!******************************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/comps/chat/msglist/type/audio/audioCtxFactory.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {// 每一个音频消息都有自己的 ctx。
// 可以有多个 ctx，每次播放都能知道是哪个 ctx 在调用，从而让其他的 ctx pause。
// 消息销毁，记得处理 ctx。
// 主要是同步跨 ctx 的操作，保证只有一个 ctx 播放
var allCtx = {};
var inUseCtx = null;
var allComm = {};

function proxier(ctx) {
  var __play__ = ctx.play;
  var __pause__ = ctx.pause;
  ctx.play = playProxier;
  ctx.pause = pauseProxier;

  function playProxier() {
    // 如果正在播放的不是自己，暂停
    if (inUseCtx && inUseCtx != this) {
      inUseCtx.pause();
    }

    __play__.call(this);

    inUseCtx = this;
  }

  function pauseProxier() {
    // 只有是自己才 pause
    if (inUseCtx == this) {
      __pause__.call(this);
    }
  }
}

module.exports = {
  getCtx: function getCtx(mid) {
    var returnCtx = allCtx[mid];

    if (!returnCtx) {
      returnCtx = uni.createInnerAudioContext();
      allCtx[mid] = returnCtx;
      proxier(returnCtx);
    }

    return returnCtx;
  },

  getAllCtx: function getAllCtx() {
    uni.setStorageSync("allCtx", JSON.stringify(Object.keys(allCtx)));
    return allCtx;
  },

  getCommponet: function getCommponet(mid, comm) {
    var curComm = allComm[mid];

    if (!curComm) {
      allComm[mid] = comm;
    }

    return allComm;
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 256 */
/*!*************************************************************************************************************!*\
  !*** /Users/lr/Documents/work/easemob-uniapp/webim-uniapp-demo/comps/chat/msglist/type/audio/playStatus.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  PLAYING: "playing",
  PAUSE: "pause",
  STOP: "stop" };

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map