const express = require('express');
const Model = require('../models/model');
const router = express.Router();
// import S3 from 'react-aws-s3';


// const config = {
//     bucketName: process.env.REACT_APP_BUCKET_NAME,
//     region: process.env.REACT_APP_REGION,
//     accessKeyId: process.env.REACT_APP_ACCESS,
//     secretAccessKey: process.env.REACT_APP_SECRET,
// }


//Post Method
router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        age: req.body.age,
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

// router.post('/post-image', async (req, res) => {
//     const data = new Model({
//         name: req.body.name,
//     })

//     try {
//         const ReactS3Client = new S3(config);
//         // the name of the file uploaded is used to upload it to S3
//         ReactS3Client
//         .uploadFile(file, file.name)
//         .then(data => console.log(data.location))
//         .catch(err => console.error(err))
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })

module.exports = router;