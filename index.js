const express = require("express");

const { connectToMongoDB } = require("./connection");

const urlRoute = require("./routes/url");
const app = express();

const PORT = 8001;

connectToMongoDB(
  "mongodb+srv://utkarsh750:1234@cluster0.wkygvry.mongodb.net/?retryWrites=true&w=majority/practise"
).then(() => console.log("MongoDb connected"));

app.use("/url", urlRoute);
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
