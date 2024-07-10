const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/mongodb");
const blogRouter = require("./router/blog");
const authRouter = require("./router/auth");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/blog", blogRouter);
app.use("/auth", authRouter);

dbConnect();

const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("app running");
});
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
