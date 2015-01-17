/**
 * example-stepup
 * http://npmawesome.com/posts/stepup
 *
 * Copyright(c) 2015 npmawesome.com
 *
 * MIT Licensed
 */

var stepup = require('stepup');
var fs = require('fs');

stepup([
  function ($) {
    fs.readdir(__dirname, $.first());
  },
  function ($, files) {
    // pass down the list of files first
    $.first()(null, files);

    // create a group of `first` type of callbacks
    var stats = $.group('first');

    for (var i = 0; i < files.length; i++) {
      fs.stat(__dirname + '/' + files[i], stats());
    }
  },
  function ($, files, stats) {
    var content = $.group('first');

    for (var i = 0; i < files.length; i++) {
      if (!stats[i].isDirectory()) {
        fs.readFile(__dirname + '/' + files[i], content());
      }
    }
  },
  function ($, content) {
    return content.map(function (buf) {
      return buf.toString();
    });
  }
], function (err, content) {
  console.log(content.join('\n-----\n'));
});