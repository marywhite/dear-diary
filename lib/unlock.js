var inquirer = require('inquirer');
var config = require('./config');
var random_num = require('./cli');
var date = require('./convertdate');


var submission = [{
    type: "input",
    name: "submission",
    message: "enter your thoughts below..",
    validate: function(str){
        return str !== '';
    }
}];

var select = [{
    type: "input",
    name: "submission",
    message: "what would you like to see?...press enter to view all"
}];


var check =  [{
    type: "password",
    name: "login",
    message: "enter your password to continue",
    validate: function(str){
        return str !== '';
    }
}];

var confirm =  [{
    type: "confirm",
    name: "confirm_delete",
    message: "are you sure you'd like to delete your last entry?",
    default: false
}];


var submit = function(){
    inquirer.prompt(submission, function(answer){
        console.log('thanks for sharing...');
        random_num.random_num(answer.submission);
    });
};

var read = function(){
    inquirer.prompt(select, function(answer) {
        var submission = date.convert(answer.submission);
        switch (submission[1]) {
            case 'last':
                random_num.find_last(random_num.show_last);
                return;
            case 'chunk' :
                random_num.other_thing(submission[0]);
                return;
            case 'date' :
                random_num.find_entry(submission[0]);
                return;
            default :
                console.log('no submissions for that day..')
        }
        console.log('please enter a valid date format...');
    });
};

var burn = function(){
    inquirer.prompt(confirm, function(answer){
        if ( answer.confirm_delete) {
            console.log('okay..i can erase that for you');
            random_num.find_last(random_num.delete_last);
        }
    })
};

var validation = function(action){
    inquirer.prompt(check, function ( answers ){
        if (answers.login != config.password()){
            console.log('could not verify identity');
        } else {
            console.log('unlocked');
            action();
        }
    });
};

module.exports.validation = validation;
module.exports.submit = submit;
module.exports.read = read;
module.exports.burn = burn;