const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrder,
} = require('../controllers/orderController');

// Rotas
router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrder);
router.put('/:id', updateOrderStatus);

module.exports = router;
