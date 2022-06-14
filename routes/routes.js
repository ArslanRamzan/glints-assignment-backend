// const express = require('express');
// const Model = require('../models/model');
// const { upload } = require('../services/imagesService');
// const router = express.Router();
// // import S3 from 'react-aws-s3';
// const fs = require('fs');
// const AWS = require('aws-sdk');

// // const config = {
// //     bucketName: process.env.REACT_APP_BUCKET_NAME, glints-assets
// //     region: process.env.REACT_APP_REGION, us-west-2
// //     accessKeyId: process.env.REACT_APP_ACCESS, AKIA5UT7THKBHIZ377FE
// //     secretAccessKey: process.env.REACT_APP_SECRET, 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
// // }


// //Post Method
// router.post('/post', async (req, res) => {
//     const data = new Model({
//         name: req.body.name,
//         age: req.body.age,
//         experiences: req.body.experiences
//     })

//     try {
//         const dataToSave = await data.save();
//         res.status(200).json(dataToSave)
//     }
//     catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// })

// //Update by ID Method
// router.patch('/update/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const updatedData = req.body;
//         const options = { new: true };

//         const result = await Model.findByIdAndUpdate(
//             id, updatedData, options
//         )

//         res.send(result)
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// router.get('/getAll', async (req, res) => {
//     try {
//         const data = await Model.find();
//         res.json(data)
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// router.post('/images', validateImageType, validateImageExtension, validateImageObject, validate, async (req, res, next) =>{
//     const base64Image = req.body.image;
//     const imageName = req.body.name;
//     const type = req.body.type;
//     let response;

//     try {
//         response = await upload(imageName, base64Image);
//     } catch (err) {
//         console.error(`Error uploading image: ${err.message}`);
//         return next(new Error(`Error uploading image: ${imageName}`));
//     }

//     res.send({link: response});
// })

const express = require('express');
const Model = require('../models/model');
const { upload } = require('../services/imagesService');
const router = express.Router();
// import S3 from 'react-aws-s3';
const fs = require('fs');
const AWS = require('aws-sdk');
const path = require('path');


// const config = {
//     bucketName: process.env.REACT_APP_BUCKET_NAME, glints-assets
//     region: process.env.REACT_APP_REGION, us-west-2
//     accessKeyId: process.env.REACT_APP_ACCESS, AKIA5UT7THKBHIZ377FE
//     secretAccessKey: process.env.REACT_APP_SECRET, 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
// }
// REACT_APP_BUCKET_NAME="glints-assets" REACT_APP_REGION="us-west-2" REACT_APP_ACCESS="AKIA5UT7THKBHIZ377FE" REACT_APP_SECRET="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"

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

// router.post('/images', validateImageType, validateImageExtension, validateImageObject, validate, async (req, res, next) =>{
//     const base64Image = req.body.image;
//     const imageName = req.body.name;
//     const type = req.body.type;
//     let response;

//     try {
//         response = await upload(imageName, base64Image);
//     } catch (err) {
//         console.error(`Error uploading image: ${err.message}`);
//         return next(new Error(`Error uploading image: ${imageName}`));
//     }

//     res.send({link: response});
// })

// router.post('/images', async (req, res, next) =>{
//     // const base64Image = req.body.image;
//     // const imageName = req.body.name;
//     // const type = req.body.type;
//     let response;

//     // try {
//     //     response = await upload(imageName, base64Image);
//     // } catch (err) {
//     //     console.error(`Error uploading image: ${err.message}`);
//     //     return next(new Error(`Error uploading image: ${imageName}`));
//     // }

//     // res.send({link: response});
//     console.log(`File entered successfully`, path.resolve(req.body.name));
//     const fileContent = fs.readFileSync(path.resolve(req.body.name));
//     console.log('fileContent ', fileContent)
//     // Setting up S3 upload parameters
//     const params = {
//         Bucket: "glints-assets",
//         Key: req.body.name, // File name you want to save as in S3
//         Body: fileContent
//     };

//     // Uploading files to the bucket
//     s3.upload(params, function(err, data) {
//         if (err) {
//             throw err;
//         }
//         console.log(`File uploaded successfully. ${data.Location}`);
//     });
// })

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

// module.exports = router;