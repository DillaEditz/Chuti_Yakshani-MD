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
    SESSION_ID: process.env.SESSION_ID || 'FqUmTRYB#OW4kriCtKEJhn_M6q_z2O8ilbblJQ2Jsv0_BQ_sL0po',
    ALIVE_IMG: process.env.ALIVE_IMG || "https://telegra.ph/file/3653d1cd025076c0559d5.jpg",
    ALIVE_MSG: process.env.ALIVE_MSG || "I am Chuti_Yakshani-MD Created By Dilla Editz !",
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
    MODE: process.env.MODE || "public",
};
