var EMPTYFN = function () { };

if (!Object.keys) {
    Object.keys = (function () {
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({
                toString: null
            }).propertyIsEnumerable('toString'),
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

            var result = [],
                prop, i;

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

    emptyfn: EMPTYFN,

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
    getFileSize: function (file) {
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

    trim: function (str) {
        str = typeof str === 'string' ? str : '';
        return str.trim ?
            str.trim() :
            str.replace(/^\s|\s$/g, '');
    },

    parseTextMessage: function (message, faces) {
        if (typeof message !== 'string') {
            return;
        }

        if (Object.prototype.toString.call(faces) !== '[object Object]') {
            return {
                isemoji: false,
                body: [{
                    type: 'txt',
                    data: message
                }]
            };
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
                    data: message
                }]
            };
        }
        var isemoji = false;
        for (var i = 0; i < emoji.length; i++) {
            var tmsg = receiveMsg.substring(0, receiveMsg.indexOf(emoji[i])),
                existEmoji = WebIM.Emoji.map[emoji[i]];

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
            var emojiStr = WebIM.Emoji.map ? WebIM.Emoji.path + existEmoji : null;

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
            body: [{
                type: 'txt',
                data: message
            }]
        };
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

export default utils