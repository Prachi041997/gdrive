const mongoose = require('mongoose');
const {v1:uuidv1} = require('uuid');
const crypto = require('crypto');
const GridFs = require('./gfs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
     email: {
        type: String,
        required: true,
        trim: true
    },
    encry_password: {
        type: String,
        required: true
    }, 
    salt: String, 
    files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GridFs'
    }] ,
    star: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GridFs'
    }],
    photo: {
        data: Buffer,
        contentType: String
    },
    gender: String
}, {timestamps: true})

userSchema.virtual('password')
.set(function(password){
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password)
})
.get(function(){
    return this._password
})
userSchema.methods = {
    authenticate: function(plainPassword) {
        console.log(this.securePassword(plainPassword));
        console.log(this.encry_password);
       return this.securePassword(plainPassword) === this.encry_password
    },
    securePassword:  function(plainPassword) {
        if(!plainPassword) return ""
        try{
           return crypto.createHmac('sha256', this.salt)
           .update(plainPassword)
           .digest('hex');
        } catch(err) {
            return ""
        }
    }
}

module.exports = mongoose.model("User", userSchema);