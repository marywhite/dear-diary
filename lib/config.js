var fs    = require('fs');
var bcrypt = require('bcrypt');
var nconf = require ('nconf');
var config_path = './config.json';

nconf.use('file', { file: config_path});
nconf.load();


var checkconfig = function() {
    return (name() == "" || password() == "" || scheme() == "" || email())
};


var changepass = function (str){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(str, salt, function(err, hash) {
            edit('password', hash)
        });
    })
};

var changetoken = function (str) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(str, salt, function (err, hash) {
            edit('password', hash)
        });
    });
};

var comparepass = function(str){
    var hash = nconf.get('password');
    bcrypt.compare(str, hash, function(err, res) {
        return res;
    });
};

var edit = function(key, value){
    nconf.set(key, value);
    nconf.save(function (err) {
        fs.readFile(config_path, function (err, data) {
            if (err) throw (err);
        });
    });
};

var comparetoken = function(str){
    var hash = nconf.get('token');
    bcrypt.compare(str, hash, function(err, res) {
        return res;
    });
};

var password = function(){
    return nconf.get('password');
};

var name = function(){
    return nconf.get('name');
};

var email = function(){
    return nconf.get('email');
};

var scheme = function(){
    return nconf.get('scheme');
};

module.exports.edit = edit;
module.exports.password = password;
module.exports.email = email;
module.exports.name = name;
module.exports.scheme = scheme;

module.exports.checkconfig = checkconfig;
module.exports.changepass = changepass;
module.exports.changetoken= changetoken;
module.exports.comparepass = comparepass;
module.exports.comparetoken = comparetoken;