'use strict'
import WebIM from './connection'
import Long from 'long';
import getAll from './allnode'
import protobufForWx from './weichatPb/protobuf';
import getCode from './status';
import utils from './utils/wxUtils'
const _code = getCode();

let all = getAll()
let root = WebIM.connection.prototype.root = protobufForWx.Root.fromJSON(all);
let sock

WebIM.connection.prototype.getParams({
    root: root,
    utils: utils
})

let base64transform = function (str, conn, notSend) {
    let init8arr = new Uint8Array(str)
    let obj = {
        data: init8arr.buffer
    }
    if (notSend) return obj
    try {
        sock.send(obj);
    } catch (e) {
        conn.onError({
            type: _code.WEBIM_CONNCTION_USER_NOT_ASSIGN_ERROR,
            msg: e
        })
    }
}

function _getSock(conn) {
    let sock = wx.connectSocket({
        url: conn.url,
        header: {
            'content-type': 'application/json'
        },
        success: function (e) {
            console.log('socket连接成功');
        },
        fail: function (e) {
            //部分机型从后台切回前台状态有延迟
            if (e.errMsg.indexOf('suspend') != -1) {
                //重连
            }
        }
    })
    return sock
}

var _login = function (options, conn) {
    if (!options) {
        return;
    }
    try {
        sock = _getSock(conn);
        WebIM.connection.prototype.sock = sock
        sock.onOpen(function () {
            console.log('onOpen')
            // 初始重连状态
            conn.autoReconnectInterval = 0;
            conn.times = 1;
            conn.autoReconnectNumTotal = 0;
            var emptyMessage = [];
            var time = (new Date()).valueOf();
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
            console.log('onClose', e)
            if (!conn.logOut &&
                conn.autoReconnectNumTotal < conn.autoReconnectNumMax &&
                (conn.autoReconnectNumTotal <= conn.xmppHosts.length && conn.isHttpDNS || !conn.isHttpDNS)
                // && conn.xmppIndex < conn.xmppHosts.length - 1
            ) {
                conn.reconnect();
                var error = {
                    type: _code.WEBIM_CONNCTION_DISCONNECTED
                };
                conn.onError(error);
                // conn.onClosed();
            } else if (conn.logOut) {
                conn.clear();
                conn.onClosed();
            } else {
                var error = {
                    type: _code.WEBIM_CONNCTION_DISCONNECTED
                };
                conn.onError(error);
                conn.onClosed();
            }
        })

        sock.onMessage(function (e) {
            var mainMessage = root.lookup("easemob.pb.MSync");
            var result = mainMessage.decode(e.data);
            switch (result.command) {
                case 0:
                    var CommSyncDLMessage = root.lookup("easemob.pb.CommSyncDL");
                    CommSyncDLMessage = CommSyncDLMessage.decode(result.payload);
                    var msgId = new Long(CommSyncDLMessage.serverId.low, CommSyncDLMessage.serverId.high, CommSyncDLMessage.serverId.unsigned).toString();
                    var metaId = new Long(CommSyncDLMessage.metaId.low, CommSyncDLMessage.metaId.high, CommSyncDLMessage.metaId.unsigned).toString();

                    // console.log('CommSyncDLMessage', CommSyncDLMessage)

                    if (CommSyncDLMessage.metas.length !== 0) {
                        conn._metapayload(CommSyncDLMessage.metas, CommSyncDLMessage.status, conn);
                        conn._lastsession(CommSyncDLMessage.nextKey, CommSyncDLMessage.queue, conn);
                    } else if (CommSyncDLMessage.isLast) {
                        //当前为最后一条消息
                        var queuesIndex = utils.checkArray(conn._queues, CommSyncDLMessage.queue);
                        // console.log(CommSyncDLMessage.queue)
                        if (queuesIndex !== false) {
                            // islsat == true 删除队列当前的queue
                            conn._queues.splice(queuesIndex, 1)
                        }
                        if (conn._queues.length > 0) {
                            conn._backqueue(conn._queues[0], conn)
                            this.qTimer && clearTimeout(this.qTimer)
                        }
                    } else if (CommSyncDLMessage.status && CommSyncDLMessage.status.errorCode === 0) {
                        if (conn._msgHash[metaId]) {
                            try {
                                conn._msgHash[metaId].success instanceof Function && conn._msgHash[metaId].success(metaId, msgId);
                            } catch (e) {
                                conn.onError({
                                    type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
                                    data: e
                                });
                            }
                            delete conn._msgHash[metaId];
                        }
                        conn.onReceivedMessage({
                            id: metaId,
                            mid: msgId
                        })
                        conn.heartBeat(conn) //登陆成功后发送心跳
                    } else if (CommSyncDLMessage.status && CommSyncDLMessage.status.errorCode === 15) {
                        conn.onMutedMessage({
                            mid: msgId
                        });
                    } else if (CommSyncDLMessage.status && CommSyncDLMessage.status.errorCode === 1) {
                        var type = '';
                        switch (CommSyncDLMessage.status.reason) {
                            case "blocked":
                                type = _code.PERMISSION_DENIED
                                break;
                            case "group not found":
                                type = _code.GROUP_NOT_EXIST
                                break;
                            case "not in group or chatroom":
                                type = _code.GROUP_NOT_JOINED
                                break;
                            case "exceed recall time limit":
                                type = _code.MESSAGE_RECALL_TIME_LIMIT
                                break;
                            case "message recall disabled":
                                type = _code.SERVICE_NOT_ENABLED
                                break;
                            case "not in group or chatroom white list":
                                type = _code.SERVICE_NOT_ALLOW_MESSAGING
                                break;
                            default:
                                type = _code.SERVER_UNKNOWN_ERROR
                                break;
                        }
                        conn.onError({
                            type: type,
                            reason: CommSyncDLMessage.status.reason ? CommSyncDLMessage.status.reason : '',
                            data: {
                                id: metaId,
                                mid: msgId
                            }
                        });
                    } else if (CommSyncDLMessage.status && CommSyncDLMessage.status.errorCode === 7 && CommSyncDLMessage.status.reason === "sensitive words") {
                        conn.onError({
                            type: _code.MESSAGE_INCLUDE_ILLEGAL_CONTENT,
                            data: {
                                id: metaId,
                                mid: msgId
                            }
                        });
                    } else {
                        if (conn._msgHash[metaId]) {
                            try {
                                conn._msgHash[metaId].fail instanceof Function && conn._msgHash[metaId].fail(metaId, msgId);
                            } catch (e) {
                                conn.onError({
                                    type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
                                    data: e
                                });
                            }
                            delete conn._msgHash[metaId];
                        }
                        conn.onError({
                            type: _code.WEBIM_LOAD_MSG_ERROR,
                            data: {
                                errorCode: CommSyncDLMessage.status && CommSyncDLMessage.status.errorCode,
                                reason: CommSyncDLMessage.status && CommSyncDLMessage.status.reason
                            }
                        });
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

                    if (utils.checkArray(conn._queues, noticeMessage.queue) === false) {
                        conn._queues.push(noticeMessage.queue)
                        this.qTimer && clearTimeout(this.qTimer)
                        this.qTimer = setTimeout(function () {
                            var q = noticeMessage.queue
                            if (utils.checkArray(conn._queues, q) !== false) {
                                conn._backqueue(q, conn)
                            }
                        }, 20000)
                    } else {
                        return
                    }

                    if (conn._queues.length == 1) {
                        conn._backqueue(noticeMessage.queue, conn);
                    }

                    break;
                case 3:
                    conn._receiveProvision(result, conn);
                    break;
            }

        });
        var accessToken = options.access_token || '';
        if (accessToken == '') {
            conn.onError({
                type: _code.WEBIM_CONNCTION_OPEN_USERGRID_ERROR,
                data: options
            });
            return;
        }

        conn.context.accessToken = options.access_token;
    } catch (e) {

    }
};

WebIM.connection.prototype._base64transform = base64transform;
WebIM.connection.prototype._getSock = _getSock;
WebIM.connection.prototype._login = _login;

WebIM.version = '_version';

export default WebIM