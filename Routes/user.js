const express = require('express');
const { isSignedIn, isAuthenticated } = require('../Controllers/auth');
const { getUserById } = require('../Controllers/user');
const User = require('../models/user');
const fs = require('fs')
const formidable = require('formidable');

const router = express.Router();

router.param('userID', getUserById);

router.get('/user/getPP/:userID', (req, res)=> {
    User.findOne({_id:req.params.userID})
    .then(user=> {
        
        if(user.photo.data){
            console.log('if');
        res.set("Content-Type", user.photo.contentType);
        return res.send(user.photo.data)
        } else{
            console.log('else')
            return res.json(false);
        }
       
    })
})

router.post('/user/changePP/:userID', (req, res)=> {
    console.log(req.params.userID);
   User.findOne({_id: req.params.userID})
   .then(user=> {
       console.log(user);
       const form = formidable.IncomingForm();
       form.keepExtensions = true;
       form.parse(req, (err, fields, file)=> {
        if(err) {
            return res.status(400).json({
                error: "Problem with Image"
            })
        }
      
        if(file.photo) {
         if(file.photo.size> 3000000) {
             return res.status(400).json({
                 errors: "File too big"
             }) 
         }
        user.photo.data = fs.readFileSync(file.photo.path);
        user.photo.contentType = file.photo.type;
        }
        user.save((err, user)=> {
         if(err){
             return res.status(400).json({
                 error: "saving product failed"
             }) 
         }
        return res.json(user.photo);
        })
    })

   })
})

module.exports = router;
