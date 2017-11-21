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
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('view engine', 'pug');
app.set('views', './views');

let imagePath = ''
let imagePath2 = "/upload/newfile"

app.get("/", function (req, res) {
    res.render('index', {
        image : imagePath
    });
});

app.get("/redirected", function (req, res) {
    res.render('index', {
        stuff: "THIS"
    });
});

app.post("/api/Upload", upload.single('avatar'), function (req, res) {
    imagePath = req.file.path
    res.redirect('/');
});

app.post('/api/resize', function (req, res) {
    console.log(res.body)
    gm(`${imagePath}`)
        .resize(req.body.resizex, req.body.resizey)
        .autoOrient()
        .write(`${imagePath}`, function (err) {
            if (!err) console.log(' hooray! ');
            res.redirect('/')
        });   
})

app.post('/api/crop', function (req,res) {
    console.log(res.body)
    gm(`${imagePath}`)
        .crop(req.body.height, req.body.width, req.body.cropx, req.body.cropy)
        .noProfile()
        .write(`${imagePath}`, function (err) {
            if (!err) console.log('done');
            res.redirect('/');
        });
})

app.post('/api/rotate', function (req, res) {
    console.log(res.body)
    gm(`${imagePath}`)
        .rotate(req.body.color, req.body.degrees)
        .noProfile()
        .write(`${imagePath}`, function (err) {
            if (!err) console.log('done');
            res.redirect('/');
        });
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});