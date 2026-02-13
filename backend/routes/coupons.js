const express = require('express');
const router = express.Router();
const { getCoupons, validateCoupon, createCoupon, updateCoupon, deleteCoupon } = require('../controllers/couponController');
const { authenticate, isAdmin } = require('../middleware/auth');

// Public
router.post('/validate', validateCoupon);

// Admin
router.get('/', getCoupons);
router.post('/', createCoupon);
router.put('/:id', updateCoupon);
router.delete('/:id', deleteCoupon);

module.exports = router;
