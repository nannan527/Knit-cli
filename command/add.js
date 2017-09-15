'use strict'
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')
const fs = require('fs')

module.exports = () => {
    co(function* () {

        // 分步接收用户输入的参数
        let tplName = yield prompt('Template name: ')
        let gitUrl = yield prompt('Git https link: ')
        let branch = yield prompt('Branch: ')
        let describe = yield prompt('Describe: ')

        // 避免重复添加
        if (!config.tpl[tplName]) {
            config.tpl[tplName] = {}
            config.tpl[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '') // 过滤unicode字符
            config.tpl[tplName]['branch'] = branch
            config.tpl[tplName]['describe'] = describe 
        } else {
            console.log(chalk.red('\nTemplate has already existed!\n'))
            process.exit()
        }

        // 把模板信息写入templates.json 
        fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config), 'utf-8', (err) => {
            if (err) console.log(err)
            console.log(chalk.green('\nNew template added!\n'))
            console.log(chalk.grey('The last template list is: \n'))
            for(let item in config.tpl) {
                console.log(
                    '  ' + chalk.yellow('★') +
                    '  ' + chalk.blue(item) +
                    ' - ' + config.tpl[item]['describe']
                )
            }
            console.log('\n')
            process.exit()
        })
    })
}