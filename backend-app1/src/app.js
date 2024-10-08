import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { options } from './swaggerOptions';

const specs = swaggerJSDoc(options)


import taskRoutes from './routes/tasks.route'
import userRoutes from './routes/users.route'
import cookieParser from "cookie-parser";

const app = express();


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(userRoutes)
app.use(taskRoutes)

app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

export default app;