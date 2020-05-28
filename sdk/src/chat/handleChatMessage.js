import Long from 'long'
import ChatMessage from './sendChatMessage';
import getCode from '../status';
import Message from '../message'
import _utils from '../utils/commonUtil'

const _code = getCode();
const ContentsType = {
    0: "TEXT",
    1: "IMAGE",
    2: "VIDEO",
    3: "LOCATION",
    4: "VOICE",
    5: "FILE",
    6: "COMMAND",
    7: "CUSTOM"
}
var sendDelivery = function (conn, msg, msgId) {
    if (conn.delivery && msg.from !== msg.to) {
        var id = conn.getUniqueId();
        var deliverMessage = new Message('delivery', id);
        deliverMessage.set({
            ackId: msgId,
            to: msg.from
        });
        ChatMessage(deliverMessage.body, conn);
        // self.send(deliverMessage.body);
    }
}

var decodeMsg = function (msgExt) {
    if (!msgExt) {
        return
    }
    let msg = msgExt
    let msgObj = {}
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
                var varintValue = msg[k].varintValue
                var value = new Long(varintValue.low, varintValue.high, varintValue.unsigned).toString();
                msgObj[msg[k].key] = Number(value);
            } else {
                msgObj[msg[k].key] = msg[k].varintValue;
            }
        }
    }
    return msgObj
}
var handleMessage = function (meta, status, conn, ignoreCallback) {
    var self = conn;
    var time = new Long(meta.timestamp.low, meta.timestamp.high, meta.timestamp.unsigned).toString();
    var messageBodyMessage = self.context.root.lookup("easemob.pb.MessageBody");
    var thirdMessage = messageBodyMessage.decode(meta.payload);
    var msgId = new Long(meta.id.low, meta.id.high, meta.id.unsigned).toString();
    var ackMsgId = thirdMessage.ackMessageId ? new Long(thirdMessage.ackMessageId.low, thirdMessage.ackMessageId.high, thirdMessage.ackMessageId.unsigned).toString() : "";
    var type = null;
    conn.isDebug && console.log('下行消息：', thirdMessage)
    if (thirdMessage.type === 1) { //messagetype 群组/聊天室。。。。
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
                ackContent: thirdMessage.ackContent
            })
            return
        }
        conn.onReadMessage({
            mid: ackMsgId
        });
        return;
    } else if (thirdMessage.type === 5) {
        type = "deliver_ack";
        conn.onDeliverdMessage({
            mid: ackMsgId
        });
        return;
    } else if (thirdMessage.type === 6) {
        type = "recall";
        conn.onRecallMessage({ //需要增加一个回撤消息的监听
            mid: ackMsgId
        });
        return;
    }

    for (var i = 0; i < thirdMessage.contents.length; i++) {
        var msg = {};
        var errorBool = status.errorCode > 0;
        var errorCode = status.errorCode;
        var errorText = status.reason;
        var msgBody = thirdMessage.contents[i];
        var from = thirdMessage.from.name;
        var to = thirdMessage.to.name
        var extmsg = {};
        if (thirdMessage.ext) {
            extmsg = decodeMsg(thirdMessage.ext)
        }

        try {
            switch (msgBody.type) { //contentsType 为消息类型 txt、img。。。
                case 0:
                    var receiveMsg = thirdMessage.contents[i].text;
                    if (!WebIM) {
                        var WebIM = {}
                    }
                    var emojibody = _utils.parseTextMessage(receiveMsg, WebIM && WebIM.Emoji);
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
                            msgConfig: thirdMessage.msgConfig
                        };
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
                            msgConfig: thirdMessage.msgConfig
                        };
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
                    var params = ''
                    if (thirdMessage.contents[0].customExts) {
                        customExts = decodeMsg(thirdMessage.contents[0].customExts)
                    }

                    if (thirdMessage.contents[0].params) {
                        params = decodeMsg(thirdMessage.contents[0].params)
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
                        time: time
                    };
                    !ignoreCallback && conn.onCustomMessage(msg);
                    break;
                default:
                    break;
            }
        } catch (e) {
            conn.onError({
                type: _code.WEBIM_CONNCTION_CALLBACK_INNER_ERROR,
                data: e
            });
        }
        // msg.error = "";
        // msg.errorText = "";
        // msg.errorCode = "";
        !ignoreCallback && thirdMessage.type === 1 && conn.delivery && sendDelivery(conn, msg, msgId);
        if (ignoreCallback || conn.delivery) {
            msg.message_type = type
            return msg
        }
    }

}

export default handleMessage