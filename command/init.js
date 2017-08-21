'use strict'
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')

const runOther = require('../lib/run-other')
const runVue = require('../lib/run-vue')  

module.exports = () => {
    co(function* () {
        // 处理用户输入
        let tplName = yield prompt(chalk.green('? ') + chalk.bold('Template name: '))
        let projectName = yield prompt(chalk.green('? ') + chalk.bold('Project name: '))

        switch(tplName) {
            case 'vue':
                runVue.run('webpack', projectName);
                break;
            
            case 'vue-pwa':
                runVue.run('pwa', projectName);
                break;

            default: //<-- simple 等等的模版
                runOther.run(tplName, projectName);
        }

        
    })
}



