# ⚡☁ Serverless Aurora GraphQL Starter ⚡☁

*Serverless is about quickly building solutions without spending time on building out infrastructure. It still can take a **really long** time to get all these servleress technologies configured and properly working together, this is where the Serverless Aurora GraphQL Starter comes in.*

*This project aims to (in-whole or in-part) be drop in starter for your new project OR be a place where you can get some inspiration for how you **might** do Serverless SQL 🎉*

## Technologies used in this starter

* Serverless Framework (w/ Serverless offline)
* GraphQL.js on Lambda (For API)
* Serverless Aurora Postgres
* Data API w/ Data API Client
* Knex (Running DB Migrations / Seeds)
* ASDF (Version management, node, jq, yarn)
* Direnv (Managing multiple environments)
* Oprah (For managing secrets & credentials)
* Cloudformation template for a temporarily spinning up a bastion host

## Setting up locally

Installl the following dependencies as they will bre required to deploy the solution:
* ASDF
* AWS Cli
* Direnv
* Postgres client




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

.