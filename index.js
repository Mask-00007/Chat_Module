const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.models.js");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

main()
  .then(() => {
    console.log(`connection successful`);
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/chatModule");
}

// let chat1 = new Chat({
//   from: "Neha",
//   to: "Priya",
//   msg: "send me your exam sheets",
//   createdAt: new Date(),
// });

// chat1
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// * INDEX ROUTE
app.get("/chats", async (req, res) => {
  let allChats = await Chat.find();
  //   console.log(allChats);
  res.render("index.ejs", { allChats });
});

// * NEW ROUTE
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// *  CREATE ROUTE
app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    createdAt: new Date(),
  });
  //   console.log(newChat);
  newChat
    .save()
    .then((res) => {
      console.log(`Chat was saved`);
    })
    .catch((err) => {
      console.log(err);
    });

  res.redirect("/chats");
});

// * EDIT ROUTE
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

// * UPDATE ROUTE
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, new: true },
  );

  console.log(updatedChat);
  res.redirect("/chats");
});

// * DESTROY ROUTE
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let chatToBeDeleted = await Chat.findByIdAndDelete(id);
  console.log(chatToBeDeleted);
  res.redirect("/chats");
});

app.get("/", (req, res) => {
  res.send(`Root is working`);
});

app.listen(8080, () => {
  console.log(`App is listening on the port 8080`);
});
