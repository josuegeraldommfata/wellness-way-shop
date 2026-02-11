const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const { MercadoPago } = require('mercadopago');
const paypal = require('paypal-rest-sdk');

// // Configurar Mercado Pago
// const mpClient = new MercadoPago({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN });

// Configurar PayPal
paypal.configure({
  mode: 'live', // Produção - alterar para 'sandbox' se necessário
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

// @desc    Create Stripe checkout session
// @route   POST /api/payments/stripe
// @access  Public
const createStripeSession = async (req, res) => {
  try {
    const { items, successUrl, cancelUrl } = req.body;

    const lineItems = items.map(item => ({
      price_data: {
        currency: 'brl',
        product_data: {
          name: item.product.name,
          images: item.product.images,
        },
        unit_amount: Math.round(item.product.price * 100), // Stripe usa centavos
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['BR'],
      },
      phone_number_collection: {
        enabled: true,
      },
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create Mercado Pago preference
// @route   POST /api/payments/mercadopago
// @access  Public
const createMercadoPagoPreference = async (req, res) => {
  try {
    const { items, successUrl, failureUrl, pendingUrl } = req.body;

    const preference = {
      items: items.map(item => ({
        title: item.product.name,
        unit_price: item.product.price,
        quantity: item.quantity,
        currency_id: 'BRL',
      })),
      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 12,
        default_installments: 1,
      },
      back_urls: {
        success: successUrl,
        failure: failureUrl,
        pending: pendingUrl,
      },
      auto_return: 'approved',
      external_reference: `order_${Date.now()}`,
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({
      preferenceId: response.body.id,
      url: response.body.init_point,
      sandbox_init_point: response.body.sandbox_init_point
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // @desc    Create PagSeguro payment
// // @route   POST /api/payments/pagseguro
// // @access  Public
// const createPagSeguroPayment = async (req, res) => {
//   try {
//     // Nota: Implementação básica. PagSeguro requer configuração específica
//     // Para produção, use o SDK oficial do PagSeguro
//     const { items, total } = req.body;

//     // Simulação - em produção, integrar com API do PagSeguro
//     const paymentData = {
//       email: process.env.PAGSEGURO_EMAIL,
//       token: process.env.PAGSEGURO_TOKEN,
//       currency: 'BRL',
//       reference: `order_${Date.now()}`,
//       items: items.map((item, index) => ({
//         id: index + 1,
//         description: item.product.name,
//         amount: item.product.price.toFixed(2),
//         quantity: item.quantity,
//       })),
//     };

//     // Aqui seria a chamada para a API do PagSeguro
//     // Por enquanto, retornar dados simulados
//     res.json({
//       paymentUrl: 'https://pagseguro.uol.com.br/v2/checkout/payment.html?code=SIMULATED_CODE',
//       code: 'SIMULATED_CODE',
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// @desc    Create PayPal order
// @route   POST /api/payments/paypal
// @access  Public
const createPayPalOrder = async (req, res) => {
  try {
    const { items, total, successUrl, cancelUrl } = req.body;

    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: successUrl,
        cancel_url: cancelUrl,
      },
      transactions: [{
        item_list: {
          items: items.map(item => ({
            name: item.product.name,
            sku: item.product.id.toString(),
            price: item.product.price.toFixed(2),
            currency: 'BRL',
            quantity: item.quantity,
          })),
        },
        amount: {
          currency: 'BRL',
          total: total.toFixed(2),
        },
        description: 'Compra na Wellness Way Shop',
      }],
    };

    paypal.payment.create(create_payment_json, (error, payment) => {
      if (error) {
        console.error('PayPal Error:', error);
        res.status(500).json({ message: error.message });
      } else {
        // Encontrar o link de aprovação
        const approvalUrl = payment.links.find(link => link.rel === 'approval_url');
        res.json({
          paymentId: payment.id,
          approvalUrl: approvalUrl ? approvalUrl.href : null,
          payment: payment
        });
      }
    });
  } catch (error) {
    console.error('PayPal Create Error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createStripeSession,
  createMercadoPagoPreference,
  createPayPalOrder,
};
