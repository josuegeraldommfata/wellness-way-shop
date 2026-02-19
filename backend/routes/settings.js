const express = require('express');
const router = express.Router();
const { getSettings, updateSettings, getPaymentMethods, updatePaymentMethod, updateShippingSettings } = require('../controllers/settingsController');
const { authenticate, isAdmin } = require('../middleware/auth');

// Public (frontend needs settings)
router.get('/', getSettings);

// Admin only
router.put('/', updateSettings);
router.get('/payments', authenticate, isAdmin, getPaymentMethods);
router.put('/payments/:id', authenticate, isAdmin, updatePaymentMethod);
router.put('/shipping/:id', authenticate, isAdmin, updateShippingSettings);

module.exports = router;
