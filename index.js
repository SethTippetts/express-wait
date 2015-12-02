'use strict';

var Promise = require('bluebird');
var once = require('./lib/once');

var initCb;
var init = Promise.fromCallback(function(cb) { initCb = once(cb); });

module.exports = function (req, res, next) {
  init.then(function() { next(); }).catch(next);
  if (req.app.get('ready')) initCb();
};
