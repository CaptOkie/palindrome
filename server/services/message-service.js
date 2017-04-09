var ObjectId = require('mongodb').ObjectId;

function convert(doc) {
    doc.id = doc._id.toHexString();
    delete doc._id;
    return doc;
}

function catchDuplicate(err) {
    if (err.code === 11000) {
        err.duplicate = true;
    }
    return Promise.reject(err);
}

function MessageService(db) {
    this.messages = db.collection('messages');
    this.messages.createIndex({ value : 1 }, { unique : true });
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
    return this.messages.find().map(convert).toArray();
};

MessageService.prototype.getOne = function(id) {
    if (!ObjectId.isValid(id)) {
        return Promise.resolve();
    }
    return this.messages.findOne({ _id : new ObjectId(id) }).then(msg => {
        if (msg) {
            return convert(msg);
        }
        return false;
    });
};

MessageService.prototype.add = function(message) {

    var item = {
        value : message,
        palindrome : MessageService.isAPalindrome(message)
    };
    return this.messages.insertOne(item)
        .then(result => {
            item._id = result.insertedId;
            return convert(item);
        })
        .catch(catchDuplicate);
};

MessageService.prototype.update = function(id, message) {
    if (!ObjectId.isValid(id)) {
        return Promise.resolve();
    }

    var update = {
        value : message,
        palindrome : MessageService.isAPalindrome(message)
    };
    return this.messages.updateOne({ _id : new ObjectId(id) }, { $set : update })
        .then(result => {
            if (result.matchedCount) {
                update.id = id;
                return update;
            }
            return false;
        })
        .catch(catchDuplicate);
};

MessageService.prototype.delete = function(id) {
    if (!ObjectId.isValid(id)) {
        return Promise.resolve();
    }

    return this.messages.deleteOne({ _id : new ObjectId(id) })
        .then(result => result.deletedCount > 0);
};

MessageService.create = function(db) {
    return new MessageService(db);
};

module.exports = MessageService;