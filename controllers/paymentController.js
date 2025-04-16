const express = require('express');
require('dotenv').config();
const stripe = require('stripe')(process.env.PAYMENT_SECRET_KEY); 
exports.Payment =async (req, res) => {
    const { amount, currency, token } = req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method: token,
        confirm: true,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never'
        }
      });
  
      res.json({ status: paymentIntent.status });
    } catch (error) {
      console.error('Stripe error:', error);
      res.status(500).json({ error: error.message });
    }
  }