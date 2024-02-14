const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connection");

const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
// const { restrictToLoggedInUserOnly } = require("./middleware/auth");

const app = express();
const PORT = 8001;

connectToMongoDB(
  "mongodb+srv://utkarsh750:1234@cluster0.wkygvry.mongodb.net/?retryWrites=true"
).then(() => console.log("MongoDb connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use("/url", urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
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
