import { config } from 'dotenv';

export const EnvConfig: { PORT?: number; SECRET_KEY: string; MONGO_DB_URI?: string } = {
  SECRET_KEY: '',
};

export const createConfig = () => {
  config();
  EnvConfig.PORT = Number(process.env.PORT) || 3030;
  EnvConfig.SECRET_KEY = process.env.SECRET_KEY!|| "123";
  EnvConfig.MONGO_DB_URI=process.env.MONGO_DB_URI
};
