const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reactarticleslist",
  {
    useMongoClient: true
  }
);

const articleSeed = [
  {
    title: "The Dead Zone",
    url: "Stephen King",
    date: new Date(Date.now())
  },
  {
    title: "Lord of the Flies",
    url: "William Golding",
    date: new Date(Date.now())
  },
  {
    title: "The Catcher in the Rye",
    url: "J.D. Salinger",
    date: new Date(Date.now())
  },
  {
    title: "The Punch Escrow",
    url: "Tal M. Klein",
    date: new Date(Date.now())
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    url: "J.K. Rowling",
    date: new Date(Date.now())
  },
  {
    title: "Coraline",
    url: "Neil Gaiman",
    date: new Date(Date.now())
  },
  {
    title: "Code: The Hidden Language of Computer Hardware and Software",
    url: "Charles Petzold",
    date: new Date(Date.now())
  },
  {
    title: "The Everything Store: Jeff Bezos and the Age of Amazon",
    url: "Brad Stone",
    date: new Date(Date.now())
  },
  {
    title: "Total Recall: My Unbelievably True Life Story",
    url: "Arnold Schwarzenegger",
    date: new Date(Date.now())
  },
  {
    title: "Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future",
    url: "Ashlee Vance",
    date: new Date(Date.now())
  },
  {
    title: "Steve Jobs",
    url: "Walter Isaacson",
    date: new Date(Date.now())
  },
  {
    title: "Astrophysics for People in a Hurry",
    url: "Neil deGrasse Tyson",
    date: new Date(Date.now())
  },
  {
    title: "1984",
    url: "George Orwell",
    date: new Date(Date.now())
  },
  {
    title: "Frankenstein",
    url: "Mary Shelley",
    date: new Date(Date.now())
  },
  {
    title: "The Great Gatsby",
    url: "F. Scott Fitzgerald",
    date: new Date(Date.now())
  },
  {
    title: "Born a Crime: Stories from a South African Childhood",
    url: "Trevor Noah",
    date: new Date(Date.now())
  }
];

db.Article
  .remove({})
  .then(() => db.Article.collection.insertMany(articleSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
