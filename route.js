const express = require('express')
const multer = require('multer');
const Grid = require('gridfs-stream');
const GridFsMulterStorage = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const Twit = require('twit');


const router = express.Router();
const URI = 'mongodb+srv://prachi:prachi123@prachi-324ca.mongodb.net/bigdata?retryWrites=true&w=majority'
let conn = mongoose.connection
Grid.mongo = mongoose.mongo;
let gfs;

conn.once('open', ()=> {
    gfs = Grid(conn.db);
    console.log('Grid fs')
})

const storage = new GridFsMulterStorage({
    url: URI,
    file: (req, file) => {
        console.log('hii')
        return {
          filename: file.originalname
        }
      }
})





const singleUpload = multer({ storage: storage }).single('file');
router.get('/file/:filename', (req, res)=> {
    gfs.files.find({ filename: req.params.filename}).toArray(function (err, files) {
            if(!files || files.length === 0){
                return res.status(404).json({
                  message: "Could not find file"
                });
              }
              console.log(files);
              var readstream = gfs.createReadStream({
                filename: files[0].filename
              })
              res.set('Content-Type', files[0].contentType);
              // console.log(res);
              return readstream.pipe(res);
            });
})

router.post('/file', singleUpload, (req, res)=> {
    if (req.file) {
        return res.json({
          success: true,
          file: req.file
        });
      }
      res.send({ success: false });
})

module.exports = router;
