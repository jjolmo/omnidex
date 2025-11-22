import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, {Request, Response, NextFunction} from 'express';
import logger from 'jet-logger';
import cors from 'cors';
import subdomain from 'express-subdomain';

import 'express-async-errors';

import BaseRouter from '@src/routes';

import EnvVars from '@src/common/EnvVars';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import {RouteError} from '@src/common/classes';
import {NodeEnvs} from '@src/common/misc';
import client from 'prom-client';

const app = express();

// Configure Express to trust proxy (for proper IP detection)
app.set('trust proxy', true);

const allowedOrigins = [
  'http://localhost:3054',
  'http://localhost',
  'http://192.168.1.169:3054',
  'http://192.168.1.169',
  'http://127.0.0.1:3054',
];

const corsOptions = {
  origin: (origin: string | undefined, callback: any) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  // origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Habilita las cookies y encabezados de autorización (si es necesario)
  optionsSuccessStatus: 204, // Responde con 204 No Content para las solicitudes OPTIONS (preflight)
};

app.use(cors(corsOptions));

app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({extended: true, limit: '100kb'}));

// Apply payload-based security AFTER body parsing
app.use((req: any, res, next) => {
  next();
});
app.use(cookieParser(EnvVars.CookieProps.Secret));

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan('dev'));
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}

// return hello in root
app.get('/', (_: Request, res: Response) => {
  res.send('Hello');
});

// Add APIs, must be after middleware
app.use('/api', BaseRouter);

app.use(subdomain('scrap-api', app));

// Add error handler
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (EnvVars.NodeEnv !== NodeEnvs.Test.valueOf()) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
    res.status(status).json({error: err.message});
  }
  return next(err);
});

// Exponer las métricas en /metrics para que Prometheus las pueda recoger
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});





export default app;
