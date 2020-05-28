var Message = function (type, id) {
    if (!this instanceof Message) {
        return new Message(type);
    }

    this._msg = {};
    if (typeof Message[type] === 'function') {
        Message[type].prototype.setGroup = this.setGroup;
        this._msg = new Message[type](id);
    }
    return this._msg;
}
Message.prototype.setGroup = function (group) {
    this.body.group = group;
}
Message.prototype._utils = {}
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
        ackContent: opt.ackContent
    };
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
        to: opt.to
    };
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
        msgConfig: opt.msgConfig
    };
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
        success: opt.success
    };
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
        success: opt.success
    };
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
        ext: opt.ext || {}
    };
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
    opt.file = opt.file || Message.prototype._utils.getFileUrl(opt.fileInputId);
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
        uploadComplete: opt.uploadComplete
    };

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
    opt.file = opt.file || Message.prototype._utils.getFileUrl(opt.fileInputId);

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
        body: opt.body
    };
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
    opt.file = opt.file || Message.prototype._utils.getFileUrl(opt.fileInputId);

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
        body: opt.body
    };
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
    opt.file = opt.file || Message.prototype._utils.getFileUrl(opt.fileInputId);

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
        body: opt.body
    };
    !opt.roomType && delete this.body.roomType;
};

var _msg = {
    // _msg: _Message,
    message: Message
}

export default Message;