const winston = require('winston');

const logger = { 
    warn: (...args) => console.log(...args),
    info: (...args) => console.log(...args)
}

module.exports = { logger };