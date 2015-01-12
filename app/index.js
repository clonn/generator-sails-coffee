'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs-extra');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.fsExtra = require('fs-extra');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the stunning' + chalk.red('SailsNanzi') + ' generator!\n' +
      'It is base on Sails.js, collection coffeescript, jade, compass'
    ));

    this.prompt([{
      type    : 'input',
      name    : 'name',
      message : 'What is your project name (default is current folder name)?',
      default : this.appname // Default to current folder name
    },
    {
      type    : 'confirm',
      name    : 'ready',
      message : 'Are you ready to create project?',
      default : true
    }], function (answers) {
      this.name = answers.name;
      this.ready = answers.ready;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var self = this;
      self.fsExtra.copy(
        self.templatePath('application'),
        self.destinationPath('.'),
        function(err) {
          if (err) {
            return console.error(err) && process.exit(0);
          }

          console.log("success!");
      });

      self.fs.copyTpl(
        self.templatePath('package.json'),
        self.destinationPath('package.json'),
        { name: self.name }
      );

      self.fs.copyTpl(
        self.templatePath('bower.json'),
        self.destinationPath('bower.json'),
        { name: self.name }
      );

      self.fs.copyTpl(
        self.templatePath('README.md'),
        self.destinationPath('README.md'),
        { name: self.name }
      );

      // this.fs.copy(
      //   this.templatePath('_package.json'),
      //   this.destinationPath('package.json')
      // );
      // this.fs.copy(
      //   this.templatePath('_bower.json'),
      //   this.destinationPath('bower.json')
      // );
    }

    // projectfiles: function () {
    //   this.fs.copy(
    //     this.templatePath('editorconfig'),
    //     this.destinationPath('.editorconfig')
    //   );
    //   this.fs.copy(
    //     this.templatePath('jshintrc'),
    //     this.destinationPath('.jshintrc')
    //   );
    // }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
