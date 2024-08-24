const fs = require('fs');

// Load environment variables from config.env if the file exists
if (fs.existsSync('config.env')) {
    require('dotenv').config({ path: './config.env' });
}

// Function to convert text to a boolean value
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

// Export the SESSION_ID environment variable
module.exports = {
    SESSION_ID: process.env.SESSION_ID || 'NiNkiLYR#s9WY9HeYnG9-epInW_DW3IcjtJff8HdUGmYUO3SkfRM',
    MONGODB: process.env.MONGODB || "ENTER MONGO DB API",
};
