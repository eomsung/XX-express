const express = require("express");
const tweet = require("../../models/tweet.model");
const loggedInOnly = require("../../middlewares/loggedInOnly.middleware");
const tweetAuthOnly = require("../../middlewares/tweetAuthOnly.middleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allTweets = await tweet.getAllTweets();
    res.json(allTweets);
  } catch (e) {
    next(e);
  }
});

router.post("/", loggedInOnly, async (req, res, next) => {
  try {
    const userId = req.userId;
    const { content } = req.body;

    const newTweet = await tweet.createTweet(userId, content);

    res.status(201).json(newTweet);
  } catch (e) {
    next(e);
  }
});

router.patch(
  "/:tweetId",
  loggedInOnly,
  tweetAuthOnly,
  async (req, res, next) => {
    try {
      const tweetId = req.params.tweetId;
      const content = req.body.content;

      const updatedTweet = await tweet.editTweet(tweetId, content);

      res.status(200).json(updatedTweet);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  "/:tweetId",
  loggedInOnly,
  tweetAuthOnly,
  async (req, res, next) => {
    try {
      const tweetId = req.params.tweetId;

      await tweet.deleteTweet(tweetId);

      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }
);

router.post("/:tweetId/bookmarks", loggedInOnly, async (req, res, next) => {
  try {
    const userId = req.userId;
    const tweetId = req.params.tweetId;

    const newBookmark = await bookmark.bookmark(userId, tweetId);
    res.status(201).json(newBookmark);
  } catch (e) {
    next(e);
  }
});

router.delete("/:tweetId/bookmarks", loggedInOnly, async (req, res, next) => {
  try {
    const userId = req.userId;
    const tweetId = req.params.tweetId;

    await bookmark.unbookmark(userId, tweetId);

    res.status(204).json();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
