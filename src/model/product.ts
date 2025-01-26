import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../services/dbServices'

class Product extends Model {
    public id!: number
    public productName!: string
    public productDescription!: string
}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        productName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        productDescription: {
            type: DataTypes.TEXT
        }
    },
    {
        sequelize,
        modelName: 'Product',
        tableName: 'PRODUCTS',
        timestamps: false
    }
)

export default Product
