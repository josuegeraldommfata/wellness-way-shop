const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
  try {
    const { items, subtotal, discount, total, paymentMethod, userInfo, coupon } = req.body;

    const order = await Order.create({
      items,
      subtotal,
      discount: discount || 0,
      total,
      paymentMethod,
      userInfo,
      coupon,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Public (futuramente privado)
const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      order: [['createdAt', 'DESC']],
    });

    // If no orders in database, return mock data for demo
    if (orders.length === 0) {
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
          paymentMethod: "pix",
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
          status: "processing",
          paymentMethod: "mercadopago",
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
// @access  Public (futuramente privado)
const getOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private
const updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentId, trackingCode } = req.body;
    const [updated] = await Order.update(
      { status, paymentId, trackingCode },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedOrder = await Order.findByPk(req.params.id);
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Pedido não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
};
