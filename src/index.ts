import express, { Request, Response } from "express";
import { envs } from './config/envs';
import { dbConnection } from "./db/init";

const app = express();

app.use(express.json());
dbConnection(); // allows to use json and get respons from json

app.get("/", async (req: Request, res: Response): Promise<any> => {
    return res.json({message:"Response to GET"})
});

app.post("/", async (req: Request, res: Response): Promise<any> => {
    const body = req.body;
    console.log(body);
    return res.json({message:"Response to POST"})
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});