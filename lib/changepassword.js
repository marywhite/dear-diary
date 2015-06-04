var inquirer = require('inquirer');
var config = require ('./config');
var colors = require ('./writecolor');
var write = colors.current_theme();

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

var changepassword = function(func){
    inquirer.prompt( password, function( answers ) {
        if (answers.password != answers.password_confirm){
            write.log("passwords do not match.. please try again.");
            changepassword(func);
        } else {
            config.changehashed("password", answers.password);
            write.invert('<3 i promise to keep your secrets safe <3');
            func();
        }
    });
};

module.exports = changepassword;