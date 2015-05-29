var program = require('commander');
var random_num = require('./cli');
var setup = require('./setup');
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
        setup.validation(random_num.random_num);
    });

program
    .command('display')
    .action(function(){
        var input = (process.argv.slice(3)).join(' ');
        setup.validation(random_num.other_thing, date.chunk(input));
    });

program
    .command('date')
    .action(function(){
        var input = (process.argv.slice(3)).join(' ');
        setup.validation(random_num.find_entry, date.convert(input).format('LL'));
    });

program
    .command('*')
    .action(function(){
        console.log('hi, welcome.')
    });

program.parse(process.argv);
