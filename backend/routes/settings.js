const express = require('express');
const router = express.Router();
const { getSettings, updateSettings, getSetting } = require('../controllers/settingsController');

router.get('/', getSettings);
router.put('/', updateSettings);
router.get('/:key', getSetting);

module.exports = router;
