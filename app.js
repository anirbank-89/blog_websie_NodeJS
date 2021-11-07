import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from 'morgan';

import indexRoute from './routes/index.js';
dotenv.config();

mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected successfully to database!");
    })
    .catch(err => {
        console.log("Failed to connect to database because of ", err);
    });

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`);
});

export default app;