const axios = require('axios');

exports.createPagSeguroPix = async (order) => {
  const response = await axios.post(
    'https://sandbox.api.pagseguro.com/orders',
    {
      reference_id: `pedido-${order.id}`,
      items: order.items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        unit_amount: Math.round(item.price * 100)
      })),
      charges: [{
        amount: {
          value: Math.round(order.total * 100),
          currency: "BRL"
        },
        payment_method: {
          type: "PIX"
        }
      }]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.PAGSEGURO_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data;
};
