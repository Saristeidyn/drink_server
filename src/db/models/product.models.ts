import { Column, DataType, Model, Table } from "sequelize-typescript";


// Product Table
@Table({
    tableName: 'product',
})
export class Product extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    product_name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })

    category!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    price!: number;
}