const express = require("express"); //imports express library
const app = express(); // creates the app (AKA app engine) that handles everything

// req => middleware => res

app.use(express.static("./public")); // serve files from the public folder here

// (app.get / app.post) will go here eventually
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

app.all("*", (req, res) => {
  res.status(404).send("Page not found"); // if none of the middleware or routes match, like if it doesn't find the files, respond with 404 here
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000..."); //turns it "on" so it can listen and take requests from the browser
});
