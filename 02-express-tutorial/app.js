const express = require("express"); //imports express library
const app = express(); // creates the app (AKA app engine) that handles everything
const { products } = require("./data");

// req => middleware => res

app.use(express.static("./public")); // serve files from the public folder here

// (app.get / app.post) will go here eventually
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

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

app.all("*", (req, res) => {
  res.status(404).send("Page not found"); // if none of the middleware or routes match, like if it doesn't find the files, respond with 404 here
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000..."); //turns it "on" so it can listen and take requests from the browser
});
