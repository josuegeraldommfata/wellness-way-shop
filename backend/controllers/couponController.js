const Coupon = require('../models/Coupon');

const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.findAll({ order: [['createdAt', 'DESC']] });
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const validateCoupon = async (req, res) => {
  try {
    const { code, total } = req.body;
    const coupon = await Coupon.findOne({ where: { code: code.toUpperCase(), isActive: true } });

    if (!coupon) return res.status(404).json({ message: 'Cupom não encontrado' });
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) return res.status(400).json({ message: 'Cupom expirado' });
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) return res.status(400).json({ message: 'Cupom esgotado' });
    if (total < parseFloat(coupon.minPurchase)) return res.status(400).json({ message: `Compra mínima de R$ ${coupon.minPurchase}` });

    const discount = coupon.discountType === 'percentage'
      ? (total * parseFloat(coupon.discountValue)) / 100
      : parseFloat(coupon.discountValue);

    res.json({ coupon, discount: Math.min(discount, total) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create({ ...req.body, code: req.body.code.toUpperCase() });
    res.status(201).json(coupon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCoupon = async (req, res) => {
  try {
    const [updated] = await Coupon.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const coupon = await Coupon.findByPk(req.params.id);
      res.json(coupon);
    } else {
      res.status(404).json({ message: 'Cupom não encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const deleted = await Coupon.destroy({ where: { id: req.params.id } });
    if (deleted) res.json({ message: 'Cupom removido' });
    else res.status(404).json({ message: 'Cupom não encontrado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCoupons, validateCoupon, createCoupon, updateCoupon, deleteCoupon };
