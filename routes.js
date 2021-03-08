const express = require('express');
const router = express.Router();
const { Users } = require('./database');
const { v4: uuidv4 } = require('uuid');

// Route users path to create a user
router.post('/', async(req, res) => {
  const { first_name, last_name, sub_reddits, email_enabled, email_time } = req.body;
  const result = await Users.create({
      id: uuidv4(), 
      first_name, 
      last_name, 
      sub_reddits: JSON.parse(sub_reddits),
      email_enabled,
      email_time
  });
  res.send(result);
});

// Update the user
router.put('/', async(req, res) => {
  const { first_name, last_name, sub_reddits, email_enabled, email_time } = req.body;
  const result = await Users.update({
      first_name, 
      last_name, 
      sub_reddits: JSON.parse(sub_reddits),
      email_enabled,
      email_time
  },
  {where: { id: req.params.id }});
  console.log(result);
  res.send(result);
});

// Update the subreddits
router.put('/subreddits/:id', async (req, res) => {
  console.log(req.body)
  const sub_reddits = JSON.parse(req.body.sub_reddits);
  const result = Users.update(
    { sub_reddits },
    { where: { id: req.params.id } }
  );
  console.log(result);
  res.send(result);
});

// Update the email time
router.put('/email_time/:id', async (req, res) => {
  const email_time = req.body.email_time;
  const result = Users.update(
    { email_time },
    { where: { id: req.params.id } }
  );
  console.log(result);
  res.send(result);
});

// Update the newsletter setting
router.put('/email_enabled/:id', async (req, res) => {
  const email_enabled = req.body.email_enabled;
  const result = Users.update(
    { email_enabled },
    { where: { id: req.params.id } }
  );
  console.log(result);
  res.send(result);
});


module.exports = router;