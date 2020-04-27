var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LoaiPhuKienSchema= new Schema({
    tenloaiphukien:{ type: String, unique: true, required: true, dropDups: true }
});
module.exports = mongoose.model('loaiphukiens', LoaiPhuKienSchema);
