const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    userId: {
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
        type: Image
    },
    experiences: {
        required: true,
        type: Array
    }
})

module.exports = mongoose.model('Data', dataSchema)