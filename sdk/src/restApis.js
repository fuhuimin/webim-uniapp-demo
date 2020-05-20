// import _utils from './utils'
import wxMiniProgram from './checkEnv';
import HandleChatMessage from './chat/handleChatMessage';
import getCode from './status';
var Base64 = require('Base64')
const _code = getCode();
var _utils
if (wxMiniProgram) {
	_utils = require('./wx/utils').default
} else {
	_utils = require('./utils').default
}
let connectionProto = {
	mr_cache: [],
	_fetchMessages: function(options, conn) {
		var token = options.accessToken || conn.context.accessToken

		if (!_utils.isCanSetRequestHeader) {
			conn.onError({
				type: _code.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR
			});
			return;
		}

		if (token) {
			var apiUrl = conn.apiUrl;
			var appName = conn.context.appName;
			var orgName = conn.context.orgName;

			if (!appName || !orgName) {
				conn.onError({
					type: _code.WEBIM_CONNCTION_AUTH_ERROR
				});
				return;
			}

			if (!options.queue) {
				conn.onError({
					type: "",
					msg: "queue is not specified"
				});
				return;
			}

			var queue = options.queue
			var _dataQueue = this.mr_cache[queue] || (this.mr_cache[queue] = {
				msgs: []
			})
			var suc = function(res, xhr) {
				if (res && res.data) {
					var data = res.data
					if (!res.data.msgs) {
						typeof options.success === 'function' && options.success(_dataQueue);
						_dataQueue.is_last = true
						_dataQueue.next_key = ''
						return;
					}

					var msgs = data.msgs;
					var length = msgs.length;

					_dataQueue.is_last = data.is_last;
					_dataQueue.next_key = data.next_key;
					var _parseMeta = function(meta) {
						var arr = [];
						meta = Base64.atob(meta);
						for (var i = 0, j = meta.length; i < j; ++i) {
							arr.push(meta.charCodeAt(i));
						}
						//var tmpUint8Array = new Uint8Array(arr); 

						var CommSyncDLMessage = conn.context.root.lookup("easemob.pb.Meta");
						CommSyncDLMessage = CommSyncDLMessage.decode(arr);

						var status = {
							errorCode: 0,
							reason: ''
						}
						if (CommSyncDLMessage.ns == 1) {
							var thirdMessage = HandleChatMessage(CommSyncDLMessage, status, conn, true)
							return thirdMessage;
						} else {
							//console.log('CommSyncDLMessage', CommSyncDLMessage)
						}
					}

					try {
						for (var i = 0; i < length; i++) {
							var msgObj = _parseMeta(msgs[i].msg)
							msgObj && _dataQueue.msgs.push(msgObj);
						}
					} catch (err) {
						console.log(err)
					} finally {
						typeof options.success === 'function' && options.success(_dataQueue);
					}
				}
			};

			var error = function(res, msg) {
				if (res.error && res.error_description) {
					conn.onError({
						type: _code.WEBIM_CONNCTION_LOAD_CHATROOM_ERROR,
						msg: res.error_description,
						data: res
					});
				}
			};

			var userId = conn.context.userId;
			var start = -1

			// 无历史消息或者缓存消息足够不再加载
			if (_dataQueue.msgs.length >= options.count || _dataQueue.is_last) {
				typeof options.success === 'function' && options.success(_dataQueue);
				return;
			}

			// 根据上一次拉取返回的last_key 进行本次消息拉取
			if (_dataQueue && _dataQueue.next_key) {
				start = _dataQueue.next_key
			}

			var suffix = options.isGroup ? "@conference.easemob.com" : "@easemob.com";
			var data = {
				queue: queue + suffix,
				start: start,
				end: -1
			};

			var opts = {
				url: apiUrl + '/' + orgName + '/' + appName + '/users/' + userId + '/messageroaming',
				dataType: 'json',
				type: 'POST',
				headers: {
					'Authorization': 'Bearer ' + token
				},
				data: JSON.stringify(data),
				success: suc || _utils.emptyfn,
				error: error || _utils.emptyfn
			};

			_utils.ajax(opts);

		} else {
			conn.onError({
				type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
			});
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
	fetchHistoryMessages: function(options) {
		var conn = this
		if (!options.queue) {
			conn.onError({
				type: "",
				msg: "queue is not specified"
			});
			return;
		}

		var count = options.count || 20

		function _readCacheMessages() {
			conn._fetchMessages({
				count: count,
				isGroup: options.isGroup ? true : false,
				queue: options.queue,
				success: function(data) {
					var length = data.msgs.length
					if (length >= count || data.is_last) {
						options.success && options.success(_utils.reverse(data.msgs.splice(0, count)))
					} else {
						_readCacheMessages()
					}
				},
				fail: function() {}
			}, conn)
		}
		_readCacheMessages()
	},

	/**
	 * 自己分页获取对话历史消息
	 * @param {Object} options
	 * @param {String} options.queue   - 对方用户名Id
	 * @param {String} options.start   - 其实位置
	 * @param {String} options.end   - 终止位置
	 * @param {Boolean} options.isGroup - 是否是群聊,默认为false
	 * @param {Function} options.success
	 * @param {Funciton} options.fail
	 */
	pagingHistoryMessages: function(options) {
		var conn = this
		var token = options.accessToken || conn.context.accessToken

		if (!_utils.isCanSetRequestHeader) {
			conn.onError({
				type: _code.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR
			});
			return;
		}

		if (token) {
			var apiUrl = conn.apiUrl;
			var appName = conn.context.appName;
			var orgName = conn.context.orgName;

			if (!appName || !orgName) {
				conn.onError({
					type: _code.WEBIM_CONNCTION_AUTH_ERROR
				});
				return;
			}

			if (!options.queue) {
				conn.onError({
					type: "",
					msg: "queue is not specified"
				});
				return;
			}

			var queue = options.queue

			var suc = function(res, xhr) {
				if (res && res.data) {
					var data = res.data
					if (!res.data.msgs) {
						typeof options.success === 'function' && options.success({
							msgs: []
						});
						return;
					}
					var msgs = data.msgs;
					var length = msgs.length;

					var _parseMeta = function(meta) {
						var arr = [];
						meta = Base64.atob(meta);
						for (var i = 0, j = meta.length; i < j; ++i) {
							arr.push(meta.charCodeAt(i));
						}
						//var tmpUint8Array = new Uint8Array(arr); 

						var CommSyncDLMessage = conn.context.root.lookup("easemob.pb.Meta");
						CommSyncDLMessage = CommSyncDLMessage.decode(arr);

						var status = {
							errorCode: 0,
							reason: ''
						}
						if (CommSyncDLMessage.ns == 1) {
							var thirdMessage = HandleChatMessage(CommSyncDLMessage, status, conn, true)
							return thirdMessage;
						} else {

						}
					}
					var outMsgs = []
					try {
						for (var i = 0; i < length; i++) {
							var msgObj = _parseMeta(msgs[i].msg)
							outMsgs.push(msgObj);
						}
					} catch (err) {
						console.log(err)
					} finally {
						typeof options.success === 'function' && options.success(outMsgs);
					}
				}
			};

			var error = function(res, msg) {
				if (res.error && res.error_description) {
					conn.onError({
						type: _code.WEBIM_CONNCTION_LOAD_CHATROOM_ERROR,
						msg: res.error_description,
						data: res
					});
				}
			};

			var userId = conn.context.userId;

			var suffix = options.isGroup ? "@conference.easemob.com" : "@easemob.com";

			var data = {
				queue: queue + suffix,
				start: options.start,
				end: options.end
			};

			var opts = {
				url: apiUrl + '/' + orgName + '/' + appName + '/users/' + userId + '/messageroaming',
				dataType: 'json',
				type: 'POST',
				headers: {
					'Authorization': 'Bearer ' + token
				},
				data: JSON.stringify(data),
				success: suc || _utils.emptyfn,
				error: error || _utils.emptyfn
			};

			_utils.ajax(opts);

		} else {
			conn.onError({
				type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
			});
		}
	},

	/**
	 * 获取聊天室列表（分页）
	 * @param {Object} options -
	 * @param {String} options.apiUrl - rest的接口地址
	 * @param {Number} options.pagenum - 页码，默认1
	 * @param {Number} options.pagesize - 每页数量，默认20
	 * @param {Function} options.success - 成功之后的回调，默认为空
	 */
	getChatRooms: function(options) {

		if (!_utils.isCanSetRequestHeader) {
			conn.onError({
				type: _code.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR
			});
			return;
		}

		var conn = this,
			token = options.accessToken || this.context.accessToken;

		if (token) {
			var apiUrl = options.apiUrl;
			var appName = this.context.appName;
			var orgName = this.context.orgName;

			if (!appName || !orgName) {
				conn.onError({
					type: _code.WEBIM_CONNCTION_AUTH_ERROR
				});
				return;
			}

			var suc = function(data, xhr) {
				typeof options.success === 'function' && options.success(data);
			};

			var error = function(res, xhr, msg) {
				if (res.error && res.error_description) {
					conn.onError({
						type: _code.WEBIM_CONNCTION_LOAD_CHATROOM_ERROR,
						msg: res.error_description,
						data: res,
						xhr: xhr
					});
				}
			};

			var pageInfo = {
				pagenum: parseInt(options.pagenum) || 1,
				pagesize: parseInt(options.pagesize) || 20
			};

			var opts = {
				url: apiUrl + '/' + orgName + '/' + appName + '/chatrooms',
				dataType: 'json',
				type: 'GET',
				headers: {
					'Authorization': 'Bearer ' + token
				},
				data: pageInfo,
				success: suc || _utils.emptyfn,
				error: error || _utils.emptyfn
			};
			_utils.ajax(opts);
		} else {
			conn.onError({
				type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
			});
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
	joinChatRoom: function(options) {
		var options = options || {};
		if (!_utils.isCanSetRequestHeader) {
			conn.onError({
				type: _code.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR
			});
			return;
		}

		var conn = this
		var token = options.accessToken || this.token;

		if (token) {
			var apiUrl = options.apiUrl || this.apiUrl;
			var appName = this.context.appName;
			var orgName = this.context.orgName;
			var roomId = options.roomId
			var message = options.message || '';
			if (!appName || !orgName) {
				conn.onError({
					type: _code.WEBIM_CONNCTION_AUTH_ERROR
				});
				return;
			}

			var suc = function(data, xhr) {
				typeof options.success === 'function' && options.success(data);
			};

			var error = function(res, xhr, msg) {
				typeof options.error === 'function' && options.error(res);
			};

			var opts = {
				url: apiUrl + '/' + orgName + '/' + appName + '/chatrooms/' + roomId + '/apply',
				dataType: 'json',
				type: 'POST',
				data: JSON.stringify({
					message: message
				}),
				headers: {
					'Authorization': 'Bearer ' + token,
					'Content-Type': 'application/json'
				},
				success: suc || _utils.emptyfn,
				error: error || _utils.emptyfn
			};
			_utils.ajax(opts);
		} else {
			conn.onError({
				type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
			});
		}
	},

	/**
	 * 退出聊天室
	 * @param {Object} options -
	 * @param {String} options.roomId - 聊天室的ID
	 * @param {Function} options.success - 成功之后的回调，默认为空
	 * @param {Function} options.error - 失败之后的回调，默认为空
	 */
	quitChatRoom: function(options) {
		var options = options || {};
		if (!_utils.isCanSetRequestHeader) {
			conn.onError({
				type: _code.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR
			});
			return;
		}

		var conn = this
		var token = options.accessToken || this.token;

		if (token) {
			var apiUrl = options.apiUrl || this.apiUrl;
			var appName = this.context.appName;
			var orgName = this.context.orgName;
			var roomId = options.roomId
			if (!appName || !orgName) {
				conn.onError({
					type: _code.WEBIM_CONNCTION_AUTH_ERROR
				});
				return;
			}

			var suc = function(data, xhr) {
				typeof options.success === 'function' && options.success(data);
			};

			var error = function(res, xhr, msg) {
				typeof options.error === 'function' && options.error(res);
			};

			var opts = {
				url: apiUrl + '/' + orgName + '/' + appName + '/chatrooms/' + roomId + '/quit',
				dataType: 'json',
				type: 'DELETE',
				headers: {
					'Authorization': 'Bearer ' + token
				},
				success: suc || _utils.emptyfn,
				error: error || _utils.emptyfn
			};
			_utils.ajax(opts);
		} else {
			conn.onError({
				type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
			});
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
	createGroupNew: function(opt) {
		opt.data.owner = this.user;
		opt.data.invite_need_confirm = false;
		var options = {
			url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/chatgroups',
			dataType: 'json',
			type: 'POST',
			data: JSON.stringify(opt.data),
			headers: {
				'Authorization': 'Bearer ' + this.token,
				'Content-Type': 'application/json'
			}
		};
		options.success = function(respData) {
			opt.success(respData);
			this.onCreateGroup(respData);
		}.bind(this);
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API屏蔽群组，只对移动端有效
	 * @param {Object} opt -
	 * @param {string} opt.groupId - 需要屏蔽的群组ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 * @since 1.4.11
	 */
	blockGroup: function(opt) {
		var groupId = opt.groupId;
		groupId = 'notification_ignore_' + groupId;
		var data = {
			entities: []
		};
		data.entities[0] = {};
		data.entities[0][groupId] = true;
		var options = {
			type: 'PUT',
			url: this.apiUrl + '/' + this.orgName + '/' +
				this.appName + '/' + 'users' + '/' + this.user,
			data: JSON.stringify(data),
			headers: {
				'Authorization': 'Bearer ' + this.token,
				'Content-Type': 'application/json'
			}
		};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
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
	listGroups: function(opt) {
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
				'Content-Type': 'application/json'
			}
		};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API列出某用户所加入的所有群组
	 * @param {Object} opt - 
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 * @since 1.4.11
	 */
	getGroup: function(opt) {
		var options = {
			url: this.apiUrl + '/' + this.orgName +
				'/' + this.appName + '/' + 'users' + '/' +
				this.user + '/' + 'joined_chatgroups',
			dataType: 'json',
			type: 'GET',
			headers: {
				'Authorization': 'Bearer ' + this.token,
				'Content-Type': 'application/json'
			}
		};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过restful api转让群组
	 * @param {Object} opt
	 * @param {String}opt.groupId - 群组id
	 * @param {String}opt.newOwner - 群组的新管理员 ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	changeOwner: function(opt) {
		var requestData = {
			newowner: opt.newOwner
		}
		var options = {
			url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/chatgroups/' + opt.groupId,
			type: 'PUT',
			dataType: 'json',
			headers: {
				'Authorization': 'Bearer ' + this.token,
				'Content-Type': 'application/json'
			},
			data: JSON.stringify(requestData)
		}
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API根据groupId获取群组详情
	 * @param {Object} opt -
	 * @param {string} opt.groupId - 群组ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 * @since 1.4.11
	 */
	getGroupInfo: function(opt) {
		var options = {
			url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/chatgroups/' + opt.groupId + '?joined_time=true',
			type: 'GET',
			dataType: 'json',
			headers: {
				'Authorization': 'Bearer ' + this.token,
				'Content-Type': 'application/json'
			}
		};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
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
	modifyGroup: function(opt) {
		var groupId = opt.groupId,
			requestData = {
				groupname: opt.groupName,
				description: opt.description
			},
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatgroups' + '/' + groupId,
				type: 'PUT',
				data: JSON.stringify(requestData),
				dataType: 'json',
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
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
	listGroupMember: function(opt) {
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
				'Content-Type': 'application/json'
			}
		};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API获取群组下所有管理员
	 * @param {Object} opt -
	 * @param {string} opt.groupId - 群组ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 * @since 1.4.11
	 */
	getGroupAdmin: function(opt) {
		var groupId = opt.groupId;
		var options = {
			url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/chatgroups' +
				'/' + groupId + '/admin',
			dataType: 'json',
			type: 'GET',
			headers: {
				'Authorization': 'Bearer ' + this.token,
				'Content-Type': 'application/json'
			}
		};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API设置群管理员
	 * @param {Object} opt -
	 * @param {string} opt.groupId - 群组ID
	 * @param {string} opt.username - 用户ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	setAdmin: function(opt) {
		var groupId = opt.groupId,
			requestData = {
				newadmin: opt.username
			},
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/' + 'chatgroups' +
					'/' + groupId + '/' + 'admin',
				type: "POST",
				dataType: 'json',
				data: JSON.stringify(requestData),
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API取消群管理员
	 * @param {Object} opt -
	 * @param {string} opt.gorupId - 群组ID
	 * @param {string} opt.username - 用户ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	removeAdmin: function(opt) {
		var groupId = opt.groupId,
			username = opt.username,
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/' + 'chatgroups' +
					'/' + groupId + '/' + 'admin' + '/' + username,
				type: 'DELETE',
				dataType: 'json',
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API解散群组
	 * @param {Object} opt -
	 * @param {string} opt.groupId - 群组ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	dissolveGroup: function(opt) {
		var groupId = opt.groupId,
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatgroups' + '/' + groupId + '?version=v3',
				type: 'DELETE',
				dataType: 'json',
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API离开群组
	 * @param {Object} opt -
	 * @param {string} opt.groupId - 群组ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	quitGroup: function(opt) {
		var groupId = opt.groupId,
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatgroups' + '/' + groupId + '/' + 'quit',
				type: 'DELETE',
				dataType: 'json',
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API邀请群成员
	 * @param {Object} opt -
	 * @param {string} opt.groupId - 群组名
	 * @param {string[]} opt.users - 用户ID数组
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	inviteToGroup: function(opt) {
		var groupId = opt.groupId,
			users = opt.users,
			requestData = {
				usernames: users
			},
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatgroups' + '/' + groupId + '/' + 'invite',
				type: 'POST',
				data: JSON.stringify(requestData),
				dataType: 'json',
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API发出入群申请
	 * @param {Object} opt -
	 * @param {String} opt.groupId - 加入群组ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 * @since 1.4.11
	 */
	joinGroup: function(opt) {
		var options = {
			url: this.apiUrl + '/' + this.orgName + '/' +
				this.appName + '/' + 'chatgroups' + '/' + opt.groupId + '/' + 'apply',
			type: 'POST',
			dataType: 'json',
			data: JSON.stringify({
				message: 'join group'
			}), // 后端参数变更，申请入群需要填写入群消息
			headers: {
				'Authorization': 'Bearer ' + this.token,
				'Content-Type': 'application/json'
			}
		};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API同意用户加入群
	 * @param {Object} opt -
	 * @param {string} opt.applicant - 申请加群的用户ID
	 * @param {Object} opt.groupId - 群组ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	agreeJoinGroup: function(opt) {
		var groupId = opt.groupId,
			requestData = {
				"applicant": opt.applicant,
				"verifyResult": true,
				"reason": "no clue"
			},
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatgroups' + '/' + groupId + '/' + 'apply_verify',
				type: 'POST',
				dataType: "json",
				data: JSON.stringify(requestData),
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API拒绝用户加入群
	 * @param {Object} opt -
	 * @param {string} opt.applicant - 申请加群的用户ID
	 * @param {Object} opt.groupId - 群组ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	rejectJoinGroup: function(opt) {
		var groupId = opt.groupId,
			requestData = {
				"applicant": opt.applicant,
				"verifyResult": false,
				"reason": "no clue"
			},
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatgroups' + '/' + groupId + '/' + 'apply_verify',
				type: 'POST',
				dataType: "json",
				data: JSON.stringify(requestData),
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API同意加群邀请
	 * @param {Object} opt -
	 * @param {string} opt.invitee - 处理群邀请用户的用户名
	 * @param {Object} opt.groupId - 群组ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	agreeInviteIntoGroup: function(opt) {
		var groupId = opt.groupId,
			requestData = {
				"invitee": opt.invitee,
				"verifyResult": true
			},
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatgroups' + '/' + groupId + '/' + 'invite_verify',
				type: 'POST',
				dataType: "json",
				data: JSON.stringify(requestData),
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API拒绝加群邀请
	 * @param {Object} opt -
	 * @param {string} opt.invitee - 处理群邀请用户的用户名
	 * @param {Object} opt.groupId - 群组ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	rejectInviteIntoGroup: function(opt) {
		var groupId = opt.groupId,
			requestData = {
				"invitee": opt.invitee,
				"verifyResult": false
			},
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatgroups' + '/' + groupId + '/' + 'invite_verify',
				type: 'POST',
				dataType: "json",
				data: JSON.stringify(requestData),
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API删除单个群成员
	 * @param {Object} opt -
	 * @param {string} opt.groupId - 群组ID
	 * @param {string} opt.username - 用户ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	removeSingleGroupMember: function(opt) {
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
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API删除多个群成员
	 * @param {Object} opt -
	 * @param {string} opt.groupId - 群组ID
	 * @param {string[]} opt.users - 用户ID数组
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	removeMultiGroupMember: function(opt) {
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
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
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
	mute: function(opt) {
		var groupId = opt.groupId,
			requestData = {
				"usernames": [opt.username],
				"mute_duration": opt.muteDuration
			},
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/' + 'chatgroups' +
					'/' + groupId + '/' + 'mute',
				dataType: 'json',
				type: 'POST',
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				},
				data: JSON.stringify(requestData)
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
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
	muteChatRoomMember: function(opt) {
		var chatRoomId = opt.chatRoomId,
			requestData = {
				"usernames": [opt.username],
				"mute_duration": opt.muteDuration
			},
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/' + 'chatrooms' +
					'/' + chatRoomId + '/' + 'mute',
				dataType: 'json',
				type: 'POST',
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				},
				data: JSON.stringify(requestData)
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
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
	removeMute: function(opt) {
		var groupId = opt.groupId,
			username = opt.username;
		var options = {
			url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/' + 'chatgroups' +
				'/' + groupId + '/' + 'mute' + '/' + username,
			dataType: 'json',
			type: 'DELETE',
			headers: {
				'Authorization': 'Bearer ' + this.token,
				'Content-Type': 'application/json'
			}
		};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
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
	removeMuteChatRoomMember: function(opt) {
		var chatRoomId = opt.chatRoomId,
			username = opt.username;
		var options = {
			url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/' + 'chatrooms' +
				'/' + chatRoomId + '/' + 'mute' + '/' + username,
			dataType: 'json',
			type: 'DELETE',
			headers: {
				'Authorization': 'Bearer ' + this.token,
				'Content-Type': 'application/json'
			}
		};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API获取群组下所有被禁言成员
	 * @param {Object} opt -
	 * @param {string} opt.groupId - 群组ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	getMuted: function(opt) {
		var groupId = opt.groupId;
		var options = {
			url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/chatgroups' +
				'/' + groupId + '/mute',
			dataType: 'json',
			type: 'GET',
			headers: {
				'Authorization': 'Bearer ' + this.token,
				'Content-Type': 'application/json'
			}
		};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API获取聊天室下所有被禁言成员
	 * @param {Object} opt -
	 * @param {string} opt.chatRoomId - 聊天室ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	getChatRoomMuted: function(opt) {
		var chatRoomId = opt.chatRoomId;
		var options = {
			url: this.apiUrl + '/' + this.orgName + '/' + this.appName + '/chatrooms' +
				'/' + chatRoomId + '/mute',
			dataType: 'json',
			type: 'GET',
			headers: {
				'Authorization': 'Bearer ' + this.token,
				'Content-Type': 'application/json'
			}
		};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API添加用户至群组黑名单(单个)
	 * @param {Object} opt -
	 * @param {string} opt.groupId - 群组ID
	 * @param {stirng} opt.username - 用户ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	groupBlockSingle: function(opt) {
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
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API添加用户至聊天室黑名单(单个)
	 * @param {Object} opt -
	 * @param {string} opt.chatRoomId - 聊天室ID
	 * @param {stirng} opt.username - 用户ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	chatRoomBlockSingle: function(opt) {
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
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API添加用户至群组黑名单(批量)
	 * @param {Object} opt -
	 * @param {string[]} opt.username - 用户ID数组
	 * @param {string} opt.groupId - 群组ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	groupBlockMulti: function(opt) {
		var groupId = opt.groupId,
			usernames = opt.usernames,
			requestData = {
				usernames: usernames
			},
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatgroups' + '/' + groupId + '/' + 'blocks' + '/' +
					'users',
				data: JSON.stringify(requestData),
				type: 'POST',
				dataType: 'json',
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API添加用户至聊天室黑名单(批量)
	 * @param {Object} opt -
	 * @param {string[]} opt.username - 用户ID数组
	 * @param {string} opt.chatRoomId - 聊天室ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	chatRoomBlockMulti: function(opt) {
		var chatRoomId = opt.chatRoomId,
			usernames = opt.usernames,
			requestData = {
				usernames: usernames
			},
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatrooms' + '/' + chatRoomId + '/' + 'blocks' + '/' +
					'users',
				data: JSON.stringify(requestData),
				type: 'POST',
				dataType: 'json',
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API将用户从群黑名单移除（单个）
	 * @param {Object} opt -
	 * @param {string} opt.groupId - 群组ID
	 * @param {string} opt.username - 用户ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	removeGroupBlockSingle: function(opt) {
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
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API将用户从聊天室黑名单移除（单个）
	 * @param {Object} opt -
	 * @param {string} opt.chatRoomId - 聊天室ID
	 * @param {string} opt.username - 用户ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	removeChatRoomBlockSingle: function(opt) {
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
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API将用户从群黑名单移除（批量）
	 * @param {Object} opt -
	 * @param {string} opt.groupId - 群组ID
	 * @param {string} opt.username - 多个用户ID逗号分隔
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	removeGroupBlockMulti: function(opt) {
		var groupId = opt.groupId,
			username = opt.username.join(','),
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatgroups' + '/' + groupId + '/' + 'blocks' + '/' +
					'users' + '/' + username,
				type: 'DELETE',
				dataType: 'json',
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API将用户从聊天室黑名单移除（批量）
	 * @param {Object} opt -
	 * @param {string} opt.chatRoomId - 聊天室ID
	 * @param {string} opt.username - 多个用户ID逗号分隔
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	removeGroupBlockMulti: function(opt) {
		var chatRoomId = opt.chatRoomId,
			username = opt.username.join(','),
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatrooms' + '/' + chatRoomId + '/' + 'blocks' + '/' +
					'users' + '/' + username,
				type: 'DELETE',
				dataType: 'json',
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API获取群组黑名单
	 * @param {Object} opt -
	 * @param {string} opt.groupId - 群组ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	getGroupBlacklistNew: function(opt) {
		var groupId = opt.groupId,
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatgroups' + '/' + groupId + '/' + 'blocks' + '/' + 'users',
				type: 'GET',
				dataType: 'json',
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 通过RestFul API获取聊天室黑名单
	 * @param {Object} opt -
	 * @param {string} opt.chatRoomId - 聊天室ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	getChatRoomBlacklistNew: function(opt) {
		var chatRoomId = opt.chatRoomId,
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatrooms' + '/' + chatRoomId + '/' + 'blocks' + '/' + 'users',
				type: 'GET',
				dataType: 'json',
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 群一键禁言. 操作权限：app admin、群组owner、群组admin及以上身份
	 * @param {Object} opt -
	 * @param {string} opt.groupId - 群组ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	disableSendGroupMsg: function(opt) {
		var groupId = opt.groupId,
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatgroups' + '/' + groupId + '/' + 'ban',
				type: 'POST',
				dataType: 'json',
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 聊天室一键禁言. 操作权限：app admin、群组owner、群组admin及以上身份
	 * @param {Object} opt -
	 * @param {string} opt.chatRoomId - 聊天室ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	disableSendChatRoomMsg: function(opt) {
		var chatRoomId = opt.chatRoomId,
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatrooms' + '/' + chatRoomId + '/' + 'ban',
				type: 'POST',
				dataType: 'json',
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 解除群一键禁言. 操作权限：app admin、群组owner、群组admin及以上身份
	 * @param {Object} opt -
	 * @param {string} opt.groupId - 群组ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	enableSendGroupMsg: function(opt) {
		var groupId = opt.groupId,
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatgroups' + '/' + groupId + '/' + 'ban',
				type: 'DELETE',
				dataType: 'json',
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 聊天室除群一键禁言. 操作权限：app admin、群组owner、群组admin及以上身份
	 * @param {Object} opt -
	 * @param {string} opt.chatRoomId - 聊天室ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	enableSendChatRoomMsg: function(opt) {
		var chatRoomId = opt.chatRoomId,
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatrooms' + '/' + chatRoomId + '/' + 'ban',
				type: 'DELETE',
				dataType: 'json',
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 增加白名单群成员 操作权限：app admin、群组owner、群组admin及以上身份
	 * @param {Object} opt -
	 * @param {string} opt.groupId - 群组ID
	 * @param {Array} opt.users - 成员 ['username']
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	addUsersToGroupWhitelist: function(opt) {
		var groupId = opt.groupId,
			requestData = {
				usernames: opt.users
			},
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatgroups' + '/' + groupId + '/white/users',
				type: 'POST',
				data: JSON.stringify(requestData),
				dataType: 'json',
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 增加白名单群成员 操作权限：app admin、群组owner、群组admin及以上身份
	 * @param {Object} opt -
	 * @param {string} opt.chatRoomId - 聊天室ID
	 * @param {Array} opt.users - 成员 ['username']
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	addUsersToChatRoomWhitelist: function(opt) {
		var chatRoomId = opt.chatRoomId,
			requestData = {
				usernames: opt.users
			},
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatrooms' + '/' + chatRoomId + '/white/users',
				type: 'POST',
				data: JSON.stringify(requestData),
				dataType: 'json',
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 删除白名单群成员 操作权限：app admin、群组owner、群组admin及以上身份
	 * @param {Object} opt -
	 * @param {string} opt.groupId - 群组ID
	 * @param {string} opt.userName - 成员
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	rmUsersFromGroupWhitelist: function(opt) {
		var groupId = opt.groupId,
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatgroups' + '/' + groupId + '/white/users/' + opt.userName,
				type: 'DELETE',
				dataType: 'json',
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 删除白名单聊天室成员 操作权限：app admin、群组owner、群组admin及以上身份
	 * @param {Object} opt -
	 * @param {string} opt.chatRoomId - 聊天室ID
	 * @param {string} opt.userName - 成员
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	rmUsersFromChatRoomWhitelist: function(opt) {
		var chatRoomId = opt.chatRoomId,
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatrooms' + '/' + chatRoomId + '/white/users/' + opt.userName,
				type: 'DELETE',
				dataType: 'json',
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 获取白名单群成员 操作权限：需app admin、群组admin及以上身份；
	 * @param {Object} opt -
	 * @param {string} opt.groupId - 群组ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	getGroupWhitelist: function(opt) {
		var groupId = opt.groupId,
			requestData = {
				usernames: opt.users
			},
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatgroups' + '/' + groupId + '/white/users',
				type: 'GET',
				dataType: 'json',
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 获取白名单聊天室成员 操作权限：需app admin、群组admin及以上身份；
	 * @param {Object} opt -
	 * @param {string} opt.chatRoomId - 聊天室ID
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	getChatRoomWhitelist: function(opt) {
		var chatRoomId = opt.chatRoomId,
			requestData = {
				usernames: opt.users
			},
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatrooms' + '/' + chatRoomId + '/white/users',
				type: 'GET',
				dataType: 'json',
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 查询群成员是否是白名单用户 操作权限：app admin可查询所有用户；app user可查询自己
	 * @param {Object} opt -
	 * @param {string} opt.groupId - 群组ID
	 * @param {string} opt.userName - 用户名
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	isGroupWhiteUser: function(opt) {
		var groupId = opt.groupId,
			requestData = {
				usernames: opt.users
			},
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatgroups' + '/' + groupId + '/white/users/' + opt.userName,
				type: 'GET',
				dataType: 'json',
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
	},

	/**
	 * 查询聊天室成员是否是白名单用户 操作权限：app admin可查询所有用户；app user可查询自己
	 * @param {Object} opt -
	 * @param {string} opt.chatRoomId - 群组ID
	 * @param {string} opt.userName - 用户名
	 * @param {Function} opt.success - 成功之后的回调，默认为空
	 * @param {Function} opt.error - 失败之后的回调，默认为空
	 */
	isChatRoomWhiteUser: function(opt) {
		var chatRoomId = opt.chatRoomId,
			requestData = {
				usernames: opt.users
			},
			options = {
				url: this.apiUrl + '/' + this.orgName + '/' + this.appName +
					'/' + 'chatrooms' + '/' + chatRoomId + '/white/users/' + opt.userName,
				type: 'GET',
				dataType: 'json',
				headers: {
					'Authorization': 'Bearer ' + this.token,
					'Content-Type': 'application/json'
				}
			};
		options.success = opt.success || _utils.emptyfn;
		options.error = opt.error || _utils.emptyfn;
		_utils.ajax(options);
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
	getGroupMsgReadUser: function(options) {
		var me = this;
		var options = options || {};
		if (!_utils.isCanSetRequestHeader) {
			conn.onError({
				type: _code.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR
			});
			return;
		}

		var token = options.accessToken || this.token;

		if (token) {
			var apiUrl = me.apiUrl;
			var appName = me.context.appName;
			var orgName = me.context.orgName;

			if (!appName || !orgName) {
				me.onError({
					type: _code.WEBIM_CONNCTION_AUTH_ERROR
				});
				return;
			}

			var suc = function(data) {
				typeof options.success === 'function' && options.success(data);
			}
			var error = function(err) {
				typeof options.error === 'function' && options.error(err);
			}

			var opts = {
				url: apiUrl + '/' + orgName + '/' + appName + '/chatgroups/' + options.groupId + '/acks/' + options.msgId,
				dataType: 'json',
				type: 'GET',
				data: {
					limit: 500,
					key: undefined
				},
				headers: {
					'Authorization': 'Bearer ' + token
				},
				success: suc || _utils.emptyfn,
				error: error || _utils.emptyfn
			};
			_utils.ajax(opts);

		} else {
			me.onError({
				type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
			});
		}
	},

	/**
	 * 获取好友黑名单
	 * @param {Object} options - 
	 * @param {Function} options.success - 成功之后的回调，默认为空
	 * @param {Function} options.error - 失败之后的回调，默认为空
	 */
	getBlacklist: function(options) {
		var me = this;
		var options = options || {};
		if (!_utils.isCanSetRequestHeader) {
			conn.onError({
				type: _code.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR
			});
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
					type: _code.WEBIM_CONNCTION_AUTH_ERROR
				});
				return;
			}

			var suc = function(data, xhr) {
				var list = {};
				data.data.forEach((v, i) => {
					list[v] = {
						name: v
					}
				})
				me.onBlacklistUpdate(list);
				typeof options.success === 'function' && options.success(data);
			};

			var error = function(res, xhr, msg) {
				me.onBlacklistUpdate([]);
				typeof options.error === 'function' && options.error(res);
			};

			var opts = {
				url: apiUrl + '/' + orgName + '/' + appName + '/users/' + this.user + '/blocks/users',
				dataType: 'json',
				type: 'GET',
				headers: {
					'Authorization': 'Bearer ' + token
				},
				success: suc || _utils.emptyfn,
				error: error || _utils.emptyfn
			};
			_utils.ajax(opts);
		} else {
			conn.onError({
				type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
			});
		}
	},

	/**
	 * 获取联系人
	 * @param {Object} options - 
	 * @param {Function} options.success - 成功之后的回调，默认为空
	 * @param {Function} options.error - 失败之后的回调，默认为空
	 */

	getRoster: function(options) {
		var options = options || {};
		var self = this;
		if (!_utils.isCanSetRequestHeader) {
			conn.onError({
				type: _code.WEBIM_CONNCTION_NOT_SUPPORT_CHATROOM_ERROR
			});
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
					type: _code.WEBIM_CONNCTION_AUTH_ERROR
				});
				return;
			}

			var suc = function(data, xhr) {
				//_parseFriend *****之前用这个方法处理的返回消息
				let friends = [];
				data.data.forEach((v, i) => {
					friends.push({
						name: v,
						subscription: 'both',
						jid: self.context.jid
					});
				})
				typeof options.success === 'function' && options.success(friends);
				self.onRoster && self.onRoster(friends);
			};

			var error = function(res, xhr, msg) {
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
					'Authorization': 'Bearer ' + token
				},
				// data: pageInfo,
				success: suc || _utils.emptyfn,
				error: error || _utils.emptyfn
			};
			_utils.ajax(opts);
		} else {
			conn.onError({
				type: _code.WEBIM_CONNCTION_TOKEN_NOT_ASSIGN_ERROR
			});
		}
	},

	/**
	 * 获取群公告
	 * @param {Object} options - 
	 * @param {Object} options.groupId - 群组id
	 * @param {Function} options.success - 成功之后的回调，默认为空
	 * @param {Function} options.error - 失败之后的回调，默认为空
	 */
	fetchGroupAnnouncement: function(options) {
		var apiUrl = options.apiUrl || this.apiUrl;
		var appName = this.context.appName;
		var orgName = this.context.orgName;
		var groupId = options.groupId;
		var	opts = {
			url: `${apiUrl}/${orgName}/${appName}/chatgroups/${groupId}/announcement`,
			type: 'GET',
			dataType: 'json',
			headers: {
				'Authorization': 'Bearer ' + this.token,
				'Content-Type': 'application/json'
			}
		};
		opts.success = options.success || _utils.emptyfn;
		opts.error = options.error || _utils.emptyfn;
		_utils.ajax(opts);
	},

	/**
	 * 获取聊天室公告
	 * @param {Object} options - 
	 * @param {Object} options.roomId - 聊天室id
	 * @param {Function} options.success - 成功之后的回调，默认为空
	 * @param {Function} options.error - 失败之后的回调，默认为空
	 */
	fetchChatRoomAnnouncement: function(options) {
		var apiUrl = options.apiUrl || this.apiUrl;
		var appName = this.context.appName;
		var orgName = this.context.orgName;
		var roomId = options.roomId;
		var	opts = {
			url: `${apiUrl}/${orgName}/${appName}/chatrooms/${roomId}/announcement`,
			type: 'GET',
			dataType: 'json',
			headers: {
				'Authorization': 'Bearer ' + this.token,
				'Content-Type': 'application/json'
			}
		};
		opts.success = options.success || _utils.emptyfn;
		opts.error = options.error || _utils.emptyfn;
		_utils.ajax(opts);
	},

	/**
	 * 设置更新群公告
	 * @param {Object} options - 
	 * @param {Object} options.groupId - 群组id
	 * @param {Object} options.announcement - 公告内容
	 * @param {Function} options.success - 成功之后的回调，默认为空
	 * @param {Function} options.error - 失败之后的回调，默认为空
	 */

	updateGroupAnnouncement: function(options){
		var apiUrl = options.apiUrl || this.apiUrl;
		var appName = this.context.appName;
		var orgName = this.context.orgName;
		var groupId = options.groupId;
		var requestData = {
			announcement: options.announcement
		}
		var	opts = {
			url: `${apiUrl}/${orgName}/${appName}/chatgroups/${groupId}/announcement`,
			type: 'POST',
			dataType: 'json',
			data: JSON.stringify(requestData),
			headers: {
				'Authorization': 'Bearer ' + this.token,
				'Content-Type': 'application/json'
			}
		};
		opts.success = options.success || _utils.emptyfn;
		opts.error = options.error || _utils.emptyfn;
		_utils.ajax(opts);
	},

	/**
	 * 设置更新聊天室公告
	 * @param {Object} options - 
	 * @param {Object} options.roomId - 聊天室id
	 * @param {Object} options.announcement - 公告内容
	 * @param {Function} options.success - 成功之后的回调，默认为空
	 * @param {Function} options.error - 失败之后的回调，默认为空
	 */

	updateChatRoomAnnouncement: function(options){
		var apiUrl = options.apiUrl || this.apiUrl;
		var appName = this.context.appName;
		var orgName = this.context.orgName;
		var roomId = options.roomId;
		var requestData = {
			announcement: options.announcement
		}
		var	opts = {
			url: `${apiUrl}/${orgName}/${appName}/chatrooms/${roomId}/announcement`,
			type: 'POST',
			dataType: 'json',
			data: JSON.stringify(requestData),
			headers: {
				'Authorization': 'Bearer ' + this.token,
				'Content-Type': 'application/json'
			}
		};
		opts.success = options.success || _utils.emptyfn;
		opts.error = options.error || _utils.emptyfn;
		_utils.ajax(opts);
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
	uploadGroupSharedFile: function(options){
		var apiUrl = options.apiUrl || this.apiUrl;
		var appName = this.context.appName;
		var orgName = this.context.orgName;
		var groupId = options.groupId;
		_utils.uploadFile({
			uploadUrl: `${apiUrl}/${orgName}/${appName}/chatgroups/${groupId}/share_files`,
			onFileUploadProgress: options.onFileUploadProgress,
			onFileUploadComplete: options.onFileUploadComplete,
			onFileUploadError: options.onFileUploadError,
			onFileUploadCanceled: options.onFileUploadCanceled,
			accessToken: this.token,
			apiUrl: apiUrl,
			file: options.file,
			appKey: this.context.appKey
		})
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
	uploadChatRoomSharedFile: function(options){
		var apiUrl = options.apiUrl || this.apiUrl;
		var appName = this.context.appName;
		var orgName = this.context.orgName;
		var roomId = options.roomId;
		_utils.uploadFile({
			uploadUrl: `${apiUrl}/${orgName}/${appName}/chatrooms/${roomId}/share_files`,
			onFileUploadProgress: options.onFileUploadProgress,
			onFileUploadComplete: options.onFileUploadComplete,
			onFileUploadError: options.onFileUploadError,
			onFileUploadCanceled: options.onFileUploadCanceled,
			accessToken: this.token,
			apiUrl: apiUrl,
			file: options.file,
			appKey: this.context.appKey
		})
	},

	/**
	 * 删除群共享文件
	 * @param {Object} options - 
	 * @param {Object} options.groupId - 群组id
	 * @param {Object} options.fileId - 文件id
	 * @param {Function} options.success - 成功之后的回调，默认为空
	 * @param {Function} options.error - 失败之后的回调，默认为空
	 */
	deleteGroupSharedFile: function(options){
		var apiUrl = options.apiUrl || this.apiUrl;
		var appName = this.context.appName;
		var orgName = this.context.orgName;
		var groupId = options.groupId;
		var fileId = options.fileId;
		var	opts = {
			url: `${apiUrl}/${orgName}/${appName}/chatgroups/${groupId}/share_files/${fileId}`,
			type: 'DELETE',
			dataType: 'json',
			headers: {
				'Authorization': 'Bearer ' + this.token,
				'Content-Type': 'application/json'
			}
		};
		opts.success = options.success || _utils.emptyfn;
		opts.error = options.error || _utils.emptyfn;
		_utils.ajax(opts);
	},

	/**
	 * 删除聊天室共享文件
	 * @param {Object} options - 
	 * @param {Object} options.roomId - 聊天室id
	 * @param {Object} options.fileId - 文件id
	 * @param {Function} options.success - 成功之后的回调，默认为空
	 * @param {Function} options.error - 失败之后的回调，默认为空
	 */
	deleteChatRoomSharedFile: function(options){
		var apiUrl = options.apiUrl || this.apiUrl;
		var appName = this.context.appName;
		var orgName = this.context.orgName;
		var roomId = options.roomId;
		var fileId = options.fileId;
		var	opts = {
			url: `${apiUrl}/${orgName}/${appName}/chatrooms/${roomId}/share_files/${fileId}`,
			type: 'DELETE',
			dataType: 'json',
			headers: {
				'Authorization': 'Bearer ' + this.token,
				'Content-Type': 'application/json'
			}
		};
		opts.success = options.success || _utils.emptyfn;
		opts.error = options.error || _utils.emptyfn;
		_utils.ajax(opts);
	},

	/**
	 * 下载群共享文件
	 * @param {Object} options - 
	 * @param {Object} options.groupId - 群组id
	 * @param {Object} options.fileId - 文件id
	 * @param {Object} options.onFileDownloadComplete - 文件下载成功的回调
	 * @param {Object} options.onFileDownloadError - 文件下载失败的回调
	 */
	downloadGroupSharedFile: function(options){
		var apiUrl = options.apiUrl || this.apiUrl;
		var appName = this.context.appName;
		var orgName = this.context.orgName;
		var groupId = options.groupId;
		var fileId = options.fileId;
		_utils.download.call(this, {
			url: `${apiUrl}/${orgName}/${appName}/chatgroups/${groupId}/share_files/${fileId}`,
			onFileDownloadComplete: options.onFileDownloadComplete,
			onFileDownloadError: options.onFileDownloadError,
			accessToken: this.token,
			id: fileId,
			secret: ''
		})
	},

	/**
	 * 下载聊天室共享文件
	 * @param {Object} options - 
	 * @param {Object} options.roomId - 聊天室id
	 * @param {Object} options.fileId - 文件id
	 * @param {Object} options.onFileDownloadComplete - 文件下载成功的回调
	 * @param {Object} options.onFileDownloadError - 文件下载失败的回调
	 */
	downloadChatRoomSharedFile: function(options){
		var apiUrl = options.apiUrl || this.apiUrl;
		var appName = this.context.appName;
		var orgName = this.context.orgName;
		var roomId = options.roomId;
		var fileId = options.fileId;
		_utils.download.call(this, {
			url: `${apiUrl}/${orgName}/${appName}/chatrooms/${roomId}/share_files/${fileId}`,
			onFileDownloadComplete: options.onFileDownloadComplete,
			onFileDownloadError: options.onFileDownloadError,
			accessToken: this.token,
			id: fileId,
			secret: ''
		})
	},

	/**
	 * 获取群共享文件列表
	 * @param {Object} options - 
	 * @param {Object} options.groupId - 群组id
	 * @param {Function} options.success - 成功之后的回调，默认为空
	 * @param {Function} options.error - 失败之后的回调，默认为空
	 */
	fetchGroupSharedFileList: function(options){
		var apiUrl = options.apiUrl || this.apiUrl;
		var appName = this.context.appName;
		var orgName = this.context.orgName;
		var groupId = options.groupId;
		var	opts = {
			url: `${apiUrl}/${orgName}/${appName}/chatgroups/${groupId}/share_files`,
			type: 'GET',
			dataType: 'json',
			headers: {
				'Authorization': 'Bearer ' + this.token,
				'Content-Type': 'application/json'
			}
		};
		opts.success = options.success || _utils.emptyfn;
		opts.error = options.error || _utils.emptyfn;
		_utils.ajax(opts);
	},

	/**
	 * 获取聊天室共享文件列表
	 * @param {Object} options - 
	 * @param {Object} options.roomId - 聊天室id
	 * @param {Function} options.success - 成功之后的回调，默认为空
	 * @param {Function} options.error - 失败之后的回调，默认为空
	 */
	fetchChatRoomSharedFileList: function(options){
		var apiUrl = options.apiUrl || this.apiUrl;
		var appName = this.context.appName;
		var orgName = this.context.orgName;
		var roomId = options.roomId;
		var	opts = {
			url: `${apiUrl}/${orgName}/${appName}/chatrooms/${roomId}/share_files`,
			type: 'GET',
			dataType: 'json',
			headers: {
				'Authorization': 'Bearer ' + this.token,
				'Content-Type': 'application/json'
			}
		};
		opts.success = options.success || _utils.emptyfn;
		opts.error = options.error || _utils.emptyfn;
		_utils.ajax(opts);
	},

}

export default connectionProto;

