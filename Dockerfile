FROM node:10

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN yarn

COPY . /code/
