const razorpayInstance = require("../rozarpay");

// Create Order in Razorpay
exports.createOrder = async (req, res) => {
  console.log(req.body.amount);
  const amountInPaise = Math.round(req.body.amount * 100); 
  try {
    const options = {
      amount: amountInPaise, // amount in paise
      currency: "INR",
      receipt: "receipt#1",
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Error creating Razorpay order" });
  }
};

// Handle payment success
exports.verifyPayment = async (req, res) => {
  const crypto = require("crypto");
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const secret = "BIoxovEsncKbeYcLB7fxGARG";

  // Verify the payment signature
  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = shasum.digest("hex");

  if (digest === razorpay_signature) {
    res.status(200).json({ message: "Payment verified" });
  } else {
    res.status(400).json({ message: "Payment verification failed" });
  }
};
