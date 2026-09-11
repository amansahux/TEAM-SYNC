import dotenv from "dotenv";

dotenv.config();

const requiredEnvVariables = [
  "MONGO_URI",
  "PORT",
  "JWT_ACCESS_SECRET",
  "JWT_REFRESH_SECRET",
  "NODE_ENV",
  "CLIENT_URL"
];

const missingVariables = requiredEnvVariables.filter(
  (variable) => !process.env[variable]
);

if (missingVariables.length > 0) {
  console.error(
    `Missing environment variables: ${missingVariables.join(", ")}`
  );
  process.exit(1);
}

const config = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,

  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  NODE_ENV: process.env.NODE_ENV,
  CLIENT_URL: process.env.CLIENT_URL
};

export default config;