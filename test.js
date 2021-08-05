const express = require("express");

const app = express();

const multer = require("multer");

const path = require('path')

const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

var upload = multer({ storage: storage });

var uploadMultiple = upload.fields([{ name: 'file1', maxCount: 10 }, { name: 'file2', maxCount: 10 }])


app.get("/", (req, res) => {
    res.render("index");
});

app.post('/uploadfile', uploadMultiple, function (req, res, next) {

    if (req.files) {
        console.log(req.files)

        console.log("files uploaded")
    }
    res.json('hello')
})

app.listen(PORT, () => {
    console.log(`App is listening on Port ${PORT}`);
});