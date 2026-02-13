const SiteSettings = require('../models/SiteSettings');
const PaymentMethod = require('../models/PaymentMethod');
const fs = require('fs');
const path = require('path');

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
    const { id } = req.params;
    const { config, enabled } = req.body;

    // Atualizar no banco
    const [updated] = await PaymentMethod.update(
      { config, enabled },
      { where: { id } }
    );

    if (updated) {
      const method = await PaymentMethod.findByPk(id);

      // Atualizar variáveis de ambiente se for uma chave API
      if (config) {
        const envPath = path.join(__dirname, '..', '..', '.env');
        let envContent = '';

        try {
          envContent = fs.readFileSync(envPath, 'utf8');
        } catch (error) {
          // Arquivo .env não existe, criar
          envContent = '';
        }

        const lines = envContent.split('\n');
        let updatedLines = [];
        let keyUpdated = false;

        // Mapeamento de tipos para variáveis de ambiente
        const envMapping = {
          mercadopago: ['MERCADO_PAGO_ACCESS_TOKEN', 'MERCADO_PAGO_PUBLIC_KEY'],
          pix: ['PIX_KEY', 'PIX_NAME'],
          stripe: ['STRIPE_SECRET_KEY', 'STRIPE_PUBLISHABLE_KEY'],
          paypal: ['PAYPAL_CLIENT_ID', 'PAYPAL_CLIENT_SECRET', 'PAYPAL_MODE'],
          pagseguro: ['PAGSEGURO_EMAIL', 'PAGSEGURO_TOKEN'],
          melhorenvio: ['MELHOR_ENVIO_TOKEN', 'MELHOR_ENVIO_SANDBOX']
        };

        const envKeys = envMapping[method.type] || [];

        for (const line of lines) {
          if (line.trim() === '' || line.startsWith('#')) {
            updatedLines.push(line);
            continue;
          }

          const [key] = line.split('=');
          if (envKeys.includes(key)) {
            // Atualizar valor da chave API
            const configKey = key.toLowerCase().replace(/_/g, '');
            if (config[configKey]) {
              updatedLines.push(`${key}=${config[configKey]}`);
              keyUpdated = true;
            } else {
              updatedLines.push(line);
            }
          } else {
            updatedLines.push(line);
          }
        }

        // Adicionar novas chaves se não existirem
        for (const envKey of envKeys) {
          const configKey = envKey.toLowerCase().replace(/_/g, '');
          if (config[configKey] && !keyUpdated) {
            updatedLines.push(`${envKey}=${config[configKey]}`);
          }
        }

        // Escrever arquivo .env
        fs.writeFileSync(envPath, updatedLines.join('\n'));

        // Recarregar variáveis de ambiente (simulação - em produção reiniciar servidor)
        require('dotenv').config({ path: envPath, override: true });
      }

      res.json(method);
    } else {
      res.status(404).json({ message: 'Método de pagamento não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao atualizar método de pagamento:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update shipping settings
const updateShippingSettings = async (req, res) => {
  try {
    const { id } = req.params;
    const { config, enabled } = req.body;

    // Atualizar variáveis de ambiente se for uma chave API
    if (config) {
      const envPath = path.join(__dirname, '..', '..', '.env');
      let envContent = '';

      try {
        envContent = fs.readFileSync(envPath, 'utf8');
      } catch (error) {
        // Arquivo .env não existe, criar
        envContent = '';
      }

      const lines = envContent.split('\n');
      let updatedLines = [];
      let keyUpdated = false;

      // Mapeamento de tipos para variáveis de ambiente
      const envMapping = {
        melhor_envio: ['MELHOR_ENVIO_TOKEN', 'MELHOR_ENVIO_SANDBOX'],
        jadlog: ['JADLOG_API_KEY', 'JADLOG_SANDBOX'],
        azul_cargo: ['AZUL_CARGO_CLIENT_ID', 'AZUL_CARGO_CLIENT_SECRET', 'AZUL_CARGO_SANDBOX'],
        loggi: ['LOGGI_API_KEY', 'LOGGI_SANDBOX'],
        total_express: ['TOTAL_EXPRESS_USERNAME', 'TOTAL_EXPRESS_PASSWORD', 'TOTAL_EXPRESS_SANDBOX']
      };

      const envKeys = envMapping[id] || [];

      for (const line of lines) {
        if (line.trim() === '' || line.startsWith('#')) {
          updatedLines.push(line);
          continue;
        }

        const [key] = line.split('=');
        if (envKeys.includes(key)) {
          // Atualizar valor da chave API
          const configKey = key.toLowerCase().replace(/_/g, '');
          if (config[configKey]) {
            updatedLines.push(`${key}=${config[configKey]}`);
            keyUpdated = true;
          } else {
            updatedLines.push(line);
          }
        } else {
          updatedLines.push(line);
        }
      }

      // Adicionar novas chaves se não existirem
      for (const envKey of envKeys) {
        const configKey = envKey.toLowerCase().replace(/_/g, '');
        if (config[configKey] && !keyUpdated) {
          updatedLines.push(`${envKey}=${config[configKey]}`);
        }
      }

      // Escrever arquivo .env
      fs.writeFileSync(envPath, updatedLines.join('\n'));

      // Recarregar variáveis de ambiente
      require('dotenv').config({ path: envPath, override: true });
    }

    res.json({ message: 'Configurações de envio atualizadas', id, config, enabled });
  } catch (error) {
    console.error('Erro ao atualizar configurações de envio:', error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getSettings, updateSettings, getPaymentMethods, updatePaymentMethod, updateShippingSettings };
