import dotenv from 'dotenv';

dotenv.config();

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30_000,
  keepAlive: true,
  // poolSize: 50,
  autoIndex: false,
  retryWrites: false,
};

//Database URI: mongodb+srv://roebien:mongodb123@cluster0.jnb6z.mongodb.net/rest-api-canuck?retryWrites=true&w=majority
const MONGO_USERNAME = process.env.MONGO_USERNAME || 'roebien';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'mongodb123';
const MONGO_HOST = process.env.MONGO_URI || 'cluster0.jnb6z.mongodb.net/rest-api-canuck?retryWrites=true&w=majority';

const MONGO = {
  host: MONGO_HOST,
  username: MONGO_USERNAME,
  password: MONGO_PASSWORD,
  options: MONGO_OPTIONS,
  uri: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`,
};

const SERVER_HOSTNAME = process.env.SERVER_PORT || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const config = {
  mongo: MONGO,
  server: SERVER,
};

export default config;
