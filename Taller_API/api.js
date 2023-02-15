const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
let db = "";

app.use(express.json());
// app.use(cors());

app.get("/API/1", async (req, res) => {
  console.log("entrar");
  try {
    const response = await db
      .collection("companies")
      .find({ email_address: { $regex: "@twitter.com" } })
      .limit(15)
      .toArray();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(400).json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/API/2", async (req, res) => {
  console.log("entrar");
  try {
    const response = await db
      .collection("companies")
      .find({ founded_year: { $gte: 2005, $lte: 2008 } })
      .limit(15)
      .toArray();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(400).json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/api/3", async (req, res) => {
  const result = await db
    .collection("companies")
    .find({
      name: { $eq: "Technorati" },
    })
    .limit(10)
    .toArray();
  res.send(result);
});

app.get("/api/4", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({
        $and: [{ category_code: "advertising" }, { founded_year: 2002 }],
      })
      .limit(10)
      .toArray();

    res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/api/5", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({
        $or: [{ category_code: "messaging" }, { category_code: "games_video" }],
      })
      .sort({ founded_year: 1 })
      .limit(300)
      .toArray();
    res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/api/7", async (req, res) => {
  try {
    console.log(req.query);
    const founded = parseInt(req.query.founded_year);

    const result = await db
      .collection("companies")
      .find({ founded_year: founded })
      .limit(10)
      .toArray();

    res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

app.post("/api/8", async (req, res) => {
  try {
    console.log(req.body);
    const result = await db
      .collection("companies")
      .find(req.body)
      .limit(10)
      .toArray();

    res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

mongoose
  .connect(
    "mongodb+srv://Feralex:Mathi-3109@cluster0.to6x330.mongodb.net/sample_training?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("conectadome a la BD");
    db = mongoose.connection.db;
  })
  .catch(() => {
    console.log("Conecction Failed!");
  })
  .finally(() => {
    console.log("Request Finished");
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
