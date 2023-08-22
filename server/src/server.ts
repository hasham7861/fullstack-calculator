import express, {Application} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import MongoSessionStore from './utils/mongo-session-store';
import authRoutes from './routes/authRoutes';
import mathExpressionsHistoryRoutes from './routes/mathExpressionsHistoryRoutes';
import { errorHandler } from './middlewares/errorHandler';
import initMongoDBConnection from './utils/mongoose-client';
import healthRoutes from './routes/healthRoutes';

require('dotenv').config()

const PORT = process.env.PORT || 3000;

const REQUEST_OF_ORIGIN_ALLOWED = process.env.CLIENT_URL
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

  private setSessionConfig () {
    const basicSessionConfig = {
      secret: process.env.SESSION_SECRET_KEY!,
      resave: false,
      saveUninitialized: false,
      store: MongoSessionStore,
    }

    if(process.env.ENVIRONMENT !== "DEV"){
      this.app.set('trust proxy', 1);
      this.app.use(session({
        ...basicSessionConfig,
        cookie: {
          secure: true,
          httpOnly: true,
          sameSite: 'none',
        }
      }));
    }else {
      this.app.use(session({
        ...basicSessionConfig,
      }));
    }
  }
  private initializeMiddlewares() {
    this.setSessionConfig()
    this.app.use(cors({
      origin: REQUEST_OF_ORIGIN_ALLOWED,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true
    }));
    this.app.use(bodyParser.json());
  }

  private initializeRoutes() {
    this.app.use('/health', healthRoutes);
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