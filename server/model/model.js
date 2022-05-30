const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender:String,
    status: String
})

const userdb = mongoose.model("userdb", schema);

module.exports = userdb;