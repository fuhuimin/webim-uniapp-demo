'use strict'
import getAll from './allnode'
import getCode from './status';
import _message from './message';
import Queue from './queue'
import ChatMessage from './chat/sendChatMessage';
import HandleChatMessage from './chat/handleChatMessage';
import HandleMucMessage from './muc/HandleMucMessage';
import HandleRosterMessage from './roster/HandleRosterMessage';
import HandleStatisticsMessage from './statistics/HandleStatisticsMessage';
import Long from 'long';

import connectionProto from './restApis';
import protobufForWx from './weichatPb/protobuf';
import wxMiniProgram from './checkEnv';
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
    this.wxMiniProgram = wxMiniProgram
    window.this = this;

    // global params
    //isStropheLog = options.isStropheLog || false;
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
 * @param {connection~onRecallMessage} options.onRecallMessage - 处理Recall 消息的回调   //.....
 * @param {connection~onMutedMessage} options.onMutedMessage - 处理禁言消息的回调
 * @param {connection~onOffline} options.onOffline - 处理断网的回调
 * @param {connection~onOnline} options.onOnline - 处理联网的回调
 * @param {connection~onCreateGroup} options.onCreateGroup - 处理创建群组的回调
 */
connection.prototype.listen = function (options) { }


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
connection.prototype.open = function (options) { }


/**
 * 断开连接，同时心跳停止
 * @param {String} reason - 断开原因
 */
connection.prototype.close = function (reason) { };


/**
 * 发送撤回消息
 * @param {Object} option - 
 * @param {Object} option.mid -   回撤消息id
 * @param {Object} option.to -   消息的接收方
 * @param {Object} option.type -  chat(单聊) groupchat(群组聊天) chatroom(聊天室聊天)
 */
connection.prototype.recallMessage = function (option) { }


/**
 * 随机生成一个id用于消息id
 * @param {String} prefix - 前缀，默认为"WEBIM_"
 */
connection.prototype.getUniqueId = function (prefix) { };


/**
 * 发送消息
 * @param {Object} messageSource - 由 Class Message 生成
 * @example
 * let deliverMessage = new WebIM.message('delivery', msgId);
 * deliverMessage.set({
 *   id: msgId, 
 *   to: msg.from
 * });
 * conn.send(deliverMessage.body);
 */
connection.prototype.send = function (messageOption) { };

/**
 * 删除联系人
 *
 * @param {Object} options -
 * @param {String} options.to - 联系人ID
 * @param {Function} options.success - 成功之后的回调，默认为空
 * @param {Function} options.error - 失败之后的回调，默认为空
 */

connection.prototype.removeRoster = function (options) { };


/**
 * 添加联系人
 * @param {Object} options - 
 * @param {String} options.to - 想要订阅的联系人ID
 * @param {String} options.nick - 想要订阅的联系人昵称 （非必须）
 * @param {String} options.message - 发送给想要订阅的联系人的验证消息（非必须）
 */
connection.prototype.subscribe = function (options) { };


/**
 * 被订阅后确认同意被订阅
 * @param {Object} options - 
 * @param {String} options.to - 订阅人的ID
 * @param {String} options.message  - 默认为[resp:true]，后续将去掉该参数
 */
connection.prototype.subscribed = function (options) { };


/**
 * 拒绝对方的订阅请求
 * @param {Object} options -
 * @param {String} options.to - 订阅人的ID
 * @param {String} options.message - 发送给拒绝订阅的联系人的验证消息（非必须）
 */
connection.prototype.unsubscribed = function (options) { };


/**
 * 将好友加入到黑名单
 * @param {Object} options
 * @param {Object[]} options.name - 用户ID,添加一个为单个用户ID；批量添加为用户ID数组，如["user1","user2",...]
 */
connection.prototype.addToBlackList = function (options) { };


/**
 * 将好友从黑名单移除
 * @param {Object} options
 * @param {Object[]} options.name - 用户ID,删除一个为单个用户ID，如 "user1"；批量删除为用户ID数组，如 ["user1","user2",...]
 */
connection.prototype.removeFromBlackList = function (options) { };


