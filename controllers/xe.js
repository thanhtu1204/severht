const Xes = require("../models/xe");

exports.Xem_Xe = (req, res, next) => {
    Xes.find({})
        .populate('dongxe_id')
        .exec((err, data) => {
            res.render('xe/index', {xe: data});
        });
};
exports.Them_Xe = (req, res, next) => {
    try {
        const anh = req.files;
        var model = new Xes();
        model.tensp = req.body.tensp;
        model.gia = req.body.gia;
        model.dongxe_id = req.body.dongxe_id;
        model.kichthuoc = req.body.kichthuoc;
        model.chieucaocoso = req.body.chieucaocoso;
        model.taitrong = req.body.taitrong;
        model.dongco = req.body.dongco;
        model.dungtichcongtac = req.body.dungtichcongtac;
        model.congsuatcd = req.body.congsuatcd;
        model.momenxoancd = req.body.momenxoancd;
        model.hopso = req.body.hopso;
        model.dandong = req.body.dandong;
        model.tangtoc = req.body.tangtoc;
        model.vantoctoida = req.body.vantoctoida;
        model.loainl = req.body.loainl;
        model.mucttnlkh = req.body.mucttnlkh;
        model.mucttnltdt = req.body.mucttnltdt;
        model.mucttnlndt = req.body.mucttnlndt;
        model.thongtinmota = req.body.thongtinmota;
        if (!anh) {
            res.status(400).send({
                status: false,
                data: 'No photo is selected.'
            });
        } else {
            let data = [];

            // iterate over all photos
            anh.map(p => data.push(p.path));
            model.anh = JSON.stringify(data);
            model.save();
        }
        res.redirect('/xe');
    } catch (err) {
        res.status(500).send(err);
    }
};
exports.Sua_Xe = (req, res, next) => {
    let {
        id,
        tensp, gia,
        dongxe_id,
        kichthuoc,
        chieucaocoso,
        taitrong,
        dongco,
        dungtichcongtac,
        congsuatcd,
        momenxoancd,
        hopso,
        dandong,
        tangtoc,
        vantoctoida,
        loainl,
        mucttnlkh,
        mucttnltdt,
        mucttnlndt,
        thongtinmota
    } = req.body;
    Xes.findOne({_id: id}, function (err, model) {
        if (err) {
            res.send('Id khong ton tai');
        }
        model.tensp=tensp;
        model.gia=gia;
        model.dongxe_id=dongxe_id;
        model.kichthuoc=kichthuoc;
        model.chieucaocoso=chieucaocoso;
        model.taitrong=taitrong;
        model.dongco=dongco;
        model.dungtichcongtac=dungtichcongtac;
        model.congsuatcd=congsuatcd;
        model.momenxoancd=momenxoancd;
        model.hopso=hopso;
        model.dandong=dandong;
        model.tangtoc=tangtoc;
        model.vantoctoida=vantoctoida;
        model.loainl=loainl;
        model.mucttnlkh=mucttnlkh;
        model.mucttnltdt=mucttnltdt;
        model.mucttnlndt=mucttnlndt;
        model.thongtinmota=thongtinmota;
        model.save(function (err) {
            if (err) {
                res.send('cap nhat khong thanh cong');
            }
            res.redirect('/xe');
        })
    })
};
exports.Xoa_Xe=(req,res,next) =>{
    Xes.deleteOne({ _id: req.params.xId }, function (err) {
        if (err) return handleError(err);
        res.redirect('/xe');
    });

};
