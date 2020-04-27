var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var XeSchema= new Schema({
    tensp:{type: String, unique: true, required: true, dropDups: true},
    gia:{ type: String, default: null },
    dongxe_id: { type: Schema.Types.ObjectId, ref: ('dongxes') },
    kichthuoc:{ type: String, default: null },
    chieucaocoso:{ type: String, default: null },
    taitrong:{ type: String, default: null },
    dongco:{ type: String, default: null },
    dungtichcongtac:{ type: String, default: null },
    congsuatcd:{ type: String, default: null },
    momenxoancd:{ type: String, default: null },
    hopso:{ type: String, default: null },
    dandong:{ type: String, default: null },
    tangtoc:{ type: String, default: null },
    vantoctoida:{ type: String, default: null },
    loainl:{ type: String, default: null },
    mucttnlkh:{ type: String, default: null },
    mucttnltdt:{ type: String, default: null },
    mucttnlndt:{ type: String, default: null },
    thongtinmota:{ type: String, default: null },
    anh:{ type: String, default: null }
});
module.exports = mongoose.model('xes', XeSchema);
