import dotenv from "dotenv";
dotenv.config();
if(!process.env.MONGO_URI || !process.env.PORT || !process.env.JWT_SECRET_KEY ) {
    console.error("Please provide missed env variables")
    process.exit(1)
}

const config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET_KEY,
}

export default config;