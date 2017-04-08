function MessageService() {
    this.messages = {};
    this.id = 0;
}

MessageService.prototype.getAll = function() {
    return Promise.resolve(Object.keys(this.messages).map(key => this.messages[key]));
};

MessageService.prototype.getOne = function(id) {
    return Promise.resolve(this.messages[id]);
};

MessageService.prototype.add = function(message) {
    for (var key in this.messages) {
        if (this.messages[key] === message) {
            return Promise.resolve();
        }
    }

    var id = '' + (this.id++);
    var obj = {
        id : id,
        value : message,
        palindrome : false
    };
    this.messages[id] = obj;
    return Promise.resolve(obj);
};

MessageService.prototype.delete = function(id) {
    if (!this.messages[id]) {
        return Promise.resolve(false);
    }
    delete this.messages[id];
    return Promise.resolve(true);
};

MessageService.create = function() {
    return new MessageService();
};

module.exports = MessageService;