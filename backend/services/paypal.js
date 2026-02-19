const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox',
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET,
});

exports.createPaypalPayment = (order) => {
  return new Promise((resolve, reject) => {
    const paymentData = {
      intent: 'sale',
      payer: { payment_method: 'paypal' },
      transactions: [{
        amount: {
          total: order.total.toFixed(2),
          currency: 'BRL'
        },
        description: `Pedido #${order.id}`
      }],
      redirect_urls: {
        return_url: 'http://localhost:8080/success',
        cancel_url: 'http://localhost:8080/cancel'
      }
    };

    paypal.payment.create(paymentData, function (error, payment) {
      if (error) reject(error);
      else resolve(payment);
    });
  });
};
