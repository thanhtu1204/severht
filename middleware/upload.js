const multer = require("multer");
const shortid = require('shortid');
const path = require('path');

var storage = multer.diskStorage({
    //nơi lưu trữ
    destination: function (req, file, cb) {
        cb(null, './public/uploads');

    }, filename: function (req, file, cb) {
        cb(null, shortid.generate() + "00" + file.originalname);
    }

});


var upload = multer({
    storage: storage,
    fileFilter(req, file, callback) {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpeg" ||
            file.mimetype == "image/gif" || file.mimetype == "image/jpg") {
            callback(null, true);
        } else {
            console.log("sai kieu du lieu anh!");
            callback(null, false);
        }
    }, limits: {
        fieldSize: 1024 * 1024 * 2
    }
});
module.exports = upload;
