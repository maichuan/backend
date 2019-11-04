FROM node:10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/
RUN yarn

EXPOSE 3000

CMD ["yarn","start"]

