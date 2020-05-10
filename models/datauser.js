var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Datauser = new Schema({
    email: {type: String, default: null},
    sdt:{type: String, default: null}
});
module.exports = mongoose.model('datauser', Datauser);
