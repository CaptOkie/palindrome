var express = require('express');
var Urls = require('../../common/urls');

function IndexCtrl() {
}

IndexCtrl.prototype.get = function(req, res, next) {
    res.render('index');
};

IndexCtrl.router = function() {
    var ctrl = new IndexCtrl();
    var index = Urls.index();
    
    var router = express.Router();
    router.get(index, ctrl.get.bind(ctrl));
    return router;
};

module.exports = IndexCtrl;
