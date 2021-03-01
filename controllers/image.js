const Clarifai = require("clarifai");

const handleimageurl = (req, res) => {
  const app = new Clarifai.App({
    apiKey: "62f61165802140128aa8974abc0af6e9",
  });

  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json("Unable to connect to Clarifai API"));
};

const handleimage = (req, res, db) => {
  const { id } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries[0]))
    .catch((err) => res.status(400).json("Error getting details"));
};

module.exports = {
  handleimageurl,
  handleimage,
};
