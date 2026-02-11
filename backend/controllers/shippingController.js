const axios = require('axios');

// Função para calcular frete Melhor Envio
async function calculateMelhorEnvio(data, config) {
  try {
    const baseUrl = config.sandboxMode === 'true'
      ? 'https://sandbox.melhorenvio.com.br'
      : 'https://api.melhorenvio.com.br';

    const response = await axios.post(`${baseUrl}/api/v2/me/shipment/calculate`, {
      from: { postal_code: data.origin.postalCode },
      to: { postal_code: data.destination.postalCode },
      package: {
        weight: data.package.weight,
        width: data.package.width,
        height: data.package.height,
        length: data.package.length
      }
    }, {
      headers: {
        'Authorization': `Bearer ${config.token}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro Melhor Envio:', error.message);
    return null;
  }
}

// Placeholder para JadLog
async function calculateJadlog(data, config) {
  // Implementar integração real com JadLog API
  // Placeholder: retornar opções fictícias
  return [
    {
      name: 'JadLog Express',
      price: 25.50,
      deadline: 2,
      company: { name: 'JadLog' }
    },
    {
      name: 'JadLog Standard',
      price: 18.90,
      deadline: 4,
      company: { name: 'JadLog' }
    }
  ];
}

// Placeholder para Azul Cargo
async function calculateAzulCargo(data, config) {
  // Implementar integração real com Azul Cargo API
  return [
    {
      name: 'Azul Cargo Express',
      price: 30.00,
      deadline: 3,
      company: { name: 'Azul Cargo' }
    }
  ];
}

// Placeholder para Loggi
async function calculateLoggi(data, config) {
  // Implementar integração real com Loggi API
  return [
    {
      name: 'Loggi Same Day',
      price: 22.00,
      deadline: 1,
      company: { name: 'Loggi' }
    }
  ];
}

// Placeholder para Total Express
async function calculateTotalExpress(data, config) {
  // Implementar integração real com Total Express API
  return [
    {
      name: 'Total Express Standard',
      price: 20.50,
      deadline: 3,
      company: { name: 'Total Express' }
    }
  ];
}

// Controller principal
const calculateShipping = async (req, res) => {
  const { origin, destination, package: pkg } = req.body;

  if (!origin || !destination || !pkg) {
    return res.status(400).json({ error: 'Dados incompletos: origin, destination e package são obrigatórios' });
  }

  // Usar integrações do backend (em produção, buscar do banco)
  const shippingIntegrations = [
    {
      id: "ship-1",
      name: "Melhor Envio",
      type: "melhor_envio",
      enabled: true,
      config: {
        token: process.env.MELHOR_ENVIO_TOKEN || "",
        sandboxMode: "true",
      },
    },
    {
      id: "ship-3",
      name: "JadLog",
      type: "jadlog",
      enabled: false,
      config: {
        apiKey: "",
        sandboxMode: "true",
      },
    },
    {
      id: "ship-4",
      name: "Azul Cargo",
      type: "azul_cargo",
      enabled: false,
      config: {
        clientId: "",
        clientSecret: "",
        sandboxMode: "true",
      },
    },
    {
      id: "ship-5",
      name: "Loggi",
      type: "loggi",
      enabled: false,
      config: {
        apiKey: "",
        sandboxMode: "true",
      },
    },
    {
      id: "ship-6",
      name: "Total Express",
      type: "total_express",
      enabled: false,
      config: {
        username: "",
        password: "",
        sandboxMode: "true",
      },
    },
  ];

  const results = [];

  for (const integration of shippingIntegrations) {
    if (integration.enabled) {
      let options = null;

      const data = { origin, destination, package: pkg };

      if (integration.type === 'melhor_envio') {
        options = await calculateMelhorEnvio(data, integration.config);
      } else if (integration.type === 'jadlog') {
        options = await calculateJadlog(data, integration.config);
      } else if (integration.type === 'azul_cargo') {
        options = await calculateAzulCargo(data, integration.config);
      } else if (integration.type === 'loggi') {
        options = await calculateLoggi(data, integration.config);
      } else if (integration.type === 'total_express') {
        options = await calculateTotalExpress(data, integration.config);
      }

      if (options) {
        results.push({
          provider: integration.name,
          options: Array.isArray(options) ? options : [options]
        });
      }
    }
  }

  res.json({ shippingOptions: results });
};

module.exports = {
  calculateShipping
};
