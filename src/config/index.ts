import dotenv from "dotenv";

dotenv.config({
  quiet: true,
});

const requiredEnv = (name: string) => {
  const value = process.env[name];

  if (value === undefined) throw new Error(`This variable ${name} is required`);

  return value;
};

const config = {
  PORT: Number(requiredEnv("PORT")),
  NODE_ENV: requiredEnv("NODE_ENV"),

  DB_HOST: requiredEnv("DB_HOST"),
  DB_PORT: Number(requiredEnv("DB_PORT")),
  DB_NAME: requiredEnv("DB_NAME"),
  DB_USER: requiredEnv("DB_USER"),
  DB_PASSWORD: requiredEnv("DB_PASSWORD"),
};

export default config;
