var fs = require('fs');
var Datastore = require('nedb');
var db = new Datastore({ filename: "./diaries", autoload: true });

var things = {
    name: 'Mary',
    locale: 'USA',
    color: 'pink'
};


var random_num = function () {
    return db.insert(things, function (err, newDoc) {
        console.log('hi ', newDoc)
    });
};
var other_thing =  function () {
    return db.find({ name: 'Mary' }, function (err, docs) {
        console.log(docs);
    });
};


//module.exports = {
//
//    random_num: function () {
//        return db.insert(things, function (err, newDoc) {
//            console.log('hi ', newDoc)
//        });
//    },
//
//    other_thing: function () {
//        return db.find({ name: 'Mary' }, function (err, docs) {
//            console.log(docs);
//        });
//    }
//};


//
//var random_num = function() {
//    return db.insert(things, function (err, newDoc) {   // Callback is optional
//            console.log('hi ', newDoc)
//        });
//};


//
module.exports.random_num = random_num;
module.exports.other_thing = other_thing;