FROM node:alpine

WORKDIR /app

COPY package*.json ./
COPY .env .

RUN npm install

COPY src/ ./src/

CMD ["npm","run","start"]