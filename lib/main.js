var program = require('commander');
var random_num = require('./cli');
var inquirer = require('inquirer');
var setup = require('./setup');


program
    .version(require('../package.json').version)
    .parse(process.argv);

program
    .command('setup')
    .action(function(){
        setup();
    });

program
    .command('create')
    .action(function(){
        random_num.random_num()
    });

program
    .command('display')
    .action(function(){
        random_num.other_thing()
    });

program.parse(process.argv);
