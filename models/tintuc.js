var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TinTucSchema= new Schema({
    tieude:{ type: String, unique: true, required: true, dropDups: true },
    anh:{ type: String, default: null },
    noidung:{ type: String, default: null }
});
module.exports = mongoose.model('tintucs', TinTucSchema);
