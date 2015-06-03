var inquirer = require('inquirer');
var colors = require ('./writecolor');
var config = require('./config');
var chalk = require('chalk');

var current_scheme = config.scheme();
var write = colors(current_scheme);


var password = [
    {
        type: "password",
        name: "password",
        message: "please enter a secret password",
        validate: function(str){
            return str !== '';
        }
    },
    {
        type: "password",
        name: "password_confirm",
        message: "re-enter your SECRET password"
    }
];


var color_prompt = [
    {
        type: "list",
        name: "scheme",
        message: "what color would you like?",
        choices: [chalk.white.bgBlack("witches cauldron"),
            chalk.green.bgBlack("other worldly"),
            chalk.white.bgRed("classic beauty"),
            chalk.white.bgBlue("summer breeze"),
            chalk.blue.bgWhite("gentle touch"),
            chalk.magenta.bgWhite("precious stones")]
    },
    {
        type: "confirm",
        name: "confirm_color",
        message: "are these settings okay?",
        default: false
    }
];




var pw = function(){
    inquirer.prompt( password, function( answers ) {
        if (answers.password != answers.password_confirm){
            write.log("passwords do not match.. please try again.");
            pw();
        } else {
            config.changepass(answers.password);
            write.log('i promise to keep your secrets safe');
            color();
        }
    });
};

var color = function(){
    inquirer.prompt(color_prompt, function(answers){
        if ( !answers.confirm_color ){
            color();
        } else {
            var scheme = chalk.stripColor(answers.scheme);
            config.edit("scheme", scheme);
            current_scheme = config.scheme();
            write = colors(current_scheme);
            write.log('settings saved');
        }
    })
};

function ask(){
    inquirer.prompt({
        type: "input",
        name: "name",
        message: "what is your name?",
        validate: function (str) {
            return str !== '';
        }
    }, function ( answers ) {
        config.edit("name", answers.name);
        inquirer.prompt(    {
            type: "confirm",
            name: "askAgain",
            message: "you've entered as your name as " + answers.name + "... is that correct?",
            default: false
        }, function(answers){
            if (answers.askAgain) {
                write.log("okay. i'll call you " + config.name() + " from now on.");
                email();
            } else {
                ask();
            }
        });
    });
}

function email(){
    inquirer.prompt({
        type: "input",
        name: "email",
        message: "what is your email address?",
        validate: function (str) {
            return str !== '';
        }
    }, function ( answers ) {
        config.edit("email", answers.email);
        inquirer.prompt(    {
            type: "confirm",
            name: "confirmemail",
            message: "you've entered as your email address as " + answers.email + "... is that correct?",
            default: false
        }, function(answers){
            if (answers.confirmemail) {
                write.log("okay");
                pw();
            } else {
                email();
            }
        });
    });
}



module.exports.ask = ask;