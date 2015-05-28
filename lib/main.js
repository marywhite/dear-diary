var program = require('commander');
var random_num = require('./cli');


program
    .version(require('../package.json').version)
    .parse(process.argv);

program
    .command('create')
    .action(random_num.random_num());

program
    .command('display')
    .action(random_num.other_thing());