///-----------


/**
 * 获取对话历史消息
 * @param {Object} options
 * @param {String} options.queue   - 对方用户名Id
 * @param {String} options.count   - 拉取条数
 * @param {Boolean} options.isGroup - 是否是群聊,默认为false
 * @param {Function} options.success
 * @param {Funciton} options.fail
 */
connection.prototype.fetchHistoryMessages = function (options) { }


/**
 * 获取聊天室列表（分页）
 * @param {Object} options -
 * @param {String} options.apiUrl - rest的接口地址
 * @param {Number} options.pagenum - 页码，默认1
 * @param {Number} options.pagesize - 每页数量，默认20
 * @param {Function} options.success - 成功之后的回调，默认为空
 */
connection.prototype.getChatRooms = function (options) { }


/**
 * 加入聊天室
 * @param {Object} options - 
 * @param {String} options.roomId - 聊天室的ID
 * @param {stirng} opt.message - 原因，可选项
 * @param {Function} options.success - 成功之后的回调，默认为空
 * @param {Function} options.error - 失败之后的回调，默认为空
 */
connection.prototype.joinChatRoom = function (options) { }


/**
 * 退出聊天室
 * @param {Object} options -
 * @param {String} options.roomId - 聊天室的ID
 * @param {Function} options.success - 成功之后的回调，默认为空
 * @param {Function} options.error - 失败之后的回调，默认为空
 */
connection.prototype.quitChatRoom = function (options) { }


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
connection.prototype.createGroupNew = function (opt) { }

/**
 * 通过RestFul API屏蔽群组，只对移动端有效
 * @param {Object} opt -
 * @param {string} opt.groupId - 需要屏蔽的群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 * @since 1.4.11
 */
connection.prototype.blockGroup = function (opt) { }


/**
 * 通过RestFul API分页获取群组列表
 * @param {Object} opt -
 * @param {Number} opt.limit - 每一页群组的最大数目
 * @param {string} opt.cursor=null - 游标，如果数据还有下一页，API 返回值会包含此字段，传递此字段可获取下一页的数据，为null时获取第一页数据
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 * @since 1.4.11
 */
connection.prototype.listGroups = function (opt) { }


/**
 * 通过RestFul API列出某用户所加入的所有群组
 * @param {Object} opt - 
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 * @since 1.4.11
 */
connection.prototype.getGroup = function (opt) { }


/**
 * 通过restful api转让群组
 * @param {Object} opt
 * @param {String}opt.groupId - 群组id
 * @param {String}opt.newOwner - 群组的新管理员 ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.changeOwner = function (opt) { }


/**
 * 通过RestFul API根据groupId获取群组详情
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 * @since 1.4.11
 */
connection.prototype.getGroupInfo = function (opt) { }


/**
 * 通过RestFul API修改群信息
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {string} opt.groupName - 群组名
 * @param {string} opt.description - 群组简介
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.modifyGroup = function (opt) { }


/**
 * 通过RestFul API分页列出群组的所有成员
 * @param {Object} opt -
 * @param {Number} opt.pageNum - 页码，默认1
 * @param {Number} opt.pageSize - 每一页的最大群成员数目,最大值1000
 * @param {string} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.listGroupMember = function (opt) { }


/**
 * 通过RestFul API获取群组下所有管理员
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 * @since 1.4.11
 */
connection.prototype.getGroupAdmin = function (opt) { }


/**
 * 通过RestFul API设置群管理员
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {string} opt.username - 用户ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.setAdmin = function (opt) { }


/**
 * 通过RestFul API取消群管理员
 * @param {Object} opt -
 * @param {string} opt.gorupId - 群组ID
 * @param {string} opt.username - 用户ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.removeAdmin = function (opt) { }


/**
 * 通过RestFul API解散群组
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.dissolveGroup = function (opt) { }


/**
 * 通过RestFul API离开群组
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.quitGroup = function (opt) { }


/**
 * 通过RestFul API邀请群成员
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组名
 * @param {string[]} opt.users - 用户ID数组
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.inviteToGroup = function (opt) { }


/**
 * 通过RestFul API发出入群申请
 * @param {Object} opt -
 * @param {String} opt.groupId - 加入群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 * @since 1.4.11
 */
