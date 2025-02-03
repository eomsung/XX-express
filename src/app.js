require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const routes = require("./controllers/routes");
const authMiddleware = require("./middlewares/auth.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();
const PORT = 5050;

app.use(morgan("combined")); // 로거거
app.use(authMiddleware);
app.use(express.json());
app.use(routes);

app.use(errorMiddleware);

app.get("/health-check", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, () => {
  console.log("server started to listen at 5050...");
});
