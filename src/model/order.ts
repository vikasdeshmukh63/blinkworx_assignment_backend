import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../services/dbServices'

class Order extends Model {
    public id!: number
    public orderDescription!: string
    public createdAt!: Date
}

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        orderDescription: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        modelName: 'Order',
        tableName: 'ORDERS',
        timestamps: false
    }
)

export default Order
