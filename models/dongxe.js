const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DongXeSchema = new Schema({
    tendongxe: {type: String, unique: true, required: true, dropDups: true}
});
module.exports = mongoose.model('dongxes', DongXeSchema);

