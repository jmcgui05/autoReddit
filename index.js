require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PORT } = process.env;
const { database } = require('./database');
const userRoutes = require('./routes');

let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', userRoutes);

// handle unsupported
app.use((req, res) => {
  console.log(req.url)
  res.send({
    status: 404,
    body: `Unsupported path. We currently support the following paths: /users/subreddits, /users/email_time, /users/email_enabled`
  })
});

database.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  })
})