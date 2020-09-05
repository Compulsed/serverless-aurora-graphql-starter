const AWS = require('aws-sdk');

const knex = require('knex');

module.exports = {
    client: 'postgresql',
    connection: async (arg1) => {       
        const parameterResponse = await (new AWS.SSM()).getParameters({
            Names: [
                `/${process.env.STAGE}/serverless-aurora/config/DATABASE_NAME`,
            ]
        })
        .promise();

        const [  databaseNameResponse ] = parameterResponse.Parameters;

        const { Value: databaseName } = databaseNameResponse;

        var cfParams = {
            StackName: `serverless-aurora-${process.env.STAGE}`
        };
        
        const { Stacks } = await (new AWS.CloudFormation())
            .describeStacks(cfParams)
            .promise()
            
        const DatabaseSecretARN = Stacks[0]
            .Outputs
            .find(o => o.OutputKey === 'DatabaseSecretArn')
            .OutputValue;

        const smParams = {
            SecretId: DatabaseSecretARN, 
            VersionStage: 'AWSPREVIOUS'
        };

        const { SecretString } = await (new AWS.SecretsManager())
            .getSecretValue(smParams)
            .promise()

        const { password, username } = JSON.parse(SecretString);

        const config =  {
            host: `localhost`,
            port: 5433,
            user: username,
            password : password,
            database : databaseName,
            min: 2,
            max: 6,
            createTimeoutMillis: 6000,
            acquireTimeoutMillis: 60000,
            idleTimeoutMillis: 60000,
            reapIntervalMillis: 1000,
            createRetryIntervalMillis: 100
        };

        return config;
    },
    migrations: {
        directory:  './migrations'
    },
    seeds: {
        directory:  './seeds'
    }
}