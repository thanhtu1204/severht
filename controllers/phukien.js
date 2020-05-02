const phukiens = require("../models/phukien");
const loaiphukiens = require("../models/loaiphukien");
exports.Xem_Phu_Kien=(req,res,next) =>{
    phukiens.find({})
        .populate('phukien_id')
        .exec((err, data) => {
            res.render('phukien/index', { pk: data });
        });
};

exports.Them_Phu_Kien = (req, res, next) => {
    var model = new phukiens();
    model.tenphukien = req.body.tenphukien;
    model.gia = req.body.gia;
    model.gioithieu = req.body.gioithieu;
    model.xuatxu = req.body.xuatxu;
    model.htdongxe=req.body.htdongxe;
    model.phukien_id=req.body.phukien_id;
    if (req.file != null) {
        model.anh = req.file.path.replace('public', '');
    }
    console.log(model);
    model.save((err) => {
        if (err) {
            res.send('Luu khong thanh cong');
        }
        res.redirect('/phukien');
    })
};
exports.Sua_Phu_Kien=(req, res, next) => {
    // neu khong upload anh => req.file == null
    let {id, tenphukien,gioithieu,xuatxu,gia,phukien_id,htdongxe} = req.body;
    phukiens.findOne({_id: id}, function(err, model){
        if(err){
            res.send('Id khong ton tai');
        }
        model.tenphukien = tenphukien;
        model.gioithieu=gioithieu;
        model.xuatxu=xuatxu;
        model.gia=gia;
        model.htdongxe=htdongxe;
        model.phukien_id=phukien_id;
        if(req.file != null){
            model.anh = req.file.path.replace('public', '');
        }
        model.save(function(err){
            if(err){
                res.send('cap nhat khong thanh cong');
            }

            res.redirect('/phukien');
        })
    })


};

exports.Xoa_Phu_Kien=(req,res,next) =>{
   phukiens.deleteOne({ _id: req.params.pkId }, function (err) {
        if (err) return handleError(err);
        res.redirect('/phukien');
    });

};
