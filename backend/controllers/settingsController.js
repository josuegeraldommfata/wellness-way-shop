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
