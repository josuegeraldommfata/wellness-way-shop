const VideoTestimonial = require('../models/VideoTestimonial');

const getVideos = async (req, res) => {
  try {
    const where = req.query.active === 'true' ? { isActive: true } : {};
    const videos = await VideoTestimonial.findAll({ where, order: [['createdAt', 'DESC']] });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createVideo = async (req, res) => {
  try {
    const video = await VideoTestimonial.create(req.body);
    res.status(201).json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateVideo = async (req, res) => {
  try {
    const [updated] = await VideoTestimonial.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const video = await VideoTestimonial.findByPk(req.params.id);
      res.json(video);
    } else {
      res.status(404).json({ message: 'Vídeo não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteVideo = async (req, res) => {
  try {
    const deleted = await VideoTestimonial.destroy({ where: { id: req.params.id } });
    if (deleted) res.json({ message: 'Vídeo removido' });
    else res.status(404).json({ message: 'Vídeo não encontrado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getVideos, createVideo, updateVideo, deleteVideo };
