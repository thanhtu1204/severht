var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PhuKienSchema= new Schema({
    tenphukien:{ type: String, unique: true, required: true, dropDups: true },
    phukien_id: { type: Schema.Types.ObjectId, ref: ('loaiphukiens') },
    gioithieu:{ type: String, default: null },
    xuatxu:{ type: String, default: null },
    gia:{ type: String, default: null },
    anh:{  type: String, default: null },
    htdongxe:{ type: String, default: null }
});
module.exports = mongoose.model('phukiens',PhuKienSchema);
