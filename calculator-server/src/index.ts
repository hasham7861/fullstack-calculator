import express, {Application} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middlewares/errorHandler';
import session from 'express-session';

const PORT = process.env.PORT || 3000;

class Server {
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
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(session({
      secret: process.env.SESSION_SECRET_KEY!,
      resave: false,
      saveUninitialized: false,
    }));
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

(() => {
  const server = Server.getInstance()
  server.start()
})()