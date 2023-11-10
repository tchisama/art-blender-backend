const OpenAI = require("openai");
require('dotenv').config(); // Load environment variables from .env file

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

module.exports = {openai}