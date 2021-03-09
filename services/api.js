require('dotenv').config();
const { SECRET, CLIENT_ID, TOKEN } = process.env;
var snoowrap = require('snoowrap');

async function getTopPosts(userData) {

  const reddit = new snoowrap({
    userAgent: 'AutoReddit',
    clientId: CLIENT_ID,
    clientSecret: SECRET,
    refreshToken: TOKEN // expires after 1 hour
  });

  let redditData = [];
  const { first_name, sub_reddits } = userData;

  // Get sub reddit data for each of the users sub_reddits
  for (let r of sub_reddits) {
    const subR = await reddit.getSubreddit(r)
      .count()
      .description()
      .header_image();
    redditData.push(subR);
  };

  const emailData = {
    first_name,
    sub_reddits: redditData
  }

  /*
    Example:
    {
      first_name: "John",
      sub_reddits: [
        {
          count: 10,
          descrption: "Test description",
          header_image: "https://<url>.com"
        }
      ]
    }
  */

  // sendEmail func
  sendEmail(emailData);
}

module.exports = {
  getTopPosts
}

