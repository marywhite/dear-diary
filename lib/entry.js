var moment = require('moment');

function MyObject(entry) {
    this.entry = entry;
}

MyObject.prototype.date = function foo() {
    this.date = moment().format('LL');
};

module.exports = MyObject;