var nodemailer = require('nodemailer')
    , transporter = nodemailer.createTransport()
    , colors = require ('./writecolor')
    , write = colors.current_theme();

var mail_token = function (email, code){
    transporter.sendMail({
        from: 'yoursecretsaresafexo@gmail.com',
        to: email,
        subject: 'hello',
        text: "your password is: " + code
    }, function(err, value){
        if (err) {
            write.emphasis('message could not be sent...are you connected to the internet?')
        }
    });
};

module.exports = mail_token;