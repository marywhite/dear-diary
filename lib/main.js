var program = require('commander')
    , setup = require('./setup')
    , unlock = require('./unlock')
    , forgotpw = require('./forgotpw')
    , default_action = require('./default');

//how many diary entries

program
    .version(require('../package.json').version);

program
    .command('setup')
    .description('follow the prompts...make your diary yours...')
    .action(function(){
        unlock.validation(setup.ask, setup.ask);
    });


program
    .command('write')
    .description('write a diary entry...')
    .action(function(){
        unlock.validation(unlock.submit, unlock.notifysetup);
    });

program
    .command('read')
    .description('read your diary...follow the prompts and enter a valid date option. \n         examples include last, today, yesterday, thursday, february 14th 2011, 7/4/2013, this week, this month this year\n         ...hit enter to view all')
    .action(function(){
        unlock.validation(unlock.read, unlock.notifysetup);
    });

program
    .command('password')
    .description('allows you to change your password through e-mail verification...')
    .action(function(){
        forgotpw();
    });

program
    .command('delete last')
    .description('did you make a mistake??? delete last to remove your most recent diary entry')
    .action(function(){
        unlock.validation(unlock.burn, unlock.notifysetup);
    });
//
program
    .command('*')
    .description('say what you will...offers greeting and suggests future action')
    .action(function(){
        default_action();
    });


program.parse(process.argv);

if (!process.argv.slice(2).length) {
    default_action();
}