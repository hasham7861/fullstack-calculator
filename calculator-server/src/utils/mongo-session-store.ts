import session from 'express-session';
import store from 'connect-mongodb-session';

const MongoDBStore = store(session);

const MongoSessionStore = new MongoDBStore({
  uri: process.env.DATABASE_URL!,
  collection: 'mySessions'
});

export default MongoSessionStore