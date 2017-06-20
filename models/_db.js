'use strict';

var Sequelize = require('sequelize');

exports.sequelize = function () {
  return new Sequelize('mysql://root:wjzl2008@localhost:3306/test')
}