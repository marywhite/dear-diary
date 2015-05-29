var program = require('commander');
var random_num = require('./cli');
var setup = require('./setup');


program
    .version(require('../package.json').version)
    .parse(process.argv);

program
    .command('setup')
    .action(function(){
        setup.ask();
    });

program
    .command('create')
    .action(function(){
        setup.validation(random_num.random_num);
    });

program
    .command('display')
    .action(function(){
        setup.validation(random_num.other_thing);
    });

program
    .command('*')
    .action(function(){
        console.log('hi, welcome.')
    });

program.parse(process.argv);