connection.prototype.joinGroup = function (opt) { }


/**
 * 通过RestFul API同意用户加入群
 * @param {Object} opt -
 * @param {string} opt.applicant - 申请加群的用户ID
 * @param {Object} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.agreeJoinGroup = function (opt) { }


/**
 * 通过RestFul API拒绝用户加入群
 * @param {Object} opt -
 * @param {string} opt.applicant - 申请加群的用户ID
 * @param {Object} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.rejectJoinGroup = function (opt) { }


/**
 * 通过RestFul API同意加群邀请
 * @param {Object} opt -
 * @param {string} opt.invitee - 处理群邀请用户的用户名
 * @param {Object} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.agreeInviteIntoGroup = function (opt) { }


/**
 * 通过RestFul API拒绝加群邀请
 * @param {Object} opt -
 * @param {string} opt.invitee - 处理群邀请用户的用户名
 * @param {Object} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.rejectInviteIntoGroup = function (opt) { }


/**
 * 通过RestFul API删除单个群成员
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {string} opt.username - 用户ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.removeSingleGroupMember = function (opt) { }


/**
 * 通过RestFul API删除多个群成员
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {string[]} opt.users - 用户ID数组
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.removeMultiGroupMember = function (opt) { }


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
connection.prototype.mute = function (opt) { }


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
connection.prototype.muteChatRoomMember = function (opt) { }


/**
 * 通过RestFul API取消对群成员禁言
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {string} opt.username - 被取消禁言的群用户ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 * @since 1.4.11
 */
connection.prototype.removeMute = function (opt) { }

/**
 * 通过RestFul API取消对聊天室成员禁言
 * @param {Object} opt -
 * @param {string} opt.chatRoomId - 聊天室ID
 * @param {string} opt.username - 被取消禁言的群用户ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 * @since 1.4.11
 */
connection.prototype.removeMuteChatRoomMember = function (opt) { }

