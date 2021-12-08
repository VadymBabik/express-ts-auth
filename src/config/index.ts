import { config } from "dotenv";

export const EnvConfig: {
  PORT?: number;
  SECRET_KEY: string;
  MONGO_DB_URI?: string;
  JWT_SUCCESS_SECRET?: string;
  JWT_REFRESH_SECRET?: string;
} = {
  SECRET_KEY: "",
  JWT_SUCCESS_SECRET: "",
  JWT_REFRESH_SECRET: "",
};

export const createConfig = () => {
  config();
  EnvConfig.PORT = Number(process.env.PORT) || 3030;
  EnvConfig.SECRET_KEY = process.env.SECRET_KEY! || "123";
  EnvConfig.MONGO_DB_URI = process.env.MONGO_DB_URI;
  EnvConfig.JWT_SUCCESS_SECRET = process.env.JWT_SUCCESS_SECRET;
  EnvConfig.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
};
