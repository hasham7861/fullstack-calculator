import express, {Application} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import MongoSessionStore from './utils/mongo-session-store';
import authRoutes from './routes/authRoutes';
import mathExpressionsHistoryRoutes from './routes/mathExpressionsHistoryRoutes';
import { errorHandler } from './middlewares/errorHandler';
import initMongoDBConnection from './utils/mongoose-client';

const PORT = process.env.PORT || 3000;
require('dotenv').config()

const REQUEST_OF_ORIGIN_ALLOWED = 'http://localhost:5173'
export default class Server {
  private static instance: Server;
  private app: Application;

  private constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    initMongoDBConnection();
  }

  public static getInstance(): Server {
    if (!Server.instance) {
      Server.instance = new Server();
    }
    return Server.instance;
  }

  private initializeMiddlewares() {
    this.app.use(session({
      secret: process.env.SESSION_SECRET_KEY!,
      resave: false,
      saveUninitialized: false,
      store: MongoSessionStore
    }));
    this.app.use(cors({
      origin: REQUEST_OF_ORIGIN_ALLOWED,
      credentials: true
    }));
    this.app.use(bodyParser.json());
  }

  private initializeRoutes() {
    this.app.use('/auth', authRoutes);
    this.app.use('/math', mathExpressionsHistoryRoutes);
    this.app.use(errorHandler);
  }

  public start() {
    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}