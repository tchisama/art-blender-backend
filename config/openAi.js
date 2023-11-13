require('dotenv').config(); // Load environment variables from .env file
const OpenAI = require("openai");

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

console.log(process.env.OPENAI_API_KEY);
module.exports = {openai}