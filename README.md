# ⚡☁ Serverless Aurora GraphQL Starter ⚡☁

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

Currently I use this starter to run my Blog ([https://dalejsalter.com](https://dalejsalter.com/), which is hosted [GitHub](https://github.com/Compulsed/blog)). If you want to learn about Serverless be sure to follow that, or me on [Twitter](https://twitter.com/enepture).

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

<br />

## Features of starter

* Performance
    * Lambdas do not exist inside of VPC and uses DataAPI to query Postgres (reduces long cold starts)
* SQL Database helpers
    * Postgres Aurora has good JSONB support for being able to story and query arbitrary JSON data like DynamoDB
    * Seeding / Migrations support
* Cost savings
    * Serverless Aurora will automatically shut off after 5 minutes in non-production environments
    * Bastion hosts can easily be cleaned up when they are not needed
    * All Serverless resources, low cost when not using (< $1 USD per month when there is no utilisation)

<br />

## Setting up

**Step 1 - Setting up starter**

Clone the repository down, and then find & replace any usage of the word `serverless-aurora` with your own service name eg. `image-serivce`. This service name will be used in multiple places as it will be your, cloudformation, database, database user name. It will be hard to change later.

<br />

**Step 2 - Download dependencies**

This project depends on: `aws-cli`, `psql` (apart of postgres package), `nodejs`, `yarn`, `python`, `direnv` & `jq` to run. If you already have these dependencies or know how to install them skip to **Step 3**. 

ASDF can manage most of these dependencies for you and pin them to the specific versions needed for the project. ([Installation Guide](https://asdf-vm.com/#/core-manage-asdf-vm)) 

```
asdf plugin-add nodejs  # Follow: https://github.com/asdf-vm/asdf-nodejs as it may require additional steps
asdf plugin-add yarn
asdf plugin-add python  # Follow: https://github.com/danhper/asdf-python as it may require additional steps
asdf plugin-add jq
asdf plugin-add direnv 
asdf install
```

You should at this point have access to everything you need and can validate that by running `which nodejs`, `which yarn`, `which jq`, `which direnv`, `which python` etc.

ASDF does not have a way to manage the AWS CLI or Postgres, you can these install through the following steps
* AWS CLI ([Installation Guide](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html))
* Postgres client (`sudo apt-get install postgresql` or `brew install postgres`)

*Note: All of the required dependencies are defined within the `Dockerfile` which you can use if your CI system supports docker.*

<br />

**Step 3 - Configure Direnv**

Direnv is a mechanism for being able to switch in and out your environment variables. This starter expects by default expects you to define an `.env.dev` (based on what is in the `.envrc` file). Create a `.env.dev` in the root of the repository, replace what is below with your values.

```
STAGE=dev                    # Stage name, expects `dev`, `staging`, `production`
AWS_PROFILE=starter          # AWS Profile you will deploy with, should point to same account as the AWS_ACCOUNT_ID
AWS_REGION=us-east-1         # Your AWS Region
AWS_DEFAULT_REGION=us-east-1 # Your AWS Region
AWS_ACCOUNT_ID=999999999999  # Your AWS account ID you are deploying this to
AWS_SDK_LOAD_CONFIG=1
```

You can set one up for `.env.staging` or `.env.production`. When you set up a CI environment you will also need to define the below environment variables there.

<br />

**Step 4 - Deploying**

Install your JavaScript dependencies with a `yarn`.

Once installed you can run `./bin/ci-deploy -s dev`. This will:

- Configure SSM with default values using the `oprah` command
- Perform a `serverless deploy`
- Start up your bastion host with `aws cli`
- Run any migrations / seed the database with `knex`
- Stop the bastion host so it does not cost you $ (we only need it for running the database migration & seeding)

As this point you should have the sample project fully running 🎉 and you can use the `./bin/ci-deploy -s dev` on CI to do staging & production deployments.

<br />

**Step 5 - Developing**

**Note: When Serverless Aurora is not being used it is put to sleep. It takes ~24 seconds for aurora to wake up. So your first couple of requests might be slow or timeout.**

Now that you have everything set up, you are in a place where you can start iterating and adding features.

General commands:
- `./bin/offline -s dev` - Sets up a Serverless Offline API for you to be able to iterate on code. You can use something like [Insomnia](https://insomnia.rest/) to test the API as you change the code. 
- `yarn sls info -s dev` - Prints out the API Gateway URL for your lambda functions running in the cloud
- `yarn sls deploy -s dev` - Just deploys changes to just the Serverless stack (your new code)

Adding new environment variables:
- `yarn oprah -s dev -i` - Allows you to add additional values to SSM if there are any changes to the `oprah.yml`

Updating or changing the database:
- `remote-start -s dev` - To bring up the bastion host with an SSH tunnel. Required to run the next couple of commands (and `remote-stop -s dev`) to turn the host to so that you save 💸
- `yarn knex seed:run` - Seeds the database with dummy data based on the scripts in the `seeds/` directory
- `yarn knex migrate:make post-status` - Creates a new migration
- `yarn knex migrate:up` - Brings you database to the latest version
- `./bin/remote-connect -s dev` - Similar to `remote-start -s dev` but will print our crentials you can use to connect into your database using an SQL client like [TablePlus](https://tableplus.com/)

<br />

## Improvementes to this starter
Read the [IMPROVEMENTS.md](https://github.com/Compulsed/serverless-aurora-graphql-starter/blob/master/IMPROVEMENTS.md) to look at what improvements to this starter are still to be made.
