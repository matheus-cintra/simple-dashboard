import { config } from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import database from '../config/database';
import routes from './routes';

config();

const server = express();

database();

server.use(cors());
server.use(helmet());
server.use(morgan('dev'));
server.use(express.json());
// server.use(express.urlencoded({ extended: true }));

routes(server);

export default server;
