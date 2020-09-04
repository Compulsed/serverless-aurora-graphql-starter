const { logger } = require('./logger');
const { getDatabaseSecretArn } = require('./getDatabaseSecretArn');

const makedataAPIClient = async () => {
    const databaseSecretARN = await getDatabaseSecretArn();

    return require('data-api-client')({
        secretArn: databaseSecretARN, 
        resourceArn: process.env.DB_ARN,
        database: process.env.DATABASE_NAME,
    });
}

// Cached per container
const dataAPIClientPromise = makedataAPIClient();

const query = async (...args) => {
    logger.info('Data API Query: ', args[0], args[1] && args[1].length);

    const dataApiClient = await dataAPIClientPromise;
    
    return dataApiClient
        .query(...args);
}
  
module.exports = { query }