import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'user',
})
export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })

    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password!: string;
}
