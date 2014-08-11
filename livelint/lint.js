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
  this.recess().then(function(that){
    return that;
  }, function(error){
    throw error;
  });
}

LINT.prototype = {
  constructor: LINT,
  recess: function() {
    var that = this;
    var promise = new RSVP.Promise(function(resolve, reject){
      recess(that.path, that.options, function(err, obj){
        if(err) reject(err);
        for(var i=0; i<obj.length; i++){
          var totalErrors = obj[i].definitions.length;
          for(var z=0; z<obj[i].definitions.length; z++){
            if(obj[i].definitions[z] !== undefined) {
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
        resolve(that);
      });
    });
    return promise;
  }
};

module.exports = LINT;
