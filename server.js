//  http req (frontend, fetch(http:3333)) ->  server.js

// app.js (figre out the route ->
// controller handles res logic

const app = require("./app");
const port = process.env.PORT || 3333;

app.get("/", (req, res) => {
  res.send("Welcome to Budget App");
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
