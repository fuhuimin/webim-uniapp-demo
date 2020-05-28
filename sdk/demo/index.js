import config from "./WebIMConfig"
import WebIM from "../index"
console.log(config, WebIM)

WebIM.config = config

const conn = new WebIM.connection({
	isHttpDNS: WebIM.config.isHttpDNS,
	isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
	host: WebIM.config.Host,
	https: WebIM.config.https,
	url: WebIM.config.xmppURL,
	apiUrl: WebIM.config.apiURL,
	isAutoLogin: false,
	heartBeatWait: WebIM.config.heartBeatWait,
	autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
	autoReconnectInterval: WebIM.config.autoReconnectInterval,
	isStropheLog: WebIM.config.isStropheLog,
	delivery: WebIM.config.delivery
})

conn.listen({
	onOpened: function (message) {          //连接成功回调
			var myDate = new Date().toLocaleString();
			console.log("%c [opened] 连接已成功建立", "color: green");
			console.log(myDate);
			
			// rek();
			// alert(myDate + "登陆成功")
	},
	onClosed: function (message) {
			console.log("onclose:" + message);
			console.log(error);
	},         //连接关闭回调
	onTextMessage: function (message) {
			console.log('onTextMessage: ', message);

	},    //收到文本消息

	onEmojiMessage: function (message) {
			console.log('onEmojiMessage: ', message);
	},   //收到表情消息
	onPictureMessage: function (message) {
			console.log('onPicMessage: ', message);
	}
});

const options = {
	apiUrl: WebIM.config.apiURL,
	user: 'sunylt',
	pwd: 'a1b9c8d77',
	appKey: WebIM.config.appkey
}

conn.open(options);