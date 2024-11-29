import { Sequelize } from "sequelize-typescript";
import { Product } from "./models/product.models";
import { Category } from "./models/category.models";
import { User } from "./models/user.models";
import { envs } from "../config/envs";


export const db = new Sequelize({
    database: envs.MYSQL_DB,
    username: envs.MYSQL_USER,
    password: envs.MYSQL_PASSWORD,
    host: envs.MYSQL_HOST,
    dialect: "mysql",
    models: [User, Category, Product]
});

export const dbConnection = async () => {
    try {
        await db.sync({ force: false });
        console.log("Database connected");
    } 
    catch (error) {
        console.log("Error connecting to database", error);
        throw new Error("Error connecting to database");
    }
};