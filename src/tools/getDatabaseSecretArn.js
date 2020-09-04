const AWS = require('aws-sdk');

// populated by intrinsic function, issues with serverless offline not correctly resolving these
// https://github.com/serverless/serverless/issues/5209
const getDatabaseSecretArn = async () => {
  if (process.env.SECRET_ARN_REF !== "[object Object]") {
      return process.env.SECRET_ARN_REF;
  }
  
  var cfParams = {
      StackName: `${process.env.STACK_NAME}`
  };

  const { Stacks } = await (new AWS.CloudFormation())
      .describeStacks(cfParams)
      .promise()
  
  const databaseSecretARN = Stacks[0]
      .Outputs
      .find(o => o.OutputKey === 'DatabaseSecretArn')
      .OutputValue;

  return databaseSecretARN;
};

module.exports = { getDatabaseSecretArn };