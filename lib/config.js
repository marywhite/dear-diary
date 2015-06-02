var nconf = require ('nconf');
// if this file doesn't exist...make it??
nconf.use('file', { file: './config.json'});
nconf.load();

var edit = function(key, value){
    nconf.set(key, value);
    nconf.save(function (err) {
        if (err) {
            console.error(err.message);
        }
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