const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
} = require('../controllers/orderController');
const { authenticate, isAdmin } = require('../middleware/auth');

// Public (checkout)
router.post('/', createOrder);

// Admin (temporarily remove auth for demo)
router.get('/', getOrders);
router.get('/:id', authenticate, getOrder);
router.put('/:id', authenticate, isAdmin, updateOrderStatus);

module.exports = router;
