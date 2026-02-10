const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const mercadopago = require('mercadopago');
const paypal = require('paypal-rest-sdk');

// Configurar Mercado Pago (só se houver token)
if (process.env.MERCADO_PAGO_ACCESS_TOKEN && !process.env.MERCADO_PAGO_ACCESS_TOKEN.startsWith('dummy')) {
  mercadopago.configure({
    access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
  });
}

// Configurar PayPal (só se houver credenciais)
if (process.env.PAYPAL_CLIENT_ID && !process.env.PAYPAL_CLIENT_ID.startsWith('dummy')) {
  paypal.configure({
    mode: process.env.PAYPAL_MODE || 'sandbox',
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET,
  });
}

// @desc    Create Stripe checkout session
// @route   POST /api/payments/stripe
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
        unit_amount: Math.round(item.product.price * 100),
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
      shipping_address_collection: { allowed_countries: ['BR'] },
      phone_number_collection: { enabled: true },
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe Error:', error.message);
    res.status(500).json({ message: 'Stripe não configurado ou erro na criação da sessão' });
  }
};

// @desc    Create Mercado Pago preference
// @route   POST /api/payments/mercadopago
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
      payment_methods: { installments: 12, default_installments: 1 },
      back_urls: { success: successUrl, failure: failureUrl, pending: pendingUrl },
      auto_return: 'approved',
      external_reference: `order_${Date.now()}`,
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({
      preferenceId: response.body.id,
      url: response.body.init_point,
      sandbox_init_point: response.body.sandbox_init_point,
    });
  } catch (error) {
    console.error('MercadoPago Error:', error.message);
    res.status(500).json({ message: 'Mercado Pago não configurado ou erro na criação' });
  }
};

// @desc    Create PagSeguro payment (placeholder - requer SDK oficial para produção)
// @route   POST /api/payments/pagseguro
const createPagSeguroPayment = async (req, res) => {
  try {
    const { items, total } = req.body;

    // PagSeguro não possui SDK npm oficial moderno
    // Em produção, usar a API REST v4 diretamente
    // https://dev.pagseguro.uol.com.br/reference/api-checkout
    res.json({
      message: 'PagSeguro pré-configurado. Configure as chaves de API no painel admin para ativar.',
      reference: `order_${Date.now()}`,
      total,
      itemCount: items ? items.length : 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create PayPal order
// @route   POST /api/payments/paypal
const createPayPalOrder = async (req, res) => {
  try {
    const { items, total, successUrl, cancelUrl } = req.body;

    const create_payment_json = {
      intent: 'sale',
      payer: { payment_method: 'paypal' },
      redirect_urls: { return_url: successUrl, cancel_url: cancelUrl },
      transactions: [{
        item_list: {
          items: items.map(item => ({
            name: item.product.name,
            sku: String(item.product.id),
            price: item.product.price.toFixed(2),
            currency: 'BRL',
            quantity: item.quantity,
          })),
        },
        amount: { currency: 'BRL', total: total.toFixed(2) },
        description: 'Compra na LipoImports',
      }],
    };

    paypal.payment.create(create_payment_json, (error, payment) => {
      if (error) {
        console.error('PayPal Error:', error.message);
        return res.status(500).json({ message: 'PayPal não configurado ou erro na criação' });
      }
      const approvalUrl = payment.links.find(link => link.rel === 'approval_url');
      res.json({
        paymentId: payment.id,
        approvalUrl: approvalUrl ? approvalUrl.href : null,
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createStripeSession,
  createMercadoPagoPreference,
  createPagSeguroPayment,
  createPayPalOrder,
};
