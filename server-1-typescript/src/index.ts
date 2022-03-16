const mongoose = require('mongoose');
const express = require('express');
const app = require('./app');

let server;

const mongooseUrl: string = "mongodb://localhost:27017/";
const databaseName: string = "udaya_todo";
const portNumber: string = "3001";

mongoose.connect(mongooseUrl, {useNewUrlParser: true}).then(() => {
  console.info('Connected to MongoDB');
  server = app.listen(portNumber, () => {
    console.info(`Listening to port ${portNumber}`);
  });
});
