require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PORT } = process.env;
const { database } = require('./database');

let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

database.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  })
})