const Order = require('../models/Order');

// ENUMS válidos (igual ao model)
const VALID_STATUS = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];
const VALID_PAYMENT_METHODS = ['stripe',
  'mercadopago',
  'pagseguro',
  'paypal',
  'pix',
  'credit_card',
  'boleto'];

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
  try {
    let { items, subtotal, discount, total, paymentMethod, userInfo, coupon } = req.body;

    // Garantir que items seja array
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Itens inválidos' });
    }

    // Garantir que números sejam números
    subtotal = Number(subtotal);
    discount = Number(discount || 0);
    total = Number(total);

    if (isNaN(total) || total <= 0) {
      return res.status(400).json({ message: 'Total inválido' });
    }

    if (isNaN(subtotal) || subtotal <= 0) {
      subtotal = total;
    }

    // Validar método de pagamento
    if (!paymentMethod || !VALID_PAYMENT_METHODS.includes(paymentMethod)) {
      return res.status(400).json({ message: 'Forma de pagamento inválida' });
    }

    // Validar dados do cliente
    if (!userInfo || typeof userInfo !== 'object') {
      return res.status(400).json({ message: 'Dados do cliente inválidos' });
    }

    if (!userInfo.name || !userInfo.email) {
      return res.status(400).json({ message: 'Dados do cliente incompletos' });
    }

    const order = await Order.create({
      items,
      subtotal,
      discount,
      total,
      paymentMethod,
      userInfo,
      coupon: coupon || null,
      status: 'pending',
    });

    res.status(201).json(order);

  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(400).json({ message: error.message || 'Erro ao criar pedido' });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Public
const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      order: [['createdAt', 'DESC']],
    });

    if (!orders || orders.length === 0) {
      const mockOrders = [
        {
          id: 1,
          items: [
            { productName: "MOUNJARO 15mg (Lilly)", quantity: 1, price: 3300 }
          ],
          subtotal: 3300,
          discount: 0,
          total: 3300,
          status: "pending",
          paymentMethod: "mercadopago",
          userInfo: {
            name: "João Silva",
            email: "joao@email.com",
            phone: "(11) 99999-9999",
            address: "Rua das Flores, 123 - São Paulo, SP"
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: 2,
          items: [
            { productName: "TG - 15mg (Indufar)", quantity: 2, price: 1800 }
          ],
          subtotal: 3600,
          discount: 0,
          total: 3600,
          status: "pending",
          paymentMethod: "stripe",
          userInfo: {
            name: "Maria Santos",
            email: "maria@email.com",
            phone: "(21) 98888-8888",
            address: "Av. Copacabana, 456 - Rio de Janeiro, RJ"
          },
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 86400000).toISOString()
        }
      ];

      return res.json(mockOrders);
    }

    res.json(orders);

  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Public
const getOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    res.json(order);

  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private
const updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentId } = req.body;

    if (!status || !VALID_STATUS.includes(status)) {
      return res.status(400).json({ message: 'Status inválido' });
    }

    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    order.status = status;

    if (paymentId) {
      order.paymentId = paymentId;
    }

    await order.save();

    res.json(order);

  } catch (error) {
    console.error('Erro ao atualizar pedido:', error);
    res.status(400).json({ message: error.message || 'Erro ao atualizar pedido' });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
};
