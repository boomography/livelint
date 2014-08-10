var recess  = require('recess');
var unorm   = require('unorm');
var path    = require('path');
var fs      = require('fs');
var _       = require('underscore');
var RSVP    = require('rsvp');

function LINT (path, options) {
  this.path = path;
  this.errors = [];
  this.options = options;
  this.recess();
}

LINT.prototype = {
  constructor: LINT,
  recess: function() {
    var that = this;
    recess(this.path, { compile: false}, function (err, obj) {
      if (err) throw err;
      for (var i=0; i<obj.length; i++) {
        for (var z=0; i<obj[i].definitions.length; z++) {
          if (obj[i].definitions[z] !== undefined) {
            obj[i].definitions[z].errors.forEach(function(error){
              var errObj;
              if(error.extract !== undefined) {
                errObj = {
                  message: unorm.nfd(error.message),
                  error: unorm.nfd(error.extract)
                };
              } else {
                errObj = {
                  message: unorm.nfd(error.message)
                };
              }
              that.errors.push(errObj);
            });
          }
        }
      }
    });
  },
  getErrors: function() {
    return this.errors;
  }
};

module.exports = LINT;
