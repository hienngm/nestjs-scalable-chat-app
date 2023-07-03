FROM node:16.15.1-bullseye AS development

WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

CMD npm run start:prod
