const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // You can choose a different port

// Middleware to parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/submit-booking', (req, res) => {
  const formData = req.body;
  console.log('Received booking data:', formData);

  // Here you would add your logic to:
  // 1. Send an email confirmation using Nodemailer
  // 2. Send an SMS confirmation using an SMS gateway library (e.g., Twilio)
  // 3. Optionally, save the booking data to a database

  res.send('Booking received! Confirmation will be sent via email and SMS.');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});