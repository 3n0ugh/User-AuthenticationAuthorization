const monk = require('monk');
const db = monk('localhost/mydb');

module.exports = db;
