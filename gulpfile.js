#!/usr/bin/env node

var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var nodemon = require('nodemon');
var backendConfig = require('./webpack-config');

function optNameChain(){
    var opt = undefined;
    for (var i = 0; i < arguments.length; i++) { 
        var arg = arguments[i]
        if(typeof(arg) == "string"){
            var optIndex = process.argv.indexOf(arg)
            if(optIndex)
                opt = process.argv[optIndex+1]
        } else if(typeof(arg) == "number") {
            opt = process.argv[arg]
        }
        if(opt) return opt;
    }
}

function importantLog(str){
  gutil.log(gutil.colors.bgMagenta(" ") + " " + gutil.colors.bold(str))
}


var options = {
    server: optNameChain("--server", "-s", process.argv.length - 2),
    out: optNameChain("--out", "--build", "-o", "-b", process.argv.length - 1),
    es6Modules: optNameChain("--es6-modules"),
}
var config = backendConfig(options)

// tasks
function onBuild(done) {
  return function(err, stats) {
    if(err) {
      console.log('Error', err);
    }
    else {
      console.log(stats.toString());
    }

    if(done) {
      done();
    }
  }
}


gulp.task('backend-build', function(done) {
  webpack(config).run(onBuild(done));
});

gulp.task('backend-watch', function(done) {
  var firedDone = false;
  webpack(config).watch(100, function(err, stats) {
    if(!firedDone) {
      firedDone = true;
      onBuild(done)(err, stats)
    }
    nodemon.restart();
  });
});

gulp.task('build', ['backend-build']);
gulp.task('watch', ['backend-watch']);

gulp.task('default', ['backend-watch'], function() {
  importantLog("serving patchable backend from '" + gutil.colors.cyan(options.server) + "'")
  importantLog("writing output to '" + gutil.colors.cyan(options.out) + "'")
   
  nodemon({
    execMap: {
      js: 'node'
    },
    script: path.join(process.env.PWD, options.out),
    ignore: ['*'],
    watch: ['nothing/'],
    ext: 'noop'
  }).on('restart', function() {
    importantLog('Patched!');
  });
});

if (require.main === module) {
    gulp.start('default');
}
