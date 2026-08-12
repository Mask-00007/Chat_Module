const mongoose = require("mongoose");
const Chat = require("./models/chat.models.js");

main()
  .then(() => {
    console.log(`connection successful`);
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/chatModule");
}

// Chat.insertMany([
//   {
//     from: "Neha",
//     to: "Priya",
//     msg: "send me your exam sheets",
//     createdAt: new Date(),
//   },
// ]);

let inputs = [
  {
    from: "Arjun",
    to: "Meera",
    msg: "Can you send me the lecture slides?",
    createdAt: new Date(),
  },

  {
    from: "Kavya",
    to: "Sahil",
    msg: "Don't forget the group meeting at 5 PM.",
    createdAt: new Date(),
  },

  {
    from: "Rohit",
    to: "Sneha",
    msg: "I’ll share the code repo link soon.",
    createdAt: new Date(),
  },

  {
    from: "Anjali",
    to: "Rahul",
    msg: "Thanks for helping with the assignment!",
    createdAt: new Date(),
  },

  {
    from: "Vikram",
    to: "Neha",
    msg: "Can you review my essay draft?",
    createdAt: new Date(),
  },
];

Chat.insertMany(inputs);