/**
 * 通过RestFul API获取群组下所有被禁言成员
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.getMuted = function (opt) { }

/**
 * 通过RestFul API获取聊天室下所有被禁言成员
 * @param {Object} opt -
 * @param {string} opt.chatRoomId - 聊天室ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.getChatRoomMuted = function (opt) { }

/**
 * 通过RestFul API添加用户至群组黑名单(单个)
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {stirng} opt.username - 用户ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.groupBlockSingle = function (opt) { }

/**
 * 通过RestFul API添加用户至聊天室黑名单(单个)
 * @param {Object} opt -
 * @param {string} opt.chatRoomId - 聊天室ID
 * @param {stirng} opt.username - 用户ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.chatRoomBlockSingle = function (opt) { }

/**
 * 通过RestFul API添加用户至群组黑名单(批量)
 * @param {Object} opt -
 * @param {string[]} opt.usernames - 用户ID数组
 * @param {string} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.groupBlockMulti = function (opt) { }

/**
 * 通过RestFul API添加用户至聊天室黑名单(批量)
 * @param {Object} opt -
 * @param {string[]} opt.usernames - 用户ID数组
 * @param {string} opt.chatRoomId - 聊天室ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.chatRoomBlockMulti = function (opt) { }

/**
 * 通过RestFul API将用户从群黑名单移除（单个）
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {string} opt.username - 用户ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.removeGroupBlockSingle = function (opt) { }

/**
 * 通过RestFul API将用户从聊天室黑名单移除（单个）
 * @param {Object} opt -
 * @param {string} opt.chatRoomId - 聊天室ID
 * @param {string} opt.username - 用户ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.removeChatRoomBlockSingle = function (opt) { }

/**
 * 通过RestFul API将用户从群黑名单移除（批量）
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {string} opt.usernames - 用户id的数组 ['user1', 'user2']
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.removeGroupBlockMulti = function (opt) { }

/**
 * 通过RestFul API将用户从聊天室黑名单移除（批量）
 * @param {Object} opt -
 * @param {string} opt.chatRoomId - 聊天室ID
 * @param {string} opt.usernames - 用户id的数组 ['user1', 'user2']
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.removeChatRoomBlockMulti = function (opt) { }

/**
 * 通过RestFul API获取群组黑名单
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.getGroupBlacklistNew = function (opt) { }

/**
 * 通过RestFul API获取聊天室黑名单
 * @param {Object} opt -
 * @param {string} opt.chatRoomId - 聊天室ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.getChatRoomBlacklistNew = function (opt) { }

/**
 * 群一键禁言. 操作权限：app admin、群组owner、群组admin及以上身份
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.disableSendGroupMsg = function (opt) { }

/**
 * 聊天室一键禁言. 操作权限：app admin、群组owner、群组admin及以上身份
 * @param {Object} opt -
 * @param {string} opt.chatRoomId - 聊天室ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.disableSendChatRoomMsg = function (opt) { }

/**
 * 解除群一键禁言. 操作权限：app admin、群组owner、群组admin及以上身份
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.enableSendGroupMsg = function (opt) { }

/**
 * 聊天室除群一键禁言. 操作权限：app admin、群组owner、群组admin及以上身份
 * @param {Object} opt -
 * @param {string} opt.chatRoomId - 聊天室ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.enableSendChatRoomMsg = function (opt) { }

/**
 * 增加白名单群成员 操作权限：app admin、群组owner、群组admin及以上身份
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {Array} opt.users - 成员 ['username']
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.addUsersToGroupWhitelist = function (opt) { }

/**
 * 增加白名单群成员 操作权限：app admin、群组owner、群组admin及以上身份
 * @param {Object} opt -
 * @param {string} opt.chatRoomId - 聊天室ID
 * @param {Array} opt.users - 成员 ['username']
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.addUsersToChatRoomWhitelist = function (opt) { }

/**
 * 删除白名单群成员 操作权限：app admin、群组owner、群组admin及以上身份
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {string} opt.userName - 成员
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.rmUsersFromGroupWhitelist = function (opt) { }

/**
 * 删除白名单聊天室成员 操作权限：app admin、群组owner、群组admin及以上身份
 * @param {Object} opt -
 * @param {string} opt.chatRoomId - 聊天室ID
 * @param {string} opt.userName - 成员
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.rmUsersFromChatRoomWhitelist = function (opt) { }

/**
 * 获取白名单群成员 操作权限：需app admin、群组admin及以上身份；
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.getGroupWhitelist = function (opt) { }

/**
 * 获取白名单聊天室成员 操作权限：需app admin、群组admin及以上身份；
 * @param {Object} opt -
 * @param {string} opt.chatRoomId - 聊天室ID
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.getChatRoomWhitelist = function (opt) { }

/**
 * 查询群成员是否是白名单用户 操作权限：app admin可查询所有用户；app user可查询自己
 * @param {Object} opt -
 * @param {string} opt.groupId - 群组ID
 * @param {string} opt.userName - 用户名
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.isGroupWhiteUser = function (opt) { }

/**
 * 查询聊天室成员是否是白名单用户 操作权限：app admin可查询所有用户；app user可查询自己
 * @param {Object} opt -
 * @param {string} opt.chatRoomId - 群组ID
 * @param {string} opt.userName - 用户名
 * @param {Function} opt.success - 成功之后的回调，默认为空
 * @param {Function} opt.error - 失败之后的回调，默认为空
 */
connection.prototype.isChatRoomWhiteUser = function (opt) { },

	/**
	 * 查询群组消息都被哪些用户读过
	 * @param {Object} options -
	 * @param {String} options.groupId - 群组id
	 * @param {String} options.msgId - 消息id
	 * @param {Function} options.success - 成功的回调
	 * @param {Function} options.error - 失败的回调
	 *
	 */
    connection.prototype.getGroupMsgReadUser = function (options) { }

/**
 * 获取好友黑名单
 * @param {Object} options - 
 * @param {Function} options.success - 成功之后的回调，默认为空
 * @param {Function} options.error - 失败之后的回调，默认为空
 */
connection.prototype.getBlacklist = function (options) { }

