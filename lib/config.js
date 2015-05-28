var nconf = require ('nconf');
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

module.exports.edit = edit;
module.exports.password = password;
module.exports.name = name;