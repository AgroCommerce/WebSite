import 'dotenv/config';

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import route from './routes'

const app = express();

app.use(cors({
    origin: '*', //only in develpment in productions is your domain aplication
}));
app.use(cookieParser());

const port  = process.env.PORT || 3333;

app.use(express.json());
app.use(route);

app.listen(port, () => {
    console.log(`Acessar http://localhost:${port}`);
    console.log(`server executando na porta ${port}`);
});
