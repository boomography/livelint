var recess = require('recess');
var unorm = require('unorm');
var path = require('path');
var fs = require('fs');
var _ = require('underscore');

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
              console.log(unorm.nfd(error.message));
              if(error.extract !== undefined) console.log(unorm.nfd(error.extract));
              console.log('');
            });
          }
        }
      }
    });

  }
};

module.exports = LINT;
