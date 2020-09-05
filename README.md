# ⚡☁ Serverless Aurora GraphQL Starter (Alpha) ⚡☁

[![Build status](https://badge.buildkite.com/664e64d34cc008fa649f345595c0fe2276d83e29fe0ec045d7.svg)](https://buildkite.com/dale-salter/serverless-aurora-merge)

<br />
<br />

<p align="center">
    <img alt="Serverless Aurora GraphQL Starter" src="https://raw.githubusercontent.com/Compulsed/serverless-aurora-graphql-starter/master/image/logo.png" width="546">
</p>

<br />
<br />

**This is currently still actively being built out, it is recommended for you to read and understand all of the code before using it in production**

*Serverless is about quickly building solutions without spending time a lot of on building out & maintaining infrastructure. It still can take a **really long** time to get all these serverless technologies configured and properly working together, this is where the Serverless Aurora GraphQL Starter comes in.*

*This project aims to (in-whole or in-part) be drop in starter for your new project OR be a place where you can get some inspiration for how you **might** do Serverless SQL 🎉*

<br />
<br />

## Technologies used in this starter

* Serverless Framework (w/ Serverless offline)
* GraphQL.js (ApolloServer) on Lambda (For API)
* Serverless Aurora Postgres
* Data API w/ Data API Client
* Knex (Running DB Migrations / Seeds)
* ASDF (Version management, node, jq, yarn)
* Direnv (Managing multiple environments)
* Oprah (For managing secrets & credentials)
* Cloudformation template for a temporarily spinning up a bastion host

## Features of starter

* Performance
    * Lambdas do not exist inside of VPC, uses DataAPI to reduce cold starts
* SQL Database helpers
    * Seeding / Migrations support
    * Postgres Aurora has good JSONB support for being able to story and query arbitrary JSON data like DDB 
* Cost savings 
    * Serverless Aurora will automatically shut off after 5 minutes in non-production environments
    * Bastion hosts will deleted once they are being used
    * All Serverless resources, low cost when not using

<br />
<br />
<br />

## Setting up locally

Installl the following dependencies as they will bre required to deploy the solution:
* ASDF
* AWS Cli
* Direnv
* Postgres client

### Important Limitations of this starter:

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

## Improvementes
Read the IMPROVEMENTS.md to look at what improvements to this starter are still to be made
