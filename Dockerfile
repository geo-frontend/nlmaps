FROM node:8.9
MAINTAINER hans@webmapper.net
WORKDIR /app

RUN apt-get update -y

RUN npm install -g lerna@3.22.1 rollup@0.57.1
COPY package.json package-lock.json /app/
COPY packages /app/packages
RUN npm install
RUN lerna init
RUN lerna bootstrap
RUN lerna exec npm install
COPY scripts /app/scripts
