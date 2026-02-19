const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET);

exports.createStripeCheckout = async (order) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: order.items.map(item => ({
      price_data: {
        currency: 'brl',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: `http://localhost:8080/success`,
    cancel_url: `http://localhost:8080/cancel`,
  });

  return session;
};
