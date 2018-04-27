var mongoose = require('mongoose');
var XDZJSchema = new mongoose.Schema({
    A:{}
},{versionKey:false})
module.exports = mongoose.model('XDZJ',XDZJSchema,'XDZJ')