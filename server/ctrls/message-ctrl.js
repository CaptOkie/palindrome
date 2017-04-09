var express = require('express');
var Urls = require('../../common/urls');
var Types = require('../../common/types');

function getMessage(value) {
    if (!Types.isString(value)) {
        return false;
    }
    value = value.trim();
    if (!value.length) {
        return false;
    }
    return value.replace(/\s+/g, ' ');
}

function notFound(id) {
    var err = new Error('Message ' + id + ' does not exist');
    err.status = 404;
    return err;
}

function illegalValue() {
    var err = new Error('Illegal value');
    err.status = 400;
    return err;
}

function duplicate() {
    var err = new Error('Duplicate message');
    err.status = 409;
    return err;
}

function MessageCtrl(messageService) {
    this.messageService = messageService;
}

MessageCtrl.prototype.getAll = function(req, res, next) {
    console.log(req.is('html'), req.is('text/html'), req.is('json'), req.is('application/json'))
    this.messageService.getAll()
        .then(messages => {
            res.json({ items : messages });
        })
        .catch(next);
};

MessageCtrl.prototype.getOne = function(req, res, next) {
    var id = req.params.id;
    this.messageService.getOne(id)
        .then(message => {
            if (message) {
                return res.json(message);
            }
            next(notFound(id));
        })
        .catch(next);
};

MessageCtrl.prototype.create = function(req, res, next) {
    var message = getMessage(req.body.value);
    if (!message) {
        return next(illegalValue());
    }

    this.messageService.add(message)
        .then(message => {
            return res.json(message);
        })
        .catch(err => {
            next(err.duplicate ? duplicate() : err);
        });
};

MessageCtrl.prototype.update = function(req, res, next) {
    var id = req.params.id;
    var message = getMessage(req.body.value);
    if (!message) {
        return next(illegalValue());
    }

    this.messageService.update(id, message)
        .then(message => {
            if (message) {
                return res.json(message);
            }
            next(notFound(id));
        })
        .catch(err => {
            next(err.duplicate ? duplicate() : err);
        });
};

MessageCtrl.prototype.delete = function(req, res, next) {
    var id = req.params.id;
    this.messageService.delete(id)
        .then(success => {
            if (success) {
                return res.status(204).end();
            }
            next(notFound(id));
        })
        .catch(next);
};

MessageCtrl.router = function(messageService) {
    var ctrl = new MessageCtrl(messageService);
    var messages = Urls.messages();
    var message = Urls.messages(':id');

    var router = express.Router();
    router.get(messages, ctrl.getAll.bind(ctrl));
    router.get(message, ctrl.getOne.bind(ctrl));
    router.post(messages, ctrl.create.bind(ctrl));
    router.post(message, ctrl.update.bind(ctrl));
    router.delete(message, ctrl.delete.bind(ctrl));
    return router;
};

module.exports = MessageCtrl;
