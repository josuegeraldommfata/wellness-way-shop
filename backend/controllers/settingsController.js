<<<<<<< HEAD
const Settings = require('../models/Settings');

// Get all settings
const getSettings = async (req, res) => {
  try {
    const settings = await Settings.findAll();
    const settingsObj = {};
    settings.forEach(setting => {
      settingsObj[setting.key] = setting.value;
    });
    res.json(settingsObj);
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Update settings
const updateSettings = async (req, res) => {
  try {
    const updates = req.body;
    const results = [];

    for (const [key, value] of Object.entries(updates)) {
      const [setting, created] = await Settings.upsert({
        key,
        value
      });
      results.push({ key, value, created });
    }

    res.json({ message: 'Configurações atualizadas', results });
  } catch (error) {
    console.error('Erro ao atualizar configurações:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Get specific setting
const getSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const setting = await Settings.findOne({ where: { key } });
    if (setting) {
      res.json({ key: setting.key, value: setting.value });
    } else {
      res.status(404).json({ error: 'Configuração não encontrada' });
    }
  } catch (error) {
    console.error('Erro ao buscar configuração:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  getSettings,
  updateSettings,
  getSetting
};
=======
const SiteSettings = require('../models/SiteSettings');
const PaymentMethod = require('../models/PaymentMethod');

// @desc    Get all settings as key-value object
const getSettings = async (req, res) => {
  try {
    const settings = await SiteSettings.findAll();
    const obj = {};
    settings.forEach(s => { obj[s.key] = s.value; });
    res.json(obj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update settings (batch upsert)
const updateSettings = async (req, res) => {
  try {
    const entries = Object.entries(req.body);
    for (const [key, value] of entries) {
      await SiteSettings.upsert({ key, value: String(value) });
    }
    const settings = await SiteSettings.findAll();
    const obj = {};
    settings.forEach(s => { obj[s.key] = s.value; });
    res.json(obj);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get payment methods
const getPaymentMethods = async (req, res) => {
  try {
    const methods = await PaymentMethod.findAll({ order: [['id', 'ASC']] });
    res.json(methods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update payment method
const updatePaymentMethod = async (req, res) => {
  try {
    const [updated] = await PaymentMethod.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const method = await PaymentMethod.findByPk(req.params.id);
      res.json(method);
    } else {
      res.status(404).json({ message: 'Método de pagamento não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getSettings, updateSettings, getPaymentMethods, updatePaymentMethod };
>>>>>>> 70ab85a8481c702efc6abb426abf5bb27a8da4f1
