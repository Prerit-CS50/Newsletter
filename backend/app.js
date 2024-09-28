const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from a .env file

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all requests

// Email subscription endpoint
app.post('/NewsletterPage', async (req, res) => {  // Change made here
  const { email } = req.body;

  // Validate email input
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required.' });
  }

  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER, // Use environment variable for email
      pass: process.env.EMAIL_PASS, // Use environment variable for password
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to DEV@Deakin!',
    text: 'Thank you for subscribing to our newsletter!',
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent to:', email); // Log success
    return res.json({ success: true, message: 'Welcome email sent!' });
  } catch (error) {
    console.error('Error sending email:', error); // Log detailed error for debugging
    return res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
});

// Start the server
const PORT = process.env.PORT || 3001; // Use PORT from environment or default to 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
