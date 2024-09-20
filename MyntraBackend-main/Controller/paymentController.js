const razorpayInstance = require("../rozarpay");
const PDFDocument = require('pdfkit');
const fs = require('fs');
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

exports.DownloadReciept =  async (req, res) => {
  const payment_id = req.query.payment_id;
  console.log(payment_id)
  try {
    // Fetch payment details from Razorpay
    const paymentDetails = await razorpayInstance.payments.fetch(payment_id);

    // Create a new PDF document
    const doc = new PDFDocument();

    // Set response headers to indicate a file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Receipt_${payment_id}.pdf`);

    // Pipe the document to the response (this will send the PDF as a stream)
    doc.pipe(res);

    // Add content to the PDF
    doc.fontSize(25).text('Payment Receipt', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Payment ID: ${paymentDetails.id}`);
    doc.text(`Amount: ₹${paymentDetails.amount / 100}`);
    doc.text(`Currency: ${paymentDetails.currency}`);
    doc.text(`Status: ${paymentDetails.status}`);
    doc.text(`Order ID: ${paymentDetails.order_id}`);
    doc.text(`Email: ${paymentDetails.email}`);
    doc.text(`Contact: ${paymentDetails.contact}`);
    doc.text(`Payment Method: ${paymentDetails.method}`);

    // Finalize the PDF and end the stream
    doc.end();
  } catch (error) {
    console.error("Error generating receipt: ", error);
    res.status(500).send('Error generating receipt');
  }
}