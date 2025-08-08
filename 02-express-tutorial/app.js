const express = require("express"); //imports express library
const app = express(); // creates the app (AKA app engine) that handles everything
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { products, people } = require("./data");
const peopleRouter = require("./routes/people");
app.use("/api/v1/people", peopleRouter);

const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().toLocaleString();
  console.log(`${method} ${url} at ${time}`);
  next();
};

app.use(express.static("./methods-public"));

app.use(logger);

app.get("/api/v1/test", logger, (req, res) => {
  res.json({ message: "It worked!" });
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

// app.get("/api/v1/people", (req, res) => {
//   res.json(people);
// });

// app.post("/api/v1/people", (req, res) => {
//   if (!req.body.name) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please provide a name" });
//   }

//   people.push({
//     id: people.length + 1,
//     name: req.body.name,
//   });

//   res.status(201).json({
//     success: true,
//     name: req.body.name,
//   });
// });

app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find((p) => p.id === idToFind);
  if (!product) {
    return res.status(404).send("That product was not found.");
  }
});

app.get("/api/v1/query", (req, res) => {
  const search = req.query.search;
  const limit = req.query.limit;
  let result = products;

  if (search) {
    result = result.filter((p) => p.name.startsWith(search));
  }

  if (limit) {
    result = result.slice(0, parseInt(limit));
  }

  res.json(result);
});

app.post("/login", (req, res) => {
  const { name } = req.body;

  if (name) {
    return res.status(200).send(`Welcome, ${name}`);
  }
  res.status(401).send("Please provide credentials");
});

app.all("*", (req, res) => {
  res.status(404).send("Page not found"); // if none of the middleware or routes match, like if it doesn't find the files, respond with 404 here
});
console.log("Server is starting up...");
app.listen(3000, () => {
  console.log("Server is listening on port 3000..."); //turns it "on" so it can listen and take requests from the browser
});
