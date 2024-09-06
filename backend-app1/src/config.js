import mysql from "mysql";
import { config as dotenv} from "dotenv";
dotenv();

export const connection = mysql.createConnection({
        host     : process.env.DATABASE_HOST || 'localhost',
        user     : process.env.DATABASE_USER || 'root',
        password : process.env.DATABASE_PASSWORD || '',
        database : process.env.DATABASE_DATABASE || 'nodedb',
    });

export const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";