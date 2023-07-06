FROM node:18.13.0-alpine AS development

WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./

RUN npm ci && npm cache clean --force

COPY . .

RUN npm run build

CMD npm install; npm run start:dev;
