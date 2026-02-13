const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { authenticate, isAdmin } = require('../middleware/auth');

// Public - All routes are now public for simplicity
router.get('/', getProducts);
router.get('/:id', getProduct);

// Admin - No authentication required for now
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
