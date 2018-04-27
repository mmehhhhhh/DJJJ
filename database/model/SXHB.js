var mongoose = require('mongoose');
var SXHBSchema = new mongoose.Schema({
    A:{}
},{versionKey:false})
module.exports = mongoose.model('SXHB',SXHBSchema,'SXHB')