const mercadopago = require('mercadopago');

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN
});

exports.createMercadoPagoPix = async (order) => {
  const payment = await mercadopago.payment.create({
    transaction_amount: order.total,
    description: `Pedido #${order.id}`,
    payment_method_id: 'pix',
    payer: {
      email: order.userInfo.email
    }
  });

  return {
    qr_code: payment.body.point_of_interaction.transaction_data.qr_code,
    qr_code_base64: payment.body.point_of_interaction.transaction_data.qr_code_base64,
  };
};
