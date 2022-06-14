const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    id: {
        required: true,
        type: Number
    },
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    },
    profile_image: {
        required: true,
        type: String
    },
    experiences: {
        required: true,
        type: Array
    }
})

module.exports = mongoose.model('Data', dataSchema)