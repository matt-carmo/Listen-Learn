FROM node:alpine

WORKDIR /usr/src/app

COPY ./back-end/package*.json ./

RUN npm install

COPY ./back-end .

RUN npm install -g ts-node typescript
EXPOSE 3000

ENV ADDRESS=0.0.0.0 PORT=3001

