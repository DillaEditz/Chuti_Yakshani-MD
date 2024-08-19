const axios = require('axios');

// Function to get the buffer of data from a URL
const getBuffer = async (url, options = {}) => {
    try {
        const res = await axios({
            method: 'get',
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        });
        return res.data;
    } catch (e) {
        console.error(e);
    }
};

// Function to get group admins from participants
const getGroupAdmins = (participants) => {
    return participants
        .filter(participant => participant.admin !== null)
        .map(participant => participant.id);
};

// Function to generate a random string with a specified extension
const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`;
};

// Function to format numbers with suffixes (K, M, B, etc.)
const h2k = (eco) => {
    const lyrik = ['', 'K', 'M', 'B', 'T', 'P', 'E'];
    const ma = Math.log10(Math.abs(eco)) / 3 | 0;
    if (ma === 0) return eco;
    const ppo = lyrik[ma];
    const scale = Math.pow(10, ma * 3);
    const scaled = eco / scale;
    let formatt = scaled.toFixed(1);
    if (/\.0$/.test(formatt)) formatt = formatt.slice(0, -2);
    return formatt + ppo;
};

// Function to check if a string is a valid URL
const isUrl = (url) => {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/gi.test(url);
};

// Function to stringify JSON with indentation
const Json = (string) => {
    return JSON.stringify(string, null, 2);
};

// Function to format seconds into a readable string
const runtime = (seconds) => {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);
    const dDisplay = d > 0 ? d + (d === 1 ? ' day, ' : ' days, ') : '';
    const hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : '';
    const mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : '';
    const sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : '';
    return dDisplay + hDisplay + mDisplay + sDisplay;
};

// Function to sleep for a specified amount of milliseconds
const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Function to fetch JSON data from a URL
const fetchJson = async (url, options = {}) => {
    try {
        const res = await axios({
            method: 'GET',
            url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        });
        return res.data;
    } catch (err) {
        return err;
    }
};

module.exports = { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson };
