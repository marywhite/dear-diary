var inquirer = require('inquirer');
var config = require('./config');

var check =  [{
    type: "password",
    name: "login",
    message: "enter your password to continue",
    validate: function (str) {
        var pass = str.match(config.password());
        if (pass){
            return true;
        } else {
            return "sorry bout it"
        }
    }
}];

var questions = [
    {
        type: "input",
        name: "name",
        message: "what is your name?"
    },
    {
        type: "confirm",
        name: "askAgain",
        message: "you've entered as your name as is that correct?",
        default: false,
        when: function (response) {
            return response.name;
        }
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
        message: "re-enter your SECRET password",
        when: function (response) {
            return response.password;
        }
    }
];


var ask = function () {
    inquirer.prompt( questions, function( answers ) {
        if ( !answers.askAgain ) {
            ask();
        } else {
            console.log("okay. i'll call you " + answers.name + " from now on.");
            config.edit('name', answers.name);
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
            console.log('i promise to keep your secrets are safe');
            config.edit('password', answers.password);
        }
    });
};


var validation = function(){
    inquirer.prompt(check, function (){
        console.log('checkin');
    })
};

module.exports.ask = ask;
module.exports.validation = validation;