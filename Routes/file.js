const express = require('express')
const multer = require('multer');
const Grid = require('gridfs-stream');
const GridFsMulterStorage = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const path = require('path');
const crypto = require('crypto');
const Twit = require('twit');
const User = require('../models/user');
const { getUserById } = require('../Controllers/user');
const { uploadFile } = require('../Controllers/file');
const { update } = require('../models/user');


const router = express.Router();
const URI = 'mongodb+srv://prachi:prachi123@prachi-324ca.mongodb.net/bigdata?retryWrites=true&w=majority'
let conn = mongoose.connection
Grid.mongo = mongoose.mongo;
let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db);
  console.log('Grid fs')
})

const storage = new GridFsMulterStorage({
  url: URI,
  file: (req, file) => {
    console.log(file)
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          metadata: {
            originalname: file.originalname,
            star: false
          }
        };

        resolve(fileInfo);
      });
    });
  }
})


const singleUpload = multer({ storage: storage }).single('file');

router.param('userId', getUserById);
router.post('/file/:userId', singleUpload, uploadFile);



router.get('/file/:filename', (req, res) => {
  console.log(req.params.filename);
  gfs.files.find({ filename: req.params.filename }).toArray(function (err, files) {
    if (!files || files.length === 0) {
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

router.get('/getfiles/:userid', (req, res) => {

  User.findOne({ _id: req.params.userid })
    .then(user => {
      console.log(user)
      user.populate('files')
        .execPopulate((err, data) => {
          console.log(data);
          res.json({
            files: data.files
          })
        })
    })
})

router.delete('/removeFile/:filename/:userId', (req, res) => {
  gfs.files.find({ filename: req.params.filename }).toArray((err, files)=> {
    console.log(files[0]);
    gfs.remove({ filename:files[0].filename }, (err) => {
       if(err) {
         return res.status(400).json({
           error: err,
           success: false
         })
       }
      User.updateOne({_id: req.params.userId},
                    {$pull: { files: files[0]._id }})
                    .then(updatedUser=> {
                      if(updatedUser){
                        return res.json({
                          success: true,
                          msg: 'Successfully Deleted'
                        })
                      }
                    }).catch(err=> console.log(err))
    })
  })
 
})

router.post('/file/rename/:filename', (req, res)=> {
  gfs.files.update({ filename: req.params.filename },
    {
      "$set": {'metadata.originalname': req.body.rename+'.'+req.params.filename.split('.')[1]}
    }).then((data)=> {
      console.log(data);
      return res.json({
        success: true
      })
    }).catch(err=>{
      console.log(err);
    })
})

router.get('/file/makefav/:userid/:filename', (req, res) => {
 
  gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
    console.log(files[0].metadata);
    User.findOne({ _id: req.params.userid })
    .then(user => {
      console.log(user)
      const found = user.star.includes(files[0]._id);
      console.log(found);
      if (!found) {
        user.star.push(files[0]._id);
        gfs.files.update({ filename: req.params.filename },
          {
            $set: {
              metadata: { star:true,originalname: files[0].metadata.originalname}
            }
          }).then(data => {
            console.log(data)
          })
      } else {
        User.updateOne({_id: req.params.userid},
                   {$pull: { star: files[0]._id }})
                   .then(data=> {console.log(data)})
        gfs.files.update({ filename: req.params.filename },
          {
            $set: {
              metadata: { star:false, originalname: files[0].metadata.originalname}
            }
          }).then(data => {
            console.log('hii')
          })
        return res.json({
          msg: 'Removed from star'
        })
      }
      user.save((err, savedUser) => {
        if (err) {
          return res.status(400).json({
            success: 'failed to save in db'
          })
        }
        return res.json({
          success: 'Added to star'
        })
      })
    });
   
  })
})
  router.get('/file/getfav/:userid', (req, res) => {
    User.findOne({ _id: req.params.userid })
      .then(user => {
        user.populate('star')
          .execPopulate((err, data) => {
            if (err) {
              return res.status(400).json({
                success: 'failed to get from db'
              })
            }
            return res.json({
              data: data.star
            })
          })
      })
  })

  router.post('/file', singleUpload, (req, res) => {
    if (req.file) {
      return res.json({
        success: true,
        file: req.file
      });
    }
    res.send({ success: false });
  })

  module.exports = router;


