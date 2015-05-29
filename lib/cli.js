var Entry = require('./entry');
var Datastore = require('nedb');
var db = new Datastore({ filename: "./diaries", autoload: true });


var random_num = function () {
    var doc = new Entry('hello');
    doc.date();
    return db.insert(doc, function (err, newDoc) {
        console.log('hi ', newDoc)
    });
};
var other_thing =  function () {
    return db.find({ name: 'Mary' }, function (err, docs) {
        console.log(docs);
    });
};


module.exports.random_num = random_num;
module.exports.other_thing = other_thing;