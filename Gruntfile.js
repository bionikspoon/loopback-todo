'use strict';

var buildClientBundle = require('./client/lb-client/build');
var fs = require('fs');
var path = require('path');

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  require('time-grunt')(grunt);

  var appConfig = {
    app: require('./bower.json').appPath || './client/app',
    dist: 'client/dist',
  };

  grunt.initConfig({
    yeoman: appConfig,
    watch: {
      bower: {}
    }
  });
};
