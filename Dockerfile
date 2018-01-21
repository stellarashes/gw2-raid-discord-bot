FROM node:latest

WORKDIR /usr/src/app

COPY . .
RUN npm install
