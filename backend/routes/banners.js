const express = require('express');
const router = express.Router();
const { getBanners, createBanner, updateBanner, deleteBanner, reorderBanners } = require('../controllers/bannerController');
const { authenticate, isAdmin } = require('../middleware/auth');

router.get('/', getBanners);
router.post('/', createBanner);
router.put('/reorder', reorderBanners);
router.put('/:id', updateBanner);
router.delete('/:id', deleteBanner);

module.exports = router;
