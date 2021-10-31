import express from 'express';
import * as http from 'http';
import apiRouter from '../routes/index'

const app = express();

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.use('/api', apiRouter);

const myServer = new http.Server(app);

module.exports = myServer;