const express = require("express");
const app = express();
const port = 3000;

let toDoLists = [];

app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", {
    toDoListTitle: "오늘의 할 일 : " + toDoLists.length,
    toDoLists: toDoLists,
  });
});

app.post("/add_list", (req, res) => {
  const newContent = req.body.content;
  console.log(newContent + " 추가");
  toDoLists.push(newContent);
  res.redirect("/");
});

app.get("/delete_list/:id", (req, res) => {
  const deleteContent = req.params.id;
  console.log(deleteContent + " 삭제");
  toDoLists = toDoLists.filter((value) => value != deleteContent);
  res.redirect("/");
});

app.get("/open_update/:id", (req, res) => {
  res.render("update", { prevContent: req.params.id });
});

app.post("/update_list", (req, res) => {
  let prevContent = req.body.prevContent;
  let newContent = req.body.newContent;
  let index = toDoLists.indexOf(prevContent);
  toDoLists.splice(index, 1, newContent);
  console.log(prevContent + "을(를)" + newContent + "(으)로 수정");
  res.redirect("/");
});

app.listen(port, () => {
  console.log("connected!");
});
