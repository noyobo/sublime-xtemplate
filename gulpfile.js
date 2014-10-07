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
var osplatform = require('os').platform()
var gulpif = require('gulp-if');


var isMac = osplatform === 'darwin';
var docName = 'SNIPPETS.md';
var paths = {
  snippets: 'Snippets/**/*.*',
  language: 'Syntaxes/**/*.*'
}

var snippetsHeader = ['trigger', 'description', 'export']
var snippetsObj = {};
// check tabTrigger
gulp.task('lint', function() {
  return gulp
    .src(paths.snippets)
    .pipe(lintspaces({
      editorconfig: '.editorconfig'
    }))
    .pipe(lintspaces.reporter());
});

var buildDoc = function(file, cb) {
  var dirname = path.dirname(file.path).split(path.sep)
  var folderName = dirname[dirname.length - 1];
  if (typeof snippetsObj[folderName] === 'undefined') {
    snippetsObj[folderName] = []
  };
  var contentText = String(file.contents);
  var XMLObj = XMLMapping.tojson(contentText, {
    nested: false,
    longTag: true
  }).snippet;
  var tabName = XMLObj.tabTrigger.$text;
  var desc = XMLObj.description.$text || XMLObj.description.$cdata;
  var content = XMLObj.content.$cdata;
  content = content.replace(/[\n\t\r]/gm, '')
  while (/\$\{\d(?:\:?)([ \w\'\"\/\=\>\<\!\,\[\]]+)?\}/.test(content)) {
    content = content.replace(/\$\{\d(?:\:?)([ \w\'\"\/\=\>\<\!\,\[\]]+)?\}/g, '$1')
  }
  content = content.replace('$0', '')
  snippetsObj[folderName].push([tabName, '`' + desc + '`', '```' + content + '```']);
  cb(null, file)
}

gulp.task('doc', function(done) {
  return gulp
    .src(['Snippets/**/*.sublime-snippet'])
    .pipe(map(buildDoc))
    .on('end', function() {
      fs.writeFileSync(docName, markdown.title('Snippets List', 1))
      _.forIn(snippetsObj, function(val, key) {
        var markdownArray = snippetsObj[key];
        fs.appendFileSync(docName, markdown.title(key, 2))
        var tab = markdown.table(snippetsHeader, markdownArray.sort())
        fs.appendFileSync(docName, tab)
      })
      gutil.log(gutil.colors.green("文档构建成功!"))
    })
});

gulp.task('dev', function() {
  return gulp
    .src(['Syntaxes/**/*', 'Snippets/**/*', '*.tmTheme', '*.sublime-settings', 'Completions/**/*'])
    .pipe(
      gulpif(
        isMac,
        copy('../../../Library/Application Support/Sublime Text 3/Packages/User/Xtemplate'),
        copy('C:/Users/Administrator/AppData/Roaming/Sublime Text 3/Packages/User/Xtemplate')
      )
    )
})

gulp.task('watch', function() {
  gulp.watch(paths.language, ['language']);
});
gulp.task('default', ['lint']);
