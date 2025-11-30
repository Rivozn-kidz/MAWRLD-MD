const fs = require('fs');
const axios = require('axios');
const FormData = require("form-data");
const path = './config.env';

async function empiretourl(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const form = new FormData();
  const fileStream = fs.createReadStream(filePath);
  form.append("file", fileStream);
  const originalFileName = filePath.split("/").pop();
  form.append("originalFileName", originalFileName);

  try {
    const response = await axios.post("https://cdn.empiretech.biz.id/api/upload.php", form, {
      headers: {
        ...form.getHeaders(),
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      throw new Error("No response received from the server.");
    } else {
      throw new Error(`Request Error: ${error.message}`);
    }
  }
}

// Fetch buffer
const getBuffer = async (url, options = {}) => {
  try {
    const res = await axios({
      method: 'GET',
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
    return null;
  }
};

// Group admins
const getGroupAdmins = (participants) => {
  const admins = [];
  for (let participant of participants) {
    if (participant.admin !== null) admins.push(participant.id);
  }
  return admins;
};

// Random string
const getRandom = (ext) => `${Math.floor(Math.random() * 10000)}${ext}`;

// Convert number
const h2k = (eco) => {
  const tags = ['', 'K', 'M', 'B', 'T', 'P', 'E'];
  const tier = Math.floor(Math.log10(Math.abs(eco)) / 3);
  if (tier === 0) return eco.toString();
  const scale = Math.pow(10, tier * 3);
  let scaled = eco / scale;
  let formatted = scaled.toFixed(1).replace(/\.0$/, '');
  return formatted + tags[tier];
};

// URL check
const isUrl = (url) => {
  return url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/);
};

// Pretty JSON
const Json = (obj) => JSON.stringify(obj, null, 2);

// Uptime formatter
const runtime = (seconds) => {
  seconds = Math.floor(seconds);
  const d = Math.floor(seconds / (24 * 3600));
  seconds %= 24 * 3600;
  const h = Math.floor(seconds / 3600);
  seconds %= 3600;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;

  if (d > 0) return `${d}d ${h}h ${m}m ${s}s`;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
};

// Sleep
const sleep = (ms) => new Promise(res => setTimeout(res, ms));

// Fetch JSON
const fetchJson = async (url, options = {}) => {
  try {
    const res = await axios({
      method: 'GET',
      url,
      headers: {
        'User-Agent': 'Mozilla/5.0'
      },
      ...options
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

// Save config value
const saveConfig = (key, value) => {
  let configData = fs.existsSync(path) ? fs.readFileSync(path, 'utf8').split('\n') : [];
  let found = false;

  configData = configData.map(line => {
    if (line.startsWith(`${key}=`)) {
      found = true;
      return `${key}=${value}`;
    }
    return line;
  });

  if (!found) configData.push(`${key}=${value}`);

  fs.writeFileSync(path, configData.join('\n'), 'utf8');
  require('dotenv').config({ path });
};

module.exports = {
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson,
  saveConfig,
  empiretourl
};