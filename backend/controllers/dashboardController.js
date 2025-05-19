import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

export const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([{ $group: { _id: null, total: { $sum: "$total" }}}]);
    const totalProducts = await Product.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'customer' });

    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).populate('user');

    const topProducts = await Product.find().sort({ sold: -1 }).limit(5);

    res.json({
      stats: {
        orders: totalOrders,
        revenue: totalRevenue[0]?.total || 0,
        products: totalProducts,
        customers: totalCustomers,
      },
      recentOrders,
      topProducts,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard data", error });
  }
};
