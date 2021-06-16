const User = require('../models/user');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt'); 
exports.signup = (req, res)=> { 
    const errors = validationResult(req);
    console.log('lab');
    console.log(errors);
    if (!errors.isEmpty()) {
        console.log(errors.array());
     return res.status(422).json({ error: errors.array()});
   }
    const user = new User(req.body);
    console.log(user);
    user.save((err, user)=> {
        if(err) {
            console.log(err);
           return res.status(400).json({
                error: err
            })
        } 
            //create token
    const token = jwt.sign({_id: user._id}, 'cat')
    //put token into cookie
    res.cookie("token", token, {expire: new Date() + 9999})
    // res.cookie("userId",user._id, {expire: new Date() + 9999})
    
    //send data 
    res.json({
        token,
        user: {
            id: user._id,
            email: user.email,
            name: user.name,
            gender: user.gender
        }
    })
    })
}
exports.signin = (req, res)=> {
    const errors = validationResult(req);
    console.log('lab');
    console.log(errors);
    if (!errors.isEmpty()) {
        console.log(errors.array());
     return res.status(422).json({ error: errors.array()});
   }
   const {email, password} = req.body;
   User.findOne({email}, (err, user)=> {
       if(err) {
         return res.status(400).json({
              error: err
          })
       }
       if(!user) {
          return res.status(400).json({
              error: 'User does not exist'
          })
       }
       if(!user.authenticate(password)){
          return res.status(400).json({
              error: 'Email and Password do not match'
          })
       }
        //create token
    const token = jwt.sign({_id: user._id}, 'cat')
    //put token into cookie
    res.cookie("token", token, {expire: new Date() + 9999})
    // res.cookie("userId",user._id, {expire: new Date() + 9999})
    
    //send data 
    res.json({
        token,
        user: {
            id: user._id,
            email: user.email,
            name: user.name,
            gender: user.gender

        }
    })
   })  
}
exports.signout = (req, res)=> {
    res.clearCookie('token');
    res.clearCookie('userId');
    res.json({
       message: "user signout successfully"
   })
}

exports.isSignedIn = expressjwt({
   secret: 'cat',
   algorithms: ['HS256'],
   userProperty: "auth", 
})

exports.isAuthenticated = (req,res,next)=> {
    console.log('went');
    console.log(req.profile);
    console.log(req.auth);
    let checker = req.profile && req.auth && req.profile._id == req.auth._id; //auth in req.auth is userproperty value in isSignedIn middleware
    
    if(!checker) {
        return res.status(403).json({
            err: "ACCESS DENIED"
        })
    }
    next();
}
