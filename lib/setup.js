var inquirer = require('inquirer');
var config = require('./config');


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


var ask = function () {
    inquirer.prompt( questions, function( answers ) {
        if ( !answers.askAgain ) {
            ask();
            config.edit('name', answers.name);
        } else {
            console.log("okay. i'll call you " + answers.name + " from now on.");
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
        }
    });
};


module.exports.ask = ask;

