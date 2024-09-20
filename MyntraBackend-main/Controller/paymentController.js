const razorpayInstance = require("../rozarpay");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const { PDFInvoice } = require('@h1dd3nsn1p3r/pdf-invoice');
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
 
    const payload = {
      company: {
          logo: "<svg>...</svg>", // Optional. SVG logo of your company.
          name: "Festrol Corp.",
          address: "1711 W. El Segundo Blvd, Hawthorne, Canada - 90250",
          phone: "Tel: (+11) 245 543 903",
          email: "Mail: hello@festrol.io",
          website: "Web: https://www.festrolcorp.io",
          taxId: "Tax ID: 1234567890", // Optional.
      },
      customer: {
          name: "John Doe",
          company: "Xero Inc.", // Optional.
          address: "1234 Main Street, New York, NY 10001",
          phone: "Tel: (555) 555-5555",
          email: "Mail: joe@example.com",
          taxId: "Tax ID: 1234567890", // Optional.
      },
      invoice: {
          number: "1721", // String or number.
          date: "25/12/2023", // Default is current date.
          dueDate: "25/12/2023", // Default is current date.
          status: "Paid!",
          currency: "€", // Default is "$",
          path: "./invoice.pdf", // Required. Path where you would like to generate the PDF file. 
      },
      items: [
          {
              name: "Cloud VPS Server - Starter Plan",
              quantity: 1,
              price: 400,
              tax: 0, // Specify tax in percentage. Default is 0.
          },
          {
              name: "Domain Registration - example.com",
              quantity: 1,
              price: 20,
              tax: 0, // Specify tax in percentage. Default is 0.
          },
          {
              name: "Maintenance Charge - Yearly",
              quantity: 1,
              price: 300,
              tax: 0, // Specify tax in percentage. Default is 0.
          },
      ],
      qr: {
          data: "https://www.festrolcorp.io",
          width: 100, // Default is 50.
      },
      note: {
          text: "Thank you for your business.",
          italic: false, // Default is true.
      }
  };
  const invoice = new PDFInvoice(payload);
  const pdfPath = await invoice.create(); // Returns the full path to the PDF file.

  // Send the PDF as a response to the client
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=Invoice_${payload.invoice.number}.pdf`);

  // Read the generated PDF and pipe it to the response
  const pdfStream = fs.createReadStream(pdfPath);
  pdfStream.pipe(res);
  // Optionally, delete the PDF after it's been served
  pdfStream.on('end', () => {
      fs.unlinkSync(pdfPath); // Delete file after serving
  });
  } catch (error) {
    console.error("Error generating receipt: ", error);
    res.status(500).send('Error generating receipt');
  }
}