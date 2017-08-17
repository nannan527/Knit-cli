'use strict'
const config = require('../templates')
const chalk = require('chalk')

module.exports = () => {
    console.log('\n')
    console.log('  Please select a development template: \n')
    
    for(let item in config.tpl) {
        console.log(
            '  ' + chalk.yellow('★') +
            '  ' + chalk.blue(item) +
            ' -- ' + config.tpl[item]['describe']
        )
    }
    console.log('\n')
    
    process.exit()
}