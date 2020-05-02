const express = require("express");
const multer = require("multer");
const router = express.Router();
const dongxes = require("../models/dongxe");
const xes = require("../models/xe");
const useradmin = require("../models/useradmin");
const tintucs = require("../models/tintuc");
const loaiphukiens = require("../models/loaiphukien");
const phukiens = require("../models/phukien");
const DongxeControllers = require('../controllers/dongxe');
const XeControllers = require('../controllers/xe');
const TintucControllers = require('../controllers/tintuc');
const LoaiphukienControllers = require('../controllers/loaiphukien.js');
const PhukienControllers = require('../controllers/phukien');
// const upload = require('../middleware/upload');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/[\/\\:]/g, "_") + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype == "image/jpg") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


router.get("/home",DongxeControllers.Xem_Dong_Xe);
router.get('/dongxes/them', function (req, res, next) {
    res.render('dongxe/them-dongxe');
});
router.post('/dongxes/them-moi', upload.single('image'), DongxeControllers.Them_Dong_Xe);

router.get('/dongxes/sua/:dxId', function (req, res, next) {
    var dxId = req.params.dxId;

    dongxes.findOne({_id: dxId}, function (err, data) {
        if (err) {
            res.send('id khong ton tai');
        }

        res.render('dongxe/sua-dongxe', {dx: data});
    });
});
router.post('/dongxes/luu-sua', upload.single('image'), DongxeControllers.Sua_Dong_Xe);

router.get('/dongxes/xoa/:dxId', DongxeControllers.Xoa_Dong_Xe);
//Xe//-------------xe


router.get("/xe", XeControllers.Xem_Xe);
//thêm xe//
router.get('/xe/them', function (req, res, next) {
    dongxes.find({}, (err, data) => {
        console.log(data);
        res.render('xe/them-xe', {x: data});
    })
});
//sua xe//
router.get('/xe/sua/:xId', function (req, res, next) {
    dongxes.find({}, (err, data) => {

        xes.findOne({_id: req.params.xId}, (err, xData) => {
            if (err) {
                res.send('id san pham khong ton tai');
            }

            for (var i = 0; i < data.lengnth; i++) {
                if (data[i]._id == xData.dongxe_id.toString()) {
                    data[i].selected = true;
                }
            }
            res.render('xe/sua-xe', {dx: data, x: xData});
        });
    })
});
router.post('/xe/luu-sua', upload.array('anh'), XeControllers.Sua_Xe);
router.post('/xe/them-moi', upload.array('anh', 10), XeControllers.Them_Xe);
router.get('/xe/xoa/:xId', XeControllers.Xoa_Xe);


//Loại Phụ kiện//

router.get("/loaiphukien", LoaiphukienControllers.Xem_Loai_Phu_Kien);
router.get('/loaiphukien/them', function (req, res, next) {
    res.render('loaiphukien/them-loaipk');
});
router.post('/loaiphukien/them-moi', upload.single('image'), LoaiphukienControllers.Them_Loai_Phu_Kien);
router.get('/loaiphukien/sua/:lpkId', function (req, res, next) {
    var lpkId = req.params.lpkId;

    loaiphukiens.findOne({_id: lpkId}, function (err, data) {
        if (err) {
            res.send('id khong ton tai');
        }

        res.render('loaiphukien/sua-loaipk', {lpk: data});
    });
});
router.post('/loaiphukien/luu-sua', upload.single('image'), LoaiphukienControllers.Sua_Loai_Phu_Kien);

//xóa/
router.get('/loaiphukien/xoa/:lpkId', LoaiphukienControllers.Xoa_Loai_Phu_Kien);
//Phụ Kiện//
router.get("/phukien", PhukienControllers.Xem_Phu_Kien);
router.get('/phukien/them', function (req, res, next) {
    loaiphukiens.find({}, (err, data) => {
        res.render('phukien/them-phukien', {lpk: data});
    })

});
router.post('/phukien/them-moi', upload.single('anh'), PhukienControllers.Them_Phu_Kien);
router.get('/phukien/sua/:pkId', function (req, res, next) {
    loaiphukiens.find({}, (err, data) => {

        phukiens.findOne({_id: req.params.pkId}, (err, pkData) => {
            if (err) {
                res.send('id san pham khong ton tai');
            }

            for (var i = 0; i < data.lengnth; i++) {
                if (data[i]._id == pkData.phukien_id.toString()) {
                    data[i].selected = true;
                }
            }
            res.render('phukien/sua-phukien', {lpk: data, pk: pkData});
        });
    })
});
router.post('/phukien/luu-sua', upload.single('anh'), PhukienControllers.Sua_Phu_Kien);

router.get('/phukien/xoa/:pkId', PhukienControllers.Xoa_Phu_Kien);

//tin tuc//
router.get("/tintuc", TintucControllers.Xem_Tin_Tuc);
router.get('/tintuc/them', function (req, res, next) {
    res.render('tintuc/them-tin');
});


router.post('/tintuc/them-moi', upload.array('anh', 10), function (req, res, next) {

    try {
        const anh = req.files;
        var model = new tintucs();
        model.tieude = req.body.tieude;
        model.noidung = req.body.noidung;
        if (!anh) {
            res.status(400).send({
                status: false,
                data: 'No photo is selected.'
            });
        } else {
            let data = [];

            // iterate over all photos
            anh.map(p => data.push("anh", p.path));
            model.anh = JSON.stringify(data);
            console.log(model);
            model.save();
        }
        res.redirect('/tintuc');
    } catch (err) {
        res.status(500).send(err);
    }

});

//sửa tin tức
router.get('/tintuc/sua/:ttId', function (req, res, next) {
    var ttId = req.params.ttId;

    tintucs.findOne({_id: ttId}, function (err, data) {
        if (err) {
            res.send('id khong ton tai');
        }

        res.render('tintuc/sua-tin', {tt: data});
    });
});

router.get('/tintuc/xoa/:ttId', TintucControllers.Xoa_Tin);
router.post('/tintuc/luu-sua', upload.array('anh'), TintucControllers.Sua_Tin);
//api/xe
router.get('/api/xe', (req, res) => {
    xes.find({}, (err, data) => {
        res.json({success: true, xes: data})
    })
});
router.get('/api/phukien', (req, res) => {
    phukiens.find({}, (err, data) => {
        res.json({success: true, pk: data})
    })
});
//api tin tức//

router.get('/api/tintuc', (req, res) => {
    tintucs.find({}, (err, data) => {
        res.json({success: true, tintuc: data})
    })
});
///login///
router.get("/", function (req, res, next) {
    res.render('login/login');
});
router.get("/registerappoto", function (req, res, next) {
    res.render('login/createadmin');
});
router.post('/taoadmin/them-moi', upload.single('anh'), function (req, res, next) {

    try {
        var model = new useradmin();
        model.user = req.body.user;
        model.password = req.body.password;
        model.save();
        res.redirect('/login');
    } catch (err) {
        res.status(500).send(err);
    }

});
router.post('/login/confirm', upload.single('anh'), function (req, res, next) {

    useradmin.findOne({user: req.body.user, password: req.body.password}, function (err, user) {
        if (err) {
            return res.status(500).send('loi khong xac dinh');
        }
        if (!user) {
            return res.status(404).send('sai  thong tin dang nhap!');
        }
        return res.redirect('/home');
    })
})

module.exports = router;
