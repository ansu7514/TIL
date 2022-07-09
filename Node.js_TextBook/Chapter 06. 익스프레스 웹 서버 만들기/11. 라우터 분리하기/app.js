const express = require("express");
const path = require("path");

const indexRouter = require('./routes');
const userRouter = require('./routes/user');

const app = express();
app.set("port", process.env.PORT || 3000);

app.use((req, res, next) => {
  console.log("요청에 실행하고 싶어요");
  next();
});

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(200).send("에러났지롱. 근데 안 알려주지롱~");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});