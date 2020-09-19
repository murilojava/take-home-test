const express = require('express')
const routes = express();

const BankController = require('../controllers/bank-controller');
const bankController = new BankController();

routes.get("/healt", (req, res) => res.json("ok"));

routes.get("/balance", (req, res) => {
    const result = bankController.balance(req.query);
    return res.status(result.status).send(result.data);
})

routes.post("/reset", (req, res) => {
    const result = bankController.reset();
    return res.status(result.status).send(result.data);
})

routes.post("/event", (req, res) => {
    const result = bankController.callEvent(req.body);
    return res.status(result.status).send(result.data);
})

module.exports = routes;