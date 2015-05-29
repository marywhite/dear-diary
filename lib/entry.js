var moment = require('moment');

function MyObject(entry) {
    this.entry = entry;
}

MyObject.prototype.date = function foo() {
    this.date = new Date();
    this.moment = moment().format('LL');
};

module.exports = MyObject;