const mongoose = require('mongoose');

var GridfsSchema = new mongoose.Schema({
    
}, {strict: false});

module.exports = mongoose.model('GridFs', GridfsSchema, 'fs.files' );