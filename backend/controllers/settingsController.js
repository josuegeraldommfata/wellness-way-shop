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
