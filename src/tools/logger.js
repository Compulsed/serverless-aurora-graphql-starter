const winston = require('winston');

// const logger = winston.createLogger({
//     level: 'info',
//     format: winston.format.json(),  
//     transports: [
//       new winston.transports.Console({
//         format: winston.format.simple(),
//       }),
//     ]
// });

const logger = { 
    warn: (...args) => console.log(...args),
    info: (...args) => console.log(...args)
}

module.exports = { logger };