import Order from "./order";
import Product from "./product";
import OrderProductMap from "./orderProductMap";
import { sequelize } from '../services/dbServices';

// many to many relationship of order and product 
Order.belongsToMany(Product, {
    through: OrderProductMap,
    foreignKey: 'orderId',
    as: 'products'
});

Product.belongsToMany(Order, {
    through: OrderProductMap,
    foreignKey: 'productId',
    as: 'orders'
});

// Export models and sequelize instance for syncing
export {
    Order,
    Product,
    OrderProductMap,
    sequelize
};