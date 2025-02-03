const express = require("express");
const user = require("../../../models/user.model");
const e = require("express");
const loggedInOnly = require("../../../middlewares/loggedInOnly.middleware");
const bookmark = require("../../../models/bookmark.model");

const router = express.Router();

router.post("/sign-up", async (req, res, next) => {
  try {
    //회원가입
    const { email, password, nickname, brief } = req.body;
    const newUser = user.signUp(email, password, nickname, brief);
    res.status(201).json(newUser);
  } catch (e) {
    next(e);
  }
});

router.post("/log-in", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { isCorrect, userId } = await user.checkIsEmailAndPasswordCorrect(
      email,
      password
    );
    if (!isCorrect) throw new Error();

    const accessToken = await user.createAccessToken(userId);

    res.json({ accessToken });
  } catch (e) {
    next(e);
  }
});

router.put("/", loggedInOnly, async (req, res, next) => {
  try {
    const userId = req.userId;

    const updatedUser = await user.updateProfile(userId, req.body);
    res.status(200).json(updatedUser);
  } catch (e) {
    next(e);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const userProfile = await user.getUserProfile(userId);

    res.status(200).json(userProfile);
  } catch (e) {
    next(e);
  }
});

router.get("/:userId/followings", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const result = await user.getFollowings(userId);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.get("/:userId/followers", async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const result = await user.getFollowers(userId);

    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.get("/:userId/bookmarks", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    // const user = await prisma.user.findUnique({
    //   where: { id: userId },
    //   select: {
    //     Bookmarks: { select: { tweet: { select: { content: true } } } },
    //   },
    // });

    const bookmarks = bookmark.getBookmarksOfUser(userId);
    res.json(bookmarks);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
