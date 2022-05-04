FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN cd server

ENV PORT=3000

EXPOSE 3000

CMD ["npm" "start"]
