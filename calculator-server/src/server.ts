import express, {Application} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middlewares/errorHandler';
import session from 'express-session';
import MongoSessionStore from './utils/mongo-session-store';

const PORT = process.env.PORT || 3000;

export default class Server {
  private static instance: Server;
  private app: Application;

  private constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
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
      origin: 'http://localhost:5173', // FIXME: have a dynamic cors origin
      credentials: true
    }));
    this.app.use(bodyParser.json());
  }

  private initializeRoutes() {
    this.app.use('/auth', authRoutes);
    this.app.use(errorHandler);
  }

  public start() {
    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}