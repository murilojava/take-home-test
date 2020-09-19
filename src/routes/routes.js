
const express = require('express')
const routes = express();

routes.get("/healt", (req, res) => res.json("ok"));

module.exports = routes;