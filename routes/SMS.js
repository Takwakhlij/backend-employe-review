const express = require('express');
const router = express.Router();
const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;

const client = twilio(accountSid, authToken);

//  Route pour envoyer l'OTP
router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  try {
    const verification = await client.verify.v2.services(verifySid)
      .verifications
      .create({ to: phone, channel: 'sms' });
    res.status(200).json({ status: verification.status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//  Route pour vérifier l'OTP
router.post('/verify-otp', async (req, res) => {
  const { phone, code } = req.body;
  try {
    const verificationCheck = await client.verify.v2.services(verifySid)
      .verificationChecks
      .create({ to: phone, code });
    res.status(200).json({ status: verificationCheck.status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
