const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

// 최대한 위쪽에 작성하는 것을 추천
dotenv.config();

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use((req, res, next) => {
  console.log("요청에 실행하고 싶어요");
  next();
});

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(200).send("에러났지롱. 근데 안 알려주지롱~");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});