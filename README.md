# serverless-aurora-graphql-starter

### Set up locally

### Code Requirements
* ASDF
* JQ
* AWS Cli

### Challenges:

Data API Client:
- Must use ::uuid and ::jsonb because postgres inference does not work when using parameterised values
- Where In (array) is not supported yet: http://knexjs.org/#Utility-BatchInsert
- No migrations functionality
 
Knex w/ Data API Client issues:
- Must use 'raw' when doing upserting, as this is specific to DDB providers and has not been implemented yet
- Unknown how to successfully do batchInserts (http://knexjs.org/#Utility-BatchInsert), as it requires a transaction

Values still required as env:
- AWS_ACCOUNT_ID
- AWS_REGION
- AWS_PROFILE