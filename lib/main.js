var program = require('commander');
var random_num = require('./cli');
var setup = require('./setup');
var unlock = require('./unlock');
var date = require('./convertdate');

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
        unlock.validation(unlock.submit);
    });

program
    .command('display')
    .action(function(){
        unlock.validation(unlock.read)
    });

program
    .command('*')
    .action(function(){
        console.log('hi, welcome.')
    });

program.parse(process.argv);
