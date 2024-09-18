const express = require("express");
const { createOrder, verifyPayment } = require("../Controller/paymentController");
const { userAuth } = require("../Middleware/userAuth");

const router = express.Router();

router.post("/order", userAuth, createOrder);
router.post("/verify", userAuth, verifyPayment);

module.exports = router;
