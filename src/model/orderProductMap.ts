import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../services/dbServices'

class OrderProductMap extends Model {
    public id!: number
    public orderId!: number
    public productId!: number
}

OrderProductMap.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'OrderProductMap',
        tableName: 'OrderProductMap',
        timestamps: false
    }
)

export default OrderProductMap
