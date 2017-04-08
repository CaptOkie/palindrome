module.exports.index = function() {
    return '/';
};

module.exports.messages = function(id) {
    var url = '/msgs/';
    return (id && (url + id + '/')) || url;
};
