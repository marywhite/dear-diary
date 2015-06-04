// Part of https://github.com/chris-rock/node-crypto-examples

var crypto = require('crypto')
    , algorithm = 'aes-256-ctr'
    , password = 'd6F3Efeq';


function encrypt(str){
    var cipher = crypto.createCipher(algorithm,password);
    var crypted = cipher.update(str,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(str){
    var decipher = crypto.createDecipher(algorithm,password);
    var dec = decipher.update(str,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;