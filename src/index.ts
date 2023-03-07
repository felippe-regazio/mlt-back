import * as dotenv from 'dotenv';
dotenv.config();

import './database/connection';
import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'
import cors from 'cors';
import { routes } from './routes';

const app: Express = express();
const port = process.env.PORT;
const CORSAllowedDomains = process.env.ACCESS_CONTROL_ALLOW_ORIGIN?.split(',').map(item => item.trim());

app.set("trust proxy", 1);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: CORSAllowedDomains}));
app.use(cookieParser());

// subscribe all the routes to the app
routes(app);
// -----------------------------------

app.listen(port, () => console.log(`⚡️ Server is running at http://localhost:${port}`));
