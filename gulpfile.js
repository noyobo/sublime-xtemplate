'use strict';
var gulp = require('gulp');
var lintspaces = require("gulp-lintspaces");
var map = require('map-stream');
var gutil = require('gulp-util');
var path = require('path');
var _ = require('lodash');
var copy = require('gulp-copy')
var markdown = require('markdown-creator');
var XMLMapping = require('xml-mapping');
var fs = require('fs')
var Promise = require('promise');

var writeFile = Promise.denodeify(fs.writeFile)
var appendFile = Promise.denodeify(fs.appendFile);

var paths = {
    snippets: '**/*.sublime-snippet',
    language: '**/*.tmLanguage'
}

var tabArr = [];

var snippetsHeader = ['trigger', 'description', 'export']
var markdownArray = [];
// check tabTrigger
gulp.task('lint', function() {
    return gulp
        .src(paths.snippets)
        .pipe(lintspaces({
            editorconfig: '.editorconfig'
        }))
        .pipe(lintspaces.reporter());
});

gulp.task('check', function(done) {
    return gulp
        .src(paths.snippets)
        .pipe(map(checkDuplicate))
        .on('end', function() {
            writeFile('SNIPPETS.md', markdown.title('SNIPPETS', 1))
                .then(function() {
                    gutil.log('SNIPPETS.md Title it\' saved')
                    var tab = markdown.table(snippetsHeader, markdownArray.sort())
                    return appendFile('SNIPPETS.md', tab)
                })
                .then(function() {
                    gutil.log('SNIPPETS.md Table it\' saved')
                })
        })
});

gulp.task('dev', function() {
    return gulp
        .src([paths.snippets, paths.language])
        .pipe(copy('C:/Users/Administrator/AppData/Roaming/Sublime Text 3/Packages/User'))
})

gulp.task('language', function() {
    return gulp
        .src([paths.language])
        .pipe(copy('C:/Users/Administrator/AppData/Roaming/Sublime Text 3/Packages/User'))
})

gulp.task('watch', function() {
    gulp.watch(paths.language, ['language']);
});
gulp.task('default', ['lint', 'check']);


function checkDuplicate(file, cb) {
    var baseName = path.basename(file.path)
    var contentText = String(file.contents);
    var XMLObj = XMLMapping.tojson(contentText, {
        nested: false,
        longTag: true
    }).snippet;
    var tabName = XMLObj.tabTrigger.$text;
    var desc = XMLObj.description.$text;
    var content = XMLObj.content.$cdata;
    content = content.replace(/[\n\t]/g, '')
    while (/\$\{\d(?:\:?)([ \w\'\"\/\=\>\<\!\,\[\]]+)?\}/.test(content)) {
        content = content.replace(/\$\{\d(?:\:?)([ \w\'\"\/\=\>\<\!\,\[\]]+)?\}/g, '$1')
    }
    content = content.replace('$0', '')
    markdownArray.push([tabName, desc, '```' + content + '```'])
    if (!tabName) {
        gutil.log(gutil.colors.red("tabTrigger not found: ", baseName));
    };
    if (_.indexOf(tabArr, tabName) !== -1) {
        gutil.log(gutil.colors.red("tabTrigger[" + tabName + "] is Duplicate: ", baseName));
    };
    tabArr.push(tabName)
    cb(null, file)
}
