var config = require('./config')
    , inquirer = require('../util/Inquirer.js')
    , mail_token = require('./sendmail')
    , changepassword = require('./changepassword')
    , colors = require ('./writecolor')
    , write = colors.current_theme();

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

var reset_token = function() {
    config.edit("token", "");
};

var token_verify = function(){
    inquirer.prompt(token_input, function(answer){
        if (config.compare("token", answer.token)){
            changepassword(reset_token);
        } else {
            write.log("sorry...tokens do not match the one i have on file...");
            reset_token();
        }
    })
};

var forgotpw = function(){
    inquirer.prompt(prompt, function(answer){
        var email = answer.email.toLowerCase().trim();
        if (email == config.email()){
            require('crypto').randomBytes(48, function(ex, buf) {
                var token = buf.toString('base64').replace(/\//g,'_').replace(/\+/g,'-');
                config.changehashed("token", token);
                mail_token(email, token);
                token_verify()
            });
        } else {
            write.log('hmm....e-mail address does not match...')
        }
    })
};


module.exports = forgotpw;
