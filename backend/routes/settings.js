const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { getSettings, updateSettings, getSetting } = require('../controllers/settingsController');

router.get('/', getSettings);
router.put('/', updateSettings);
router.get('/:key', getSetting);
=======
const { getSettings, updateSettings, getPaymentMethods, updatePaymentMethod } = require('../controllers/settingsController');
const { authenticate, isAdmin } = require('../middleware/auth');

// Public (frontend needs settings)
router.get('/', getSettings);

// Admin only
router.put('/', authenticate, isAdmin, updateSettings);
router.get('/payments', authenticate, isAdmin, getPaymentMethods);
router.put('/payments/:id', authenticate, isAdmin, updatePaymentMethod);
>>>>>>> 70ab85a8481c702efc6abb426abf5bb27a8da4f1

module.exports = router;
