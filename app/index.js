var Generator = require('yeoman-generator');
var chalk = require('chalk');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    this.argument('appname', { type: String, required: false });
  }

  // Async Await
  async prompting() {
    this.answers = await this.prompt(
      [
        {
          type: 'input',
          name: 'name',
          message: 'Nombre del proyecto:',
          default: this.appname, // appname return the default folder name to project
          store: true,
        },
        {
          type: 'list',
          name: 'templateType',
          message: 'Selleciona la semilla que deseas utilizar:',
          choices: ['HTML5, CSS3 y Javascript V01', 'Node API builder', 'FullStack Application']
        },
        {
          type: 'list',
          name: 'sassType',
          message: 'Selleciona la arquitectura de SASS que deseas utilizar:',
          choices: ['ITCSS', 'SMACSS']
        }
      ]
    );
  }

  // install() {
  //   this.npmInstall();
  // }

  writing() {
    if (this.answers.templateType === 'HTML5, CSS3 y Javascript V01') {
      this._writingHtmlCssJsV01Template();
    } else if (this.answers.templateType === 'Node API builder') {
      this._writingApiTemplate()
    }
    else {
      this._writingReactTemplate()
      this._writingApiTemplate()
    }
  }

  // Template Type
  _writingReactTemplate() {
    this.fs.copy(
      this.templatePath('frontend'),
      this.destinationPath('frontend')
    )
    this.fs.copyTpl(
      this.templatePath('frontend/public/index.html'),
      this.destinationPath('frontend/public/index.html'),
      { title: this.answers.name } // Embedded JavaScript templating.
    )
  }

  _writingApiTemplate() {
    this.fs.copy(
      this.templatePath('api'),
      this.destinationPath(this.answers.name +'-api')
    )
  }

  _writingHtmlCssJsV01Template() {
    this.fs.copy(
      this.templatePath('html-css-js-v01'),
      this.destinationPath(this.answers.name)
    )

    // if (this.answers.sassType === 'ITCSS') {
    //   this._writingArqITCSSTemplate() 
    // } else {
    //   this._writingArqSMACSSTemplate() 
    // }
  }

  // Arquitecture Type
  _writingArqITCSSTemplate() {
    this.fs.copyTpl(
      this.templatePath('html-css-js-v01/scss/scss-itcss'),
      this.destinationPath(this.answers.name + '/src')
    )

    this.fs.delete(this.answers.name + '/scss');
  }

  _writingArqSMACSSTemplate() {
    this.fs.copyTpl(
      this.templatePath('html-css-js-v01/scss/scss-smacss/**/*'),
      this.destinationPath(this.answers.name + '/src')
    )
    
    this.fs.delete(this.answers.name + '/scss');
  }

  end() {
    this.log(chalk.green('------------'))
    this.log(chalk.magenta('***---***'))
    this.log(chalk.blue('Jobs is Done!'))
    this.log(chalk.green('------------'))
    this.log(chalk.magenta('***---***'))
  }
};