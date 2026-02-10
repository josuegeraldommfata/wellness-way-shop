const express = require('express');
const router = express.Router();
const { getCoupons, validateCoupon, createCoupon, updateCoupon, deleteCoupon } = require('../controllers/couponController');
const { authenticate, isAdmin } = require('../middleware/auth');

// Public
router.post('/validate', validateCoupon);

// Admin
router.get('/', authenticate, isAdmin, getCoupons);
router.post('/', authenticate, isAdmin, createCoupon);
router.put('/:id', authenticate, isAdmin, updateCoupon);
router.delete('/:id', authenticate, isAdmin, deleteCoupon);

module.exports = router;
