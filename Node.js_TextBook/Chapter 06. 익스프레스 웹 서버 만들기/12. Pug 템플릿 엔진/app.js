const express = require("express");
const path = require("path");

const app = express();
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", { title: "Express" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(200).send("에러났지롱. 근데 안 알려주지롱~");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
