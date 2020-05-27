'use strict'
import getCode from './status';
import _message from './message';
import Queue from './queue'
import ChatMessage from './chat/sendChatMessage';
import HandleChatMessage from './chat/handleChatMessage';
import HandleMucMessage from './muc/HandleMucMessage';
import HandleRosterMessage from './roster/HandleRosterMessage';
import HandleStatisticsMessage from './statistics/HandleStatisticsMessage';
import Long from '../node_modules/long/dist/long';
import connectionProto from './restApis';
import wxMiniProgram from './checkEnv';
// import _utils from './utils/commonUtils';
var WebIM = {}

const _code = getCode();

var max_cache_length = 100;
var load_msg_cache = [];

let root;
let _utils
const SOCKJS_STATUS = {
    CLOSED: 3,
    CLOSING: 2,
    CONNECTING: 0,
    OPEN: 1
}

const EMPTY_FUN = function () { };


/**
 * 当服务器有新消息提示时进行返回queue
 * */

var _validCheck = function (options, conn) {
    options = options || {};

    if (options.user == '') {
        conn.onError({
            type: _code.WEBIM_CONNCTION_USER_NOT_ASSIGN_ERROR
        });
        return false;
    }

    var user = (options.user + '') || '';
    var appKey = options.appKey || '';
    var devInfos = appKey.split('#');

    if (devInfos.length !== 2) {
        conn.onError({
            type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR
        });
        return false;
    }
    var orgName = devInfos[0];
    var appName = devInfos[1];

    if (!orgName) {
        conn.onError({
            type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR
        });
        return false;
    }
    if (!appName) {
        conn.onError({
            type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR
        });
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
        clientResource: conn.clientResource
    }
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
var connection = function (options) {
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
        status: _code.STATUS_INIT
    };
    this.sendQueue = new Queue(); //instead of sending message immediately,cache them in this queue
    this.intervalId = null; //clearInterval return value
    this.apiUrl = options.apiUrl || '';
    this.isWindowSDK = options.isWindowSDK || false; //????
    this.encrypt = options.encrypt || {
        encrypt: {
            type: 'none'
        }
    }; //**** */
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
}


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
    root = params.root
    _utils = params.utils;
    connection.prototype._utils = _utils;
    WebIM.utils = _utils;
    WebIM.statusCode = _code;
    WebIM.message = _message;
    WebIM.message.prototype._utils = _utils
}
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
    secondMessage.key = new Long(nexkey.low, nexkey.high, nexkey.unsigned).toString();
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
            type: _code.WEBIM_CONNCTION_DISCONNECTED
        };
        conn.onError(error);
    } else {
        conn._base64transform(firstMessage, conn);
    }
}

connection.prototype._metapayload = function (metas, status, conn) {
    for (var i = 0; i < metas.length; i++) {
        var msgId = new Long(metas[i].id.low, metas[i].id.high, metas[i].id.unsigned).toString();
        if (load_msg_cache.indexOf(msgId) < 0) {
            if (metas[i].ns === 1) { //CHAT
                // messageBody(metas[i]);
                HandleChatMessage(metas[i], status, conn)
            } else if (metas[i].ns === 2) { //MUC
                HandleMucMessage(metas[i], status, conn);
            } else if (metas[i].ns === 3) { //ROSTER
                HandleRosterMessage.handleMessage(metas[i], status, conn);
            } else if (metas[i].ns === 0) {
                //CHAT
                // messageBody(metas[i]);
                HandleStatisticsMessage(metas[i], status, conn)
            } else if (metas[i].ns === 4) { //rtc信令
                conn.registerConfrIQHandler && (conn.registerConfrIQHandler(metas[i], status, conn));
            }
            if (load_msg_cache.length <= max_cache_length) {
                load_msg_cache.push(msgId);
            } else {
                load_msg_cache.shift();
                load_msg_cache.push(msgId);
            }
        }
    }
}

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
    thirdMessage.id = (new Date()).valueOf();
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
}

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
}

