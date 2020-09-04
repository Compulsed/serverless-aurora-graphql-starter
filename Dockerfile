FROM node:12

# Create app directory
WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install \
        jq \
        postgresql-client \
        python3-pip \
        -y && \
    pip3 --no-cache-dir install --upgrade awscli

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json yarn.lock ./

RUN yarn install --pure-lockfile

# Bundle app source
COPY . .