'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var deps = [
  [helpers.createDummyGenerator(), 'karma:app']
];


describe('sails-coffee:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        name: "hello-world",
        ready: true
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'bower.json',
      'package.json'
      // '.bowerrc'
      // '.editorconfig',
      // '.jshintrc'
    ]);
  });
});

// describe('not build app', function () {
//   before(function (done) {
//     helpers.run(path.join(__dirname, '../app'))
//       .inDir(path.join(os.tmpdir(), './temp-test'))
//       .withOptions({ 'skip-install': true })
//       .withPrompt({
//         name: "hello-world",
//         ready: false
//       })
//       .withGenerators(deps)
//       .on('end', done);
//   });

//   it('files should not existed', function () {
//     assert.noFile([
//       'bower.json',
//       'package.json'
//     ]);
//     assert.file([
//       'bower.json',
//       'package.json'
//       // '.bowerrc'
//       // '.editorconfig',
//       // '.jshintrc'
//     ]);
//   });
// });