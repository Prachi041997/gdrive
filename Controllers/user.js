const User = require('../models/user')
exports.getUserById = (req, res,next, id)=> {
    User.findById(id)
    .exec((err, user)=> {
        if(err) {
            return res.status(400).json({error: err})
        }
        if(!user) {
            return res.status(400).json({
                error: "User Does no exists"
            })
        }
        req.profile = user;
        next();
    })
}