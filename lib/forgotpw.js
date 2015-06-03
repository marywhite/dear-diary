var config = require('./config');
var inquirer  =require('inquirer');
var mail_token = require('./sendmail');

var token;

var prompt = [
    {
        type: "input",
        name: "email",
        message: "please enter your email address to retrieve password",
        validate: function(str){
            return str !== '';
        }
}];


var token_input = [
    {
        type: "input",
        name: "token",
        message: "enter the token from your email to reset password...",
        validate: function(str){
            return str !== '';
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
        message: "re-enter your SECRET password"
    }
];

var pw = function(){
    inquirer.prompt( password, function( answers ) {
        if (answers.password != answers.password_confirm){
            write.log("passwords do not match.. please try again.");
            pw();
        } else {
            config.changepass(answers.password);
            config.edit("token", "");
            console.log('i promise to keep your secrets safe');
        }
    });
};

var token_verify = function(){
    inquirer.prompt(token_input, function(answer){
        if (config.checkconfig(answer.token)){
            pw();
        } else {
            console.log("sorry...tokens do not match...")
        }
    })
};

var forgotpw = function(){
    inquirer.prompt(prompt, function(answer){
        var email = answer.email.toLowerCase().trim();
        if (email == config.email()){
            require('crypto').randomBytes(48, function(ex, buf) {
                token = buf.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
                config.changetoken(token);
                mail_token(email, token);
                token_verify()
            });
        } else {
            console.log('e-mail address does not match...')
        }
    })
};


module.exports = forgotpw;