var unreadDeal = function (conn) {
    debugger
    var emptyMessage = [];
    var MSyncMessage = root.lookup("easemob.pb.MSync");
    var firstMessage = MSyncMessage.decode(emptyMessage);
    firstMessage.version = conn.version;
    firstMessage.encryptType = conn.encryptType;
    firstMessage.command = 1;
    firstMessage = MSyncMessage.encode(firstMessage).finish();
    conn._base64transform(firstMessage, conn);
}

connection.prototype._receiveProvision = function (result, conn) {
    debugger
    var provisionMessage = root.lookup("easemob.pb.Provision");
    var receiveProvisionResult = provisionMessage.decode(result.payload);
    conn.context.jid.clientResource = receiveProvisionResult.resource;

    if (receiveProvisionResult.status.errorCode == 0) {
        unreadDeal(conn);
        conn._rebuild(conn)
    }
}

connection.prototype.heartBeatID = 0;
connection.prototype.heartBeat = function (conn) {
    debugger
    this.stopHeartBeat();
    this.heartBeatID = setInterval(function () {
        unreadDeal(conn)
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
    var suc = function (data, xhr) {
        // data = new DOMParser().parseFromString(data, "text/xml").documentElement;
        //get rest ips
        var restHosts = data.rest.hosts;
        if (!restHosts) {
            return;
        }

        var httpType = self.https ? 'https' : 'http';

        var useRestHosts = restHosts.filter((item, index) => {
            if (item.protocol == httpType) {
                return item
            }
        })

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
        var makeArray = function (obj) { //伪数组转为数组
            return Array.prototype.slice.call(obj, 0);
        }
        try {
            Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType;
        } catch (e) {
            makeArray = function (obj) {
                var res = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    res.push(obj[i]);
                }
                return res;
            }
        }
        var xmppHosts = data['msync-ws'].hosts;
        if (!xmppHosts) {
            return;
        }

        var useXmppHosts = xmppHosts.filter((item, index) => {
            if (item.protocol == httpType) {
                return item
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
    var error = function (res, xhr, msg) {
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
            app_key: encodeURIComponent(options.appKey || this.appKey)
        },
        success: suc || EMPTY_FUN,
        error: error || EMPTY_FUN
    };
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
            type: _code.WEBIM_CONNCTION_APPKEY_NOT_ASSIGN_ERROR
        });
        return;
    }

    var error = function (res, xhr, msg) {
        if (self.isHttpDNS) {
            if ((self.restIndex + 1) < self.restTotal) {
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
        nickname: options.nickname || ''
    };

    var userinfo = _utils.stringify(userjson);
    var options2 = {
        url: restUrl,
        dataType: 'json',
        data: userinfo,
        success: suc,
        error: error
    };
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

    if (conn.isOpened()) { //** */
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

        var suc = function (data, xhr) {
            // conn.context.status = _code.STATUS_DOLOGIN_IM;
            // conn.context.restTokenData = data;
            if (options.success)
                options.success(data);
            conn.token = data.access_token;
            conn.context.restTokenData = data.access_token;
            conn._login(data, conn);
        };
        var error = function (res, xhr, msg) {
            if (options.error)
                options.error();
            if (conn.isHttpDNS) {
                if ((conn.restIndex + 1) < conn.restTotal) {
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
                    xhr: xhr
                });
            } else {
                conn.onError({
                    type: _code.WEBIM_CONNCTION_OPEN_ERROR,
                    data: res,
                    xhr: xhr
                });
            }
        };

        // this.context.status = _code.STATUS_DOLOGIN_USERGRID;

        var loginJson = {
            grant_type: 'password',
            username: userId,
            password: pwd,
            timestamp: +new Date()
        };
        var loginfo = _utils.stringify(loginJson);

        var options2 = {
            headers: {
                'Content-type': 'application/json'
            },
            url: apiUrl + '/' + orgName + '/' + appName + '/token',
            dataType: 'json',
            data: loginfo,
            success: suc || EMPTY_FUN,
            error: error || EMPTY_FUN
        };
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
    this.stopHeartBeat()
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
        fail: option.fail
    }
    this.send(messageOption, this);
}

/**
 * @private
 */
connection.prototype.sendMSync = function (str) { //
    // var strr = "";
    // this.unSendMsgArr.push(dom);
    // for (var i = 0; i < str.length; i++) {
    //     var str0 = String.fromCharCode(str[i]);
    //     strr = strr + str0;
    // }

    // strr = window.btoa(strr);
    // strr = base64transform(str)

    if (this.sock.readyState === SOCKJS_STATUS.OPEN) {
        return this._base64transform(str, this)
    } else {
        this.unSendMsgArr.push(this._base64transform(str, this, true));
        if (!this.logOut &&
            this.autoReconnectNumTotal < this.autoReconnectNumMax &&
            (this.autoReconnectNumTotal <= this.xmppHosts.length && this.isHttpDNS || !this.isHttpDNS)
        ) {
            this.offLineSendConnecting = true;
            this.reconnect();
        }
        this.onError({
            type: _code.WEBIM_CONNCTION_DISCONNECTED,
            reconnect: true
        });
    }
}

/**
 * 随机生成一个id用于消息id
 * @param {String} prefix - 前缀，默认为"WEBIM_"
 */

connection.prototype.getUniqueId = function (prefix) { //*******
    // fix: too frequently msg sending will make same id
    if (this.autoIncrement) {
        this.autoIncrement++
    } else {
        this.autoIncrement = 1
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
    ChatMessage(messageOption, self, _utils);
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
    HandleRosterMessage.operatRoster(options, "remove", this);
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
    HandleRosterMessage.operatRoster(options, "add", this);
};

/**
 * 被订阅后确认同意被订阅
 * @param {Object} options - 
 * @param {String} options.to - 订阅人的ID
 * @param {String} options.message  - 默认为[resp:true]，后续将去掉该参数
 */
connection.prototype.subscribed = function (options) {
    HandleRosterMessage.operatRoster(options, "accept", this);
};

/**
 * 拒绝对方的订阅请求
 * @param {Object} options -
 * @param {String} options.to - 订阅人的ID
 * @param {String} options.message - 发送给拒绝订阅的联系人的验证消息（非必须）
 */
connection.prototype.unsubscribed = function (options) {
    HandleRosterMessage.operatRoster(options, "decline", this);
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
                appKey: key
            };
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
                data: "logout"
            },
            type: _code.WEBIM_CONNCTION_CLIENT_LOGOUT
        };
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
            access_token: that.context.accessToken
        }, that);
        that.autoReconnectInterval += that.times * that.times
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
            data: "Closed error"
        },
        type: _code.WEBIM_CONNECTION_CLOSED
    };
    this.onError(message);
    this.stopHeartBeat()
};

/**
 * 将好友加入到黑名单
 * @param {Object} options -    //&&&&
 * @param {Object[]} options.name - 用户ID,添加一个为单个用户ID；批量添加为用户ID数组，如["user1","user2",...]
 */
connection.prototype.addToBlackList = function (options) {
    HandleRosterMessage.operatRoster({
        to: options.name
    }, "ban", this);
};

/**
 * 将好友从黑名单移除
 * @param {Object} options -      //&&&&&
 * @param {Object[]} options.name - 用户ID,删除一个为单个用户ID，如 "user1"；批量删除为用户ID数组，如 ["user1","user2",...]
 */
connection.prototype.removeFromBlackList = function (options) {
    HandleRosterMessage.operatRoster({
        to: options.name
    }, "allow", this);
};

Object.assign(connection.prototype, connectionProto);

WebIM.connection = connection;

WebIM.doQuery = function (str, suc, fail) {
    if (typeof window.cefQuery === 'undefined') {
        return;
    }
    window.cefQuery({
        request: str,
        persistent: false,
        onSuccess: suc,
        onFailure: fail
    });
};

// window.WebIM = WebIM;
if (module.hot) {
    module.hot.accept();
}

WebIM.debug = function (bool) { }

export default WebIM;