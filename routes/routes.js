const express = require('express');
const Model = require('../models/model');
const { upload } = require('../services/imagesService');
const router = express.Router();
// import S3 from 'react-aws-s3';
const fs = require('fs');
const AWS = require('aws-sdk');
const path = require('path');

//Post Method
router.post('/post', async (req, res) => {
    console.log('req ', req.body);
    const data = new Model({
        name: req.body.name,
        age: req.body.age,
        userId: req.body.userId,
        profile_image: req.body.profile_image,
        experiences: req.body.experiences
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/post-images', async (req, res, next) =>{
    const base64Image = req.body.image;
    const imageName = req.body.name;
    const type = req.body.type;
    console.log('req', req.body)
    let response;

    try {
        response = await upload(imageName, base64Image, type);
        console.log('response ', response)
    } catch (err) {
        console.error(`Error uploading image: ${err.message}`);
        return next(new Error(`Error uploading image: ${imageName}`));
    }

    res.send({link: response});
})

module.exports = router;