const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    },
    experiences: {
        required: true,
        type: Array
    }
})

const imageSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
})

module.exports = mongoose.model('Data', dataSchema)
module.exports = mongoose.model('Image', imageSchema)