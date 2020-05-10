const datauser = require("../models/datauser");
exports.Xem_Data = (req, res, next) => {
    datauser.find({})
        .populate('cate_id')
        .exec((err, data) => {
            res.render('datauser/index', {dt: data});
        });
};
exports.Them_Data = (req, res, next) => {
    try {
        var model = new datauser();
        model.email = req.body.email;
        model.sdt = req.body.sdt;
        model.save();
        res.redirect('/datauser');
    } catch (err) {
        res.status(500).send(err);
    }
};
exports.Xoa_Data = (req, res, next) => {
    datauser.deleteOne({_id: req.params.dtId}, function (err) {
        if (err) return handleError(err);
        res.redirect('/datauser');
    });
};

