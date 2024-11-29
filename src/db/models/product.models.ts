import { Column, DataType, Model, Table } from "sequelize-typescript";


// Product Table
@Table({
    tableName: 'product',
})
export class Product extends Model {
    // name of product
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    product_name!: string;

    // category
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    category!: string;

    // price
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    price!: number;

    // How many in store
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    available!: number;
}