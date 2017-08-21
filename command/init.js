'use strict'
const co = require('co')
const prompt = require('co-prompt')

const generateOther = require('../lib/generate-other')  

const download = require('download-git-repo')
const ora = require('ora')
const rm = require('rimraf').sync
const path = require('path')
const home = require('user-home')
const exists = require('fs').existsSync
const generate = require('../lib/generate')
const logger = require('../lib/logger')



module.exports = () => {
    co(function* () {
        // 处理用户输入
        let tplName = yield prompt('Template name: ')

        switch(tplName) {
            case 'vue':
                
                let template = 'webpack'
                let hasSlash = false
                let rawName = '';

                let inPlace = !rawName || rawName === '.'
                let to = path.resolve(rawName || '.')
               

                let tmp = path.join(home, '.vue-templates', template.replace(/\//g, '-'))

                run(template, inPlace, tmp, rawName, to);
           

                break;

            default: //<-- simple 等等的模版
                let projectName = yield prompt('Project name: ')
                generateOther.runOther(tplName, projectName);
        }

        
    })
}



/**
 * Check, download and generate the project.
 */

function run(template, inPlace, tmp, name, to) {

    let officialTemplate = 'vuejs-templates/' + template;
    downloadAndGenerate(officialTemplate, tmp, name, to)
        
}


/**
 * Download a generate from a template repo.
 *
 * @param {String} template
 */

function downloadAndGenerate(template, tmp, name, to) {
    var spinner = ora('downloading template')
    spinner.start()
    // Remove if local template exists
    if (exists(tmp)) rm(tmp)
    download(template, tmp, { clone: false }, function (err) {
        spinner.stop()
        if (err) logger.fatal('Failed to download repo ' + template + ': ' + err.message.trim())
        
        generate(name, tmp, to, function (err) {
            if (err) logger.fatal(err)
            console.log()
            logger.success('Generated "%s".', name)
        })
    })
}