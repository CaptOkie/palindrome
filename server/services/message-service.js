function duplicate() {
    var err = new Error();
    err.duplicate = true;
    return Promise.reject(err);
}

function MessageService(db) {
    this.messages = {};
    this.id = 0;
}

MessageService.isAPalindrome = function(str) {
    str = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    // Don't care about middle character when length is odd
    var num = Math.floor(str.length / 2);
    for (var i = 0; i < num; ++i) {
        var j = str.length - i - 1;
        if (str.charAt(i) !== str.charAt(j)) {
            return false;
        }
    }
    return true;
};

MessageService.prototype.getAll = function() {
    return Promise.resolve(Object.keys(this.messages).map(key => this.messages[key]));
};

MessageService.prototype.getOne = function(id) {
    return Promise.resolve(this.messages[id]);
};

MessageService.prototype.add = function(message) {
    for (var key in this.messages) {
        if (this.messages[key].value === message) {
            return duplicate();
        }
    }

    var id = '' + (this.id++);
    var item = {
        id : id,
        value : message,
        palindrome : MessageService.isAPalindrome(message)
    };
    this.messages[id] = item;
    return Promise.resolve(item);
};

MessageService.prototype.update = function(id, message) {
    for (var key in this.messages) {
        if (this.messages[key].value === message) {
            return duplicate();
        }
    }

    var item = this.messages[id];
    if (item) {
        item.value = message;
        item.palindrome = MessageService.isAPalindrome(message);
    }
    return Promise.resolve(item);
};

MessageService.prototype.delete = function(id) {
    if (!this.messages[id]) {
        return Promise.resolve(false);
    }
    delete this.messages[id];
    return Promise.resolve(true);
};

MessageService.create = function(db) {
    return new MessageService(db);
};

module.exports = MessageService;