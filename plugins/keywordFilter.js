const fs = require('fs');
const path = require('path');

// Load restricted keywords from JSON
const keywordsFilePath = path.join(__dirname, '../my_data/restricted_keywords.json');

let restrictedKeywords = [];

const loadRestrictedKeywords = () => {
    try {
        const data = fs.readFileSync(keywordsFilePath, 'utf8');
        const json = JSON.parse(data);
        restrictedKeywords = json.bannedwords || [];
    } catch (error) {
        console.error("Error loading restricted keywords:", error);
    }
};

loadRestrictedKeywords();

const containsRestrictedKeyword = (text) => {
    return restrictedKeywords.some(keyword => text.toLowerCase().includes(keyword.toLowerCase()));
};
