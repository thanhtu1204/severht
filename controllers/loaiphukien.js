const loaiphukiens = require("../models/loaiphukien");
const phukiens = require("../models/phukien");
exports.Xem_Loai_Phu_Kien=(req,res,next) =>{
    loaiphukiens.find({})
        .populate('cate_id')
        .exec((err, data) => {
            res.render('loaiphukien/index', { lpk: data });
        });
};
exports.Them_Loai_Phu_Kien=(req,res,next) =>{
    const model = new loaiphukiens({
        tenloaiphukien: req.body.tenloaiphukien
    });
    model.save(function (err) {
        if(err){
            res.send(' save error');
        }
        res.redirect('/loaiphukien');

    });
};
exports.Sua_Loai_Phu_Kien=(req,res,next) =>{
    let {id,tenloaiphukien} = req.body;
    loaiphukiens.findOne({_id: id}, function(err, model){
        if(err){
            res.send('Id khong ton tai');
        }
        model.tenloaiphukien=tenloaiphukien;

        model.save(function(err){
            if(err){
                res.send('cap nhat khong thanh cong');
            }
            res.redirect('/loaiphukien');
        })
    })

};
exports.Xoa_Loai_Phu_Kien=(req,res,next) =>{
    loaiphukiens.remove({ _id: req.params.lpkId }, function (err) {
        if (err) return handleError(err);
        phukiens.deleteMany({phukien_id: req.params.lpkId}, function (err) {
            if (err) return handleError(err);
        })
        res.redirect('/loaiphukien');
    });

};
