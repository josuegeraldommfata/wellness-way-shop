const Banner = require('../models/Banner');

const getBanners = async (req, res) => {
  try {
    const where = req.query.active === 'true' ? { isActive: true } : {};
    const banners = await Banner.findAll({ where, order: [['order', 'ASC']] });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBanner = async (req, res) => {
  try {
    const maxOrder = await Banner.max('order') || 0;
    const banner = await Banner.create({ ...req.body, order: maxOrder + 1 });
    res.status(201).json(banner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBanner = async (req, res) => {
  try {
    const [updated] = await Banner.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const banner = await Banner.findByPk(req.params.id);
      res.json(banner);
    } else {
      res.status(404).json({ message: 'Banner não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBanner = async (req, res) => {
  try {
    const deleted = await Banner.destroy({ where: { id: req.params.id } });
    if (deleted) res.json({ message: 'Banner removido' });
    else res.status(404).json({ message: 'Banner não encontrado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const reorderBanners = async (req, res) => {
  try {
    const { orderedIds } = req.body;
    for (let i = 0; i < orderedIds.length; i++) {
      await Banner.update({ order: i }, { where: { id: orderedIds[i] } });
    }
    const banners = await Banner.findAll({ order: [['order', 'ASC']] });
    res.json(banners);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getBanners, createBanner, updateBanner, deleteBanner, reorderBanners };
