var fs    = require('fs')
    , bcrypt = require('bcrypt')
    , nconf = require ('nconf')
    , path = require('path')
    , config_path = path.join(path.dirname(fs.realpathSync(__filename)), '../config.json');

//still need to fix pathing
nconf.file({ file: config_path });
nconf.load();


var checkconfig = function() {
    return (name() == "" || password() == "" || email() == "")
};


var changehashed = function(key, val){
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(val, salt, function (err, hash) {
            edit(key, hash)
        });
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


var compare = function(key, val){
    var hash = nconf.get(key);
    return bcrypt.compareSync(val, hash);
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
module.exports.compare = compare;
module.exports.checkconfig = checkconfig;
module.exports.changehashed = changehashed;