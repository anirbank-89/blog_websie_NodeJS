import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from 'morgan';

dotenv.config();

var app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`App is listening at port ${PORT}`);
});