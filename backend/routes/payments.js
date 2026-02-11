const express = require('express');
const router = express.Router();
const {
  createStripeSession,
  createMercadoPagoPreference,
  createPagSeguroPayment,
  createPayPalOrder,
} = require('../controllers/paymentController');

// Stripe
router.post('/stripe', createStripeSession);

// Mercado Pago
router.post('/mercadopago', createMercadoPagoPreference);

// PayPal
router.post('/paypal', createPayPalOrder);

module.exports = router;
