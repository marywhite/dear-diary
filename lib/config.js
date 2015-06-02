var fs    = require('fs');
var bcrypt = require('bcrypt');
var nconf = require ('nconf');
var config_path = './config.json';
nconf.use('file', { file: config_path});
nconf.load();

var checkconfig = function() {
    if (name() == "" || password() == "" || scheme() == "") {
        console.log ('please type <<dear-diary setup>> to configure your preferences');
        process.exit(1);
    }
};

var changepass = function (str){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(str, salt, function(err, hash) {
            edit('password', hash)
        });
    })
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

var password = function(){
    return nconf.get('password');
};

var name = function(){
    return nconf.get('name');
};

var scheme = function(){
    return nconf.get('scheme');
};

module.exports.edit = edit;
module.exports.password = password;
module.exports.name = name;
module.exports.scheme = scheme;
module.exports.checkconfig = checkconfig;
module.exports.changepass = changepass;
module.exports.comparepass = comparepass;