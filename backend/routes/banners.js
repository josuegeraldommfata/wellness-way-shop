const express = require('express');
const router = express.Router();
const { getBanners, createBanner, updateBanner, deleteBanner, reorderBanners } = require('../controllers/bannerController');
const { authenticate, isAdmin } = require('../middleware/auth');

router.get('/', getBanners);
router.post('/', authenticate, isAdmin, createBanner);
router.put('/reorder', authenticate, isAdmin, reorderBanners);
router.put('/:id', authenticate, isAdmin, updateBanner);
router.delete('/:id', authenticate, isAdmin, deleteBanner);

module.exports = router;