/**
 * 获取联系人
 * @param {Object} options - 
 * @param {Function} options.success - 成功之后的回调，默认为空
 * @param {Function} options.error - 失败之后的回调，默认为空
 */

connection.prototype.getRoster = function (options) { }

/**
 * 获取群公告
 * @param {Object} options - 
 * @param {Object} options.groupId - 群组id
 * @param {Function} options.success - 成功之后的回调，默认为空
 * @param {Function} options.error - 失败之后的回调，默认为空
 */
connection.prototype.fetchGroupAnnouncement = function (options) { }

/**
 * 获取聊天室公告
 * @param {Object} options - 
 * @param {Object} options.roomId - 聊天室id
 * @param {Function} options.success - 成功之后的回调，默认为空
 * @param {Function} options.error - 失败之后的回调，默认为空
 */
connection.prototype.fetchChatRoomAnnouncement = function (options) { }

/**
 * 设置更新群公告
 * @param {Object} options - 
 * @param {Object} options.groupId - 群组id
 * @param {Object} options.announcement - 公告内容
 * @param {Function} options.success - 成功之后的回调，默认为空
 * @param {Function} options.error - 失败之后的回调，默认为空
 */
connection.prototype.updateGroupAnnouncement = function (options) {
}

/**
 * 设置更新聊天室公告
 * @param {Object} options - 
 * @param {Object} options.roomId - 聊天室id
 * @param {Object} options.announcement - 公告内容
 * @param {Function} options.success - 成功之后的回调，默认为空
 * @param {Function} options.error - 失败之后的回调，默认为空
 */

connection.prototype.updateChatRoomAnnouncement = function (options) { }

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
connection.prototype.uploadGroupSharedFile = function (options) { }

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
connection.prototype.uploadChatRoomSharedFile = function (options) { }

/**
 * 删除群共享文件
 * @param {Object} options - 
 * @param {Object} options.groupId - 群组id
 * @param {Object} options.fileId - 文件id
 * @param {Function} options.success - 成功之后的回调，默认为空
 * @param {Function} options.error - 失败之后的回调，默认为空
 */
connection.prototype.deleteGroupSharedFile = function (options) { }

/**
 * 删除聊天室共享文件
 * @param {Object} options - 
 * @param {Object} options.roomId - 聊天室id
 * @param {Object} options.fileId - 文件id
 * @param {Function} options.success - 成功之后的回调，默认为空
 * @param {Function} options.error - 失败之后的回调，默认为空
 */
connection.prototype.deleteChatRoomSharedFile = function (options) { }

/**
 * 下载群共享文件
 * @param {Object} options - 
 * @param {Object} options.groupId - 群组id
 * @param {Object} options.fileId - 文件id
 * @param {Object} options.onFileDownloadComplete - 文件下载成功的回调
 * @param {Object} options.onFileDownloadError - 文件下载失败的回调
 */
connection.prototype.downloadGroupSharedFile = function (options) { }

/**
 * 下载聊天室共享文件
 * @param {Object} options - 
 * @param {Object} options.roomId - 聊天室id
 * @param {Object} options.fileId - 文件id
 * @param {Object} options.onFileDownloadComplete - 文件下载成功的回调
 * @param {Object} options.onFileDownloadError - 文件下载失败的回调
 */
connection.prototype.downloadChatRoomSharedFile = function (options) { }

/**
 * 获取群共享文件列表
 * @param {Object} options - 
 * @param {Object} options.groupId - 群组id
 * @param {Function} options.success - 成功之后的回调，默认为空
 * @param {Function} options.error - 失败之后的回调，默认为空
 */
connection.prototype.fetchGroupSharedFileList = function (options) { }

/**
 * 获取聊天室共享文件列表
 * @param {Object} options - 
 * @param {Object} options.roomId - 聊天室id
 * @param {Function} options.success - 成功之后的回调，默认为空
 * @param {Function} options.error - 失败之后的回调，默认为空
 */
connection.prototype.fetchChatRoomSharedFileList = function (options) { }

var WebIM = {}
WebIM.connection = connection
export default WebIM;
