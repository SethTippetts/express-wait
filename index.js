'use strict';

var Promise = require('bluebird');
var once = require('./lib/once');


module.exports = function (options) {

  var initCb;
  var init = Promise.fromCallback(function(cb) { initCb = once(cb); });
  var readyKey = options.key || 'ready';

  return function (req, res, next) {
    init.then(function() { next(); }).catch(next);
    if (req.app.get(readyKey)) initCb();
  }
};
