var inquirer = require('inquirer');
var colors = require ('./writecolor');
var config = require('./config');
var chalk = require('chalk');



var questions = [
    {
        type: "input",
        name: "name",
        message: "what is your name?",
        validate: function(str){
            return str !== '';
        }
    },
    {
        type: "confirm",
        name: "askAgain",
        message: "you've entered as your name as " + config.name() + "... is that correct?",
        default: false
    }
];

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


var ask = function () {
    inquirer.prompt( questions, function( answers ) {
        if ( !answers.askAgain ) {
            ask();
            config.edit('name', answers.name);
        } else {
            colors.classic_beauty.log("okay. i'll call you " + answers.name + " from now on.");
            pw();
        }
    });
};

var pw = function(){
    inquirer.prompt( password, function( answers ) {
        if (answers.password != answers.password_confirm){
            console.log("passwords do not match.. please try again.");
            pw();
        } else {
            console.log('i promise to keep your secrets safe');
            config.edit('password', answers.password);
            color();
        }
    });
};

var color = function(){
    inquirer.prompt(color_prompt, function(answers){
        if ( !answers.confirm_color ){
            color();
        } else {
            console.log('settings saved');
        }
    })
};


module.exports.ask = ask;

