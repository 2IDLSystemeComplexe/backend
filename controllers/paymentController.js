const express = require('express');
require('dotenv').config();
const stripe = require('stripe')(process.env.PAYMENT_SECRET_KEY); 
exports.Payment =async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Payment Intent error:', error);
    res.status(500).json({ error: error.message });
  }
}