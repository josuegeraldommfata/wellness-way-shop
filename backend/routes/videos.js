const express = require('express');
const router = express.Router();
const { getVideos, createVideo, updateVideo, deleteVideo } = require('../controllers/videoController');
const { authenticate, isAdmin } = require('../middleware/auth');

router.get('/', getVideos);
router.post('/', authenticate, isAdmin, createVideo);
router.put('/:id', authenticate, isAdmin, updateVideo);
router.delete('/:id', authenticate, isAdmin, deleteVideo);

module.exports = router;
