const express = require('express');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs');
const gm = require('gm');
const bodyParser = require('body-parser')
const path = require('path');
const url = require('url');

const port = 3000;

const app = express();
app.use(bodyParser.json());

// const Storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, "./Images");
//     },
//     filename: function (req, file, callback) {
//         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//     }
// });

// let upload = multer({
//     storage: Storage
// }).array('imgUloader', 3);


app.use('/uploads', express.static('uploads'));

app.set('view engine', 'pug');
app.set('views', './views');

let imagePath = ''


app.get("/", function (req, res) {
    res.render('index', {
        image : imagePath
    });
});

app.post("/api/Upload", upload.single('avatar'), function (req, res) {
    imagePath = req.file.path
    res.redirect('/')
    console.log(req.file.path)
});

app.post('/api/resize?x=:x&y=:y', function (req, res) {
    gm(`${imagePath}`)
        .resize(req.params.x, req.params.y)
        .noProfile()
        .write(`${imagePath}`, function (err) {
            if (!err) console.log('done');
        });
    res.redirect('/');    
})

app.post('/api/crop?height=:height&width=:width&x=:x&y=:y', function (req,res) {
    gm(`${imagePath}`)
        .crop(`${width}`, `${height}`, `${x}`, `${y}`)
        .noProfile()
        .write(`${imagePath}`, function (err) {
            if (!err) console.log('done');
        });
    res.redirect('/');
})

app.post('/api/crop?height=:height&width=:width&x=:x&y=:y', function (req, res) {
    gm(`${imagePath}`)
        .crop(`${width}`, `${height}`, `${x}`, `${y}`)
        .noProfile()
        .write(`${imagePath}`, function (err) {
            if (!err) console.log('done');
        });
    res.redirect('/');
})

app.post('/api/crop?height=:height&width=:width&x=:x&y=:y', function (req, res) {
    gm("img.png").rotate(color, degrees)
        .crop(`${width}`, `${height}`, `${x}`, `${y}`)
        .noProfile()
        .write(`${imagePath}`, function (err) {
            if (!err) console.log('done');
        });
    res.redirect('/');
})

gm("img.png").rotate(color, degrees)


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});