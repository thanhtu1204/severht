const tintucs = require("../models/tintuc");

exports.Xem_Tin_Tuc=(req,res,next) =>{
    tintucs.find({})
        .populate('cate_id')
        .exec((err, data) => {
            res.render('tintuc/index', { t: data });
        });
};
exports.Sua_Tin=(req,res,next) =>{
    let {id,tieude,noidung} = req.body;
    tintucs.findOne({_id: id}, function(err, model){
        if(err){
            res.send('Id khong ton tai');
        }
        model.tieude=tieude;
        model.noidung=noidung;

        model.save(function(err){
            if(err){
                res.send('cap nhat khong thanh cong');
            }
            res.redirect('/tintuc');
        })
    })

};

exports.Xoa_Tin=(req,res,next) =>{
    tintucs.deleteOne({ _id: req.params.ttId }, function (err) {
        if (err) return handleError(err);
        res.redirect('/tintuc');
    });

};
