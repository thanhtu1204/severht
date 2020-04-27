const dongxes = require("../models/dongxe");

exports.Xem_Dong_Xe=(req,res,next) =>{
    dongxes.find({})
        .populate('cate_id')
        .exec((err, data) => {
            res.render('dongxe/index', { dx: data });
        });
};

exports.Them_Dong_Xe=(req,res,next) =>{
    const model = new dongxes({
        tendongxe: req.body.tendongxe
    });
    model.save(function (err) {
        if(err){
            res.send(' save error');
        }
        res.redirect('/');

    });

};
exports.Sua_Dong_Xe=(req,res,next) =>{
    let {id,tendongxe} = req.body;
    dongxes.findOne({_id: id}, function(err, model){
        if(err){
            res.send('Id khong ton tai');
        }
        model.tendongxe=tendongxe;

        model.save(function(err){
            if(err){
                res.send('cap nhat khong thanh cong');
            }
            res.redirect('/');
        })
    })

};
exports.Xoa_Dong_Xe=(req,res,next) =>{
    dongxes.deleteOne({ _id: req.params.dxId }, function (err) {
        if (err) return handleError(err);
        res.redirect('/');
    });

};

