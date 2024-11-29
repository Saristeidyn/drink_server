import { Column, DataType, Model, Table } from "sequelize-typescript";

// CATEGORY
@Table({
    tableName: 'category',
})
export class Category extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    category!: string;
}