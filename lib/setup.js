var inquirer = require('../utils/Inquirer.js');
var chalk = require('chalk');
var config = require('./config');
var changepassword = require('./changepassword');

var colors = require ('./writecolor');
var write = colors.current_theme();


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

var color = function(){
    inquirer.prompt(color_prompt, function(answers){
        if ( !answers.confirm_color ){
            color();
        } else {
            var scheme = chalk.stripColor(answers.scheme);
            config.edit("scheme", scheme);
            write = colors.current_theme();
            write.log('settings saved');
        }
    })
};


function email(){
    inquirer.prompt({
        type: "input",
        name: "email",
        message: "what is your email address?",
        validate: function (str) {
            return str !== '';
        }
    }, function ( answers ) {
        var email_address = answers.email.toLowerCase();
        config.edit("email", email_address);
        inquirer.prompt(    {
            type: "confirm",
            name: "confirmemail",
            message: "you've entered as your email address as " + answers.email + "... is that correct?",
            default: false
        }, function(answers){
            if (answers.confirmemail) {
                write.log("okay");
                changepassword(color);
            } else {
                email();
            }
        });
    });
}


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
                write.log("okay. i'll call you " + chalk.bold((config.name())) + " from now on.");
                email();
            } else {
                ask();
            }
        });
    });
}


module.exports.ask = ask;