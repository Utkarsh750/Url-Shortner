const express = require("express");

const { connectToMongoDB } = require("./connection");

const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();

const PORT = 8001;

connectToMongoDB(
  "mongodb+srv://utkarsh750:1234@cluster0.wkygvry.mongodb.net/?retryWrites=true"
).then(() => console.log("MongoDb connected"));

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});
app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
