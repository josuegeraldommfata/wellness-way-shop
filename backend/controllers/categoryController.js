const Category = require('../models/Category');

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { parentId: null },
      include: [{ model: Category, as: 'subCategories' }],
      order: [['name', 'ASC']],
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Category, as: 'subCategories' }],
    });
    if (!category) return res.status(404).json({ message: 'Categoria não encontrada' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const [updated] = await Category.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const cat = await Category.findByPk(req.params.id);
      res.json(cat);
    } else {
      res.status(404).json({ message: 'Categoria não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.destroy({ where: { id: req.params.id } });
    if (deleted) res.json({ message: 'Categoria removida' });
    else res.status(404).json({ message: 'Categoria não encontrada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCategories, getCategory, createCategory, updateCategory, deleteCategory };
