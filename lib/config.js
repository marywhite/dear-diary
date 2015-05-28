var nconf = require ('nconf');
nconf.use('file', { file: './config.json'});
nconf.load();

var edit = function(key, value){
    nconf.set(key, value);
    nconf.save(function (err) {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log('Configuration saved successfully.');
    });
};

module.exports = edit;