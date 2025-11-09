const dotenv = require('dotenv');
dotenv.config();
const config = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://omdevkarki_db_user:5KAiA5WGmYtKl9eg@lingouai.az3qskb.mongodb.net/?appName=LingouAI',
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1d',
    CORS_ORIGIN:'*',
    API_BASE_URL: process.env.API_BASE_URL || '/api',
    FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL || 'http://localhost:3000',

    // Apis
    LANGUAGETOOL_API :"https://api.languagetool.org/v2/check", // Free endpoint
    DEEPSEEK_API: process.env.DEEPSEEK_API_KEY || "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", // optional
    SAPLING_API_KEY: process.env.SAPLING_API_KEY, // optional
    PLAGIARISM_API_KEY: process.env.PLAGIARISM_API_KEY, // optional
};
module.exports = config;