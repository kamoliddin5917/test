const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const port = process.env.PORT;
const key = process.env.SECRET_KEY;

app.use(express.json());

app.get("/", (_, res) => {
  res.json({ ok: [1, 2, 3, 4, 5, 6, 7], port, key: `key - ${key}` });
});
app.post("/signup", (req, res) => {
  try {
    const { name, password } = req.body;
    const token = jwt.sign(password, key);
    const user = { name, token };
    res.status(201).json({ user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});
app.post("/login", (req, res) => {
  try {
    const { password } = req.body;
    const token = jwt.verify(password, key);

    res.status(201).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => console.log(port));
