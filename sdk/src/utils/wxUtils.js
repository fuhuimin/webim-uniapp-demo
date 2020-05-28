
import getCode from '../status';
const _code = getCode();
var _tmpUtilXHR = false;
var _hasFormData = typeof FormData !== "undefined";
var _hasBlob = typeof Blob !== "undefined";
var _isCanSetRequestHeader = true;
var _hasOverrideMimeType = _tmpUtilXHR.overrideMimeType || false;
var _isCanUploadFileAsync = _isCanSetRequestHeader && _hasFormData;
var _isCanUploadFile = _isCanUploadFileAsync || false;
var _isCanDownLoadFile = _isCanSetRequestHeader && (_hasBlob || _hasOverrideMimeType);
var EMPTYFN = function () { };
if (!Object.keys) {
    Object.keys = (function () {
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
            dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ],
            dontEnumsLength = dontEnums.length;

        return function (obj) {
            if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }

            var result = [], prop, i;

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
    }());
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

    stringify: function (json) {
        if (typeof JSON !== 'undefined' && JSON.stringify) {
            return JSON.stringify(json);
        } else {
            var s = '',
                arr = [];

            var iterate = function (json) {
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
    login: function (options) {
        var options = options || {};
        var suc = options.success || EMPTYFN;
        var err = options.error || EMPTYFN;

        var appKey = options.appKey || '';
        var devInfos = appKey.split('#');
        if (devInfos.length !== 2) {
            err({
                type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR
            });
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
            timestamp: +new Date()
        };
        var loginfo = utils.stringify(loginJson);

        var options = {
            url: apiUrl + '/' + orgName + '/' + appName + '/token',
            dataType: 'json',
            data: loginfo,
            success: suc,
            error: err
        };
        return utils.ajax(options);
    },

    getFileUrl: function (fileInputId) {
        var uri = {
            url: '',
            filename: '',
            filetype: '',
            data: ''
        };

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
            } else { // IE
                var u = document.getElementById(fileInputId).value;
                uri.url = u;
                var pos1 = u.lastIndexOf('/');
                var pos2 = u.lastIndexOf('\\');
                var pos = Math.max(pos1, pos2);
                if (pos < 0)
                    uri.filename = u;
                else
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

    getFileSize: function (fileInputId) {
        let file = document.getElementById(fileInputId);
        let fileSize = 0;
        if (file) {
            if (file.files) {
                if (file.files.length > 0) {
                    fileSize = file.files[0].size;
                }
            }
        }
        return fileSize;
    },


    trim: function (str) {

        str = typeof str === 'string' ? str : '';

        return str.trim
            ? str.trim()
            : str.replace(/^\s|\s$/g, '');
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

    parseLink: function (msg) {

        var reg = /(https?\:\/\/|www\.)([a-zA-Z0-9-]+(\.[a-zA-Z0-9]+)+)(\:[0-9]{2,4})?\/?((\.[:_0-9a-zA-Z-]+)|[:_0-9a-zA-Z-]*\/?)*\??[:_#@*&%0-9a-zA-Z-/=]*/gm;

        msg = msg.replace(reg, function (v) {

            var prefix = /^https?/gm.test(v);

            return "<a href='"
                + (prefix ? v : '//' + v)
                + "' target='_blank'>"
                + v
                + "</a>";

        });

        return msg;

    },

    parseJSON: function (data) {

        if (window.JSON && window.JSON.parse) {
            return window.JSON.parse(data + '');
        }

        var requireNonComma,
            depth = null,
            str = utils.trim(data + '');

        return str && !utils.trim(
            str.replace(/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g
                , function (token, comma, open, close) {

                    if (requireNonComma && comma) {
                        depth = 0;
                    }

                    if (depth === 0) {
                        return token;
                    }

                    requireNonComma = open || comma;
                    depth += !close - !open;
                    return '';
                })
        )
            ? (Function('return ' + str))()
            : (Function('Invalid JSON: ' + data))();
    },

    parseUploadResponse: function (response) {
        return response.indexOf('callback') > -1 ? //lte ie9
            response.slice(9, -1) : response;
    },

    parseDownloadResponse: function (response) {
        return ((response && response.type && response.type === 'application/json')
            || 0 > Object.prototype.toString.call(response).indexOf('Blob'))
            ? this.url + '?token=' : window.URL.createObjectURL(response);
    },

    uploadFile: function (options) {
        var options = options || {};
        options.onFileUploadProgress = options.onFileUploadProgress || EMPTYFN;
        options.onFileUploadComplete = options.onFileUploadComplete || EMPTYFN;
        options.onFileUploadError = options.onFileUploadError || EMPTYFN;
        options.onFileUploadCanceled = options.onFileUploadCanceled || EMPTYFN;

        var acc = options.accessToken || this.context.accessToken;
        if (!acc) {
            options.onFileUploadError({
                type: _code.WEBIM_UPLOADFILE_NO_LOGIN
                , id: options.id
            });
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
                type: _code.WEBIM_UPLOADFILE_ERROR
                , id: options.id
            });
            return;
        }

        var apiUrl = options.apiUrl;
        if (this.isHttpDNS) {
            apiUrl = this.apiUrl
        }
        var uploadUrl = apiUrl + '/' + orgName + '/' + appName + '/chatfiles';

        if (!utils.isCanUploadFileAsync) {
            if (utils.hasFlash && typeof options.flashUpload === 'function') {
                options.flashUpload && options.flashUpload(uploadUrl, options);
            } else {
                options.onFileUploadError({
                    type: _code.WEBIM_UPLOADFILE_BROWSER_ERROR
                    , id: options.id
                });
            }
            return;
        }

        var fileSize = options.file.data ? options.file.data.size : undefined;
        if (fileSize <= 0) {
            options.onFileUploadError({
                type: _code.WEBIM_UPLOADFILE_ERROR
                , id: options.id
            });
            return;
        }

        var xhr = utils.xmlrequest();
        var onError = function (e) {
            options.onFileUploadError({
                type: _code.WEBIM_UPLOADFILE_ERROR,
                id: options.id,
                xhr: xhr
            });
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
                            type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR
                            , data: e
                        });
                    }
                } catch (e) {
                    options.onFileUploadError({
                        type: _code.WEBIM_UPLOADFILE_ERROR,
                        data: xhr.responseText,
                        id: options.id,
                        xhr: xhr
                    });
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
                                xhr: xhr
                            });
                        }
                    } else {
                        options.onFileUploadError({
                            type: _code.WEBIM_UPLOADFILE_ERROR,
                            data: xhr.responseText,
                            id: options.id,
                            xhr: xhr
                        });
                    }
                } else {
                    xhr.abort();
                    options.onFileUploadCanceled();
                }
            }
        }

        xhr.open('POST', uploadUrl);

        xhr.setRequestHeader('restrict-access', 'true');
        xhr.setRequestHeader('Accept', '*/*');// Android QQ browser has some problem with this attribute.
        xhr.setRequestHeader('Authorization', 'Bearer ' + acc);

        var formData = new FormData();
        formData.append('file', options.file.data);
        // fix: ie8 status error
        window.XDomainRequest && (xhr.readyState = 2)
        xhr.send(formData);
    },


    download: function (options) {
        options.onFileDownloadComplete = options.onFileDownloadComplete || EMPTYFN;
        options.onFileDownloadError = options.onFileDownloadError || EMPTYFN;

        var accessToken = options.accessToken || this.context.accessToken;
        let xhr = utils.xmlrequest();
        if (!accessToken) {
            options.onFileDownloadError({
                type: _code.WEBIM_DOWNLOADFILE_NO_LOGIN,
                id: options.id
            });
            return;
        }

        var onError = function (e) {
            options.onFileDownloadError({
                type: _code.WEBIM_DOWNLOADFILE_ERROR,
                id: options.id,
                xhr: xhr
            });
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
                            xhr: xhr
                        });
                    }
                } else {
                    xhr.abort();
                    options.onFileDownloadError({
                        type: _code.WEBIM_DOWNLOADFILE_ERROR,
                        id: options.id,
                        xhr: xhr
                    });
                }
            }
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
            'Authorization': 'Bearer ' + accessToken
        };
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
        window.XDomainRequest && (xhr.readyState = 2)
        xhr.send(null);
    },

    parseTextMessage: function (message, faces) {
        if (typeof message !== 'string') {
            return;
        }

        if (Object.prototype.toString.call(faces) !== '[object Object]') {
            return {
                isemoji: false,
                body: [
                    {
                        type: 'txt',
                        data: message
                    }
                ]
            };
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
                        data: message
                    }
                ]
            };
        }
        var isemoji = false;
        for (var i = 0; i < emoji.length; i++) {
            var tmsg = receiveMsg.substring(0, receiveMsg.indexOf(emoji[i])),
                existEmoji = faces.map[emoji[i]];

            if (tmsg) {
                emessage.push({
                    type: 'txt',
                    data: tmsg
                });
            }
            if (!existEmoji) {
                emessage.push({
                    type: 'txt',
                    data: emoji[i]
                });
                continue;
            }
            var emojiStr = faces.map ? faces.path + existEmoji : null;

            if (emojiStr) {
                isemoji = true;
                emessage.push({
                    type: 'emoji',
                    data: emojiStr
                });
            } else {
                emessage.push({
                    type: 'txt',
                    data: emoji[i]
                });
            }
            var restMsgIndex = receiveMsg.indexOf(emoji[i]) + emoji[i].length;
            receiveMsg = receiveMsg.substring(restMsgIndex);
        }
        if (receiveMsg) {
            emessage.push({
                type: 'txt',
                data: receiveMsg
            });
        }
        if (isemoji) {
            return {
                isemoji: isemoji,
                body: emessage
            };
        }
        return {
            isemoji: false,
            body: [
                {
                    type: 'txt',
                    data: message
                }
            ]
        };
    },

    ajax: function (options) {
        var suc = options.success || EMPTYFN;
        var error = options.error || EMPTYFN;
        var type = options.type || "POST",
            data = options.data || null,
            tempData = "";

        if (type.toLowerCase() === "get" && data) {
            for (let o in data) {
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
            success: function (res) {
                // console.log("wx.request.success", arguments);
                if (res.statusCode == "200") {
                    suc(res.data);
                }
                else {
                    error(res);
                }
            },
            complete() {
                // console.log("wx.request.complete", arguments);
            },
            fail(e) {
                error(e);
                // console.log("wx.request.fail", arguments);
            }
        });
    },
    ts: function () {
        var d = new Date();
        var Hours = d.getHours(); //获取当前小时数(0-23)
        var Minutes = d.getMinutes(); //获取当前分钟数(0-59)
        var Seconds = d.getSeconds(); //获取当前秒数(0-59)
        var Milliseconds = d.getMilliseconds(); //获取当前毫秒
        return (Hours < 10 ? "0" + Hours : Hours) + ':' + (Minutes < 10 ? "0" + Minutes : Minutes) + ':' + (Seconds < 10 ? "0" + Seconds : Seconds) + ':' + Milliseconds + ' ';
    },

    getObjectKey: function (obj, val) {
        for (var key in obj) {
            if (obj[key] == val) {
                return key;
            }
        }
        return '';
    },

    sprintf: function () {
        var arg = arguments,
            str = arg[0] || '',
            i, len;
        for (i = 1, len = arg.length; i < len; i++) {
            str = str.replace(/%s/, arg[i]);
        }
        return str;
    },

    reverse: function (array) {
        var newArray = []
        if (Array.prototype.reverse) {
            newArray = array.reverse()
        } else {
            for (var i = 0; i < array.length; i++) {
                newArray.unshift(array[i])
            }
        }
        return newArray
    },

    getEnv: function () {
        let wxMiniProgram = true;
        try {
            if (window && navigator) {
                wxMiniProgram = false
            } else {
                wxMiniProgram = true
            }
        } catch (e) {
            wxMiniProgram = true
        }
        return wxMiniProgram
    }
};

utils.checkArray = function checkArray(arr, queue) {
    var turnOff = 'off'
    arr.forEach((item, index) => {
        if (item.name === queue.name) {
            turnOff = 'on'
            return index
        }
    })
    if (turnOff == 'off') {
        return false
    }
}

utils._listenNetwork = function (onlineCallback, offlineCallback) {

};


export default utils



