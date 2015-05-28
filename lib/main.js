var program = require('commander');
var random_num = require('./cli');
var inquirer = require('inquirer');
var setup = require('./setup');


program
    .version(require('../package.json').version)
    .parse(process.argv);

program
    .command('hi')
    .action(function(){
        setup();
    });



program
    .command('setup')
    .action(function() {
        inquirer.prompt({
            type: "input",
            name: "name",
            message: "what is your name?",
        }, function (answers) {
            inquirer.prompt({
                type: "confirm",
                name: "name_confirm",
                message: "you've entered your name as  " + answers.name + ". is that correct?"
            });
        });

        inquirer.prompt({
            type: "password",
            name: "password",
            message: "please enter a password"
        }, function (answers) {
            inquirer.prompt({
                type: "confirm",
                name: "name_confirm",
                message: "you've entered your name as  " + answers.password + ". is that correct?"
            });
        });
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
