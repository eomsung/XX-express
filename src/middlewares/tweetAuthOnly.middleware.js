const tweet = require("../models/tweet.model");

async function tweetAuthOnly(req, res, next) {
  try {
    const userId = req.userId;
    const tweetId = req.params.tweetId;

    const isAuthor = await tweet.checkIsAuthor(tweetId, userId);
    if (!isAuthor) throw new Error("400/Bad requset");
    next();
  } catch (e) {
    next(e);
  }
}

module.exports = tweetAuthOnly;
