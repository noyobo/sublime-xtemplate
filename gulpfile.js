'use strict';
var gulp = require('gulp');
var lintspaces = require("gulp-lintspaces");
var map = require('map-stream');
var gutil = require('gulp-util');
var path = require('path');
var _ = require('lodash');
var copy = require('gulp-copy')


var paths = {
    snipptes: '**/*.sublime-snippet',
    language: '**/*.tmLanguage'
}

var tabArr = [];
// check tabTrigger
var checkDuplicate = function(file, cb) {
    var regRex = /tabTrigger\>([\+\w]+)</m;
    var baseName = path.basename(file.path)
    var tabName = String(file.contents).match(regRex)[1];
    if (!tabName) {
        gutil.log(gutil.colors.red("tabTrigger not found: ", baseName));
    };
    if (_.indexOf(tabArr, tabName) !== -1) {
        gutil.log(gutil.colors.red("tabTrigger[" + tabName + "] is Duplicate: ", baseName));
    };
    tabArr.push(tabName)
    cb(null, file)
}

gulp.task('lint', function() {
    return gulp
        .src(paths.snipptes)
        .pipe(lintspaces({
            editorconfig: '.editorconfig'
        }))
        .pipe(lintspaces.reporter());
});

gulp.task('check', function() {
    return gulp
        .src(paths.snipptes)
        .pipe(map(checkDuplicate))
});

gulp.task('dev', function() {
    return gulp
        .src([paths.snipptes, paths.language])
        .pipe(copy('C:/Users/Administrator/AppData/Roaming/Sublime Text 3/Packages/User'))
})

gulp.task('default', ['lint', 'check']);
