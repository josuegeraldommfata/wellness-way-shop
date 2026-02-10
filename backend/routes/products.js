const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// Rotas públicas
router.get('/', getProducts);
router.get('/:id', getProduct);

// Rotas privadas (futuramente com middleware de autenticação)
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
