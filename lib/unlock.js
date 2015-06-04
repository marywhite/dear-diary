var inquirer = require('inquirer');
var chalk = require ('chalk');
var config = require('./config');
var edit_diary = require('./cli');
var date = require('./convertdate');
var encryption = require('./encryption');
var colors = require ('./writecolor');
var write = colors.current_theme();

var submission = [{
    type: "input",
    name: "submission",
    message: "write your thoughts below..\n",
    validate: function(str){
        var entry = str.trim();
        return entry !== '';
    }
}];

var select = [{
    type: "input",
    name: "submission",
    message: "what would you like to see?...press enter to view all \n"
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
        var new_entry = encryption.encrypt(answer.submission);
        edit_diary.new_entry(new_entry);
        write.log('thanks for sharing ' + config.name());
    });
};

var read = function(){
    inquirer.prompt(select, function(answer) {
        var submission = date.convert(answer.submission);
        switch (submission[1]) {
            case 'last':
                edit_diary.find_last(edit_diary.show_last);
                return;
            case 'chunk' :
                edit_diary.find_chunk(submission[0]);
                return;
            case 'date' :
                edit_diary.find_entry(submission[0]);
                return;
            default :
                write.log('no submissions for that day..')
        }
        write.emphasis('please enter a valid date format...');
    });
};

var burn = function(){
    inquirer.prompt(confirm, function(answer){
        if ( answer.confirm_delete) {
            write.log('as if it never existed');
            edit_diary.find_last(edit_diary.delete_last);
        }
    })
};

var validation = function(action1, action2){
    if (! config.checkconfig()) {
        inquirer.prompt(check, function ( answer ) {
            if (config.compare("password", answer.login)){
                write.log('~unlocked~');
                action1();
            } else {
                unauthorized();
            }
        })
    } else {
        action2();
    }
};

var unauthorized = function(){
    write.log(config.name() +", is that you??...Enter " + chalk.inverse("<<dear-diary change password>>") + " if you need to reset your password. ")
};

var notifysetup = function(){
    write.log("hmmm...you need to configure your diary first. Enter" + chalk.inverse("<<dear-diary setup>>") + " to get started");
};

module.exports.validation = validation;
module.exports.unauthorized = unauthorized;
module.exports.notifysetup = notifysetup;
module.exports.submit = submit;
module.exports.read = read;
module.exports.burn = burn;