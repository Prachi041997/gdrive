const User = require('../models/user');
const MulterGridfsStorage = require('multer-gridfs-storage');

exports.uploadFile = (req, res)=> {
    if (req.file) {
        console.log(req.file);
        User.findOne({_id: req.profile._id})
        .then(user=> {
            user.files.push(req.file.id);
            user.save((err, savedUser)=> {
                if(err){
                 return res.status(400).json({error: err})
                }
                console.log(savedUser);
            })
        })
        return res.json({
          success: true,
          file: req.file
        });
      }
      res.send({ success: false });
}


