require("dotenv").config();  //require dotenv package
// dotenv.config({ path: "./config.env" }); //import config.env file
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const mongoString = "mongodb+srv://admin:admin@cluster0.0xvbm8n.mongodb.net/candidate";
console.log('mongoString ', mongoString)
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
app.use(cors())
app.use(express.json());

const routes = require('./routes/routes');

app.use('/api', routes)
const port = process.env.PORT || 3000; // PORT must be in caps
app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})