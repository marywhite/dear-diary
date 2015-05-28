var inquirer = require('inquirer');

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
            console.log(response.name);
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
            console.log(response.password);
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
            console.log('i promise to keep your secrets are safe')
        }
    });
};


module.exports = ask;