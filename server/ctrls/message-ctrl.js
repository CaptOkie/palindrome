var express = require('express');
var Urls = require('../../common/urls');
var Types = require('../../common/types');

function MessageCtrl(messageService) {
    this.messageService = messageService;
}

MessageCtrl.prototype.getAll = function(req, res, next) {
    this.messageService.getAll()
        .then(messages => {
            res.json(messages);
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
            var err = new Error('Message ' + id + ' does not exist');
            err.status = 404;
            next(err);
        })
        .catch(next);
};

MessageCtrl.prototype.post = function(req, res, next) {
    var message = req.body.msg;
    if (!Types.isString(message) || !message.length) {
        var err = new Error('Not a string');
        err.status = 400;
        return next(err);
    }
    
    this.messageService.add(message)
        .then(message => {
            if (message) {
                return res.json(message);
            }
            var err = new Error('Message exists');
            err.status = 409;
            next(err);
        })
        .catch(next);
};

MessageCtrl.prototype.delete = function(req, res, next) {
    this.messageService.delete(req.params.id)
        .then(success => {
            if (success) {
                return res.status(204),end();
            }
            var err = new Error('Message ' + id + ' does not exist');
            err.status = 404;
            next(err);
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
    router.post(messages, ctrl.post.bind(ctrl));
    router.delete(message, ctrl.delete.bind(ctrl));
    return router;
};

module.exports = MessageCtrl;
